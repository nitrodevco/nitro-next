import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetThreadComposerType = object;

export class GetThreadComposer implements IOutgoingPacket<GetThreadComposerType> {
    public constructor(private params: GetThreadComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
