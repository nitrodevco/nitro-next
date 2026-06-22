import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";
import { GetObjectDataFromWrapper } from "@nitrodevco/nitro-api";

import type { IRoomFloorItem } from "./IRoomFloorItem";

export const FloorItemParser = (wrapper: IMessageDataWrapper): IRoomFloorItem => {
    const item = {
        objectId: wrapper.readInt(),
        spriteId: wrapper.readInt(),
        x: wrapper.readInt(),
        y: wrapper.readInt(),
        rotation: wrapper.readInt(),
        z: parseFloat(wrapper.readString()),
        stackHeight: parseFloat(wrapper.readString()),
        extra: wrapper.readInt(),
        stuffData: GetObjectDataFromWrapper(wrapper),
        expires: wrapper.readInt(),
        usagePolicy: wrapper.readInt(),
        ownerId: wrapper.readInt(),
        ownerName: '',
        spriteName: undefined
    } as IRoomFloorItem;

    if (item.spriteId < 0) item.spriteName = wrapper.readString();

    return item;
}