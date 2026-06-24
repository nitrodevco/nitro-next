import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomCompetitionInitComposerType = object;

export class RoomCompetitionInitComposer implements IOutgoingPacket<RoomCompetitionInitComposerType> {
    public constructor(private params: RoomCompetitionInitComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
