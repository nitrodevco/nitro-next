/** `HabboCampaigns`' two packets: the calendar, sent unasked, and a door's answer. */
import { CampaignCalendarDataMessage, CampaignCalendarDoorOpenedMessage } from '@nitrodevco/nitro-packets';

import { onCampaignCalendarData, onCampaignCalendarDoorOpened } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCampaignHandlers = ({ subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(CampaignCalendarDataMessage, onCampaignCalendarData),
    on(CampaignCalendarDoorOpenedMessage, onCampaignCalendarDoorOpened),
]);
