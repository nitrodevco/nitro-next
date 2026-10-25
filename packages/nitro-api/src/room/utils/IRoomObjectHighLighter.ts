/**
 * The looks the wired UI puts on room objects, reached as `IRoom.objectHighLighter`. It covers the
 * two Flash classes that wrote `FurnitureVisualization.filters`:
 *
 * - `roomevents/wired_setup/RoomObjectHighLighter.as` - the furni picked in a wired dialog and
 *   the wired box being edited;
 * - `roomevents/wired_menu/.../VariableHoldersHighlighter.as` - the furni, pets and avatars the
 *   wired menu marks (the holders of a variable, and the wired boxes an inspected furni is
 *   configured in). Only its room side lives here; the value bubbles are UI.
 *
 * Flash built the filters in the UI and pushed them into the visualization. The filters are Pixi
 * objects here, so the engine owns them and the UI only names the look it wants.
 *
 * A furni id is the wired protocol's: positive for a floor item, negative for a wall item.
 * An id whose object is not in the room is ignored. The looks sit on the object's
 * visualization, so they go when the object is removed: a caller that tracks picked furni
 * shows them again on `RoomEngineObjectEvent.ADDED`, as `UserDefinedRoomEventsCtrl.stuffAdded` did.
 */
export interface IRoomObjectHighLighter {
    /**
     * Marks a picked furni. `dualPicking` is whether the dialog has two furni pick sets, and
     * `picks` (1 or 2) the set this furni is in; with a single set pass `false, 0`.
     */
    show(furniId: number, dualPicking: boolean, picks: number): void;
    hide(furniId: number, dualPicking: boolean, picks: number): void;
    showAll(furniIds: Iterable<number>, dualPicking: boolean, picks: number): void;
    hideAll(furniIds: Iterable<number>, dualPicking: boolean, picks: number): void;
    /** The wired box whose dialog is open. */
    highlightActiveWired(furniId: number): void;
    unhighlightActiveWired(furniId: number): void;
    /** Takes the pick and active wired looks off every furni in the room. */
    clear(): void;
    /** `VariableHoldersHighlighter.highlightObject`'s room side. */
    highlightVariableHolderFurni(furniId: number): void;
    unhighlightVariableHolderFurni(furniId: number): void;
    /** `VariableHoldersHighlighter.highlightUser`'s room side; `roomIndex` is the unit's room object id. */
    highlightVariableHolderUser(roomIndex: number): void;
    unhighlightVariableHolderUser(roomIndex: number): void;
    /** Takes the variable holder look off every furni and unit in the room. */
    clearVariableHolders(): void;
}
