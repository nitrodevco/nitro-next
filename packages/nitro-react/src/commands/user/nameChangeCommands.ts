/**
 * `NameChangeController`: the own avatar menu's name change (`RWUAM_START_NAME_CHANGE` ->
 * `HabboHelp.startNameChange` -> `showView`). The window (`NameChangeView`) is `name_change`; the
 * server's answers reach it here: `CheckUserNameResult` sets the checked name or shows why not,
 * `ChangeUserNameResult` closes it on success (the "name changed" notice is `onUserNameChanged`'s,
 * for every change) or shows why not.
 */
import { ChangeUserNameInRoomComposer, CheckUserNameComposer } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { systemStore } from '#base/context/system';

/** `ChangeUserNameResultMessageEvent.RESULT_OK`, which both results share. */
const RESULT_OK = 0;

/** A server answer to the window's check or change. */
export interface NameChangeResult {
    kind: 'check' | 'change';
    resultCode: number;
    name: string;
    suggestions: string[];
}

type NameChangeListener = (result: NameChangeResult) => void;

const listeners = new Set<NameChangeListener>();

/** The open window hears the answers (`NameChangeController` holds its view); returns the unsubscribe. */
export const listenNameChangeResults = (listener: NameChangeListener) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

/** `showView`: the window on its first page. */
export const startNameChange = () => systemStore.getState().showWindow('name_change', {});

/** `checkName`: whether the name is free. */
export const checkNameChangeName = (send: Send, name: string) => send(new CheckUserNameComposer({ name }));

/** `changeName`: the confirmed name sent as the new one (`ChangeUserNameInRoomMessageComposer`). */
export const changeName = (send: Send, name: string) => send(new ChangeUserNameInRoomComposer({ name }));

const answer = (kind: NameChangeResult['kind'], resultCode: number, name: string, suggestions: string[]) => {
    for (const listener of listeners) listener({ kind, resultCode, name, suggestions });
};

/** `onCheckUserNameResult`: only while the window is up. */
export const onNameChangeChecked = (resultCode: number, name: string, suggestions: string[]) => answer('check', resultCode, name, suggestions);

/** `onChangeUserNameResult`: `hideView` on success, else the reason in the window. */
export const onNameChangeChanged = (resultCode: number, name: string, suggestions: string[]) => {
    if (resultCode === RESULT_OK) {
        systemStore.getState().hideWindow('name_change');

        return;
    }

    answer('change', resultCode, name, suggestions);
};
