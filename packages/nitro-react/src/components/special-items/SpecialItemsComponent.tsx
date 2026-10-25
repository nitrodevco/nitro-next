/**
 * Mounts the special items display (`SpecialItemsController` / `SpecialItemsView`) while its
 * window is up - opened by a `special_items_display/<key>` link (`openSpecialItemsDisplay`),
 * closed by its close button (`SpecialItemsView.hide`).
 */
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { SpecialItemsView } from '#base/views/special-items/SpecialItemsView';

export const SpecialItemsComponent = () => {
    const isVisible = useIsWindowVisible('special_items_display');
    const { hideWindow } = useWindowActions();

    if (!isVisible) return null;

    return <SpecialItemsView onClose={() => hideWindow('special_items_display')} />;
};
