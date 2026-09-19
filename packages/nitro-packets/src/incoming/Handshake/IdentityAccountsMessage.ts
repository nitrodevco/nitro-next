import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IdentityAccountsMessageType = {
    accounts: Map<number, string>;
};

export class IdentityAccountsMessage implements IIncomingPacket<IdentityAccountsMessageType> {
    public parse(wrapper: IMessageDataWrapper): IdentityAccountsMessageType {
        const accounts = new Map();
        const count = wrapper.readInt();
        for (let i2 = 0; i2 < count; i2++) {
            accounts.set(wrapper.readInt(), wrapper.readString());
        }
        return { accounts };
    }
}
