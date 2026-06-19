import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSoundSettingsComposerType = object;

export class GetSoundSettingsComposer implements IOutgoingPacket<GetSoundSettingsComposerType> {
    public constructor(private params: GetSoundSettingsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
