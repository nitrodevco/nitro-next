import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredFurniTriggerDef } from './IWiredFurniTriggerDef';
import { WiredFurniActionDefBaseParser } from './WiredFurniActionDefBaseParser';

export const WiredFurniTriggerDefParser = (wrapper: IMessageDataWrapper): IWiredFurniTriggerDef => {
    const base = WiredFurniActionDefBaseParser(wrapper);
    return { ...base };
};
