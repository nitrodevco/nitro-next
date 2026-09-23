/**
 * The volume settings of the toolbar's sound settings window
 * (`toolbar/extensions/settings/SoundSettingsView`), which are `HabboSoundManagerFlash10`'s three
 * volumes. Flash separates the two ways a volume moves: `previewVolume` applies it without telling
 * the server, and the manager's own setters apply it and store it. So the window previews while a
 * slider is dragged or a mute button is pressed and commits once, on its Back button
 * (`SoundSettingsView.dispose` saves all three).
 */
import { SetSoundSettingsComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { SOUND_VOLUME_SCALE, userStore } from '#base/context/user';

type Send = WebSocketConnection['send'];

/** `previewVolume`: applied here and nowhere else - the server is not told. */
export const previewSoundVolumes = (uiVolume: number, furniVolume: number, traxVolume: number) =>
    userStore.getState().setSoundVolumes(uiVolume, furniVolume, traxVolume);

/** `storeVolumeSetting`: the three volumes as they stand, each as a whole percentage. */
export const saveSoundVolumes = (send: Send) => {
    const { uiVolume, furniVolume, traxVolume } = userStore.getState();

    send(new SetSoundSettingsComposer({
        uiVolume: Math.trunc(uiVolume * SOUND_VOLUME_SCALE),
        furniVolume: Math.trunc(furniVolume * SOUND_VOLUME_SCALE),
        traxVolume: Math.trunc(traxVolume * SOUND_VOLUME_SCALE),
    }));
};
