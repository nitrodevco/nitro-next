/**
 * What the inventory's pets page does - the public methods of Flash `inventory/pets/PetsModel`
 * that talk to the server or the room engine: `requestPetInventory` (through
 * `HabboInventory.checkCategoryInitilization`) and `placePetToRoom`.
 *
 * Placing follows Flash exactly: the room's owner drags the pet in through the object mover, so
 * the pet is placed where it is dropped; anyone else may only drop it where the room allows pets,
 * and the server picks the tile (`PlacePetComposer` with 0,0). A monster plant (type 16) is
 * dragged in at the growth stage its level names, so the ghost looks like the plant will.
 */
import { RoomObjectCategoryEnum, RoomObjectPlacementSource, RoomObjectUserType } from '@nitrodevco/nitro-api';
import { GetPetInventoryComposer, PlacePetComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { inventoryStore } from '#base/context/inventory';
import { roomStore } from '#base/context/room';

import { initializeRoomObjectInsert } from './catalogPlacementCommands';
import { hideInventoryForPlacement } from './inventoryCommands';

type Send = WebSocketConnection['send'];

/** `PetData.typeId` of the monster plant, whose look depends on how grown it is. */
const PET_TYPE_MONSTERPLANT = 16;
/** A monster plant at this level or above is fully grown (`std`); below it, `grw<level>`. */
const MONSTERPLANT_GROWN_LEVEL = 7;

/** `PetsModel.requestPetInventory`. */
export const requestPetInventory = (send: Send) => send(new GetPetInventoryComposer({}));

/** `HabboInventory.checkCategoryInitilization('pets')`: asks for the list unless one has arrived. */
export const checkPetInventoryInitialization = (send: Send) => {
    if (inventoryStore.getState().petListInitialized) return;

    requestPetInventory(send);
};

/** `PetData.figureString`: the figure the room engine draws a pet from. */
export const getInventoryPetFigureString = (figureData: { typeId: number; paletteId: number; color: string; customParts: number[] }): string => {
    const parts = [ figureData.typeId, figureData.paletteId, figureData.color ];

    for (let index = 0; index < figureData.customParts.length; index += 3) parts.push(figureData.customParts[index + 1], figureData.customParts[index + 2]);

    return parts.join(' ');
};

/**
 * `PetsModel.placePetToRoom`: the room's owner drags it in through the object mover (which hides
 * the inventory until the pet is dropped); anyone else sends the place packet, and only where the
 * room allows pets. Returns whether anything was started.
 */
export const placeInventoryPetToRoom = (send: Send, petId: number): boolean => {
    const { pets } = inventoryStore.getState();
    const pet = pets.find(held => held.id === petId);

    if (!pet) return false;

    const { isRoomOwner, allowPets } = roomStore.getState();
    const figure = getInventoryPetFigureString(pet.figureData);

    if (isRoomOwner) {
        const posture = (pet.figureData.typeId === PET_TYPE_MONSTERPLANT)
            ? ((pet.level >= MONSTERPLANT_GROWN_LEVEL) ? 'std' : `grw${pet.level}`)
            : undefined;

        // The mover's object id is the pet's own, negated, so it can never be a real room object.
        // The insert's type is the room object's user type, not the pet's own breed id.
        if (!initializeRoomObjectInsert(RoomObjectPlacementSource.INVENTORY, -pet.id, RoomObjectCategoryEnum.Unit, RoomObjectUserType.Pet, figure, undefined, posture)) return false;

        hideInventoryForPlacement();

        return true;
    }

    if (!allowPets) return false;

    send(new PlacePetComposer({ petId: pet.id, x: 0, y: 0 }));

    return true;
};
