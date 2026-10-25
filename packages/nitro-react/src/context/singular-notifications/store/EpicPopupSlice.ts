/**
 * Flash's friend bar `HabboEpicPopupView`: an `EpicPopupMessage` shows `epic_popup_frame_xml` with
 * the packet's picture, replacing one that is up (`showPopup` disposes the active frame first), until
 * its close button or header close disposes it. App-wide: the view listens on the connection.
 */
import { StateCreator } from 'zustand';

type State = {
    /** The picture of the popup that is up; none when closed. */
    epicPopupImageUri: string | undefined;
};

type Actions = {
    /** `showPopup`. */
    showEpicPopup: (imageUri: string) => void;
    /** `close_button` / `header_button_close`. */
    closeEpicPopup: () => void;
};

export const EpicPopupSliceInitialState: State = {
    epicPopupImageUri: undefined,
};

export type EpicPopupSlice = State & Actions;

export const createEpicPopupSlice: StateCreator<EpicPopupSlice, [], [], EpicPopupSlice> = set => ({
    ...EpicPopupSliceInitialState,
    showEpicPopup: imageUri => set({ epicPopupImageUri: imageUri }),
    closeEpicPopup: () => set({ epicPopupImageUri: undefined }),
});
