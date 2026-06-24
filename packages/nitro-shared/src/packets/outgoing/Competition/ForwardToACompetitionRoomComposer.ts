import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ForwardToACompetitionRoomComposerType = object;

export class ForwardToACompetitionRoomComposer implements IOutgoingPacket<ForwardToACompetitionRoomComposerType> {
    public constructor(private params: ForwardToACompetitionRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
