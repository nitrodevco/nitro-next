import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WithdrawCreditVaultComposerType = object;

export class WithdrawCreditVaultComposer implements IOutgoingPacket<WithdrawCreditVaultComposerType> {
    public constructor(private params: WithdrawCreditVaultComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
