/**
 * What several trigger confs (and the selectors that build the same widgets) share: the clamp a
 * `SliderSection.value = x` applies in `onEditStart`, and the team radio `ScoreAchieved` and
 * `selectors/UsersInTeam` both build.
 */

/**
 * `SliderSection.value = x` -> `SliderWindowControllerNew.setValue`, which clamps to the slider's
 * range - so a box saved with a value outside it reads back as the nearest end.
 */
export const clampSliderSectionValue = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/**
 * `createRadioGroup([ RadioButtonParam(0, l("team.any"), null, null, true), RadioButtonParam(1, l("team.1")), ... ], null, 2)` -
 * "any team" on its own row, then the four teams two to a row.
 */
export const WIRED_TEAM_RADIO_OPTIONS: readonly { id: number; label: string; newLine?: boolean }[] = [
    { id: 0, label: '${wiredfurni.params.team.any}', newLine: true },
    { id: 1, label: '${wiredfurni.params.team.1}' },
    { id: 2, label: '${wiredfurni.params.team.2}' },
    { id: 3, label: '${wiredfurni.params.team.3}' },
    { id: 4, label: '${wiredfurni.params.team.4}' },
];

/** The team radio's column count. */
export const WIRED_TEAM_RADIO_COLUMNS = 2;

/** The form of a trigger conf whose only input is one slider: its value is the only int param. */
export interface TriggerSliderForm {
    value: number;
}
