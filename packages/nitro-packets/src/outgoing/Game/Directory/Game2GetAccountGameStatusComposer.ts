import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2GetAccountGameStatusComposerType = {
    gameTypeId: number;
};

export class Game2GetAccountGameStatusComposer implements IOutgoingPacket<Game2GetAccountGameStatusComposerType> {
    public constructor(private params: Game2GetAccountGameStatusComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.gameTypeId,
        ];
    }
}
