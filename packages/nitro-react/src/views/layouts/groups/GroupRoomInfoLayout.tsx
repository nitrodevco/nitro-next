import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1184_group_room_info_xml` (layout "Group room info", 195x119) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupRoomInfoLayoutProps {
    contentCont?: GroupRoomInfoLayoutContentContProps;
    layout?: BoxLayout;
    onInfoRegion?: () => void;
    onTitleRegion?: () => void;
    srcBgContracted?: string;
    srcBgExpanded?: string;
}

export const GroupRoomInfoLayout = ({ contentCont, layout, onInfoRegion, onTitleRegion, srcBgContracted, srcBgExpanded }: GroupRoomInfoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 195, height: 119, ...layout }}>
            <Region layout={{ position: 'absolute', right: 0, width: 195, top: 0, height: 119 }}>
                <ThemeImage
                    name="bg_expanded"
                    src={srcBgExpanded ?? '${image.library.url}guilds/group_bg.png'}
                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 119 }}
                />
                <ThemeImage
                    name="bg_contracted"
                    src={srcBgContracted ?? '${image.library.url}Events/event_bg_contracted.png'}
                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 25 }}
                />
                <Region
                    name="title_region"
                    onPointerTap={onTitleRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 25 }}
                />
                <Region
                    name="info_region"
                    onPointerTap={onInfoRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 28, height: 47 }}
                />
                <GroupRoomInfoLayoutContentCont {...contentCont} />
            </Region>
        </Region>
    );
};

/** Named region `content_cont` of GroupRoomInfoLayout - configured through the parent's `contentCont` prop. */
export interface GroupRoomInfoLayoutContentContProps {
    captionGroupNameTxt?: string;
    captionHeaderTxt?: string;
    layout?: BoxLayout;
    onJoinButton?: () => void;
    onManageButton?: () => void;
    onRequestMembershipButton?: () => void;
    srcGroupBaseIcon?: string;
    srcGroupIcon?: string;
}

export const GroupRoomInfoLayoutContentCont = ({ captionGroupNameTxt, captionHeaderTxt, layout, onJoinButton, onManageButton, onRequestMembershipButton, srcGroupBaseIcon, srcGroupIcon }: GroupRoomInfoLayoutContentContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content_cont"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 119, justifyContent: 'center', ...layout }}
        >
            <Region
                name="header_txt"
                layout={{ position: 'absolute', marginLeft: -4.5, marginRight: 4.5, width: 156, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderTxt ?? t('group.homeroominfo.title')}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="group_name_txt"
                layout={{ position: 'absolute', left: 59, width: 125, top: 27, height: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionGroupNameTxt ?? 'Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 125 }}
                />
            </Region>
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
            />
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
                layout={{ position: 'absolute', left: 5, width: 16, top: 2, height: 19 }}
            />
        </Region>
    );
};
