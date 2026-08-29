import { ReactNode } from 'react';

import { Border, BoxLayout, Region } from '#base/theme';

import { BadgeDetailsLayoutDescriptionItem } from './BadgeDetailsLayoutDescriptionItem';
import { BadgeDetailsLayoutNameItem } from './BadgeDetailsLayoutNameItem';
import { BadgeDetailsLayoutOwnerCountItem } from './BadgeDetailsLayoutOwnerCountItem';
import { BadgeDetailsLayoutRarityTagItem } from './BadgeDetailsLayoutRarityTagItem';

/** Generated from `982_badge_details_xml` (layout "badge_details", 263x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeDetailsLayoutProps {
    itemsDetailsList?: ReactNode;
    layout?: BoxLayout;
}

export const BadgeDetailsLayout = ({ itemsDetailsList, layout }: BadgeDetailsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 263, height: 25, ...layout }}>
            <Border
                variant="0"
                name="test"
                layout={{ position: 'absolute', left: 87, width: 263, top: 53, height: 25 }}
            >
                <Region
                    name="details_list"
                    layout={{ position: 'absolute', left: 0, width: 263, top: 6, height: 11, flexDirection: 'column', gap: 3 }}
                >
                    {itemsDetailsList ?? (
                        <>
                            <BadgeDetailsLayoutNameItem />
                            <BadgeDetailsLayoutDescriptionItem />
                            <BadgeDetailsLayoutRarityTagItem />
                            <BadgeDetailsLayoutOwnerCountItem />
                        </>
                    )}
                </Region>
            </Border>
        </Region>
    );
};
