import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetTalentTrackComposerType = object;

export class GetTalentTrackComposer implements IOutgoingPacket<GetTalentTrackComposerType> {
    public constructor(private params: GetTalentTrackComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
