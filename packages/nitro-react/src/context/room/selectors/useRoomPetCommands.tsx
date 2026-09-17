import { useRoomStore } from '../useRoomStore';

/** The commands a pet has learned, empty until they have been asked for. */
const NONE: number[] = [];

export const useRoomPetCommands = (petId: number) => useRoomStore(x => x.petCommandsById[petId] ?? NONE);
