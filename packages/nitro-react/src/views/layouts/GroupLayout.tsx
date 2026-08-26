import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Icon, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1193_group_xml` (layout "group_info", 343x214) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupLayoutProps {
    layout?: BoxLayout;
    onJoinButton?: () => void;
    onLeaveButton?: () => void;
    onRequestMembershipButton?: () => void;
}

export const GroupLayout = ({ layout, onJoinButton, onLeaveButton, onRequestMembershipButton }: GroupLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 343, height: 214, ...layout }}>
            <Border
                variant="0"
                name="group_info"
                params={16}
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, width: 343, top: 0, height: 214 }}
            >
                <Region
                    name="group_name"
                    params={129}
                    layout={{ position: 'absolute', left: 125, width: 206, top: 9, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="Group Name Placeholder"
                        textStyle="text-style-u-bold"
                        textOptions={{ wordWrap: true, wordWrapWidth: 206 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="badge_image"
                    name="group_logo"
                    params={16}
                    options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                    layout={{ position: 'absolute', left: 11, width: 85, top: 14, height: 85 }}
                />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 103, width: 215, top: 42, height: 55 }}
                >
                    <Region
                        name="group_description_item_list"
                        params={2177}
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        <Region
                            name="group_description"
                            params={16}
                            layout={{ width: 215, height: 120, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Group Desc: pasdsad sadaddsad sadsa as dasd sad asd sada sdas das dsad sad asd asd ad ada sdas dsa das dsa dsad jhg jhg jh gjh gjh g"
                                textOptions={{ wordWrap: true, wordWrapWidth: 215 }}
                            />
                        </Region>
                    </Region>
                </ScrollArea>
                <Region
                    name="members_region"
                    params={17}
                    layout={{ position: 'absolute', left: 5, width: 97, top: 103, height: 18 }}
                >
                    <Region
                        name="members_txt"
                        params={786448}
                        layout={{ position: 'absolute', left: 10, width: 74, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Members PH"
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                </Region>
                <Region
                    name="pending_members_region"
                    params={17}
                    layout={{ position: 'absolute', left: 5, width: 97, top: 121, height: 18 }}
                >
                    <Region
                        name="pending_members_txt"
                        params={786448}
                        layout={{ position: 'absolute', left: 10, width: 74, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Members PH"
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                </Region>
                <Region
                    name="group_room_link_region"
                    params={17}
                    layout={{ position: 'absolute', left: 103, width: 238, top: 103, height: 18 }}
                >
                    <Region
                        name="group_room_link"
                        params={4194320}
                        layout={{ position: 'absolute', left: 0, width: 92, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('group.room.link')} />
                    </Region>
                </Region>
                <Region
                    name="buy_furni_link_region"
                    params={17}
                    layout={{ position: 'absolute', left: 103, width: 238, top: 119, height: 18 }}
                >
                    <Region
                        name="buy_furni_link"
                        params={4194320}
                        layout={{ position: 'absolute', left: 0, width: 86, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('group.buyfurni')} />
                    </Region>
                </Region>
                <Region
                    name="show_groups_link_region"
                    params={17}
                    layout={{ position: 'absolute', left: 103, width: 238, top: 137, height: 18 }}
                >
                    <Region
                        name="show_groups_link"
                        params={4194320}
                        layout={{ position: 'absolute', left: 0, width: 106, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('group.showgroups')} />
                    </Region>
                </Region>
                <Region
                    name="manage_guild_region"
                    params={17}
                    layout={{ position: 'absolute', left: 5, width: 97, top: 121, height: 18 }}
                >
                    <Region
                        name="manage_guild_link"
                        params={3932176}
                        layout={{ position: 'absolute', left: 0, width: 83, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('group.manage')} />
                    </Region>
                </Region>
                <Region
                    name="delete_guild_region"
                    params={17}
                    layout={{ position: 'absolute', left: 5, width: 97, top: 139, height: 18 }}
                >
                    <Region
                        name="delete_guild_link"
                        params={3932176}
                        layout={{ position: 'absolute', left: 0, width: 83, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('group.delete')} />
                    </Region>
                </Region>
                <ButtonThick
                    variant="3"
                    name="leave_button"
                    params={131089}
                    onPointerTap={onLeaveButton}
                    layout={{ position: 'absolute', left: 99, width: 160, top: 179, height: 29, minWidth: 160, maxWidth: 160 }}
                >
                    {t('group.leave')}
                </ButtonThick>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 99, width: 160, top: 179, height: 29, minWidth: 160, maxWidth: 160 }}
                >
                    <ButtonThick
                        variant="3"
                        name="join_button"
                        params={131089}
                        onPointerTap={onJoinButton}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        {t('group.join')}
                    </ButtonThick>
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 49, width: 260, top: 179, height: 29, minWidth: 260, maxWidth: 260 }}
                >
                    <ButtonThick
                        variant="3"
                        name="request_membership_button"
                        params={131089}
                        onPointerTap={onRequestMembershipButton}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        {t('group.requestmembership')}
                    </ButtonThick>
                </Region>
                <Region
                    name="you_are_owner_region"
                    tooltip={t('group.youareowner')}
                    params={17}
                    layout={{ position: 'absolute', left: 40, width: 20, top: 183, height: 20 }}
                >
                    <ThemeImage
                        name="icon_owner"
                        params={16}
                        src="${image.library.url}guilds/group_icon_big_owner.png"
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region
                    name="you_are_admin_region"
                    tooltip={t('group.youareadmin')}
                    params={17}
                    layout={{ position: 'absolute', left: 40, width: 20, top: 183, height: 20 }}
                >
                    <ThemeImage
                        name="icon_admin_off"
                        params={16}
                        src="${image.library.url}guilds/group_icon_big_admin.png"
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region
                    name="you_are_member_region"
                    tooltip={t('group.youaremember')}
                    params={17}
                    layout={{ position: 'absolute', left: 40, width: 20, top: 183, height: 20 }}
                >
                    <ThemeImage
                        name="icon_admin_over"
                        params={16}
                        src="${image.library.url}guilds/group_icon_big_member.png"
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region
                    name="membership_pending_txt"
                    params={208}
                    visible={false}
                    layout={{ position: 'absolute', left: 84, width: 175, top: 184, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={t('group.membershippending')} />
                </Region>
                <Icon
                    variant="8"
                    name="youaremember_icon"
                    params={16}
                    tintColor="#3ce600"
                    layout={{ position: 'absolute', left: 62, width: 16, top: 186, height: 16 }}
                />
                <Region
                    name="youaremember_txt"
                    params={208}
                    layout={{ position: 'absolute', left: 110, width: 123, top: 184, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={t('group.youaremember')} />
                </Region>
                <Region
                    name="created_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 103, width: 112, top: 27, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="Created at 24-Sep-2010"
                        textStyle="text-style-u-small"
                    />
                </Region>
                <Region
                    name="grouptype_region_0"
                    tooltip={t('group.edit.settings.type.regular.help')}
                    params={17}
                    layout={{ position: 'absolute', left: 107, width: 16, top: 10, height: 16 }}
                >
                    <ThemeImage
                        name="grouptype_icon_0"
                        params={16}
                        src="${image.library.url}guilds/grouptype_icon_5.png"
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                    />
                </Region>
                <Region
                    name="grouptype_region_1"
                    tooltip={t('group.edit.settings.type.exclusive.help')}
                    params={17}
                    layout={{ position: 'absolute', left: 107, width: 16, top: 10, height: 16 }}
                >
                    <ThemeImage
                        name="grouptype_icon_1"
                        params={16}
                        src="${image.library.url}guilds/grouptype_icon_1.png"
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                    />
                </Region>
                <Region
                    name="grouptype_region_2"
                    tooltip={t('group.edit.settings.type.private.help')}
                    params={17}
                    layout={{ position: 'absolute', left: 107, width: 16, top: 10, height: 16 }}
                >
                    <ThemeImage
                        name="grouptype_icon_2"
                        params={16}
                        src="${image.library.url}guilds/grouptype_icon_2.png"
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                    />
                </Region>
                <Region
                    name="group_decorate_icon_region"
                    tooltip={t('group.memberscandecorate')}
                    params={17}
                    layout={{ position: 'absolute', left: 125, width: 15, top: 10, height: 15 }}
                >
                    <ThemeImage
                        name="group_decorate_icon"
                        params={16}
                        src="${image.library.url}guilds/group_decorate_icon.png"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                    />
                </Region>
                <Region
                    name="show_forum_link_region"
                    params={17}
                    layout={{ position: 'absolute', left: 103, width: 255, top: 155, height: 18 }}
                >
                    <Region
                        name="show_forum_link"
                        params={4194320}
                        layout={{ position: 'absolute', left: 0, width: 103, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('group.showforum')} />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
