/**
 * A trax song's score - Flash's `TraxData`, with `TraxChannel` and `TraxChannelItem`. The song
 * data `TraxSongInfoMessage` carries is `<channel>:<sample>,<bars>;<sample>,<bars>;...:` repeated
 * per channel, optionally followed by a `meta` part of `key,value;` pairs (`c` the cut mode of the
 * old editor, `t` its tempo). Sample 0 is silence, and is downloaded like any other.
 */
export class TraxChannelItem {
    constructor(
        public readonly id: number,
        /** Bars. */
        public readonly length: number,
    ) {}
}

export class TraxChannel {
    private readonly _items: TraxChannelItem[] = [];

    constructor(public readonly id: number) {}

    public get itemCount(): number {
        return this._items.length;
    }

    public addChannelItem(item: TraxChannelItem): void {
        this._items.push(item);
    }

    public getItem(index: number): TraxChannelItem | null {
        return this._items[index] ?? null;
    }
}

export class TraxData {
    private readonly _channels: TraxChannel[] = [];
    private readonly _metaData = new Map<string, string>();

    constructor(data: string) {
        let parts = data.split(':');
        const last = parts[parts.length - 1] ?? '';

        if (last.indexOf('meta') !== -1) {
            for (const pair of last.split(';')) {
                const [ key = '', value = '' ] = pair.split(',');

                if (!this._metaData.has(key)) this._metaData.set(key, value);
            }

            parts = parts.slice(0, parts.length - 1);
        }

        for (let i = 0; i < (parts.length / 2); i++) {
            const channelId = parts[i * 2] ?? '';

            if (!channelId.length) continue;

            const channel = new TraxChannel(parseInt(channelId, 10));

            for (const item of (parts[(i * 2) + 1] ?? '').split(';')) {
                const values = item.split(',');

                // Flash gives up on the whole score at the first malformed item, keeping the channels before it.
                if (values.length !== 2) return;

                channel.addChannelItem(new TraxChannelItem(parseInt(values[0], 10), parseInt(values[1], 10)));
            }

            this._channels.push(channel);
        }
    }

    public get channels(): TraxChannel[] {
        return this._channels;
    }

    public getSampleIds(): number[] {
        const ids: number[] = [];

        for (const channel of this._channels) {
            for (let i = 0; i < channel.itemCount; i++) {
                const item = channel.getItem(i);

                if (item && !ids.includes(item.id)) ids.push(item.id);
            }
        }

        return ids;
    }

    public get hasMetaData(): boolean {
        return this._metaData.has('meta');
    }

    public get metaCutMode(): boolean {
        return this._metaData.get('c') === '1';
    }

    public get metaTempo(): number {
        return Number(this._metaData.get('t') ?? 0);
    }
}
