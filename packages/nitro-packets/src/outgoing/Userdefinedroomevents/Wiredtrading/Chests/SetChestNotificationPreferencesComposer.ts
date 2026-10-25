// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** The chest notification settings window; each field mirrors a key of the chest furni's data map. */
export type SetChestNotificationPreferencesComposerType = {
    chestId: number;
    /** `notify_mode`: 0 or 1, `wiredchests.notification_settings.notification_mode.when.<n>`. */
    notifyMode: number;
    /** `notification_chest_full` */
    notifyOnChestFull: boolean;
    /** `notification_donation` */
    notifyOnDonation: boolean;
    /** `notification_someone_withdraws`. This and the two below are the wired group, disabled until the chest is wired enabled. */
    notifyOnWithdraw: boolean;
    /** `notification_chest_empty` */
    notifyOnChestEmpty: boolean;
    /** `notification_wired_transaction` */
    notifyOnWiredTransaction: boolean;
};

/** Flash `SetChestNotificationPreferencesMessageComposer`, sent by `ChestNotificationSettingsUI`; answered by `ChestPreferencesUpdateSuccessMessage`. */
export class SetChestNotificationPreferencesComposer implements IOutgoingPacket<SetChestNotificationPreferencesComposerType> {
    public constructor(private params: SetChestNotificationPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
            this.params.notifyMode,
            this.params.notifyOnChestFull,
            this.params.notifyOnDonation,
            this.params.notifyOnWithdraw,
            this.params.notifyOnChestEmpty,
            this.params.notifyOnWiredTransaction,
        ];
    }
}
