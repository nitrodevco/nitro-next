import { ColorConverter, IRoomRenderingCanvas } from '@nitrodevco/nitro-api';
import { ColorTransitioner, GetRenderer, GetRoomStage, GetTicker, GetTickerTime } from '@nitrodevco/nitro-renderer';
import { Graphics } from 'pixi.js';

let backdrop: Graphics | undefined = undefined;
let transitioner: ColorTransitioner | undefined = undefined;
let backdropColor: number = 0;
let roomCanvas: IRoomRenderingCanvas | undefined = undefined;

/**
 * `drawRoomBackgroundColor`: colour 0 is no toner, and the wrapper is hidden. The room canvas paints
 * its own black backing where Flash's canvas was transparent over the stage, so while the toner
 * shows that backing is put away, and it comes back with the black.
 */
const redraw = () => {
    if (!backdrop) return;

    const { width, height } = GetRenderer().screen;
    const visible = (backdropColor !== 0);

    backdrop.clear();
    backdrop.rect(0, 0, width, height).fill(backdropColor);
    backdrop.visible = visible;
    roomCanvas?.setBackgroundVisible(!visible);
};

/** `RoomDesktop.updateColor`, every frame: the fade moves on, and the backdrop stays behind the room canvas. */
const update = () => {
    if (!backdrop || !transitioner) return;

    const stage = GetRoomStage();

    if (stage.children[0] !== backdrop) stage.addChildAt(backdrop, 0);

    if (!transitioner.updateColor(GetTickerTime())) return;

    backdropColor = transitioner.color;

    redraw();
};

/**
 * `RoomDesktop.setRoomBackgroundColor`: the colour a background toner puts *behind* the room.
 * Flash filled a `background_wrapper` sprite sitting behind the room view rather than tinting
 * anything in it, which is why the furniture and the people keep their own colours while the room
 * appears to change - so this is the same flat rectangle, at the back of the room stage. It fades
 * from what it showed to the toner's colour over 1.5 s (`ColorTransitioner`, starting from black
 * at brightness 0); a toner switched off fades to 0 (`RoomUI`'s `setRoomBackgroundColor(0, 0, 0)`)
 * and is hidden once there. Nothing exists until a toner is first switched on.
 */
export const SetRoomBackgroundColor = (canvas: IRoomRenderingCanvas | undefined, hue: number, saturation: number, lightness: number) => {
    roomCanvas = canvas;

    if (!backdrop) {
        backdrop = new Graphics({ label: 'room-background-color', eventMode: 'none' });
        transitioner = new ColorTransitioner(0, 0);
        backdropColor = 0;

        GetRoomStage().addChildAt(backdrop, 0);
        GetRenderer().on('resize', redraw);
        GetTicker().add(update);

        redraw();
    }

    const color = ColorConverter.hslToRGB(((hue & 0xFF) << 16) + ((saturation & 0xFF) << 8) + (lightness & 0xFF));

    transitioner?.startTransition(color, lightness, GetTickerTime());
};

/** `RoomDesktop.dispose`: the backdrop goes with the room; the next room starts without one. */
export const DisposeRoomBackgroundColor = () => {
    if (!backdrop) return;

    GetTicker().remove(update);
    GetRenderer().off('resize', redraw);
    backdrop.destroy();
    roomCanvas?.setBackgroundVisible(true);

    backdrop = undefined;
    roomCanvas = undefined;
    transitioner = undefined;
    backdropColor = 0;
};

/** `RoomDesktop.roomBackgroundColor`: the toner's colour as it shows now, 0 without one. */
export const GetRoomBackgroundColor = () => backdropColor;
