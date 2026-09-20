/**
 * `addons/variablefx/presets/VariableFxVisualizationSettingsPreset` - the "style" section of a
 * Variable FX addon: the style dropdown beside the title (`SectionParam.headerOptionLeft`, title
 * lowered by `namedDropdownOffset`), then in a surrounding border (5px) the preview block and, in a
 * plain bordered box (6/5/6/5), the soft bold "visualization" caption over seven named dropdowns:
 * colour, width, renderer, sub renderer, segments, icon and icon alignment.
 *
 * `refreshForStyle` is derived here from the state on every render: which dropdowns the category
 * shows at all (`categoryUses*Selector`), what each offers for the current style (or a single
 * "not applicable" entry), which are disabled (a list of one, or width while segments are set),
 * and the shown names all as wide as the widest (`alignSelectorNames`). A change goes through
 * `changeVariableFxVisualization` (`stateChanged`: apply, sanitise, refresh, redraw the preview).
 *
 * The kit's dropdown reads id -1 as "nothing selected", so the "not applicable" entry Flash selects
 * by that id shows as the dropdown's caption instead - the same text in the same place.
 *
 * Colour captions get the dynamic or (outside the number display) metallic prefix; the icon list
 * is `STANDARD_ICON_IDS`, plus the ranch campaign icons when `wired.variablefx.campaign.icons.enabled`
 * is set or the user has security level 4.
 */
import { VariableFxPaintColors } from '@nitrodevco/nitro-renderer';

import { useOwnSecurityLevel } from '#base/context/user';
import { getVariableFxCategory, getVariableFxSubRendererOptions, VARIABLE_FX_CATEGORY_NUMBER_DISPLAY, variableFxCategoryUsesColorSelector, variableFxCategoryUsesIconSelector, variableFxCategoryUsesRendererSelector, variableFxCategoryUsesSegmentsSelector, variableFxCategoryUsesSubRendererSelector, variableFxCategoryUsesWidthSelector, variableFxCurrentStyle, VariableFxOption, variableFxRendererSupportsSegments, variableFxSegmentRendererId, VariableFxState, WiredDropdownOption, WiredElementContext } from '#base/wired';

import { useWiredCaption } from '../../../../kit/useWiredCaption';
import { WiredDropdown } from '../../../../kit/WiredDropdown';
import { WiredNamedDropdown } from '../../../../kit/WiredNamedDropdown';
import { WiredPaddedContainer } from '../../../../kit/WiredPaddedContainer';
import { WiredSection } from '../../../../kit/WiredSection';
import { WiredSimpleList } from '../../../../kit/WiredSimpleList';
import { useWiredStyle } from '../../../../kit/WiredStyleContext';
import { WiredText } from '../../../../kit/WiredText';
import { measureWiredText, wiredTextFormat } from '../../../../kit/wiredTextFormat';
import { VariableFxPreviewBlock } from './VariableFxPreviewBlock';

const NOT_APPLICABLE_OPTION_ID = -1;
const METALLIC_COLOR_PREFIX_KEY = 'wiredfurni.params.variablefx.color.prefix.metallic';
const DYNAMIC_COLOR_PREFIX_KEY = 'wiredfurni.params.variablefx.color.prefix.dynamic';
const ICON_LOCALIZATION_PREFIX = 'wiredfurni.params.variablefx.icon.';
const CAMPAIGN_ICONS_ENABLED_KEY = 'wired.variablefx.campaign.icons.enabled';
/** `hasSecurity(4)`. */
const CAMPAIGN_ICONS_SECURITY_LEVEL = 4;

const STANDARD_ICON_IDS = [ '', 'battery', 'burning', 'cash', 'cooldown', 'droplet', 'energy', 'eye', 'fish', 'food', 'freezing', 'gems', 'gold', 'health', 'honor', 'magic', 'mana', 'poison', 'repairing', 'reputation', 'shield', 'stamina', 'star_power', 'stealth', 'timeleft', 'upgrading', 'wooden_logs' ];
/** `§_-N26§`. */
const CAMPAIGN_ICON_IDS = [ 'ranch.aubergine', 'ranch.carrot', 'ranch.corn', 'ranch.egg', 'ranch.grape', 'ranch.potato', 'ranch.pumpkin', 'ranch.sapling', 'ranch.tomato', 'ranch.wheat' ];

const SEGMENTS_OPTIONS: WiredDropdownOption[] = [
    { id: 0, label: '${wiredfurni.params.variablefx.visualization.segments.not_specified}' },
    ...Array.from({ length: 100 }, (_, index) => ({ id: index + 1, label: String(index + 1) })),
];

const ICON_ALIGNMENT_OPTIONS: WiredDropdownOption[] = [
    { id: 0, label: '${wiredfurni.params.variablefx.icon_alignment.left}' },
    { id: 1, label: '${wiredfurni.params.variablefx.icon_alignment.right}' },
    { id: 2, label: '${wiredfurni.params.variablefx.icon_alignment.double}' },
];

const NOT_APPLICABLE_CAPTION = '${wiredfurni.params.variablefx.not_applicable}';
const NOT_APPLICABLE_OPTIONS: WiredDropdownOption[] = [ { id: NOT_APPLICABLE_OPTION_ID, label: NOT_APPLICABLE_CAPTION } ];

const optionVector = (options: readonly VariableFxOption[]): WiredDropdownOption[] => options.map(option => ({ id: option.id, label: '${' + option.key + '}' }));

const optionVectorWithDefault = (options: readonly VariableFxOption[], fallback: VariableFxOption): WiredDropdownOption[] => optionVector((options.length > 0) ? options : [ fallback ]);

const selectorHasEditableOptions = (options: readonly unknown[], id: number): boolean => (options.length > 1) && (id !== NOT_APPLICABLE_OPTION_ID);

const isDynamicColor = (option: VariableFxOption): boolean =>
    (option.runtimeValue === 'DYNAMIC_RED_TO_GREEN') || (option.runtimeValue === 'DYNAMIC_LEVELLING') || (option.runtimeValue === 'DYNAMIC_TEAM_COLOR');

/** `colorDisplayString`. */
const colorDisplayString = (option: VariableFxOption, categoryId: number): string => {
    let prefix: string | null = null;

    if (isDynamicColor(option)) prefix = DYNAMIC_COLOR_PREFIX_KEY;
    else if (VariableFxPaintColors.resolve(option.runtimeValue).isMetallic && (categoryId !== VARIABLE_FX_CATEGORY_NUMBER_DISPLAY)) prefix = METALLIC_COLOR_PREFIX_KEY;

    return (prefix === null) ? '${' + option.key + '}' : '${' + prefix + '} ${' + option.key + '}';
};

/** `iconDisplayString` - a campaign icon is prefixed with its campaign's name. */
const iconDisplayString = (icon: string): string => {
    const dot = icon.indexOf('.');

    if (dot === -1) return '${' + ICON_LOCALIZATION_PREFIX + icon + '}';

    return '${' + ICON_LOCALIZATION_PREFIX + icon.substring(0, dot) + '} ${' + ICON_LOCALIZATION_PREFIX + icon + '}';
};

/** One named dropdown as `refreshForStyle` leaves it. */
interface VisualizationSelector {
    key: 'colorId' | 'widthId' | 'rendererId' | 'subRendererId' | 'segments' | 'icon' | 'iconAlignment';
    name: string;
    options: WiredDropdownOption[];
    selected: number;
    visible: boolean;
    disabled: boolean;
}

export interface VariableFxVisualizationSettingsProps {
    state: VariableFxState;
    /** The preview's rebuild key - see `VariableFxPreview`. */
    previewKey: string;
    ctx: WiredElementContext;
    onChange: (patch: Partial<VariableFxState>) => void;
}

export const VariableFxVisualizationSettings = ({ state, previewKey, ctx, onChange }: VariableFxVisualizationSettingsProps) => {
    const style = useWiredStyle();
    const caption = useWiredCaption();
    const securityLevel = useOwnSecurityLevel();
    const icons = (ctx.configBoolean(CAMPAIGN_ICONS_ENABLED_KEY) || (Number(securityLevel) >= CAMPAIGN_ICONS_SECURITY_LEVEL)) ? [ ...STANDARD_ICON_IDS, ...CAMPAIGN_ICON_IDS ] : STANDARD_ICON_IDS;
    const iconOptions = icons.map((icon, index) => ({ id: index, label: (icon === '') ? '${wiredfurni.params.variablefx.icon.none}' : iconDisplayString(icon) }));
    const iconOptionId = Math.max(0, icons.indexOf(state.icon));

    const category = getVariableFxCategory(state.categoryId);
    const current = variableFxCurrentStyle(state);
    const subRenderers = getVariableFxSubRendererOptions(current);
    const segmentsSupported = variableFxRendererSupportsSegments(variableFxSegmentRendererId(state));
    const segmentsSet = segmentsSupported && (state.segments > 0);

    const selectors: VisualizationSelector[] = [
        {
            key: 'colorId',
            name: '${wiredfurni.params.variablefx.visualization.color}',
            options: ((current.colorOptions.length > 0) ? current.colorOptions : [ current.defaultColor ]).map(option => ({ id: option.id, label: colorDisplayString(option, state.categoryId) })),
            selected: state.colorId,
            visible: variableFxCategoryUsesColorSelector(state.categoryId),
            disabled: !selectorHasEditableOptions(current.colorOptions, current.defaultColor.id),
        },
        {
            key: 'widthId',
            name: '${wiredfurni.params.variablefx.visualization.width}',
            options: optionVectorWithDefault(current.widthOptions, current.defaultWidth),
            selected: state.widthId,
            visible: variableFxCategoryUsesWidthSelector(state.categoryId),
            disabled: !selectorHasEditableOptions(current.widthOptions, current.defaultWidth.id) || segmentsSet,
        },
        {
            key: 'rendererId',
            name: '${wiredfurni.params.variablefx.visualization.renderer}',
            options: optionVectorWithDefault(current.rendererOptions, current.defaultRenderer),
            selected: state.rendererId,
            visible: variableFxCategoryUsesRendererSelector(state.categoryId),
            disabled: !selectorHasEditableOptions(current.rendererOptions, current.defaultRenderer.id),
        },
        {
            key: 'subRendererId',
            name: '${wiredfurni.params.variablefx.visualization.sub_renderer}',
            options: (subRenderers.length > 0) ? optionVector(subRenderers) : NOT_APPLICABLE_OPTIONS,
            selected: (subRenderers.length > 0) ? state.subRendererId : NOT_APPLICABLE_OPTION_ID,
            visible: variableFxCategoryUsesSubRendererSelector(state.categoryId),
            disabled: !selectorHasEditableOptions(subRenderers, state.subRendererId),
        },
        {
            key: 'segments',
            name: '${wiredfurni.params.variablefx.visualization.segments}',
            options: segmentsSupported ? SEGMENTS_OPTIONS : NOT_APPLICABLE_OPTIONS,
            selected: segmentsSupported ? state.segments : NOT_APPLICABLE_OPTION_ID,
            visible: variableFxCategoryUsesSegmentsSelector(state.categoryId),
            disabled: !segmentsSupported,
        },
        {
            key: 'icon',
            name: '${wiredfurni.params.variablefx.visualization.icon}',
            options: current.supportsIcon ? iconOptions : NOT_APPLICABLE_OPTIONS,
            selected: current.supportsIcon ? iconOptionId : NOT_APPLICABLE_OPTION_ID,
            visible: variableFxCategoryUsesIconSelector(state.categoryId),
            disabled: !current.supportsIcon,
        },
        {
            key: 'iconAlignment',
            name: '${wiredfurni.params.variablefx.visualization.icon_alignment}',
            options: current.supportsIcon ? ICON_ALIGNMENT_OPTIONS : NOT_APPLICABLE_OPTIONS,
            selected: current.supportsIcon ? state.iconAlignment : NOT_APPLICABLE_OPTION_ID,
            visible: variableFxCategoryUsesIconSelector(state.categoryId),
            disabled: !current.supportsIcon,
        },
    ];

    // `alignSelectorNames` - every shown name as wide as the widest.
    const nameFormat = wiredTextFormat(style.templates.text);
    const nameWidth = selectors.filter(selector => selector.visible).reduce((width, selector) => Math.max(width, measureWiredText(caption(selector.name), nameFormat) ?? 0), 0);

    const select = (selector: VisualizationSelector, id: number) => {
        if (selector.key === 'icon') onChange({ icon: ((id >= 0) && (id < icons.length)) ? icons[id] : '' });
        else onChange({ [selector.key]: id });
    };

    return (
        <WiredSection
            title="${wiredfurni.params.variablefx.visualization.style}"
            titleYOffset={style.namedDropdownOffset}
            headerOptionLeft={(
                <WiredDropdown
                    options={category.styles.map(entry => ({ id: entry.id, label: '${' + entry.localizationKey + '}' }))}
                    selected={state.styleId}
                    onSelect={styleId => onChange({ styleId })}
                    caption=""
                />
            )}
        >
            <WiredPaddedContainer
                left={5}
                top={5}
                right={5}
                bottom={5}
                bordered
            >
                <WiredSimpleList spacing={style.genericVerticalSpacing}>
                    <VariableFxPreviewBlock
                        state={state}
                        refreshKey={previewKey}
                        ctx={ctx}
                    />
                    <WiredPaddedContainer
                        left={6}
                        top={5}
                        right={6}
                        bottom={5}
                        bordered
                        plainBorder
                    >
                        <WiredSimpleList spacing={style.genericVerticalSpacing}>
                            <WiredText
                                text="${wiredfurni.params.variablefx.visualization}"
                                bold
                                color={style.softTextColor}
                            />
                            <WiredSimpleList spacing={style.genericVerticalSpacing}>
                                {selectors.filter(selector => selector.visible).map(selector => (
                                    <WiredNamedDropdown
                                        key={selector.key}
                                        name={selector.name}
                                        nameWidth={nameWidth}
                                        options={selector.options}
                                        selected={selector.selected}
                                        onSelect={id => select(selector, id)}
                                        caption={(selector.options === NOT_APPLICABLE_OPTIONS) ? NOT_APPLICABLE_CAPTION : undefined}
                                        disabled={selector.disabled}
                                    />
                                ))}
                            </WiredSimpleList>
                        </WiredSimpleList>
                    </WiredPaddedContainer>
                </WiredSimpleList>
            </WiredPaddedContainer>
        </WiredSection>
    );
};
