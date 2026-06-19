import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuildEditInfoComposerType = object;

export class GetGuildEditInfoComposer implements IOutgoingPacket<GetGuildEditInfoComposerType> {
    public constructor(private params: GetGuildEditInfoComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
