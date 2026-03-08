import type { RoomObjectEvent } from '@nitrodevco/nitro-shared';

import { useRoomEventDispatcher } from '../../hooks/room/useRoomEventDispatcher';

export const useRoomObjectEvent = <T extends RoomObjectEvent>(
    type: string | string[],
    handler: (event: T) => void,
    enabled: boolean = true,
) => {
    useRoomEventDispatcher(type, handler, enabled);
};
