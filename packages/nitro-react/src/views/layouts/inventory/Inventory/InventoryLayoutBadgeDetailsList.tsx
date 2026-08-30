import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

import { InventoryLayoutBadgeDescriptionItem } from './InventoryLayoutBadgeDescriptionItem';
import { InventoryLayoutBadgeNameItem } from './InventoryLayoutBadgeNameItem';

/** Named region `badgeDetailsList` of InventoryLayout - configured through the parent's `badgeDetailsList` prop. */
export interface InventoryLayoutBadgeDetailsListProps {
    captionBadgeOwnerCount?: string;
    captionBadgeRarity?: string;
    captionBadgeRarityBorder?: string;
    itemsBadgeDetailsList?: ReactNode;
    layout?: BoxLayout;
    visibleBadgeOwnerCount?: boolean;
    visibleBadgeRarityTag?: boolean;
}

export const InventoryLayoutBadgeDetailsList = ({ captionBadgeOwnerCount, captionBadgeRarity, captionBadgeRarityBorder, itemsBadgeDetailsList, layout, visibleBadgeOwnerCount, visibleBadgeRarityTag }: InventoryLayoutBadgeDetailsListProps) => {
    return (
        <Region
            name="badgeDetailsList"
            layout={{ position: 'absolute', left: 63, width: 271, top: 3, height: 39, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsBadgeDetailsList ?? (
                <>
                    <InventoryLayoutBadgeNameItem />
                    <InventoryLayoutBadgeDescriptionItem />
                </>
            )}
            <Region layout={{ width: -5, height: 20, flexShrink: 0, flexDirection: 'row', gap: 5 }}>
                {(visibleBadgeRarityTag ?? false) && (
                    <Border
                        variant="2"
                        name="badgeRarityTag"
                        tintColor="#cccccc"
                        layout={{ width: 92, height: 17, flexShrink: 0 }}
                    >
                        <ThemeText
                            text={captionBadgeRarityBorder ?? 'Unique badge'}
                            textOptions={{ fill: '#ffffff' }}
                            name="badgeRarityBorder"
                            layout={{ position: 'absolute', left: 5, top: 2, height: 13 }}
                        />
                        <ThemeText
                            text={captionBadgeRarity ?? 'Unique badge'}
                            textOptions={{ fill: '#ffffff' }}
                            name="badgeRarity"
                            layout={{ position: 'absolute', left: 5, width: 81, top: 2, height: 13 }}
                        />
                    </Border>
                )}
                {(visibleBadgeOwnerCount ?? false) && (
                    <ThemeText
                        text={captionBadgeOwnerCount ?? ''}
                        textOptions={{ fill: '#555555' }}
                        name="badgeOwnerCount"
                        layout={{ width: 4, height: 4, flexShrink: 0 }}
                    />
                )}
            </Region>
        </Region>
    );
};
