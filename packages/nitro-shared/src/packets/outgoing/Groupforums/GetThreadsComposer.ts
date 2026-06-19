import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetThreadsComposerType = object;

export class GetThreadsComposer implements IOutgoingPacket<GetThreadsComposerType> {
    public constructor(private params: GetThreadsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
