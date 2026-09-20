// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetRoomCameraPreferencesComposerType = {
    /** The "disable room camera follow" checkbox - `SessionDataManager.isRoomCameraFollowDisabled`. */
    cameraFollowDisabled: boolean;
};

export class SetRoomCameraPreferencesComposer implements IOutgoingPacket<SetRoomCameraPreferencesComposerType> {
    public constructor(private params: SetRoomCameraPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.cameraFollowDisabled,
        ];
    }
}
