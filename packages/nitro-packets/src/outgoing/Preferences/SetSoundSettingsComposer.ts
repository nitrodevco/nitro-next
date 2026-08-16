import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetSoundSettingsComposerType = object;

export class SetSoundSettingsComposer implements IOutgoingPacket<SetSoundSettingsComposerType> {
    public constructor(private params: SetSoundSettingsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
