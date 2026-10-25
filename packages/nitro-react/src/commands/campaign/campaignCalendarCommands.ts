/**
 * `campaign/HabboCampaigns` - the campaign calendar (`openView/calendar`), which the server sends
 * unasked:
 *
 * - `CampaignCalendarData` (`onCampaignCalendarDataMessageEvent`): kept; a view already up keeps
 *   drawing from it.
 * - `openCampaignCalendarLink` (`linkReceived`): `openView/calendar` puts the view up when there
 *   is a calendar and none is up (`showCalendar`).
 * - `openCalendarDoor` (`openPackage` / `openPackageAsStaff`): the door asked for is kept as
 *   pending and `OpenCampaignCalendarDoor` (or the staff force open's
 *   `OpenCampaignCalendarDoorAsStaff`) sent with the calendar's name.
 * - `CampaignCalendarDoorOpened` (`onCampaignCalendarDoorOpenedMessageEvent`): a door that opened
 *   with a product the product data has (`showProductNotification`) adds the pending door to the
 *   opened ones and shows the product with its picture - the custom image under
 *   `image.library.url`, else the furni's icon. Anything else changes nothing.
 */
import type { CampaignCalendarDataMessageType, CampaignCalendarDoorOpenedMessageType } from '@nitrodevco/nitro-packets';
import { OpenCampaignCalendarDoorAsStaffComposer, OpenCampaignCalendarDoorComposer } from '@nitrodevco/nitro-packets';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

import { campaignCalendarStore } from '#base/context/campaign';
import { Send } from '#base/context/communication';
import { configString, systemStore } from '#base/context/system';
import { getFloorItemDataByName, getWallItemDataByName } from '#base/utils';

export const onCampaignCalendarData = (data: CampaignCalendarDataMessageType) => campaignCalendarStore.getState().setCalendar(data);

export const openCampaignCalendarLink = (parts: string[]) => {
    if (parts.length < 2 || parts[1] !== 'calendar') return;

    campaignCalendarStore.getState().show();
};

export const hideCampaignCalendar = () => campaignCalendarStore.getState().hide();

export const selectCalendarDay = (dayIndex: number) => campaignCalendarStore.getState().select(dayIndex);

export const openCalendarDoor = (send: Send, dayIndex: number, asStaff: boolean) => {
    const { calendar, setPendingDay } = campaignCalendarStore.getState();

    if (!calendar) return;

    setPendingDay(dayIndex);

    const params = { campaignName: calendar.campaignName, dayIndex };

    send(asStaff ? new OpenCampaignCalendarDoorAsStaffComposer(params) : new OpenCampaignCalendarDoorComposer(params));
};

/** `requestIconFromRoomEngine`: the floor furni's icon, else the wall furni's. */
const furnitureIconUrl = (className: string) => {
    const lookup = systemStore.getState();
    const floor = getFloorItemDataByName(lookup, className);

    if (floor) return GetRoomEngine().getFurnitureFloorIconUrl(floor.id) ?? '';

    const wall = getWallItemDataByName(lookup, className);

    return wall ? (GetRoomEngine().getFurnitureWallIconUrl(wall.id, undefined) ?? '') : '';
};

export const onCampaignCalendarDoorOpened = (data: CampaignCalendarDoorOpenedMessageType) => {
    if (!data.doorOpened) return;

    const { calendar, doorOpened } = campaignCalendarStore.getState();
    const product = systemStore.getState().productData[data.productName];

    if (!calendar || !product) return;

    if (data.customImage) doorOpened({ productName: product.name, image: (configString('image.library.url') ?? '') + data.customImage, furnitureIcon: false });
    else doorOpened({ productName: product.name, image: data.furnitureClassName ? furnitureIconUrl(data.furnitureClassName) : '', furnitureIcon: true });
};
