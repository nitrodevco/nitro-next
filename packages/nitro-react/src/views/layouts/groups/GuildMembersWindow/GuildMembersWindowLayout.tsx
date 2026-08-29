import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Dropmenu, Frame, Icon, Region, TextInput, WidgetSlot } from '#base/theme';

import { GuildMembersWindowLayoutFooterCont, GuildMembersWindowLayoutFooterContProps } from './GuildMembersWindowLayoutFooterCont';

/** Generated from `1189_guild_members_window_xml` (layout "Group info window", 352x431) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuildMembersWindowLayoutProps {
    footerCont?: GuildMembersWindowLayoutFooterContProps;
    groupLogo?: ReactNode;
    layout?: BoxLayout;
    membersCont?: ReactNode;
    onClose?: () => void;
    onTypeDropMenu?: () => void;
}

export const GuildMembersWindowLayout = ({ footerCont, groupLogo, layout, membersCont, onClose, onTypeDropMenu }: GuildMembersWindowLayoutProps) => {
    const t = useTranslation();
    const [ filterMembersInputValue, setFilterMembersInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="groups_info_window"
            name="groups_info_window"
            caption={t('group.members.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 352, height: 431, minWidth: 352, minHeight: 431, ...layout }}
        >
            <Region
                name="header_cont"
                layout={{ position: 'absolute', left: 10, right: -3, top: 0, height: 77 }}
            >
                <WidgetSlot
                    widgetType="badge_image"
                    name="group_logo"
                    options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                    layout={{ position: 'absolute', left: 17, width: 39, top: 22, height: 39 }}
                >
                    {groupLogo}
                </WidgetSlot>
                <Dropmenu
                    variant="3"
                    name="type_drop_menu"
                    onPointerTap={onTypeDropMenu}
                    layout={{ position: 'absolute', left: 78, right: 12, top: 48, height: 25 }}
                />
                <TextInput
                    value={filterMembersInputValue}
                    onChange={setFilterMembersInputValue}
                    layout={{ position: 'absolute', left: 78, right: 41, top: 14, height: 25 }}
                />
                <Icon
                    variant="23"
                    name="searching_icon"
                    layout={{ position: 'absolute', left: 300, width: 15, top: 18, height: 15 }}
                />
            </Region>
            <Region
                name="members_cont"
                layout={{ position: 'absolute', left: 10, right: -3, top: 82, bottom: 31 }}
            >
                {membersCont}
            </Region>
            <GuildMembersWindowLayoutFooterCont {...footerCont} />
        </Frame>
    );
};
