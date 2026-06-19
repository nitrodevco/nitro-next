import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CallForHelpFromSelfieComposerType = object;

export class CallForHelpFromSelfieComposer implements IOutgoingPacket<CallForHelpFromSelfieComposerType> {
    public constructor(private params: CallForHelpFromSelfieComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
