import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetOccupiedTilesComposerType = object;

export class GetOccupiedTilesComposer implements IOutgoingPacket<GetOccupiedTilesComposerType> {
    public constructor(private params: GetOccupiedTilesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
