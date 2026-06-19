import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredSetRoomSettingsComposerType = object;

export class WiredSetRoomSettingsComposer implements IOutgoingPacket<WiredSetRoomSettingsComposerType> {
    public constructor(private params: WiredSetRoomSettingsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
