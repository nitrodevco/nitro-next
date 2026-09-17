import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { useTranslation } from '#base/context/system';
import { CloseButton, Region, ThemeImage, ThemeText, useAvatarImageTexture } from '#base/theme';

/**
 * The three engraved friend furni, by the `furniture_friendfurni_engraving` value their own
 * logic writes. Each is the same plaque with its own wording and ink; 1 and 2 are unused, as
 * they were in `FriendFurniEngravingWidget.open`.
 */
const ENGRAVING_THEMES: Record<number, { prefix: string; text: string; name: string }> = {
    0: { prefix: 'lovelock', text: '#59224a', name: '#59224a' },
    3: { prefix: 'wildwest', text: '#59224a', name: '#59224a' },
    4: { prefix: 'habboween', text: '#2a2420', name: '#6b115c' },
};

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
 * Two friends engraved on a lock, on the `lovelock_engraving` layout (375x210): the pair of
 * them side by side, their names beneath and the day it was sealed.
 *
 * Flash painted the plaque itself from the external image host, which the port cannot reach, so
 * the engraving keeps the layout's geometry and ink over a plain ground.
 */
export const FurnitureEngravingView = ({
    engravingType, leftName, rightName, leftFigure, rightFigure, date, onClose,
}: FurnitureEngravingViewProps) => {
    const t = useTranslation();
    const theme = ENGRAVING_THEMES[engravingType] ?? ENGRAVING_THEMES[0];
    const left = useAvatarImageTexture(leftFigure, AvatarGenderType.Male, { direction: 4 });
    const right = useAvatarImageTexture(rightFigure, AvatarGenderType.Male, { direction: 4 });

    return (
        <Region
            backgroundColor="#f5e9de"
            layout={{ position: 'absolute', top: 90, left: 110, width: 375, height: 210 }}
        >
            <CloseButton
                onPointerTap={onClose}
                layout={{ position: 'absolute', right: 4, top: 4, width: 18, height: 20 }}
            />
            <Region layout={{ position: 'absolute', left: 115, width: 70, top: 7, height: 115, alignItems: 'center', justifyContent: 'flex-end' }}>
                {left.texture && (
                    <ThemeImage
                        texture={left.texture}
                        width={left.width}
                        height={left.height}
                    />
                )}
            </Region>
            <Region layout={{ position: 'absolute', left: 186, width: 70, top: 7, height: 115, alignItems: 'center', justifyContent: 'flex-end' }}>
                {right.texture && (
                    <ThemeImage
                        texture={right.texture}
                        width={right.width}
                        height={right.height}
                    />
                )}
            </Region>
            <ThemeText
                text={t(`${theme.prefix}.engraving.caption`)}
                textStyle="text-style-u-bold"
                textOptions={{ fill: theme.text, align: 'center' }}
                layout={{ position: 'absolute', left: 79, width: 217, top: 126, height: 17 }}
            />
            <ThemeText
                text={leftName}
                textStyle="text-style-u-bold"
                textOptions={{ fill: theme.name, align: 'right' }}
                layout={{ position: 'absolute', left: 19, width: 150, top: 175, height: 17 }}
            />
            <ThemeText
                text={rightName}
                textStyle="text-style-u-bold"
                textOptions={{ fill: theme.name }}
                layout={{ position: 'absolute', left: 199, width: 87, top: 175, height: 17 }}
            />
            <ThemeText
                text={date}
                textOptions={{ fill: theme.text, align: 'center' }}
                layout={{ position: 'absolute', left: 79, width: 217, top: 148, height: 17 }}
            />
        </Region>
    );
};
