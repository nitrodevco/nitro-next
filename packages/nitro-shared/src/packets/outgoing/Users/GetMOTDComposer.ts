import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetMOTDComposerType = object;

export class GetMOTDComposer implements IOutgoingPacket<GetMOTDComposerType> {
    public constructor(private params: GetMOTDComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
