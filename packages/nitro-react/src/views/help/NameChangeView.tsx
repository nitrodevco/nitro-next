/**
 * The own avatar menu's name change - `NameChangeView` in `HabboHelp` (`habbo-help-com`): the
 * `welcome_name_change` frame, centred, on one of three pages, the content sized to the page:
 * - main (`showMainView`): `tutorial.name_change.current` with the user's name; `change_name_button`
 *   goes to the selection, `keep_name_button` confirms the current name.
 * - selection (`welcome_name_selection`): `input`, `check_name_button` asks whether it is free and
 *   waits (`nameCheckWaitBegin`: buttons and input disabled), `select_name_button` - enabled from
 *   three characters - confirms a name already checked, else checks it first and confirms when it
 *   comes back free; `info_text` says what the check said, and a taken name lists the server's
 *   suggestions in `suggestions` (`NameSuggestionListRenderer`: `welcome_name_suggestion_item`s
 *   left to right, 5 apart, wrapping, at most 150 high), one pressed puts it in the input.
 * - confirmation (`welcome_name_confirmation`): `final_name`; `confirm_name_button` sends
 *   `ChangeUserNameInRoom`, the cancels and the header close close it.
 * The window closes once the server says the name changed (`nameChangeCommands`).
 *
 * The select button's flow with an unchecked name is read from a damaged decompile
 * (`windowEventHandler`, `select_name_button`) - inference.
 */
import { useEffect, useState } from 'react';

import { changeName, checkNameChangeName, listenNameChangeResults, NameChangeResult } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useIsWindowVisible, useTranslation, useWindowActions } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { Box, TemplateBindings, TemplateWindow, useLatest, useTemplateFrame } from '#base/theme';

const LIBRARY = 'habbo-help-com';
/** `welcome_name_change`'s frame around its 303 x 190 content. */
const FRAME_WIDTH = 315;
const FRAME_HEIGHT = 225;
const MAIN_CONTENT_HEIGHT = 190;
/** `welcome_name_selection` / `welcome_name_confirmation`. */
const PAGE_HEIGHT = 193;
/** `NAME_SUGGESTION_BG_COLOR` / `_OVER`. */
const SUGGESTION_COLOR = 0xFFC9E9F4;
const SUGGESTION_COLOR_OVER = 0xFFA9D3E3;
/** `NameSuggestionListRenderer`: 5 apart, the list at most 150 high. */
const SUGGESTION_GAP = 5;
const SUGGESTIONS_HEIGHT = 150;
/** `windowEventHandler`'s `WE_CHANGE`: the select button from more than two characters. */
const MIN_SELECT_LENGTH = 3;

const RESULT_OK = 0;
const RESULT_TOO_SHORT = 3;
const RESULT_TOO_LONG = 4;
const RESULT_CONTAINS_INVALID_CHARS = 5;
const RESULT_INVALID_FORMAT = 2;
const RESULT_CHANGE_NOT_ALLOWED = 6;
const RESULT_MERGE_HOTEL_NAME_CHANGE = 7;

type Page = 'main' | 'selection' | 'confirmation';

export const NameChangeView = () => (useIsWindowVisible('name_change') ? <NameChangeWindow /> : null);

const NameChangeWindow = () => {
    const myName = useUserStore(x => x.name);
    const { hideWindow } = useWindowActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const [ page, setPage ] = useState<Page>('main');
    const [ input, setInput ] = useState('');
    const [ checkedName, setCheckedName ] = useState<string | null>(null);
    const [ pendingName, setPendingName ] = useState<string | null>(null);
    const [ waiting, setWaiting ] = useState(false);
    const [ selectEnabled, setSelectEnabled ] = useState(false);
    const [ info, setInfo ] = useState(() => t('help.tutorial.name.info'));
    const [ suggestions, setSuggestions ] = useState<string[] | null>(null);
    const [ hovered, setHovered ] = useState<string | null>(null);
    const close = () => hideWindow('name_change');
    const frame = useTemplateFrame({ id: 'nameChange', centered: true, rememberPosition: false, onClose: close });

    /** `setNormalView`. */
    const normalView = () => {
        setInfo(t('help.tutorial.name.info'));
        setSuggestions(null);
    };

    /** `nameCheckWaitBegin`. */
    const waitBegin = () => {
        setWaiting(true);
        setSelectEnabled(false);
        setInfo(t('help.tutorial.name.wait_while_checking'));
    };

    /** `nameCheckWaitEnd`: the select button again only when the name came back free. */
    const waitEnd = (available: boolean) => {
        setWaiting(false);

        if (available) setSelectEnabled(true);
    };

    const check = (name: string) => {
        checkNameChangeName(send, name);
        waitBegin();
    };

    /** The server's answers: `set checkedName`, or `setNameNotAvailableView`. */
    const onResult = (result: NameChangeResult) => {
        if ((result.kind === 'check') && (result.resultCode === RESULT_OK)) {
            setCheckedName(result.name);

            if (pendingName === result.name) {
                setPage('confirmation');

                return;
            }

            // `setNameAvailableView`.
            waitEnd(true);
            setInfo(t('help.tutorial.name.available', '', { name: result.name }));
            setInput(result.name);
            setSuggestions(null);

            return;
        }

        // `setNameNotAvailableView`: the reason by result code, as `NameChangeView` maps them.
        waitEnd(false);
        setPage('selection');
        setPendingName(null);
        setCheckedName(null);

        switch (result.resultCode) {
            case RESULT_CONTAINS_INVALID_CHARS: setInfo(t('help.tutorial.name.taken', '', { name: result.name })); break;
            case RESULT_TOO_LONG: setInfo(t('help.tutorial.name.invalid', '', { name: result.name })); break;
            case RESULT_TOO_SHORT: setInfo(t('help.tutorial.name.long')); break;
            case RESULT_INVALID_FORMAT: setInfo(t('help.tutorial.name.short')); break;
            case RESULT_CHANGE_NOT_ALLOWED: setInfo(t('help.tutorial.name.change_not_allowed')); break;
            case RESULT_MERGE_HOTEL_NAME_CHANGE: setInfo(t('help.tutorial.name.merge_hotel_down')); break;
        }

        setSuggestions(((result.resultCode === RESULT_MERGE_HOTEL_NAME_CHANGE) || (result.resultCode === RESULT_CHANGE_NOT_ALLOWED)) ? null : result.suggestions);
    };

    // Always the latest handler, which closes over this render's state.
    const latest = useLatest(onResult);

    useEffect(() => listenNameChangeResults(result => latest.current(result)), []);

    const toSelection = () => {
        setSelectEnabled(false);
        normalView();
        setPage('selection');
    };

    const select = () => {
        const name = input;

        if (name.length < 1) return;

        if (checkedName !== name) {
            setPendingName(name);
            check(name);

            return;
        }

        setPage('confirmation');
    };

    const pickSuggestion = (name: string) => {
        waitEnd(true);
        normalView();
        setInput(name);
    };

    const suggestionList = suggestions && (
        <Box layout={{ position: 'absolute', left: 0, top: 0, width: '100%', maxHeight: SUGGESTIONS_HEIGHT, flexDirection: 'row', flexWrap: 'wrap', columnGap: SUGGESTION_GAP, rowGap: SUGGESTION_GAP, overflow: 'hidden' }}>
            {suggestions.map(name => (
                <TemplateWindow
                    key={name}
                    id={`${LIBRARY}/welcome_name_suggestion_item_xml`}
                    bindings={{
                        content: {
                            caption: name,
                            // `IWindow.color` of a text: its field's background.
                            backgroundColor: (hovered === name) ? SUGGESTION_COLOR_OVER : SUGGESTION_COLOR,
                            onPointerTap: () => pickSuggestion(name),
                            onPointerOver: () => setHovered(name),
                            onPointerOut: () => setHovered(current => ((current === name) ? null : current)),
                        },
                    }}
                />
            ))}
        </Box>
    );

    const pages: Record<Exclude<Page, 'main'>, { id: string; caption: string; bindings: TemplateBindings }> = {
        selection: {
            id: `${LIBRARY}/welcome_name_selection_xml`,
            caption: t('tutorial.name_change.title.select'),
            bindings: {
                input: {
                    caption: input,
                    disabled: waiting,
                    onChange: (text: string) => {
                        setInput(text);

                        if (!waiting) setSelectEnabled(text.length >= MIN_SELECT_LENGTH);
                    },
                },
                check_name_button: { disabled: waiting, onPointerTap: () => check(input) },
                select_name_button: { disabled: !selectEnabled, onPointerTap: select },
                cancel_selection_button: { onPointerTap: close },
                info_text: { caption: info },
                suggestions: { visible: !!suggestions, children: suggestionList },
            },
        },
        confirmation: {
            id: `${LIBRARY}/welcome_name_confirmation_xml`,
            caption: t('tutorial.name_change.title.confirm'),
            bindings: {
                final_name: { caption: checkedName ?? '' },
                confirm_name_button: { onPointerTap: () => checkedName && changeName(send, checkedName) },
                cancel_confirmation_button: { onPointerTap: close },
            },
        },
    };

    const shown = (page === 'main') ? null : pages[page];

    return (
        <TemplateWindow
            id={`${LIBRARY}/welcome_name_change_xml`}
            frame={frame}
            width={FRAME_WIDTH}
            height={FRAME_HEIGHT + (shown ? (PAGE_HEIGHT - MAIN_CONTENT_HEIGHT) : 0)}
            parameters={{ 'tutorial.name_change.current': { name: myName } }}
            bindings={{
                '': { caption: shown ? shown.caption : t('tutorial.name_change.title.main') },
                // `showView`: the page shown in the window's content (`_window.content.addChild`), the main page's own windows hidden under it.
                '@0': {
                    children: shown && (
                        <TemplateWindow
                            key={page}
                            id={shown.id}
                            bindings={shown.bindings}
                        />
                    ),
                },
                '@0/@0': { visible: !shown },
                '@0/@1': { visible: !shown },
                change_name_button: { visible: !shown, onPointerTap: toSelection },
                keep_name_button: {
                    visible: !shown,
                    onPointerTap: () => {
                        setCheckedName(myName);
                        setPage('confirmation');
                    },
                },
            }}
        />
    );
};
