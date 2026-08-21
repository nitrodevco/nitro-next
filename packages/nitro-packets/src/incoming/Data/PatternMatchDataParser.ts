import type { IMessageDataWrapper } from "@nitrodevco/nitro-api";

export interface IPatternMatchData {
    pattern: string;
    startIndex: number;
    endIndex: number;
}

export const PatternMatchDataParser = (wrapper: IMessageDataWrapper): IPatternMatchData => {
    const data: IPatternMatchData = {
        pattern: '',
        startIndex: 0,
        endIndex: 0,
    };

    data.pattern = wrapper.readString();
    data.startIndex = wrapper.readInt();
    data.endIndex = wrapper.readInt();

    return data;
}
