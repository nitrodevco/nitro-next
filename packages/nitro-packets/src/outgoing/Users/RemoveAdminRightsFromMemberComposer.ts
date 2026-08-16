import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RemoveAdminRightsFromMemberComposerType = object;

export class RemoveAdminRightsFromMemberComposer implements IOutgoingPacket<RemoveAdminRightsFromMemberComposerType> {
    public constructor(private params: RemoveAdminRightsFromMemberComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
