import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setDoorMode: state.setDoorMode,
    setTradeMode: state.setTradeMode,
    setControllerLevel: state.setControllerLevel,
    setPlayTestMode: state.setPlayTestMode,
    setOwnRoomIndex: state.setOwnRoomIndex,
    setAllowPets: state.setAllowPets,
    setIsGuildRoom: state.setIsGuildRoom,
    setIsRoomOwner: state.setIsRoomOwner,
    setIsDecorating: state.setIsDecorating,
    setIsSpectator: state.setIsSpectator,
    setIsPlayingGame: state.setIsPlayingGame,
    setIsWiredGameMode: state.setIsWiredGameMode,
    setIsOwnDancing: state.setIsOwnDancing,
    setIsHanditemControlBlocked: state.setIsHanditemControlBlocked,
    setIsFreeFurniMovementsMode: state.setIsFreeFurniMovementsMode,
    setModerationSettings: state.setModerationSettings,
    setChatSettings: state.setChatSettings,
};

export const useRoomSessionActions = () => actions;
