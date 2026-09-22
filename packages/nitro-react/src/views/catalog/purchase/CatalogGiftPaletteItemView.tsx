import { LayoutImage, Region, ThemeImage } from '#base/theme';

export interface CatalogGiftPaletteItemViewProps {
    /** The box furni's first colour (`furniData.colours[0]`), which tints the swatch. */
    colour: number;
    selected: boolean;
    onSelect: () => void;
}

/**
 * One swatch of the gift window's colour grid - `gift_palette_item.xml` (27x22), which
 * `PurchaseConfirmationDialog.initColorGrid` clones per box furni: the white `color_container`
 * with the `color` bitmap tinted in the furni's colour, the `border` over it and the `selection`
 * frame, shown only on the chosen furni (`updateColorGrid`). A press picks it (`onColorItemClick`).
 */
export const CatalogGiftPaletteItemView = ({ colour, selected, onSelect }: CatalogGiftPaletteItemViewProps) => (
    <Region
        name="color_container"
        backgroundColor="#ffffff"
        backgroundAlpha={1}
        onPointerTap={onSelect}
        cursor="pointer"
        layout={{ position: 'relative', width: 27, height: 22, flexShrink: 0 }}
    >
        <ThemeImage
            name="color"
            src={LayoutImage('catalog/catalogue_color_picker_27x22_color.png')}
            bitmap={{}}
            tint={`#${colour.toString(16).padStart(6, '0')}`}
            layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 22 }}
        />
        <ThemeImage
            name="border"
            src={LayoutImage('catalog/catalogue_color_picker_27x22_border.png')}
            bitmap={{}}
            layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 22 }}
        />
        {selected && (
            <ThemeImage
                name="selection"
                src={LayoutImage('catalog/catalogue_color_picker_27x22_selection.png')}
                bitmap={{}}
                layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 22 }}
            />
        )}
    </Region>
);
