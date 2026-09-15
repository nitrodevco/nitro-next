import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SetChestNotificationPreferencesComposerType = {
    chestId: number;
    mode: number;
    notifyOnDeposit: boolean;
    notifyOnWithdraw: boolean;
    notifyOnWiredTransaction: boolean;
    notifyOnFull: boolean;
    notifyOnEmpty: boolean;
};

export class SetChestNotificationPreferencesComposer implements IOutgoingPacket<SetChestNotificationPreferencesComposerType> {
    public constructor(private params: SetChestNotificationPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
            this.params.mode,
            this.params.notifyOnDeposit,
            this.params.notifyOnWithdraw,
            this.params.notifyOnWiredTransaction,
            this.params.notifyOnFull,
            this.params.notifyOnEmpty,
        ];
    }
}
