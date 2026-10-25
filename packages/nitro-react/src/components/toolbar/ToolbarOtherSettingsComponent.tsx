/**
 * Mounts the toolbar's "other settings" window (`OtherSettingsView`) while it is up - opened from
 * the settings list under the purse; its back button closes it (`dispose`).
 */
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { ToolbarOtherSettingsView } from '#base/views/toolbar/ToolbarOtherSettingsView';

export const ToolbarOtherSettingsComponent = () => {
    const isVisible = useIsWindowVisible('toolbar_other_settings');
    const { hideWindow } = useWindowActions();

    if (!isVisible) return null;

    return <ToolbarOtherSettingsView onClose={() => hideWindow('toolbar_other_settings')} />;
};
