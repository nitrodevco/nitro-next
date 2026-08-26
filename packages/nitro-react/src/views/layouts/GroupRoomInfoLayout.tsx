import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1184_group_room_info_xml` (layout "Group room info", 195x119) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupRoomInfoLayoutProps {
    layout?: BoxLayout;
    onJoinButton?: () => void;
    onManageButton?: () => void;
    onRequestMembershipButton?: () => void;
}

export const GroupRoomInfoLayout = ({ layout, onJoinButton, onManageButton, onRequestMembershipButton }: GroupRoomInfoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 195, height: 119, ...layout }}>
            <Region
                params={80}
                layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 119 }}
            >
                <ThemeImage
                    name="bg_expanded"
                    src="${image.library.url}guilds/group_bg.png"
                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 119 }}
                />
                <ThemeImage
                    name="bg_contracted"
                    src="${image.library.url}Events/event_bg_contracted.png"
                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 25 }}
                />
                <Region
                    name="title_region"
                    params={145}
                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 25 }}
                />
                <Region
                    name="info_region"
                    params={145}
                    layout={{ position: 'absolute', left: 0, width: 195, top: 28, height: 47 }}
                />
                <Region
                    name="content_cont"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 119 }}
                >
                    <Region
                        name="header_txt"
                        params={786448}
                        layout={{ position: 'absolute', left: 15, width: 156, top: 2, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('group.homeroominfo.title')}
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="group_name_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 59, width: 125, top: 27, height: 50, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Search around hotel and locate this very valuable dino egg jhg jhg jhg jh gjhg jhg jhg jhg jh gjhg jhg jhg jhg jhg jhgjhgjh gjhg jh gjhg jh gjhg jhg jhg jhg jhg jhg"
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 125 }}
                        />
                    </Region>
                    <ThemeImage
                        name="group_base_icon"
                        params={16}
                        src="${image.library.url}guilds/group_base_icon.png"
                        layout={{ position: 'absolute', left: 5, width: 21, top: 3, height: 16 }}
                    />
                    <WidgetSlot
                        widgetType="badge_image"
                        name="group_logo"
                        params={16}
                        options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                        layout={{ position: 'absolute', left: 12, width: 39, top: 32, height: 39 }}
                    />
                    <ButtonThick
                        variant="3"
                        name="join_button"
                        params={131089}
                        onPointerTap={onJoinButton}
                        layout={{ position: 'absolute', left: 10, width: 175, top: 79, height: 29, minWidth: 175, maxWidth: 175 }}
                    >
                        {t('group.join')}
                    </ButtonThick>
                    <ButtonThick
                        variant="3"
                        name="request_membership_button"
                        params={131089}
                        onPointerTap={onRequestMembershipButton}
                        layout={{ position: 'absolute', left: 10, width: 175, top: 79, height: 29, minWidth: 175, maxWidth: 175 }}
                    >
                        {t('group.requestmembership')}
                    </ButtonThick>
                    <ButtonThick
                        variant="3"
                        name="manage_button"
                        params={131089}
                        onPointerTap={onManageButton}
                        layout={{ position: 'absolute', left: 10, width: 175, top: 79, height: 29, minWidth: 175, maxWidth: 175 }}
                    >
                        {t('group.manage')}
                    </ButtonThick>
                    <ThemeImage
                        name="group_icon"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 5, width: 16, top: 2, height: 19 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
