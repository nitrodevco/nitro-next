import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Icon, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1193_group_xml` (layout "group_info", 343x214) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupLayoutProps {
    captionBuyFurniLink?: string;
    captionCreatedTxt?: string;
    captionDeleteGuildLink?: string;
    captionGroupName?: string;
    captionGroupRoomLink?: string;
    captionManageGuildLink?: string;
    captionMembershipPendingTxt?: string;
    captionMembersTxt?: string;
    captionPendingMembersTxt?: string;
    captionShowForumLink?: string;
    captionShowGroupsLink?: string;
    captionYouarememberTxt?: string;
    itemsGroupDescriptionItemList?: ReactNode;
    layout?: BoxLayout;
    onBuyFurniLinkRegion?: () => void;
    onDeleteGuildRegion?: () => void;
    onGroupDecorateIconRegion?: () => void;
    onGroupRoomLinkRegion?: () => void;
    onGrouptypeRegion0?: () => void;
    onGrouptypeRegion1?: () => void;
    onGrouptypeRegion2?: () => void;
    onJoinButton?: () => void;
    onLeaveButton?: () => void;
    onManageGuildRegion?: () => void;
    onMembersRegion?: () => void;
    onPendingMembersRegion?: () => void;
    onRequestMembershipButton?: () => void;
    onShowForumLinkRegion?: () => void;
    onShowGroupsLinkRegion?: () => void;
    onYouAreAdminRegion?: () => void;
    onYouAreMemberRegion?: () => void;
    onYouAreOwnerRegion?: () => void;
    srcGroupDecorateIcon?: string;
    srcGrouptypeIcon0?: string;
    srcGrouptypeIcon1?: string;
    srcGrouptypeIcon2?: string;
    srcIconAdminOff?: string;
    srcIconAdminOver?: string;
    srcIconOwner?: string;
    visibleJoinButton?: boolean;
    visibleRequestMembershipButton?: boolean;
}

export const GroupLayout = ({ captionBuyFurniLink, captionCreatedTxt, captionDeleteGuildLink, captionGroupName, captionGroupRoomLink, captionManageGuildLink, captionMembershipPendingTxt, captionMembersTxt, captionPendingMembersTxt, captionShowForumLink, captionShowGroupsLink, captionYouarememberTxt, itemsGroupDescriptionItemList, layout, onBuyFurniLinkRegion, onDeleteGuildRegion, onGroupDecorateIconRegion, onGroupRoomLinkRegion, onGrouptypeRegion0, onGrouptypeRegion1, onGrouptypeRegion2, onJoinButton, onLeaveButton, onManageGuildRegion, onMembersRegion, onPendingMembersRegion, onRequestMembershipButton, onShowForumLinkRegion, onShowGroupsLinkRegion, onYouAreAdminRegion, onYouAreMemberRegion, onYouAreOwnerRegion, srcGroupDecorateIcon, srcGrouptypeIcon0, srcGrouptypeIcon1, srcGrouptypeIcon2, srcIconAdminOff, srcIconAdminOver, srcIconOwner, visibleJoinButton, visibleRequestMembershipButton }: GroupLayoutProps) => {
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
                    layout={{ position: 'absolute', left: 125, right: 12, top: 9, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionGroupName ?? 'Group Name Placeholder'}
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
                    layout={{ position: 'absolute', left: 103, right: 25, top: 42, bottom: 117 }}
                >
                    <Region
                        name="group_description_item_list"
                        params={2177}
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsGroupDescriptionItemList ?? (
                            <GroupLayoutGroupDescriptionItem />
                        )}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for group_description_item_list - rendered by that list's ScrollArea */}
                <Region
                    name="members_region"
                    params={17}
                    onPointerTap={onMembersRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 5, width: 97, top: 103, height: 18 }}
                >
                    <Region
                        name="members_txt"
                        params={786448}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -38.5, width: 74, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionMembersTxt ?? 'Members PH'}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                </Region>
                <Region
                    name="pending_members_region"
                    params={17}
                    onPointerTap={onPendingMembersRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 5, width: 97, top: 121, height: 18 }}
                >
                    <Region
                        name="pending_members_txt"
                        params={786448}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -38.5, width: 74, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPendingMembersTxt ?? 'Members PH'}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                </Region>
                <Region
                    name="group_room_link_region"
                    params={17}
                    onPointerTap={onGroupRoomLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 103, width: 238, top: 103, height: 18 }}
                >
                    <Region
                        name="group_room_link"
                        params={4194320}
                        layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionGroupRoomLink ?? t('group.room.link')} />
                    </Region>
                </Region>
                <Region
                    name="buy_furni_link_region"
                    params={17}
                    onPointerTap={onBuyFurniLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 103, width: 238, top: 119, height: 18 }}
                >
                    <Region
                        name="buy_furni_link"
                        params={4194320}
                        layout={{ position: 'absolute', left: 0, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionBuyFurniLink ?? t('group.buyfurni')} />
                    </Region>
                </Region>
                <Region
                    name="show_groups_link_region"
                    params={17}
                    onPointerTap={onShowGroupsLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 103, width: 238, top: 137, height: 18 }}
                >
                    <Region
                        name="show_groups_link"
                        params={4194320}
                        layout={{ position: 'absolute', left: 0, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionShowGroupsLink ?? t('group.showgroups')} />
                    </Region>
                </Region>
                <Region
                    name="manage_guild_region"
                    params={17}
                    onPointerTap={onManageGuildRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 5, width: 97, top: 121, height: 18 }}
                >
                    <Region
                        name="manage_guild_link"
                        params={3932176}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -48.5, width: 83, top: '50%', marginTop: -9, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionManageGuildLink ?? t('group.manage')} />
                    </Region>
                </Region>
                <Region
                    name="delete_guild_region"
                    params={17}
                    onPointerTap={onDeleteGuildRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 5, width: 97, top: 139, height: 18 }}
                >
                    <Region
                        name="delete_guild_link"
                        params={3932176}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -48.5, width: 83, top: '50%', marginTop: -9, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionDeleteGuildLink ?? t('group.delete')} />
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
                    visible={visibleJoinButton ?? false}
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
                    visible={visibleRequestMembershipButton ?? false}
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
                    onPointerTap={onYouAreOwnerRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 40, width: 20, top: 183, height: 20 }}
                >
                    <ThemeImage
                        name="icon_owner"
                        params={16}
                        src={srcIconOwner ?? '${image.library.url}guilds/group_icon_big_owner.png'}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region
                    name="you_are_admin_region"
                    tooltip={t('group.youareadmin')}
                    params={17}
                    onPointerTap={onYouAreAdminRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 40, width: 20, top: 183, height: 20 }}
                >
                    <ThemeImage
                        name="icon_admin_off"
                        params={16}
                        src={srcIconAdminOff ?? '${image.library.url}guilds/group_icon_big_admin.png'}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region
                    name="you_are_member_region"
                    tooltip={t('group.youaremember')}
                    params={17}
                    onPointerTap={onYouAreMemberRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 40, width: 20, top: 183, height: 20 }}
                >
                    <ThemeImage
                        name="icon_admin_over"
                        params={16}
                        src={srcIconAdminOver ?? '${image.library.url}guilds/group_icon_big_member.png'}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <Region
                    name="membership_pending_txt"
                    params={208}
                    visible={false}
                    layout={{ position: 'absolute', left: '50%', marginLeft: -87.5, width: 175, top: 184, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionMembershipPendingTxt ?? t('group.membershippending')} />
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
                    layout={{ position: 'absolute', left: '50%', marginLeft: -61.5, width: 123, top: 184, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionYouarememberTxt ?? t('group.youaremember')} />
                </Region>
                <Region
                    name="created_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 103, width: 112, top: 27, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCreatedTxt ?? 'Created at 24-Sep-2010'}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <Region
                    name="grouptype_region_0"
                    tooltip={t('group.edit.settings.type.regular.help')}
                    params={17}
                    onPointerTap={onGrouptypeRegion0}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 107, width: 16, top: 10, height: 16 }}
                >
                    <ThemeImage
                        name="grouptype_icon_0"
                        params={16}
                        src={srcGrouptypeIcon0 ?? '${image.library.url}guilds/grouptype_icon_5.png'}
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                    />
                </Region>
                <Region
                    name="grouptype_region_1"
                    tooltip={t('group.edit.settings.type.exclusive.help')}
                    params={17}
                    onPointerTap={onGrouptypeRegion1}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 107, width: 16, top: 10, height: 16 }}
                >
                    <ThemeImage
                        name="grouptype_icon_1"
                        params={16}
                        src={srcGrouptypeIcon1 ?? '${image.library.url}guilds/grouptype_icon_1.png'}
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                    />
                </Region>
                <Region
                    name="grouptype_region_2"
                    tooltip={t('group.edit.settings.type.private.help')}
                    params={17}
                    onPointerTap={onGrouptypeRegion2}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 107, width: 16, top: 10, height: 16 }}
                >
                    <ThemeImage
                        name="grouptype_icon_2"
                        params={16}
                        src={srcGrouptypeIcon2 ?? '${image.library.url}guilds/grouptype_icon_2.png'}
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
                    />
                </Region>
                <Region
                    name="group_decorate_icon_region"
                    tooltip={t('group.memberscandecorate')}
                    params={17}
                    onPointerTap={onGroupDecorateIconRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 125, width: 15, top: 10, height: 15 }}
                >
                    <ThemeImage
                        name="group_decorate_icon"
                        params={16}
                        src={srcGroupDecorateIcon ?? '${image.library.url}guilds/group_decorate_icon.png'}
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                    />
                </Region>
                <Region
                    name="show_forum_link_region"
                    params={17}
                    onPointerTap={onShowForumLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 103, width: 255, top: 155, height: 18 }}
                >
                    <Region
                        name="show_forum_link"
                        params={4194320}
                        layout={{ position: 'absolute', left: 0, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionShowForumLink ?? t('group.showforum')} />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `group_description` of GroupLayout - pass real rows through its `items…` slot. */
export interface GroupLayoutGroupDescriptionItemProps {
    captionGroupDescription?: string;
    layout?: BoxLayout;
}

export const GroupLayoutGroupDescriptionItem = ({ captionGroupDescription, layout }: GroupLayoutGroupDescriptionItemProps) => {
    return (
        <Region
            name="group_description"
            params={16}
            layout={{ width: 215, height: 120, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionGroupDescription ?? 'Group Desc: pasdsad sadaddsad sadsa as dasd sad asd sada sdas das dsad sad asd asd ad ada sdas dsa das dsa dsad jhg jhg jh gjh gjh g'}
                textOptions={{ wordWrap: true, wordWrapWidth: 215 }}
            />
        </Region>
    );
};
