/**
 * One badge slot of the infostand - the `badge_image` widget - and the badge details window
 * `InfoStandUserView` shows while the pointer is over it. A user badge is drawn from
 * `badge.asset.url`, a group badge from `badge.asset.group.url`.
 *
 * The details are `habbo-room-ui-com/badge_details` (`createBadgeDetails`: `buildFromXML` of the
 * `badge_details` asset) filled by `populateBadgeDetails`:
 *
 * - `showBadgeInfo` (`WME_OVER` on `badge_<n>`): the badge's name and description
 *   (`getBadgeName` / `getBadgeDesc`) and the slot's `SelectedBadgeData`, which shows `rarity_tag` -
 *   `badge.rarity.badge` with the tier's `BadgeRarity.getLabelLocalizationKey` text in white
 *   (`rarity`, and the same text in `rarity_border`) on the tier's
 *   `BadgeRarity.getWhiteBackgroundTagColor` - and `owner_count` (`badge.owner_count`) for 1-999
 *   owners (`shouldShowOwnerCount`).
 * - `showGroupBadgeInfo` (`WME_OVER` on `badge_group`, while the user has a group): the group's
 *   name alone - no description, no selected-badge data.
 * - `details_list.arrangeListItems()` and the window `details_list.y + details_list.height + 6`
 *   high; it opens on the desktop with its right edge on the badge's left, centred on the badge's
 *   height (`getGlobalRectangle`), and `WME_OUT` disposes it (`hideBadgeInfo`).
 *
 * Not ported: `playGlow` - the badge widget's glow for a standalone rarity tier on hover.
 */
import { getBadgeRarityLabelKey, getBadgeRarityWhiteBackgroundTagColor } from '@nitrodevco/nitro-api';
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useState } from 'react';

import { useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { Box, BoxLayout, FloatingPopup, getGlobalRect, GlobalRect, Region, TemplateBindings, TemplateWindow, TemplateWindows, useLayoutSize, useTextureFromUrl } from '#base/theme';
import { getBadgeDesc, getBadgeName, shouldShowBadgeOwnerCount } from '#base/utils';

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

/** `badge_details`' layout width, which the window's right edge is placed by. */
const DETAILS_WIDTH = 263;

/** `populateBadgeDetails`: the window ends this far under `details_list`. */
const DETAILS_BOTTOM_SPACING = 6;

/** `rarity.textColor = 16777215`. */
const RARITY_TEXT_COLOR = 0xffffff;

interface BadgeDetailsProps {
    anchor: GlobalRect;
    name: string;
    description: string;
    rarity?: { text: string; color: number };
    ownerCount?: string;
}

/** The `badge_details` window, on the desktop left of the badge it names. */
const BadgeDetails = ({ anchor, name, description, rarity, ownerCount }: BadgeDetailsProps) => {
    const [ node, setNode ] = useState<PixiContainer | null>(null);
    const size = useLayoutSize(node);

    const bindings: TemplateBindings = {
        name: { caption: name },
        description: { visible: !!description.length, caption: description },
        rarity_tag: rarity ? { visible: true, color: rarity.color } : { visible: false },
        rarity_border: { caption: rarity?.text ?? '' },
        rarity: { caption: rarity?.text ?? '', color: RARITY_TEXT_COLOR },
        owner_count: { visible: ownerCount !== undefined, caption: ownerCount ?? '' },
    };

    const arrange = ({ find, root }: TemplateWindows) => {
        const list = find('details_list');

        if (list) root()?.setHeight(list.y + list.height + DETAILS_BOTTOM_SPACING);
    };

    return (
        <FloatingPopup
            x={Math.trunc(anchor.x - DETAILS_WIDTH)}
            y={Math.trunc(anchor.y + ((anchor.height - size.height) / 2))}
            onOutsideClick={() => undefined}
        >
            <Box
                ref={setNode}
                eventMode="none"
                layout={{ flexDirection: 'column' }}
            >
                <TemplateWindow
                    id="habbo-room-ui-com/badge_details"
                    bindings={bindings}
                    arrange={arrange}
                />
            </Box>
        </FloatingPopup>
    );
};

export const InfostandBadgeView = ({ code, group = false, ownerCount, rarityId, groupName, onPress, layout }: InfostandBadgeViewProps) => {
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const groupBadgeUrl = useConfigValue<string>('badge.asset.group.url') ?? '';
    // `isUncommonBadgeRarityEnabled`.
    const uncommonRarityEnabled = useConfigValue<boolean>('badge_rarity.uncommon') === true;
    const t = useTranslation();
    const badgePointLimits = useSystemStore(x => x.badgePointLimits);
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

    const details = (() => {
        if (!anchor || !hasDetails) return null;

        if (group) return { name: groupName ?? '', description: '' };

        const badgeCode = code ?? '';
        const rarityLabel = (rarityId !== undefined) ? t(getBadgeRarityLabelKey(rarityId, uncommonRarityEnabled)) : undefined;
        const showsOwnerCount = shouldShowBadgeOwnerCount(ownerCount);

        return {
            name: getBadgeName(t, badgeCode),
            description: getBadgeDesc(t, badgeCode, badgePointLimits),
            rarity: (rarityId !== undefined)
                ? { text: t('badge.rarity.badge', '', { rarity: rarityLabel ?? '' }), color: getBadgeRarityWhiteBackgroundTagColor(rarityId, uncommonRarityEnabled) }
                : undefined,
            ownerCount: showsOwnerCount ? t('badge.owner_count', '', { count: String(ownerCount) }) : undefined,
        };
    })();

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
                <BadgeDetails
                    anchor={anchor}
                    {...details}
                />
            )}
        </Region>
    );
};
