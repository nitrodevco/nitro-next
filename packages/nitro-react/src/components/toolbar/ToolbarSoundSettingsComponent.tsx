/**
 * Mounts the toolbar's sound settings window (`SoundSettingsView`) while it is up - opened from
 * the settings list under the purse; its back button closes it (`dispose`).
 */
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { ToolbarSoundSettingsView } from '#base/views/toolbar/ToolbarSoundSettingsView';

export const ToolbarSoundSettingsComponent = () => {
    const isVisible = useIsWindowVisible('toolbar_sound_settings');
    const { hideWindow } = useWindowActions();

    if (!isVisible) return null;

    return <ToolbarSoundSettingsView onClose={() => hideWindow('toolbar_sound_settings')} />;
};
