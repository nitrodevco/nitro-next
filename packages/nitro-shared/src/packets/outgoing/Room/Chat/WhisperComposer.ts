import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WhisperComposerType = object;

export class WhisperComposer implements IOutgoingPacket<WhisperComposerType> {
    public constructor(private params: WhisperComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
