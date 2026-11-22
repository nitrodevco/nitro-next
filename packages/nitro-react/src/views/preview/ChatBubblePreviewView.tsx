/**
 * The preview host's chat bubble (`window: 'chatbubble'`, `chatBubblePreview.ts`): a line said in a
 * chat style's draft, drawn as the room's bubble draws it - the style's base tinted by the speaker's
 * colour, its pointer, face, emblem and text - at the room's bubble width, on the host's desktop.
 * Not a Flash feature.
 */
import { useLayoutEffect, useSyncExternalStore } from 'react';

import { useChatBubbleVisual } from '#base/hooks';
import { ChatBubbleBody } from '#base/views/room-widgets/chat/ChatBubbleBody';

import { ChatBubbleShown, chatBubbleShown, sayChatBubble, subscribeChatBubble } from './chatBubblePreview';

/** Where the bubble is drawn on the desktop: the panel crops round it. */
const AT = { x: 20, y: 20 };

const Bubble = ({ shown }: { shown: ChatBubbleShown }) => {
    const { style, layout, backgroundTexture, shownFaceTexture, render } = useChatBubbleVisual(shown.data, shown.width);

    useLayoutEffect(() => {
        if (layout) sayChatBubble(Math.round(layout.width), Math.round(layout.height));
    }, [ layout ]);

    if (!style || !layout || !backgroundTexture) return null;

    return (
        <pixiContainer
            x={AT.x}
            y={AT.y}
            eventMode="none"
        >
            <ChatBubbleBody
                style={style}
                layout={layout}
                backgroundTexture={backgroundTexture}
                shownFaceTexture={shownFaceTexture}
                render={render}
            />
        </pixiContainer>
    );
};

export const ChatBubblePreviewView = () => {
    const shown = useSyncExternalStore(subscribeChatBubble, chatBubbleShown);

    if (!shown) return null;

    return (
        <Bubble
            key={shown.data.id}
            shown={shown}
        />
    );
};
