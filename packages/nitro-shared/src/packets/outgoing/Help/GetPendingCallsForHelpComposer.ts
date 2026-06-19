import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetPendingCallsForHelpComposerType = object;

export class GetPendingCallsForHelpComposer implements IOutgoingPacket<GetPendingCallsForHelpComposerType> {
    public constructor(private params: GetPendingCallsForHelpComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
