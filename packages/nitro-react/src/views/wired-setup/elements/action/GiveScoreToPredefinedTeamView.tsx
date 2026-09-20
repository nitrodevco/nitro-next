/**
 * `actiontypes/§_-H2N§.buildInputs` (GIVE_SCORE_TO_PREDEFINED_TEAM) - `GiveScore`'s inputs
 * (`super.buildInputs`), then the team section: a two-column radio of teams 1 to 4.
 */
import { GiveScoreActionForm, GiveScoreToPredefinedTeamActionForm, PREDEFINED_TEAMS, WiredElementView } from '#base/wired';

import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';
import { GiveScoreView } from './GiveScoreView';

const TEAM_OPTIONS = PREDEFINED_TEAMS.map(id => ({ id, label: `\${wiredfurni.params.team.${id}}` }));

export const GiveScoreToPredefinedTeamView: WiredElementView<GiveScoreToPredefinedTeamActionForm> = ({ form, setForm, triggerable, ctx }) => {
    // The inherited inputs edit the `GiveScore` part of the form and leave the team as it is.
    const setScoreForm = (update: Partial<GiveScoreActionForm> | ((score: GiveScoreActionForm) => GiveScoreActionForm)) =>
        setForm(current => ({ ...current, ...((typeof update === 'function') ? update(current) : update) }));

    return (
        <>
            <GiveScoreView
                form={form}
                setForm={setScoreForm}
                triggerable={triggerable}
                ctx={ctx}
            />
            <WiredSection title="${wiredfurni.params.team}">
                <WiredRadioGroup
                    options={TEAM_OPTIONS}
                    selected={form.team}
                    onSelect={team => setForm({ team })}
                    columns={2}
                />
            </WiredSection>
        </>
    );
};
