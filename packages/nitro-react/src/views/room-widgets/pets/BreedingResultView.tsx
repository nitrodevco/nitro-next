import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { useTranslation } from '#base/context/system';
import { Box, Button, Frame, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { useFurnitureImageTexture } from '../../catalog/useFurnitureImageTexture';

/** One seed a breeding produced, or the empty place of one. */
export interface BreedingSeed {
    /** False for the owner who came away with nothing: the column stays empty. */
    present: boolean;
    /** The furni's class name, for its picture; empty when the furniture data has no entry for it. */
    className: string;
    name: string;
    rarityLevel: number;
    ownerName: string;
    hasMutation: boolean;
}

export interface BreedingResultViewProps {
    seeds: [ BreedingSeed, BreedingSeed ];
    /** When only one seed came out of it, who got it - the "sorry" wording names them. */
    luckyUser: string | undefined;
    onClose: () => void;
}

/** `breed_pets_result`: 275 x 300 in the layout, frame margins 3/36/3/0. */
const WIDTH = 275;
const HEIGHT = 300;
/** Each seed's column and its `preview_image`. */
const COLUMN_WIDTH = 122;
const IMAGE_HEIGHT = 130;
/** `breed_pets_preview_bg_png`, 122x130: the backdrop `updatePreviewImage` copies into each `preview_image` first. */
const PREVIEW_BACKGROUND = LayoutImage('room-ui/breed_pets_preview_bg.png');

/**
 * The seed's furniture at 64 scale, merged into its 122x130 `preview_image` centred and cut at the
 * box over `breed_pets_preview_bg` (copied in at 0,0, unstretched), as
 * `BreedPetsResultView.updatePreviewImage` did - never scaled.
 */
const SeedPicture = ({ className }: { className: string }) => {
    const { texture, width, height } = useFurnitureImageTexture(className.length ? className : undefined, 0, 2, RoomGeometryScaleType.ZoomedIn);

    return (
        <Region
            name="preview_image_region"
            layout={{ height: IMAGE_HEIGHT, width: COLUMN_WIDTH, flexShrink: 0, overflow: 'hidden' }}
        >
            <ThemeImage
                name="preview_background"
                src={PREVIEW_BACKGROUND}
                bitmap={{ stretchedX: false, stretchedY: false }}
                layout={{ position: 'absolute', left: 0, top: 0, width: COLUMN_WIDTH, height: IMAGE_HEIGHT }}
            />
            {texture && !!className.length && (
                <pixiSprite
                    texture={texture}
                    layout={{ position: 'absolute', left: Math.trunc((COLUMN_WIDTH - width) / 2), top: Math.trunc((IMAGE_HEIGHT - height) / 2), width, height }}
                />
            )}
        </Region>
    );
};

/**
 * What two bred plants produced - `BreedPetsResultView` on the `breed_pets_result` layout (frame
 * style 3): a seed per owner with its rarity, a note when one of them mutated, and the "sorry"
 * wording when only one owner was lucky. `setWindowContent` shows `description` alone to an owner
 * of the seeds, and `description_sorry`, `info_sorry` and the `close_button` row to anyone else;
 * the `element_list` closes up over what is hidden and `resizeToFitContent` fits the window to
 * it (`fitContent`) - both ways, so the 274-wide list makes the window 280 wide, not the layout's
 * 275, as it does in Flash (the frame has no `width_max`).
 *
 * Flash also let each seed be placed or picked up from here (the `preview_buttonlist` an owner
 * sees); the seeds are in the inventory either way, so that row is left out. With it goes the
 * only way an owner could close the window besides the header button, so the close row shows for
 * everyone.
 */
export const BreedingResultView = ({ seeds, luckyUser, onClose }: BreedingResultViewProps) => {
    const t = useTranslation();
    const sorry = !!luckyUser;

    const column = (seed: BreedingSeed, index: 1 | 2) => (
        <Region
            name={`seed${index}_itemlist`}
            layout={{ flexShrink: 0, minWidth: COLUMN_WIDTH, maxWidth: COLUMN_WIDTH, flexDirection: 'column', gap: 1 }}
        >
            {seed.present && (
                <>
                    <ThemeText
                        text={t(`breedpetsresult.widget.seed${index}.name`, '', { name: seed.name })}
                        textStyle="u_regular"
                        textOptions={{ align: 'center' }}
                        name="seed_name"
                        verticalAlign="top"
                        layout={{ width: COLUMN_WIDTH, flexShrink: 0 }}
                    />
                    <SeedPicture className={seed.className} />
                    <ThemeText
                        text={t(`breedpetsresult.widget.seed${index}.raritylevel`, '', { level: String(seed.rarityLevel) })}
                        textStyle="u_regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 130, align: 'center' }}
                        name="seed_rarity_level"
                        verticalAlign="top"
                        layout={{ width: 134, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={t(`breedpetsresult.widget.seed${index}.description`, '', { name: seed.ownerName })}
                        textStyle="u_regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 118, align: 'center' }}
                        name="seed_description"
                        verticalAlign="top"
                        layout={{ width: COLUMN_WIDTH, flexShrink: 0 }}
                    />
                    {seed.hasMutation && (
                        <ThemeText
                            text={t('breedpetsresult.widget.info.mutation')}
                            textStyle="u_italic"
                            textOptions={{ fontSize: 13, wordWrap: true, wordWrapWidth: 118, align: 'center' }}
                            name={`info_mutate${index}`}
                            verticalAlign="top"
                            layout={{ width: COLUMN_WIDTH, flexShrink: 0, minWidth: COLUMN_WIDTH, maxWidth: COLUMN_WIDTH }}
                        />
                    )}
                </>
            )}
        </Region>
    );

    return (
        <Frame
            variant="3"
            id="breeding-result"
            caption={t('breedpetsresult.widget.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 3, 36, 3, 0 ]}
            fitContent
            layout={{ position: 'absolute', width: WIDTH, height: HEIGHT }}
        >
            <Region
                name="element_list"
                layout={{ position: 'absolute', left: 0, top: 0, minWidth: 274, maxWidth: 274, flexDirection: 'column', gap: 10 }}
            >
                <Region
                    name="separator"
                    layout={{ height: 1, width: 274, flexShrink: 0 }}
                />
                {!sorry && (
                    <ThemeText
                        text={t('breedpetsresult.widget.text')}
                        textStyle="u_regular"
                        textOptions={{ fontSize: 13, wordWrap: true, wordWrapWidth: 250 }}
                        name="description"
                        verticalAlign="top"
                        layout={{ width: 254, marginLeft: 11, flexShrink: 0 }}
                    />
                )}
                {sorry && (
                    <>
                        <ThemeText
                            text={t('breedpetsresult.widget.text.sorry', '', { user: luckyUser })}
                            textStyle="u_regular"
                            textOptions={{ fontSize: 13, wordWrap: true, wordWrapWidth: 250 }}
                            name="description_sorry"
                            verticalAlign="top"
                            layout={{ width: 254, marginLeft: 9, flexShrink: 0 }}
                        />
                        <ThemeText
                            text={t('breedpetsresult.widget.info.sorry')}
                            textStyle="u_italic"
                            textOptions={{ fontSize: 13, wordWrap: true, wordWrapWidth: 250 }}
                            name="info_sorry"
                            verticalAlign="top"
                            layout={{ width: 254, marginLeft: 10, flexShrink: 0 }}
                        />
                    </>
                )}
                <Region
                    name="preview_list"
                    layout={{ marginLeft: 10, flexShrink: 0, maxWidth: 254, flexDirection: 'row', gap: 10 }}
                >
                    {column(seeds[0], 1)}
                    {column(seeds[1], 2)}
                </Region>
                <Box layout={{ height: 1, width: 244, marginLeft: 10, flexShrink: 0, minHeight: 1, maxHeight: 1 }} />
                <Region
                    name="button_list"
                    layout={{ marginLeft: 76, flexShrink: 0, flexDirection: 'row', gap: 10 }}
                >
                    <Button
                        variant="3"
                        name="close_button"
                        onPointerTap={onClose}
                        layout={{ width: COLUMN_WIDTH, height: 30, flexShrink: 0, minWidth: COLUMN_WIDTH, maxWidth: COLUMN_WIDTH }}
                    >
                        {t('breedpetsresult.widget.close')}
                    </Button>
                </Region>
                <Region
                    name="separator"
                    layout={{ height: 1, width: 274, flexShrink: 0, minWidth: 274, minHeight: 1 }}
                />
            </Region>
        </Frame>
    );
};
