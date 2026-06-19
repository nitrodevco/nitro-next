import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateForumSettingsComposerType = object;

export class UpdateForumSettingsComposer implements IOutgoingPacket<UpdateForumSettingsComposerType> {
    public constructor(private params: UpdateForumSettingsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
