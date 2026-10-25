import { useSystemStore } from '#base/context/system';
import { useWiredStore } from '#base/context/wired';
import { getWiredStyleByName, WIRED_STYLES, WiredStyle } from '#base/wired';

/** The three prototype boxes that keep their own look whatever the user prefers, by furni class name. */
const PROTOTYPE_STYLES: Record<string, WiredStyle> = {
    wf_ltdproto_act_toggle_state: WIRED_STYLES.volter_yellow,
    wf_proto_trg_at_given_time: WIRED_STYLES.volter_blue,
    wf_proto_cnd_trggrer_on_frn: WIRED_STYLES.volter_green,
};

/**
 * `UserDefinedRoomEventsCtrl.determineActiveWiredStyle` - the style a box's dialog is drawn in:
 * one of the three prototype styles when the box's furni is a prototype, otherwise the user's
 * preferred style (`WiredPreferencesSlice.preferredWiredStyle`, illumina unless the style picker
 * is enabled and they chose another).
 */
export const useWiredActiveStyle = (stuffTypeId: number): WiredStyle => {
    const className = useSystemStore(x => x.floorItems[stuffTypeId]?.className);
    const preferredWiredStyle = useWiredStore(x => x.preferredWiredStyle);

    return (className ? PROTOTYPE_STYLES[className] : undefined) ?? getWiredStyleByName(preferredWiredStyle);
};
