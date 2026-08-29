import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Icon, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1193_group_xml` (layout "group_info", 343x214) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GroupLayoutProps {
    buyFurniLinkRegion?: GroupLayoutBuyFurniLinkRegionProps;
    captionCreatedTxt?: string;
    captionGroupName?: string;
    captionMembershipPendingTxt?: string;
    captionYouarememberTxt?: string;
    deleteGuildRegion?: GroupLayoutDeleteGuildRegionProps;
    groupDecorateIconRegion?: GroupLayoutGroupDecorateIconRegionProps;
    groupDescriptionItemList?: GroupLayoutGroupDescriptionItemListProps;
    groupRoomLinkRegion?: GroupLayoutGroupRoomLinkRegionProps;
    grouptypeRegion0?: GroupLayoutGrouptypeRegion0Props;
    grouptypeRegion1?: GroupLayoutGrouptypeRegion1Props;
    grouptypeRegion2?: GroupLayoutGrouptypeRegion2Props;
    layout?: BoxLayout;
    manageGuildRegion?: GroupLayoutManageGuildRegionProps;
    membersRegion?: GroupLayoutMembersRegionProps;
    onJoinButton?: () => void;
    onLeaveButton?: () => void;
    onRequestMembershipButton?: () => void;
    pendingMembersRegion?: GroupLayoutPendingMembersRegionProps;
    showForumLinkRegion?: GroupLayoutShowForumLinkRegionProps;
    showGroupsLinkRegion?: GroupLayoutShowGroupsLinkRegionProps;
    visibleJoinButton?: boolean;
    visibleRequestMembershipButton?: boolean;
    youAreAdminRegion?: GroupLayoutYouAreAdminRegionProps;
    youAreMemberRegion?: GroupLayoutYouAreMemberRegionProps;
    youAreOwnerRegion?: GroupLayoutYouAreOwnerRegionProps;
}

export const GroupLayout = ({ buyFurniLinkRegion, captionCreatedTxt, captionGroupName, captionMembershipPendingTxt, captionYouarememberTxt, deleteGuildRegion, groupDecorateIconRegion, groupDescriptionItemList, groupRoomLinkRegion, grouptypeRegion0, grouptypeRegion1, grouptypeRegion2, layout, manageGuildRegion, membersRegion, onJoinButton, onLeaveButton, onRequestMembershipButton, pendingMembersRegion, showForumLinkRegion, showGroupsLinkRegion, visibleJoinButton, visibleRequestMembershipButton, youAreAdminRegion, youAreMemberRegion, youAreOwnerRegion }: GroupLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 343, height: 214, ...layout }}>
            <Border
                variant="0"
                name="group_info"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, width: 343, top: 0, height: 214, justifyContent: 'center' }}
            >
                <Region
                    name="group_name"
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
                    options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false', 'badge_image:zoom_x': '2', 'badge_image:zoom_y': '2' }}
                    layout={{ position: 'absolute', left: 11, width: 85, top: 14, height: 85 }}
                />
                <GroupLayoutGroupDescriptionItemList {...groupDescriptionItemList} />
                {/* <scrollbar_vertical> for group_description_item_list - rendered by that list's ScrollArea */}
                <GroupLayoutMembersRegion {...membersRegion} />
                <GroupLayoutPendingMembersRegion {...pendingMembersRegion} />
                <GroupLayoutGroupRoomLinkRegion {...groupRoomLinkRegion} />
                <GroupLayoutBuyFurniLinkRegion {...buyFurniLinkRegion} />
                <GroupLayoutShowGroupsLinkRegion {...showGroupsLinkRegion} />
                <GroupLayoutManageGuildRegion {...manageGuildRegion} />
                <GroupLayoutDeleteGuildRegion {...deleteGuildRegion} />
                <ButtonThick
                    variant="3"
                    name="leave_button"
                    onPointerTap={onLeaveButton}
                    layout={{ position: 'absolute', left: 99, width: 160, top: 179, height: 29, minWidth: 160, maxWidth: 160 }}
                >
                    {t('group.leave')}
                </ButtonThick>
                <ButtonThick
                    variant="3"
                    name="join_button"
                    onPointerTap={onJoinButton}
                    visible={visibleJoinButton ?? false}
                    layout={{ position: 'absolute', left: 99, width: 160, top: 179, height: 29, minWidth: 160, maxWidth: 160 }}
                >
                    {t('group.join')}
                </ButtonThick>
                <ButtonThick
                    variant="3"
                    name="request_membership_button"
                    onPointerTap={onRequestMembershipButton}
                    visible={visibleRequestMembershipButton ?? false}
                    layout={{ position: 'absolute', left: 49, width: 260, top: 179, height: 29, minWidth: 260, maxWidth: 260 }}
                >
                    {t('group.requestmembership')}
                </ButtonThick>
                <GroupLayoutYouAreOwnerRegion {...youAreOwnerRegion} />
                <GroupLayoutYouAreAdminRegion {...youAreAdminRegion} />
                <GroupLayoutYouAreMemberRegion {...youAreMemberRegion} />
                <Region
                    name="membership_pending_txt"
                    visible={false}
                    layout={{ position: 'absolute', width: 175, top: 184, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionMembershipPendingTxt ?? t('group.membershippending')} />
                </Region>
                <Icon
                    variant="8"
                    name="youaremember_icon"
                    tintColor="#3ce600"
                    layout={{ position: 'absolute', left: 62, width: 16, top: 186, height: 16 }}
                />
                <Region
                    name="youaremember_txt"
                    layout={{ position: 'absolute', width: 123, top: 184, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionYouarememberTxt ?? t('group.youaremember')} />
                </Region>
                <Region
                    name="created_txt"
                    layout={{ position: 'absolute', left: 103, width: 112, top: 27, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCreatedTxt ?? 'Created at 24-Sep-2010'}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <GroupLayoutGrouptypeRegion0 {...grouptypeRegion0} />
                <GroupLayoutGrouptypeRegion1 {...grouptypeRegion1} />
                <GroupLayoutGrouptypeRegion2 {...grouptypeRegion2} />
                <GroupLayoutGroupDecorateIconRegion {...groupDecorateIconRegion} />
                <GroupLayoutShowForumLinkRegion {...showForumLinkRegion} />
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
            layout={{ width: 215, height: 120, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionGroupDescription ?? 'Group Desc: pasdsad sadaddsad sadsa as dasd sad asd sada sdas das dsad sad asd asd ad ada sdas dsa das dsa dsad jhg jhg jh gjh gjh g'}
                textOptions={{ wordWrap: true, wordWrapWidth: 215 }}
            />
        </Region>
    );
};

/** Named region `group_description_item_list` of GroupLayout - configured through the parent's `groupDescriptionItemList` prop. */
export interface GroupLayoutGroupDescriptionItemListProps {
    itemsGroupDescriptionItemList?: ReactNode;
    layout?: BoxLayout;
}

export const GroupLayoutGroupDescriptionItemList = ({ itemsGroupDescriptionItemList, layout }: GroupLayoutGroupDescriptionItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 103, right: 25, top: 42, bottom: 117, ...layout }}
        >
            <Region
                name="group_description_item_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsGroupDescriptionItemList ?? (
                    <GroupLayoutGroupDescriptionItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `members_region` of GroupLayout - configured through the parent's `membersRegion` prop. */
export interface GroupLayoutMembersRegionProps {
    captionMembersTxt?: string;
    layout?: BoxLayout;
    onMembersRegion?: () => void;
}

export const GroupLayoutMembersRegion = ({ captionMembersTxt, layout, onMembersRegion }: GroupLayoutMembersRegionProps) => {
    return (
        <Region
            name="members_region"
            onPointerTap={onMembersRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 5, width: 97, top: 103, height: 18, justifyContent: 'center', ...layout }}
        >
            <Region
                name="members_txt"
                layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 74, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMembersTxt ?? 'Members PH'}
                    textStyle="text-style-u-bold"
                />
            </Region>
        </Region>
    );
};

/** Named region `pending_members_region` of GroupLayout - configured through the parent's `pendingMembersRegion` prop. */
export interface GroupLayoutPendingMembersRegionProps {
    captionPendingMembersTxt?: string;
    layout?: BoxLayout;
    onPendingMembersRegion?: () => void;
}

export const GroupLayoutPendingMembersRegion = ({ captionPendingMembersTxt, layout, onPendingMembersRegion }: GroupLayoutPendingMembersRegionProps) => {
    return (
        <Region
            name="pending_members_region"
            onPointerTap={onPendingMembersRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 5, width: 97, top: 121, height: 18, justifyContent: 'center', ...layout }}
        >
            <Region
                name="pending_members_txt"
                layout={{ position: 'absolute', marginLeft: -1.5, marginRight: 1.5, width: 74, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPendingMembersTxt ?? 'Members PH'}
                    textStyle="text-style-u-bold"
                />
            </Region>
        </Region>
    );
};

/** Named region `group_room_link_region` of GroupLayout - configured through the parent's `groupRoomLinkRegion` prop. */
export interface GroupLayoutGroupRoomLinkRegionProps {
    captionGroupRoomLink?: string;
    layout?: BoxLayout;
    onGroupRoomLinkRegion?: () => void;
}

export const GroupLayoutGroupRoomLinkRegion = ({ captionGroupRoomLink, layout, onGroupRoomLinkRegion }: GroupLayoutGroupRoomLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="group_room_link_region"
            onPointerTap={onGroupRoomLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 103, width: 238, top: 103, height: 18, ...layout }}
        >
            <Region
                name="group_room_link"
                layout={{ position: 'absolute', left: 0, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionGroupRoomLink ?? t('group.room.link')} />
            </Region>
        </Region>
    );
};

/** Named region `buy_furni_link_region` of GroupLayout - configured through the parent's `buyFurniLinkRegion` prop. */
export interface GroupLayoutBuyFurniLinkRegionProps {
    captionBuyFurniLink?: string;
    layout?: BoxLayout;
    onBuyFurniLinkRegion?: () => void;
}

export const GroupLayoutBuyFurniLinkRegion = ({ captionBuyFurniLink, layout, onBuyFurniLinkRegion }: GroupLayoutBuyFurniLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buy_furni_link_region"
            onPointerTap={onBuyFurniLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 103, width: 238, top: 119, height: 18, ...layout }}
        >
            <Region
                name="buy_furni_link"
                layout={{ position: 'absolute', left: 0, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionBuyFurniLink ?? t('group.buyfurni')} />
            </Region>
        </Region>
    );
};

/** Named region `show_groups_link_region` of GroupLayout - configured through the parent's `showGroupsLinkRegion` prop. */
export interface GroupLayoutShowGroupsLinkRegionProps {
    captionShowGroupsLink?: string;
    layout?: BoxLayout;
    onShowGroupsLinkRegion?: () => void;
}

export const GroupLayoutShowGroupsLinkRegion = ({ captionShowGroupsLink, layout, onShowGroupsLinkRegion }: GroupLayoutShowGroupsLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="show_groups_link_region"
            onPointerTap={onShowGroupsLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 103, width: 238, top: 137, height: 18, ...layout }}
        >
            <Region
                name="show_groups_link"
                layout={{ position: 'absolute', left: 0, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionShowGroupsLink ?? t('group.showgroups')} />
            </Region>
        </Region>
    );
};

/** Named region `manage_guild_region` of GroupLayout - configured through the parent's `manageGuildRegion` prop. */
export interface GroupLayoutManageGuildRegionProps {
    captionManageGuildLink?: string;
    layout?: BoxLayout;
    onManageGuildRegion?: () => void;
}

export const GroupLayoutManageGuildRegion = ({ captionManageGuildLink, layout, onManageGuildRegion }: GroupLayoutManageGuildRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="manage_guild_region"
            onPointerTap={onManageGuildRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 5, width: 97, top: 121, height: 18, justifyContent: 'center', ...layout }}
        >
            <Region
                name="manage_guild_link"
                layout={{ position: 'absolute', marginLeft: -7, marginRight: 7, width: 83, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionManageGuildLink ?? t('group.manage')} />
            </Region>
        </Region>
    );
};

/** Named region `delete_guild_region` of GroupLayout - configured through the parent's `deleteGuildRegion` prop. */
export interface GroupLayoutDeleteGuildRegionProps {
    captionDeleteGuildLink?: string;
    layout?: BoxLayout;
    onDeleteGuildRegion?: () => void;
}

export const GroupLayoutDeleteGuildRegion = ({ captionDeleteGuildLink, layout, onDeleteGuildRegion }: GroupLayoutDeleteGuildRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="delete_guild_region"
            onPointerTap={onDeleteGuildRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 5, width: 97, top: 139, height: 18, justifyContent: 'center', ...layout }}
        >
            <Region
                name="delete_guild_link"
                layout={{ position: 'absolute', marginLeft: -7, marginRight: 7, width: 83, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionDeleteGuildLink ?? t('group.delete')} />
            </Region>
        </Region>
    );
};

/** Named region `you_are_owner_region` of GroupLayout - configured through the parent's `youAreOwnerRegion` prop. */
export interface GroupLayoutYouAreOwnerRegionProps {
    layout?: BoxLayout;
    onYouAreOwnerRegion?: () => void;
    srcIconOwner?: string;
}

export const GroupLayoutYouAreOwnerRegion = ({ layout, onYouAreOwnerRegion, srcIconOwner }: GroupLayoutYouAreOwnerRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="you_are_owner_region"
            tooltip={t('group.youareowner')}
            onPointerTap={onYouAreOwnerRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 40, width: 20, top: 183, height: 20, ...layout }}
        >
            <ThemeImage
                name="icon_owner"
                src={srcIconOwner ?? '${image.library.url}guilds/group_icon_big_owner.png'}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `you_are_admin_region` of GroupLayout - configured through the parent's `youAreAdminRegion` prop. */
export interface GroupLayoutYouAreAdminRegionProps {
    layout?: BoxLayout;
    onYouAreAdminRegion?: () => void;
    srcIconAdminOff?: string;
}

export const GroupLayoutYouAreAdminRegion = ({ layout, onYouAreAdminRegion, srcIconAdminOff }: GroupLayoutYouAreAdminRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="you_are_admin_region"
            tooltip={t('group.youareadmin')}
            onPointerTap={onYouAreAdminRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 40, width: 20, top: 183, height: 20, ...layout }}
        >
            <ThemeImage
                name="icon_admin_off"
                src={srcIconAdminOff ?? '${image.library.url}guilds/group_icon_big_admin.png'}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `you_are_member_region` of GroupLayout - configured through the parent's `youAreMemberRegion` prop. */
export interface GroupLayoutYouAreMemberRegionProps {
    layout?: BoxLayout;
    onYouAreMemberRegion?: () => void;
    srcIconAdminOver?: string;
}

export const GroupLayoutYouAreMemberRegion = ({ layout, onYouAreMemberRegion, srcIconAdminOver }: GroupLayoutYouAreMemberRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="you_are_member_region"
            tooltip={t('group.youaremember')}
            onPointerTap={onYouAreMemberRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 40, width: 20, top: 183, height: 20, ...layout }}
        >
            <ThemeImage
                name="icon_admin_over"
                src={srcIconAdminOver ?? '${image.library.url}guilds/group_icon_big_member.png'}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
            />
        </Region>
    );
};

/** Named region `grouptype_region_0` of GroupLayout - configured through the parent's `grouptypeRegion0` prop. */
export interface GroupLayoutGrouptypeRegion0Props {
    layout?: BoxLayout;
    onGrouptypeRegion0?: () => void;
    srcGrouptypeIcon0?: string;
}

export const GroupLayoutGrouptypeRegion0 = ({ layout, onGrouptypeRegion0, srcGrouptypeIcon0 }: GroupLayoutGrouptypeRegion0Props) => {
    const t = useTranslation();

    return (
        <Region
            name="grouptype_region_0"
            tooltip={t('group.edit.settings.type.regular.help')}
            onPointerTap={onGrouptypeRegion0}
            cursor="pointer"
            layout={{ position: 'absolute', left: 107, width: 16, top: 10, height: 16, ...layout }}
        >
            <ThemeImage
                name="grouptype_icon_0"
                src={srcGrouptypeIcon0 ?? '${image.library.url}guilds/grouptype_icon_5.png'}
                layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `grouptype_region_1` of GroupLayout - configured through the parent's `grouptypeRegion1` prop. */
export interface GroupLayoutGrouptypeRegion1Props {
    layout?: BoxLayout;
    onGrouptypeRegion1?: () => void;
    srcGrouptypeIcon1?: string;
}

export const GroupLayoutGrouptypeRegion1 = ({ layout, onGrouptypeRegion1, srcGrouptypeIcon1 }: GroupLayoutGrouptypeRegion1Props) => {
    const t = useTranslation();

    return (
        <Region
            name="grouptype_region_1"
            tooltip={t('group.edit.settings.type.exclusive.help')}
            onPointerTap={onGrouptypeRegion1}
            cursor="pointer"
            layout={{ position: 'absolute', left: 107, width: 16, top: 10, height: 16, ...layout }}
        >
            <ThemeImage
                name="grouptype_icon_1"
                src={srcGrouptypeIcon1 ?? '${image.library.url}guilds/grouptype_icon_1.png'}
                layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `grouptype_region_2` of GroupLayout - configured through the parent's `grouptypeRegion2` prop. */
export interface GroupLayoutGrouptypeRegion2Props {
    layout?: BoxLayout;
    onGrouptypeRegion2?: () => void;
    srcGrouptypeIcon2?: string;
}

export const GroupLayoutGrouptypeRegion2 = ({ layout, onGrouptypeRegion2, srcGrouptypeIcon2 }: GroupLayoutGrouptypeRegion2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="grouptype_region_2"
            tooltip={t('group.edit.settings.type.private.help')}
            onPointerTap={onGrouptypeRegion2}
            cursor="pointer"
            layout={{ position: 'absolute', left: 107, width: 16, top: 10, height: 16, ...layout }}
        >
            <ThemeImage
                name="grouptype_icon_2"
                src={srcGrouptypeIcon2 ?? '${image.library.url}guilds/grouptype_icon_2.png'}
                layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 16 }}
            />
        </Region>
    );
};

/** Named region `group_decorate_icon_region` of GroupLayout - configured through the parent's `groupDecorateIconRegion` prop. */
export interface GroupLayoutGroupDecorateIconRegionProps {
    layout?: BoxLayout;
    onGroupDecorateIconRegion?: () => void;
    srcGroupDecorateIcon?: string;
}

export const GroupLayoutGroupDecorateIconRegion = ({ layout, onGroupDecorateIconRegion, srcGroupDecorateIcon }: GroupLayoutGroupDecorateIconRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="group_decorate_icon_region"
            tooltip={t('group.memberscandecorate')}
            onPointerTap={onGroupDecorateIconRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 125, width: 15, top: 10, height: 15, ...layout }}
        >
            <ThemeImage
                name="group_decorate_icon"
                src={srcGroupDecorateIcon ?? '${image.library.url}guilds/group_decorate_icon.png'}
                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
            />
        </Region>
    );
};

/** Named region `show_forum_link_region` of GroupLayout - configured through the parent's `showForumLinkRegion` prop. */
export interface GroupLayoutShowForumLinkRegionProps {
    captionShowForumLink?: string;
    layout?: BoxLayout;
    onShowForumLinkRegion?: () => void;
}

export const GroupLayoutShowForumLinkRegion = ({ captionShowForumLink, layout, onShowForumLinkRegion }: GroupLayoutShowForumLinkRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="show_forum_link_region"
            onPointerTap={onShowForumLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 103, width: 255, top: 155, height: 18, ...layout }}
        >
            <Region
                name="show_forum_link"
                layout={{ position: 'absolute', left: 0, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionShowForumLink ?? t('group.showforum')} />
            </Region>
        </Region>
    );
};
