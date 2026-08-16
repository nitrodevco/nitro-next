import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSilverComposerType = object;

export class GetSilverComposer implements IOutgoingPacket<GetSilverComposerType> {
    public constructor(private params: GetSilverComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
