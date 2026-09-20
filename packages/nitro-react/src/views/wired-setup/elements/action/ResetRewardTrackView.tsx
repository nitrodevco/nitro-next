/**
 * `actiontypes/ResetRewardTrack.buildInputs` - the track id (named `reward_track.track_id`, 100
 * characters, no tab) in the `reward_track.reset.track` section.
 */
import { RESET_REWARD_TRACK_ID_MAX_LENGTH, RESET_REWARD_TRACK_ID_RESTRICT, ResetRewardTrackActionForm, WiredElementView } from '#base/wired';

import { WiredNamedTextInput } from '../../kit/WiredNamedTextInput';
import { WiredSection } from '../../kit/WiredSection';

export const ResetRewardTrackView: WiredElementView<ResetRewardTrackActionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.reward_track.reset.track}">
        <WiredNamedTextInput
            name="${wiredfurni.params.reward_track.track_id}"
            value={form.trackId}
            onChange={trackId => setForm({ trackId })}
            maxCharacters={RESET_REWARD_TRACK_ID_MAX_LENGTH}
            restrict={RESET_REWARD_TRACK_ID_RESTRICT}
        />
    </WiredSection>
);
