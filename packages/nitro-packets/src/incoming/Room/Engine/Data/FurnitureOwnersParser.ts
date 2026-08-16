import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export const FurnitureOwnersParser = (wrapper: IMessageDataWrapper) => {
    const owners: Map<number, string> = new Map();

    let count = wrapper.readInt();

    while (count > 0) {
        owners.set(wrapper.readInt(), wrapper.readString());

        count--;
    }

    return owners;
}