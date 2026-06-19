import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CraftSecretComposerType = object;

export class CraftSecretComposer implements IOutgoingPacket<CraftSecretComposerType> {
    public constructor(private params: CraftSecretComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
