import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type QuitComposerType = object;

export class QuitComposer implements IOutgoingPacket<QuitComposerType> {
    public constructor(private params: QuitComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
