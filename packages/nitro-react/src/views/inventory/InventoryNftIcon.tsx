/**
 * A collectible's product preview in a square inventory bitmap - the `product_icon` widget a
 * `CollectibleGroupedItem` thumb shows its product in (`CollectiblesController.previewIcon`).
 */
import { ITradeNftAsset } from '@nitrodevco/nitro-packets';

import { getCollectiblePreviewIcon } from '#base/commands';
import { wrapBaseItem } from '#base/context/collectibles';
import { LayoutImage } from '#base/theme';
import { CollectiblesProductPreview } from '#base/views/shared/CollectiblesProductPreview';

/** The thumb's `nft_icon`: 40x40. */
const ICON_SIZE = 40;

/** A collectible's product preview in a box of `size` (`CollectiblesController.previewIcon`). */
export const InventoryNftIcon = ({ asset, size = ICON_SIZE }: { asset: ITradeNftAsset; size?: number }) => (
    <CollectiblesProductPreview
        preview={getCollectiblePreviewIcon(wrapBaseItem(asset))}
        slots={{
            productPreview: { left: 0, top: 0, width: size, height: size },
            badge: { left: 0, top: 0, width: size, height: size, zoom: 1 },
            unknown: { left: (size - 18) / 2, top: (size - 18) / 2, width: 18, height: 18, src: LayoutImage('habbo-window-manager-com/collectables_icon_curator_stamp_small.png'), stretched: true },
            pet: { left: 0, top: 0, width: size, height: size, zoom: 1, shrinkOnOverflow: true },
        }}
    />
);
