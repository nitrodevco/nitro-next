import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ModToolSanctionComposerType = object;

export class ModToolSanctionComposer implements IOutgoingPacket<ModToolSanctionComposerType> {
    public constructor(private params: ModToolSanctionComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
