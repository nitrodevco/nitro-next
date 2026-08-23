import { useRoomContext } from '../../useRoomContext';

export const useRoomIsPlayingGame = () => useRoomContext(x => x.isPlayingGame);
