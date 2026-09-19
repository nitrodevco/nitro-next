import { IBreedingPetInfo, IPetBreedingResultData, IRarityCategoryData, PetInfoMessageType } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** The bubbles offering to breed your monsterplant with each partner it could - one per partner, over that partner. */
export interface PetBreedMenu {
    petObjectId: number;
    partnerObjectIds: number[];
}

/**
 * Two monsterplants about to breed - `BreedMonsterPlantsConfirmationView`. `ask` is the owner
 * proposing it; `accept` is the other plant's owner being asked.
 */
export interface PlantBreedingRequest {
    requestObjectId: number;
    targetObjectId: number;
    mode: 'ask' | 'accept';
}

/** Two pets in a nest, waiting to be bred and the baby named - `ConfirmPetBreedingView`. */
export interface NestBreedingRequest {
    nestId: number;
    pet1: IBreedingPetInfo;
    pet2: IBreedingPetInfo;
    rarityCategories: IRarityCategoryData[];
    resultPetType: number;
    /** The server refused the name; the dialog stays open for another try. */
    nameRejected: boolean;
}

/** What a plant breeding produced, one seed per owner - `BreedPetsResultView`. */
export interface BreedingResult {
    result: IPetBreedingResultData;
    otherResult: IPetBreedingResultData;
}

/** A nest finished - `NestBreedingSuccessView`. */
export interface NestBreedingSuccess {
    petId: number;
    rarityCategory: number;
}

/**
 * What the server has said about the pets in the room, keyed by pet id, and the breeding
 * dialogs in progress.
 */
type State = {
    /**
     * What the server has told us about each pet, keyed by pet id. Every pet packet names the
     * pet that way, while room objects are keyed by object id - so this is its own map rather
     * than part of the room's user data.
     */
    petsById: Record<number, PetInfoMessageType>;
    /** The commands each pet has learned, keyed the same way. */
    petCommandsById: Record<number, number[]>;
    breedMenu: PetBreedMenu | undefined;
    plantBreeding: PlantBreedingRequest | undefined;
    nestBreeding: NestBreedingRequest | undefined;
    breedingResult: BreedingResult | undefined;
    nestBreedingSuccess: NestBreedingSuccess | undefined;
};

type Actions = {
    setPetInfo: (info: PetInfoMessageType) => void;
    /** Merges a later update into a pet already known; a pet we never asked about is ignored. */
    updatePetInfo: (petId: number, changes: Partial<PetInfoMessageType>) => void;
    setPetCommands: (petId: number, commands: number[]) => void;
    setBreedMenu: (breedMenu: PetBreedMenu | undefined) => void;
    setPlantBreeding: (plantBreeding: PlantBreedingRequest | undefined) => void;
    /** Closes the plant dialog, but only the one about these two plants. */
    closePlantBreeding: (requestObjectId: number, targetObjectId: number) => void;
    setNestBreeding: (nestBreeding: NestBreedingRequest | undefined) => void;
    setNestBreedingNameRejected: () => void;
    setBreedingResult: (breedingResult: BreedingResult | undefined) => void;
    setNestBreedingSuccess: (nestBreedingSuccess: NestBreedingSuccess | undefined) => void;
};

export const RoomPetsSliceInitialState: State = {
    petsById: {},
    petCommandsById: {},
    breedMenu: undefined,
    plantBreeding: undefined,
    nestBreeding: undefined,
    breedingResult: undefined,
    nestBreedingSuccess: undefined,
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
    setBreedMenu: breedMenu => set({ breedMenu }),
    setPlantBreeding: plantBreeding => set({ plantBreeding, breedMenu: undefined }),
    closePlantBreeding: (requestObjectId, targetObjectId) => set(x => (
        (x.plantBreeding && (x.plantBreeding.requestObjectId === requestObjectId) && (x.plantBreeding.targetObjectId === targetObjectId)) ? { plantBreeding: undefined } : x
    )),
    setNestBreeding: nestBreeding => set({ nestBreeding }),
    setNestBreedingNameRejected: () => set(x => (x.nestBreeding ? { nestBreeding: { ...x.nestBreeding, nameRejected: true } } : x)),
    setBreedingResult: breedingResult => set({ breedingResult }),
    setNestBreedingSuccess: nestBreedingSuccess => set({ nestBreedingSuccess }),
});
