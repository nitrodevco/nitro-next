/**
 * The inventory's pets - Flash `inventory/pets/PetsModel` and the `PetsGridItem` thumbs its
 * `PetsView` draws: every pet the user owns, which one is selected, and whether the list has
 * arrived (`isListInitialized`, which `HabboInventory` also keeps as the pets category's init
 * flag).
 *
 * - `updatePets` is Flash's, with a complete list (the fragments joined by
 *   `registerInventoryPetsHandlers`): pets gone are removed, new ones added, the rest left as they
 *   are, so a pet whose thumb is on screen keeps its identity.
 * - `addPet` / `removePet` are `PetAddedToInventory` / `PetRemovedFromInventory`. Adding a pet the
 *   list already holds changes nothing, as Flash's `Map.add` does.
 * - `petsAllowed` is `updatePetsAllowed`: the room's `allowPets` flag, which is what lets the
 *   preview's place button work. It is written by the room's permission handler, not by a pet
 *   packet.
 *
 * Which pets are new is the unseen item tracker's (`InventoryUnseenSlice`, category 3), which the
 * grid reads for its thumbs; Flash keeps no order for them. Breeding is the room's
 * (`RoomNestBreedingWidget`, `commands/room/roomPetCommands`), not the inventory's.
 */
import { IPetData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

import { keepInventorySelection } from './inventorySelection';

/** Flash `PetData`, as the grid and the preview read it. */
export type InventoryPet = IPetData;

type State = {
    /** The owned pets in grid order. */
    pets: InventoryPet[];
    /** The selected pet's id, -1 for none. */
    petSelectedId: number;
    /** `isListInitialized`: a complete list has arrived. */
    petListInitialized: boolean;
    /** `updatePetsAllowed`: the room allows pets, so the preview's place button works. */
    petsAllowed: boolean;
};

type Actions = {
    /** `PetsModel.updatePets` with a complete list. */
    updatePets: (pets: Map<number, InventoryPet>) => void;
    /** `PetsModel.addPet`: a pet id already held is left as it is. */
    addPet: (pet: InventoryPet) => void;
    /** `PetsModel.removePet`. */
    removePet: (petId: number) => void;
    selectPet: (petId: number) => void;
    setPetsAllowed: (allowed: boolean) => void;
};

export const InventoryPetsSliceInitialState: State = {
    pets: [],
    petSelectedId: -1,
    petListInitialized: false,
    petsAllowed: false,
};

export type InventoryPetsSlice = State & Actions;

export const createInventoryPetsSlice: StateCreator<InventoryPetsSlice, [], [], InventoryPetsSlice> = set => ({
    ...InventoryPetsSliceInitialState,
    updatePets: incoming => set((x) => {
        const kept = x.pets.filter(pet => incoming.has(pet.id));
        const held = new Set(kept.map(pet => pet.id));
        const pets = [ ...kept, ...[ ...incoming.values() ].filter(pet => !held.has(pet.id)) ];

        return { pets, petSelectedId: keepInventorySelection(pets, x.petSelectedId), petListInitialized: true };
    }),
    addPet: pet => set((x) => {
        if (x.pets.some(held => held.id === pet.id)) return x;

        const pets = [ ...x.pets, pet ];

        return { pets, petSelectedId: keepInventorySelection(pets, x.petSelectedId) };
    }),
    removePet: petId => set((x) => {
        if (!x.pets.some(pet => pet.id === petId)) return x;

        const pets = x.pets.filter(pet => pet.id !== petId);

        return { pets, petSelectedId: keepInventorySelection(pets, x.petSelectedId) };
    }),
    selectPet: petSelectedId => set({ petSelectedId }),
    setPetsAllowed: petsAllowed => set({ petsAllowed }),
});
