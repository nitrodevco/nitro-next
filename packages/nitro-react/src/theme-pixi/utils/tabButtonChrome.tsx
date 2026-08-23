import { BackgroundLayerConfig, NineSlice } from '../layer';
import { InteractionStates } from './useInteractionState';

export const TAB_BUTTON_CHROME_VARIANTS: Record<string, InteractionStates<BackgroundLayerConfig>> = {
    // default
    0: {
        default: NineSlice('tabbutton-0-default-src', 5, 5, 5, 0),
        hovering: NineSlice('tabbutton-0-hovering-src', 5, 5, 5, 0),
        selected: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 0),
    },
    // black
    1: {
        default: NineSlice('tabbutton-1-default-src', 5, 5, 5, 0),
        hovering: NineSlice('tabbutton-1-hovering-src', 5, 5, 5, 0),
        selected: NineSlice('tabbutton-1-selected-src', 5, 5, 5, 0),
    },
    // white - reuses variant '0's art wholesale
    2: {
        default: NineSlice('tabbutton-0-default-src', 5, 5, 5, 0),
        hovering: NineSlice('tabbutton-0-hovering-src', 5, 5, 5, 0),
        selected: NineSlice('tabbutton-0-selected-src', 5, 5, 5, 0),
    },
    // shiny/pill
    3: {
        default: NineSlice('tabbutton-3-default-src', 9, 0, 9, 0),
        hovering: NineSlice('tabbutton-3-hovering-src', 9, 0, 9, 0),
        selected: NineSlice('tabbutton-3-selected-src', 9, 0, 9, 0),
    },
};
