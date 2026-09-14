import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** Reads `int count` followed by `count` (string key, string value) pairs into a Map. */
export const ParseStringMap = (wrapper: IMessageDataWrapper): Map<string, string> => {
    const map = new Map<string, string>();

    let count = wrapper.readInt();

    while (count > 0) {
        const key = wrapper.readString();
        const value = wrapper.readString();

        map.set(key, value);

        count--;
    }

    return map;
};
