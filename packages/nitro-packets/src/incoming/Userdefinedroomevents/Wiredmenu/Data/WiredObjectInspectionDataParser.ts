import { IMessageDataWrapper, ParseInts } from '@nitrodevco/nitro-api';

import { IWiredObjectInspectionData } from './IWiredObjectInspectionData';

export const WiredObjectInspectionDataParser = (wrapper: IMessageDataWrapper): IWiredObjectInspectionData => {
    let userIndex: number | undefined;
    let objectId: number | undefined;
    let configuredInWireds: number[] = [];
    const type = wrapper.readInt();
    if (type === 0 /* WiredObjectInspectionData._-216 */) {
        objectId = wrapper.readInt();
    } else if (type === 1 /* WiredObjectInspectionData._-h1C */) {
        userIndex = wrapper.readInt();
    }
    const variableValues = new Map();
    const count = wrapper.readInt();
    for (let i2 = 0; i2 < count; i2++) {
        const loc5 = wrapper.readString();
        const loc6 = wrapper.readInt();
        variableValues.set(loc5, loc6);
    }
    if (type === 0 /* WiredObjectInspectionData._-216 */) {
        configuredInWireds = ParseInts(wrapper);
    }
    return { type, userIndex, objectId, variableValues, configuredInWireds };
};
