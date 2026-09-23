/**
 * The account's own word filter - `toolbar/extensions/settings/WordFilterSettingsView`. The list
 * is the server's: the window asks for it when it opens and every add and remove is applied from
 * the answer (`ModifyCustomFilterResultMessageEvent`), so a word the server refuses never appears.
 * Flash drops an add whose word is empty or already filtered.
 */
import { AddToCustomFilterComposer, GetCustomFilterComposer, RemoveFromCustomFilterComposer } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';

type Send = WebSocketConnection['send'];

/** `prepareWindow`: the list the window shows. */
export const requestCustomFilter = (send: Send) => send(new GetCustomFilterComposer({}));

/** `onAddWordClick`. Returns whether it was sent, so the view knows to clear its input. */
export const addToCustomFilter = (send: Send, word: string): boolean => {
    if (!word.length || userStore.getState().filteredWords.includes(word)) return false;

    send(new AddToCustomFilterComposer({ word }));

    return true;
};

/** `onRemoveWordClick`: the selected row's word, and nothing while no row is selected. */
export const removeFromCustomFilter = (send: Send) => {
    const { filteredWords, selectedWordIndex, setSelectedWordIndex } = userStore.getState();
    const word = filteredWords[selectedWordIndex];

    if (word === undefined) return;

    setSelectedWordIndex(-1);

    send(new RemoveFromCustomFilterComposer({ word }));
};
