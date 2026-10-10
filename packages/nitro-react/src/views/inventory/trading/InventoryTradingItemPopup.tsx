/**
 * The popup that names what a trade slot holds - Flash `inventory/ItemPopupCtrl` over
 * `item_popup_xml`, the way `TradingView.thumbEventProc` fills it.
 *
 * - `updateContent` for furni: the name in `item_name_text`, the picture in `item_image` - cut to
 *   at most 180x200, centred across the popup - and the popup 10px taller than the picture's bottom;
 *   a limited edition fills `unique_item_overlay_widget` with its serial number and series size,
 *   anything else hides it. `nft_image` and its `nft_overlay_icon` stay hidden.
 * - `updateContent` for a collectible: `nft_image` previews the product with `nft_overlay_icon`
 *   beside it, `item_image` and the limited plaque are hidden, and the popup ends 28px under the
 *   preview.
 * - `show` with `LOCATION_RIGHT` - the only location the trade asks for: the popup 5px into the
 *   slot's right edge, centred on its height, with `refreshArrow` putting `popup_arrow_left_png`
 *   against its left edge, centred too.
 *
 * Flash adds the popup to the slot itself; here it floats over the desktop at the slot's screen
 * rectangle. The furni picture is the slot's icon - Flash's `getItemImage` is the furni's larger
 * render - and an external-image furni (`isExternalImagetype`'s stories image) shows that icon too.
 * A collectible effect is not previewed: the effect previewer needs a room of its own.
 */
import { CollectiblePreview } from '#base/context/collectibles';
import { FloatingPopup, LayoutImage, TemplateBindings, TemplateWindow, TemplateWindows, useTextureFromUrl } from '#base/theme';
import { CollectiblesPreviewSlots, CollectiblesProductPreview } from '#base/views/shared/CollectiblesProductPreview';
import { LimitedItemPreviewOverlayView } from '#base/views/shared/LimitedItemPreviewOverlayView';

/** `ItemPopupCtrl.BOUNDS_MARGIN`: how far the popup sits into the slot it points at. */
const BOUNDS_MARGIN = -5;

/** `IMAGE_MAX_WIDTH` / `IMAGE_MAX_HEIGHT`: the most of the picture `updateContent` copies. */
const IMAGE_MAX_WIDTH = 180;
const IMAGE_MAX_HEIGHT = 200;

/** `updateContent`: the gap under the picture, and under a collectible's preview. */
const IMAGE_BOTTOM_PADDING = 10;
const NFT_BOTTOM_PADDING = 28;

/** `item_popup_xml`'s `item_image` top and `nft_image` rect, which the popup's height is taken from. */
const ITEM_IMAGE_TOP = 22;
const NFT_IMAGE_BOTTOM = 29 + 146;
const NFT_IMAGE_WIDTH = 170;
const NFT_IMAGE_HEIGHT = 146;

/** `popup_arrow_left_png`, which `refreshArrow(LOCATION_RIGHT)` puts in `arrow_pointer`. */
const ARROW_LEFT_ASSET = 'habbo-inventory-com-popup_arrow_left';
const ARROW_LEFT_WIDTH = 6;
const ARROW_LEFT_HEIGHT = 11;

/** `nft_image`'s `product_image` widget: `product_image.xml`'s windows, over the widget's 170x146. */
const NFT_IMAGE_SLOTS: CollectiblesPreviewSlots = {
    productPreview: { left: 0, top: 0, width: NFT_IMAGE_WIDTH, height: NFT_IMAGE_HEIGHT },
    unknown: { left: 0, top: 0, width: NFT_IMAGE_WIDTH, height: NFT_IMAGE_HEIGHT, src: LayoutImage('habbo-window-manager-com/collectables_icon_curator_stamp_large.png'), stretched: false },
    placeholder: { left: 0, top: 0, width: NFT_IMAGE_WIDTH, height: NFT_IMAGE_HEIGHT, src: LayoutImage('habbo-window-manager-com/collectables_collection_default.png'), centered: true },
    badge: { left: 0, top: 0, width: NFT_IMAGE_WIDTH, height: NFT_IMAGE_HEIGHT, zoom: 2 },
    pet: { left: 0, top: 0, width: NFT_IMAGE_WIDTH, height: NFT_IMAGE_HEIGHT, zoom: 1, shrinkOnOverflow: false },
    avatar: { left: (NFT_IMAGE_WIDTH - 90) / 2, top: (NFT_IMAGE_HEIGHT - 130) / 2, width: 90, height: 130 },
};

/** Where the popup is anchored - the slot's rectangle in screen space. */
export interface InventoryTradingItemPopupAnchor {
    x: number;
    y: number;
    width: number;
    height: number;
}

/** What `updateContent` is given: a furni's picture and limited edition, or a collectible's product. */
export type InventoryTradingItemPopupContent
    = | { kind: 'furni'; imageUrl: string; uniqueSerialNumber: number; uniqueSeriesSize: number }
        | { kind: 'nft'; preview: CollectiblePreview };

interface InventoryTradingItemPopupProps {
    anchor: InventoryTradingItemPopupAnchor;
    name: string;
    content: InventoryTradingItemPopupContent;
    onDismiss: () => void;
}

export const InventoryTradingItemPopup = ({ anchor, name, content, onDismiss }: InventoryTradingItemPopupProps) => {
    const texture = useTextureFromUrl((content.kind === 'furni') ? (content.imageUrl || undefined) : undefined);
    // A picture that is not there is Flash's 1x1 transparent bitmap.
    const imageWidth = Math.min(IMAGE_MAX_WIDTH, texture?.width ?? 1);
    const imageHeight = Math.min(IMAGE_MAX_HEIGHT, texture?.height ?? 1);
    const height = (content.kind === 'nft') ? (NFT_IMAGE_BOTTOM + NFT_BOTTOM_PADDING) : (ITEM_IMAGE_TOP + imageHeight + IMAGE_BOTTOM_PADDING);
    const unique = (content.kind === 'furni') && (content.uniqueSerialNumber > 0);

    const bindings: TemplateBindings = (content.kind === 'nft')
        ? {
                item_name_text: { caption: name },
                nft_image: {
                    visible: true,
                    children: (
                        <CollectiblesProductPreview
                            preview={content.preview}
                            slots={NFT_IMAGE_SLOTS}
                        />
                    ),
                },
                nft_overlay_icon: { visible: true },
                unique_item_overlay_widget: { visible: false },
                item_image: { visible: false },
                arrow_pointer: { asset: ARROW_LEFT_ASSET },
            }
        : {
                item_name_text: { caption: name },
                nft_image: { visible: false },
                nft_overlay_icon: { visible: false },
                item_image: { visible: true, asset: content.imageUrl },
                unique_item_overlay_widget: unique
                    ? {
                            visible: true,
                            children: (
                                <LimitedItemPreviewOverlayView
                                    serialNumber={content.uniqueSerialNumber}
                                    seriesSize={content.uniqueSeriesSize}
                                />
                            ),
                        }
                    : { visible: false },
                arrow_pointer: { asset: ARROW_LEFT_ASSET },
            };

    /** `updateContent`'s sizing, then `show`'s `refreshArrow(LOCATION_RIGHT)`. */
    const arrange = ({ find, root }: TemplateWindows) => {
        const window = root();

        if (!window) return;

        if (content.kind === 'furni') {
            const image = find('item_image');

            if (image) {
                image.setWidth(imageWidth);
                image.setHeight(imageHeight);
                image.setX(Math.trunc((window.width - image.width) / 2));
            }
        }

        window.setHeight(height);
        find('arrow_pointer')?.setRectangle(-ARROW_LEFT_WIDTH + 1, Math.trunc((window.height - ARROW_LEFT_HEIGHT) / 2), ARROW_LEFT_WIDTH, ARROW_LEFT_HEIGHT);
    };

    return (
        <FloatingPopup
            // `show`'s `LOCATION_RIGHT`: 5px into the slot's right edge, centred on its height.
            x={anchor.x + anchor.width + BOUNDS_MARGIN}
            y={Math.trunc(anchor.y + ((anchor.height - height) / 2))}
            onOutsideClick={onDismiss}
        >
            <TemplateWindow
                id="habbo-inventory-com/item_popup_xml"
                bindings={bindings}
                arrange={arrange}
            />
        </FloatingPopup>
    );
};
