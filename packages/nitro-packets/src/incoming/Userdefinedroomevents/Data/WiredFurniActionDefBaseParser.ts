import { IMessageDataWrapper, ParseInts, ParseStrings } from '@nitrodevco/nitro-api';

import { InputSourcesConfParser } from './InputSourcesConfParser';
import { IWiredFurniActionDefBase } from './IWiredFurniActionDefBase';
import { WiredContextParser } from './WiredContextParser';

export interface WiredFurniActionDefBaseHooks {
    readDefinitionSpecifics?: (wrapper: IMessageDataWrapper) => void;
    readTypeSpecifics?: (wrapper: IMessageDataWrapper) => void;
}

export const WiredFurniActionDefBaseParser = (wrapper: IMessageDataWrapper, hooks: WiredFurniActionDefBaseHooks = {}): IWiredFurniActionDefBase => {
    const furniLimit = wrapper.readInt();
    const stuffIds = ParseInts(wrapper);
    const stuffIds2 = ParseInts(wrapper);
    const stuffTypeId = wrapper.readInt();
    const id = wrapper.readInt();
    const stringParam = wrapper.readString();
    const intParams = ParseInts(wrapper);
    const variableIds = ParseStrings(wrapper);
    const furniSourceTypes = ParseInts(wrapper);
    const userSourceTypes = ParseInts(wrapper);
    const code = wrapper.readInt();
    hooks.readDefinitionSpecifics?.(wrapper);
    const advancedMode = wrapper.readBoolean();
    const inputSourcesConf = InputSourcesConfParser(wrapper);
    const allowWallFurni = wrapper.readBoolean();
    hooks.readTypeSpecifics?.(wrapper);
    const wiredContext = WiredContextParser(wrapper);
    const defaultIntParams = ParseInts(wrapper);
    return { furniLimit, stuffIds, stuffIds2, id, stringParam, intParams, variableIds, stuffTypeId, code, furniSourceTypes, userSourceTypes, advancedMode, inputSourcesConf, allowWallFurni, wiredContext, defaultIntParams };
};
