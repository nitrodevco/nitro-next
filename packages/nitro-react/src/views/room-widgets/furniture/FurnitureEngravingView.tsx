import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { useConfigValue, useTranslation } from '#base/context/system';
import { useViewportSize } from '#base/hooks';
import { Region, ThemeImage, ThemeText, useAvatarImageTexture } from '#base/theme';

/** A plaque's text boxes: `x`, `y` and `width` as its layout places them. */
type TextBox = { left: number; top: number; width: number };

interface EngravingTheme {
    /** The localization prefix and the layout (`<prefix>_engraving`) it names. */
    prefix: string;
    /** `asset_uri` of the `background` bitmap, under `${image.library.url}`. */
    background: string;
    /** `text_color` of `header` and `date`, and of the two names. */
    text: string;
    name: string;
    /** `etching_color` of every text. */
    etching: number;
    header: TextBox;
    nameLeft: TextBox;
    nameRight: TextBox;
    date: TextBox;
}

/** `lovelock_engraving` and `wildwest_engraving` differ only in their texts and background. */
const LOVELOCK_GEOMETRY = {
    text: '#59224a',
    name: '#59224a',
    etching: 0xFFFFFFFF,
    header: { left: 82, top: 126, width: 217 },
    nameLeft: { left: 19, top: 175, width: 150 },
    nameRight: { left: 199, top: 175, width: 87 },
    date: { left: 143, top: 151, width: 97 },
};

/**
 * The engraved friend furni, by the `furniture_friendfurni_engraving` value their own logic
 * writes - `FriendFurniEngravingWidget.open` builds `LoveLockEngravingView` (0),
 * `WildWestEngravingView` (3) or `HabboweenEngravingView` (4), each only naming its layout; 1 and
 * 2 build nothing.
 */
const ENGRAVING_THEMES: Record<number, EngravingTheme> = {
    0: { prefix: 'lovelock', background: 'furniextras/loveLock_engraving.png', ...LOVELOCK_GEOMETRY },
    3: { prefix: 'wildwest', background: 'furniextras/loveLock_wildwest.png', ...LOVELOCK_GEOMETRY },
    4: {
        prefix: 'habboween',
        background: 'furniextras/loveLock_hween14.png',
        text: '#2a2420',
        name: '#6b115c',
        etching: 0xFF958D95,
        header: { left: 82, top: 130, width: 217 },
        nameLeft: { left: 20, top: 175, width: 150 },
        nameRight: { left: 190, top: 175, width: 161 },
        date: { left: 143, top: 154, width: 97 },
    },
};

const WIDTH = 375;
const HEIGHT = 210;

export interface FurnitureEngravingViewProps {
    /** 0 lovelock, 3 wild west, 4 habboween. */
    engravingType: number;
    leftName: string;
    rightName: string;
    leftFigure: string;
    rightFigure: string;
    date: string;
    onClose: () => void;
}

/**
 * Two friends engraved on a lock, on the `lovelock_engraving` / `wildwest_engraving` /
 * `habboween_engraving` layouts (375x210) that `FriendFurniEngravingView.createWindow` builds and
 * centres: the plaque art from the image library, the pair of them side by side, their names
 * beneath and the day it was sealed.
 *
 * Each avatar is the large cropped image, drawn centred in its 70x115 bitmap
 * (`setElementImage`); only the right one is turned to direction 4, so the left keeps the avatar's
 * default 2 and the two face each other. The close button is drawn by the plaque art: the layout
 * only puts the invisible `header_button_close` region over it.
 */
export const FurnitureEngravingView = ({
    engravingType, leftName, rightName, leftFigure, rightFigure, date, onClose,
}: FurnitureEngravingViewProps) => {
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const viewport = useViewportSize();
    const theme = ENGRAVING_THEMES[engravingType] ?? ENGRAVING_THEMES[0];
    const left = useAvatarImageTexture(leftFigure, AvatarGenderType.Male, { direction: 2 });
    const right = useAvatarImageTexture(rightFigure, AvatarGenderType.Male, { direction: 4 });
    const etching = { etchingColor: theme.etching, etchingPosition: 'bottom' as const };

    return (
        <Region layout={{
            position: 'absolute',
            left: Math.max(0, Math.floor((viewport.width - WIDTH) / 2)),
            top: Math.max(0, Math.floor((viewport.height - HEIGHT) / 2)),
            width: WIDTH,
            height: HEIGHT,
        }}
        >
            <ThemeImage
                src={`${imageLibraryUrl}${theme.background}`}
                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                layout={{ position: 'absolute', left: 0, top: 0, width: WIDTH, height: HEIGHT }}
            />
            <ThemeText
                text={t(`${theme.prefix}.engraving.caption`)}
                textStyle="u_bold"
                textOptions={{ fill: theme.text, align: 'center' }}
                flashFormat={etching}
                verticalAlign="top"
                layout={{ position: 'absolute', ...theme.header, height: 17 }}
            />
            {left.texture && (
                <ThemeImage
                    texture={left.texture}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 115, top: 7, width: 70, height: 115 }}
                />
            )}
            {right.texture && (
                <ThemeImage
                    texture={right.texture}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 186, top: 7, width: 70, height: 115 }}
                />
            )}
            <ThemeText
                text={leftName}
                textStyle="u_bold"
                textOptions={{ fill: theme.name, align: 'right' }}
                flashFormat={etching}
                verticalAlign="top"
                layout={{ position: 'absolute', ...theme.nameLeft, height: 17 }}
            />
            <ThemeText
                text={rightName}
                textStyle="u_bold"
                textOptions={{ fill: theme.name }}
                flashFormat={etching}
                verticalAlign="top"
                layout={{ position: 'absolute', ...theme.nameRight, height: 17 }}
            />
            <ThemeText
                text={date}
                textStyle="u_bold"
                textOptions={{ fill: theme.text, align: 'center' }}
                flashFormat={etching}
                verticalAlign="top"
                layout={{ position: 'absolute', ...theme.date, height: 4 }}
            />
            <Region
                cursor="pointer"
                onPointerTap={onClose}
                layout={{ position: 'absolute', left: 330, top: 33, width: 21, height: 17 }}
            />
        </Region>
    );
};
