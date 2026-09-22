/**
 * `wired_setup.uibuilder.styles.WiredStyle` - what a wired UI style is: every metric and colour
 * getter of the Flash base class, plus what the style's XML template (`wired_style_<name>_xml`)
 * defines for each element the `create*` methods clone out of it.
 *
 * Flash keeps a style as a class with a window template; the presets clone windows and read the
 * numbers off them. Here a style is plain data, and the wired kit (`views/wired-setup/kit`) draws
 * from it, so one component renders illumina, the volters and ubuntu alike.
 *
 * Colours are CSS `#rrggbb` strings. A text colour Flash leaves at 0 (`TextParam.NO_COLOR_OVERRIDE`
 * - the volter colour variants never override `softTextColor` / `redTextColor`) is `null`: the
 * text keeps its template colour. Theme variants are the Flash window `style` ids, as the theme
 * components take them; the theme falls back to its default art for an id it has no skin for.
 */
import type { DynamicStyleName, TextStyleKey } from '#base/theme';

export type WiredStyleName = 'illumina' | 'volter' | 'volter_yellow' | 'volter_blue' | 'volter_green' | 'ubuntu';

/** One horizontal line of `ruler_view`, top to bottom. */
export interface WiredStyleRulerLine {
    color: string;
    alpha: number;
}

/** `text_view` / `text_bold_view` / `text_html`. */
export interface WiredStyleTextTemplate {
    textStyle: TextStyleKey;
    /** The template's `bold` variable, on top of the text style (illumina's bold is `il_regular` + bold). */
    bold: boolean;
    /** The template's `text_color`; `null` keeps the text style's own. */
    color: string | null;
    /** The one-line height of the template's text field. */
    height: number;
}

/** `input_template` - a border (or a bare container) holding the `field` input. */
export interface WiredStyleInputTemplate {
    /** The template's width; `TextInputParam.width` replaces the field's share of it. */
    width: number;
    height: number;
    /** `Border` variant of the template, `null` for the volters' plain container. */
    borderVariant: string | null;
    /** The `field`'s inset inside the template - `width - field.width` is what Flash calls the extra width. */
    fieldLeft: number;
    fieldTop: number;
    fieldRight: number;
    fieldBottom: number;
    textStyle: TextStyleKey;
    textColor: string;
    /**
     * The template's own fill (`background="true"` with its `color`), or the white of the border
     * skin under the field; `null` when the template is a bare container and the panel shows
     * through (the dark volter).
     */
    backgroundColor: string | null;
    /** The field's own 1px `border_color` (the volters), `null` when the border skin frames it. */
    fieldBorderColor: string | null;
    /** Whether the template carries the `char_limit_warn` bubble (illumina only). */
    hasCharLimitWarn: boolean;
    /**
     * Whether the template carries `warning_display` / `error_text` - `NumberInputPreset`'s
     * invalid-number bubble, and with it the `invalidInputBackgroundColor` tint (illumina only,
     * since the 2026 revision of `wired_style_illumina_xml`).
     */
    hasWarningDisplay: boolean;
}

/** A themed control cloned as-is: its Flash `style` id and template size. */
export interface WiredStyleControlTemplate {
    variant: string;
    width: number;
    height: number;
}

/** `expand_collapse_region` with its two arrow bitmaps. */
export interface WiredStyleExpandCollapseTemplate {
    width: number;
    height: number;
    /** The region's own `y` in its template - how far it sits below the header's top. */
    offsetY: number;
    /** The arrows' `y` inside the region. */
    arrowY: number;
    /** The arrows' `color` (a tint), `null` for untinted. */
    arrowTint: string | null;
    upAsset: string;
    downAsset: string;
    /**
     * The region's fill behind the arrows, `null` for none: only `wired_style_volter` turns its
     * `background` on (`0xffff3d3d3d`, which `WindowParser`'s uint wraps to `0xff3d3d3d`).
     */
    backgroundColor: string | null;
}

/** One `iconbutton_<name>`: a container button around an `icon_set` icon. */
export interface WiredStyleIconButtonIcon {
    /** The `<icon style>` number. */
    icon: number;
    x: number;
    y: number;
}

export interface WiredStyleIconButtonTemplate {
    variant: string;
    size: number;
    iconTint: string;
    iconSize: number;
    icons: Record<'left' | 'right' | 'up' | 'down', WiredStyleIconButtonIcon>;
}

/** `button`. */
export interface WiredStyleButtonTemplate {
    variant: string;
    width: number;
    height: number;
    textStyle: TextStyleKey;
}

/** `asset_button` - a container button around one bitmap. Missing from the volter colour variants' templates; they take volter's. */
export interface WiredStyleAssetButtonTemplate {
    variant: string;
    size: number;
    assetInset: number;
    assetSize: number;
    /**
     * The template's `dynamic_style` - `button` on illumina's and the volters' `asset_button`,
     * whose bitmap is its `#icon`. Absent where the style has no `asset_button` of its own.
     */
    dynamicStyle?: DynamicStyleName;
}

/**
 * `mini_button_view`. `pressed` is a `container_button` whose state flags carry the selection
 * (`PressedButtonMiniAssetIconButtonPreset`); `flat` is the volters' coloured region between
 * two 2px end caps (`VolterMiniAssetIconButtonPreset`).
 */
export type WiredStyleMiniButtonTemplate
    = | { kind: 'pressed'; variant: string; size: number; iconX: number; iconY: number; iconWidth: number; iconHeight: number }
        | { kind: 'flat'; width: number; height: number; borderColor: string; fillColor: string; iconWidth: number; iconHeight: number };

/**
 * `sourcetype_selector_view`. `segmented` is the template tagged `NEW` (`NewSourceTypePicker`:
 * left / middle / right container buttons with splitters); `flat` is `SourceTypePicker`'s row of
 * coloured regions between two end caps.
 */
export type WiredStyleSourceTypeSelectorTemplate
    = | {
        kind: 'segmented';
        height: number;
        leftVariant: string; middleVariant: string; rightVariant: string;
        leftWidth: number; middleWidth: number; rightWidth: number;
        /** The icons' `x` inside the left / middle / right button. */
        leftIconX: number; middleIconX: number; rightIconX: number;
        splitterColor: string; splitterShadowColor: string;
        /** `wired_styles_illumina_icon_source_<type>`. */
        assetPrefix: string;
        /** The three button templates' `dynamic_style` (`button` in illumina's), each around its `#icon` `type_image`. */
        dynamicStyle?: DynamicStyleName;
    }
    | {
        kind: 'flat';
        height: number;
        optionWidth: number;
        borderColor: string;
        /** `source_options_cont`'s fill, behind the options. */
        backgroundColor: string;
        /** `icon_source_<type>` of the room events component. */
        assetPrefix: string;
        /** The icon's tint - the light volters draw the white icons black. */
        iconTint: string | null;
    };

/** `slider`. */
export interface WiredStyleSliderTemplate {
    width: number;
    height: number;
    baseAsset: string;
    baseHeight: number;
    baseTint: string | null;
    buttonAsset: string;
    buttonWidth: number;
    buttonHeight: number;
    /** `slider_movement_area`'s `y`. */
    movementAreaY: number;
}

/** `frame`. */
export interface WiredStyleFrameTemplate {
    variant: string;
    width: number;
    /** The frame's `color`. */
    color: string;
    marginLeft: number;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    dropShadow: { distance: number; angle: number; alpha: number; blur: number };
}

/** `quick_menu` - the header's drop-down menu (`presets/menu/MenuPreset`). */
export interface WiredStyleQuickMenuTemplate {
    width: number;
    outerBorderVariant: string;
    outerBorderColor: string | null;
    innerBorderVariant: string;
    innerBorderColor: string | null;
    itemHeight: number;
    /** `menu_item_template`'s hover `color`. */
    itemHoverColor: string;
    checkbox: WiredStyleControlTemplate & { x: number; y: number };
    text: WiredStyleTextTemplate & { x: number; y: number };
    spacerHeight: number;
    spacerLineColor: string;
    spacerLineInset: number;
}

/** A plain `border` template: its Flash `style` id and `color`. */
export interface WiredStyleBorderTemplate {
    variant: string;
    color: string | null;
}

export interface WiredStyleTemplates {
    ruler: { height: number; lines: WiredStyleRulerLine[] };
    /** `ruler_view_vertical` (ubuntu only; the other styles have no such template and draw `verticalSplitterColor`). */
    rulerVertical: { color: string };
    text: WiredStyleTextTemplate;
    textBold: WiredStyleTextTemplate;
    html: WiredStyleTextTemplate;
    input: WiredStyleInputTemplate;
    dropdown: WiredStyleControlTemplate;
    checkbox: WiredStyleControlTemplate;
    radioButton: WiredStyleControlTemplate;
    expandCollapse: WiredStyleExpandCollapseTemplate;
    iconButton: WiredStyleIconButtonTemplate;
    button: WiredStyleButtonTemplate;
    assetButton: WiredStyleAssetButtonTemplate;
    miniButton: WiredStyleMiniButtonTemplate;
    sourceTypeSelector: WiredStyleSourceTypeSelectorTemplate;
    slider: WiredStyleSliderTemplate;
    frame: WiredStyleFrameTemplate;
    quickMenu: WiredStyleQuickMenuTemplate;
    /** `inner_border` - `InnerBorderFramePreset`'s panel (`useInnerBorder` styles only). */
    innerBorder: WiredStyleBorderTemplate | null;
    /** `border` - `createBorder` / `createSurroundingBorder`. Ubuntu's and (since the 2026 revision) illumina's templates have one; the volters get the nearest skin of their family. */
    border: WiredStyleBorderTemplate;
    /** `container_button` - `createContainerButton`. Only ubuntu's template has one. */
    containerButton: { variant: string };
}

export interface WiredStyle {
    /** `name`. */
    name: WiredStyleName;
    /** `isVolter`. */
    isVolter: boolean;
    /** `useInnerBorder`. */
    useInnerBorder: boolean;

    radioButtonSpacing: number;
    checkboxSpacing: number;
    checkboxYOffset: number;
    radioButtonYOffset: number;
    namedTextYOffset: number;
    namedInputOffset: number;
    namedDropdownOffset: number;
    genericHorizontalSpacing: number;
    genericVerticalSpacing: number;
    sectionSpacing: number;
    sectionLeftRightMargin: number;
    headerMargin: number;
    headerBottomMarginWithLink: number;
    headerNameFontSize: number;
    minimumOptionHeight: number;
    minimumOptionSpacing: number;
    optionExtraUnderSpacing: number;
    optionExtraUnderLeftMargin: number;
    LRContainerMargin: number;
    LRContainerSpacing: number;
    LRContainerTopBottomPadding: number;
    inputSourceListMinHeight: number;
    buttonRowSpacing: number;
    menuRightOffset: number;
    containerButtonPaddingTop: number;
    containerButtonPaddingLeft: number;
    paddedSectionTop: number;
    paddedSectionLeft: number;

    frameColor: string;
    backgroundColor: string;
    advancedBackgroundColor: string;
    invalidInputBackgroundColor: string;
    /** `verticalSplitterColor` (ubuntu leaves it at 0 and is given its ruler colour). */
    verticalSplitterColor: string;
    /** `surroundingBorderStyleId` - when above 0, the `Border` variant `createSurroundingBorder` switches to. */
    surroundingBorderStyleId: number;
    yellowTextColor: string | null;
    softTextColor: string | null;
    redTextColor: string | null;

    templates: WiredStyleTemplates;
}
