import { useTranslation } from '#base/context/system';
import { Box, Button, ButtonThick, Frame, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

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

/** `breed_pets_confirmation`: 274 x 387 in the layout (`width_min`/`width_max` 274), frame margins 3/36/3/0. */
const WIDTH = 274;
const HEIGHT = 387;
/** Each plant's column, and its `preview_image`. */
const COLUMN_WIDTH = 122;
const PREVIEW_HEIGHT = 130;
/** `breed_pets_preview_bg_png`, 122x130: the backdrop `updatePreviewImage` copies into each `preview_image` first. */
const PREVIEW_BACKGROUND = LayoutImage('room-ui/breed_pets_preview_bg.png');

/**
 * Two monsterplants about to breed - `BreedMonsterPlantsConfirmationView` on the
 * `breed_pets_confirmation` layout (frame style 3): both plants side by side with their rarity and
 * owner, the note that a plant breeds only once, and either "Breed" or "Accept" beside "Cancel".
 *
 * `setWindowContent` hides `description` and `save_button` when answering, `request` and
 * `accept_button` when asking; the item lists close up over what is hidden and
 * `resizeToFitContent` fits the window to `element_list` (`fitContent`; the frame's 274 bounds
 * its width).
 *
 * `updatePreviewImage` fills each `preview_image` with a fresh bitmap of its own size, copies
 * `breed_pets_preview_bg` in at 0,0 at its own size (it is opaque and exactly 122x130, so it
 * covers the box) and merges the plant's 64-scale image over it, centred - the backdrop drawn
 * unstretched under `PetPortraitView`.
 */
export const PlantBreedingView = ({ mode, plant1, plant2, onBreed, onAccept, onCancel }: PlantBreedingViewProps) => {
    const t = useTranslation();

    const plantColumn = (plant: BreedingPlant, index: 1 | 2) => (
        <Region
            name={`plant${index}_itemlist`}
            layout={{ flexShrink: 0, minWidth: COLUMN_WIDTH, maxWidth: COLUMN_WIDTH, flexDirection: 'column', gap: 1 }}
        >
            <ThemeText
                text={t(`breedpets.widget.plant${index}.name`, '', { name: plant.name })}
                textStyle="u_regular"
                textOptions={{ align: 'center' }}
                name="plant_name"
                verticalAlign="top"
                layout={{ width: COLUMN_WIDTH, marginLeft: 1, flexShrink: 0 }}
            />
            <Box layout={{ width: COLUMN_WIDTH, height: PREVIEW_HEIGHT, flexShrink: 0, overflow: 'hidden' }}>
                <ThemeImage
                    name="preview_background"
                    src={PREVIEW_BACKGROUND}
                    bitmap={{ stretchedX: false, stretchedY: false }}
                    layout={{ position: 'absolute', left: 0, top: 0, width: COLUMN_WIDTH, height: PREVIEW_HEIGHT }}
                />
                <PetPortraitView
                    figure={plant.figure}
                    posture={plant.posture}
                    width={COLUMN_WIDTH}
                    height={PREVIEW_HEIGHT}
                />
            </Box>
            <ThemeText
                text={t(`breedpets.widget.plant${index}.raritylevel`, '', { level: String(plant.rarityLevel) })}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 130, align: 'center' }}
                name="plant_rarity_level"
                verticalAlign="top"
                layout={{ width: 134, flexShrink: 0 }}
            />
            <ThemeText
                text={t(`breedpets.widget.plant${index}.description`, '', { name: plant.ownerName })}
                textStyle="u_regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 118, align: 'center' }}
                name="plant_description"
                verticalAlign="top"
                layout={{ width: COLUMN_WIDTH, flexShrink: 0 }}
            />
        </Region>
    );

    return (
        <Frame
            variant="3"
            id="plant-breeding"
            caption={t('breedpets.widget.title', '', { name: plant1.name })}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onCancel}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 3, 36, 3, 0 ]}
            fitContent
            layout={{ position: 'absolute', width: WIDTH, height: HEIGHT, minWidth: WIDTH, maxWidth: WIDTH }}
        >
            <Region
                name="element_list"
                layout={{ position: 'absolute', left: 0, top: 0, maxWidth: 272, flexDirection: 'column', gap: 10 }}
            >
                <Region
                    name="separator"
                    layout={{ height: 1, width: WIDTH, flexShrink: 0 }}
                />
                {(mode === 'ask') && (
                    <ThemeText
                        text={t('breedpets.widget.text')}
                        textStyle="u_regular"
                        textOptions={{ fontSize: 13, wordWrap: true, wordWrapWidth: 250 }}
                        name="description"
                        verticalAlign="top"
                        layout={{ width: 254, marginLeft: 10, flexShrink: 0 }}
                    />
                )}
                {(mode === 'accept') && (
                    <ThemeText
                        text={t('breedpets.widget.request', '', { name: plant2.ownerName })}
                        textStyle="u_regular"
                        textOptions={{ fontSize: 13, wordWrap: true, wordWrapWidth: 250 }}
                        name="request"
                        verticalAlign="top"
                        layout={{ width: 254, marginLeft: 10, flexShrink: 0 }}
                    />
                )}
                <ThemeText
                    text={t('breedpets.widget.info')}
                    textStyle="u_italic"
                    textOptions={{ fontSize: 13, wordWrap: true, wordWrapWidth: 250 }}
                    name="info"
                    verticalAlign="top"
                    layout={{ width: 254, marginLeft: 10, flexShrink: 0 }}
                />
                <Region
                    name="preview_list"
                    layout={{ marginLeft: 10, flexShrink: 0, flexDirection: 'row', gap: 10 }}
                >
                    {plantColumn(plant1, 1)}
                    {plantColumn(plant2, 2)}
                </Region>
                <Region
                    name="separator"
                    layout={{ height: 1, width: WIDTH, flexShrink: 0 }}
                />
                <Region
                    name="button_list"
                    layout={{ marginLeft: 10, flexShrink: 0, minWidth: 254, maxWidth: 254, flexDirection: 'row', gap: 10 }}
                >
                    <Button
                        variant="3"
                        name="cancel_button"
                        onPointerTap={onCancel}
                        layout={{ width: COLUMN_WIDTH, height: 30, flexShrink: 0, minWidth: COLUMN_WIDTH, maxWidth: COLUMN_WIDTH }}
                    >
                        {t('breedpets.widget.cancel')}
                    </Button>
                    {(mode === 'ask') && (
                        <ButtonThick
                            variant="5"
                            name="save_button"
                            tintColor="#00aa00"
                            onPointerTap={onBreed}
                            layout={{ width: COLUMN_WIDTH, height: 30, flexShrink: 0, minWidth: COLUMN_WIDTH, maxWidth: COLUMN_WIDTH }}
                        >
                            {t('breedpets.widget.use')}
                        </ButtonThick>
                    )}
                    {(mode === 'accept') && (
                        <ButtonThick
                            variant="5"
                            name="accept_button"
                            tintColor="#00aa00"
                            onPointerTap={onAccept}
                            layout={{ width: COLUMN_WIDTH, height: 30, flexShrink: 0, minWidth: COLUMN_WIDTH, maxWidth: COLUMN_WIDTH }}
                        >
                            {t('breedpets.widget.accept')}
                        </ButtonThick>
                    )}
                </Region>
                <Region layout={{ height: 1, width: 272, flexShrink: 0, minWidth: 272 }} />
            </Region>
        </Frame>
    );
};
