import { BoxLayout, Region } from '#base/theme';

import { CoinsChestContentsLayoutCoinsChest, CoinsChestContentsLayoutCoinsChestProps } from './CoinsChestContentsLayoutCoinsChest';

/** Generated from `1143_coins_chest_contents_xml` (layout "coins_chest_contents", 413x263) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CoinsChestContentsLayoutProps {
    coinsChest?: CoinsChestContentsLayoutCoinsChestProps;
    layout?: BoxLayout;
}

export const CoinsChestContentsLayout = ({ coinsChest, layout }: CoinsChestContentsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 413, height: 263, ...layout }}>
            <CoinsChestContentsLayoutCoinsChest {...coinsChest} />
        </Region>
    );
};
