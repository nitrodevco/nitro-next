import { IBreedingPetInfo, IRarityCategoryData } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Button, Frame, Region, TextInput, ThemeText } from '#base/theme';

import { PetPortraitView } from './PetPortraitView';

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

/** `puppy.name.input`'s `max_chars`. */
const MAX_NAME_LENGTH = 32;
/** The layout's four `rarityCategory<n>.container` rows. */
const CATEGORY_SLOTS = [ 1, 2, 3, 4 ] as const;
/** `pet_breeding_pet_preview` - one breed of a rarity class. */
const BREED_PREVIEW_WIDTH = 29;
const BREED_PREVIEW_HEIGHT = 25;

/** A pet figure with nothing but its type and breed: what the rarity rows preview. */
const breedFigure = (petType: number, breedId: number) => `${petType} ${breedId} ffffff 0`;

/**
 * Two pets in a nest, waiting for a name for their baby - `ConfirmPetBreedingView` on the
 * `confirm_pet_breeding` layout (320x623, illumina frame 100, margins 3/36/3/0): the parents, the
 * name field, and the odds of each rarity class with the breeds in it, each breed a
 * `pet_breeding_pet_preview` cell. The dialog locks while the server checks the name
 * (`disable` greys the save and cancel buttons) and unlocks if it is refused.
 *
 * `arrangeListItems` ends in `resizeToFitContent` (`fitContent`): the window fits `element_list`
 * and the `button_list` that stays at its fixed y of 524, its width bounded by the frame's 320.
 */
export const NestBreedingView = ({ pet1, pet2, rarityCategories, resultPetType, nameRejected, onBreed, onCancel }: NestBreedingViewProps) => {
    const t = useTranslation();
    const [ name, setName ] = useState('');
    const [ sent, setSent ] = useState(false);

    // A refusal from the server hands the field back.
    const locked = sent && !nameRejected;

    const parent = (pet: IBreedingPetInfo, index: 1 | 2) => (
        <Region
            name={`pet${index}_itemlist`}
            layout={{ flexShrink: 0, minWidth: 140, maxWidth: 140, flexDirection: 'column', gap: 1 }}
        >
            <ThemeText
                text={t(`breedpets.widget.pet${index}.name`, '', { name: pet.name })}
                textStyle="il_heading_2"
                textOptions={{ align: 'center' }}
                name="pet_name"
                verticalAlign="top"
                layout={{ width: 140, marginLeft: (index === 1) ? 1 : 0, flexShrink: 0 }}
            />
            <PetPortraitView
                figure={pet.figure}
                width={140}
                height={70}
            />
            <ThemeText
                text={t(`breedpets.widget.pet${index}.level`, '', { level: String(pet.level) })}
                textStyle="il_heading_3"
                textOptions={{ wordWrap: true, wordWrapWidth: 136, align: 'center' }}
                name="pet_level"
                verticalAlign="top"
                layout={{ width: 140, flexShrink: 0 }}
            />
            <ThemeText
                text={t(`breedpets.widget.pet${index}.description`, '', { name: pet.owner })}
                textStyle="il_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 136, align: 'center' }}
                name="pet_description"
                verticalAlign="top"
                layout={{ width: 140, flexShrink: 0 }}
            />
        </Region>
    );

    return (
        <Frame
            variant="100"
            id="nest-breeding"
            caption={t('breedpets.confirmation.widget.title')}
            dropShadow={{ angle: 0, alpha: 0.35, blur: 20 }}
            onClose={onCancel}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 3, 36, 3, 0 ]}
            fitContent
            layout={{ position: 'absolute', width: 320, height: 623, minWidth: 320, maxWidth: 320 }}
        >
            <Region
                name="element_list"
                layout={{ position: 'absolute', left: 0, top: 0, maxWidth: 318, flexDirection: 'column', gap: 10 }}
            >
                <ThemeText
                    text={t('breedpets.confirmation.widget.request')}
                    textStyle="il_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 260 }}
                    name="title"
                    verticalAlign="top"
                    layout={{ width: 264, marginLeft: 10, flexShrink: 0 }}
                />
                <Border
                    variant="103"
                    name="parentContainer"
                    layout={{ height: 140, width: 314, flexShrink: 0, minWidth: 310, maxWidth: 314, overflow: 'hidden' }}
                >
                    <Region
                        name="preview_list"
                        layout={{ position: 'absolute', left: 10, top: 7, flexDirection: 'row', gap: 10 }}
                    >
                        {parent(pet1, 1)}
                        {parent(pet2, 2)}
                    </Region>
                </Border>
                <Region
                    name="puppy_namelist"
                    layout={{ height: 52, width: 300, marginLeft: 10, flexShrink: 0, minWidth: 300, flexDirection: 'column', gap: 2 }}
                >
                    <ThemeText
                        text={t('breedpets.confirmation.widget.baby.name')}
                        textStyle="il_heading_3"
                        verticalAlign="top"
                        layout={{ flexShrink: 0 }}
                    />
                    <Border
                        variant="105"
                        tintColor="#f0f0f0"
                        layout={{ height: 31, width: 295, flexShrink: 0 }}
                    >
                        <TextInput
                            value={name}
                            onChange={setName}
                            maxLength={MAX_NAME_LENGTH}
                            textStyle="il_regular"
                            flashPlacement
                            backgroundColor={null}
                            focusedBackgroundColor={null}
                            layout={{ position: 'absolute', left: 5, width: 284, top: 5, height: 20 }}
                        />
                    </Border>
                </Region>
                <ThemeText
                    text={t('breedpets.confirmation.widget.breeding.info')}
                    textStyle="il_heading_3"
                    name="breeding.title"
                    verticalAlign="top"
                    layout={{ marginLeft: 10, flexShrink: 0 }}
                />
                <Border
                    variant="102"
                    layout={{ height: 209, width: 295, marginLeft: 10, flexShrink: 0, overflow: 'hidden' }}
                >
                    <Region layout={{ position: 'absolute', left: 10, width: 287, top: 10, height: 199, flexDirection: 'column', gap: 5 }}>
                        <ThemeText
                            text={t('breedpets.confirmation.widget.text')}
                            textStyle="il_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 282 }}
                            name="text"
                            verticalAlign="top"
                            layout={{ width: 286, flexShrink: 0 }}
                        />
                        <ThemeText
                            text={t('breedpets.confirmation.widget.info')}
                            textStyle="il_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 286 }}
                            name="info"
                            verticalAlign="top"
                            layout={{ width: 290, flexShrink: 0, minWidth: 290 }}
                        />
                        <Region
                            name="category_list"
                            layout={{ height: 109, width: 282, flexShrink: 0, flexDirection: 'column', gap: 2 }}
                        >
                            {CATEGORY_SLOTS.map((slot) => {
                                const category = rarityCategories[slot - 1];

                                return (
                                    <Region
                                        key={slot}
                                        name={`rarityCategory${slot}.container`}
                                        layout={{ height: 25, width: 280, flexShrink: 0, overflow: 'hidden' }}
                                    >
                                        <ThemeText
                                            text={t(`breedpets.confirmation.widget.raritycategory.${slot}`, '', category ? { percent: String(category.chance) } : undefined)}
                                            textStyle="il_heading_3"
                                            verticalAlign="top"
                                            layout={{ position: 'absolute', left: 0, top: 5, minWidth: 100 }}
                                        />
                                        <Region
                                            name={`breeds${slot}`}
                                            layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: (slot === 4) ? 20 : 25, flexDirection: 'row', gap: 2 }}
                                        >
                                            {category?.breeds.map(breedId => (
                                                <PetPortraitView
                                                    key={breedId}
                                                    figure={breedFigure(resultPetType, breedId)}
                                                    width={BREED_PREVIEW_WIDTH}
                                                    height={BREED_PREVIEW_HEIGHT}
                                                />
                                            ))}
                                        </Region>
                                    </Region>
                                );
                            })}
                        </Region>
                    </Region>
                </Border>
            </Region>
            <Region
                name="button_list"
                layout={{ position: 'absolute', left: 10, top: 524, minWidth: 295, maxWidth: 295, flexDirection: 'column', gap: 3 }}
            >
                <Button
                    variant="102"
                    name="save_button"
                    disabled={locked}
                    onPointerTap={() => {
                        if (locked) return;

                        setSent(true);
                        onBreed(name);
                    }}
                    layout={{ height: 30, width: 122, marginLeft: 86, flexShrink: 0, minWidth: 122, maxWidth: 122 }}
                >
                    {t('breedpets.confirmation.widget.button.breed')}
                </Button>
                <Region
                    name="cancel_button"
                    disabled={locked}
                    onPointerTap={locked ? undefined : onCancel}
                    cursor="pointer"
                    layout={{ height: 21, width: 295, flexShrink: 0, minWidth: 295, maxWidth: 295 }}
                >
                    <ThemeText
                        text={t('breedpets.confirmation.widget.button.cancel')}
                        textStyle="il_link_regular"
                        textOptions={{ align: 'center' }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, width: 295, top: 0, minWidth: 295, maxWidth: 295 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
