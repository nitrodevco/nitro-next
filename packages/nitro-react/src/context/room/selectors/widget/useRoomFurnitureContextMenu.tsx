import { IRoomWidgetContextMenu } from '@nitrodevco/nitro-api';

import { useRoomContext } from '../../useRoomContext';

/** The context menu offered by the selected furniture, if its logic has one. */
export const useRoomFurnitureContextMenu = (): IRoomWidgetContextMenu | undefined => useRoomContext(x => x.furnitureContextMenu);
