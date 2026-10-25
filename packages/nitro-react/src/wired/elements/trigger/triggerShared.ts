/**
 * What several trigger confs share: the form of a conf whose only input is one slider. The clamp a
 * `SliderSection.value = x` applies in `onEditStart` is `clampSliderValue` in
 * `wired/common/WiredUtil`; the team radio `ScoreAchieved` builds is the views' `TeamSection`.
 */

/** The form of a trigger conf whose only input is one slider: its value is the only int param. */
export interface TriggerSliderForm {
    value: number;
}
