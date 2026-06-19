import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type InitDiffieHandshakeComposerType = object;

export class InitDiffieHandshakeComposer implements IOutgoingPacket<InitDiffieHandshakeComposerType> {
    public constructor(private params: InitDiffieHandshakeComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
