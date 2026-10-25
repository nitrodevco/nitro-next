/**
 * A size-capped, least-recently-used cache whose entries can be held by whatever is drawing them.
 * The chat bubble caches (heads, pet faces, tinted backgrounds) used to free their oldest entry the
 * moment they went past their cap - with a bubble still on screen drawing it, which put another
 * speaker's head in the bubble, or a destroyed texture that stops the ticker.
 *
 * An entry is only freed once nothing holds it (`retain` / `release`, by the value itself, so a
 * replaced entry is freed when its last holder lets go) and it was not handed out in the last
 * `graceMs` - the moment between a component reading an entry while rendering and holding it once
 * committed. The cache can go past its cap while that many entries are on screen; it shrinks back
 * as they are let go.
 */
export class RetainedCache<K, V> {
    private readonly _entries = new Map<K, V>();
    private readonly _holds = new Map<V, number>();
    private readonly _handedOutAt = new Map<V, number>();
    /** Values replaced or deleted while held - freed when the last hold goes. */
    private readonly _orphans = new Map<V, K>();

    constructor(
        private readonly _maxSize: number,
        private readonly _free: (key: K, value: V) => void,
        private readonly _graceMs: number = 2000,
    ) {}

    public has(key: K): boolean {
        return this._entries.has(key);
    }

    /** The entry, now the most recently used. */
    public get(key: K): V | undefined {
        const value = this._entries.get(key);

        if (value === undefined) return undefined;

        // Insertion order doubles as recency.
        this._entries.delete(key);
        this._entries.set(key, value);
        this._handedOutAt.set(value, performance.now());

        return value;
    }

    public set(key: K, value: V): void {
        const existing = this._entries.get(key);

        if (existing !== undefined) this.drop(key, existing);

        this._entries.set(key, value);
        this._handedOutAt.set(value, performance.now());

        // Never the entry just added: the caller is about to hand it out.
        this.trim(key);
    }

    /** Forgets the entry - freed now, or when its last holder lets go. */
    public delete(key: K): void {
        const value = this._entries.get(key);

        if (value === undefined) return;

        this._entries.delete(key);
        this.drop(key, value);
    }

    public retain(value: V): void {
        this._holds.set(value, (this._holds.get(value) ?? 0) + 1);
    }

    public release(value: V): void {
        const holds = (this._holds.get(value) ?? 0) - 1;

        if (holds > 0) {
            this._holds.set(value, holds);

            return;
        }

        this._holds.delete(value);

        const orphanKey = this._orphans.get(value);

        if (this._orphans.delete(value)) this.free(orphanKey as K, value);

        this.trim();
    }

    /** Frees every entry at once, held or not - for the owner's own disposal. */
    public clear(): void {
        for (const [ key, value ] of this._entries) this.free(key, value);
        for (const [ value, key ] of this._orphans) this.free(key, value);

        this._entries.clear();
        this._orphans.clear();
        this._holds.clear();
    }

    private drop(key: K, value: V): void {
        if (this._holds.has(value)) this._orphans.set(value, key);
        else this.free(key, value);
    }

    private free(key: K, value: V): void {
        this._handedOutAt.delete(value);
        this._free(key, value);
    }

    /** Frees the least recently used entries nothing holds, oldest first, until back under the cap. */
    private trim(keep?: K): void {
        if (this._entries.size <= this._maxSize) return;

        const now = performance.now();

        for (const [ key, value ] of this._entries) {
            if (this._entries.size <= this._maxSize) break;

            if ((key === keep) || this._holds.has(value) || ((now - (this._handedOutAt.get(value) ?? 0)) < this._graceMs)) continue;

            this._entries.delete(key);
            this.free(key, value);
        }
    }
}
