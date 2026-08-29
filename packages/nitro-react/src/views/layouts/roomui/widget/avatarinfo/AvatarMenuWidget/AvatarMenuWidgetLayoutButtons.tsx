import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { AvatarMenuWidgetLayoutActionsItem } from './AvatarMenuWidgetLayoutActionsItem';
import { AvatarMenuWidgetLayoutAmbassadorAlertItem } from './AvatarMenuWidgetLayoutAmbassadorAlertItem';
import { AvatarMenuWidgetLayoutAmbassadorItem } from './AvatarMenuWidgetLayoutAmbassadorItem';
import { AvatarMenuWidgetLayoutAmbassadorKickItem } from './AvatarMenuWidgetLayoutAmbassadorKickItem';
import { AvatarMenuWidgetLayoutAmbassadorMute2minItem } from './AvatarMenuWidgetLayoutAmbassadorMute2minItem';
import { AvatarMenuWidgetLayoutAmbassadorMute10minItem } from './AvatarMenuWidgetLayoutAmbassadorMute10minItem';
import { AvatarMenuWidgetLayoutAmbassadorMute15minItem } from './AvatarMenuWidgetLayoutAmbassadorMute15minItem';
import { AvatarMenuWidgetLayoutAmbassadorMute18hourItem } from './AvatarMenuWidgetLayoutAmbassadorMute18hourItem';
import { AvatarMenuWidgetLayoutAmbassadorMute36hourItem } from './AvatarMenuWidgetLayoutAmbassadorMute36hourItem';
import { AvatarMenuWidgetLayoutAmbassadorMute60minItem } from './AvatarMenuWidgetLayoutAmbassadorMute60minItem';
import { AvatarMenuWidgetLayoutAmbassadorMute72hourItem } from './AvatarMenuWidgetLayoutAmbassadorMute72hourItem';
import { AvatarMenuWidgetLayoutAmbassadorUnmuteItem } from './AvatarMenuWidgetLayoutAmbassadorUnmuteItem';
import { AvatarMenuWidgetLayoutBanDayItem } from './AvatarMenuWidgetLayoutBanDayItem';
import { AvatarMenuWidgetLayoutBanHourItem } from './AvatarMenuWidgetLayoutBanHourItem';
import { AvatarMenuWidgetLayoutBanWithDurationItem } from './AvatarMenuWidgetLayoutBanWithDurationItem';
import { AvatarMenuWidgetLayoutBlowItem } from './AvatarMenuWidgetLayoutBlowItem';
import { AvatarMenuWidgetLayoutChangeBotNameItem } from './AvatarMenuWidgetLayoutChangeBotNameItem';
import { AvatarMenuWidgetLayoutDanceItem } from './AvatarMenuWidgetLayoutDanceItem';
import { AvatarMenuWidgetLayoutDonateToAllItem } from './AvatarMenuWidgetLayoutDonateToAllItem';
import { AvatarMenuWidgetLayoutDonateToUserItem } from './AvatarMenuWidgetLayoutDonateToUserItem';
import { AvatarMenuWidgetLayoutDressUpItem } from './AvatarMenuWidgetLayoutDressUpItem';
import { AvatarMenuWidgetLayoutFriendItem } from './AvatarMenuWidgetLayoutFriendItem';
import { AvatarMenuWidgetLayoutGiveRightsItem } from './AvatarMenuWidgetLayoutGiveRightsItem';
import { AvatarMenuWidgetLayoutIgnoreItem } from './AvatarMenuWidgetLayoutIgnoreItem';
import { AvatarMenuWidgetLayoutKickItem } from './AvatarMenuWidgetLayoutKickItem';
import { AvatarMenuWidgetLayoutLinkTemplateItem } from './AvatarMenuWidgetLayoutLinkTemplateItem';
import { AvatarMenuWidgetLayoutModerateItem } from './AvatarMenuWidgetLayoutModerateItem';
import { AvatarMenuWidgetLayoutMute2minItem } from './AvatarMenuWidgetLayoutMute2minItem';
import { AvatarMenuWidgetLayoutMute5minItem } from './AvatarMenuWidgetLayoutMute5minItem';
import { AvatarMenuWidgetLayoutMute10minItem } from './AvatarMenuWidgetLayoutMute10minItem';
import { AvatarMenuWidgetLayoutMuteItem } from './AvatarMenuWidgetLayoutMuteItem';
import { AvatarMenuWidgetLayoutNoRelationshipItem } from './AvatarMenuWidgetLayoutNoRelationshipItem';
import { AvatarMenuWidgetLayoutNuxAgainItem } from './AvatarMenuWidgetLayoutNuxAgainItem';
import { AvatarMenuWidgetLayoutNuxNextDayItem } from './AvatarMenuWidgetLayoutNuxNextDayItem';
import { AvatarMenuWidgetLayoutNuxProceed1Item } from './AvatarMenuWidgetLayoutNuxProceed1Item';
import { AvatarMenuWidgetLayoutNuxRestartItem } from './AvatarMenuWidgetLayoutNuxRestartItem';
import { AvatarMenuWidgetLayoutNuxTakeTourItem } from './AvatarMenuWidgetLayoutNuxTakeTourItem';
import { AvatarMenuWidgetLayoutOpenProfileItem } from './AvatarMenuWidgetLayoutOpenProfileItem';
import { AvatarMenuWidgetLayoutPassHanditemItem } from './AvatarMenuWidgetLayoutPassHanditemItem';
import { AvatarMenuWidgetLayoutPerformItem } from './AvatarMenuWidgetLayoutPerformItem';
import { AvatarMenuWidgetLayoutPermBanItem } from './AvatarMenuWidgetLayoutPermBanItem';
import { AvatarMenuWidgetLayoutPickItem } from './AvatarMenuWidgetLayoutPickItem';
import { AvatarMenuWidgetLayoutRandomWalkItem } from './AvatarMenuWidgetLayoutRandomWalkItem';
import { AvatarMenuWidgetLayoutRelationshipGridItem } from './AvatarMenuWidgetLayoutRelationshipGridItem';
import { AvatarMenuWidgetLayoutRelationshipItem } from './AvatarMenuWidgetLayoutRelationshipItem';
import { AvatarMenuWidgetLayoutRemoveRightsItem } from './AvatarMenuWidgetLayoutRemoveRightsItem';
import { AvatarMenuWidgetLayoutReplenishRespectItem } from './AvatarMenuWidgetLayoutReplenishRespectItem';
import { AvatarMenuWidgetLayoutReportItem } from './AvatarMenuWidgetLayoutReportItem';
import { AvatarMenuWidgetLayoutRespectItem } from './AvatarMenuWidgetLayoutRespectItem';
import { AvatarMenuWidgetLayoutSetupChatItem } from './AvatarMenuWidgetLayoutSetupChatItem';
import { AvatarMenuWidgetLayoutTradeItem } from './AvatarMenuWidgetLayoutTradeItem';
import { AvatarMenuWidgetLayoutUnignoreItem } from './AvatarMenuWidgetLayoutUnignoreItem';
import { AvatarMenuWidgetLayoutWhisperItem } from './AvatarMenuWidgetLayoutWhisperItem';
import { AvatarMenuWidgetLayoutWiredInspectItem } from './AvatarMenuWidgetLayoutWiredInspectItem';

/** Named region `buttons` of AvatarMenuWidgetLayout - configured through the parent's `buttons` prop. */
export interface AvatarMenuWidgetLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const AvatarMenuWidgetLayoutButtons = ({ itemsButtons, layout }: AvatarMenuWidgetLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', left: 2, right: 2, top: 28, minHeight: 1402, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <AvatarMenuWidgetLayoutOpenProfileItem />
                    <AvatarMenuWidgetLayoutFriendItem />
                    <AvatarMenuWidgetLayoutTradeItem />
                    <AvatarMenuWidgetLayoutWhisperItem />
                    <AvatarMenuWidgetLayoutRespectItem />
                    <AvatarMenuWidgetLayoutReplenishRespectItem />
                    <AvatarMenuWidgetLayoutBlowItem />
                    <AvatarMenuWidgetLayoutPerformItem />
                    <AvatarMenuWidgetLayoutRelationshipItem />
                    <AvatarMenuWidgetLayoutKickItem />
                    <AvatarMenuWidgetLayoutMuteItem />
                    <AvatarMenuWidgetLayoutMute2minItem />
                    <AvatarMenuWidgetLayoutMute5minItem />
                    <AvatarMenuWidgetLayoutMute10minItem />
                    <AvatarMenuWidgetLayoutBanWithDurationItem />
                    <AvatarMenuWidgetLayoutBanHourItem />
                    <AvatarMenuWidgetLayoutBanDayItem />
                    <AvatarMenuWidgetLayoutPermBanItem />
                    <AvatarMenuWidgetLayoutGiveRightsItem />
                    <AvatarMenuWidgetLayoutRemoveRightsItem />
                    <AvatarMenuWidgetLayoutUnignoreItem />
                    <AvatarMenuWidgetLayoutIgnoreItem />
                    <AvatarMenuWidgetLayoutReportItem />
                    <AvatarMenuWidgetLayoutModerateItem />
                    <AvatarMenuWidgetLayoutRelationshipGridItem />
                    <AvatarMenuWidgetLayoutNoRelationshipItem />
                    <AvatarMenuWidgetLayoutActionsItem />
                    <AvatarMenuWidgetLayoutPassHanditemItem />
                    <AvatarMenuWidgetLayoutChangeBotNameItem />
                    <AvatarMenuWidgetLayoutDressUpItem />
                    <AvatarMenuWidgetLayoutSetupChatItem />
                    <AvatarMenuWidgetLayoutRandomWalkItem />
                    <AvatarMenuWidgetLayoutDanceItem />
                    <AvatarMenuWidgetLayoutPickItem />
                    <AvatarMenuWidgetLayoutNuxProceed1Item />
                    <AvatarMenuWidgetLayoutNuxTakeTourItem />
                    <AvatarMenuWidgetLayoutNuxAgainItem />
                    <AvatarMenuWidgetLayoutNuxRestartItem />
                    <AvatarMenuWidgetLayoutNuxNextDayItem />
                    <AvatarMenuWidgetLayoutLinkTemplateItem />
                    <AvatarMenuWidgetLayoutAmbassadorItem />
                    <AvatarMenuWidgetLayoutAmbassadorAlertItem />
                    <AvatarMenuWidgetLayoutAmbassadorKickItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute2minItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute10minItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute15minItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute60minItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute18hourItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute36hourItem />
                    <AvatarMenuWidgetLayoutAmbassadorMute72hourItem />
                    <AvatarMenuWidgetLayoutAmbassadorUnmuteItem />
                    <AvatarMenuWidgetLayoutDonateToAllItem />
                    <AvatarMenuWidgetLayoutDonateToUserItem />
                    <AvatarMenuWidgetLayoutWiredInspectItem />
                </>
            )}
        </Region>
    );
};
