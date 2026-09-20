// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredUserPermanentVariablesList } from './Data/IWiredUserPermanentVariablesList';
import { WiredUserPermanentVariablesListParser } from './Data/WiredUserPermanentVariablesListParser';

export type WiredUserPermanentVariablesMessageType = {
    list: IWiredUserPermanentVariablesList;
};

/** The answer to `WiredGetUserPermanentVariablesComposer`. Flash parser `_-a2Q._-m1s`, shown by `VariableManagementDetailView`. */
export class WiredUserPermanentVariablesMessage implements IIncomingPacket<WiredUserPermanentVariablesMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredUserPermanentVariablesMessageType {
        const list = WiredUserPermanentVariablesListParser(wrapper);

        return { list };
    }
}
