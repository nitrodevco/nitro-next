import { useRoomStore } from '../useRoomStore';

/** What the server has told us about one pet, or nothing if it has not been asked about yet. */
export const useRoomPetInfo = (petId: number) => useRoomStore(x => x.petsById[petId]);
