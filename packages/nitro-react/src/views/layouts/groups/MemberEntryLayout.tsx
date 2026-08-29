import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1190_member_entry_xml` (layout "Member Entry", 164x35) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemberEntryLayoutProps {
    avatarImage?: ReactNode;
    bgRegion?: ReactNode;
    captionActionLink?: string;
    captionMemberSinceTxt?: string;
    captionUserNameTxt?: string;
    layout?: BoxLayout;
    onActionLinkRegion?: () => void;
    onBgRegion?: () => void;
    onBlockRegion?: () => void;
    onRemoveRegion?: () => void;
    srcIconAdminOff?: string;
    srcIconAdminOver?: string;
    srcIconCloseDown?: string;
    srcIconCloseOff?: string;
    srcIconCloseOver?: string;
    srcIconOwner?: string;
    srcRemoveRegionIconCloseDown?: string;
    srcRemoveRegionIconCloseOff?: string;
    srcRemoveRegionIconCloseOver?: string;
    visibleActionLinkRegion?: boolean;
}

export const MemberEntryLayout = ({ avatarImage, bgRegion, captionActionLink, captionMemberSinceTxt, captionUserNameTxt, layout, onActionLinkRegion, onBgRegion, onBlockRegion, onRemoveRegion, srcIconAdminOff, srcIconAdminOver, srcIconCloseDown, srcIconCloseOff, srcIconCloseOver, srcIconOwner, srcRemoveRegionIconCloseDown, srcRemoveRegionIconCloseOff, srcRemoveRegionIconCloseOver, visibleActionLinkRegion }: MemberEntryLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 164, height: 35, ...layout }}>
            <Border
                variant="0"
                name="group_entry_container"
                tintColor="#cc0000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="bg_region"
                    tooltip={t('group.members.showinfo')}
                    onPointerTap={onBgRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {bgRegion}
                </Region>
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_image"
                    options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                    layout={{ position: 'absolute', right: 134, width: 33, bottom: 1, height: 34 }}
                >
                    {avatarImage}
                </WidgetSlot>
                <Region
                    name="user_name_txt"
                    layout={{ position: 'absolute', left: 33, width: 77, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionUserNameTxt ?? 'User name PH'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                {(visibleActionLinkRegion ?? false) && (
                    <Region
                        name="action_link_region"
                        onPointerTap={onActionLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 51, width: 110, top: 14, height: 18 }}
                    >
                        <Region
                            name="action_link"
                            layout={{ position: 'absolute', left: 0, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionActionLink ?? 'Action Name PH'}
                        </Region>
                    </Region>
                )}
                <Region
                    name="admin_container"
                    layout={{ position: 'absolute', left: 33, width: 15, top: 15, height: 13 }}
                >
                    <ThemeImage
                        name="icon_admin_off"
                        src={srcIconAdminOff ?? '${image.library.url}guilds/icon_admin_off.png'}
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                    />
                    <ThemeImage
                        name="icon_admin_over"
                        src={srcIconAdminOver ?? '${image.library.url}guilds/icon_admin_over.png'}
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                    />
                </Region>
                <ThemeImage
                    name="icon_owner"
                    src={srcIconOwner ?? '${image.library.url}guilds/icon_owner.png'}
                    layout={{ position: 'absolute', left: 34, width: 15, top: 15, height: 13 }}
                />
                <Region
                    name="block_region"
                    onPointerTap={onBlockRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 17, width: 17, top: 1, height: 18 }}
                >
                    <ThemeImage
                        name="icon_close_down"
                        src={srcIconCloseDown ?? '${image.library.url}guilds/icon_close_down.png'}
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                    <ThemeImage
                        name="icon_close_over"
                        src={srcIconCloseOver ?? '${image.library.url}guilds/icon_close_over.png'}
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                    <ThemeImage
                        name="icon_close_off"
                        src={srcIconCloseOff ?? '${image.library.url}guilds/icon_close_off.png'}
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                </Region>
                <Region
                    name="remove_region"
                    onPointerTap={onRemoveRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', right: 1, width: 17, top: 1, height: 18 }}
                >
                    <ThemeImage
                        name="icon_close_down"
                        src={srcRemoveRegionIconCloseDown ?? '${image.library.url}guilds/icon_close_down.png'}
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                    <ThemeImage
                        name="icon_close_over"
                        src={srcRemoveRegionIconCloseOver ?? '${image.library.url}guilds/icon_close_over.png'}
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                    <ThemeImage
                        name="icon_close_off"
                        src={srcRemoveRegionIconCloseOff ?? '${image.library.url}guilds/icon_close_off.png'}
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                </Region>
                <Region
                    name="member_since_txt"
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
