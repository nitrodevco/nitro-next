/**
 * A full-screen rectangle on the room stage faded to a colour - what `RoomDesktop`'s
 * `background_wrapper` (the background toner, behind the room) and `colorizer_wrapper` (a dimmer,
 * a `multiply` over it) both are. It is made when a colour is first set, follows the screen's size,
 * moves on its fade every frame (`RoomDesktop.updateColor`, over 1.5 s by `ColorTransitioner`) and
 * stays at its end of the stage, and goes with the room.
 */
import { ColorTransitioner, GetRenderer, GetRoomStage, GetTicker, GetTickerTime } from '@nitrodevco/nitro-renderer';
import { BLEND_MODES, Graphics } from 'pixi.js';

export interface RoomColorLayerOptions {
    label: string;
    /** Behind the room canvas (the stage's first child) or over it (its last). */
    atBack: boolean;
    blendMode?: BLEND_MODES;
    /** The colour that shows nothing: the layer is hidden at it, and starts and ends there. */
    neutral: number;
    createTransitioner: () => ColorTransitioner;
    /** After every redraw, with whether the layer shows. */
    onRedraw?: (visible: boolean) => void;
}

export const createRoomColorLayer = ({ label, atBack, blendMode, neutral, createTransitioner, onRedraw }: RoomColorLayerOptions) => {
    let layer: Graphics | undefined = undefined;
    let transitioner: ColorTransitioner | undefined = undefined;
    let color = neutral;

    const redraw = () => {
        if (!layer) return;

        const { width, height } = GetRenderer().screen;
        const visible = (color !== neutral);

        layer.clear();
        layer.rect(0, 0, width, height).fill(color);
        layer.visible = visible;
        onRedraw?.(visible);
    };

    const update = () => {
        if (!layer || !transitioner) return;

        const stage = GetRoomStage();

        if (atBack ? (stage.children[0] !== layer) : (stage.children[stage.children.length - 1] !== layer)) {
            if (atBack) stage.addChildAt(layer, 0);
            else stage.addChild(layer);
        }

        if (!transitioner.updateColor(GetTickerTime())) return;

        color = transitioner.color;

        redraw();
    };

    /** Fades to `target` at `brightness`, making the layer the first time. */
    const fadeTo = (target: number, brightness: number) => {
        if (!layer) {
            layer = new Graphics({ label, blendMode, eventMode: 'none' });
            transitioner = createTransitioner();
            color = neutral;

            if (atBack) GetRoomStage().addChildAt(layer, 0);
            else GetRoomStage().addChild(layer);

            GetRenderer().on('resize', redraw);
            GetTicker().add(update);

            redraw();
        }

        transitioner?.startTransition(target, brightness, GetTickerTime());
    };

    /** Takes the layer down; false when there was none. */
    const dispose = (): boolean => {
        if (!layer) return false;

        GetTicker().remove(update);
        GetRenderer().off('resize', redraw);
        layer.destroy();

        layer = undefined;
        transitioner = undefined;
        color = neutral;

        return true;
    };

    return { fadeTo, dispose, getColor: () => color };
};
