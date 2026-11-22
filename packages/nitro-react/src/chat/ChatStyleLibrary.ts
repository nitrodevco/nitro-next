import { GetConfigValue, NitroLogger } from '@nitrodevco/nitro-api';
import { GetAssetManager } from '@nitrodevco/nitro-renderer';
import { CHAT_STYLE_DEFAULT_ID, chatStyleAssetName, ChatStyleDefinition, ChatStyleOptionalBitmap } from '@nitrodevco/nitro-theme/chat';
import { Texture } from 'pixi.js';

import { assetBundleUrl, loadAssetBundle } from '#base/utils';

import { CHAT_BUBBLES_KEY, chatBubbleStyleTheme, ChatBubbleTheme, ChatBubbleTint, parseChatBubbleTheme, setChatBubbleTheme } from './chatBubbleTheme';
import { ChatStyle, ChatStyleTextures, IChatStyle } from './ChatStyle';

/** What Nitro Studio writes into the `habbo-free-flow-chat-com` library's bundle beside the bitmaps. */
interface ChatStyleCatalogue {
    defaultId: number;
    styles: ChatStyleDefinition[];
}

/** The library the styles come from, whose template bundle carries them (`loadTemplateBundle`). */
const BUNDLE_NAME = 'habbo-free-flow-chat-com';

/**
 * The Flash `ChatStyleLibrary`: every style in `chatstyles.xml`, read out of the
 * `habbo-free-flow-chat-com` bundle - the catalogue (`chat-style-definitions.json`) and the bitmaps it describes arrive
 * together in one archive, and the bitmaps are already decoded into the shared asset manager, so
 * the room and the UI draw one copy. `load()` is awaited at boot; `getStyle` falls back to the
 * default style for unknown ids exactly like the client did. A style whose bitmaps are missing is
 * skipped with a warning rather than aborting the whole library - that too mirrors the client's
 * per-style try/catch.
 *
 * The hotel serves the bundle - the client's styles and its own, built by Nitro Studio's chat bubble
 * builder - as the `habbo-free-flow-chat-com` library's template bundle, at `asset.bundles.templates`
 * (`assetBundleUrl`). With that unset there is no bundle
 * and no style.
 *
 * Not Flash's: a theme's `chat.bubbles` (`chatBubbleTheme.ts`), read here once, may draw a style with
 * another's art, change its reg points or tint its colour layer by subtraction; with none set every
 * style is built from its own row, as before.
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

    /**
     * Not Flash's: a style drawn from a draft, not the bundle - the preview host's chat bubble
     * (`views/preview/chatBubblePreview.ts`) - under `definition.id`, which no bundle style has;
     * `removeStyle` takes it out again.
     */
    public addDraftStyle(definition: ChatStyleDefinition, textures: ChatStyleTextures): ChatStyle {
        const style = new ChatStyle(definition, textures);

        this.removeStyle(definition.id);
        this._styles.set(definition.id, style);

        return style;
    }

    public removeStyle(styleId: number): void {
        this._styles.get(styleId)?.dispose();
        this._styles.delete(styleId);
    }

    public dispose(): void {
        for (const style of this._styles.values()) style.dispose();

        this._styles.clear();
        this._loadPromise = undefined;
        this._isLoaded = false;
    }

    private async loadStyles(): Promise<void> {
        if (!assetBundleUrl(BUNDLE_NAME)) return;

        if (!await loadAssetBundle(BUNDLE_NAME)) {
            NitroLogger.error('ChatStyleLibrary: the habbo-free-flow-chat-com bundle failed to load - no chat style is available');

            return;
        }

        const catalogue = GetAssetManager().getBundleFile<ChatStyleCatalogue>(BUNDLE_NAME, 'chat-style-definitions');

        if (!catalogue?.styles?.length) {
            NitroLogger.error('ChatStyleLibrary: the habbo-free-flow-chat-com bundle carries no style catalogue');

            return;
        }

        const theme = parseChatBubbleTheme(GetConfigValue(CHAT_BUBBLES_KEY));
        const byAsset = theme?.styles ? new Map(catalogue.styles.map(definition => [ definition.assetId, definition ])) : undefined;

        setChatBubbleTheme(theme);

        const styles = catalogue.styles.map((definition) => {
            try {
                return this.loadStyle(theme ? themedDefinition(definition, theme, byAsset) : { definition, artId: definition.assetId });
            } catch (err) {
                NitroLogger.warn(`Error initializing chat style: ${definition.id}`, err);

                return undefined;
            }
        });

        // In `chatstyles_xml` order, which is the order `getStyleIds` - and so the style picker - lists them.
        for (const style of styles) {
            if (style) this._styles.set(style.id, style);
        }

        this._isLoaded = true;

        // Every style is built; the catalogue behind them is not read again.
        GetAssetManager().releaseBundleData(BUNDLE_NAME);
    }

    private loadStyle({ definition, artId: assetId, tint }: ThemedChatStyleDefinition): ChatStyle {
        const { regPoints, bitmaps } = definition;
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
        }, tint);
    }

    /** Every bitmap is already in the asset manager: the bundle put it there when it was read. */
    private getTexture(assetId: string, file: Parameters<typeof chatStyleAssetName>[1]): Texture | undefined {
        return GetAssetManager().getTexture(chatStyleAssetName(assetId, file));
    }
}

/** A style's row as a theme draws it: the asset id its bitmaps are read under, its reg points, its tint. */
interface ThemedChatStyleDefinition {
    definition: ChatStyleDefinition;
    artId: string;
    tint?: ChatBubbleTint;
}

/**
 * `definition` with the theme's entry for it: another style's bitmaps and reg points (`art`, kept as
 * this style's id, flags and asset id), the entry's reg points over them, and its tint. A style the
 * theme names no entry for is its own row.
 */
const themedDefinition = (definition: ChatStyleDefinition, theme: ChatBubbleTheme, byAsset: ReadonlyMap<string, ChatStyleDefinition> | undefined): ThemedChatStyleDefinition => {
    const entry = chatBubbleStyleTheme(theme, definition.id);

    if (!entry) return { definition, artId: definition.assetId };

    const art = entry.art ? byAsset?.get(entry.art) : undefined;

    if (entry.art && !art) NitroLogger.warn(`chat.bubbles: style ${definition.id}'s art '${entry.art}' is no style of the habbo-free-flow-chat-com bundle - drawn with its own`);

    const source = art ?? definition;

    return {
        definition: { ...definition, regPoints: { ...source.regPoints, ...entry.regPoints }, bitmaps: source.bitmaps },
        artId: source.assetId,
        tint: entry.tint,
    };
};

let library: ChatStyleLibrary | undefined;

/** The one library the chat bubbles and the chat input's style picker share. */
export const GetChatStyleLibrary = (): ChatStyleLibrary => {
    library ??= new ChatStyleLibrary();

    return library;
};

/** Kicks off (or joins) the `habbo-free-flow-chat-com` bundle load - awaited at boot beside the theme's. */
export const preloadChatStyles = (): Promise<void> => GetChatStyleLibrary().load();
