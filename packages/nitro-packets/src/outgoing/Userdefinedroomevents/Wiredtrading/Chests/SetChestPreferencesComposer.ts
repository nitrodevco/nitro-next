// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/** The chest settings window; each field mirrors a key of the chest furni's data map, which is where the window reads them from. */
export type SetChestPreferencesComposerType = {
    chestId: number;
    /** `chest_name`, at most 30 characters. */
    name: string;
    /** `chest_desc` */
    description: string;
    /** `everyone_can_open` */
    everyoneCanOpen: boolean;
    /** `everyone_can_donate` */
    everyoneCanDonate: boolean;
    /** `state_control_mode`: 0..3, `wiredchests.settings.appearance.state.<n>`. */
    stateControlMode: number;
    /** `preview_mode`: 0..7, `wiredchests.settings.appearance.preview.<n>`. Furni chests only; a coin chest sends its dropdown's default. */
    previewMode: number;
    /** `preview_amount`: 1..4. Furni chests only. */
    previewAmount: number;
    /** `is_wired_enabled`: the wired upgrade has been bought - Flash sends whether its upgrade button is disabled. */
    isWiredEnabled: boolean;
};

/** Flash `SetChestPreferencesMessageComposer`, sent by `ChestSettingsUI.onSaveClicked`; answered by `ChestPreferencesUpdateSuccessMessage`. */
export class SetChestPreferencesComposer implements IOutgoingPacket<SetChestPreferencesComposerType> {
    public constructor(private params: SetChestPreferencesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.chestId,
            this.params.name,
            this.params.description,
            this.params.everyoneCanOpen,
            this.params.everyoneCanDonate,
            this.params.stateControlMode,
            this.params.previewMode,
            this.params.previewAmount,
            this.params.isWiredEnabled,
        ];
    }
}
