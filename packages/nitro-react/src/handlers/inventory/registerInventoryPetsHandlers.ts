/**
 * The inventory's pet list - the pets half of Flash `inventory/IncomingMessages` (`onPetInventory`,
 * `onPetAdded`, `onPetRemoved`) and what `PetsModel` does with each.
 *
 * `PetInventory` comes in fragments, which are collected (`addMessageFragment`, the buffer sized by
 * the first fragment's total) and handed to `updatePets` once all are in. Whether the room allows
 * pets - what the preview's place button needs - comes from the room's own data handler, not from
 * a pet packet, so it is mirrored onto the slice here.
 */
import { GetGuestRoomResultMessage, IPetData, PetAddedToInventoryEventMessage, PetInventoryEventMessage, PetRemovedFromInventoryEventMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { inventoryStore } from '#base/context/inventory';

import { on, subscribeAll } from '../packetSubscriptions';

type Fragment = Map<number, IPetData>;

export const registerInventoryPetsHandlers = ({ subscribe }: WebSocketConnection) => {
    const { updatePets, addPet, removePet, setPetsAllowed } = inventoryStore.getState();
    let fragments: (Fragment | undefined)[] | undefined;

    /** `addMessageFragment`: the whole list once every fragment is in. */
    const addFragment = (fragment: Fragment, totalFragments: number, fragmentNo: number): Fragment | undefined => {
        if (totalFragments === 1) return fragment;

        fragments ??= new Array<Fragment | undefined>(totalFragments).fill(undefined);
        fragments[fragmentNo] = fragment;

        if (fragments.some(received => !received)) return undefined;

        return new Map(fragments.flatMap(received => [ ...(received ?? []) ]));
    };

    return subscribeAll(subscribe, [
        on(PetInventoryEventMessage, (data) => {
            const pets = addFragment(data.fragment, data.totalFragments, data.fragmentNo);

            if (!pets) return;

            fragments = undefined;
            updatePets(pets);
        }),

        on(PetAddedToInventoryEventMessage, data => addPet(data.pet)),

        on(PetRemovedFromInventoryEventMessage, data => removePet(data.petId)),

        on(GetGuestRoomResultMessage, (data) => {
            if (data.roomForward) return;

            setPetsAllowed(data.roomInfo.allowPets);
        }),
    ]);
};
