/**
 * `actiontypes/ProgressRewardTrack.buildInputs` - the track and task ids (named text inputs, 100
 * of `a-zA-Z0-9_` each) in the `reward_track.progress.ids` section, the "add to existing score"
 * checkbox in the `reward_track.progress.mode` section, and the score's value-or-variable section
 * (1 to 2147483647), whose source type selector is merged section 0.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { getWiredRoomVariables, PROGRESS_REWARD_TRACK_SCORE_MAX, PROGRESS_REWARD_TRACK_SCORE_MIN, ProgressRewardTrackActionForm, REWARD_TRACK_ID_MAX_LENGTH, REWARD_TRACK_ID_RESTRICT, variableReferenceSourceOptions, WiredElementView } from '#base/wired';

import { WiredCheckboxOption } from '../../kit/WiredCheckboxOption';
import { WiredNamedTextInput } from '../../kit/WiredNamedTextInput';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';

/** `createValueOrVariableSection(0, ...)` - the merged section the score's selector switches. */
const SCORE_MERGED_ID = 0;

export const ProgressRewardTrackView: WiredElementView<ProgressRewardTrackActionForm> = ({ form, setForm, triggerable, ctx }) => (
    <>
        <WiredSection title="${wiredfurni.params.reward_track.progress.ids}">
            <WiredSimpleList>
                <WiredNamedTextInput
                    name="${wiredfurni.params.reward_track.track_id}"
                    value={form.trackId}
                    onChange={trackId => setForm({ trackId })}
                    maxCharacters={REWARD_TRACK_ID_MAX_LENGTH}
                    restrict={REWARD_TRACK_ID_RESTRICT}
                />
                <WiredNamedTextInput
                    name="${wiredfurni.params.reward_track.task_id}"
                    value={form.taskId}
                    onChange={taskId => setForm({ taskId })}
                    maxCharacters={REWARD_TRACK_ID_MAX_LENGTH}
                    restrict={REWARD_TRACK_ID_RESTRICT}
                />
            </WiredSimpleList>
        </WiredSection>
        <WiredSection title="${wiredfurni.params.reward_track.progress.mode}">
            <WiredCheckboxOption
                label="${wiredfurni.params.reward_track.add_to_existing_score}"
                selected={form.addToExistingScore}
                onToggle={addToExistingScore => setForm({ addToExistingScore })}
                last={false}
            />
        </WiredSection>
        <WiredValueOrVariableSection
            title="${wiredfurni.params.reward_track.score}"
            sourceTypeOptions={variableReferenceSourceOptions(ctx, form.score.picker.target)}
            min={PROGRESS_REWARD_TRACK_SCORE_MIN}
            max={PROGRESS_REWARD_TRACK_SCORE_MAX}
            state={form.score}
            onChange={score => setForm({ score })}
            onSourceTypeSelect={sourceType => setWiredMergedSourceType(SCORE_MERGED_ID, sourceType)}
            variables={getWiredRoomVariables(triggerable)}
            roomId={ctx.roomId}
        />
    </>
);
