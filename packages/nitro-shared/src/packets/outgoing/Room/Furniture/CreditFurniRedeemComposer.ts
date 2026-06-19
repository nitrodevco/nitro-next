import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CreditFurniRedeemComposerType = object;

export class CreditFurniRedeemComposer implements IOutgoingPacket<CreditFurniRedeemComposerType> {
    public constructor(private params: CreditFurniRedeemComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
