import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type CallForHelpFromIMComposerType = object;

export class CallForHelpFromIMComposer implements IOutgoingPacket<CallForHelpFromIMComposerType> {
    public constructor(private params: CallForHelpFromIMComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
