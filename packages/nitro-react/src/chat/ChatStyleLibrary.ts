import { NitroLogger } from '@nitrodevco/nitro-api';
import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { Texture } from 'pixi.js';

import { loadAssetBundle } from '#base/utils';

import { ChatStyle, IChatStyle } from './ChatStyle';
import { CHAT_STYLE_DEFAULT_ID, chatStyleAssetName, ChatStyleDefinition, ChatStyleOptionalBitmap } from './ChatStyleDefinitions';

/** What `scripts/build-asset-bundles.ts` writes into `chat-styles.nitro` beside the bitmaps. */
interface ChatStyleCatalogue {
    defaultId: number;
    styles: ChatStyleDefinition[];
}

const BUNDLE_NAME = 'chat-styles';

/**
 * The Flash `ChatStyleLibrary`: every style in `chatstyles.xml`, read out of the `chat-styles`
 * bundle - the catalogue (`chat-style-definitions.json`) and the bitmaps it describes arrive
 * together in one archive, and the bitmaps are already decoded into the shared asset manager, so
 * the room and the UI draw one copy. `load()` is awaited at boot; `getStyle` falls back to the
 * default style for unknown ids exactly like the client did. A style whose bitmaps are missing is
 * skipped with a warning rather than aborting the whole library - that too mirrors the client's
 * per-style try/catch.
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
        if (!await loadAssetBundle(BUNDLE_NAME)) {
            NitroLogger.error('ChatStyleLibrary: the chat-styles bundle failed to load - no chat style is available');

            return;
        }

        const catalogue = GetAssetManager().getBundleFile<ChatStyleCatalogue>(BUNDLE_NAME, 'chat-style-definitions');

        if (!catalogue?.styles?.length) {
            NitroLogger.error('ChatStyleLibrary: the chat-styles bundle carries no style catalogue');

            return;
        }

        const styles = catalogue.styles.map((definition) => {
            try {
                return this.loadStyle(definition);
            } catch (err) {
                NitroLogger.warn(`Error initializing chat style: ${definition.id}`, err);

                return undefined;
            }
        });

        // In `chatstyles_xml` order, which is the order `getStyleIds` - and so the style picker - lists them.
        for (const style of styles) {
            if (style) this._styles.set(style.id, style);
        }

        // Every bubble bitmap is pixel art stretched through a nine-slice - never filter it.
        for (const style of this._styles.values()) {
            for (const texture of style.textures) texture.source.scaleMode = 'nearest';
        }

        this._isLoaded = true;

        // Every style is built; the catalogue behind them is not read again.
        GetAssetManager().releaseBundleData(BUNDLE_NAME);
    }

    private loadStyle(definition: ChatStyleDefinition): ChatStyle {
        const { assetId, regPoints, bitmaps } = definition;
        const base = this.getTexture(assetId, 'chat_bubble_base');

        if (!base) throw new Error(`missing chat_bubble_base for ${assetId}`);

        const optional = (file: ChatStyleOptionalBitmap) => (bitmaps.includes(file) ? this.getTexture(assetId, file) : undefined);

        // Flash reads the pointer only for a style that is not anonymous, and an emblem only where its regpoint is set.
        return new ChatStyle(definition, {
            base,
            pointer: regPoints.anonymous ? undefined : this.getTexture(assetId, 'chat_bubble_pointer'),
            color: optional('chat_bubble_color'),
            selectorPreview: this.getTexture(assetId, 'selector_preview'),
            icon: optional('icon'),
            emblem: regPoints.emblemXY ? optional('chat_bubble_emblem') : undefined,
            emblemMultiline: regPoints.emblemMultilineXY ? optional('chat_bubble_emblem_multiline') : undefined,
        });
    }

    /** Every bitmap is already in the asset manager: the bundle put it there when it was read. */
    private getTexture(assetId: string, file: Parameters<typeof chatStyleAssetName>[1]): Texture | undefined {
        return GetAssetManager().getTexture(chatStyleAssetName(assetId, file));
    }
}

let library: ChatStyleLibrary | undefined;

/** The one library the chat bubbles and the chat input's style picker share. */
export const GetChatStyleLibrary = (): ChatStyleLibrary => {
    library ??= new ChatStyleLibrary();

    return library;
};

/** Kicks off (or joins) the `chat-styles` bundle load - awaited at boot beside the theme's. */
export const preloadChatStyles = (): Promise<void> => GetChatStyleLibrary().load();
