import { IMessageDataWrapper } from './IMessageDataWrapper';

export const ParseInts = (wrapper: IMessageDataWrapper): number[] => {
    const results: number[] = [];

    let count = wrapper.readInt();

    while (count > 0) {
        results.push(wrapper.readInt());

        count--;
    }

    return results;
};
