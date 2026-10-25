/**
 * A room furni used from its context menu - `RoomObjectEventHandler`'s `UseFurnitureMessageComposer`
 * for a furni whose logic does not use it itself.
 */
import { UseFurnitureComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';

/** `UseFurnitureMessageComposer(objectId, param)`. */
export const sendUseFurniture = (send: Send, objectId: number, param: number = 0) => send(new UseFurnitureComposer({ objectId, param }));
