import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    openRoomWidget: state.openRoomWidget,
    updateRoomWidgetData: state.updateRoomWidgetData,
    mergeRoomWidgetData: state.mergeRoomWidgetData,
    closeRoomWidget: state.closeRoomWidget,
    closeRoomWidgetsForObject: state.closeRoomWidgetsForObject,
    setFurnitureContextMenu: state.setFurnitureContextMenu,
};

export const useRoomWidgetActions = () => actions;
