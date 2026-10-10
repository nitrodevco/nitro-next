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
 * Not ported: `playGlow` - the badge widget's glow for a standalone rarity tier on hover.
 */
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useState } from 'react';

import { useConfigValue } from '#base/context/system';
import { BoxLayout, getGlobalRect, GlobalRect, Region, useTextureFromUrl } from '#base/theme';
import { BadgeDetailsPopup } from '#base/views/shared/BadgeDetailsPopup';
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
    /** A group badge's details name the group (`userData.groupName`); without it none show. */
    groupName?: string;
    onPress?: () => void;
    layout?: BoxLayout;
}

export const InfostandBadgeView = ({ code, group = false, ownerCount, rarityId, groupName, onPress, layout }: InfostandBadgeViewProps) => {
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    const badgeDetails = useBadgeDetails();
    const [ anchor, setAnchor ] = useState<GlobalRect | null>(null);

    const url = !code?.length
        ? undefined
        : (group ? groupBadgeUrl.replace('%badgedata%', code) : badgeUrl.replace('%badgename%', code));
    const texture = useTextureFromUrl(url);

    // `showBadgeInfo` returns without a badge in the slot; `showGroupBadgeInfo` without a group.
    const hasDetails = group ? !!groupName : !!code?.length;

    const showDetails = (event: FederatedPointerEvent) => {
        if (hasDetails && (event.currentTarget instanceof PixiContainer)) setAnchor(getGlobalRect(event.currentTarget));
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
            {texture && (
                <pixiSprite
                    texture={texture}
                    layout={{ width: texture.width, height: texture.height }}
                />
            )}
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
