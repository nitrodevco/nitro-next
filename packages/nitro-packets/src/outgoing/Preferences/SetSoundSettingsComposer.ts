// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * `HabboSoundManagerFlash10.storeVolumeSetting`. Flash holds each volume as 0..1 and sends it as
 * an int percentage; its composer is constructed `(trax, furni, generic)` and pushes them back to
 * front, so the wire order is the one `AccountPreferencesEventMessage` reads them back in.
 */
export type SetSoundSettingsComposerType = {
    /** The client's own sounds - Flash's `genericVolume`, 0..100. */
    uiVolume: number;
    furniVolume: number;
    traxVolume: number;
};

export class SetSoundSettingsComposer implements IOutgoingPacket<SetSoundSettingsComposerType> {
    public constructor(private params: SetSoundSettingsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.uiVolume,
            this.params.furniVolume,
            this.params.traxVolume,
        ];
    }
}
