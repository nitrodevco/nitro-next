import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ScrGetUserInfoComposerType = {
    productName: string;
};

export class ScrGetUserInfoComposer implements IOutgoingPacket<ScrGetUserInfoComposerType> {
    public constructor(private params: ScrGetUserInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.productName,
        ];
    }
}
