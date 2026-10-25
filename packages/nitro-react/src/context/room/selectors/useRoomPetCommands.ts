import { useRoomStore } from '../useRoomStore';

/** A pet's commands, `undefined` until they have been asked for. */
export const useRoomPetCommands = (petId: number) => useRoomStore(x => x.petCommandsById[petId]);
