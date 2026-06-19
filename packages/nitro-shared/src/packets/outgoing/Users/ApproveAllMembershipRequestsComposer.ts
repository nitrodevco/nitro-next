import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ApproveAllMembershipRequestsComposerType = object;

export class ApproveAllMembershipRequestsComposer implements IOutgoingPacket<ApproveAllMembershipRequestsComposerType> {
    public constructor(private params: ApproveAllMembershipRequestsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
