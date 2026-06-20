import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CompetitionRoomsSearchComposerType = {
    goalId: number;
    pageIndex: number;
};

export class CompetitionRoomsSearchComposer implements IOutgoingPacket<CompetitionRoomsSearchComposerType> {
    public constructor(private params: CompetitionRoomsSearchComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.goalId,
            this.params.pageIndex,
        ];
    }
}
