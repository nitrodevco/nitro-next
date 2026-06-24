import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RateFlatComposerType = {
    points: number;
};

export class RateFlatComposer implements IOutgoingPacket<RateFlatComposerType> {
    public constructor(private params: RateFlatComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.points,
        ];
    }
}
