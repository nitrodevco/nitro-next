import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setFloorPlanReceivedModel: state.setFloorPlanReceivedModel,
    setFloorPlanRows: state.setFloorPlanRows,
    setFloorPlanOccupiedTiles: state.setFloorPlanOccupiedTiles,
    setFloorPlanEntryPoint: state.setFloorPlanEntryPoint,
    setFloorPlanEntryPointDir: state.setFloorPlanEntryPointDir,
    setFloorPlanFixedWallsHeight: state.setFloorPlanFixedWallsHeight,
    setFloorPlanThickness: state.setFloorPlanThickness,
};

export const useRoomFloorPlanActions = () => actions;
