import { useTranslation } from '#base/context/system';
import { useViewportSize } from '#base/hooks';
import { LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

/**
 * Gold, silver and bronze, as `TrophyTheme` names them: the plaque's art and the colour of its
 * title bar both follow the trophy's `furniture_color`, and anything outside 0-2 is gold.
 */
const TROPHY_THEMES = [
    { background: 'trophy_bg_gold.png', header: '#ecc547' },
    { background: 'trophy_bg_silver.png', header: '#c9bdcc' },
    { background: 'trophy_bg_bronze.png', header: '#b87834' },
];

/** `trophy_general`'s size. */
const WIDTH = 340;
const HEIGHT = 173;

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
 * A trophy's engraving, on the plaque itself - the `trophy_general` layout (340x173) that
 * `TrophyView` builds and centres: the plaque art of the trophy's colour, its title on the
 * `title_bg` bar of the matching `TrophyTheme` header colour, the engraving, the date at its foot
 * on the left and the winner on the right (an auto-size text keeping its right edge). Every text
 * is Ubuntu 12 in the advanced renderer; the engraving and the date are cut at their boxes. The
 * whole plaque drags, and the close button is part of the plaque art: the layout only puts the
 * invisible `close` region over it. Read-only; a trophy is engraved when it is bought, never
 * afterwards.
 */
export const FurnitureTrophyView = ({ color, title, ownerName, date, message, onClose }: FurnitureTrophyViewProps) => {
    const theme = TROPHY_THEMES[color] ?? TROPHY_THEMES[0];
    const t = useTranslation();
    const viewport = useViewportSize();

    return (
        <Region
            dragTarget
            dragTrigger
            layout={{
                position: 'absolute',
                left: Math.max(0, Math.floor((viewport.width - WIDTH) / 2)),
                top: Math.max(0, Math.floor((viewport.height - HEIGHT) / 2)),
                width: WIDTH,
                height: HEIGHT,
            }}
        >
            <ThemeImage
                src={LayoutImage(`room-ui/${theme.background}`)}
                bitmap={{}}
                layout={{ position: 'absolute', left: 0, top: 0, width: WIDTH, height: HEIGHT }}
            />
            <ThemeText
                // `TrophyView` turns the literal `\r` the engraving is stored with into line breaks.
                text={message.replace(/\\r/g, '\n')}
                textOptions={{ fontFamily: 'Ubuntu', fontSize: 12, wordWrap: true, wordWrapWidth: 293 }}
                flashFormat={{ antiAliasType: 'advanced' }}
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 22, top: 25, width: 297, height: 116 }}
            />
            <ThemeText
                text={date}
                textOptions={{ fontFamily: 'Ubuntu', fontSize: 12, wordWrap: true, wordWrapWidth: 79 }}
                flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 21, top: 142, width: 83, height: 18 }}
            />
            <ThemeText
                text={ownerName}
                textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                verticalAlign="top"
                layout={{ position: 'absolute', right: 20, top: 142 }}
            />
            <Region
                cursor="pointer"
                onPointerTap={onClose}
                layout={{ position: 'absolute', left: 318, top: 3, width: 18, height: 20 }}
            />
            <Region
                backgroundColor={theme.header}
                layout={{ position: 'absolute', left: 110, top: 4, width: 120, height: 18 }}
            >
                <ThemeText
                    text={title ?? t('widget.furni.trophy.title')}
                    textOptions={{ fontFamily: 'Ubuntu', fontSize: 12, align: 'center' }}
                    flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 1, width: 120 }}
                />
            </Region>
        </Region>
    );
};
