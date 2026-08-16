import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

import type { IRoomWallItem } from "./IRoomWallItem";

export const WallItemParser = (wrapper: IMessageDataWrapper): IRoomWallItem => {
    const item = {
        objectId: parseInt(wrapper.readString()),
        spriteId: wrapper.readInt(),
        wallPosition: wrapper.readString(),
        data: wrapper.readString(),
        state: 0,
        expires: wrapper.readInt(),
        usagePolicy: wrapper.readInt(),
        ownerId: wrapper.readInt(),
        ownerName: ''
    };

    const state = parseFloat(item.data);

    if (!isNaN(state)) item.state = state;

    return item;
}