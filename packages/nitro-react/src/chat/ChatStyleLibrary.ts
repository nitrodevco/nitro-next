import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';

import { ChatStyle, IChatStyle } from './ChatStyle';
import { CHAT_STYLE_DEFAULT_ID, CHAT_STYLE_DEFINITIONS, chatStyleAssetUrl, ChatStyleDefinition } from './ChatStyleDefinitions';

/**
 * The Flash `ChatStyleLibrary`: every style in `chatstyles.xml`, its bitmaps loaded once through
 * the shared asset manager (so the room and the UI share one decoded copy). `load()` is awaited
 * at boot alongside the theme atlas; `getStyle` falls back to the default style for unknown
 * ids exactly like the client did. A style whose bitmaps failed to load is skipped with a
 * warning rather than aborting the whole library - that too mirrors the client's per-style
 * try/catch.
 */
export class ChatStyleLibrary {
    private readonly _styles: Map<number, ChatStyle> = new Map();
    private _loadPromise: Promise<void> | undefined;
    private _isLoaded: boolean = false;

    public load(): Promise<void> {
        this._loadPromise ??= this.loadStyles();

        return this._loadPromise;
    }

    public get isLoaded(): boolean {
        return this._isLoaded;
    }

    public getStyleIds(): number[] {
        return Array.from(this._styles.keys());
    }

    public hasStyle(styleId: number): boolean {
        return this._styles.has(styleId);
    }

    public getStyle(styleId: number): IChatStyle | undefined {
        return this._styles.get(styleId) ?? this._styles.get(CHAT_STYLE_DEFAULT_ID);
    }

    public getChatStyle(styleId: number): ChatStyle | undefined {
        return this._styles.get(styleId) ?? this._styles.get(CHAT_STYLE_DEFAULT_ID);
    }

    public dispose(): void {
        for (const style of this._styles.values()) style.dispose();

        this._styles.clear();
        this._loadPromise = undefined;
        this._isLoaded = false;
    }

    private async loadStyles(): Promise<void> {
        await Promise.all(CHAT_STYLE_DEFINITIONS.map(async (definition) => {
            try {
                const style = await this.loadStyle(definition);

                if (style) this._styles.set(definition.id, style);
            } catch (err) {
                NitroLogger.warn(`Error initializing chat style: ${definition.id}`, err);
            }
        }));

        // Every bubble bitmap is pixel art stretched through a nine-slice - never filter it.
        for (const style of this._styles.values()) {
            for (const texture of [ style.baseTexture, style.pointerTexture, style.iconTexture, style.selectorPreviewTexture ]) {
                if (texture) texture.source.scaleMode = 'nearest';
            }
        }

        this._isLoaded = true;
    }

    private async loadStyle(definition: ChatStyleDefinition): Promise<ChatStyle | undefined> {
        const { assetId, regPoints, hasColorLayer, hasIcon } = definition;
        const base = await this.loadTexture(chatStyleAssetUrl(assetId, 'chat_bubble_base'));

        if (!base) throw new Error(`missing chat_bubble_base for ${assetId}`);

        const [ pointer, color, selectorPreview, icon ] = await Promise.all([
            regPoints.anonymous ? Promise.resolve(undefined) : this.loadTexture(chatStyleAssetUrl(assetId, 'chat_bubble_pointer')),
            hasColorLayer ? this.loadTexture(chatStyleAssetUrl(assetId, 'chat_bubble_color')) : Promise.resolve(undefined),
            this.loadTexture(chatStyleAssetUrl(assetId, 'selector_preview')),
            hasIcon ? this.loadTexture(chatStyleAssetUrl(assetId, 'icon')) : Promise.resolve(undefined),
        ]);

        return new ChatStyle(definition, { base, pointer, color, selectorPreview, icon });
    }

    private async loadTexture(url: string): Promise<Texture | undefined> {
        const assetManager = GetAssetManager();
        const existing = assetManager.getTexture(url);

        if (existing) return existing;

        await assetManager.downloadAsset(url);

        return assetManager.getTexture(url);
    }
}

let library: ChatStyleLibrary | undefined;

/** The one library the chat bubbles and the chat input's style picker share. */
export const GetChatStyleLibrary = (): ChatStyleLibrary => {
    library ??= new ChatStyleLibrary();

    return library;
};

/** Kicks off (or joins) the bitmap download - awaited at boot next to the theme atlas. */
export const preloadChatStyles = (): Promise<void> => GetChatStyleLibrary().load();
