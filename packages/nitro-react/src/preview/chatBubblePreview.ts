/**
 * The preview host's chat bubble (`window: 'chatbubble'`, `ChatBubblePreviewView` draws it): a chat
 * style's draft - its reg points, flags and bitmaps, saved or not - drawn as a room draws a line said
 * in it, so a panel shows the game's own bubble before the style is saved. Not a Flash feature.
 */
import { NitroLogger, RoomChatTypeEnum } from '@nitrodevco/nitro-api';
import { loadTexture } from '@nitrodevco/nitro-theme';
import { ChatStyleDefinition, ChatStyleOptionalBitmap, ChatStyleRegPoints } from '@nitrodevco/nitro-theme/chat';

import { ChatBubbleData, ChatStyleTextures, GetChatStyleLibrary } from '#base/chat';

import type { ChatBubbleFile, ChatBubbleMessage } from './previewMessages';

/** The bubble drawn: the line as the room has it and the width it wraps at. */
export interface ChatBubbleShown {
    data: ChatBubbleData;
    width: number;
}

/** What the host says back once a draft is drawn: the bubble's size, and the bitmaps that did not load. */
export interface ChatBubbleReport {
    event: 'bubble';
    width: number;
    height: number;
    failed: string[];
}

/** Draft styles take ids below every style a bundle has, a new one per draft, so a bubble is built anew. */
const FIRST_DRAFT_ID = -1000;

let nextDraftId = FIRST_DRAFT_ID;
let shown: ChatBubbleShown | undefined;
let say: ((report: ChatBubbleReport) => void) | undefined;
let failed: string[] = [];
const listeners = new Set<() => void>();

export const subscribeChatBubble = (listener: () => void) => {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

export const chatBubbleShown = () => shown;

/** Said by the view once the bubble is laid out. */
export const sayChatBubble = (width: number, height: number) => say?.({ event: 'bubble', width, height, failed });

const OPTIONAL: readonly ChatStyleOptionalBitmap[] = [ 'chat_bubble_color', 'icon', 'chat_bubble_emblem', 'chat_bubble_emblem_multiline' ];

const TEXTURE_OF: Record<ChatBubbleFile, keyof ChatStyleTextures> = {
    chat_bubble_base: 'base',
    chat_bubble_pointer: 'pointer',
    selector_preview: 'selectorPreview',
    chat_bubble_color: 'color',
    icon: 'icon',
    chat_bubble_emblem: 'emblem',
    chat_bubble_emblem_multiline: 'emblemMultiline',
};

let drawing: Promise<void> = Promise.resolve();

/**
 * Draws a line in the message's style; `reply` hears its size once drawn, or why it could not be.
 * Drafts are drawn in the order they came; the one drawn before is taken out once the next is up.
 */
export const showChatBubble = (message: ChatBubbleMessage, reply: (report: ChatBubbleReport) => void, error: (message: string) => void) => {
    drawing = drawing.then(async () => {
        const entries = await Promise.all((Object.entries(message.files) as [ ChatBubbleFile, string ][]).map(async ([ file, url ]) => [ file, await loadTexture(url) ] as const));
        const textures: Partial<ChatStyleTextures> = {};

        failed = [];

        for (const [ file, texture ] of entries) {
            if (texture) textures[TEXTURE_OF[file]] = texture;
            else failed.push(file);
        }

        if (!textures.base) {
            error('its chat_bubble_base did not load');

            return;
        }

        const id = nextDraftId--;
        const definition: ChatStyleDefinition = {
            id,
            // Its tinted backgrounds are kept by asset id: a draft's never meet the saved style's.
            assetId: `${message.assetId}~draft${-id}`,
            flags: message.flags,
            regPoints: message.regPoints as unknown as ChatStyleRegPoints,
            bitmaps: OPTIONAL.filter(file => !!textures[TEXTURE_OF[file]]),
        };
        const previous = shown?.data.styleId;

        try {
            GetChatStyleLibrary().addDraftStyle(definition, textures as ChatStyleTextures);
        } catch (err) {
            NitroLogger.warn('Preview chat bubble: the draft style could not be built', err);
            error(`the style could not be built: ${(err instanceof Error) ? err.message : String(err)}`);

            return;
        }

        say = reply;
        shown = {
            width: message.width,
            data: {
                id,
                roomId: 0,
                objectId: -1,
                text: message.text,
                chatType: RoomChatTypeEnum.Speak,
                styleId: id,
                links: [],
                userLocation: undefined,
                timestamp: Date.now(),
                extraParam: 0,
                forcedUserName: message.name,
                forcedFigure: message.figure || undefined,
                forcedColor: message.color,
            },
        };
        listeners.forEach(listener => listener());

        if (previous !== undefined) setTimeout(() => GetChatStyleLibrary().removeStyle(previous), 1000);
    });
};
