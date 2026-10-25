/**
 * Mounts the toolbar's chat settings window (`ChatSettingsView`) while it is up - opened from the
 * settings list under the purse; its back button closes it (`dispose`).
 */
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { ToolbarChatSettingsView } from '#base/views/toolbar/ToolbarChatSettingsView';

export const ToolbarChatSettingsComponent = () => {
    const isVisible = useIsWindowVisible('toolbar_chat_settings');
    const { hideWindow } = useWindowActions();

    if (!isVisible) return null;

    return <ToolbarChatSettingsView onClose={() => hideWindow('toolbar_chat_settings')} />;
};
