import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** One named plugin message: see `TurboPluginMessagesMessage`. */
export interface ITurboPluginMessage {
    /** `<plugin key>.<name>`. */
    name: string;
    /** The header the server gave it, the same both ways. */
    header: number;
    /** Its fields as compact JSON: `[[name, type], ...]` (Turbo's `docs/plugin-messages.md`). */
    schema: string;
}

export type TurboPluginMessagesMessageType = {
    /** Every plugin message the server has: the whole set, replacing the last. */
    messages: ITurboPluginMessage[];
};

/**
 * Not Habbo's: Turbo's `client.messages` extension, sent only after the client asked for it - right
 * after the capability answer, and again whenever a plugin adds, removes or reloads messages.
 */
export class TurboPluginMessagesMessage implements IIncomingPacket<TurboPluginMessagesMessageType> {
    public parse(wrapper: IMessageDataWrapper): TurboPluginMessagesMessageType {
        const messages: ITurboPluginMessage[] = [];

        for (let count = wrapper.readInt(); count > 0; count--) messages.push({ name: wrapper.readString(), header: wrapper.readInt(), schema: wrapper.readString() });

        return { messages };
    }
}
