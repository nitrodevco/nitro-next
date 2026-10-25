import { useWiredStore } from '../useWiredStore';
import { useWiredHasReadPermission } from './useWiredHasReadPermission';
import { useWiredMenuEnabled } from './useWiredMenuEnabled';

/** `HabboUserDefinedRoomEvents.showToolbarMenuButton` - `BottomBarLeft` shows the wired menu icon by it, in a room only. */
export const useWiredShowToolbarMenuButton = () => {
    const menuEnabled = useWiredMenuEnabled();
    const hasReadPermission = useWiredHasReadPermission();
    const wiredMenuButton = useWiredStore(x => x.wiredMenuButton);

    return menuEnabled && hasReadPermission && wiredMenuButton;
};
