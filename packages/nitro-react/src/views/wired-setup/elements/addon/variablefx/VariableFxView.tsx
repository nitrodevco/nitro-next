/**
 * `addons/variablefx/§_-416§.buildInputs` - the view of every Variable FX addon: an optional top
 * info section (`createTopInfoPreset`, only the levelling progress has one - see
 * `VariableFxLevellingProgressView`), then the visualization (style + live preview), value range,
 * visibility and advanced range presets. Each preset reports its change through the matching
 * `VariableFxAddon` function, which is what `§_-lc§.variableFxStateChanged` and the presets'
 * `applyToState` + `sanitize` come to; the preview is rebuilt when the runtime config changes.
 */
import { ReactNode } from 'react';

import { changeVariableFxOverrideRow, changeVariableFxValueRange, changeVariableFxVisibility, changeVariableFxVisualization, saveVariableFxAudienceVariable, variableFxCategoryUsesValueRange, VariableFxForm, variableFxRuntimeConfig, WiredElementViewProps } from '#base/wired';

import { VariableFxAdvancedRange } from './presets/VariableFxAdvancedRange';
import { VariableFxValueRange } from './presets/VariableFxValueRange';
import { VariableFxVisibilitySettings } from './presets/VariableFxVisibilitySettings';
import { VariableFxVisualizationSettings } from './presets/VariableFxVisualizationSettings';

export interface VariableFxViewProps extends WiredElementViewProps<VariableFxForm> {
    /** `createTopInfoPreset` - `null` for the base class. */
    topInfo?: ReactNode;
}

export const VariableFxView = ({ form, setForm, ctx, topInfo }: VariableFxViewProps) => {
    const { state } = form;
    const config = variableFxRuntimeConfig(state);
    const previewKey = JSON.stringify([ config.category, config.style, config.renderer, config.width, config.color, config.defaultMinValue, config.defaultMaxValue, [ ...config.extra ], config.rendererId, state.widthId ]);
    const usesValueRange = variableFxCategoryUsesValueRange(state.categoryId);

    return (
        <>
            {topInfo}
            <VariableFxVisualizationSettings
                state={state}
                previewKey={previewKey}
                ctx={ctx}
                onChange={patch => setForm(current => changeVariableFxVisualization(current, patch))}
            />
            <VariableFxValueRange
                visible={usesValueRange}
                min={form.rangeMin}
                max={form.rangeMax}
                onChange={(min, max) => setForm(current => changeVariableFxValueRange(current, min, max))}
            />
            <VariableFxVisibilitySettings
                state={state}
                variables={form.roomVariables}
                ctx={ctx}
                onChange={patch => setForm(current => changeVariableFxVisibility(current, patch))}
                onAudienceVariableSaved={(variableId, withValue, value) => setForm(current => saveVariableFxAudienceVariable(current, variableId, withValue, value))}
            />
            <VariableFxAdvancedRange
                visible={usesValueRange}
                overrideMin={form.overrideMin}
                overrideMax={form.overrideMax}
                sourceType={state.sourceType}
                variables={form.roomVariables}
                roomId={ctx.roomId}
                onRowChange={(kind, row) => setForm(current => changeVariableFxOverrideRow(current, kind, row))}
            />
        </>
    );
};
