import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { IWiredErrorLogsError } from './Data/IWiredErrorLogsError';
import { WiredErrorLogsErrorParser } from './Data/WiredErrorLogsErrorParser';

export type WiredErrorLogsMessageType = {
    errors: IWiredErrorLogsError[];
};

export class WiredErrorLogsMessage implements IIncomingPacket<WiredErrorLogsMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredErrorLogsMessageType {
        const errors = ParseArray(wrapper, WiredErrorLogsErrorParser);
        return { errors };
    }
}
