import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuildCreationInfoComposerType = object;

export class GetGuildCreationInfoComposer implements IOutgoingPacket<GetGuildCreationInfoComposerType> {
    public constructor(private params: GetGuildCreationInfoComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
