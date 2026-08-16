import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type AddAdminRightsToMemberComposerType = object;

export class AddAdminRightsToMemberComposer implements IOutgoingPacket<AddAdminRightsToMemberComposerType> {
    public constructor(private params: AddAdminRightsToMemberComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
