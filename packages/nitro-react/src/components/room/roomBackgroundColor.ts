import { GetRenderer, GetRoomStage } from '@nitrodevco/nitro-renderer';
import { Graphics } from 'pixi.js';

let backdrop: Graphics | undefined = undefined;
let backdropColor: number = 0;

const redraw = () => {
    if (!backdrop) return;

    const { width, height } = GetRenderer().screen;

    backdrop.clear();
    backdrop.rect(0, 0, width, height).fill(backdropColor);
};

/**
 * The colour a background toner puts *behind* the room. Flash filled a `background_wrapper`
 * sprite sitting behind the room view rather than tinting anything in it, which is why the
 * furniture and the people keep their own colours while the room appears to change - so this is
 * the same flat rectangle, at the back of the room stage. Passing `undefined` takes it away.
 *
 * Nothing exists until a toner is actually switched on, and Flash faded between colours where
 * this switches at once.
 */
export const SetRoomBackgroundColor = (color: number | undefined) => {
    if (color === undefined) {
        if (!backdrop) return;

        GetRenderer().off('resize', redraw);
        backdrop.destroy();
        backdrop = undefined;

        return;
    }

    backdropColor = color;

    if (!backdrop) {
        backdrop = new Graphics({ label: 'room-background-color' });

        GetRoomStage().addChildAt(backdrop, 0);
        GetRenderer().on('resize', redraw);
    }

    redraw();
};
