import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetRaidProtectionSettingsComposerType = {
    roomId: number;
};

export class GetRaidProtectionSettingsComposer implements IOutgoingPacket<GetRaidProtectionSettingsComposerType> {
    public constructor(private params: GetRaidProtectionSettingsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomId,
        ];
    }
}
