import { IBreedingPetInfo, IRarityCategoryData } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { Border, Box, Button, Frame, Region, TextInput, ThemeText } from '#base/theme';

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

const WIDTH = 320;
const PET_COLUMN_WIDTH = 140;
const BREED_PREVIEW_SIZE = 24;
const MAX_NAME_LENGTH = 15;

/** A pet figure with nothing but its type and breed: what the rarity rows preview. */
const breedFigure = (petType: number, breedId: number) => `${petType} ${breedId} ffffff 0`;

/**
 * Two pets in a nest, waiting for a name for their baby - `ConfirmPetBreedingView` on the
 * `confirm_pet_breeding` layout: the parents, the name field, and the odds of each rarity class
 * with the breeds in it. The dialog locks while the server checks the name and unlocks if it is
 * refused.
 */
export const NestBreedingView = ({ pet1, pet2, rarityCategories, resultPetType, nameRejected, onBreed, onCancel }: NestBreedingViewProps) => {
    const t = useTranslation();
    const [ name, setName ] = useState('');
    const [ sent, setSent ] = useState(false);

    // A refusal from the server hands the field back.
    const locked = sent && !nameRejected;

    const text = (value: string, style: 'text-style-regular' | 'text-style-bold' | 'text-style-il-heading-3' = 'text-style-regular', width: number = WIDTH - 24) => (
        <ThemeText
            text={value}
            textStyle={style}
            textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: width }}
        />
    );

    const parent = (pet: IBreedingPetInfo, index: 1 | 2) => (
        <Box layout={{ width: PET_COLUMN_WIDTH, flexDirection: 'column', gap: 1, alignItems: 'center' }}>
            {text(t(`breedpets.widget.pet${index}.name`, pet.name, { name: pet.name }), 'text-style-bold', PET_COLUMN_WIDTH)}
            <PetPortraitView
                figure={pet.figure}
                width={PET_COLUMN_WIDTH}
                height={70}
            />
            {text(t(`breedpets.widget.pet${index}.level`, '', { level: String(pet.level) }), 'text-style-regular', PET_COLUMN_WIDTH)}
            {text(t(`breedpets.widget.pet${index}.description`, '', { name: pet.owner }), 'text-style-regular', PET_COLUMN_WIDTH)}
        </Box>
    );

    return (
        <Frame
            variant="0"
            id="nest-breeding"
            caption={t('breedpets.confirmation.widget.title')}
            onClose={onCancel}
            defaultPosition={{ x: 340, y: 60 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: WIDTH, height: 623 }}
        >
            <Region layout={{ flexDirection: 'column', gap: 10, padding: 10 }}>
                {text(t('breedpets.confirmation.widget.request'))}
                <Border
                    variant="0"
                    layout={{ flexDirection: 'row', gap: 10, padding: 7, height: 140 }}
                >
                    {parent(pet1, 1)}
                    {parent(pet2, 2)}
                </Border>
                <Box layout={{ flexDirection: 'column', gap: 2 }}>
                    {text(t('breedpets.confirmation.widget.baby.name'), 'text-style-bold')}
                    <Border
                        variant="0"
                        layout={{ height: 31, padding: 5 }}
                    >
                        <TextInput
                            value={name}
                            onChange={setName}
                            maxLength={MAX_NAME_LENGTH}
                            layout={{ flex: 1, height: 21 }}
                        />
                    </Border>
                </Box>
                {text(t('breedpets.confirmation.widget.breeding.info'), 'text-style-il-heading-3')}
                <Border
                    variant="0"
                    layout={{ flexDirection: 'column', gap: 5, padding: 10, height: 209 }}
                >
                    {text(t('breedpets.confirmation.widget.text'), 'text-style-regular', WIDTH - 44)}
                    {text(t('breedpets.confirmation.widget.info'), 'text-style-regular', WIDTH - 44)}
                    {rarityCategories.map((category, index) => (
                        <Box
                            key={index}
                            layout={{ flexDirection: 'row', alignItems: 'center', height: 25, gap: 4 }}
                        >
                            <ThemeText
                                text={t(`breedpets.confirmation.widget.raritycategory.${index + 1}`, '', { percent: String(category.chance) })}
                                textStyle="text-style-regular"
                                textOptions={{ fill: '#000000' }}
                                layout={{ width: 104 }}
                            />
                            <Box layout={{ flexDirection: 'row', gap: 2, flex: 1 }}>
                                {category.breeds.map(breedId => (
                                    <PetPortraitView
                                        key={breedId}
                                        figure={breedFigure(resultPetType, breedId)}
                                        width={BREED_PREVIEW_SIZE}
                                        height={BREED_PREVIEW_SIZE}
                                    />
                                ))}
                            </Box>
                        </Box>
                    ))}
                </Border>
                <Button
                    variant="0"
                    disabled={locked}
                    onPointerTap={() => {
                        if (locked) return;

                        setSent(true);
                        onBreed(name);
                    }}
                    layout={{ width: 122, height: 30 }}
                >
                    {t('breedpets.confirmation.widget.button.breed')}
                </Button>
                <Region
                    cursor="pointer"
                    onPointerTap={onCancel}
                    layout={{ height: 21 }}
                >
                    <ThemeText
                        text={t('breedpets.confirmation.widget.button.cancel')}
                        textStyle="text-style-il-link-regular"
                        textOptions={{ fill: '#0000ff' }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
