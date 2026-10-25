/**
 * The background toner's backdrop - `RoomDesktop`'s `background_wrapper`: one flat rectangle at the
 * back of the room stage, faded to the toner's colour, that lives as long as the room does.
 */
import { ColorConverter, IRoomRenderingCanvas } from '@nitrodevco/nitro-api';
import { ColorTransitioner } from '@nitrodevco/nitro-renderer';

import { createRoomColorLayer } from './roomColorLayer';

let roomCanvas: IRoomRenderingCanvas | undefined = undefined;

/**
 * Colour 0 is no toner, and the wrapper is hidden (`drawRoomBackgroundColor`). The room canvas
 * paints its own black backing where Flash's canvas was transparent over the stage, so while the
 * toner shows that backing is put away, and it comes back with the black. The fade starts from
 * black at brightness 0.
 */
const backdrop = createRoomColorLayer({
    label: 'room-background-color',
    atBack: true,
    neutral: 0,
    createTransitioner: () => new ColorTransitioner(0, 0),
    onRedraw: visible => roomCanvas?.setBackgroundVisible(!visible),
});

/**
 * `RoomDesktop.setRoomBackgroundColor`: the colour a background toner puts *behind* the room.
 * Flash filled a `background_wrapper` sprite sitting behind the room view rather than tinting
 * anything in it, which is why the furniture and the people keep their own colours while the room
 * appears to change - so this is the same flat rectangle, at the back of the room stage. A toner
 * switched off fades to 0 (`RoomUI`'s `setRoomBackgroundColor(0, 0, 0)`) and is hidden once there.
 * Nothing exists until a toner is first switched on.
 */
export const SetRoomBackgroundColor = (canvas: IRoomRenderingCanvas | undefined, hue: number, saturation: number, lightness: number) => {
    roomCanvas = canvas;

    backdrop.fadeTo(ColorConverter.hslToRGB(((hue & 0xFF) << 16) + ((saturation & 0xFF) << 8) + (lightness & 0xFF)), lightness);
};

/** `RoomDesktop.dispose`: the backdrop goes with the room; the next room starts without one. */
export const DisposeRoomBackgroundColor = () => {
    if (!backdrop.dispose()) return;

    roomCanvas?.setBackgroundVisible(true);
    roomCanvas = undefined;
};

/** `RoomDesktop.roomBackgroundColor`: the toner's colour as it shows now, 0 without one. */
export const GetRoomBackgroundColor = () => backdrop.getColor();
