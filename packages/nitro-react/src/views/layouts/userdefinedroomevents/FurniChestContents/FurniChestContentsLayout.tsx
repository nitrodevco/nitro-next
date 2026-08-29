import { BoxLayout, Region } from '#base/theme';

import { FurniChestContentsLayoutFurniChest, FurniChestContentsLayoutFurniChestProps } from './FurniChestContentsLayoutFurniChest';

/** Generated from `1167_furni_chest_contents_xml` (layout "furni_chest_contents", 458x264) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FurniChestContentsLayoutProps {
    furniChest?: FurniChestContentsLayoutFurniChestProps;
    layout?: BoxLayout;
}

export const FurniChestContentsLayout = ({ furniChest, layout }: FurniChestContentsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 458, height: 264, ...layout }}>
            <FurniChestContentsLayoutFurniChest {...furniChest} />
        </Region>
    );
};
