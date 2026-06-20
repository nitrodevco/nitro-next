import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CompleteDiffieHandshakeComposerType = {
    sharedKey: string;
};

export class CompleteDiffieHandshakeComposer implements IOutgoingPacket<CompleteDiffieHandshakeComposerType> {
    public constructor(private params: CompleteDiffieHandshakeComposerType) { }

    public compose(): (number | string)[] {
        return [
            this.params.sharedKey,
        ];
    }
}
