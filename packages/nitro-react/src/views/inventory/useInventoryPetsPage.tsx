/**
 * The inventory's pets page - Flash `inventory/pets/PetsView` with its `PetsGridItem` thumbs
 * (`inventory_thumb_xml`), on `inventory_xml`'s `pets` window.
 *
 * - `getWindowContainer` asks for the list unless one has arrived
 *   (`HabboInventory.checkCategoryInitilization('pets')`).
 * - `updateState` / `updateContainerVisibility`: until the list has arrived the window's
 *   `loading_container` shows, while it holds nothing its `empty_container` (`PetsView` sets them
 *   as the furni page does - `InventoryView` draws them); otherwise `options_container`,
 *   `filter.rarity`, `grid` and `preview_container`.
 * - `updateFilterOptions`: `filter.options` lists "all types" and the types the user owns;
 *   `filter.rarity` the monster plants' rarity levels, and is enabled only while the type is the
 *   monster plant (16). The `filter` box matches a pet's name or its type's name; it applies with
 *   the next update - Enter, or a filter picked - and clears on Escape or `clear_filter_button`.
 * - `updateGrid`: a pet that leaves the grid takes the selection with it, and the first one shown
 *   is selected instead (`selectFirst`).
 * - A thumb (`PetsGridItem`): the pet's picture centred in `bitmap`, at direction 3 - 2 for a
 *   monster plant (in the growth posture its level names) or a type 15 - its rarity plaque, `BG_COLOR`
 *   green while it is unseen (category 3), and the `outline` while selected; a press selects it, a
 *   press that leaves the thumb drags the pet into the room.
 * - `updatePreview`: the name, the picture at direction 4 (2 for a monster plant), the type, and
 *   `preview_info` - nothing for the room's owner, else whether the room takes pets; `place_button`
 *   works for the owner, or anyone where pets are allowed (`PetsModel.placePetToRoom`).
 *
 * Not ported: the thumbs' smaller scale for some types (`usePetImageTexture` draws at 64), and the
 * breeding dialogs, which are a feature of their own.
 */
import { PetType } from '@nitrodevco/nitro-api';
import { useEffect, useRef, useState } from 'react';

import { checkPetInventoryInitialization, placeInventoryPetToRoom } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { UnseenItemCategory, useInventoryPetsActions, useInventoryStore, useInventoryUnseenIds } from '#base/context/inventory';
import { useRoomStore } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { TemplateItem } from '#base/theme';
import { RarityItemGridOverlayView } from '#base/views/shared/RarityItemGridOverlayView';

import { InventoryPage, InventoryPageContext, inventoryPagePath, inventoryPageState, inventoryTemplateId, inventoryThumbLook, NO_INVENTORY_PAGE } from './inventoryPage';
import { InventoryPetImage } from './InventoryPetImage';

/** `PetsGridItem`: a type drawn at direction 2 rather than 3. */
const PET_TYPE_THUMB_DIRECTION_2 = 15;
/** `PetsGridItem` / `updatePreview`'s directions, as `getPetImage` turns them into degrees (`* 45`). */
const THUMB_DIRECTION = 3;
const PREVIEW_DIRECTION = 4;
const MONSTERPLANT_DIRECTION = 2;

/** `filter.options` / `filter.rarity`'s "everything" entry. */
const FILTER_ALL = -1;

/** `inventory_xml`'s `bitmap` (40x40) and `preview_image` (150x152): the picture is centred in them. */
const THUMB_SIZE = 40;
const PREVIEW_WIDTH = 150;
const PREVIEW_HEIGHT = 152;

const page = (name?: string) => inventoryPagePath('pets', name);

export const useInventoryPetsPage = ({ active, templates }: InventoryPageContext): InventoryPage => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const pets = useInventoryStore(x => x.pets);
    const listInitialized = useInventoryStore(x => x.petListInitialized);
    const selectedPetId = useInventoryStore(x => x.petSelectedId);
    const unseenPetIds = useInventoryUnseenIds(UnseenItemCategory.PET);
    const petsAllowed = useRoomStore(x => x.allowPets);
    const isRoomOwner = useRoomStore(x => x.isRoomOwner);
    const { selectPet } = useInventoryPetsActions();
    const [ typeFilter, setTypeFilter ] = useState(FILTER_ALL);
    const [ rarityFilter, setRarityFilter ] = useState(FILTER_ALL);
    // The `filter` box's caption, and the search term the last update read from it (`getSearchTerm`).
    const [ filterCaption, setFilterCaption ] = useState('');
    const [ searchTerm, setSearchTerm ] = useState('');
    // The thumb held down, so leaving it is a drag (`PetsGridItem.eventHandler`).
    const heldPet = useRef(-1);

    useEffect(() => {
        if (active) checkPetInventoryInitialization(send);
    }, [ active, send ]);

    // `getAvailableTypeFilterIds`: "all", then the owned types in ascending order.
    const typeIds = [ FILTER_ALL, ...[ ...new Set(pets.map(pet => pet.figureData.typeId)) ].sort((a, b) => a - b) ];
    const shownType = typeIds.includes(typeFilter) ? typeFilter : FILTER_ALL;
    // `isRarityFilterEnabled` / `getAvailableRarityFilterIds`: "all", then the monster plants' levels.
    const rarityEnabled = shownType === PetType.MONSTERPLANT;
    const rarityIds = [ FILTER_ALL, ...[ ...new Set(pets.filter(pet => (pet.figureData.typeId === PetType.MONSTERPLANT) && (pet.rarityLevel >= 0)).map(pet => pet.rarityLevel)) ].sort((a, b) => a - b) ];
    const shownRarity = (rarityEnabled && rarityIds.includes(rarityFilter)) ? rarityFilter : FILTER_ALL;

    const typeLabel = (typeId: number) => t(`pet.type.${typeId}`);

    // `passesFilter`.
    const visiblePets = pets.filter((pet) => {
        if ((shownType !== FILTER_ALL) && (pet.figureData.typeId !== shownType)) return false;

        if ((shownRarity !== FILTER_ALL) && (pet.rarityLevel !== shownRarity)) return false;

        if (!searchTerm) return true;

        return pet.name.toLowerCase().includes(searchTerm) || typeLabel(pet.figureData.typeId).toLowerCase().includes(searchTerm);
    });

    // `updateGrid`: a selection the grid no longer shows goes to its first pet (`selectFirst`).
    const selectedPet = visiblePets.find(pet => pet.id === selectedPetId);
    const firstVisibleId = visiblePets[0]?.id;

    useEffect(() => {
        if (active && !selectedPet && (firstVisibleId !== undefined)) selectPet(firstVisibleId);
    }, [ active, selectedPet, firstVisibleId, selectPet ]);

    if (!active) return NO_INVENTORY_PAGE;

    // `updateState`: 3 once the list holds something.
    const showContent = listInitialized && (pets.length > 0);

    /** `update()` with the box's caption as the search term. */
    const update = (caption: string = filterCaption) => setSearchTerm(caption.toLowerCase());

    const clearFilter = () => {
        setFilterCaption('');
        update('');
    };

    const thumbTemplate = templates[inventoryTemplateId('inventory_thumb_xml')];
    const thumbs: TemplateItem[] = thumbTemplate
        ? visiblePets.map((pet) => {
                const isMonsterplant = pet.figureData.typeId === PetType.MONSTERPLANT;
                const direction = (isMonsterplant || (pet.figureData.typeId === PET_TYPE_THUMB_DIRECTION_2)) ? MONSTERPLANT_DIRECTION : THUMB_DIRECTION;

                return {
                    key: String(pet.id),
                    from: thumbTemplate,
                    bindings: {
                        '': {
                            onPointerDown: () => {
                                selectPet(pet.id);
                                heldPet.current = pet.id;
                            },
                            onPointerUp: () => {
                                heldPet.current = -1;
                            },
                            // `WME_OUT` with the thumb held: `placePetToRoom(id, true)`.
                            onPointerOut: () => {
                                if (heldPet.current !== pet.id) return;

                                heldPet.current = -1;
                                placeInventoryPetToRoom(send, pet.id);
                            },
                        },
                        ...inventoryThumbLook(pet.id === selectedPet?.id, unseenPetIds.includes(pet.id)),
                        bitmap: {
                            children: (
                                <InventoryPetImage
                                    pet={pet}
                                    direction={direction}
                                    width={THUMB_SIZE}
                                    height={THUMB_SIZE}
                                />
                            ),
                        },
                        // `updateRarityOverlay`.
                        rarity_item_overlay_container: (pet.rarityLevel >= 0) ? { visible: true, children: <RarityItemGridOverlayView rarityLevel={pet.rarityLevel} /> } : { visible: false },
                    },
                };
            })
        : [];

    // `updatePreview`: the room's owner is told nothing, anyone else whether pets are welcome.
    const previewInfo = isRoomOwner ? '' : t(petsAllowed ? 'inventory.pets.allowed' : 'inventory.pets.forbidden');

    return {
        state: inventoryPageState(listInitialized, pets.length),
        bindings: {
            [page('options_container')]: { visible: showContent },
            [page('filter.rarity')]: {
                visible: showContent,
                // `getRarityFilterLabel`: "all" is a text, a level its number.
                options: rarityIds.map(rarity => ((rarity === FILTER_ALL) ? t('inventory.pets.filter.rarity.all') : String(rarity))),
                selection: Math.max(0, rarityIds.indexOf(shownRarity)),
                disabled: !rarityEnabled,
                onSelect: (index) => {
                    setRarityFilter(rarityIds[index]);
                    update();
                },
            },
            [page('grid')]: { visible: showContent, items: thumbs },
            [page('preview_container')]: { visible: showContent },

            [page('filter')]: {
                caption: filterCaption,
                onChange: setFilterCaption,
                onEnter: () => update(),
                onKeyDown: (key) => {
                    if (key === 'Escape') clearFilter();
                },
            },
            [page('clear_filter_button')]: { visible: filterCaption.length > 0, onPointerTap: clearFilter },
            [page('filter.options')]: {
                options: typeIds.map(typeId => ((typeId === FILTER_ALL) ? t('inventory.pets.filter.type.all', 'All types') : typeLabel(typeId))),
                selection: Math.max(0, typeIds.indexOf(shownType)),
                onSelect: (index) => {
                    setTypeFilter(typeIds[index]);
                    update();
                },
            },

            [page('preview_text')]: { caption: selectedPet?.name ?? '' },
            [page('preview_image')]: {
                children: selectedPet && (
                    <InventoryPetImage
                        key={selectedPet.id}
                        pet={selectedPet}
                        direction={(selectedPet.figureData.typeId === PetType.MONSTERPLANT) ? MONSTERPLANT_DIRECTION : PREVIEW_DIRECTION}
                        width={PREVIEW_WIDTH}
                        height={PREVIEW_HEIGHT}
                    />
                ),
            },
            [page('preview_description')]: { caption: selectedPet ? typeLabel(selectedPet.figureData.typeId) : '' },
            [page('preview_info')]: { caption: previewInfo },
            [page('place_button')]: {
                disabled: !(selectedPet && (isRoomOwner || petsAllowed)),
                onPointerTap: () => selectedPet && placeInventoryPetToRoom(send, selectedPet.id),
            },
        },
    };
};
