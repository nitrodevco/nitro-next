import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { useTranslation } from '#base/context/system';
import { Box, Button, Frame, Region, ThemeText } from '#base/theme';

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

const WIDTH = 275;
const COLUMN_WIDTH = 122;
const IMAGE_HEIGHT = 130;

const SeedPicture = ({ className }: { className: string }) => {
    const { texture, width, height } = useFurnitureImageTexture(className.length ? className : undefined, 0, 2, RoomGeometryScaleType.ZoomedIn);
    const scale = Math.min(1, COLUMN_WIDTH / Math.max(1, width), IMAGE_HEIGHT / Math.max(1, height));

    return (
        <Box layout={{ width: COLUMN_WIDTH, height: IMAGE_HEIGHT, alignItems: 'center', justifyContent: 'center' }}>
            {texture && !!className.length && (
                <pixiSprite
                    texture={texture}
                    layout={{ width: width * scale, height: height * scale }}
                />
            )}
        </Box>
    );
};

/**
 * What two bred plants produced - `BreedPetsResultView` on the `breed_pets_result` layout: a
 * seed per owner with its rarity, a note when one of them mutated, and the "sorry" wording when
 * only one owner was lucky. Flash also let each seed be placed or picked up from here; the seeds
 * are in the inventory either way.
 */
export const BreedingResultView = ({ seeds, luckyUser, onClose }: BreedingResultViewProps) => {
    const t = useTranslation();

    const text = (value: string, style: 'text-style-regular' | 'text-style-bold' | 'text-style-u-italic' = 'text-style-regular', width: number = WIDTH - 20) => (
        <ThemeText
            text={value}
            textStyle={style}
            textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: width }}
        />
    );

    const column = (seed: BreedingSeed, index: 1 | 2) => (
        <Box layout={{ width: COLUMN_WIDTH, flexDirection: 'column', gap: 1, alignItems: 'center' }}>
            {seed.present && (
                <>
                    {text(t(`breedpetsresult.widget.seed${index}.name`, seed.name, { name: seed.name }), 'text-style-bold', COLUMN_WIDTH)}
                    <SeedPicture className={seed.className} />
                    {text(t(`breedpetsresult.widget.seed${index}.raritylevel`, '', { level: String(seed.rarityLevel) }), 'text-style-regular', COLUMN_WIDTH)}
                    {text(t(`breedpetsresult.widget.seed${index}.description`, '', { name: seed.ownerName }), 'text-style-regular', COLUMN_WIDTH)}
                    {seed.hasMutation && text(t('breedpetsresult.widget.info.mutation'), 'text-style-u-italic', COLUMN_WIDTH)}
                </>
            )}
        </Box>
    );

    return (
        <Frame
            variant="0"
            id="breeding-result"
            caption={t('breedpetsresult.widget.title')}
            onClose={onClose}
            defaultPosition={{ x: 360, y: 140 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: WIDTH, height: 330 }}
        >
            <Region layout={{ flexDirection: 'column', gap: 10, padding: 10 }}>
                {text(luckyUser ? t('breedpetsresult.widget.text.sorry', '', { user: luckyUser }) : t('breedpetsresult.widget.text'))}
                {text(t(luckyUser ? 'breedpetsresult.widget.info.sorry' : 'breedpetsresult.widget.info'), 'text-style-u-italic')}
                <Box layout={{ flexDirection: 'row', gap: 10 }}>
                    {column(seeds[0], 1)}
                    {column(seeds[1], 2)}
                </Box>
                <Button
                    variant="0"
                    onPointerTap={onClose}
                    layout={{ width: COLUMN_WIDTH, height: 26 }}
                >
                    {t('breedpetsresult.widget.close')}
                </Button>
            </Region>
        </Frame>
    );
};
