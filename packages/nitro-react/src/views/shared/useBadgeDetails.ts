/**
 * `populateBadgeDetails`' texts for a user badge (`BadgeDetailsPopup`): its name and description
 * (`getBadgeName` / `getBadgeDesc`), and - with the slot's `SelectedBadgeData` - its rarity tag
 * (`badge.rarity.badge` with the tier's `BadgeRarity.getLabelLocalizationKey` text, on the tier's
 * `BadgeRarity.getWhiteBackgroundTagColor`) and owner count (`badge.owner_count`, for 1-999 owners:
 * `shouldShowOwnerCount`).
 */
import { getBadgeRarityLabelKey, getBadgeRarityWhiteBackgroundTagColor } from '@nitrodevco/nitro-api';

import { useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { getBadgeDesc, getBadgeName, shouldShowBadgeOwnerCount } from '#base/utils';

/** What the window shows. */
export interface BadgeDetails {
    name: string;
    description: string;
    rarity?: { text: string; color: number };
    ownerCount?: string;
}

/**
 * `populateBadgeDetails`' texts for a user badge: its name and description, and - with the slot's
 * selected-badge data - its rarity tag and owner count.
 */
export const useBadgeDetails = () => {
    const t = useTranslation();
    const badgePointLimits = useSystemStore(x => x.badgePointLimits);
    // `isUncommonBadgeRarityEnabled`.
    const uncommonRarityEnabled = useConfigValue<boolean>('badge_rarity.uncommon') === true;

    return (code: string, ownerCount?: number, rarityId?: number): BadgeDetails => {
        const rarityLabel = (rarityId !== undefined) ? t(getBadgeRarityLabelKey(rarityId, uncommonRarityEnabled)) : undefined;

        return {
            name: getBadgeName(t, code),
            description: getBadgeDesc(t, code, badgePointLimits),
            rarity: (rarityId !== undefined)
                ? { text: t('badge.rarity.badge', '', { rarity: rarityLabel ?? '' }), color: getBadgeRarityWhiteBackgroundTagColor(rarityId, uncommonRarityEnabled) }
                : undefined,
            ownerCount: shouldShowBadgeOwnerCount(ownerCount) ? t('badge.owner_count', '', { count: String(ownerCount) }) : undefined,
        };
    };
};
