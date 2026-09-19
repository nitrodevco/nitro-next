import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredFurniAddonDef } from './IWiredFurniAddonDef';
import { WiredFurniActionDefBaseParser } from './WiredFurniActionDefBaseParser';

export const WiredFurniAddonDefParser = (wrapper: IMessageDataWrapper): IWiredFurniAddonDef => {
    const base = WiredFurniActionDefBaseParser(wrapper);
    return { ...base };
};
