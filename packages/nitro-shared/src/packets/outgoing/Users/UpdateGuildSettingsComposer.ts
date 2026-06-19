import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type UpdateGuildSettingsComposerType = object;

export class UpdateGuildSettingsComposer implements IOutgoingPacket<UpdateGuildSettingsComposerType> {
    public constructor(private params: UpdateGuildSettingsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
