import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuildBaseSearchComposerType = {
    unknown: number;
};

export class GuildBaseSearchComposer implements IOutgoingPacket<GuildBaseSearchComposerType> {
    public constructor(private params: GuildBaseSearchComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.unknown,
        ];
    }
}
