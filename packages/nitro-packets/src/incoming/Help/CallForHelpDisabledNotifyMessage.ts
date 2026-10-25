import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type CallForHelpDisabledNotifyMessageType = {
    /** Where the alert's link goes. */
    infoUrl: string;
};

/** `CallForHelpDisabledNotifyMessageParser`: reporting is off for this account (a global mute). */
export class CallForHelpDisabledNotifyMessage implements IIncomingPacket<CallForHelpDisabledNotifyMessageType> {
    public parse(wrapper: IMessageDataWrapper): CallForHelpDisabledNotifyMessageType {
        return {
            infoUrl: wrapper.readString(),
        };
    }
}
