/**
 * The account's wired preferences - the setters of `WiredMenuController` that do more than keep
 * a value: the UI style decides which style the setup dialog opens in, and the whisper switch is
 * saved the moment it is flipped.
 */
import { WiredSetPreferencesComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { systemStore } from '#base/context/system';
import { wiredStore } from '#base/context/wired';
import { WIRED_STYLE_DEFAULT, WIRED_STYLES, WiredStyleName } from '#base/wired';

import { closeWiredSetup } from './wiredCommands';

type Send = WebSocketConnection['send'];

/** `WiredMenuController.sendPreferences`. */
export const sendWiredPreferences = (send: Send) => {
    const { wiredMenuButton, wiredInspectButton, playTestMode, wiredWhisperDisabled, showAllNotifications, wiredUiStyle } = wiredStore.getState();

    send(new WiredSetPreferencesComposer({ wiredMenuButton, wiredInspectButton, playTestMode, wiredWhisperDisabled, showAllNotifications, wiredUIStyle: wiredUiStyle }));
};

/**
 * `WiredMenuController.uiStyle` (the setter) into `UserDefinedRoomEventsCtrl.setPreferredWiredStyleByName`:
 * the preference only reaches the dialog while `wired.ui_picker_enabled` is on, an unknown style
 * name is ignored, and a change closes the dialog that is open and drops what the elements
 * remembered between edits (`clearCache`: every element's inputs are built anew).
 */
export const setWiredUiStyle = (wiredUiStyle: string) => {
    const state = wiredStore.getState();

    if (wiredUiStyle === state.wiredUiStyle) return;

    state.setWiredPreferences({ wiredUiStyle });

    if (systemStore.getState().config['wired.ui_picker_enabled'] !== true) return;

    const styleName = (wiredUiStyle === '') ? WIRED_STYLE_DEFAULT : wiredUiStyle;

    if ((styleName === state.preferredWiredStyle) || !WIRED_STYLES[styleName as WiredStyleName]) return;

    closeWiredSetup();
    state.clearWiredElementMemory();

    state.setPreferredWiredStyle(styleName);
};

/** `WiredMenuController.wiredWhisperDisabled` (the setter) - the toolbar's "other settings" checkbox; saved at once. */
export const setWiredWhisperDisabled = (send: Send, wiredWhisperDisabled: boolean) => {
    wiredStore.getState().setWiredPreferences({ wiredWhisperDisabled });

    sendWiredPreferences(send);
};
