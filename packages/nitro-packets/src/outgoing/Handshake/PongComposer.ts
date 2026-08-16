import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type PongComposerType = object;

export class PongComposer implements IOutgoingPacket<PongComposerType> {
    public constructor(private params: PongComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
