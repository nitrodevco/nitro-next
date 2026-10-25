/**
 * What one of the hub's product previewers shows - the result `CollectiblesController.previewImage`
 * / `previewIcon` (and `ProductImageWidget.previewImage`, the reward box's and the purchase
 * dialog's `product_image` widget) set on a `CollectibleProductPreviewer` (`§_-NN§`): one of its
 * windows made visible and given its data, or all of them hidden (`clearPreviewer`).
 *
 * A previewer that lacks the window a result needs (the minting tab's has no badge, pet, effect
 * or unknown image) shows nothing for it, as the Flash setters return on a null window.
 */

export type CollectiblePreview
    /** `clearPreviewer`. */
    = | { kind: 'none' }
    /** `setPlaceholder`: `placeholder_image`. */
        | { kind: 'placeholder' }
    /** `setUnknownImage`: `unknown_image`. */
        | { kind: 'unknown' }
    /** `imageResult` of `getFurnitureIcon` / `getWallItemIcon` (`icon`) or `getFurnitureImage` / `getWallItemImage(id, Vector3d(90), 64)`. */
        | { kind: 'furni'; classId: number; className: string; colorIndex: number; isWallItem: boolean; icon: boolean }
    /** `imageResult` of `HabboCatalog.getPixelEffectIcon`. */
        | { kind: 'effect_icon'; effectId: number }
    /** `setEffectResult`: the user's figure wearing the effect, in `effect_image_widget`'s room previewer. */
        | { kind: 'effect'; figure: string; gender: string; effectId: number }
    /** `badgeResult`: `badge_image_widget`. */
        | { kind: 'badge'; badgeCode: string }
    /** `petResult`: `pet_image_widget`. */
        | { kind: 'pet'; figure: string }
    /** `avatarResult`: `avatar_image_widget`. */
        | { kind: 'avatar'; figure: string; gender: string }
    /** `imageResult` of the chat style's `selectorPreview`. */
        | { kind: 'chat_style_selector'; styleId: number }
    /** `imageResult` of `createChatItemPreview`: an empty bubble of the style, headed with `userName`. */
        | { kind: 'chat_style_bubble'; styleId: number; userName: string };

export const COLLECTIBLE_PREVIEW_NONE: CollectiblePreview = { kind: 'none' };
export const COLLECTIBLE_PREVIEW_PLACEHOLDER: CollectiblePreview = { kind: 'placeholder' };

/**
 * `handlePreviewImageEasterEgg`'s memory - the product last previewed and how many times in a
 * row. The controller and each `product_image` widget keep their own.
 */
export interface CollectiblePreviewEasterEgg {
    productTypeId: number;
    itemTypeId: string;
    count: number;
}

export const COLLECTIBLE_PREVIEW_EASTER_EGG_INITIAL: CollectiblePreviewEasterEgg = { productTypeId: -1, itemTypeId: '', count: 0 };
