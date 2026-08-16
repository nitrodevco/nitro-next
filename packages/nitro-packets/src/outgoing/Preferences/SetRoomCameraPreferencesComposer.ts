import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetRoomCameraPreferencesComposerType = object;

export class SetRoomCameraPreferencesComposer implements IOutgoingPacket<SetRoomCameraPreferencesComposerType> {
    public constructor(private params: SetRoomCameraPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
