import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PhotoCompetitionComposerType = object;

export class PhotoCompetitionComposer implements IOutgoingPacket<PhotoCompetitionComposerType> {
    public constructor(private params: PhotoCompetitionComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
