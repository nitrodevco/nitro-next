/**
 * One run of messages in a conversation - the window manager's `IlluminaChatBubbleWidget`, which
 * builds its `illumina_chat_bubble` template into the messenger's `msg_normal` widget (its
 * `rootWindow`, the widget resized to hold it). The port adds the bubble's window to the
 * conversation list itself, as the clone `MainView.createChatItem` makes, `conversationItemWidth`
 * wide: the sender's figure in `user_avatar`, the speech arrow (`arrow_point`), then `bubble_wrapper`
 * - the name (`user_name`, a link to the profile for a user), the messages (`message_container`,
 * one clone of `message_template` or `habbicon_template` each) in a style 106 border, the post time
 * (`post_time`, an `UpdatingTimeStampWidget`: `FriendlyTime` with `.ago`, from 1 of a unit), and
 * `offline_placeholder` - the persisted-message note, 16 high for an own message to an offline
 * friend and 0 otherwise (`friendOnlineStatus`).
 *
 * `refresh` lays it out: `bubble_wrapper` is the bubble's width less the figure's window, each text
 * the wrapper's width less 5 and a habbicon 80x80; `flipped` is a friend's bubble - the figure's
 * window on the right facing left (direction 4), the arrow at its left edge pointing right (`zoomX`
 * 1), the wrapper at 0. An own message is drawn grey (`0x8a8a8a`) - a habbicon at 0.45 - while it
 * waits for the server's confirmation (`setAwaitingConfirmationId` / `applyConfirmationVisual`). A
 * habbicon message is its preview at twice its size, 80x80 (`createHabbiconBitmap`), from
 * `habbiconsStore.previews` - empty until the habbicon assets have loaded, as Flash's is until
 * `habbicon_assets_loaded`.
 *
 * Only what a bubble shows is carried: the widget's property API (`properties`,
 * `getSerializedMessages`, `getMessagesFromProperty`) and its imperative message list
 * (`appendMessage`, `setMessage`) are the arguments here. Not carried: `shouldMirrorHabbicon` -
 * Flash mirrors a habbicon that faces away from the bubble's side, by
 * `HabbiconAssetManager.getDirection`, which the port's habbicon assets do not load.
 */
import { AvatarGenderType } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';

import { AvatarImage } from '#base/components/AvatarImage';
import { MessengerChatEntry } from '#base/context/messenger';
import { findTemplateChild, LayoutWindow, Template, TemplateElement, TemplateItem, TemplateWindows, ThemeImage, UpdatingTimeStampWidget } from '#base/theme';

export const MESSENGER_CHAT_BUBBLE_TEMPLATE = 'habbo-window-manager-com/illumina_chat_bubble_xml';

/** `refresh`: a text is the wrapper's width less this. */
const MESSAGE_INSET = 5;
/** `setAwaitingConfirmationId`'s `9079434`, and the habbicon's `PENDING_MESSAGE_BLEND`. */
const PENDING_COLOR = 0x8a8a8a;
const PENDING_BLEND = 0.45;
/** `createHabbiconMessage`: the habbicon's window. */
const HABBICON_SIZE = 80;
/** `friendOnlineStatus`: the persisted-message note's height while it shows. */
const OFFLINE_HEIGHT = 16;

/**
 * The bubble's root, as built for a side: a friend's has `arrow_point` at `zoomX` 1 (`refresh`), its
 * own copy so that the two never share an element. Made once per template.
 */
const flippedTemplates = new WeakMap<Template, Template>();

const bubbleTemplate = (template: Template, flipped: boolean): Template => {
    if (!flipped) return template;

    let made = flippedTemplates.get(template);

    if (!made) {
        const elements = structuredClone(template.elements);
        const arrow = findTemplateChild(elements, 'arrow_point');

        if (arrow) arrow.vars = { ...arrow.vars, zoom_x: 1 };

        made = { ...template, elements };
        flippedTemplates.set(template, made);
    }

    return made;
};

/** The figure's window - `user_avatar`'s parent - whose width `refresh` leaves `bubble_wrapper` less of. */
const figureWindowWidth = (template: Template): number => {
    const parentOf = (elements: readonly TemplateElement[]): TemplateElement | undefined => {
        for (const element of elements) {
            if (element.children.some(child => child.name === 'user_avatar')) return element;

            const found = parentOf(element.children);

            if (found) return found;
        }

        return undefined;
    };

    return parentOf(template.elements)?.width ?? 0;
};

/**
 * `refresh`'s widths, held: Flash sets them again on every `WE_RESIZED` / `WE_CHILD_RESIZED` of the
 * bubble (the root's `limits` fixed while it does), so a child growing it - the style 106 border at
 * its layout's 207 - never widens it past them. The port lays the bubble out once, so it keeps them
 * as limits.
 */
const pinWidth = (window: LayoutWindow | undefined, width: number) => {
    if (!window) return;

    window.minWidth = width;
    window.maxWidth = width;
    window.setWidth(width);
};

/** How a message's text is captioned: a text key `MainView` recorded, or the text as written - never read as a key. */
export const messengerCaption = (text: string, localized: boolean | undefined) => {
    if (localized) return `\${${text}}`;

    // `TextController` reads a caption starting with `${` as a key: the space keeps it as written (`escapeExternalKeys`).
    return text.startsWith('${') ? ` ${text}` : text;
};

export interface MessengerChatBubbleArgs {
    key: string;
    entries: readonly MessengerChatEntry[];
    flipped: boolean;
    /** `conversationItemWidth`. */
    width: number;
    figure: string;
    gender: AvatarGenderType;
    userName: string;
    userId: number;
    /** `friendOnlineStatus = false`: an own message to an offline friend who reads it later. */
    persistedForOffline: boolean;
    habbiconPreviews: Readonly<Record<number, Texture>>;
    onProfile: (userId: number) => void;
}

export const messengerChatBubbleItem = (template: Template, args: MessengerChatBubbleArgs): TemplateItem => {
    const { key, entries, flipped, width, figure, gender, userName, userId, persistedForOffline, habbiconPreviews, onProfile } = args;
    const last = entries[entries.length - 1];
    // `refresh`'s text width, set on each text as it goes in - before the bubble's own windows are laid out again.
    const messageWidth = width - figureWindowWidth(template) - MESSAGE_INSET;
    // `message_container`'s two prototypes, which the widget takes out of its own layout.
    const source = bubbleTemplate(template, flipped);
    const textPrototype = findTemplateChild(source.elements, 'message_template');
    const habbiconPrototype = findTemplateChild(source.elements, 'habbicon_template');

    const messages = entries.flatMap((entry, index): TemplateItem[] => {
        const pending = entry.awaitConfirmationId > 0;

        if (!textPrototype || !habbiconPrototype) return [];

        if (entry.message.habbiconId > 0) {
            const preview = habbiconPreviews[entry.message.habbiconId];

            return [ {
                key: String(index),
                from: habbiconPrototype,
                bindings: {
                    '': { visible: true, alpha: pending ? PENDING_BLEND : 1 },
                    habbicon_bitmap: {
                        children: preview && (
                            <ThemeImage
                                texture={preview}
                                width={HABBICON_SIZE}
                                height={HABBICON_SIZE}
                                eventMode="none"
                            />
                        ),
                    },
                },
                arrange: ({ root }: TemplateWindows) => {
                    root()?.setRectangle(root()?.x ?? 0, root()?.y ?? 0, HABBICON_SIZE, HABBICON_SIZE);
                },
            } ];
        }

        return [ {
            key: String(index),
            from: textPrototype,
            bindings: { '': { caption: messengerCaption(entry.message.text, entry.message.localized), color: pending ? PENDING_COLOR : 0 } },
            arrange: ({ root }: TemplateWindows) => {
                root()?.setWidth(messageWidth);
            },
        } ];
    });

    return {
        key,
        from: source,
        bindings: {
            user_avatar: {
                children: (
                    <AvatarImage
                        figure={figure}
                        gender={gender}
                        direction={flipped ? 4 : 2}
                    />
                ),
            },
            user_name: { caption: `${userName}:` },
            user_name_region: { onPointerTap: (userId > 0) ? () => onProfile(userId) : undefined },
            message_container: { items: messages },
            // `sentAt` is a `performance.now()` time: from the page's time origin, it is the epoch time the widget takes.
            post_time: { children: <UpdatingTimeStampWidget timeStamp={performance.timeOrigin + last.sentAt} /> },
        },
        arrange: ({ find, root }: TemplateWindows) => {
            const bubble = root();
            const wrapper = find('bubble_wrapper');
            const avatar = find('user_avatar')?.parent;
            const arrow = find('arrow_point');

            if (!bubble || !wrapper || !avatar || !arrow) return;

            pinWidth(bubble, width);
            find('offline_placeholder')?.setHeight(persistedForOffline ? OFFLINE_HEIGHT : 0);
            pinWidth(wrapper, bubble.width - avatar.width);
            pinWidth(find('message_container'), wrapper.width);
            pinWidth(find('spaced_message_container'), wrapper.width);

            if (flipped) {
                avatar.setX(bubble.width - avatar.width);
                arrow.setX(avatar.x);
                wrapper.setX(0);
            } else {
                avatar.setX(0);
                arrow.setX((avatar.x + avatar.width) - arrow.width);
                wrapper.setX(avatar.x + avatar.width);
            }
        },
    };
};
