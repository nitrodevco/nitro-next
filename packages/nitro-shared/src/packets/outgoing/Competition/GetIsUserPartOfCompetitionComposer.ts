import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetIsUserPartOfCompetitionComposerType = object;

export class GetIsUserPartOfCompetitionComposer implements IOutgoingPacket<GetIsUserPartOfCompetitionComposerType> {
    public constructor(private params: GetIsUserPartOfCompetitionComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
