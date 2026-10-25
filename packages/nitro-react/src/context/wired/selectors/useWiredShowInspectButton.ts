import { useWiredStore } from '../useWiredStore';
import { useWiredHasReadPermission } from './useWiredHasReadPermission';
import { useWiredMenuEnabled } from './useWiredMenuEnabled';

/** `HabboUserDefinedRoomEvents.showInspectButton` - the "wired inspect" button of the infostand and the avatar menus. */
export const useWiredShowInspectButton = () => {
    const menuEnabled = useWiredMenuEnabled();
    const hasReadPermission = useWiredHasReadPermission();
    const wiredInspectButton = useWiredStore(x => x.wiredInspectButton);

    return menuEnabled && hasReadPermission && wiredInspectButton;
};
