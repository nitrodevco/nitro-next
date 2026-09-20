// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray, ParseInts } from '@nitrodevco/nitro-api';

import { IInputSourcesConf } from './IInputSourcesConf';

// com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.InputSourcesConf.readAllowedSources
const readAllowedSources = (wrapper: IMessageDataWrapper): number[][] => ParseArray(wrapper, ParseInts);
// com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.InputSourcesConf.readDefaultSources
const readDefaultSources = (wrapper: IMessageDataWrapper): number[] => ParseInts(wrapper);

export const InputSourcesConfParser = (wrapper: IMessageDataWrapper): IInputSourcesConf => {
    return {
        allowedFurniSources: readAllowedSources(wrapper),
        allowedUserSources: readAllowedSources(wrapper),
        defaultFurniSources: readDefaultSources(wrapper),
        defaultUserSources: readDefaultSources(wrapper),
    };
};
