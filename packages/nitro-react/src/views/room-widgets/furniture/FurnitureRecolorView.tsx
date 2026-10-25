import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { useFurnitureImageTexture } from '#base/hooks';
import { TemplateBindings, TemplateItem, TemplateWindow, ThemeImage } from '#base/theme';

/** `FurnitureRecolorView`'s layout, from the room UI library's `furniture_recolor_xml`. */
const TEMPLATE = 'habbo-room-ui-com/furniture_recolor_xml';

/** The swatch prototype `FurnitureRecolorView` takes out of `default_colors` (`removeGridItemAt(0)`). */
const SWATCH = 'color_template';

export interface FurnitureRecolorViewProps {
    /** The furni's type name, direction and map data, as the previews draw it. */
    typeName: string;
    direction: number;
    stuffData: Readonly<Record<string, string>>;
    /** The colour the furni has (the left preview), and the one picked (the right preview and the selected swatch). */
    originalColor: number;
    color: number;
    /** `allowedColors` (the furni's palette) and `collectRoomColors` (the palette's colours furni in the room have). */
    defaultColors: readonly number[];
    roomColors: readonly number[];
    /** The "Apply to" menu's entry (`furniture.recolor.scope.0-3`). */
    scope: number;
    onColor: (color: number) => void;
    onScope: (scope: number) => void;
    onApply: () => void;
    onClose: () => void;
}

/** `FurnitureRecolorPreviewView`: the furni at 64 in its own direction, with the colour written into its map data, scaled down to fit. */
const RecolorPreview = ({ typeName, direction, stuffData, color }: { typeName: string; direction: number; stuffData: Readonly<Record<string, string>>; color: number }) => {
    const { texture } = useFurnitureImageTexture(typeName, 0, direction, RoomGeometryScaleType.ZoomedIn, 0, undefined, {
        ...stuffData,
        r: String((color >> 16) & 0xff),
        g: String((color >> 8) & 0xff),
        b: String(color & 0xff),
    });

    if (!texture) return null;

    return (
        <ThemeImage
            texture={texture}
            bitmap={{ pivot: 'center', stretchedX: false, stretchedY: false }}
            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
        />
    );
};

/**
 * The recolor window (WIN63-202610121624 `FurnitureRecolorView`, layout `furniture_recolor`,
 * 388x551): the furni before and after, the palette (`default_colors`) and the palette's colours
 * already in the room (`room_colors`) as `FurnitureRecolorSwatchView`s - the swatch's `color`
 * tinted, its `selection` shown on the picked one - the "Apply to" menu (`scope`) and Apply,
 * enabled only for a colour of the palette. Close hides it.
 */
export const FurnitureRecolorView = ({ typeName, direction, stuffData, originalColor, color, defaultColors, roomColors, scope, onColor, onScope, onApply, onClose }: FurnitureRecolorViewProps) => {
    const swatches = (colors: readonly number[]): TemplateItem[] => colors.map(swatchColor => ({
        key: String(swatchColor),
        from: SWATCH,
        bindings: {
            '': { visible: true, onPointerTap: () => onColor(swatchColor) },
            color: { color: (0xff000000 | swatchColor) >>> 0 },
            selection: { visible: swatchColor === color },
        },
    }));

    const bindings: TemplateBindings = {
        'original_preview_section/preview_image': { children: (
            <RecolorPreview
                typeName={typeName}
                direction={direction}
                stuffData={stuffData}
                color={originalColor}
            />
        ) },
        'preview_section/preview_image': { children: (
            <RecolorPreview
                typeName={typeName}
                direction={direction}
                stuffData={stuffData}
                color={color}
            />
        ) },
        default_colors: { items: swatches(defaultColors) },
        room_colors: { items: swatches(roomColors) },
        scope: { selection: scope, onSelect: onScope },
        apply: { disabled: !defaultColors.includes(color), onPointerTap: onApply },
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={{ id: 'furniture_recolor', centered: true, rememberPosition: false, onClose }}
            bindings={bindings}
        />
    );
};
