import { RoomObjectUserType } from '@nitrodevco/nitro-api';
import { RefObject, useEffect, useMemo, useState } from 'react';

import { requestChatCommandSuggestions } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useOwnControllerLevel, useRoomStore } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { ClientGates, useClientGate, useUserStore } from '#base/context/user';
import { completeChatCommand, findInvalidArguments, IChatCommandCompletion, mergeChatCommands, NO_CHAT_COMMAND_COMPLETION } from '#base/utils';

import { chatInputClientCommands } from './chatInputClientCommands';

/** How long typing pauses before the server is asked what to offer (`chat.commands.v2`). */
const SUGGEST_DELAY_MS = 120;
/** An argument the server would refuse: the red of the field's own flood warning (`block_text`). */
const INVALID_ARGUMENT_COLOR = '#ff0000';

interface ChatInputCompletionOptions {
    /** The field's line, and the same line as the field last changed it (ahead of the render). */
    value: string;
    valueRef: RefObject<string>;
    cursor: number;
    focused: boolean;
    /** A suggestion taken: the line it completes to, and where the cursor goes in it. */
    onTake: (next: string, nextCursor: number) => void;
}

/**
 * The chat field's `:command` completion (not Flash's): the client's own `:words` and, from a Turbo
 * server's `chat.commands.v2`, the commands the user may use, completed at the cursor
 * (`ChatCommandSuggestionsView`), with what only the server knows asked for once typing pauses,
 * and the arguments the server would refuse in red. The list's keys are those of Habbo's gift
 * window's friend suggestions (`PurchaseConfirmationDialog.onNameInputKeyUp`).
 */
export const useChatInputCompletion = ({ value, valueRef, cursor, focused, onTake }: ChatInputCompletionOptions) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const mayUseWired = useClientGate(ClientGates.WiredMenu);
    const chatCommands = useUserStore(x => x.chatCommands);
    const chatCommandSuggestions = useUserStore(x => x.chatCommandSuggestions);
    const controllerLevel = useOwnControllerLevel();
    const usersByRoomObjectId = useRoomStore(x => x.usersByRoomObjectId);
    const [ highlightIndex, setHighlightIndex ] = useState(0);
    // The suggestions shown last, so the highlight goes back to the top when they change.
    const [ highlightFor, setHighlightFor ] = useState('');
    // The line the command list was put away on (Escape, a click elsewhere); it stays away until the line changes.
    const [ suggestionsDismissedFor, setSuggestionsDismissedFor ] = useState<string | null>(null);

    const roomUserNames = useMemo(() => Object.values(usersByRoomObjectId).filter(x => x.userType === RoomObjectUserType.User).map(x => x.name), [ usersByRoomObjectId ]);

    // The client's own `:words` and, from a Turbo server, the commands it says the user may use.
    const commands = useMemo(() => mergeChatCommands(chatInputClientCommands({
        whisperMode: t('widgets.chatinput.mode.whisper', ':whisper'),
        shoutMode: t('widgets.chatinput.mode.shout', ':shout'),
        speakMode: t('widgets.chatinput.mode.speak', ':speak'),
        whisper: t('widgets.chatinput.command.whisper', 'Whisper to someone in the room'),
        shout: t('widgets.chatinput.command.shout', 'Shout to the whole room'),
        speak: t('widgets.chatinput.command.speak', 'Talk normally'),
        wiredMenu: t('widgets.chatinput.command.wired', 'Open the wired menu'),
        variables: t('widgets.chatinput.command.variables', 'Open the wired variables'),
        inspection: t('widgets.chatinput.command.inspection', 'Open the wired inspection'),
        playTest: t('widgets.chatinput.command.playtest', 'Turn wired play test on or off'),
        wiredReset: t('widgets.chatinput.command.wiredreset', 'Close the wired setup'),
        userChooser: t('widgets.chatinput.command.chooser', 'List everyone in the room'),
        furniChooser: t('widgets.chatinput.command.furni', 'List the furni in the room'),
        pickAll: t('widgets.chatinput.command.pickall', 'Pick up all your furni in the room'),
        pickAllBuildersClub: t('widgets.chatinput.command.pickallbc', 'Pick up all Builders Club furni in the room'),
        resetScores: t('widgets.chatinput.command.resetscores', 'Reset the room\'s scores'),
        ejectAll: t('widgets.chatinput.command.ejectall', 'Eject everyone else\'s furni from the room'),
        ejectPets: t('widgets.chatinput.command.ejectpets', 'Send the pets in the room home'),
    }, mayUseWired), chatCommands ?? []), [ t, mayUseWired, chatCommands ]);

    const completion = useMemo<IChatCommandCompletion>(() => (focused
        ? completeChatCommand({ text: value, cursor, commands, controllerLevel, roomUserNames, serverValues: chatCommandSuggestions })
        : NO_CHAT_COMMAND_COMPLETION), [ commands, focused, value, cursor, controllerLevel, roomUserNames, chatCommandSuggestions ]);
    // What the server would refuse, drawn in red as it is typed (`TextField.setTextFormat`).
    const invalidArguments = useMemo(() => findInvalidArguments({ text: value, commands, controllerLevel, roomUserNames })
        .map(x => ({ ...x, color: INVALID_ARGUMENT_COLOR })), [ value, commands, controllerLevel, roomUserNames ]);
    const suggestions = completion.suggestions;
    const suggestionsKey = suggestions.map(x => x.label).join('\n');

    // `updateSuggestions` highlights the first row each time the list is rebuilt.
    if (highlightFor !== suggestionsKey) {
        setHighlightFor(suggestionsKey);
        setHighlightIndex(0);
    }

    const showSuggestions = (suggestions.length > 0) && (suggestionsDismissedFor !== value);
    const selectableSuggestions = suggestions.filter(x => x.replacement !== null).length;
    // The request by its parts: a new object asking the same thing is the same request.
    const requestCommand = completion.request?.command ?? null;
    const requestParameter = completion.request?.parameter ?? -1;
    const requestPrefix = completion.request?.prefix ?? '';
    const requestSyntax = completion.request?.syntax ?? '';
    const requestArgumentText = completion.request?.argumentText ?? '';

    /** A suggestion taken: the line becomes what it completes to, and the field keeps the keyboard. */
    const takeSuggestion = (index: number) => {
        const replacement = suggestions[index]?.replacement;

        if (replacement === null || replacement === undefined) return;

        const next = replacement;
        const nextCursor = suggestions[index]?.replacementCursor ?? next.length;
        onTake(next, nextCursor);
    };

    /** `highlightSuggestion`: wraps past either end of the list. */
    const moveHighlight = (step: number) => {
        let next = highlightIndex + step;

        if (next < 0) next = suggestions.length - 1;
        if (next >= suggestions.length) next = 0;

        setHighlightIndex(next);
    };

    /** `onNameInputKeyUp`, on the chat field: the command list's keys, before the field's own. */
    const onSuggestionKey = (event: KeyboardEvent): boolean => {
        if (!showSuggestions || !selectableSuggestions) {
            if (showSuggestions && (event.key === 'Escape')) {
                setSuggestionsDismissedFor(valueRef.current);

                return true;
            }

            return false;
        }

        switch (event.key) {
            case 'ArrowUp':
                moveHighlight(-1);
                return true;
            case 'ArrowDown':
                moveHighlight(1);
                return true;
            case 'Tab':
                takeSuggestion(highlightIndex);
                return true;
            case 'Enter': {
                // A line that taking the row would not change goes as it is.
                const replacement = suggestions[highlightIndex]?.replacement;

                if (!replacement || (replacement.trim() === valueRef.current.trim()) || event.shiftKey) return false;

                takeSuggestion(highlightIndex);
                return true;
            }
            case 'Escape':
                setSuggestionsDismissedFor(valueRef.current);
                return true;
        }

        return false;
    };

    // What only the server knows is asked for once typing pauses; the answer lands in the user store.
    useEffect(() => {
        if (requestCommand === null) return;

        const timer = setTimeout(() => requestChatCommandSuggestions(send, requestCommand, requestParameter, requestPrefix, requestSyntax, requestArgumentText), SUGGEST_DELAY_MS);

        return () => clearTimeout(timer);
    }, [ send, requestCommand, requestParameter, requestPrefix, requestSyntax, requestArgumentText ]);

    return { invalidArguments, suggestions, showSuggestions, highlightIndex, setHighlightIndex, setSuggestionsDismissedFor, takeSuggestion, onSuggestionKey };
};
