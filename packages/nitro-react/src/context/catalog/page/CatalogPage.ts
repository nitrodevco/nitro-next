/**
 * The catalogue page on show - Flash's `CatalogPage`, minus its window: the layout code, the
 * localization and offers `CatalogPageMessage` brought, and the page's widget event dispatcher.
 * The catalogue store holds the one open page (`CatalogPageSlice.activePage`); the view that draws
 * it is `views/catalog/page/CatalogPageView`, which builds the layout and mounts its widgets.
 *
 * What Flash keeps on the page and the port keeps here: the offers (each offer's `page` points
 * back at it, as the constructor sets), the widget events (`events`, `dispatchWidgetEvent`), the
 * item grid the page selects offers through (`§_-tV§` - the grid widget registers itself with
 * `registerItemGrid`), `selectOffer`, `updateLimitedItemsLeft`, and the getters widgets read
 * (`pageId` with the search page's `-12345678`, `isBuilderPage`, `allowDragging`).
 *
 * Two things are the port's own. `initialOfferId` is the offer `CatalogViewer.showCatalogPage`
 * selects once the page is built, which Flash passes straight on. `selectedOfferId` is the last
 * offer a `SelectProductEvent` named: Flash keeps a page's widgets alive while the catalogue is
 * closed (`closed()` only pauses the previewer), while the port unmounts them, so the view selects
 * this offer again when it rebuilds the widgets on reopening.
 */
import { CatalogTypeEnum, IActivePage, ICatalogPageLocalization, IPurchasableOffer } from '@nitrodevco/nitro-api';

import { getOfferProduct } from '#base/utils';

import { AnyCatalogWidgetEvent, CatalogWidgetEventDispatcher, CatalogWidgetEventEnum } from './CatalogWidgetEvents';

/**
 * The page id `CatalogPage.pageId` answers in search mode - a literal in Flash, which
 * `HabboCatalog.showPurchaseConfirmation` maps back to a page.
 */
export const CATALOG_SEARCH_PAGE_ID = -12345678;

/** The item grid as the page sees it - `ItemGridCatalogWidget.select(gridItem, true)`. */
export interface ICatalogItemGrid {
    select: (offer: IPurchasableOffer, notifyColours: boolean) => void;
}

export class CatalogPage implements IActivePage {
    public static readonly MODE_NORMAL = 0;
    public static readonly MODE_SEARCH = 1;

    public readonly events = new CatalogWidgetEventDispatcher();
    /** `MODE_NORMAL`, or `MODE_SEARCH` for the search results page (`CatalogViewer.showSearchResults`). */
    public readonly mode: number;

    private _itemGrid: ICatalogItemGrid | undefined = undefined;
    private _selectedOfferId = -1;

    constructor(
        private readonly _pageId: number,
        public readonly layoutCode: string,
        public readonly localization: ICatalogPageLocalization,
        public readonly offers: IPurchasableOffer[],
        public readonly acceptSeasonCurrencyAsCredits: boolean,
        public readonly catalogType: CatalogTypeEnum,
        public readonly initialOfferId: number = -1,
        mode: number = -1,
    ) {
        this.mode = (mode === -1) ? CatalogPage.MODE_NORMAL : mode;

        for (const offer of offers) offer.page = this;

        this.events.addEventListener(CatalogWidgetEventEnum.SELECT_PRODUCT, (event) => {
            this._selectedOfferId = event.offer.offerId;
        });
    }

    public get pageId(): number {
        return (this.mode === CatalogPage.MODE_SEARCH) ? CATALOG_SEARCH_PAGE_ID : this._pageId;
    }

    public get isBuilderPage(): boolean {
        return (this.catalogType === CatalogTypeEnum.BuildersClub);
    }

    /** `allowDragging`: every page but the sold limited items lets an offer be dragged into the room. */
    public get allowDragging(): boolean {
        return (this.layoutCode !== 'sold_ltd_items');
    }

    public get selectedOfferId(): number {
        return this._selectedOfferId;
    }

    /** The item grid widget registers itself while it is mounted; the answer unregisters it. */
    public registerItemGrid(grid: ICatalogItemGrid): () => void {
        this._itemGrid = grid;

        return () => {
            if (this._itemGrid === grid) this._itemGrid = undefined;
        };
    }

    /**
     * `CatalogPage.selectOffer`: select the offer through the item grid, which tells the widgets.
     * A page with no item grid selects nothing here. Flash also focuses the trophy page's
     * `input_text`; the trophy widget does that itself when it mounts.
     */
    public selectOffer(offerId: number): void {
        if (!this._itemGrid || (offerId <= -1)) return;

        for (const offer of this.offers) {
            if (offer.offerId === offerId) this._itemGrid.select(offer, true);
        }
    }

    public dispatchWidgetEvent(event: AnyCatalogWidgetEvent): boolean {
        return this.events.dispatchEvent(event);
    }

    /**
     * `updateLimitedItemsLeft`: a limited offer's remaining count changed (`HabboCatalog.onProductOffer`).
     * The product is replaced, not written to - offers are shared data - and the widgets hear of it
     * through `ProductOfferUpdatedEvent`.
     */
    public updateLimitedItemsLeft(offerId: number, left: number): void {
        for (const offer of this.offers) {
            if (offer.offerId !== offerId) continue;

            // `offer.product.uniqueLimitedItemsLeft = left`: `Offer.product` is `ProductContainer.firstProduct`.
            const index = offer.products.indexOf(getOfferProduct(offer)!);

            if (index >= 0) offer.products[index] = { ...offer.products[index], uniqueLeft: left };

            this.events.dispatchEvent({ type: CatalogWidgetEventEnum.PRODUCT_OFFER_UPDATED, offer });

            return;
        }
    }

    public dispose(): void {
        this._itemGrid = undefined;
        this.events.dispose();
    }
}
