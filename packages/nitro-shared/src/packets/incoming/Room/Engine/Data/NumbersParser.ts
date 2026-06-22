import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export const NumbersParser = (wrapper: IMessageDataWrapper) => {
    const numbers: number[] = [];

    let count = wrapper.readInt();

    while (count > 0) {
        numbers.push(wrapper.readInt());

        count--;
    }

    return numbers;
}