/**
 * `addons/variablefx/model/VariableFxEditorMetadata` - what the Variable FX editor offers per
 * category and style, built once from the renderer's own tables: the server id <-> name tables
 * (`VariableFxServerTables`, Flash `§_-s1§`) give every colour, width and renderer an option with
 * the key `wiredfurni.params.variablefx.<color|width|renderer>.<id>`, and the preview style table
 * (`VariableFxPreviewStyles`, Flash `§_-M9§`) gives each category its styles, keyed
 * `wiredfurni.params.variablefx.style.<category>.<style id>`.
 *
 * Unknown ids fall back the way Flash's lookups do: a category to category 1, a colour to
 * `NOT_APPLICABLE`, a width to `not_applicable`, a renderer to renderer 0.
 */
import { VariableFxPreviewStyleDefinition, VariableFxPreviewStyles, VariableFxServerTables } from '@nitrodevco/nitro-renderer';

import type { VariableFxCategoryDefinition } from './VariableFxCategoryDefinition';
import { getVariableFxCategoryStyle } from './VariableFxCategoryDefinition';
import { createVariableFxOption, VariableFxOption } from './VariableFxOption';
import { styleHasColorOptions, styleHasRendererOptions, styleHasWidthOptions, VariableFxStyleDefinition } from './VariableFxStyleDefinition';

/** `VariableFxEditorMetadata.categoryUsesValueRange` - the categories without one (levelling progress 2, number display 5). */
const CATEGORY_LEVELLING_PROGRESS = 2;
const CATEGORY_NUMBER_DISPLAY = 5;

/** `rendererSupportsSegments` - block (2), arrow (4) and thermometer (13) bars. */
const SEGMENT_RENDERERS = [ 2, 4, 13 ];

/** `getSubRendererOptions`: a style whose default renderer is 20 (`level_with_progress`) draws its bar with renderer 2, 3 or 4. */
const LEVEL_WITH_PROGRESS_RENDERER = 20;
const LEVEL_WITH_PROGRESS_SUB_RENDERERS = [ 2, 3, 4 ];

const SUB_RENDERER_EXTRA = 'sub_renderer';

interface VariableFxEditorTables {
    categories: Map<number, VariableFxCategoryDefinition>;
    colors: Map<number, VariableFxOption>;
    widths: Map<number, VariableFxOption>;
    renderers: Map<number, VariableFxOption>;
}

let tables: VariableFxEditorTables | null = null;

const colorOptionById = (data: VariableFxEditorTables, id: number): VariableFxOption =>
    data.colors.get(id) ?? data.colors.get(VariableFxServerTables.resolveColorId('NOT_APPLICABLE'))!;

const widthOptionById = (data: VariableFxEditorTables, id: number): VariableFxOption =>
    data.widths.get(id) ?? data.widths.get(VariableFxServerTables.resolveWidthId('not_applicable'))!;

const rendererOptionById = (data: VariableFxEditorTables, id: number): VariableFxOption =>
    data.renderers.get(id) ?? data.renderers.get(0)!;

const colorByRuntimeValue = (data: VariableFxEditorTables, value: string): VariableFxOption | null => {
    const option = colorOptionById(data, VariableFxServerTables.resolveColorId(value));

    return (option.runtimeValue === value) ? option : null;
};

const widthByRuntimeValue = (data: VariableFxEditorTables, value: string): VariableFxOption | null => {
    const option = widthOptionById(data, VariableFxServerTables.resolveWidthId(value));

    return (option.runtimeValue === value) ? option : null;
};

const rendererByRuntimeValue = (data: VariableFxEditorTables, value: string): VariableFxOption | null => {
    const option = rendererOptionById(data, VariableFxServerTables.resolveRendererId(value));

    return (option.runtimeValue === value) ? option : null;
};

const optionsByRuntimeValue = (values: string[], resolve: (value: string) => VariableFxOption | null): VariableFxOption[] =>
    values.map(resolve).filter((option): option is VariableFxOption => option !== null);

/** `styleFromPreviewDefinition`. */
const styleFromPreviewDefinition = (data: VariableFxEditorTables, definition: VariableFxPreviewStyleDefinition): VariableFxStyleDefinition => ({
    id: definition.styleId,
    localizationKey: 'wiredfurni.params.variablefx.style.' + definition.category + '.' + definition.styleId,
    runtimeStyle: definition.defaultRenderer,
    colorOptions: optionsByRuntimeValue(definition.allowedColors, value => colorByRuntimeValue(data, value)),
    widthOptions: optionsByRuntimeValue(definition.allowedWidths, value => widthByRuntimeValue(data, value)),
    rendererOptions: optionsByRuntimeValue(definition.allowedRenderers, value => rendererByRuntimeValue(data, value)),
    defaultColor: colorByRuntimeValue(data, definition.defaultColor) ?? colorOptionById(data, VariableFxServerTables.resolveColorId('NOT_APPLICABLE')),
    defaultWidth: widthByRuntimeValue(data, definition.defaultWidth) ?? widthOptionById(data, VariableFxServerTables.resolveWidthId('not_applicable')),
    defaultRenderer: rendererByRuntimeValue(data, definition.defaultRenderer) ?? rendererOptionById(data, 0),
    extra: new Map(definition.defaultConfigExtra),
    defaultStatusExtra: new Map(definition.defaultStatusExtra),
    supportsIcon: definition.categoryId === CATEGORY_NUMBER_DISPLAY,
});

/** `initialize` - colours, widths and renderers first, the categories (which refer to them) last. */
const getTables = (): VariableFxEditorTables => {
    if (tables) return tables;

    const data: VariableFxEditorTables = { categories: new Map(), colors: new Map(), widths: new Map(), renderers: new Map() };

    for (const id of VariableFxServerTables.getColorIds()) data.colors.set(id, createVariableFxOption(id, 'wiredfurni.params.variablefx.color.' + id, VariableFxServerTables.resolveColorById(id)));
    for (const id of VariableFxServerTables.getWidthIds()) data.widths.set(id, createVariableFxOption(id, 'wiredfurni.params.variablefx.width.' + id, VariableFxServerTables.resolveWidthById(id)));
    for (const id of VariableFxServerTables.getRendererIds()) data.renderers.set(id, createVariableFxOption(id, 'wiredfurni.params.variablefx.renderer.' + id, VariableFxServerTables.resolveRendererById(id)));

    for (const id of VariableFxServerTables.getCategoryIds()) {
        const definitions = VariableFxPreviewStyles.getByCategoryId(id);

        data.categories.set(id, {
            id,
            runtimeCategory: (definitions.length === 0) ? '' : definitions[0].category,
            styles: definitions.map(definition => styleFromPreviewDefinition(data, definition)),
        });
    }

    tables = data;

    return data;
};

/** `getCategory(id)` - category 1 for an unknown id. */
export const getVariableFxCategory = (categoryId: number): VariableFxCategoryDefinition => {
    const data = getTables();

    return data.categories.get(categoryId) ?? data.categories.get(1)!;
};

const categoryHasStyleMatching = (categoryId: number, matches: (style: VariableFxStyleDefinition) => boolean): boolean =>
    getVariableFxCategory(categoryId).styles.some(matches);

/** `categoryUsesValueRange`. */
export const variableFxCategoryUsesValueRange = (categoryId: number): boolean =>
    (categoryId !== CATEGORY_LEVELLING_PROGRESS) && (categoryId !== CATEGORY_NUMBER_DISPLAY);

/** `rendererSupportsSegments`. */
export const variableFxRendererSupportsSegments = (rendererId: number): boolean => SEGMENT_RENDERERS.includes(rendererId);

/** `categoryUsesColorSelector`. */
export const variableFxCategoryUsesColorSelector = (categoryId: number): boolean => categoryHasStyleMatching(categoryId, styleHasColorOptions);

/** `categoryUsesWidthSelector`. */
export const variableFxCategoryUsesWidthSelector = (categoryId: number): boolean => categoryHasStyleMatching(categoryId, styleHasWidthOptions);

/** `categoryUsesRendererSelector`. */
export const variableFxCategoryUsesRendererSelector = (categoryId: number): boolean => categoryHasStyleMatching(categoryId, styleHasRendererOptions);

/** `categoryUsesSubRendererSelector`. */
export const variableFxCategoryUsesSubRendererSelector = (categoryId: number): boolean =>
    categoryHasStyleMatching(categoryId, style => style.extra.has(SUB_RENDERER_EXTRA));

/** `categoryUsesIconSelector`. */
export const variableFxCategoryUsesIconSelector = (categoryId: number): boolean => categoryHasStyleMatching(categoryId, style => style.supportsIcon);

/** `categoryUsesSegmentsSelector`. */
export const variableFxCategoryUsesSegmentsSelector = (categoryId: number): boolean => categoryHasStyleMatching(categoryId, (style) => {
    if (style.extra.has(SUB_RENDERER_EXTRA)) return true;

    if (style.rendererOptions.some(option => variableFxRendererSupportsSegments(option.id))) return true;

    return variableFxRendererSupportsSegments(style.defaultRenderer.id);
});

/** `getColor(id)`. */
export const getVariableFxColor = (id: number): VariableFxOption => colorOptionById(getTables(), id);

/** `getWidth(id)`. */
export const getVariableFxWidth = (id: number): VariableFxOption => widthOptionById(getTables(), id);

/** `getRenderer(id)`. */
export const getVariableFxRenderer = (id: number): VariableFxOption => rendererOptionById(getTables(), id);

/** `getSubRendererOptions(style)` - the renderers a levelling style can draw its bar with. */
export const getVariableFxSubRendererOptions = (style: VariableFxStyleDefinition): VariableFxOption[] => {
    const subRenderer = style.extra.get(SUB_RENDERER_EXTRA);

    if (subRenderer === undefined) return [];

    if (style.defaultRenderer.id === LEVEL_WITH_PROGRESS_RENDERER) return LEVEL_WITH_PROGRESS_SUB_RENDERERS.map(getVariableFxRenderer);

    return [ getVariableFxRenderer(Math.trunc(Number(subRenderer)) || 0) ];
};

/** `optionIn(options, id, fallback)`. */
export const variableFxOptionIn = (options: readonly VariableFxOption[], id: number, fallback: VariableFxOption): VariableFxOption =>
    options.find(option => option.id === id) ?? fallback;

/** `VariableFxCategoryDefinition.getStyle` on `getCategory(categoryId)`. */
export const getVariableFxStyle = (categoryId: number, styleId: number): VariableFxStyleDefinition =>
    getVariableFxCategoryStyle(getVariableFxCategory(categoryId), styleId);
