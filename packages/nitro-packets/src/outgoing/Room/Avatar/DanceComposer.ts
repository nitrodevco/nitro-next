import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DanceComposerType = {
    danceType: number;
};

export class DanceComposer implements IOutgoingPacket<DanceComposerType> {
    public constructor(private params: DanceComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.danceType
        ];
    }
}
