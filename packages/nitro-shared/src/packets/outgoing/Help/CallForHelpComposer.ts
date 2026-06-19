import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CallForHelpComposerType = object;

export class CallForHelpComposer implements IOutgoingPacket<CallForHelpComposerType> {
    public constructor(private params: CallForHelpComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
