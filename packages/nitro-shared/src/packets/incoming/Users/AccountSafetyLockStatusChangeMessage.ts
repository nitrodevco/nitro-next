import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type AccountSafetyLockStatusChangeMessageType = {
    status: number;
};

export class AccountSafetyLockStatusChangeMessage implements IIncomingPacket<AccountSafetyLockStatusChangeMessageType> {
    public parse(wrapper: IMessageDataWrapper): AccountSafetyLockStatusChangeMessageType {
        const packet: AccountSafetyLockStatusChangeMessageType = {
            status: wrapper.readInt(),
        };

        return packet;
    }
}
