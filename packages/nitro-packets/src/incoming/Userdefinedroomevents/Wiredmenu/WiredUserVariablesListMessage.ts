// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredUserVariablesPage } from './Data/IWiredUserVariablesPage';
import { WiredUserVariablesPageParser } from './Data/WiredUserVariablesPageParser';

export type WiredUserVariablesListMessageType = {
    page: IWiredUserVariablesPage;
};

/** The answer to `WiredGetVariableOwnersPageComposer`. Flash parser `_-a2Q._-q1W`, shown by `VariableManagementOverviewView`. */
export class WiredUserVariablesListMessage implements IIncomingPacket<WiredUserVariablesListMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredUserVariablesListMessageType {
        const page = WiredUserVariablesPageParser(wrapper);

        return { page };
    }
}
