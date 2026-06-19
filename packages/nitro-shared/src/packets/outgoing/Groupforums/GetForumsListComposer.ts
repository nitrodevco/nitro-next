import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetForumsListComposerType = object;

export class GetForumsListComposer implements IOutgoingPacket<GetForumsListComposerType> {
    public constructor(private params: GetForumsListComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
