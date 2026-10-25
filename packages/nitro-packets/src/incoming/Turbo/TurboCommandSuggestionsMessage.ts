import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TurboCommandSuggestionsMessageType = {
    /** The `requestId` of the `TurboCommandSuggestComposer` this answers. */
    requestId: number;
    values: string[];
};

/**
 * Not Habbo's: Turbo's answer to `TurboCommandSuggestComposer` (`chat.commands.v2`). Always sent,
 * empty for anything the server will not answer. See Turbo's `docs/client-capabilities.md`.
 */
export class TurboCommandSuggestionsMessage implements IIncomingPacket<TurboCommandSuggestionsMessageType> {
    public parse(wrapper: IMessageDataWrapper): TurboCommandSuggestionsMessageType {
        const requestId = wrapper.readInt();
        const values: string[] = [];

        for (let count = wrapper.readInt(); count > 0; count--) values.push(wrapper.readString());

        return { requestId, values };
    }
}
