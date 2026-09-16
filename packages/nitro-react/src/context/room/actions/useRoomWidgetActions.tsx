import { useShallow } from 'zustand/shallow';

import { useRoomContext } from '#base/context';

export const useRoomWidgetActions = () => useRoomContext(useShallow(x => ({
    openRoomWidget: x.openRoomWidget,
    updateRoomWidgetData: x.updateRoomWidgetData,
    mergeRoomWidgetData: x.mergeRoomWidgetData,
    closeRoomWidget: x.closeRoomWidget,
    closeRoomWidgetsForObject: x.closeRoomWidgetsForObject,
    setFurnitureContextMenu: x.setFurnitureContextMenu,
})));
