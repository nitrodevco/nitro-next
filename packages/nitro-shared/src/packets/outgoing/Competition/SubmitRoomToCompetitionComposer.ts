import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SubmitRoomToCompetitionComposerType = object;

export class SubmitRoomToCompetitionComposer implements IOutgoingPacket<SubmitRoomToCompetitionComposerType> {
    public constructor(private params: SubmitRoomToCompetitionComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
