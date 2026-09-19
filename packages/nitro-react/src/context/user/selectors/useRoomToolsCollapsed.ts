import { NoobnessLevelEnum } from '@nitrodevco/nitro-api';

import { UiFlagEnum } from '../store/UserStore';
import { useUserStore } from '../useUserStore';

/**
 * Whether the room tools are folded away to their strip. `RoomToolsWidget`'s constructor:
 * collapsed for anyone still new, and otherwise whatever the account last left them at.
 *
 * The chat bar reads this too, because it starts where the tools end.
 */
export const useRoomToolsCollapsed = () => useUserStore(x =>
    (Number(x.noobnessLevel) !== Number(NoobnessLevelEnum.NotNoob)) || !(x.uiFlags & UiFlagEnum.RoomToolsExpanded));
