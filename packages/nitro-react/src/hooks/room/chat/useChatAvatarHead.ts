/**
 * The speaker's head and chest colour for a chat bubble, rendered once per figure and cached for
 * every bubble; a figure still downloading re-renders its bubbles when it lands.
 */
import { AvatarFigurePartType, AvatarGenderType, AvatarScaleType, AvatarSetType } from '@nitrodevco/nitro-api';
import { GetAssetManager, GetAvatarRenderManager, TexturePool } from '@nitrodevco/nitro-renderer';
import { RenderTexture, Texture } from 'pixi.js';
import { useLayoutEffect, useSyncExternalStore } from 'react';

import { RetainedCache } from '#base/utils';

export interface ChatAvatarHead {
    texture: Texture | undefined;
    /** The figure's chest colour - the "normal" bubble style is tinted with it. */
    chestColor: number | undefined;
}

/** Flash rendered the "small" head as the large head at half size when zoom was enabled - which it always is here (64px room scale). */
const HEAD_SCALE = 0.5;
const EMPTY: ChatAvatarHead = { texture: undefined, chestColor: undefined };

/** Bounds GPU memory in a busy hotel - the oldest untouched figure's head is dropped past this many. */
const MAX_CACHED_HEADS = 64;

const headKey = (figure: string): string => `chat:head:${figure}`;

/** The head is a pooled render texture (`getCroppedImage`): it goes back to the pool and out of the asset manager. */
const releaseHead = (figure: string, entry: ChatAvatarHead) => {
    if (GetAssetManager().getTexture(headKey(figure)) === entry.texture) GetAssetManager().removeTexture(headKey(figure));

    if (entry.texture) TexturePool.releaseTexture(entry.texture as RenderTexture);
};

/** Least recently used past the cap - but never a head a bubble on screen still shows (`RetainedCache`). */
const cache = new RetainedCache<string, ChatAvatarHead>(MAX_CACHED_HEADS, releaseHead);
/**
 * The texture-less head a figure shows while its libraries download, one per figure. Kept so the
 * same object comes back on every read until the real head replaces it - React compares
 * snapshots by identity - and so the figure is not re-rendered on every read meanwhile.
 */
const placeholders = new Map<string, ChatAvatarHead>();
const listeners = new Map<string, Set<() => void>>();

const notify = (figure: string) => {
    for (const listener of listeners.get(figure) ?? []) listener();
};

const evictAvatarHead = (figure: string) => {
    placeholders.delete(figure);
    // A bubble still showing the old head keeps it until it re-renders with the new one.
    cache.delete(figure);

    notify(figure);
};

/** `ChatBubbleFactory._Str_7081`: the head at chat size plus the chest colour, cached per figure across every bubble. */
const renderAvatarHead = (figure: string, gender: AvatarGenderType): ChatAvatarHead => {
    const cached = cache.get(figure);

    if (cached) return cached;

    const placeholder = placeholders.get(figure);

    if (placeholder) return placeholder;

    const avatarImage = GetAvatarRenderManager().createAvatarImage(
        figure,
        AvatarScaleType.Large,
        gender,
        { resetFigure: () => evictAvatarHead(figure) },
        { resetEffect: () => evictAvatarHead(figure) },
    );

    if (!avatarImage) return EMPTY;

    const entry: ChatAvatarHead = {
        texture: avatarImage.getCroppedImage(AvatarSetType.Head, false, HEAD_SCALE),
        chestColor: avatarImage.getPartColor(AvatarFigurePartType.Chest)?.rgb,
    };
    const isPlaceholder = avatarImage.isPlaceholder();

    avatarImage.dispose();

    // A placeholder means the figure's libraries are still downloading - `resetFigure` fires
    // when they land and every bubble showing this figure re-renders with the real head.
    if (isPlaceholder) {
        if (entry.texture) TexturePool.releaseTexture(entry.texture as RenderTexture);

        const waiting: ChatAvatarHead = { texture: undefined, chestColor: entry.chestColor };

        placeholders.set(figure, waiting);

        return waiting;
    }

    if (entry.texture) GetAssetManager().setTexture(headKey(figure), entry.texture);

    cache.set(figure, entry);

    return entry;
};

/** The speaker's head for a chat bubble; re-renders once a still-downloading figure arrives. */
export const useChatAvatarHead = (figure: string | undefined, gender: AvatarGenderType): ChatAvatarHead => {
    const subscribe = (onChange: () => void) => {
        if (!figure) return () => {};

        let set = listeners.get(figure);

        if (!set) {
            set = new Set();
            listeners.set(figure, set);
        }

        set.add(onChange);

        return () => {
            set.delete(onChange);

            if (!set.size) listeners.delete(figure);
        };
    };

    const head = useSyncExternalStore(subscribe, () => (figure ? renderAvatarHead(figure, gender) : EMPTY));

    // Held while shown, so the cache cannot hand its texture back to the pool under the bubble.
    useLayoutEffect(() => {
        if (!head.texture) return;

        cache.retain(head);

        return () => cache.release(head);
    }, [ head ]);

    return head;
};
