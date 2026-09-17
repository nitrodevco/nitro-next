import { AvatarGenderType, AvatarScaleType, AvatarSetType, IAvatarImage } from '@nitrodevco/nitro-api';
import { GetAvatarRenderManager, TexturePool, TextureUtils } from '@nitrodevco/nitro-renderer';
import { RenderTexture, Texture } from 'pixi.js';
import { useSyncExternalStore } from 'react';

export interface AvatarImageTexture {
    texture: Texture | undefined;
    width: number;
    height: number;
}

const EMPTY: AvatarImageTexture = { texture: undefined, width: 0, height: 0 };

interface AvatarRenderRequest {
    figure: string;
    gender: AvatarGenderType;
    headOnly: boolean;
    direction: number;
    scale: number;
}

interface AvatarRender {
    request: AvatarRenderRequest;
    result: AvatarImageTexture;
    avatarImage: IAvatarImage | undefined;
    reduced: RenderTexture | undefined;
    subscribers: Set<() => void>;
    disposed: boolean;
}

const renders = new Map<string, AvatarRender>();

const renderKey = ({ figure, gender, headOnly, direction, scale }: AvatarRenderRequest) => `${figure}|${gender}|${headOnly ? 1 : 0}|${direction}|${scale}`;

const releaseRender = (render: AvatarRender) => {
    if (render.reduced) TexturePool.releaseTexture(render.reduced);

    render.avatarImage?.dispose();
    render.avatarImage = undefined;
    render.reduced = undefined;
};

/** (Re)draws a render - on first use, and again whenever its libraries or effect finish loading. */
const drawRender = (key: string, render: AvatarRender) => {
    releaseRender(render);

    const { figure, gender, headOnly, direction, scale } = render.request;
    // The imager calls back when a download it started lands; the render is redrawn then, once
    // the current call has returned, and only while someone is still showing it.
    const redraw = () => queueMicrotask(() => {
        if (render.disposed) return;

        drawRender(key, render);

        for (const subscriber of render.subscribers) subscriber();
    });

    const avatarImage = GetAvatarRenderManager().createAvatarImage(figure, AvatarScaleType.Large, gender, { resetFigure: redraw }, { resetEffect: redraw });

    render.avatarImage = avatarImage;

    if (!avatarImage) {
        render.result = EMPTY;

        return;
    }

    const setType = headOnly ? AvatarSetType.Head : AvatarSetType.Full;

    avatarImage.setDirection(setType, direction);

    const full = avatarImage.getImage(setType, false, 1);

    render.reduced = (full && scale !== 1) ? TextureUtils.createReducedTexture(full, scale) : undefined;

    const texture = (scale !== 1) ? render.reduced : full;

    render.result = texture ? { texture, width: texture.width, height: texture.height } : EMPTY;
};

const subscribeRender = (request: AvatarRenderRequest, onChange: () => void) => {
    const key = renderKey(request);
    let render = renders.get(key);

    if (!render) {
        render = { request, result: EMPTY, avatarImage: undefined, reduced: undefined, subscribers: new Set(), disposed: false };
        renders.set(key, render);
        drawRender(key, render);
    }

    const current = render;

    current.subscribers.add(onChange);

    return () => {
        current.subscribers.delete(onChange);

        // Released a moment later rather than at once, so a component that unsubscribes and
        // subscribes straight back (a re-subscribe, StrictMode's double effect) keeps its render.
        queueMicrotask(() => {
            if (current.subscribers.size || current.disposed) return;

            current.disposed = true;
            renders.delete(key);
            releaseRender(current);
        });
    };
};

/**
 * Renders a figure through the avatar render manager and hands back the render texture it
 * draws into - `IAvatarImage.getImage()` - directly. The previous path (`getCroppedImageAsync`)
 * read that texture back off the GPU as a base64 PNG, decoded it into an `<img>` and uploaded
 * it a second time with `Texture.from`; here the one texture the avatar was rendered into is
 * the one the sprite shows.
 *
 * The `AvatarImage` instance owns that texture (plus a cache of body-part textures), so it is
 * disposed as soon as nothing shows that render any more - before this, every figure change
 * created a new instance and never released the old one, which is what made the avatar editor's
 * memory climb with every part clicked. Renders are shared: two components showing the same
 * figure the same way hold one render between them, counted by subscription.
 *
 * A `scale` other than 1 hands back a reduced copy instead (`TextureUtils.createReducedTexture`:
 * smoothed and sharpened the way the Flash client shrank its renders) - stretching the sprite
 * would drop pixel rows of the pixel art and look squashed. That copy is owned here too.
 */
export const useAvatarImageTexture = (
    figure: string | undefined,
    gender: AvatarGenderType,
    { headOnly = false, direction = 0, scale = 1 }: { headOnly?: boolean; direction?: number; scale?: number } = {},
): AvatarImageTexture => {
    const subscribe = (onChange: () => void) => (figure ? subscribeRender({ figure, gender, headOnly, direction, scale }, onChange) : () => {});

    // Nothing is drawn by reading: the first render shows nothing until the subscription has drawn it.
    const getSnapshot = () => (figure ? (renders.get(renderKey({ figure, gender, headOnly, direction, scale }))?.result ?? EMPTY) : EMPTY);

    return useSyncExternalStore(subscribe, getSnapshot);
};
