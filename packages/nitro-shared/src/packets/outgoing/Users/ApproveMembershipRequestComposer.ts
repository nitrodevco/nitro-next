import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ApproveMembershipRequestComposerType = object;

export class ApproveMembershipRequestComposer implements IOutgoingPacket<ApproveMembershipRequestComposerType> {
    public constructor(private params: ApproveMembershipRequestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
