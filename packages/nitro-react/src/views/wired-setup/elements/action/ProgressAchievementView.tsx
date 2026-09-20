/**
 * `actiontypes/ProgressAchievement.buildInputs` - the achievement dropdown in the
 * `progress_achievement.name` section, the mode radio (`mode.1`, `mode.0`) in the
 * `progress_achievement.mode` section, and the score's value-or-variable section (0 to
 * 2147483647), whose source type selector is merged section 0.
 *
 * `initializeDropdownOptions`: the options are the room's achievements
 * (`roomEvents.achievementsInRoom`, from the `WiredEnvironment` packet - `ctx.achievementsInRoom`), id = index, captioned
 * with the name itself.
 */
import { setWiredMergedSourceType } from '#base/commands';
import { getWiredRoomVariables, PROGRESS_ACHIEVEMENT_SCORE_MAX, ProgressAchievementActionForm, variableReferenceSourceOptions, WiredElementView } from '#base/wired';

import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { WiredValueOrVariableSection } from '../../kit/WiredValueOrVariableSection';

const MODE_OPTIONS = [ { id: 1, label: '${wiredfurni.params.progress_achievement.mode.1}' }, { id: 0, label: '${wiredfurni.params.progress_achievement.mode.0}' } ];

/** `createValueOrVariableSection(0, ...)` - the merged section the score's selector switches. */
const SCORE_MERGED_ID = 0;

export const ProgressAchievementView: WiredElementView<ProgressAchievementActionForm> = ({ form, setForm, triggerable, ctx }) => {
    const achievements = ctx.achievementsInRoom;

    return (
        <>
            <WiredSection title="${wiredfurni.params.progress_achievement.name}">
                <WiredDropdown
                    options={achievements.map((name, id) => ({ id, label: name }))}
                    selected={achievements.indexOf(form.achievementName)}
                    onSelect={id => setForm({ achievementName: achievements[id] })}
                    caption="${wiredfurni.params.progress_achievement.name}"
                />
            </WiredSection>
            <WiredSection title="${wiredfurni.params.progress_achievement.mode}">
                <WiredRadioGroup
                    options={MODE_OPTIONS}
                    selected={form.mode}
                    onSelect={mode => setForm({ mode })}
                />
            </WiredSection>
            <WiredValueOrVariableSection
                title="${wiredfurni.params.progress_achievement.score}"
                sourceTypeOptions={variableReferenceSourceOptions(ctx, form.score.picker.target)}
                min={0}
                max={PROGRESS_ACHIEVEMENT_SCORE_MAX}
                state={form.score}
                onChange={score => setForm({ score })}
                onSourceTypeSelect={sourceType => setWiredMergedSourceType(SCORE_MERGED_ID, sourceType)}
                variables={getWiredRoomVariables(triggerable)}
                roomId={ctx.roomId}
            />
        </>
    );
};
