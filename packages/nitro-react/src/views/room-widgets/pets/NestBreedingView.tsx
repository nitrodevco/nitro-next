import { IBreedingPetInfo, IRarityCategoryData } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { Template, TemplateBindings, TemplateWindow, useTemplate } from '#base/theme';

import { PetPortraitView } from './PetPortraitView';

/**
 * Two pets in a nest, waiting for a name for their baby - `ConfirmPetBreedingView` on the
 * `habbo-room-ui-com/confirm_pet_breeding_xml` layout: the parents, the name field, and the odds
 * of each rarity class with the breeds in it.
 *
 * `updateWindow` registers the parents' names, owners and levels and each class's `percent`,
 * fills the previews and the `breeds<n>` lists, then `arrangeListItems` ends in
 * `resizeToFitContent`: the window fits `element_list` and the `button_list` at its fixed y of
 * 524, its width bounded by the frame's 320. `save_button` sends the name and `disable`s the
 * dialog (greying `save_button` and `cancel_button`) while the server checks it; a refusal hands
 * the field back (`enable`). The header close and `cancel_button` cancel.
 */
export interface NestBreedingViewProps {
    pet1: IBreedingPetInfo;
    pet2: IBreedingPetInfo;
    /** The odds of each rarity class, with the breeds it holds, rarest first. */
    rarityCategories: IRarityCategoryData[];
    /** The pet type the baby will be, which the breed previews are drawn as. */
    resultPetType: number;
    /** The server refused the last name; the field is editable again. */
    nameRejected: boolean;
    onBreed: (name: string) => void;
    onCancel: () => void;
}

/** The layout's `breeds1`..`breeds4` lists; a class past them has nowhere to go (`findChildByName` finds none). */
const CATEGORY_LISTS = 4;
/** The layout of one breed of a rarity class, cloned into its `breeds<n>` list. */
const BREED_PREVIEW_TEMPLATE = 'habbo-room-ui-com/pet_breeding_pet_preview_xml';
/** The parents' `preview_image` / `preview_image2`. */
const PARENT_IMAGE_WIDTH = 140;
const PARENT_IMAGE_HEIGHT = 70;
/** `pet_breeding_pet_preview`'s bitmap. */
const BREED_PREVIEW_WIDTH = 29;
const BREED_PREVIEW_HEIGHT = 25;

/** A pet figure with nothing but its type and breed: what the rarity rows preview (`[type, breed].join(" ")`). */
const breedFigure = (petType: number, breedId: number) => `${petType} ${breedId} ffffff 0`;

/** A parent's `preview_image`: its 64-scale image centred in a transparent bitmap of the window's size. */
const parentImage = (pet: IBreedingPetInfo) => ({
    children: (
        <PetPortraitView
            figure={pet.figure}
            width={PARENT_IMAGE_WIDTH}
            height={PARENT_IMAGE_HEIGHT}
        />
    ),
});

/**
 * Each rarity class's `breeds<n>` list: emptied (`destroyListItems`), then a clone of
 * `pet_breeding_pet_preview` named `breed.<id>` per breed, its bitmap the breed's image centred.
 */
const breedLists = (categories: readonly IRarityCategoryData[], petType: number, preview: Template | undefined): TemplateBindings => Object.fromEntries(categories.slice(0, CATEGORY_LISTS).map((category, index) => [
    `breeds${index + 1}`,
    {
        items: preview
            ? category.breeds.map(breedId => ({
                    key: `breed.${breedId}`,
                    from: preview,
                    bindings: {
                        '': {
                            children: (
                                <PetPortraitView
                                    figure={breedFigure(petType, breedId)}
                                    width={BREED_PREVIEW_WIDTH}
                                    height={BREED_PREVIEW_HEIGHT}
                                />
                            ),
                        },
                    },
                }))
            : [],
    },
]));

export const NestBreedingView = ({ pet1, pet2, rarityCategories, resultPetType, nameRejected, onBreed, onCancel }: NestBreedingViewProps) => {
    const preview = useTemplate(BREED_PREVIEW_TEMPLATE);
    const [ name, setName ] = useState('');
    const [ sent, setSent ] = useState(false);

    // A refusal from the server hands the field back.
    const locked = sent && !nameRejected;

    return (
        <TemplateWindow
            id="habbo-room-ui-com/confirm_pet_breeding_xml"
            frame={{ id: 'nest-breeding', centered: true, rememberPosition: false, onClose: onCancel }}
            parameters={{
                'breedpets.widget.pet1.name': { name: pet1.name },
                'breedpets.widget.pet2.name': { name: pet2.name },
                'breedpets.widget.pet1.description': { name: pet1.owner },
                'breedpets.widget.pet2.description': { name: pet2.owner },
                'breedpets.widget.pet1.level': { level: String(pet1.level) },
                'breedpets.widget.pet2.level': { level: String(pet2.level) },
                ...Object.fromEntries(rarityCategories.map((category, index) => [ `breedpets.confirmation.widget.raritycategory.${index + 1}`, { percent: String(category.chance) } ])),
            }}
            bindings={{
                preview_image: parentImage(pet1),
                preview_image2: parentImage(pet2),
                'puppy.name.input': { caption: name, onChange: setName },
                ...breedLists(rarityCategories, resultPetType, preview),
                save_button: {
                    disabled: locked,
                    onPointerTap: () => {
                        if (locked) return;

                        setSent(true);
                        onBreed(name);
                    },
                },
                cancel_button: { disabled: locked, onPointerTap: () => !locked && onCancel() },
            }}
            arrange={({ root }) => root()?.resizeToFitContent()}
        />
    );
};
