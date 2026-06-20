import type { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RedeemVoucherComposerType = {
    code: string;
};

export class RedeemVoucherComposer implements IOutgoingPacket<RedeemVoucherComposerType> {
    public constructor(private params: RedeemVoucherComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.code,
        ];
    }
}
