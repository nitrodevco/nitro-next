import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredClearErrorLogsComposerType = object;

export class WiredClearErrorLogsComposer implements IOutgoingPacket<WiredClearErrorLogsComposerType> {
    public constructor(private params: WiredClearErrorLogsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
