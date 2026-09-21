import { useTranslation } from '#base/context/system';
import { Box, Button, ButtonThick, Frame, Region, ThemeText } from '#base/theme';

import { PetPortraitView } from './PetPortraitView';

/** One of the two plants, as the room knows it. */
export interface BreedingPlant {
    name: string;
    figure: string;
    posture: string;
    rarityLevel: number;
    ownerName: string;
}

export interface PlantBreedingViewProps {
    /** `ask` proposes the breeding; `accept` answers the other owner's proposal. */
    mode: 'ask' | 'accept';
    plant1: BreedingPlant;
    plant2: BreedingPlant;
    onBreed: () => void;
    onAccept: () => void;
    onCancel: () => void;
}

const WIDTH = 274;
const COLUMN_WIDTH = 122;

/**
 * Two monsterplants about to breed - `BreedMonsterPlantsConfirmationView` on the
 * `breed_pets_confirmation` layout: both plants side by side with their rarity and owner, the
 * note that a plant breeds only once, and either "Breed" or "Accept" beside "Cancel".
 */
export const PlantBreedingView = ({ mode, plant1, plant2, onBreed, onAccept, onCancel }: PlantBreedingViewProps) => {
    const t = useTranslation();

    const text = (value: string, style: 'regular' | 'bold' | 'u_italic' = 'regular', width: number = WIDTH - 20) => (
        <ThemeText
            text={value}
            textStyle={style}
            textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: width }}
        />
    );

    const column = (plant: BreedingPlant, index: 1 | 2) => (
        <Box layout={{ width: COLUMN_WIDTH, flexDirection: 'column', gap: 1, alignItems: 'center' }}>
            {text(t(`breedpets.widget.plant${index}.name`, plant.name, { name: plant.name }), 'bold', COLUMN_WIDTH)}
            <PetPortraitView
                figure={plant.figure}
                posture={plant.posture}
                width={COLUMN_WIDTH}
                height={130}
            />
            {text(t(`breedpets.widget.plant${index}.raritylevel`, '', { level: String(plant.rarityLevel) }), 'regular', COLUMN_WIDTH)}
            {text(t(`breedpets.widget.plant${index}.description`, '', { name: plant.ownerName }), 'regular', COLUMN_WIDTH)}
        </Box>
    );

    return (
        <Frame
            variant="0"
            id="plant-breeding"
            caption={t('breedpets.widget.title')}
            onClose={onCancel}
            defaultPosition={{ x: 360, y: 120 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: WIDTH, height: 400 }}
        >
            <Region layout={{ flexDirection: 'column', gap: 10, padding: 10 }}>
                {text((mode === 'ask') ? t('breedpets.widget.text') : t('breedpets.widget.request', '', { name: plant2.ownerName }))}
                {text(t('breedpets.widget.info'), 'u_italic')}
                <Box layout={{ flexDirection: 'row', gap: 10 }}>
                    {column(plant1, 1)}
                    {column(plant2, 2)}
                </Box>
                <Box layout={{ flexDirection: 'row', gap: 10 }}>
                    <Button
                        variant="0"
                        onPointerTap={onCancel}
                        layout={{ width: COLUMN_WIDTH, height: 26 }}
                    >
                        {t('breedpets.widget.cancel')}
                    </Button>
                    <ButtonThick
                        variant="3"
                        textStyle="button_shiny_bold"
                        onPointerTap={(mode === 'ask') ? onBreed : onAccept}
                        layout={{ width: COLUMN_WIDTH, height: 26 }}
                    >
                        {t((mode === 'ask') ? 'breedpets.widget.use' : 'breedpets.widget.accept')}
                    </ButtonThick>
                </Box>
            </Region>
        </Frame>
    );
};
