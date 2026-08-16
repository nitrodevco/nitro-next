import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomsWithHighestScoreSearchComposerType = {
    adIndex: number;
};

export class RoomsWithHighestScoreSearchComposer implements IOutgoingPacket<RoomsWithHighestScoreSearchComposerType> {
    public constructor(private params: RoomsWithHighestScoreSearchComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.adIndex,
        ];
    }
}
