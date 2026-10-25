/**
 * One badge slot of the infostand - the `badge_image` widget - and the badge details window
 * `InfoStandUserView` shows while the pointer is over it. A user badge is drawn from
 * `badge.asset.url`, a group badge from `badge.asset.group.url`.
 *
 * The details are `habbo-room-ui-com/badge_details` (`createBadgeDetails`), left of the badge
 * (`BadgeDetailsPopup`): `showBadgeInfo` (`WME_OVER` on `badge_<n>`) the badge's, with the slot's
 * `SelectedBadgeData`; `showGroupBadgeInfo` (`WME_OVER` on `badge_group`, while the user has a group)
 * the group's name alone. `WME_OUT` disposes it (`hideBadgeInfo`).
 *
 * A user badge of a standalone rarity tier glows (`BadgeImageWidget.playGlow`, `BadgeGlowImage`) as
 * `setBadge` shows it - `glowSignal` - and each time `showBadgeInfo` names it.
 */
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useState } from 'react';

import { useBadgeImageUrl, useGroupBadgeImageUrl } from '#base/context/system';
import { BoxLayout, getGlobalRect, GlobalRect, Region } from '#base/theme';
import { BadgeDetailsPopup } from '#base/views/shared/BadgeDetailsPopup';
import { BadgeGlowImage } from '#base/views/shared/BadgeGlowImage';
import { useBadgeDetails } from '#base/views/shared/useBadgeDetails';

export interface InfostandBadgeViewProps {
    /** A badge code, or for a group badge the badge data string. */
    code: string | undefined;
    group?: boolean;
    /**
     * The slot's `SelectedBadgeData` (`getSelectedBadge`): how many own the badge - shown for 1-999 -
     * and its rarity tier, which tags the details. Without either the slot has none.
     */
    ownerCount?: number;
    rarityId?: number;
    /** The slot's `glowColor` (`useBadgeGlowColors`); -1 or none for a badge that never glows. */
    glowColor?: number;
    /** Each new value is `setBadge` playing the glow (`playGlow` with `updateBadges`' flag set). */
    glowSignal?: number;
    /** A group badge's details name the group (`userData.groupName`); without it none show. */
    groupName?: string;
    onPress?: () => void;
    layout?: BoxLayout;
}

export const InfostandBadgeView = ({ code, group = false, ownerCount, rarityId, glowColor = -1, glowSignal, groupName, onPress, layout }: InfostandBadgeViewProps) => {
    const badgeUrl = useBadgeImageUrl();
    const groupBadgeUrl = useGroupBadgeImageUrl();
    const badgeDetails = useBadgeDetails();
    const [ anchor, setAnchor ] = useState<GlobalRect | null>(null);
    const [ hovers, setHovers ] = useState(0);

    const url = !code?.length
        ? undefined
        : (group ? groupBadgeUrl(code) : badgeUrl(code));

    // `showBadgeInfo` returns without a badge in the slot; `showGroupBadgeInfo` without a group.
    const hasDetails = group ? !!groupName : !!code?.length;

    const showDetails = (event: FederatedPointerEvent) => {
        if (!hasDetails) return;

        // `showBadgeInfo` glows a user badge before its details show; `showGroupBadgeInfo` has no glow.
        if (!group) setHovers(count => count + 1);
        if (event.currentTarget instanceof PixiContainer) setAnchor(getGlobalRect(event.currentTarget));
    };

    const details = (!anchor || !hasDetails)
        ? null
        : group ? { name: groupName ?? '', description: '' } : badgeDetails(code ?? '', ownerCount, rarityId);

    return (
        <Region
            cursor={onPress ? 'pointer' : undefined}
            onPointerTap={onPress}
            onPointerOver={showDetails}
            onPointerOut={() => setAnchor(null)}
            layout={{ width: 42, height: 42, alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <BadgeGlowImage
                url={url}
                glowColor={group ? -1 : glowColor}
                glowSignal={((glowSignal === undefined) && !hovers) ? undefined : `${glowSignal ?? ''}:${hovers}`}
            />
            {(anchor && details) && (
                <BadgeDetailsPopup
                    templateId="habbo-room-ui-com/badge_details"
                    anchor={anchor}
                    side="left"
                    details={details}
                />
            )}
        </Region>
    );
};
