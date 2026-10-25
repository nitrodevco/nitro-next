// Body filled by hand from the AS3 composer.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateForumSettingsComposerType = {
    groupId: number;
    readPermissions: number;
    postMessagePermissions: number;
    postThreadPermissions: number;
    moderatePermissions: number;
};

/** `UpdateForumSettingsMessageComposer`. */
export class UpdateForumSettingsComposer implements IOutgoingPacket<UpdateForumSettingsComposerType> {
    public constructor(private params: UpdateForumSettingsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.groupId,
            this.params.readPermissions,
            this.params.postMessagePermissions,
            this.params.postThreadPermissions,
            this.params.moderatePermissions,
        ];
    }
}
