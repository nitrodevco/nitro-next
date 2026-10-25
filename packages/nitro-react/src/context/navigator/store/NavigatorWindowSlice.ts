import { StateCreator } from 'zustand';

/** The window's place and size, as `NavigatorView` reads them off `_window`. */
export interface NavigatorWindowGeometry {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * `NavigatorView`'s `_lastWindowX` ... `_lastLeftPaneHidden` and the time they were last sent
 * (`sendWindowPreferences`). Flash names the flag `_lastLeftPaneHidden` but fills it with
 * `left_pane.visible`, and that is what goes to the server.
 */
export interface NavigatorSentWindowPreferences extends NavigatorWindowGeometry {
    leftPaneVisible: boolean;
    sentAt: number;
}

/** The navigator window: the server's preferences for it, where it is now, and what was last sent back. */
type State = {
    /* NewNavigatorPreferencesMessage — HabboNewNavigator.onPreferences */
    preferences: { windowX: number; windowY: number; windowWidth: number; windowHeight: number; resultsMode: number } | undefined;
    leftPaneHidden: boolean;
    /** Where the window is now - written by the window while it is up, read by the preference sync. */
    windowGeometry: NavigatorWindowGeometry | undefined;
    /** What was last sent; `undefined` until the window has been created (`createMainWindow`). */
    sentWindowPreferences: NavigatorSentWindowPreferences | undefined;
};

type Actions = {
    setPreferences: (preferences: { windowX: number; windowY: number; windowWidth: number; windowHeight: number; resultsMode: number }) => void;
    setLeftPaneHidden: (leftPaneHidden: boolean) => void;
    setWindowGeometry: (geometry: Partial<NavigatorWindowGeometry>) => void;
    setSentWindowPreferences: (preferences: NavigatorSentWindowPreferences) => void;
};

export const NavigatorWindowSliceInitialState: State = {
    preferences: undefined,
    // `createMainWindow` hides the left pane; the preferences show it again.
    leftPaneHidden: true,
    windowGeometry: undefined,
    sentWindowPreferences: undefined,
};

export type NavigatorWindowSlice = State & Actions;

export const createNavigatorWindowSlice: StateCreator<NavigatorWindowSlice, [], [], NavigatorWindowSlice> = set => ({
    ...NavigatorWindowSliceInitialState,
    setPreferences: preferences => set({ preferences }),
    setLeftPaneHidden: leftPaneHidden => set({ leftPaneHidden }),
    setWindowGeometry: geometry => set((x) => {
        const current = x.windowGeometry ?? { x: 0, y: 0, width: 0, height: 0 };
        const next = { ...current, ...geometry };

        // The window reports its size on every layout pass; an unchanged one writes nothing.
        if (x.windowGeometry && (next.x === current.x) && (next.y === current.y) && (next.width === current.width) && (next.height === current.height)) return x;

        return { windowGeometry: next };
    }),
    setSentWindowPreferences: sentWindowPreferences => set({ sentWindowPreferences }),
});
