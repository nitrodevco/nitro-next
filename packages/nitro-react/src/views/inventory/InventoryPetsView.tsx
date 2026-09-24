/**
 * The inventory's pets page - the `pets` region of `inventory_xml` (Flash `pets/PetsView`): the
 * `options_container` row with the search box and the `filter.options` type menu, the
 * `filter.rarity` menu (274,2 119x21), the `grid` (0,27 274 wide) of `inventory_thumb_xml` thumbs,
 * and the `preview_container` (190 wide, right-aligned) with the pet's name, picture, type and
 * `place_button`.
 *
 * - Opening the page asks for the list unless one has arrived
 *   (`HabboInventory.checkCategoryInitilization('pets')`).
 * - The type menu lists "all types" and then only the pet types the user actually owns
 *   (`getAvailableTypeFilterIds` -> `pet.type.<id>`); the rarity menu is Flash's
 *   `updateRarityFilterOptions` and only does anything while the type filter is the monster plant
 *   (16), whose rarity levels it lists by number under `inventory.pets.filter.rarity.all`.
 * - The preview draws the pet at scale 64 facing 4 - or facing 2 for a monster plant, in the growth
 *   posture its level names (`updatePreview`).
 * - `preview_info` is empty for the room's owner, and otherwise says whether the room takes pets;
 *   `place_button` works for the owner, or for anyone where the room allows pets
 *   (`PetsModel.placePetToRoom`).
 *
 * Not ported: the unseen item marks on the thumbs, and the breeding dialogs, which are a feature of
 * their own.
 */
import { IPetCustomPart } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { checkPetInventoryInitialization, placeInventoryPetToRoom } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { InventoryPet, useInventoryPetsActions, useInventoryStore } from '#base/context/inventory';
import { useRoomStore } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { Border, Box, Button, Dropmenu, DropmenuOption, InfiniteGrid, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';
import { usePetImageTexture } from '#base/views/catalog/usePetImageTexture';

import { InventoryOptionsContainer } from './InventoryOptionsContainer';

/** `inventory_thumb_xml`, the same 42x42 thumb the furni grid uses. */
const THUMB_SIZE = 42;
const THUMB_COLOR = '#cccccc';

/** `PetsView.updatePreview`'s directions; its scale of 64 is the one `usePetImageTexture` renders at. */
const PREVIEW_DIRECTION = 4;
const PREVIEW_DIRECTION_MONSTERPLANT = 2;

/** The monster plant's pet type, whose rarity the rarity menu filters and whose look follows its level. */
const PET_TYPE_MONSTERPLANT = 16;
/** A monster plant at this level or above is fully grown (`std`); below it, `grw<level>`. */
const MONSTERPLANT_GROWN_LEVEL = 7;

/** `PetsView.updatePreview`: a monster plant is drawn at the growth stage its level names. */
const getPetPosture = (pet: InventoryPet): string | undefined => {
    if (pet.figureData.typeId !== PET_TYPE_MONSTERPLANT) return undefined;

    return (pet.level >= MONSTERPLANT_GROWN_LEVEL) ? 'std' : `grw${pet.level}`;
};

/** `filter.options` / `filter.rarity`'s "everything" entry. */
const FILTER_ALL = -1;

/** `PetsView.getPetImage`'s figure: the flat triples the packet carries, as the image request wants them. */
const getPetImageRequest = (pet: InventoryPet, direction: number, posture?: string) => {
    const customParts: IPetCustomPart[] = [];

    for (let index = 0; index < pet.figureData.customParts.length; index += 3) {
        customParts.push({ layerId: pet.figureData.customParts[index], partId: pet.figureData.customParts[index + 1], paletteId: pet.figureData.customParts[index + 2] });
    }

    return {
        typeId: pet.figureData.typeId,
        paletteId: pet.figureData.paletteId,
        color: parseInt(pet.figureData.color, 16) || 0,
        direction,
        customParts: customParts.length ? customParts : undefined,
        posture,
    };
};

interface PetThumbProps {
    pet: InventoryPet;
    selected: boolean;
    onSelect: (petId: number) => void;
}

/** One pet in the grid: the same frame the furni thumbs use, with the pet's picture centred in it. */
const PetThumb = ({ pet, selected, onSelect }: PetThumbProps) => {
    const texture = usePetImageTexture(getPetImageRequest(pet, PREVIEW_DIRECTION, getPetPosture(pet)));

    return (
        <Region
            cursor="pointer"
            onPointerDown={() => onSelect(pet.id)}
            layout={{ position: 'relative', width: THUMB_SIZE, height: THUMB_SIZE }}
        >
            <Border
                variant="5"
                tintColor={THUMB_COLOR}
                layout={{ position: 'absolute', left: 1, top: 1, width: 40, height: 40 }}
            >
                {texture && (
                    <pixiSprite
                        texture={texture}
                        anchor={0.5}
                        x={20}
                        y={20}
                        layout={false}
                    />
                )}
            </Border>
            {selected && (
                <ThemeImage
                    src={LayoutImage('shared/inventory_thumb_selected_outline.png')}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 0, top: 0, width: THUMB_SIZE, height: THUMB_SIZE }}
                />
            )}
        </Region>
    );
};

/** `preview_image`: the selected pet at 150x152, the monster plant in its growth posture. */
const PetPreviewImage = ({ pet }: { pet: InventoryPet }) => {
    const isMonsterplant = pet.figureData.typeId === PET_TYPE_MONSTERPLANT;
    const texture = usePetImageTexture(getPetImageRequest(pet, isMonsterplant ? PREVIEW_DIRECTION_MONSTERPLANT : PREVIEW_DIRECTION, getPetPosture(pet)));

    if (!texture) return null;

    return (
        <Box layout={{ position: 'absolute', left: 5, top: 53, width: 150, height: 152, alignItems: 'center', justifyContent: 'center' }}>
            <pixiSprite
                texture={texture}
                anchor={0.5}
                x={75}
                y={76}
                layout={false}
            />
        </Box>
    );
};

export const InventoryPetsView = () => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const pets = useInventoryStore(x => x.pets);
    const selectedPetId = useInventoryStore(x => x.petSelectedId);
    const petsAllowed = useRoomStore(x => x.allowPets);
    const isRoomOwner = useRoomStore(x => x.isRoomOwner);
    const { selectPet } = useInventoryPetsActions();
    const [ typeFilter, setTypeFilter ] = useState(FILTER_ALL);
    const [ rarityFilter, setRarityFilter ] = useState(FILTER_ALL);
    const [ searchText, setSearchText ] = useState('');

    useEffect(() => {
        checkPetInventoryInitialization(send);
    }, [ send ]);

    // `getAvailableTypeFilterIds`: only the types the user owns, in ascending order.
    const availableTypes = [ ...new Set(pets.map(pet => pet.figureData.typeId)) ].sort((a, b) => a - b);
    // `isRarityFilterEnabled`: the rarity menu only does anything for the monster plant.
    const rarityEnabled = typeFilter === PET_TYPE_MONSTERPLANT;
    const availableRarities = rarityEnabled
        ? [ ...new Set(pets.filter(pet => pet.figureData.typeId === PET_TYPE_MONSTERPLANT).map(pet => pet.rarityLevel)) ].sort((a, b) => a - b)
        : [];

    const visiblePets = pets.filter((pet) => {
        if ((typeFilter !== FILTER_ALL) && (pet.figureData.typeId !== typeFilter)) return false;

        if (rarityEnabled && (rarityFilter !== FILTER_ALL) && (pet.rarityLevel !== rarityFilter)) return false;

        return !searchText || pet.name.toLowerCase().includes(searchText.toLowerCase());
    });

    const typeOptions: DropmenuOption[] = [
        { key: FILTER_ALL, label: t('inventory.pets.filter.type.all', 'All types'), selected: typeFilter === FILTER_ALL, onSelect: () => setTypeFilter(FILTER_ALL) },
        ...availableTypes.map(typeId => ({ key: typeId, label: t(`pet.type.${typeId}`), selected: typeFilter === typeId, onSelect: () => setTypeFilter(typeId) })),
    ];

    // `getRarityFilterLabel`: the "all" entry is a text, every other one is just its number.
    const rarityOptions: DropmenuOption[] = [
        { key: FILTER_ALL, label: t('inventory.pets.filter.rarity.all'), selected: rarityFilter === FILTER_ALL, onSelect: () => setRarityFilter(FILTER_ALL) },
        ...availableRarities.map(rarity => ({ key: rarity, label: String(rarity), selected: rarityFilter === rarity, onSelect: () => setRarityFilter(rarity) })),
    ];

    const selectedPet = pets.find(pet => pet.id === selectedPetId);
    // `updatePreview`: the room's owner is told nothing; anyone else is told whether pets are welcome.
    const previewInfo = isRoomOwner ? '' : (petsAllowed ? t('inventory.pets.allowed') : t('inventory.pets.forbidden'));
    const canPlace = !!selectedPet && (isRoomOwner || petsAllowed);

    return (
        <Region layout={{ position: 'absolute', left: 0, top: 0, width: 468, bottom: 0, overflow: 'hidden' }}>
            <InventoryOptionsContainer
                filterText={searchText}
                onFilterTextChange={setSearchText}
                filterCaption={(typeFilter === FILTER_ALL) ? t('inventory.pets.filter.type.all', 'All types') : t(`pet.type.${typeFilter}`)}
                filterOptions={typeOptions}
            />
            <Dropmenu
                variant="0"
                caption={(rarityFilter === FILTER_ALL) ? t('inventory.pets.filter.rarity.all') : String(rarityFilter)}
                options={rarityOptions}
                disabled={!rarityEnabled}
                layout={{ position: 'absolute', left: 274, top: 2, width: 119, height: 21 }}
            />
            <Region layout={{ position: 'absolute', left: 0, top: 27, width: 274, bottom: 3, overflow: 'hidden' }}>
                <Box layout={{ position: 'absolute', left: 0, top: 0, width: 274, bottom: 0, flexDirection: 'column' }}>
                    <InfiniteGrid
                        items={visiblePets}
                        itemGrid={{ width: THUMB_SIZE, height: THUMB_SIZE, spacing: 2 }}
                        getKey={pet => `pet-${pet.id}`}
                        itemRender={pet => (
                            <PetThumb
                                pet={pet}
                                selected={pet.id === selectedPetId}
                                onSelect={selectPet}
                            />
                        )}
                    />
                </Box>
            </Region>
            <Region layout={{ position: 'absolute', right: -2, top: 0, width: 190, bottom: 0 }}>
                {selectedPet && (
                    <>
                        <ThemeText
                            text={selectedPet.name}
                            textStyle="u_headline_small"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, top: 32 }}
                        />
                        <PetPreviewImage
                            key={selectedPet.id}
                            pet={selectedPet}
                        />
                        <ThemeText
                            text={t(`pet.type.${selectedPet.figureData.typeId}`)}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 176 }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 4, right: 6, top: 205, maxWidth: 220 }}
                        />
                    </>
                )}
                {(previewInfo !== '') && (
                    <ThemeText
                        text={previewInfo}
                        textStyle="u_regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
                        clip
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 5, top: 200, width: 154, bottom: 32 }}
                    />
                )}
                <Button
                    variant="3"
                    name="place_button"
                    textStyle="button_shiny_regular"
                    disabled={!canPlace}
                    onPointerTap={() => selectedPet && placeInventoryPetToRoom(send, selectedPet.id)}
                    layout={{ position: 'absolute', left: 0, bottom: 4, width: 158, height: 28, minWidth: 158, maxWidth: 158 }}
                >
                    {t('inventory.pets.placetoroom')}
                </Button>
            </Region>
        </Region>
    );
};
