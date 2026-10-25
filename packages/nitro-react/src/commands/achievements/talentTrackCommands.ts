/**
 * Asking for a talent track - what Flash's buttons that open the talent track send
 * (`GetTalentTrackMessageComposer`). Flash's `TalentTrackController` opens its window on the answer
 * (`TalentTrackMessageEvent`); that window is not ported, and the port registers no parser for the
 * answer, so the request is all that happens.
 */
import { GetTalentTrackComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { configBoolean } from '#base/context/system';
import { PerkCodes, userStore } from '#base/context/user';

/** `SessionDataManager.currentTalentTrack`: citizenship until it is passed (when that track is on), then helper. */
export const currentTalentTrack = () => {
    const citizenshipEnabled = configBoolean('talent.track.citizenship.enabled');
    const citizen = userStore.getState().perks.get(PerkCodes.Citizen)?.isAllowed === true;

    return (citizenshipEnabled && !citizen) ? 'citizenship' : 'helper';
};

/** `GetTalentTrackMessageComposer(trackName)`. */
export const requestTalentTrack = (send: Send, trackName: string) => send(new GetTalentTrackComposer({ trackName }));
