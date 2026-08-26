import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1190_member_entry_xml` (layout "Member Entry", 164x35) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemberEntryLayoutProps {
    layout?: BoxLayout;
}

export const MemberEntryLayout = ({ layout }: MemberEntryLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 164, height: 35, ...layout }}>
            <Border
                variant="0"
                name="group_entry_container"
                params={16}
                tintColor="#cc0000"
                layout={{ position: 'absolute', left: 0, width: 164, top: 0, height: 35 }}
            >
                <Region
                    name="bg_region"
                    tooltip={t('group.members.showinfo')}
                    params={17}
                    layout={{ position: 'absolute', left: 0, width: 164, top: 0, height: 35 }}
                />
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_image"
                    params={1310736}
                    options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                    layout={{ position: 'absolute', left: -3, width: 33, top: 0, height: 34 }}
                />
                <Region
                    name="user_name_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 33, width: 77, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="User name PH"
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Region
                    name="action_link_region"
                    params={17}
                    visible={false}
                    layout={{ position: 'absolute', left: 51, width: 110, top: 14, height: 18 }}
                >
                    <Region
                        name="action_link"
                        params={4194320}
                        layout={{ position: 'absolute', left: 0, width: 86, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="Action Name PH" />
                    </Region>
                </Region>
                <Region
                    name="admin_container"
                    params={16}
                    layout={{ position: 'absolute', left: 33, width: 15, top: 15, height: 13 }}
                >
                    <ThemeImage
                        name="icon_admin_off"
                        params={16}
                        src="${image.library.url}guilds/icon_admin_off.png"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                    />
                    <ThemeImage
                        name="icon_admin_over"
                        params={16}
                        src="${image.library.url}guilds/icon_admin_over.png"
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 13 }}
                    />
                </Region>
                <ThemeImage
                    name="icon_owner"
                    params={16}
                    src="${image.library.url}guilds/icon_owner.png"
                    layout={{ position: 'absolute', left: 34, width: 15, top: 15, height: 13 }}
                />
                <Region
                    name="block_region"
                    params={81}
                    layout={{ position: 'absolute', left: 130, width: 17, top: 1, height: 18 }}
                >
                    <ThemeImage
                        name="icon_close_down"
                        params={16}
                        src="${image.library.url}guilds/icon_close_down.png"
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                    <ThemeImage
                        name="icon_close_over"
                        params={16}
                        src="${image.library.url}guilds/icon_close_over.png"
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                    <ThemeImage
                        name="icon_close_off"
                        params={16}
                        src="${image.library.url}guilds/icon_close_off.png"
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                </Region>
                <Region
                    name="remove_region"
                    params={81}
                    layout={{ position: 'absolute', left: 146, width: 17, top: 1, height: 18 }}
                >
                    <ThemeImage
                        name="icon_close_down"
                        params={16}
                        src="${image.library.url}guilds/icon_close_down.png"
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                    <ThemeImage
                        name="icon_close_over"
                        params={16}
                        src="${image.library.url}guilds/icon_close_over.png"
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                    <ThemeImage
                        name="icon_close_off"
                        params={16}
                        src="${image.library.url}guilds/icon_close_off.png"
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 18 }}
                    />
                </Region>
                <Region
                    name="member_since_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 50, width: 61, top: 15, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="Since Txt PH"
                        textStyle="text-style-u-small"
                        textOptions={{ fill: '#666666' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
