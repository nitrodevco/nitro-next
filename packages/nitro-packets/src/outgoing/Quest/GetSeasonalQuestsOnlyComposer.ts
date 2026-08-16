import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSeasonalQuestsOnlyComposerType = object;

export class GetSeasonalQuestsOnlyComposer implements IOutgoingPacket<GetSeasonalQuestsOnlyComposerType> {
    public constructor(private params: GetSeasonalQuestsOnlyComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
