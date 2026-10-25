/**
 * `addons/variablefx/model/VariableFxCategoryDefinition` - one Variable FX category (health
 * points, progress bar, levelling progress, status bar, boss bar, number display): its id, the
 * category name the runtime config carries, and its styles.
 */
import type { VariableFxStyleDefinition } from './VariableFxStyleDefinition';

export interface VariableFxCategoryDefinition {
    id: number;
    runtimeCategory: string;
    styles: VariableFxStyleDefinition[];
}

/** `getStyle(id)` - the style with that id, or the category's first. */
export const getVariableFxCategoryStyle = (category: VariableFxCategoryDefinition, styleId: number): VariableFxStyleDefinition =>
    category.styles.find(style => style.id === styleId) ?? category.styles[0];
