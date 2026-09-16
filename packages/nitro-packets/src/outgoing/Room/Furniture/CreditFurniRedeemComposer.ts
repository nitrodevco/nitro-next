// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CreditFurniRedeemComposerType = {
    objectId: number;
};

export class CreditFurniRedeemComposer implements IOutgoingPacket<CreditFurniRedeemComposerType> {
    public constructor(private params: CreditFurniRedeemComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.objectId,
        ];
    }
}
