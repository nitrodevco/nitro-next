import { IMessageDataWrapper } from './IMessageDataWrapper';

export const ParseArray = <T>(wrapper: IMessageDataWrapper, parser: (wrapper: IMessageDataWrapper) => T): T[] => {
    const results: T[] = [];

    let count = wrapper.readInt();

    while (count > 0) {
        results.push(parser(wrapper));

        count--;
    }

    return results;
};
