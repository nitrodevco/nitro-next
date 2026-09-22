/**
 * The events a catalogue page's widgets exchange - `com/sulake/habbo/catalog/viewer/widgets/events/**`
 * - and the per-page dispatcher that carries them (`CatalogPage._widgetEvents`, an
 * `EventDispatcherWrapper`).
 *
 * Flash gives every page its own dispatcher and hands it to each widget as `events`; a widget
 * subscribes in `init()` and dispatches with `events.dispatchEvent(new XEvent(...))`, and
 * `HabboCatalog` reaches the open page with `currentPage.dispatchWidgetEvent(...)`. Here the
 * dispatcher is `CatalogPage.events`, a widget subscribes with `useCatalogWidgetEvent` and sends
 * with `page.events.dispatchEvent({ type: ..., ... })`, and a packet handler reaches the open page
 * through the catalogue store (`store.getState().activePage?.dispatchWidgetEvent(...)`).
 *
 * Every Flash event class is an interface here under the same name, its `type` the string Flash
 * passes to `super(...)` and its fields the class's getters. The three constant objects are
 * Flash's `CatalogWidgetEventEnum`, `CatalogWidgetSpinnerEvent` and
 * `CatalogWidgetBundleDisplayExtraInfoEvent` statics, value for value (`drift/enums.py`); the
 * obfuscated members (`§_-C1o§`, `§_-01a§`, `§_-020§`, the spinner's `§_-QF§`) are named after
 * their value. The dispatcher is transient: page state that outlives an event belongs in the
 * catalogue store.
 */
import { IObjectData, IPurchasableOffer } from '@nitrodevco/nitro-api';

export const CatalogWidgetEventEnum = {
    WIDGETS_INITIALIZED: 'WIDGETS_INITIALIZED',
    SELECT_PRODUCT: 'SELECT_PRODUCT',
    SET_EXTRA_PARAMETER: 'CWE_SET_EXTRA_PARM',
    PURCHASE: 'PURCHASE',
    COLOUR_ARRAY: 'COLOUR_ARRAY',
    MULTI_COLOUR_ARRAY: 'MULTI_COLOUR_ARRAY',
    COLOUR_INDEX: 'COLOUR_INDEX',
    TEXT_INPUT: 'TEXT_INPUT',
    DROPMENU_SELECT: 'CWE_DROPMENU_SELECT',
    APPROVE_NAME_RESULT: 'CWE_APPROVE_RESULT',
    PURCHASE_OVERRIDE: 'PURCHASE_OVERRIDE',
    SELLABLE_PET_PALETTES: 'SELLABLE_PET_PALETTES',
    INIT_PURCHASE: 'INIT_PURCHASE',
    UPDATE_ROOM_PREVIEW: 'UPDATE_ROOM_PREVIEW',
    GUILD_SELECTED: 'GUILD_SELECTED',
    TOTAL_PRICE_WIDGET_INITIALIZED: 'TOTAL_PRICE_WIDGET_INITIALIZED',
    PRODUCT_OFFER_UPDATED: 'CWE_PRODUCT_OFFER_UPDATED',
    SET_PREVIEWER_STUFFDATA: 'CWE_SET_PREVIEWER_STUFFDATA',
    EXTRA_PARAM_REQUIRED_FOR_BUY: 'CWE_EXTRA_PARAM_REQUIRED_FOR_BUY',
    TOGGLE: 'CWE_TOGGLE',
    BUILDER_SUBSCRIPTION_UPDATED: 'CWE_BUILDER_SUBSCRIPTION_UPDATED',
    ROOM_CHANGED: 'CWE_ROOM_CHANGED',
    SHOW_WARNING_TEXT: 'CWE_SHOW_WARNING_TEXT',
} as const;

/** `CatalogWidgetSpinnerEvent`'s types: the spinner's value, and what the product view tells it. */
export const CatalogWidgetSpinnerEvent = {
    VALUE_CHANGED: 'CWSE_VALUE_CHANGED',
    RESET: 'CWSE_RESET',
    SHOW: 'CWSE_SHOW',
    HIDE: 'CWSE_HIDE',
    SET_MAX: 'CWSE_SET_MAX',
    SET_MIN: 'CWSE_SET_MIN',
} as const;

/** `CatalogWidgetBundleDisplayExtraInfoEvent`'s types, for the bundle purchase extra info widget. */
export const CatalogWidgetBundleDisplayExtraInfoEvent = {
    RESET: 'CWPPEIE_RESET',
    HIDE: 'CWPPEIE_HIDE',
    ITEM_CLICKED: 'CWPPEIE_ITEM_CLICKED',
} as const;

/** `CatalogWidgetGuildSelectedEvent.NO_GUILD_SELECTED`. */
export const CATALOG_NO_GUILD_SELECTED = -1;

type Values<T> = T[keyof T];

/** An event that carries nothing but its type - Flash's bare `CatalogWidgetEvent` and the payload-less classes. */
export interface CatalogWidgetEvent {
    readonly type:
        | typeof CatalogWidgetEventEnum.WIDGETS_INITIALIZED
        | typeof CatalogWidgetEventEnum.PURCHASE
        | typeof CatalogWidgetEventEnum.DROPMENU_SELECT
        | typeof CatalogWidgetEventEnum.TOTAL_PRICE_WIDGET_INITIALIZED
        | typeof CatalogWidgetEventEnum.EXTRA_PARAM_REQUIRED_FOR_BUY
        | typeof CatalogWidgetEventEnum.BUILDER_SUBSCRIPTION_UPDATED
        | typeof CatalogWidgetEventEnum.ROOM_CHANGED;
}

/** `SelectProductEvent`: an offer was picked - by the grid, a selector widget, or `HabboCatalog.onProductOffer`. */
export interface SelectProductEvent {
    readonly type: typeof CatalogWidgetEventEnum.SELECT_PRODUCT;
    readonly offer: IPurchasableOffer;
}

/** `SetExtraPurchaseParameterEvent`: the `extraParam` the purchase sends (a wall item's, a trophy text, a badge code). */
export interface SetExtraPurchaseParameterEvent {
    readonly type: typeof CatalogWidgetEventEnum.SET_EXTRA_PARAMETER;
    readonly parameter: string;
}

/** `CatalogWidgetColoursEvent`: the colours the colour grid offers, and the art it draws them with. */
export interface CatalogWidgetColoursEvent {
    readonly type: typeof CatalogWidgetEventEnum.COLOUR_ARRAY;
    readonly colours: readonly number[];
    readonly backgroundAssetName: string;
    readonly colourAssetName: string;
    readonly chosenColourAssetName: string;
    readonly index: number;
}

/** `CatalogWidgetMultiColoursEvent`: two-tone swatches (a pet palette's primary and secondary colour). */
export interface CatalogWidgetMultiColoursEvent {
    readonly type: typeof CatalogWidgetEventEnum.MULTI_COLOUR_ARRAY;
    readonly colours: readonly (readonly number[])[];
    readonly backgroundAssetName: string;
    readonly colourAssetName: string;
    readonly chosenColourAssetName: string;
}

/** `CatalogWidgetColourIndexEvent`: the colour grid's pick. */
export interface CatalogWidgetColourIndexEvent {
    readonly type: typeof CatalogWidgetEventEnum.COLOUR_INDEX;
    readonly index: number;
}

/** `TextInputEvent`: the text input widget's text, as typed. */
export interface TextInputEvent {
    readonly type: typeof CatalogWidgetEventEnum.TEXT_INPUT;
    readonly text: string;
}

/** `CatalogWidgetApproveNameResultEvent`: the server's answer to a pet name (`ApproveNameMessage`). */
export interface CatalogWidgetApproveNameResultEvent {
    readonly type: typeof CatalogWidgetEventEnum.APPROVE_NAME_RESULT;
    readonly result: number;
    readonly nameValidationInfo: string;
}

/** `CatalogWidgetPurchaseOverrideEvent`: a widget that buys on its own (the pets) takes over the buy button. */
export interface CatalogWidgetPurchaseOverrideEvent {
    readonly type: typeof CatalogWidgetEventEnum.PURCHASE_OVERRIDE;
    readonly callback: () => void;
}

/** One row of `SellablePetPalettesMessage` - Flash's `SellablePetPaletteData`. */
export interface CatalogSellablePetPalette {
    readonly type: number;
    readonly breedId: number;
    readonly paletteId: number;
    readonly sellable: boolean;
    readonly rare: boolean;
}

/** `CatalogWidgetSellablePetPalettesEvent`: the palettes a pet product can be bought in. */
export interface CatalogWidgetSellablePetPalettesEvent {
    readonly type: typeof CatalogWidgetEventEnum.SELLABLE_PET_PALETTES;
    readonly productCode: string;
    readonly sellablePalettes: readonly CatalogSellablePetPalette[];
}

/** `CatalogWidgetInitPurchaseEvent`: buy the selected offer now (a finished drag-and-drop, the room preview). */
export interface CatalogWidgetInitPurchaseEvent {
    readonly type: typeof CatalogWidgetEventEnum.INIT_PURCHASE;
    readonly enableBuyAsGift: boolean;
    readonly userName: string | undefined;
}

/** `CatalogWidgetUpdateRoomPreviewEvent`: the room preview's planes and tile size (the spaces page). */
export interface CatalogWidgetUpdateRoomPreviewEvent {
    readonly type: typeof CatalogWidgetEventEnum.UPDATE_ROOM_PREVIEW;
    readonly floorType: string;
    readonly wallType: string;
    readonly landscapeType: string;
    readonly tileSize: number;
}

/** `CatalogWidgetGuildSelectedEvent`: the guild the guild furni are bought for; `CATALOG_NO_GUILD_SELECTED` for none. */
export interface CatalogWidgetGuildSelectedEvent {
    readonly type: typeof CatalogWidgetEventEnum.GUILD_SELECTED;
    readonly guildId: number;
    readonly color1: string;
    readonly color2: string;
    readonly badgeCode: string;
}

/** `ProductOfferUpdatedEvent`: an offer's limited items left changed (`CatalogPage.updateLimitedItemsLeft`). */
export interface ProductOfferUpdatedEvent {
    readonly type: typeof CatalogWidgetEventEnum.PRODUCT_OFFER_UPDATED;
    readonly offer: IPurchasableOffer;
}

/** `SetRoomPreviewerStuffDataEvent`: the stuff data the preview and the purchase use (a guild's colours, a badge). */
export interface SetRoomPreviewerStuffDataEvent {
    readonly type: typeof CatalogWidgetEventEnum.SET_PREVIEWER_STUFFDATA;
    readonly stuffData: IObjectData;
}

/** `CatalogWidgetToggleEvent`: show or hide another widget by its id (the purchase widget answers to `purchaseWidget`). */
export interface CatalogWidgetToggleEvent {
    readonly type: typeof CatalogWidgetEventEnum.TOGGLE;
    readonly widgetId: string;
    readonly enabled: boolean;
}

/** `CatalogWidgetShowWarningTextEvent`: the warning widget's text. */
export interface CatalogWidgetShowWarningTextEvent {
    readonly type: typeof CatalogWidgetEventEnum.SHOW_WARNING_TEXT;
    readonly text: string;
}

/** `CatalogWidgetSpinnerEvent`: `value` defaults to 1 as in Flash; `skipSteps` only rides on `RESET`. */
export interface CatalogWidgetSpinnerEvent {
    readonly type: Values<typeof CatalogWidgetSpinnerEvent>;
    readonly value: number;
    readonly skipSteps?: readonly number[];
}

/** Flash's `ExtraInfoItemData`: one row of the bundle purchase extra info list. */
export interface CatalogExtraInfoItemData {
    readonly type: number;
    readonly text: string;
    readonly quantity: number;
    readonly priceCredits: number;
    readonly priceActivityPoints: number;
    readonly activityPointType: number;
    readonly priceSilver: number;
    readonly badgeCode: string;
    readonly achievementCode: string;
    readonly discountPriceCredits: number;
    readonly discountPriceActivityPoints: number;
}

/** `CatalogWidgetBundleDisplayExtraInfoEvent`: `id` defaults to -1 as in Flash. */
export interface CatalogWidgetBundleDisplayExtraInfoEvent {
    readonly type: Values<typeof CatalogWidgetBundleDisplayExtraInfoEvent>;
    readonly data?: CatalogExtraInfoItemData;
    readonly id: number;
}

/** Every event a page's dispatcher carries. */
export type AnyCatalogWidgetEvent
    = | CatalogWidgetEvent
        | SelectProductEvent
        | SetExtraPurchaseParameterEvent
        | CatalogWidgetColoursEvent
        | CatalogWidgetMultiColoursEvent
        | CatalogWidgetColourIndexEvent
        | TextInputEvent
        | CatalogWidgetApproveNameResultEvent
        | CatalogWidgetPurchaseOverrideEvent
        | CatalogWidgetSellablePetPalettesEvent
        | CatalogWidgetInitPurchaseEvent
        | CatalogWidgetUpdateRoomPreviewEvent
        | CatalogWidgetGuildSelectedEvent
        | ProductOfferUpdatedEvent
        | SetRoomPreviewerStuffDataEvent
        | CatalogWidgetToggleEvent
        | CatalogWidgetShowWarningTextEvent
        | CatalogWidgetSpinnerEvent
        | CatalogWidgetBundleDisplayExtraInfoEvent;

export type CatalogWidgetEventType = AnyCatalogWidgetEvent['type'];

/** Each member of the union whose `type` admits `T` (the spinner and extra info events carry several types). */
type EventWithType<E, T> = E extends { readonly type: infer U } ? (T extends U ? E : never) : never;

/** The event interface a type string belongs to: `CatalogWidgetEventOf<'SELECT_PRODUCT'>` is `SelectProductEvent`. */
export type CatalogWidgetEventOf<T extends CatalogWidgetEventType> = EventWithType<AnyCatalogWidgetEvent, T> & { readonly type: T };

export type CatalogWidgetEventListener<T extends CatalogWidgetEventType> = (event: CatalogWidgetEventOf<T>) => void;

type AnyListener = (event: AnyCatalogWidgetEvent) => void;

/**
 * One page's widget event bus - the `EventDispatcherWrapper` `CatalogPage` creates and gives every
 * widget. Listeners run synchronously, in the order they were added, which is the widgets' order
 * in the layout: Flash initialises the widgets in `createWidgetsRecursion` order, so a widget's
 * `init()` only ever reaches widgets before it, and the port keeps that by subscribing each widget
 * in a mount effect (React runs sibling effects in tree order). Adding a listener twice keeps one,
 * as Flash's dispatcher does.
 */
export class CatalogWidgetEventDispatcher {
    private _listeners: Map<string, AnyListener[]> = new Map();
    private _disposed = false;

    public addEventListener<T extends CatalogWidgetEventType>(type: T, listener: CatalogWidgetEventListener<T>): () => void {
        if (this._disposed) return () => undefined;

        const listeners = this._listeners.get(type) ?? [];

        if (!listeners.includes(listener)) listeners.push(listener);

        this._listeners.set(type, listeners);

        return () => this.removeEventListener(type, listener);
    }

    public removeEventListener<T extends CatalogWidgetEventType>(type: T, listener: CatalogWidgetEventListener<T>): void {
        const listeners = this._listeners.get(type);

        if (!listeners) return;

        const index = listeners.indexOf(listener);

        if (index >= 0) listeners.splice(index, 1);
    }

    /** Flash's `dispatchEvent`: true unless the dispatcher is gone. A listener added or removed during a dispatch takes effect from the next one. */
    public dispatchEvent(event: AnyCatalogWidgetEvent): boolean {
        if (this._disposed) return false;

        const listeners = this._listeners.get(event.type);

        if (listeners) for (const listener of [ ...listeners ]) listener(event);

        return true;
    }

    public dispose(): void {
        this._disposed = true;
        this._listeners.clear();
    }

    public get disposed(): boolean {
        return this._disposed;
    }
}
