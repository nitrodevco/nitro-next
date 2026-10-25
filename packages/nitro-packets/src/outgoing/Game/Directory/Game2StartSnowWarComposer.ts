import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2StartSnowWarComposerType = {
    key: string;
};

export class Game2StartSnowWarComposer implements IOutgoingPacket<Game2StartSnowWarComposerType> {
    public constructor(private params: Game2StartSnowWarComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.key,
        ];
    }
}
