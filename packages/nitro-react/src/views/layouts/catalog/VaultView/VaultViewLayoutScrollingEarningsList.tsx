import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { VaultViewLayoutAchievementsContainerItem } from './VaultViewLayoutAchievementsContainerItem';
import { VaultViewLayoutAgencyContainerItem } from './VaultViewLayoutAgencyContainerItem';
import { VaultViewLayoutBonusbagContainerItem } from './VaultViewLayoutBonusbagContainerItem';
import { VaultViewLayoutDailygiftContainerItem } from './VaultViewLayoutDailygiftContainerItem';
import { VaultViewLayoutDonationContainerItem } from './VaultViewLayoutDonationContainerItem';
import { VaultViewLayoutGamesContainerItem } from './VaultViewLayoutGamesContainerItem';
import { VaultViewLayoutHabboclubContainerItem } from './VaultViewLayoutHabboclubContainerItem';
import { VaultViewLayoutLevelprogressionContainerItem } from './VaultViewLayoutLevelprogressionContainerItem';
import { VaultViewLayoutMarketplaceContainerItem } from './VaultViewLayoutMarketplaceContainerItem';
import { VaultViewLayoutSnowstormContainerItem } from './VaultViewLayoutSnowstormContainerItem';
import { VaultViewLayoutSurpriseContainerItem } from './VaultViewLayoutSurpriseContainerItem';
import { VaultViewLayoutWiredchestContainerItem } from './VaultViewLayoutWiredchestContainerItem';

/** Named region `scrolling_earnings_list` of VaultViewLayout - configured through the parent's `scrollingEarningsList` prop. */
export interface VaultViewLayoutScrollingEarningsListProps {
    itemsScrollingEarningsList?: ReactNode;
    layout?: BoxLayout;
}

export const VaultViewLayoutScrollingEarningsList = ({ itemsScrollingEarningsList, layout }: VaultViewLayoutScrollingEarningsListProps) => {
    return (
        <Region
            name="scrolling_earnings_list"
            layout={{ position: 'absolute', left: 2, width: 404, top: 5, height: 441, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsScrollingEarningsList ?? (
                <>
                    <VaultViewLayoutDailygiftContainerItem />
                    <VaultViewLayoutGamesContainerItem />
                    <VaultViewLayoutWiredchestContainerItem />
                    <VaultViewLayoutAchievementsContainerItem />
                    <VaultViewLayoutMarketplaceContainerItem />
                    <VaultViewLayoutHabboclubContainerItem />
                    <VaultViewLayoutLevelprogressionContainerItem />
                    <VaultViewLayoutDonationContainerItem />
                    <VaultViewLayoutBonusbagContainerItem />
                    <VaultViewLayoutSurpriseContainerItem />
                    <VaultViewLayoutSnowstormContainerItem />
                    <VaultViewLayoutAgencyContainerItem />
                </>
            )}
        </Region>
    );
};
