import { AvatarFigurePartType, AvatarGenderType, AvatarScaleType, AvatarSetType } from '@nitrodevco/nitro-api';
import { GetAssetManager, GetAvatarRenderManager, TexturePool } from '@nitrodevco/nitro-renderer';
import { RenderTexture, Texture } from 'pixi.js';
import { useSyncExternalStore } from 'react';

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

/** Insertion order doubles as recency: a hit re-inserts, an insert past the cap evicts the first entry. */
const cache = new Map<string, ChatAvatarHead>();
/**
 * The texture-less head a figure shows while its libraries download, one per figure. Kept so the
 * same object comes back on every read until the real head replaces it - React compares
 * snapshots by identity - and so the figure is not re-rendered on every read meanwhile.
 */
const placeholders = new Map<string, ChatAvatarHead>();
const listeners = new Map<string, Set<() => void>>();

const headKey = (figure: string): string => `chat:head:${figure}`;

const notify = (figure: string) => {
    for (const listener of listeners.get(figure) ?? []) listener();
};

/** The head is a pooled render texture (`getCroppedImage`): it goes back to the pool and out of the asset manager. */
const releaseHead = (figure: string, entry: ChatAvatarHead) => {
    GetAssetManager().removeTexture(headKey(figure));

    if (entry.texture) TexturePool.releaseTexture(entry.texture as RenderTexture);
};

const evictAvatarHead = (figure: string) => {
    placeholders.delete(figure);

    const entry = cache.get(figure);

    if (entry) {
        cache.delete(figure);
        releaseHead(figure, entry);
    }

    notify(figure);
};

/** `ChatBubbleFactory._Str_7081`: the head at chat size plus the chest colour, cached per figure across every bubble. */
const renderAvatarHead = (figure: string, gender: AvatarGenderType): ChatAvatarHead => {
    const cached = cache.get(figure);

    if (cached) {
        cache.delete(figure);
        cache.set(figure, cached);

        return cached;
    }

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

    while (cache.size > MAX_CACHED_HEADS) {
        const oldest = cache.keys().next().value;

        if (oldest === undefined) break;

        const evicted = cache.get(oldest);

        cache.delete(oldest);

        if (evicted) releaseHead(oldest, evicted);
    }

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

    return useSyncExternalStore(subscribe, () => (figure ? renderAvatarHead(figure, gender) : EMPTY));
};
