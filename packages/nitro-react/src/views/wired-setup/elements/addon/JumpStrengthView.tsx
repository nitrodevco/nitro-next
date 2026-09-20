/**
 * `addons/§_-8M§.buildInputs` - one value-or-variable section (`jump_strength`, -1000 to 1000) on
 * merged input source 0.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { getWiredInt, getWiredRoomVariables, JUMP_STRENGTH_MAX, JUMP_STRENGTH_MIN, JumpStrengthAddonForm, variableReferenceSourceOptions, WiredElementView } from '#base/wired';

import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';

export const JumpStrengthView: WiredElementView<JumpStrengthAddonForm> = ({ form, setForm, triggerable, ctx }) => (
    <WiredValueOrVariableSection
        title="${wiredfurni.params.jump_strength}"
        sourceTypeOptions={variableReferenceSourceOptions(ctx, getWiredInt(triggerable, 2))}
        min={JUMP_STRENGTH_MIN}
        max={JUMP_STRENGTH_MAX}
        state={form.strength}
        onChange={strength => setForm({ strength })}
        onSourceTypeSelect={sourceType => setWiredMergedSourceType(0, sourceType)}
        variables={getWiredRoomVariables(triggerable)}
        roomId={ctx.roomId}
    />
);
