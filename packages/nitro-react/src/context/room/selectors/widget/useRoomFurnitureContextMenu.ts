import { IRoomWidgetContextMenu } from '@nitrodevco/nitro-api';

import { useRoomStore } from '../../useRoomStore';

/** The context menu offered by the selected furniture, if its logic has one. */
export const useRoomFurnitureContextMenu = (): IRoomWidgetContextMenu | undefined => useRoomStore(x => x.furnitureContextMenu);
