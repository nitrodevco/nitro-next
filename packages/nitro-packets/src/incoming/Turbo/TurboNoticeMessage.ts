import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TurboNoticeMessageType = {
    /** The notice's key, as in `notifications.new_feature.active`. */
    key: string;
    /** Put up; false takes it down. */
    shown: boolean;
    /** Each `notifications.new_feature.<name>.<key>` by name (`type`, `count_down_to`, `expiry`, `external_link`, ...). */
    variables: Record<string, string>;
    /** `notifications.new_feature.<key>.desc`. */
    desc: string;
};

/**
 * Not Habbo's: Turbo's `notices.live` extension - one of the notices under the purse put up or
 * taken down while the client runs, as the countdown notice of a restart. See Turbo's
 * `docs/client-capabilities.md`.
 */
export class TurboNoticeMessage implements IIncomingPacket<TurboNoticeMessageType> {
    public parse(wrapper: IMessageDataWrapper): TurboNoticeMessageType {
        const key = wrapper.readString();
        const shown = wrapper.readBoolean();
        const variables: Record<string, string> = {};

        for (let count = wrapper.readInt(); count > 0; count--) {
            const name = wrapper.readString();

            variables[name] = wrapper.readString();
        }

        return { key, shown, variables, desc: wrapper.readString() };
    }
}
