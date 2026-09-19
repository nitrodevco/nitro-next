import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredFurniVariableDef } from './IWiredFurniVariableDef';
import { WiredFurniActionDefBaseParser } from './WiredFurniActionDefBaseParser';

export const WiredFurniVariableDefParser = (wrapper: IMessageDataWrapper): IWiredFurniVariableDef => {
    const base = WiredFurniActionDefBaseParser(wrapper);
    return { ...base };
};
