import { RoomObjectWidgetRequestEvent, StringDataType } from '@nitrodevco/nitro-api';

import { useRoomWidget, useRoomWidgetActions, useTranslation } from '#base/context';
import { useRoomFurnitureData } from '#base/hooks';
import { FurnitureTrophyView } from '#base/views/room-widgets/furniture/FurnitureTrophyView';

/**
 * A badge on a plaque: both the badge display and a resolution trophy that has been achieved
 * engrave themselves the same way, and Flash rendered both through the trophy window. The stuff
 * data holds the badge code, who earned it and when, and the engraving is built from the badge's
 * own name and description.
 *
 * Flash asked the server for the badge's rarity to colour the display's plaque and add a line
 * about how many people hold it. That is an extra round trip on a packet the port does not have
 * yet, so the plaque takes its default theme.
 */
export const FurnitureBadgeEngravingWidget = () => {
    const badgeRequest = useRoomWidget(RoomObjectWidgetRequestEvent.BADGE_DISPLAY_ENGRAVING);
    const achievementRequest = useRoomWidget(RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_ENGRAVING);
    const request = badgeRequest ?? achievementRequest;
    const furnitureData = useRoomFurnitureData(request?.objectId ?? -1, request?.category ?? 0);
    const { closeRoomWidget } = useRoomWidgetActions();
    const t = useTranslation();

    if (!request || !(furnitureData?.stuffData instanceof StringDataType)) return null;

    const stuffData = furnitureData.stuffData;
    const isBadgeDisplay = !!badgeRequest;
    const badgeCode = stuffData.getValue(1);

    const message = t(
        isBadgeDisplay ? 'badge.display.engraving.text' : 'resolution.engraving.text',
        t(`badge_name_${badgeCode}`, badgeCode),
        {
            badgename: t(`badge_name_${badgeCode}`, badgeCode),
            badgedesc: `\r\n${t(`badge_desc_${badgeCode}`, '')}`,
        },
    );

    return (
        <FurnitureTrophyView
            color={0}
            title={isBadgeDisplay ? t('widget.furni.badge_display.title', 'Badge Display') : t('widget.furni.trophy.title', 'Trophy')}
            ownerName={stuffData.getValue(2)}
            date={stuffData.getValue(3)}
            message={message}
            onClose={() => closeRoomWidget(request.type)}
        />
    );
};
