/**
 * `addons/variablefx/§_-416§.buildInputs` - the view of every Variable FX addon: an optional top
 * info section (`createTopInfoPreset`, only the levelling progress has one - see
 * `VariableFxLevellingProgressView`), then the visualization (style + live preview), value range,
 * visibility and advanced range presets, and since WIN63-202610121624 the folded "Order in FX
 * stack" section (its info text over a number input of any int). Each preset reports its change through the matching
 * `VariableFxAddon` function, which is what `§_-lc§.variableFxStateChanged` and the presets'
 * `applyToState` + `sanitize` come to; the preview is rebuilt when the runtime config changes.
 */
import { ReactNode } from 'react';

import { changeVariableFxOverrideRow, changeVariableFxValueRange, changeVariableFxVisibility, changeVariableFxVisualization, saveVariableFxAudienceVariable, variableFxCategoryUsesValueRange, VariableFxForm, variableFxRuntimeConfig, WIRED_INT_MAX, WIRED_INT_MIN, WiredElementViewProps } from '#base/wired';

import { WiredNumberInput } from '../../../kit/WiredNumberInput';
import { WiredSection } from '../../../kit/WiredSection';
import { WiredSimpleList } from '../../../kit/WiredSimpleList';
import { useWiredStyle } from '../../../kit/WiredStyleContext';
import { WiredText } from '../../../kit/WiredText';
import { VariableFxAdvancedRange } from './presets/VariableFxAdvancedRange';
import { VariableFxValueRange } from './presets/VariableFxValueRange';
import { VariableFxVisibilitySettings } from './presets/VariableFxVisibilitySettings';
import { VariableFxVisualizationSettings } from './presets/VariableFxVisualizationSettings';

export interface VariableFxViewProps extends WiredElementViewProps<VariableFxForm> {
    /** `createTopInfoPreset` - `null` for the base class. */
    topInfo?: ReactNode;
}

export const VariableFxView = ({ form, setForm, ctx, topInfo }: VariableFxViewProps) => {
    const style = useWiredStyle();
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
            <WiredSection
                title="${wiredfurni.params.variablefx.stack_order}"
                collapsible
                defaultCollapsed
            >
                <WiredSimpleList>
                    <WiredText
                        text="${wiredfurni.params.variablefx.stack_order.info}"
                        color={style.softTextColor}
                    />
                    <WiredNumberInput
                        value={state.stackOrder}
                        onChange={stackOrder => setForm(current => ({ ...current, state: { ...current.state, stackOrder } }))}
                        min={WIRED_INT_MIN}
                        max={WIRED_INT_MAX}
                        width={-1}
                    />
                </WiredSimpleList>
            </WiredSection>
        </>
    );
};
