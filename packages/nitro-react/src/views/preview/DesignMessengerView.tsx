/**
 * The messenger in the preview host's design window, drawn by the game's own `MessengerView` with two
 * sample conversations - the open one with lines both ways and an info line - as `NewConsoleMessage`
 * would fill it, so its chat entries are drawn inside it and a press names them (`DesignPreviewView`).
 * Nothing is sent. Not a Flash feature.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';

import { MESSENGER_ENTRY_INFO, MESSENGER_ENTRY_OTHER, MESSENGER_ENTRY_OWN, MessengerChatEntry } from '#base/context/messenger';
import { fillSampleMessenger } from '#base/preview/designSamples';
import { usePreviewSample } from '#base/preview/usePreviewSample';
import { MessengerView } from '#base/views/messenger/MessengerView';

const FIGURE = 'hr-115-42.hd-195-19.ch-3030-82.lg-275-1408.fa-1201.ca-1804-64';

const line = (chatId: number, type: number, text: string, senderName: string, minutesAgo: number, index: number): MessengerChatEntry => ({
    type, chatId, message: { text, habbiconId: 0 }, sentAt: performance.now() - (minutesAgo * 60000), senderId: (type === MESSENGER_ENTRY_OWN) ? 0 : chatId, senderName, senderFigure: FIGURE, messageId: `${chatId}-${index}`, awaitConfirmationId: 0,
});

export const DesignMessengerView = () => {
    // The own lines are signed with the user's name.
    usePreviewSample(() => fillSampleMessenger('Me', {
        conversations: [
            { chatId: 1, visible: true, unread: false, name: 'Bonnie', figure: FIGURE, gender: AvatarGenderType.Female },
            { chatId: 2, visible: true, unread: true, name: 'Frank', figure: FIGURE, gender: AvatarGenderType.Male },
        ],
        entries: {
            1: [
                line(1, MESSENGER_ENTRY_INFO, 'Bonnie is now online', '', 20, 0),
                line(1, MESSENGER_ENTRY_OTHER, 'Hey! Coming to the quiz tonight?', 'Bonnie', 15, 1),
                line(1, MESSENGER_ENTRY_OWN, 'Sure, see you there', 'Me', 12, 2),
            ],
            2: [ line(2, MESSENGER_ENTRY_OTHER, 'Welcome to the hotel!', 'Frank', 30, 0) ],
        },
        selectedChatId: 1,
    }));

    return <MessengerView />;
};
