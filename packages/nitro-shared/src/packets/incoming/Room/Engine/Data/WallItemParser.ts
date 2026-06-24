import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

import type { IRoomWallItem } from "./IRoomWallItem";

export const WallItemParser = (wrapper: IMessageDataWrapper): IRoomWallItem => {
    const item = {
        objectId: parseInt(wrapper.readString()),
        spriteId: wrapper.readInt(),
        wallPosition: wrapper.readString(),
        state: wrapper.readString(),
        expires: wrapper.readInt(),
        usagePolicy: wrapper.readInt(),
        ownerId: wrapper.readInt(),
        ownerName: ''
    };

    return item;
}