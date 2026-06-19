import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModBanComposerType = object;

export class ModBanComposer implements IOutgoingPacket<ModBanComposerType> {
    public constructor(private params: ModBanComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
