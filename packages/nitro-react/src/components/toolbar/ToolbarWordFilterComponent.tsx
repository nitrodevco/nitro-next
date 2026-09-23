/**
 * Mounts the toolbar's word filter window (`WordFilterSettingsView`) while it is up - opened from
 * the settings list under the purse; its back button closes it (`disposeWindow`).
 */
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { ToolbarWordFilterView } from '#base/views/toolbar/ToolbarWordFilterView';

export const ToolbarWordFilterComponent = () => {
    const isVisible = useIsWindowVisible('toolbar_word_filter');
    const { hideWindow } = useWindowActions();

    if (!isVisible) return null;

    return <ToolbarWordFilterView onClose={() => hideWindow('toolbar_word_filter')} />;
};
