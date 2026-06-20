import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CancelEventComposerType = {
    advertisementId: number;
};

export class CancelEventComposer implements IOutgoingPacket<CancelEventComposerType> {
    public constructor(private params: CancelEventComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.advertisementId,
        ];
    }
}
