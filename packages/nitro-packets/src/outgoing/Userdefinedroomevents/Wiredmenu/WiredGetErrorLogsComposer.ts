import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGetErrorLogsComposerType = object;

export class WiredGetErrorLogsComposer implements IOutgoingPacket<WiredGetErrorLogsComposerType> {
    public constructor(private params: WiredGetErrorLogsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
