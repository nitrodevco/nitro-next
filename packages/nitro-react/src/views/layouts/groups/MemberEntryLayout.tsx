import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1190_member_entry_xml` (layout "Member Entry", 164x35) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemberEntryLayoutProps {
    actionLinkRegion?: MemberEntryLayoutActionLinkRegionProps;
    adminContainer?: MemberEntryLayoutAdminContainerProps;
    bgRegion?: MemberEntryLayoutBgRegionProps;
    blockRegion?: MemberEntryLayoutBlockRegionProps;
    captionMemberSinceTxt?: string;
    captionUserNameTxt?: string;
    layout?: BoxLayout;
    removeRegion?: MemberEntryLayoutRemoveRegionProps;
    srcIconOwner?: string;
}

export const MemberEntryLayout = ({ actionLinkRegion, adminContainer, bgRegion, blockRegion, captionMemberSinceTxt, captionUserNameTxt, layout, removeRegion, srcIconOwner }: MemberEntryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 164, height: 35, ...layout }}>
            <Border
                variant="0"
                name="group_entry_container"
                params={16}
                tintColor="#cc0000"
                layout={{ position: 'absolute', left: 0, width: 164, top: 0, height: 35 }}
            >
                <MemberEntryLayoutBgRegion {...bgRegion} />
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_image"
                    params={1310736}
                    options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                    layout={{ position: 'absolute', right: 134, width: 33, bottom: 1, height: 34 }}
                />
                <Region
                    name="user_name_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 33, width: 77, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionUserNameTxt ?? 'User name PH'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <MemberEntryLayoutActionLinkRegion {...actionLinkRegion} />
                <MemberEntryLayoutAdminContainer {...adminContainer} />
                <ThemeImage
                    name="icon_owner"
                    params={16}
                    src={srcIconOwner ?? '${image.library.url}guilds/icon_owner.png'}
                    layout={{ position: 'absolute', left: 34, width: 15, top: 15, height: 13 }}
                />
                <MemberEntryLayoutBlockRegion {...blockRegion} />
                <MemberEntryLayoutRemoveRegion {...removeRegion} />
                <Region
                    name="member_since_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 50, width: 61, top: 15, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMemberSinceTxt ?? 'Since Txt PH'}
                        textStyle="text-style-u-small"
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `bg_region` of MemberEntryLayout - configured through the parent's `bgRegion` prop. */
export interface MemberEntryLayoutBgRegionProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const MemberEntryLayoutBgRegion = ({ layout, onBgRegion }: MemberEntryLayoutBgRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bg_region"
            tooltip={t('group.members.showinfo')}
            params={17}
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 164, top: 0, height: 35, ...layout }}
        />
    );
};

/** Named region `action_link_region` of MemberEntryLayout - configured through the parent's `actionLinkRegion` prop. */
export interface MemberEntryLayoutActionLinkRegionProps {
    captionActionLink?: string;
    layout?: BoxLayout;
    onActionLinkRegion?: () => void;
    visibleActionLinkRegion?: boolean;
}

export const MemberEntryLayoutActionLinkRegion = ({ captionActionLink, layout, onActionLinkRegion, visibleActionLinkRegion }: MemberEntryLayoutActionLinkRegionProps) => {
    return (
        <Region
            name="action_link_region"
            params={17}
            visible={visibleActionLinkRegion ?? false}
            onPointerTap={onActionLinkRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 51, width: 110, top: 14, height: 18, ...layout }}
        >
            <Region
                name="action_link"
                params={4194320}
                layout={{ position: 'absolute', left: 0, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionActionLink ?? 'Action Name PH'} />
            </Region>
        </Region>
    );
};

/** Named region `admin_container` of MemberEntryLayout - configured through the parent's `adminContainer` prop. */
export interface MemberEntryLayoutAdminContainerProps {
    layout?: BoxLayout;
    srcIconAdminOff?: string;
    srcIconAdminOver?: string;
}

export const MemberEntryLayoutAdminContainer = ({ layout, srcIconAdminOff, srcIconAdminOver }: MemberEntryLayoutAdminContainerProps) => {
    return (
        <Region
            name="admin_container"
            params={16}
            layout={{ position: 'absolute', left: 33, width: 15, top: 15, height: 13, ...layout }}
        >
            <ThemeImage
                name="icon_admin_off"
                params={16}
                src={srcIconAdminOff ?? '${image.library.url}guilds/icon_admin_off.png'}
                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
            />
            <ThemeImage
                name="icon_admin_over"
                params={16}
                src={srcIconAdminOver ?? '${image.library.url}guilds/icon_admin_over.png'}
                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
            />
        </Region>
    );
};

/** Named region `block_region` of MemberEntryLayout - configured through the parent's `blockRegion` prop. */
export interface MemberEntryLayoutBlockRegionProps {
    layout?: BoxLayout;
    onBlockRegion?: () => void;
    srcIconCloseDown?: string;
    srcIconCloseOff?: string;
    srcIconCloseOver?: string;
}

export const MemberEntryLayoutBlockRegion = ({ layout, onBlockRegion, srcIconCloseDown, srcIconCloseOff, srcIconCloseOver }: MemberEntryLayoutBlockRegionProps) => {
    return (
        <Region
            name="block_region"
            params={81}
            onPointerTap={onBlockRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 17, width: 17, top: 1, height: 18, ...layout }}
        >
            <ThemeImage
                name="icon_close_down"
                params={16}
                src={srcIconCloseDown ?? '${image.library.url}guilds/icon_close_down.png'}
                layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
            />
            <ThemeImage
                name="icon_close_over"
                params={16}
                src={srcIconCloseOver ?? '${image.library.url}guilds/icon_close_over.png'}
                layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
            />
            <ThemeImage
                name="icon_close_off"
                params={16}
                src={srcIconCloseOff ?? '${image.library.url}guilds/icon_close_off.png'}
                layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
            />
        </Region>
    );
};

/** Named region `remove_region` of MemberEntryLayout - configured through the parent's `removeRegion` prop. */
export interface MemberEntryLayoutRemoveRegionProps {
    layout?: BoxLayout;
    onRemoveRegion?: () => void;
    srcIconCloseDown?: string;
    srcIconCloseOff?: string;
    srcIconCloseOver?: string;
}

export const MemberEntryLayoutRemoveRegion = ({ layout, onRemoveRegion, srcIconCloseDown, srcIconCloseOff, srcIconCloseOver }: MemberEntryLayoutRemoveRegionProps) => {
    return (
        <Region
            name="remove_region"
            params={81}
            onPointerTap={onRemoveRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 1, width: 17, top: 1, height: 18, ...layout }}
        >
            <ThemeImage
                name="icon_close_down"
                params={16}
                src={srcIconCloseDown ?? '${image.library.url}guilds/icon_close_down.png'}
                layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
            />
            <ThemeImage
                name="icon_close_over"
                params={16}
                src={srcIconCloseOver ?? '${image.library.url}guilds/icon_close_over.png'}
                layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
            />
            <ThemeImage
                name="icon_close_off"
                params={16}
                src={srcIconCloseOff ?? '${image.library.url}guilds/icon_close_off.png'}
                layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
            />
        </Region>
    );
};
