/**
 * One grid item of the hub's three item grids - the `item_template` of `itemgrid_collection`,
 * `itemgrid_inventory` and `itemgrid_shop` in `collectible_view.xml` - with its renderer:
 * `renderer/collections/CollectibleItemRenderer` (the amount held, a green or grey amount border,
 * the checkmark once held), `renderer/MintInventoryItemRenderer` (`x<amount>` or `-`) and
 * `renderer/ShopCollectibleItemRenderer` (the emerald price beside the emerald icon).
 *
 * `AbstractCollectibleItemRenderer` colours the item's `border_outline` and `border_background`:
 * hovered over active over normal, from the complete or incomplete palette by whether any are held
 * (the minting grid uses the incomplete one either way). Its previewer shows the product's icon
 * (`CollectiblesController.previewIcon`).
 */
import { useState } from 'react';

import { getCollectiblePreviewIcon } from '#base/commands';
import { CollectibleProductInfo } from '#base/context/collectibles';
import { Border, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { getCollectibleItemColoring, toCollectiblesCssColor } from './collectiblesColors';
import { CollectiblesProductPreview } from './CollectiblesProductPreview';

/** `updateVisuals`' amount border: green once held, grey before. */
const AMOUNT_BORDER_COMPLETE = 3374080;
const AMOUNT_BORDER_INCOMPLETE = 7441834;

export type CollectiblesItemCellKind = 'collection' | 'mint' | 'shop';

export interface CollectiblesItemCellProps {
    kind: CollectiblesItemCellKind;
    info: CollectibleProductInfo;
    active: boolean;
    /** The shop's price (`emeraldPrice`). */
    price?: number;
    onSelect: () => void;
}

export const CollectiblesItemCell = ({ kind, info, active, price, onSelect }: CollectiblesItemCellProps) => {
    const [ hovered, setHovered ] = useState(false);
    const complete = info.amount > 0;
    const [ background, outline ] = getCollectibleItemColoring((kind === 'mint') ? false : complete, hovered, active);
    const isShop = (kind === 'shop');

    return (
        <Region
            name="item_template"
            onPointerTap={onSelect}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            cursor="pointer"
            layout={{ width: 52, height: isShop ? 62 : 61, flexShrink: 0 }}
        >
            <Border
                variant="2"
                tintColor="#a1a19b"
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
            >
                <Border
                    variant="3"
                    name="border_outline"
                    tintColor={toCollectiblesCssColor(outline)}
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 60 }}
                >
                    <Border
                        variant="3"
                        name="border_background"
                        tintColor={toCollectiblesCssColor(background)}
                        layout={{ position: 'absolute', left: 1, width: 48, top: 1, height: 58 }}
                    />
                </Border>
            </Border>
            <CollectiblesProductPreview
                preview={getCollectiblePreviewIcon(info)}
                slots={{
                    productPreview: { left: 2, top: 4, width: 46, height: 40 },
                    badge: { left: 5, top: 4, width: 40, height: 40, zoom: 1 },
                    unknown: { left: 16, top: 15, width: 18, height: 18, src: LayoutImage('shared/collectables_icon_curator_stamp_small.png'), stretched: true },
                    pet: { left: 5, top: 4, width: 40, height: 40, zoom: 1, shrinkOnOverflow: true },
                }}
            />
            {isShop
                ? (
                        <Region
                            name="number_container"
                            layout={{ position: 'absolute', left: 0, width: 50, top: 40, height: 20 }}
                        >
                            <ThemeText
                                text={String(price ?? 0)}
                                textStyle="u_bold"
                                textOptions={{ align: 'right' }}
                                name="number"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 0, width: 34, top: 0 }}
                            />
                            <ThemeImage
                                name="emerald_icon"
                                src={LayoutImage('catalog/pursearea_tiny_emerald_icon.png')}
                                bitmap={{ stretchedX: false, stretchedY: false }}
                                layout={{ position: 'absolute', left: 34, width: 12, top: 3, height: 12 }}
                            />
                        </Region>
                    )
                : (
                        <Region
                            name="number_container"
                            layout={{ position: 'absolute', left: 0, width: 50, top: 45, height: 16 }}
                        >
                            <Border
                                variant="3"
                                name="text_border"
                                tintColor={toCollectiblesCssColor(complete ? AMOUNT_BORDER_COMPLETE : AMOUNT_BORDER_INCOMPLETE)}
                                layout={{ position: 'absolute', left: 3, width: 44, top: 1, height: 12 }}
                            />
                            <ThemeText
                                text={(kind === 'mint') ? (complete ? `x${info.amount}` : '-') : `x${info.amount}`}
                                textStyle="u_regular"
                                textOptions={{ fill: '#ffffff', fontSize: 10, align: 'center' }}
                                name="number"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 0, width: 50, top: 0 }}
                            />
                        </Region>
                    )}
            {(kind === 'collection') && complete && (
                <ThemeImage
                    name="checkmark_icon"
                    src={LayoutImage('catalog/icon_checkmark_small.png')}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 31, width: 16, top: 3, height: 16 }}
                />
            )}
        </Region>
    );
};
