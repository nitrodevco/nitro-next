// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

export type AuthenticationOKMessageType = {
    accountId: number;
    /** Flash `suggestedLoginActions`: what the server would like the client to open after login. */
    suggestedLoginActions: number[];
    identityId: number;
};

export class AuthenticationOKMessage implements IIncomingPacket<AuthenticationOKMessageType> {
    public parse(wrapper: IMessageDataWrapper): AuthenticationOKMessageType {
        const packet: AuthenticationOKMessageType = {
            accountId: wrapper.readInt(),
            suggestedLoginActions: ParseArray(wrapper, wrapper => wrapper.readShort()),
            identityId: wrapper.readInt(),
        };

        return packet;
    }
}
