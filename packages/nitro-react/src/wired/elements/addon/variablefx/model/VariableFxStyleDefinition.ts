/**
 * `addons/variablefx/model/VariableFxStyleDefinition` - one style of a Variable FX category as the
 * editor sees it: its id and localization key, the name the runtime config carries as its style
 * (the style's default renderer), the colours, widths and renderers it allows with their
 * defaults, the config extras it always sends (`extra`), the status extras the preview starts
 * from, and whether it takes an icon.
 */
import type { VariableFxOption } from './VariableFxOption';

export interface VariableFxStyleDefinition {
    id: number;
    localizationKey: string;
    runtimeStyle: string;
    colorOptions: VariableFxOption[];
    widthOptions: VariableFxOption[];
    rendererOptions: VariableFxOption[];
    defaultColor: VariableFxOption;
    defaultWidth: VariableFxOption;
    defaultRenderer: VariableFxOption;
    extra: Map<string, string>;
    defaultStatusExtra: Map<string, string>;
    supportsIcon: boolean;
}

/** `hasColorOptions`. */
export const styleHasColorOptions = (style: VariableFxStyleDefinition): boolean =>
    (style.colorOptions.length > 0) && (style.defaultColor.runtimeValue !== 'NOT_APPLICABLE');

/** `hasWidthOptions`. */
export const styleHasWidthOptions = (style: VariableFxStyleDefinition): boolean =>
    (style.widthOptions.length > 0) && (style.defaultWidth.runtimeValue !== 'not_applicable');

/** `hasRendererOptions`. */
export const styleHasRendererOptions = (style: VariableFxStyleDefinition): boolean => style.rendererOptions.length > 1;
