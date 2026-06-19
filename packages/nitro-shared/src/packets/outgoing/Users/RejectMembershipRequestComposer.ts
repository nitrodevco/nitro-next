import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RejectMembershipRequestComposerType = object;

export class RejectMembershipRequestComposer implements IOutgoingPacket<RejectMembershipRequestComposerType> {
    public constructor(private params: RejectMembershipRequestComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
