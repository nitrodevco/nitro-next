import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type WiredGetRoomSettingsComposerType = object;

export class WiredGetRoomSettingsComposer implements IOutgoingPacket<WiredGetRoomSettingsComposerType> {
    public constructor(private params: WiredGetRoomSettingsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
