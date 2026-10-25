/**
 * `ColorGridCtrl.createAndAttach`: one `badge_color_item` per colour of a palette, added to its grid -
 * a `#bebba5` cell the size of `color_chooser_bg`, the backing, the swatch (`color_chooser_fg`
 * multiplied by the colour, `setGridItemBitmap`'s `ColorTransform`) and the frame over the picked one
 * (`setSelectedItemVisibility`). A click picks the cell's colour.
 */
import { IGuildColorData } from '@nitrodevco/nitro-packets';

import { LayoutImage, Template, TemplateItem } from '#base/theme';

/** `_loc4_.color = 4290689957`: the cell's own background. */
const CELL_COLOR = 0xFFBEBBA5;

const COLOR_CHOOSER_BG = LayoutImage('habbo-groups-com/color_chooser_bg.png');
const COLOR_CHOOSER_FG = LayoutImage('habbo-groups-com/color_chooser_fg.png');
const COLOR_CHOOSER_SELECTED = LayoutImage('habbo-groups-com/color_chooser_selected.png');

export const groupColorItems = (template: Template, colors: readonly IGuildColorData[], selectedIndex: number, onSelect: (index: number) => void): TemplateItem[] => colors.map((color, index) => ({
    key: String(color.id),
    from: template,
    bindings: {
        '': { background: true, color: CELL_COLOR, onPointerTap: () => onSelect(index) },
        background: { asset: COLOR_CHOOSER_BG },
        foreground: { asset: COLOR_CHOOSER_FG, color: (0xFF000000 | color.color) >>> 0 },
        selected: { asset: COLOR_CHOOSER_SELECTED, visible: index === selectedIndex },
    },
}));
