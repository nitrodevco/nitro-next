import { IRoomWidgetRequest } from '@nitrodevco/nitro-api';

import { useRoomContext } from '../../useRoomContext';

/**
 * The open request for one widget type, if it is open. Widgets that are told things by their
 * own packet handler name that shape here, so `request.data` reads without a cast.
 */
export const useRoomWidget = <TData extends object = object>(type: string): IRoomWidgetRequest<TData> | undefined =>
    useRoomContext(x => x.openWidgets[type] as IRoomWidgetRequest<TData> | undefined);
