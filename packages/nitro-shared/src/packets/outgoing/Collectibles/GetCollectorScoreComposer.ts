import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCollectorScoreComposerType = object;

export class GetCollectorScoreComposer implements IOutgoingPacket<GetCollectorScoreComposerType> {
    public constructor(private params: GetCollectorScoreComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
