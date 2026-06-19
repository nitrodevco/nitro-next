import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ForwardToRandomCompetitionRoomComposerType = object;

export class ForwardToRandomCompetitionRoomComposer implements IOutgoingPacket<ForwardToRandomCompetitionRoomComposerType> {
    public constructor(private params: ForwardToRandomCompetitionRoomComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
