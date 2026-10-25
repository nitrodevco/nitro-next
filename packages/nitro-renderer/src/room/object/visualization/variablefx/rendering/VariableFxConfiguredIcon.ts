import { VariableFxRendererContext } from '../VariableFxRendererContext';
import { VariableFxIconAlignment } from '../VariableFxTables';
import { VariableFxBitmap } from './VariableFxBitmap';
import { VariableFxIconDefinition } from './VariableFxIconDefinition';
import { VariableFxIconMetadata } from './VariableFxIconMetadata';
import { VariableFxIconOverlayLayout } from './VariableFxIconOverlayLayout';

const readExtra = (extra: Map<string, string> | undefined, key: string): string | undefined => {
    const value = extra?.get(key);

    if (value === undefined || value === null) return undefined;

    return value.replace(/^\s+|\s+$/g, '');
};

/** The icon a config asks for through its `icon` / `icon_alignment` extras, with its bitmap resolved. */
export class VariableFxConfiguredIcon {
    public static ICON_CONFIG_EXTRA_KEY: string = 'icon';
    public static ICON_ALIGNMENT_CONFIG_EXTRA_KEY: string = 'icon_alignment';
    public static BAR_ICON_OVERLAP_PX: number = 5;
    public static BAR_ICON_CONTENT_Y_OFFSET_PX: number = 2;

    constructor(
        public bitmap: VariableFxBitmap,
        public definition: VariableFxIconDefinition,
    ) {}

    public static resolve(context: VariableFxRendererContext): VariableFxConfiguredIcon | undefined {
        const iconName = readExtra(context.config.extra, VariableFxConfiguredIcon.ICON_CONFIG_EXTRA_KEY);

        if (!iconName || !iconName.length) return undefined;

        const definition = VariableFxIconMetadata.resolve(context.assetProvider, iconName);
        const bitmap = context.assetProvider?.getBitmap(definition.assetName);

        if (!bitmap) throw new Error(`Missing Variable FX icon layer '${definition.assetName}'.`);

        return new VariableFxConfiguredIcon(bitmap, definition);
    }

    public static resolveAlignment(context: VariableFxRendererContext): VariableFxIconAlignment {
        const alignment = readExtra(context.config.extra, VariableFxConfiguredIcon.ICON_ALIGNMENT_CONFIG_EXTRA_KEY);

        switch (alignment) {
            case 'right':
            case 'double':
                return alignment;
            default:
                return 'left';
        }
    }

    public static resolveBarIconOverlayLayout(contentWidth: number, contentHeight: number, icon: VariableFxConfiguredIcon | undefined, alignment: VariableFxIconAlignment = 'left', contentYOffsetPx: number = VariableFxConfiguredIcon.BAR_ICON_CONTENT_Y_OFFSET_PX): VariableFxIconOverlayLayout {
        return VariableFxIconOverlayLayout.resolve({
            alignment,
            contentHeight,
            contentWidth,
            contentYOffsetPx,
            iconHeight: icon ? icon.bitmap.height : 0,
            iconOffsetX: icon ? icon.definition.offsetX : 0,
            iconOffsetY: icon ? icon.definition.offsetY : 0,
            iconWidth: icon ? icon.bitmap.width : 0,
            overlapPx: VariableFxConfiguredIcon.BAR_ICON_OVERLAP_PX,
        });
    }
}
