import { IGuildColorData } from '@nitrodevco/nitro-packets';

import { BoxLayout, LayoutImage, Region, ThemeImage } from '#base/theme';

export interface GroupColorGridProps {
    colors: IGuildColorData[];
    /** The palette entry that is picked, by its own id. */
    selectedColorId: number;
    onSelect: (colorId: number) => void;
    layout?: BoxLayout;
}

/** `badge_color_item` - the swatch is 15x15, and the grid simply wraps them. */
const SWATCH_SIZE = 15;

/**
 * A palette of guild or badge colours - `ColorGridCtrl`, which builds one `badge_color_item` per
 * colour. The cell is three bitmaps: an untinted backing, the swatch itself tinted with the
 * colour, and a frame shown only on the picked one.
 */
export const GroupColorGrid = ({ colors, selectedColorId, onSelect, layout }: GroupColorGridProps) => (
    <Region layout={{ flexDirection: 'row', flexWrap: 'wrap', ...layout }}>
        {colors.map(color => (
            <Region
                key={color.id}
                name="container"
                backgroundColor="#bebba5"
                onPointerTap={() => onSelect(color.id)}
                cursor="pointer"
                layout={{ width: SWATCH_SIZE, height: SWATCH_SIZE }}
            >
                <ThemeImage
                    name="background"
                    src={LayoutImage('groups/color_chooser_bg.png')}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <ThemeImage
                    name="foreground"
                    src={LayoutImage('groups/color_chooser_fg.png')}
                    tint={`#${color.color.toString(16).padStart(6, '0')}`}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                {(color.id === selectedColorId) && (
                    <ThemeImage
                        name="selected"
                        src={LayoutImage('groups/color_chooser_selected.png')}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                )}
            </Region>
        ))}
    </Region>
);
