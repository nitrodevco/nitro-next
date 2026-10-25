/** An encoded image, and whether it is the whole of what was asked for - only then is it kept. */
export interface DrawnImage {
    image: Buffer;
    complete: boolean;
}

/**
 * Encoded images by request, the least recently used dropped once they add up to more than
 * `maxBytes`: however long the imager runs, the cache holds no more than that. Two requests for
 * one image while it is still being drawn share the drawing. An image that is not complete - a
 * figure part that did not load, a badge part the table does not have - is handed to whoever
 * asked and not kept, so the next request draws it again.
 */
export class ImageCache {
    private readonly _entries = new Map<string, Buffer>();
    private readonly _pending = new Map<string, Promise<DrawnImage | undefined>>();
    private _bytes = 0;

    constructor(private readonly _maxBytes: number) {}

    /** The image for `key`, drawn by `draw` if it isn't kept. `undefined` - nothing to draw - is not kept. */
    public get(key: string, draw: () => Promise<DrawnImage | undefined>): Promise<DrawnImage | undefined> {
        const cached = this._entries.get(key);

        if (cached) {
            // A Map iterates in insertion order: moving the entry to the end marks it most recent.
            this._entries.delete(key);
            this._entries.set(key, cached);

            return Promise.resolve({ image: cached, complete: true });
        }

        let pending = this._pending.get(key);

        if (!pending) {
            pending = draw()
                .then((drawn) => {
                    if (drawn?.complete) this.set(key, drawn.image);

                    return drawn;
                })
                .finally(() => this._pending.delete(key));

            this._pending.set(key, pending);
        }

        return pending;
    }

    public get size(): number {
        return this._entries.size;
    }

    public get bytes(): number {
        return this._bytes;
    }

    private set(key: string, image: Buffer): void {
        if (image.length > this._maxBytes) return;

        this._entries.set(key, image);
        this._bytes += image.length;

        for (const [ oldestKey, oldest ] of this._entries) {
            if (this._bytes <= this._maxBytes) break;

            this._entries.delete(oldestKey);
            this._bytes -= oldest.length;
        }
    }
}
