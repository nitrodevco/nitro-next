/**
 * `actiontypes/§_-H2N§.buildInputs` (GIVE_SCORE_TO_PREDEFINED_TEAM) - `GiveScore`'s inputs
 * (`super.buildInputs`), then the team section: a two-column radio of teams 1 to 4 (`TeamSection`).
 */
import { GiveScoreActionForm, GiveScoreToPredefinedTeamActionForm, WiredElementView } from '#base/wired';

import { TeamSection } from '../shared/TeamSection';
import { GiveScoreView } from './GiveScoreView';

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
            <TeamSection
                selected={form.team}
                onSelect={team => setForm({ team })}
            />
        </>
    );
};
