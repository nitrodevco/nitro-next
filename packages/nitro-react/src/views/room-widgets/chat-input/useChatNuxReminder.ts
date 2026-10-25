import { NoobnessLevelEnum } from '@nitrodevco/nitro-api';
import { useEffect, useState } from 'react';

import { useHintActions } from '#base/context/hints';
import { useConfigActions, useConfigValue } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { useHintTarget } from '#base/hooks';

/** `getInteger("nux.noob.chat.reminder.delay", 240)`: seconds before a new user who has not typed is reminded. */
const NUX_CHAT_REMINDER_DELAY_SECONDS = 240;
/** `highlightChatInput`'s `Timer(500)`, and the ticks it runs before the reminder is over. */
const NUX_CHAT_REMINDER_TICK_MS = 500;
const NUX_CHAT_REMINDER_TICKS = 10;

/**
 * `RoomChatInputView`'s nux chat reminder for the room `roomId` (-1 for none): `nuxReminded` once
 * `highlightChatInput` has run there, `nuxReminderTicks` - the bobs passed - while it lasts, the
 * `nux_chat_reminder` hint target, `onTyped` for `onInputChanged` and `endNuxReminder` for
 * `setInputFieldFocus`.
 */
export const useChatNuxReminder = (roomId: number) => {
    const isNoob = useUserStore(x => Number(x.noobnessLevel) !== Number(NoobnessLevelEnum.NotNoob));
    const nuxReminderShown = useConfigValue<string>('nux.chat.reminder.shown') === '1';
    const nuxReminderDelay = useConfigValue<number>('nux.noob.chat.reminder.delay') ?? NUX_CHAT_REMINDER_DELAY_SECONDS;
    const { setConfigValue } = useConfigActions();
    const { showHint } = useHintActions();
    // The view is Flash's per room: its nux timer starts again in every room, until the user types there.
    const [ nuxRoomId, setNuxRoomId ] = useState(roomId);
    const [ nuxTyped, setNuxTyped ] = useState(false);
    // `highlightChatInput` has run in this room (its text stays), and how many of its bobs have passed while it lasts.
    const [ nuxReminded, setNuxReminded ] = useState(false);
    const [ nuxReminderTicks, setNuxReminderTicks ] = useState<number | undefined>(undefined);
    const nuxReminding = (nuxReminderTicks !== undefined);
    const nuxHintTarget = useHintTarget('nux_chat_reminder', nuxReminding);

    if (nuxRoomId !== roomId) {
        setNuxRoomId(roomId);
        setNuxTyped(false);
        setNuxReminded(false);
        setNuxReminderTicks(undefined);
    }

    // `onNuxIdleTimerComplete` -> `highlightChatInput`.
    useEffect(() => {
        if ((roomId < 0) || !isNoob || nuxReminderShown || nuxTyped || nuxReminded) return;

        const timeout = setTimeout(() => {
            setNuxReminded(true);
            setNuxReminderTicks(0);
        }, nuxReminderDelay * 1000);

        return () => clearTimeout(timeout);
    }, [ roomId, isNoob, nuxReminderShown, nuxTyped, nuxReminded, nuxReminderDelay ]);

    // `registerHintWindow("nux_chat_reminder", chat_input)` then `showHint("nux_chat_reminder")`.
    useEffect(() => {
        if (nuxReminding) showHint('nux_chat_reminder');
    }, [ nuxReminding, showHint ]);

    // `onChatReminderTimer`: a bob every 500 ms; after the tenth, `chatBarReminderShown`.
    useEffect(() => {
        if (nuxReminderTicks === undefined) return;

        const timeout = setTimeout(() => {
            if ((nuxReminderTicks + 1) < NUX_CHAT_REMINDER_TICKS) {
                setNuxReminderTicks(nuxReminderTicks + 1);

                return;
            }

            setNuxReminderTicks(undefined);
            setConfigValue('nux.chat.reminder.shown', '1');
        }, NUX_CHAT_REMINDER_TICK_MS);

        return () => clearTimeout(timeout);
    }, [ nuxReminderTicks, setConfigValue ]);

    /** `onInputChanged`: typing stops the nux timer. */
    const onTyped = () => setNuxTyped(true);

    /** `setInputFieldFocus` while the reminder runs: `chatBarReminderShown`. */
    const endNuxReminder = () => {
        if (!nuxReminding) return;

        setNuxReminderTicks(undefined);
        setConfigValue('nux.chat.reminder.shown', '1');
    };

    return { nuxReminded, nuxReminderTicks, nuxHintTarget, onTyped, endNuxReminder };
};
