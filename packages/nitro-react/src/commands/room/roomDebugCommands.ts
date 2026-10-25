/**
 * The room engine's side of four chat commands of `ChatInputWidgetHandler`, each reading the room
 * it acts on itself:
 *
 * - `:showstats` - `RoomEngine.setFpsCounterEnabled(true)`: the active canvas's fps counter;
 * - `:hidemouse` - `Mouse.hide()` / `Mouse.show()` and `RoomEngine.toggleTileCursorVisibility`;
 * - `:screenshot` - `RoomEngine.createScreenShot`: the room canvas saved as a PNG;
 * - `:demonictriggers` - every wired trigger's sprites inverted, or no longer.
 *
 * `:hidemouse` and `:demonictriggers` toggle flags the handler holds. Flash makes a handler for
 * each room it shows, so both start over in every room; they do here too.
 */
import { IRoom, IRoomObjectSpriteVisualization, RoomObjectCategoryEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { ObjectTileCursorUpdateMessage, TextureUtils } from '@nitrodevco/nitro-renderer';
import { ColorMatrixFilter, Filter } from 'pixi.js';

import { navigatorStore } from '#base/context/navigator';
import { getRoom } from '#base/context/room';
import { systemStore } from '#base/context/system';

import { getLatencyPingMs } from '../system/latencyCommands';

/** The room the two flags below belong to - a new room is a new handler, with its flags as they start. */
let flagsRoom: IRoom | undefined = undefined;
/** The handler's `_-JH` (true: the mouse is shown). */
let mouseShown = true;
/** The handler's `_demonicTriggers`. */
let demonicTriggers = false;

const roomWithFlags = () => {
    const room = getRoom();

    if (room !== flagsRoom) {
        flagsRoom = room;
        mouseShown = true;
        demonicTriggers = false;
    }

    return room;
};

/**
 * `RoomEngine.setFpsCounterEnabled(true)`: the active room's canvas shows its fps counter from its
 * next sample, with the latest latency (`RoomEngine.update`'s `pingMs`; later answers update it).
 */
export const enableRoomFpsCounter = () => {
    const canvas = getRoom()?.canvas;

    if (!canvas) return;

    canvas.pingMs = getLatencyPingMs();
    canvas.fpsCounterEnabled = true;
};

/**
 * Flash `Mouse.hide()`: no cursor anywhere over the client. Pixi sets the canvas's own `cursor`
 * as the pointer moves over things, so the cursor is hidden by a rule that outranks it.
 */
let hiddenMouseStyle: HTMLStyleElement | undefined = undefined;

const setMouseHidden = (hidden: boolean) => {
    if (hidden) {
        if (hiddenMouseStyle) return;

        hiddenMouseStyle = document.createElement('style');
        hiddenMouseStyle.textContent = '* { cursor: none !important; }';

        document.head.appendChild(hiddenMouseStyle);
    } else {
        hiddenMouseStyle?.remove();
        hiddenMouseStyle = undefined;
    }
};

/**
 * `:hidemouse`: the mouse hidden, or shown again, and the room's tile cursor with it -
 * `RoomEngine.toggleTileCursorVisibility`, a `RoomObjectTileCursorUpdateMessage` that flips the
 * cursor logic's own hidden flag. Its source event id is Flash's empty one, which no mouse event
 * carries, so the logic never takes it for a move it has already handled.
 *
 * Flash also calls `setTileCursorState` (0 to hide, 1 to show), which hands the cursor a
 * `RoomObjectDataUpdateMessage`; `RoomTileCursorLogic` only reads tile cursor messages and drops
 * it, so it is not sent.
 */
export const toggleRoomMouseHidden = () => {
    const room = roomWithFlags();

    if (!room) return;

    setMouseHidden(mouseShown);

    room.getRoomObjectCursor()?.processUpdateMessage(new ObjectTileCursorUpdateMessage(undefined, 0, !mouseShown, NaN, true));

    mouseShown = !mouseShown;
};

/** `createScreenShot`'s `/[:\/\\\*\?"<>\|%]/g`: what a file name may not hold. */
const FILE_NAME_INVALID = /[:/\\*?"<>|%]/g;

/** Flash's `[year, month, date].join("-") + " " + [hours, minutes, seconds].join(".")` - the month from 0. */
const flashDateStamp = (date: Date) => [ date.getFullYear(), date.getMonth(), date.getDate() ].join('-') + ' ' + [ date.getHours(), date.getMinutes(), date.getSeconds() ].join('.');

/**
 * `:screenshot` and `RoomEngine.createScreenShot`: the room's canvas drawn whole at scale 1 - every
 * sprite of the room, not only those in view, on a transparent ground (`takeScreenShot`) - saved
 * as a PNG named after the room (`enteredGuestRoomData.roomName`), or `Habbo <date>` without one.
 * Flash's `FileReference.save` asks where to save it; a browser downloads it.
 */
export const createRoomScreenshot = () => {
    const canvas = getRoom()?.canvas;

    if (!canvas) return;

    let name = navigatorStore.getState().enteredRoom?.info.name;

    if (!name?.length) name = 'Habbo ' + flashDateStamp(new Date());

    const fileName = (name + '.png').replace(FILE_NAME_INVALID, '');
    const texture = canvas.getDisplayAsTexture();

    if (!texture) return;

    const image = TextureUtils.generateCanvas(texture) as HTMLCanvasElement;

    texture.destroy(true);

    image.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = fileName;
        link.click();

        URL.revokeObjectURL(url);
    }, 'image/png');
};

/**
 * `:demonictriggers`' `ColorMatrixFilter([-1,0,0,0,255, 0,-1,0,0,255, 0,0,-1,0,255, 0,0,0,1,0])`,
 * the colours inverted - with the offsets brought from Flash's 0-255 to Pixi's 0-1.
 */
let invertFilters: Filter[] | undefined = undefined;

const getInvertFilters = () => {
    if (!invertFilters) {
        const filter = new ColorMatrixFilter({ resolution: 'inherit' });

        filter.matrix = [ -1, 0, 0, 0, 1, 0, -1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, 1, 0 ];

        invertFilters = [ filter ];
    }

    return invertFilters;
};

/**
 * `:demonictriggers`: every sprite of every wired trigger in the room (a floor furni whose class
 * starts `wf_trg_`) but its additive ones inverted, or - the second time - its filters cleared.
 * Like Flash it sets the sprites' filters directly, once: a trigger placed afterwards is not
 * inverted, and a trigger's own visualization puts its filters back whenever it redraws its
 * sprites (a state change, a zoom).
 */
export const toggleDemonicTriggers = () => {
    const room = roomWithFlags();

    if (!room) return;

    demonicTriggers = !demonicTriggers;

    const filters = demonicTriggers ? getInvertFilters() : [];
    const { floorItems } = systemStore.getState();

    for (const object of room.getRoomObjectsForCategory(RoomObjectCategoryEnum.Floor)) {
        const typeId = object.model.getValue<number>(RoomObjectVariableEnum.FurnitureTypeId) ?? 0;

        if (floorItems[typeId]?.className.indexOf('wf_trg_') !== 0) continue;

        const visualization = object.visualization as IRoomObjectSpriteVisualization | undefined;

        if (!visualization?.sprites) continue;

        for (const sprite of visualization.sprites) {
            if (sprite.blendMode !== 'add') sprite.filters = filters;
        }
    }
};
