// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

/** One `%key%` of the localization and what to put in its place. */
export interface IWiredValidationErrorParameter {
    key: string;
    value: string;
}

export type WiredValidationErrorEventMessageType = {
    localizationKey: string;
    parameters: IWiredValidationErrorParameter[];
};

export class WiredValidationErrorEventMessage implements IIncomingPacket<WiredValidationErrorEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredValidationErrorEventMessageType {
        const packet: WiredValidationErrorEventMessageType = {
            localizationKey: wrapper.readString(),
            parameters: ParseArray(wrapper, wrapper => ({ key: wrapper.readString(), value: wrapper.readString() })),
        };

        return packet;
    }
}
