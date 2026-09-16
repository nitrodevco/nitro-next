import { RoomObjectCategoryEnum } from '../object';

/**
 * One furniture widget a room object has asked for, as the Flash client's
 * `RoomObjectWidgetRequestEvent` did: a logic calls for its dialog (a stickie's text, a trophy's
 * engraving, a present's contents) and the UI opens that dialog against the object that asked.
 *
 * The request carries the object rather than its data - a room object's model is not reactive,
 * so a widget re-reads it on demand. `sequence` is what tells it to: a logic that re-dispatches
 * the same request after the server updates the object (`FurnitureStickieLogic` does this on
 * every item-data update) bumps the sequence, and the open widget reads the model again.
 *
 * `TData` is whatever the widget's own packet handler puts on the request. Each widget names
 * that shape where it reads it, which is the only place the two sides have to agree.
 */
export interface IRoomWidgetRequest<TData = unknown> {
    /** The `RoomObjectWidgetRequestEvent` type that asked for it - also the key it is stored under. */
    type: string;
    objectId: number;
    category: RoomObjectCategoryEnum;
    objectType: string;
    /** Bumped every time the same widget is requested again; widgets use it to re-read the model. */
    sequence: number;
    /** Whatever the widget's own packet handler has since put there (a present's contents, a dimmer's presets). */
    data?: TData;
}

/**
 * The context menu a selected piece of furniture offers, from the logic's own `contextMenu`
 * (a `ContextMenuEnum` value). Selection-driven rather than use-driven, so it is tracked apart
 * from the widgets above and consumed by the object menu.
 */
export interface IRoomWidgetContextMenu {
    menu: string;
    objectId: number;
    category: RoomObjectCategoryEnum;
}
