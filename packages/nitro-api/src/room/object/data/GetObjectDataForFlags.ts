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
    let objectData: IObjectData = null!;

    const baseFlags = (flags & 0xff) as ObjectDataFlagsEnum;

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

    if (!objectData) return null;

    objectData.flags = flags & 0xff00;

    return objectData;
};
