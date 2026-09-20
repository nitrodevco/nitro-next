import { useTranslation } from '#base/context/system';
import { CloseButton, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

/**
 * Gold, silver and bronze, as `TrophyTheme` names them: the plaque's art and the colour of its
 * title bar both follow the trophy's `furniture_color`, and anything outside 0-2 is gold.
 */
const TROPHY_THEMES = [
    { background: 'trophy_bg_gold.png', header: '#ecc547' },
    { background: 'trophy_bg_silver.png', header: '#c9bdcc' },
    { background: 'trophy_bg_bronze.png', header: '#b87834' },
];

export interface FurnitureTrophyViewProps {
    color: number;
    /** The plaque's own title; a trophy says "Trophy", a badge display says what it is. */
    title?: string;
    ownerName: string;
    date: string;
    message: string;
    onClose: () => void;
}

/**
 * A trophy's engraving, on the plaque itself - the `trophy_general` layout (340x173): the
 * engraving centred on the art, the date at its foot on the left and the winner on the right.
 * Read-only; a trophy is engraved when it is bought, never afterwards.
 */
export const FurnitureTrophyView = ({ color, title, ownerName, date, message, onClose }: FurnitureTrophyViewProps) => {
    const theme = TROPHY_THEMES[color] ?? TROPHY_THEMES[0];
    const t = useTranslation();

    return (
        <Region layout={{ position: 'absolute', top: 100, left: 100, width: 340, height: 173, justifyContent: 'center' }}>
            <ThemeImage
                src={LayoutImage(`room-ui/${theme.background}`)}
                layout={{ position: 'absolute', left: 0, top: 0, width: 340, height: 173 }}
            />
            <Region
                backgroundColor={theme.header}
                layout={{ position: 'absolute', width: 120, top: 4, height: 18, justifyContent: 'center' }}
            >
                <ThemeText
                    text={title ?? t('widget.furni.trophy.title')}
                    textOptions={{ align: 'center' }}
                    layout={{ position: 'absolute', width: 120, top: 1, bottom: 0 }}
                />
            </Region>
            <CloseButton
                onPointerTap={onClose}
                layout={{ position: 'absolute', right: 4, top: 3, width: 18, height: 20 }}
            />
            <ThemeText
                text={message}
                textOptions={{ wordWrap: true, wordWrapWidth: 297 }}
                verticalAlign="top"
                layout={{ position: 'absolute', width: 297, alignSelf: 'center', top: 26, height: 116 }}
            />
            <ThemeText
                text={date}
                textOptions={{ wordWrap: true, wordWrapWidth: 83 }}
                verticalAlign="top"
                layout={{ position: 'absolute', left: 21, width: 83, top: 142, height: 18 }}
            />
            <ThemeText
                text={ownerName}
                layout={{ position: 'absolute', right: 20, width: 74, top: 142, height: 17 }}
            />
        </Region>
    );
};
