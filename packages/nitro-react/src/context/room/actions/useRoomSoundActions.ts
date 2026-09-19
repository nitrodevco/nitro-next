import { roomStore } from '../store/RoomStore';

const state = roomStore.getState();

/**
 * Zustand actions are created once and never change, so they are read off the store a single
 * time here rather than subscribed to: a component using these re-renders for nothing.
 */
const actions = {
    setNowPlayingSongId: state.setNowPlayingSongId,
    addSongInfo: state.addSongInfo,
    setRoomMusic: state.setRoomMusic,
    setRoomMusicPlaying: state.setRoomMusicPlaying,
    clearRoomMusic: state.clearRoomMusic,
};

export const useRoomSoundActions = () => actions;
