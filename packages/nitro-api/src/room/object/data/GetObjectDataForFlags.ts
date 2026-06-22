/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import type { IMessageDataWrapper } from '#api/communication/IMessageDataWrapper';

import type { IObjectData } from './IObjectData';
import { ObjectDataFlagsEnum } from './ObjectDataFlagsEnum';
import {
    CrackableDataType,
    EmptyDataType,
    HighScoreDataType,
    LegacyDataType,
    MapDataType,
    NumberDataType,
    StringDataType,
    VoteDataType,
} from './type';

export const GetObjectDataForFlags = (flags: ObjectDataFlagsEnum) => {
    let objectData: IObjectData;

    const baseFlags = (flags & 0xff);

    switch (baseFlags) {
        case ObjectDataFlagsEnum.Crackable:
            objectData = new CrackableDataType();
            break;
        case ObjectDataFlagsEnum.Empty:
            objectData = new EmptyDataType();
            break;
        case ObjectDataFlagsEnum.Highscore:
            objectData = new HighScoreDataType();
            break;
        case ObjectDataFlagsEnum.Map:
            objectData = new MapDataType();
            break;
        case ObjectDataFlagsEnum.Number:
            objectData = new NumberDataType();
            break;
        case ObjectDataFlagsEnum.String:
            objectData = new StringDataType();
            break;
        case ObjectDataFlagsEnum.Vote:
            objectData = new VoteDataType();
            break;
        case ObjectDataFlagsEnum.Legacy:
        default:
            objectData = new LegacyDataType();
            break;
    }

    objectData.flags = flags & 0xff00;

    return objectData;
};

export const GetObjectDataFromWrapper = (wrapper: IMessageDataWrapper) => {
    const data = GetObjectDataForFlags(wrapper.readInt());

    data.parseWrapper(wrapper);

    return data;
}
