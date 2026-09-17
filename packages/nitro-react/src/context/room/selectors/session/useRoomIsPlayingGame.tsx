import { useRoomStore } from '../../useRoomStore';

export const useRoomIsPlayingGame = () => useRoomStore(x => x.isPlayingGame);
