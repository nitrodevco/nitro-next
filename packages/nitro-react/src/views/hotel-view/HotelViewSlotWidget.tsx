/**
 * One widget of the reception - `LandingViewWidgetType.getWidgetForType` for the types the port
 * draws (`PORTED_LANDING_VIEW_WIDGETS`), including `WidgetContainerWidget`, which shows whichever
 * widget the timing code of its slot's schedule names (`switchCurrentWidget`). Until that code
 * arrives, or when it is empty, the container is its own empty `widget_container_widget`.
 */
import { HOTEL_VIEW_BOTTOM_SLOT, hotelViewCodeWidget, HotelViewCommonSettings, hotelViewSlotSchedule, LandingViewWidgetType, PORTED_LANDING_VIEW_WIDGETS, useConfigData, useSystemStore } from '#base/context/system';
import { TemplateWindow } from '#base/theme';

import { HotelViewAvatarImageWidget } from './HotelViewAvatarImageWidget';
import { HotelViewBonusRareWidget } from './HotelViewBonusRareWidget';
import { HotelViewCatalogPromoWidget } from './HotelViewCatalogPromoWidget';
import { HotelViewCommunityGoalWidget } from './HotelViewCommunityGoalWidget';
import { HotelViewCompetitionPrizesWidget } from './HotelViewCompetitionPrizesWidget';
import { HotelViewDailyQuestWidget } from './HotelViewDailyQuestWidget';
import { HotelViewExpiringCatalogPageWidget } from './HotelViewExpiringCatalogPageWidget';
import { HotelViewGenericWidget } from './HotelViewGenericWidget';
import { HotelViewHabboWayPromoWidget } from './HotelViewHabboWayPromoWidget';
import { HotelViewHallOfFameWidget } from './HotelViewHallOfFameWidget';
import { HotelViewModerationPromoWidget } from './HotelViewModerationPromoWidget';
import { HotelViewNextLimitedRareWidget } from './HotelViewNextLimitedRareWidget';
import { HotelViewPromoArticleWidget } from './HotelViewPromoArticleWidget';
import { HotelViewRoomHopperNetworkWidget } from './HotelViewRoomHopperNetworkWidget';
import { HotelViewSafetyQuizPromoWidget } from './HotelViewSafetyQuizPromoWidget';
import { HotelViewTalentsPromoWidget } from './HotelViewTalentsPromoWidget';
import { hotelViewTemplateId } from './hotelViewTemplate';

interface HotelViewSlotWidgetProps {
    type: string;
    slot: number;
    code: string | null;
    settings: HotelViewCommonSettings;
}

const HotelViewContainerWidget = ({ slot, settings }: { slot: number; settings: HotelViewCommonSettings }) => {
    const config = useConfigData();
    const code = useSystemStore(x => x.hotelViewTimingCodes[hotelViewSlotSchedule(config, slot)]);
    const type = code ? hotelViewCodeWidget(config, code) : '';

    if (!code || !PORTED_LANDING_VIEW_WIDGETS.has(type) || (type === LandingViewWidgetType.WIDGETCONTAINER)) return <TemplateWindow id={hotelViewTemplateId('widget_container_widget')} />;

    return (
        <HotelViewSlotWidget
            type={type}
            slot={slot}
            code={code}
            settings={settings}
        />
    );
};

export const HotelViewSlotWidget = ({ type, slot, code, settings }: HotelViewSlotWidgetProps) => {
    switch (type) {
        case LandingViewWidgetType.WIDGETCONTAINER:
            return (
                <HotelViewContainerWidget
                    slot={slot}
                    settings={settings}
                />
            );
        case LandingViewWidgetType.GENERIC:
            return (
                <HotelViewGenericWidget
                    slot={slot}
                    code={code}
                    settings={settings}
                />
            );
        case LandingViewWidgetType.BONUSRARE:
            return <HotelViewBonusRareWidget settings={settings} />;
        case LandingViewWidgetType.PROMOARTICLE:
            return <HotelViewPromoArticleWidget settings={settings} />;
        case LandingViewWidgetType.COMMUNITYGOAL:
        case LandingViewWidgetType.COMMUNITYGOALVS:
        case LandingViewWidgetType.COMMUNITYGOALVSVOTE:
            return (
                <HotelViewCommunityGoalWidget
                    type={type}
                    settings={settings}
                />
            );
        case LandingViewWidgetType.EXPIRINGCATALOGPAGE:
        case LandingViewWidgetType.EXPIRINGCATALOGPAGESMALL:
            return (
                <HotelViewExpiringCatalogPageWidget
                    small={type === LandingViewWidgetType.EXPIRINGCATALOGPAGESMALL}
                    settings={settings}
                />
            );
        case LandingViewWidgetType.NEXTLIMITEDRARECOUNTDOWN:
            return <HotelViewNextLimitedRareWidget settings={settings} />;
        case LandingViewWidgetType.AVATARIMAGE:
            return <HotelViewAvatarImageWidget />;
        case LandingViewWidgetType.CATALOGPROMO:
        case LandingViewWidgetType.CATALOGPROMOSMALL:
            return (
                <HotelViewCatalogPromoWidget
                    small={type === LandingViewWidgetType.CATALOGPROMOSMALL}
                    settings={settings}
                />
            );
        case LandingViewWidgetType.HABBOMODERATIONPROMO:
            return <HotelViewModerationPromoWidget />;
        case LandingViewWidgetType.HABBOTALENTSPROMO:
            return <HotelViewTalentsPromoWidget />;
        case LandingViewWidgetType.HABBOWAYPROMO:
            return <HotelViewHabboWayPromoWidget />;
        case LandingViewWidgetType.SAFETYQUIZPROMO:
            return <HotelViewSafetyQuizPromoWidget bottomSlot={slot === HOTEL_VIEW_BOTTOM_SLOT} />;
        case LandingViewWidgetType.ROOMHOPPERNETWORK:
            return <HotelViewRoomHopperNetworkWidget />;
        case LandingViewWidgetType.DAILYQUEST:
            return (
                <HotelViewDailyQuestWidget
                    slot={slot}
                    code={code}
                />
            );
        case LandingViewWidgetType.ACHIEVEMENTCOMPETITIONPRIZES:
            return <HotelViewCompetitionPrizesWidget settings={settings} />;
        case LandingViewWidgetType.ACHIEVEMENTCOMPETITIONHALLOFFAME:
            return <HotelViewHallOfFameWidget />;
        default:
            return null;
    }
};
