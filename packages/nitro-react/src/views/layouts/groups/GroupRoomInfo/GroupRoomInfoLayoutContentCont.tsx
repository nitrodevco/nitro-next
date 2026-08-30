import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Named region `content_cont` of GroupRoomInfoLayout - configured through the parent's `contentCont` prop. */
export interface GroupRoomInfoLayoutContentContProps {
    captionGroupNameTxt?: string;
    captionHeaderTxt?: string;
    groupLogo?: ReactNode;
    layout?: BoxLayout;
    onJoinButton?: () => void;
    onManageButton?: () => void;
    onRequestMembershipButton?: () => void;
    srcGroupBaseIcon?: string;
    srcGroupIcon?: string;
    tintGroupIcon?: string;
}

export const GroupRoomInfoLayoutContentCont = ({ captionGroupNameTxt, captionHeaderTxt, groupLogo, layout, onJoinButton, onManageButton, onRequestMembershipButton, srcGroupBaseIcon, srcGroupIcon, tintGroupIcon }: GroupRoomInfoLayoutContentContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content_cont"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionHeaderTxt ?? t('group.homeroominfo.title')}
                textOptions={{ fill: '#ffffff' }}
                name="header_txt"
                layout={{ position: 'absolute', marginLeft: -4.5, marginRight: 4.5, width: 156, top: 2, height: 18 }}
            />
            <ThemeText
                text={captionGroupNameTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 125 }}
                name="group_name_txt"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 59, width: 125, top: 27, height: 50 }}
            />
            <ThemeImage
                name="group_base_icon"
                src={srcGroupBaseIcon ?? '${image.library.url}guilds/group_base_icon.png'}
                layout={{ position: 'absolute', left: 5, width: 21, top: 3, height: 16 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="group_logo"
                options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 12, width: 39, top: 32, height: 39 }}
            >
                {groupLogo}
            </WidgetSlot>
            <ButtonThick
                variant="3"
                name="join_button"
                onPointerTap={onJoinButton}
                layout={{ position: 'absolute', left: 10, width: 175, top: 79, height: 29, minWidth: 175, maxWidth: 175 }}
            >
                {t('group.join')}
            </ButtonThick>
            <ButtonThick
                variant="3"
                name="request_membership_button"
                onPointerTap={onRequestMembershipButton}
                layout={{ position: 'absolute', left: 10, width: 175, top: 79, height: 29, minWidth: 175, maxWidth: 175 }}
            >
                {t('group.requestmembership')}
            </ButtonThick>
            <ButtonThick
                variant="3"
                name="manage_button"
                onPointerTap={onManageButton}
                layout={{ position: 'absolute', left: 10, width: 175, top: 79, height: 29, minWidth: 175, maxWidth: 175 }}
            >
                {t('group.manage')}
            </ButtonThick>
            <ThemeImage
                name="group_icon"
                src={srcGroupIcon}
                tint={tintGroupIcon}
                layout={{ position: 'absolute', left: 5, width: 16, top: 2, height: 19 }}
            />
        </Region>
    );
};
