/**
 * The room view's colorizer - `RoomDesktop`'s `colorizer_wrapper`: a `multiply` rectangle over the
 * room stage, faded to a dimmer's colour, that lives as long as the room does.
 */
import { ColorTransitioner } from '@nitrodevco/nitro-renderer';

import { createRoomColorLayer } from './roomColorLayer';

/** White multiplies to nothing, so the layer is hidden at it rather than drawn as a full-screen blend. */
const colorizer = createRoomColorLayer({
    label: 'room-view-colorizer',
    atBack: false,
    blendMode: 'multiply',
    neutral: 0xFFFFFF,
    createTransitioner: () => new ColorTransitioner(),
});

/**
 * `RoomDesktop.setRoomViewColor`: the room view's colorizer - Flash's `colorizer_wrapper`, a
 * `multiply` sprite laid over the room canvas (`room_view_container`) - fades to a colour and
 * brightness. It tints everything in the room, planes, furni and people alike, where a
 * background-only colour tints the planes alone (`RoomLogic`). Nothing exists until a colour is
 * first set.
 */
export const SetRoomViewColor = (color: number, light: number) => colorizer.fadeTo(color, light);

/** `RoomDesktop.dispose`: the colorizer goes with the room; the next room starts white. */
export const DisposeRoomViewColor = () => {
    colorizer.dispose();
};
