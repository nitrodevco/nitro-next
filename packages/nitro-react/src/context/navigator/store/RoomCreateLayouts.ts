/**
 * The floor plans a room can be created with - `RoomCreateViewCtrl`'s `_layouts`, one
 * `RoomLayout(requiredClubLevel, tileSize, name)` each, in its constructor's order, which is the
 * order the creation window lists them. The name is the model the server builds
 * (`CreateFlatMessageComposer`'s `model_<name>`) and the thumbnail it shows
 * (`${image.library.url}newroom/model_<name>.png`). A club level of -1 is a staff plan.
 */
export interface RoomCreateLayout {
    requiredClubLevel: number;
    tileSize: number;
    name: string;
}

/** `RoomLayout(requiredClubLevel, tileSize, name)`, in `RoomCreateViewCtrl`'s constructor order. Checked by `scripts/drift/constants.py`. */
export const ROOM_CREATE_LAYOUTS: readonly RoomCreateLayout[] = [
    [ 0, 104, 'a' ], [ 0, 94, 'b' ], [ 0, 36, 'c' ], [ 0, 84, 'd' ], [ 0, 80, 'e' ], [ 0, 80, 'f' ], [ 0, 416, 'i' ], [ 0, 320, 'j' ],
    [ 0, 448, 'k' ], [ 0, 352, 'l' ], [ 0, 384, 'm' ], [ 0, 372, 'n' ], [ 1, 80, 'g' ], [ 1, 74, 'h' ], [ 1, 416, 'o' ], [ 1, 352, 'p' ],
    [ 1, 304, 'q' ], [ 1, 336, 'r' ], [ 1, 748, 'u' ], [ 1, 438, 'v' ], [ 2, 540, 't' ], [ 2, 512, 'w' ], [ 2, 396, 'x' ], [ 2, 440, 'y' ],
    [ 2, 456, 'z' ], [ 2, 208, '0' ], [ 2, 1009, '1' ], [ 2, 1044, '2' ], [ 2, 183, '3' ], [ 2, 254, '4' ], [ 2, 1024, '5' ], [ 2, 801, '6' ],
    [ 2, 354, '7' ], [ 2, 888, '8' ], [ 2, 926, '9' ], [ -1, 2500, 'snowwar1' ], [ -1, 2500, 'snowwar2' ],
].map(([ requiredClubLevel, tileSize, name ]) => ({ requiredClubLevel: requiredClubLevel as number, tileSize: tileSize as number, name: name as string }));
