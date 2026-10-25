import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredRoomStatsData } from './IWiredRoomStatsData';

export const WiredRoomStatsDataParser = (wrapper: IMessageDataWrapper): IWiredRoomStatsData => {
    return {
        executionCost: wrapper.readDouble(),
        executionCostCap: wrapper.readDouble(),
        isHeavy: wrapper.readBoolean(),
        floorItemCount: wrapper.readInt(),
        floorItemCap: wrapper.readInt(),
        wallItemCount: wrapper.readInt(),
        wallItemCap: wrapper.readInt(),
        permanentFurniVariables: wrapper.readInt(),
        maxPermanentFurniVariables: wrapper.readInt(),
        permanentUserVariables: wrapper.readInt(),
        maxPermanentUserVariables: wrapper.readInt(),
        permanentGlobalVariables: wrapper.readInt(),
        maxPermanentGlobalVariables: wrapper.readInt(),
    };
};
