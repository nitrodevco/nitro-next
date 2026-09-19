import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setPetInfo: state.setPetInfo,
    updatePetInfo: state.updatePetInfo,
    setPetCommands: state.setPetCommands,
    setBreedMenu: state.setBreedMenu,
    setPlantBreeding: state.setPlantBreeding,
    closePlantBreeding: state.closePlantBreeding,
    setNestBreeding: state.setNestBreeding,
    setNestBreedingNameRejected: state.setNestBreedingNameRejected,
    setBreedingResult: state.setBreedingResult,
    setNestBreedingSuccess: state.setNestBreedingSuccess,
};

export const useRoomPetsActions = () => actions;
