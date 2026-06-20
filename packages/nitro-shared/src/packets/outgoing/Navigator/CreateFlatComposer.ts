import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CreateFlatComposerType = {
    flatName: string;
    flatDescription: string;
    flatModelName: string;
    categoryID: number;
    maxPlayers: number;
    tradeSetting: RoomTradeModeType;
};

export class CreateFlatComposer implements IOutgoingPacket<CreateFlatComposerType> {
    public constructor(private params: CreateFlatComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.flatName,
            this.params.flatDescription,
            this.params.flatModelName,
            this.params.categoryID,
            this.params.maxPlayers,
            this.params.tradeSetting,
        ];
    }
}
