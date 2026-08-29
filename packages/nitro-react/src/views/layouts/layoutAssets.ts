/** Bitmaps referenced by the generated layouts - copied out of `scripts/images` by scripts/generate-layout-views.ts. */
export const layoutImage = (file: string): string => `./assets/images/layouts/${file}`;

/**
 * Configuration a catalog page put on a widget slot as tags, read by the widget classes
 * (`ItemGridCatalogWidget` -> `FIXED`, `ProductViewCatalogWidget` -> `2X`/`NO_ROOM_CANVAS`,
 * `PurchaseCatalogWidget` -> `ROOM_INITIATE_PURCHASE`/`NO_GIFT_OPTION`, `LocalizationCatalogWidget`
 * -> `TOP_STORY`, `SourceTypeSelectorPreset` -> `NEW`). Carried as props for the widget logic to act on.
 */
export interface CatalogWidgetFlags {
    fixed?: boolean;
    doubleSize?: boolean;
    noRoomCanvas?: boolean;
    roomInitiatePurchase?: boolean;
    noGiftOption?: boolean;
    topStory?: boolean;
    isNew?: boolean;
}
