import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { parseWiredVisualizationState, WiredVisualizationStateType } from './Data/WiredVisualizationStateParser';

export type WiredFurniVisualizationStateMessageType = WiredVisualizationStateType;

/**
 * Flash `WiredFurniVisualizationStateMessageParser` (WIN63-202610201032): the room's WIRED Set Visibility /
 * Set Highlight states on furni (ids negative for wall items), for a player walking in;
 * `RoomMessageHandler.onWiredFurniVisualizationState` hands them to `RoomEngine.initializeWiredFurniVisualizationStates`.
 */
export class WiredFurniVisualizationStateMessage implements IIncomingPacket<WiredFurniVisualizationStateMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredFurniVisualizationStateMessageType {
        return parseWiredVisualizationState(wrapper);
    }
}
