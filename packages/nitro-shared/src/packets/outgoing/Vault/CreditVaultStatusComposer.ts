import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CreditVaultStatusComposerType = object;

export class CreditVaultStatusComposer implements IOutgoingPacket<CreditVaultStatusComposerType> {
    public constructor(private params: CreditVaultStatusComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
