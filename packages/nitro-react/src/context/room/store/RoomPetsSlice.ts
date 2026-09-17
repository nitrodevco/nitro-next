import { PetInfoMessageType } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

type State = {
    /**
     * What the server has told us about each pet, keyed by pet id. Every pet packet names the
     * pet that way, while room objects are keyed by object id - so this is its own map rather
     * than part of the room's user data.
     */
    petsById: Record<number, PetInfoMessageType>;
    /** The commands each pet has learned, keyed the same way. */
    petCommandsById: Record<number, number[]>;
};

type Actions = {
    setPetInfo: (info: PetInfoMessageType) => void;
    /** Merges a later update into a pet already known; a pet we never asked about is ignored. */
    updatePetInfo: (petId: number, changes: Partial<PetInfoMessageType>) => void;
    setPetCommands: (petId: number, commands: number[]) => void;
};

export const RoomPetsSliceInitialState: State = {
    petsById: {},
    petCommandsById: {},
};

export type RoomPetsSlice = State & Actions;

export const createRoomPetsSlice: StateCreator<RoomPetsSlice, [], [], RoomPetsSlice> = set => ({
    ...RoomPetsSliceInitialState,
    setPetInfo: info => set(x => ({ petsById: { ...x.petsById, [info.petId]: info } })),
    updatePetInfo: (petId, changes) => set((x) => {
        const existing = x.petsById[petId];

        if (!existing) return x;

        return { petsById: { ...x.petsById, [petId]: { ...existing, ...changes } } };
    }),
    setPetCommands: (petId, commands) => set(x => ({ petCommandsById: { ...x.petCommandsById, [petId]: commands } })),
});
