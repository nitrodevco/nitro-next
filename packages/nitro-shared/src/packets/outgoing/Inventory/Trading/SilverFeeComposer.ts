import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SilverFeeComposerType = object;

export class SilverFeeComposer implements IOutgoingPacket<SilverFeeComposerType> {
    public constructor(private params: SilverFeeComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
