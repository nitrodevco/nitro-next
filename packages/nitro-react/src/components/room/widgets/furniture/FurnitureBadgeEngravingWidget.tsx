import { BadgeRarity, getBadgeRarityDisplayColor, getBadgeRarityLabelKey, isBadgeRarityStandaloneTier, RoomObjectWidgetRequestEvent, StringDataType } from '@nitrodevco/nitro-api';
import { BadgeInfoMessageType, GetBadgeInfoComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useBadgePointLimits, useConfigBoolean, useTranslation } from '#base/context/system';
import { useRoomFurnitureData } from '#base/hooks';
import { getBadgeDesc, getBadgeName, shouldShowBadgeOwnerCount } from '#base/utils';
import { FurnitureTrophyView } from '#base/views/room-widgets/furniture/FurnitureTrophyView';
import { getTrophyHeaderColor } from '#base/views/room-widgets/furniture/trophyTheme';

/** `lightenColor`: each channel moved `amount` of the way to white, opaque. */
const lightenColor = (color: number, amount: number) => {
    const lighten = (channel: number) => channel + Math.trunc((255 - channel) * amount);

    return (0xFF000000 | (lighten((color >> 16) & 0xFF) << 16) | (lighten((color >> 8) & 0xFF) << 8) | lighten(color & 0xFF)) >>> 0;
};

/** `multiplyColor`: the two colours multiplied channel by channel, opaque. */
const multiplyColor = (a: number, b: number) => {
    const multiply = (shift: number) => Math.trunc((((a >> shift) & 0xFF) * ((b >> shift) & 0xFF)) / 255);

    return (0xFF000000 | (multiply(16) << 16) | (multiply(8) << 8) | multiply(0)) >>> 0;
};

/** `getBackgroundLighteningFactor`: uncommon to legendary lighten more the rarer they are. */
const LIGHTENING_FACTORS: Record<number, number> = { 1: 0.25, 2: 0.3, 3: 0.35, 4: 0.4, 5: 0.45 };

/**
 * `FurnitureBadgeDisplayWidgetHandler`'s plaque for a badge's rarity: a unique badge sits on gold,
 * every other one on silver (`getBadgeDisplayBackgroundTheme`). A standalone tier tints the plaque
 * with its lightened colour and multiplies the silver title bar by it; the unique tier keeps the
 * gold bar and an untinted plaque, and a tier folded into common the silver ones.
 */
const badgeDisplayTheme = (rarity: number, uncommonEnabled: boolean) => {
    const isUnique = (rarity === Number(BadgeRarity.Unique));
    const isStandalone = isBadgeRarityStandaloneTier(rarity, uncommonEnabled);
    const tint = lightenColor(getBadgeRarityDisplayColor(rarity, uncommonEnabled), LIGHTENING_FACTORS[rarity] ?? 0);

    return {
        theme: isUnique ? 0 : 1,
        headerColor: !isStandalone ? getTrophyHeaderColor(1) : (isUnique ? getTrophyHeaderColor(0) : multiplyColor(getTrophyHeaderColor(1), tint)),
        backgroundColor: (!isStandalone || isUnique) ? 0xFFFFFF : tint,
    };
};

/**
 * A badge on a plaque: both the badge display and a resolution trophy that has been achieved
 * engrave themselves the same way, and Flash rendered both through the trophy window. The stuff
 * data holds the badge code, who earned it and when, and the engraving is built from the badge's
 * own name and description.
 *
 * A badge display asks the server for its badge's figures each time it is used
 * (`handleEngravingRequest` sends `GetBadgeInfo`) and shows only once they come back for that badge
 * (`onBadgeInfo`): the plaque takes the badge's rarity colours and the engraving gains a line
 * "<rarity> badge", with " - Owned by N users" for 1-999 owners (`getBadgeDisplayMessage`). The
 * plaque already open stays until then. A resolution trophy asks nothing and shows gold at once.
 */
export const FurnitureBadgeEngravingWidget = () => {
    const badgeRequest = useRoomWidget<BadgeInfoMessageType>(RoomObjectWidgetRequestEvent.BADGE_DISPLAY_ENGRAVING);
    const achievementRequest = useRoomWidget(RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_ENGRAVING);
    const request = badgeRequest ?? achievementRequest;
    const furnitureData = useRoomFurnitureData(request?.objectId ?? -1, request?.category ?? 0);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const badgePointLimits = useBadgePointLimits();
    // `isUncommonBadgeRarityEnabled`.
    const uncommonEnabled = useConfigBoolean('badge_rarity.uncommon');

    const stuffData = (furnitureData?.stuffData instanceof StringDataType) ? furnitureData.stuffData : undefined;
    const badgeCode = stuffData?.getValue(1) ?? '';
    const badgeObjectId = badgeRequest?.objectId ?? -1;
    const badgeSequence = badgeRequest?.sequence ?? -1;

    // Every use of a badge display asks again, the same one included.
    useEffect(() => {
        if ((badgeObjectId < 0) || !badgeCode) return;

        send(new GetBadgeInfoComposer({ badgeCode }));
    }, [ badgeObjectId, badgeSequence, badgeCode, send ]);

    if (!request || !stuffData) return null;

    const isBadgeDisplay = !!badgeRequest;
    // `onBadgeInfo` takes only the figures for the badge it asked about.
    const badgeInfo = (badgeRequest?.data?.badgeCode === badgeCode) ? badgeRequest.data : undefined;

    if (isBadgeDisplay && !badgeInfo) return null;

    let message = t(
        isBadgeDisplay ? 'badge.display.engraving.text' : 'resolution.engraving.text',
        getBadgeName(t, badgeCode),
        {
            badgename: getBadgeName(t, badgeCode),
            badgedesc: `\r\n${getBadgeDesc(t, badgeCode, badgePointLimits)}`,
        },
    );

    let theme = { theme: 0, headerColor: getTrophyHeaderColor(0), backgroundColor: 0xFFFFFF };

    if (badgeInfo) {
        const rarityKey = getBadgeRarityLabelKey(badgeInfo.badgeRarityId, uncommonEnabled);
        const parts = message ? [ `${message}\n\n\n` ] : [];

        parts.push(t('badge.rarity.badge', '%rarity% badge', { rarity: t(rarityKey, rarityKey) }));

        if (shouldShowBadgeOwnerCount(badgeInfo.ownerCount)) parts.push(` - ${t('badge.owner_count', 'Owned by %count% users', { count: String(badgeInfo.ownerCount) })}`);

        message = parts.join('');
        theme = badgeDisplayTheme(badgeInfo.badgeRarityId, uncommonEnabled);
    }

    return (
        <FurnitureTrophyView
            color={theme.theme}
            headerColor={theme.headerColor}
            backgroundColor={theme.backgroundColor}
            title={isBadgeDisplay ? t('widget.furni.badge_display.title', 'Badge Display') : t('widget.furni.trophy.title', 'Trophy')}
            ownerName={stuffData.getValue(2)}
            date={stuffData.getValue(3)}
            message={message}
            onClose={() => closeRoomWidget(request.type)}
        />
    );
};
