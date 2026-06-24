import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetTalentTrackLevelComposerType = object;

export class GetTalentTrackLevelComposer implements IOutgoingPacket<GetTalentTrackLevelComposerType> {
    public constructor(private params: GetTalentTrackLevelComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
