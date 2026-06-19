import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type DeletePendingCallsForHelpComposerType = object;

export class DeletePendingCallsForHelpComposer implements IOutgoingPacket<DeletePendingCallsForHelpComposerType> {
    public constructor(private params: DeletePendingCallsForHelpComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
