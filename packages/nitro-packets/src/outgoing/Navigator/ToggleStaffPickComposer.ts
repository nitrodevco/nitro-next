import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ToggleStaffPickComposerType = {
    roomId: number;
    isStaffPicked: boolean;
};

export class ToggleStaffPickComposer implements IOutgoingPacket<ToggleStaffPickComposerType> {
    public constructor(private params: ToggleStaffPickComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
            this.params.isStaffPicked,
        ];
    }
}
