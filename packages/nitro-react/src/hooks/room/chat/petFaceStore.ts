/**
 * The pet faces drawn by the room engine, shared by key across everything that shows one:
 * `ChatBubbleFactory._petImageCache` and its `imageReady`. A pet whose library is still downloading
 * is drawn as the engine's placeholder; `getPetImage` hands the factory itself as the listener, and
 * `imageReady` puts the finished image in the cache in the placeholder's place (`petImageReady` sets
 * the placeholder aside to be disposed). Without a listener the engine never sends the finished
 * image, so a placeholder - a pet that barks as its owner walks in - stayed the pet's face all session.
 *
 * Flash files the finished image under the figure string alone, not the figure-and-posture key it
 * cached the placeholder under, so a later bubble still found the placeholder; here the finished
 * image replaces the entry the placeholder is under. Flash's bubble kept the bitmap it was built
 * with; here whatever watches the key is told, and shows the finished face.
 *
 * Kept free of runtime imports beyond `RetainedCache`, so a test can run it.
 */
import { RetainedCache } from '#base/utils/RetainedCache';

/** What a render is handed: `IGetImageListener`, which delivers a pet still downloading to `textureReady` once it lands. */
export interface PetFaceListener<T> {
    imageReady(): void;
    imageFailed(): void;
    textureReady(face: T): void;
}

export interface PetFaceStore<T> {
    /** The face under `key`, now the most recently used. */
    get(key: string): T | undefined;
    /** Draws the face for `key` unless it is cached or being drawn; `render` hands the listener on to the engine. */
    request(key: string, render: (listener: PetFaceListener<T>) => Promise<T | undefined>): void;
    /** Calls `onChange` whenever the face under `key` is stored, replaced or dropped. */
    watch(key: string, onChange: () => void): () => void;
    /** Held while shown, so the cache cannot free it under whatever draws it (`RetainedCache`). */
    retain(face: T): void;
    release(face: T): void;
}

/**
 * `store` runs as a face goes into the cache, before the face it replaces is let go; `free` frees a
 * face nothing will show any more - one the cache dropped, or a placeholder the finished image
 * arrived ahead of.
 */
export const createPetFaceStore = <T>(maxSize: number, store: (key: string, face: T) => void, free: (key: string, face: T) => void): PetFaceStore<T> => {
    const cache = new RetainedCache<string, T>(maxSize, free);
    const drawing = new Set<string>();
    const watchers = new Map<string, Set<() => void>>();

    const notify = (key: string) => {
        for (const onChange of watchers.get(key) ?? []) onChange();
    };

    const put = (key: string, face: T) => {
        store(key, face);
        cache.set(key, face);
        notify(key);
    };

    return {
        get: key => cache.get(key),
        request: (key, render) => {
            if (cache.has(key) || drawing.has(key)) return;

            drawing.add(key);

            // The face drawn straight away - a placeholder while the pet downloads - and whether the engine has answered since.
            let drawn: T | undefined = undefined;
            let answered = false;

            const listener: PetFaceListener<T> = {
                imageReady: () => {},
                textureReady: (face) => {
                    answered = true;

                    put(key, face);
                },
                // The finished pet drew nothing: no placeholder is left in its place, so the next to ask draws it again.
                imageFailed: () => {
                    answered = true;

                    if ((drawn === undefined) || (cache.get(key) !== drawn)) return;

                    cache.delete(key);
                    notify(key);
                },
            };

            void render(listener).then((face) => {
                if (face === undefined) return;

                if (answered) {
                    free(key, face);

                    return;
                }

                drawn = face;

                put(key, face);
            }, () => undefined).finally(() => drawing.delete(key));
        },
        watch: (key, onChange) => {
            let keyWatchers = watchers.get(key);

            if (!keyWatchers) {
                keyWatchers = new Set();
                watchers.set(key, keyWatchers);
            }

            keyWatchers.add(onChange);

            return () => {
                keyWatchers.delete(onChange);

                if (!keyWatchers.size && (watchers.get(key) === keyWatchers)) watchers.delete(key);
            };
        },
        retain: face => cache.retain(face),
        release: face => cache.release(face),
    };
};
