import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DefaultSanctionComposerType = object;

export class DefaultSanctionComposer implements IOutgoingPacket<DefaultSanctionComposerType> {
    public constructor(private params: DefaultSanctionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
