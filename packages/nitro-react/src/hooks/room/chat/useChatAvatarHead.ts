import { AvatarFigurePartType, AvatarGenderType, AvatarScaleType, AvatarSetType } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';
import { useEffect, useState } from 'react';

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
const listeners = new Map<string, Set<() => void>>();

const notify = (figure: string) => {
    for (const listener of listeners.get(figure) ?? []) listener();
};

const evictAvatarHead = (figure: string) => {
    const entry = cache.get(figure);

    if (entry) {
        cache.delete(figure);
        entry.texture?.destroy(true);
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
    if (!isPlaceholder) {
        cache.set(figure, entry);

        while (cache.size > MAX_CACHED_HEADS) {
            const oldest = cache.keys().next().value;

            if (oldest === undefined) break;

            cache.get(oldest)?.texture?.destroy(true);
            cache.delete(oldest);
        }
    }

    return entry;
};

/** The speaker's head for a chat bubble; re-renders once a still-downloading figure arrives. */
export const useChatAvatarHead = (figure: string | undefined, gender: AvatarGenderType): ChatAvatarHead => {
    const [ head, setHead ] = useState<ChatAvatarHead>(() => (figure ? renderAvatarHead(figure, gender) : EMPTY));

    useEffect(() => {
        if (!figure) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setHead(EMPTY);

            return;
        }

        const refresh = () => setHead(renderAvatarHead(figure, gender));

        refresh();

        let set = listeners.get(figure);

        if (!set) {
            set = new Set();
            listeners.set(figure, set);
        }

        set.add(refresh);

        return () => {
            set.delete(refresh);

            if (!set.size) listeners.delete(figure);
        };
    }, [ figure, gender ]);

    return head;
};
