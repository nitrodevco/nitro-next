import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Dropmenu, Frame, Icon, Region, TextInput, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1189_guild_members_window_xml` (layout "Group info window", 352x431) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuildMembersWindowLayoutProps {
    footerCont?: GuildMembersWindowLayoutFooterContProps;
    headerCont?: GuildMembersWindowLayoutHeaderContProps;
    layout?: BoxLayout;
    membersCont?: GuildMembersWindowLayoutMembersContProps;
    onClose?: () => void;
}

export const GuildMembersWindowLayout = ({ footerCont, headerCont, layout, membersCont, onClose }: GuildMembersWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="groups_info_window"
            name="groups_info_window"
            caption={t('group.members.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 352, height: 431, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <GuildMembersWindowLayoutHeaderCont {...headerCont} />
                <GuildMembersWindowLayoutMembersCont {...membersCont} />
                <GuildMembersWindowLayoutFooterCont {...footerCont} />
            </Region>
        </Frame>
    );
};

/** Named region `header_cont` of GuildMembersWindowLayout - configured through the parent's `headerCont` prop. */
export interface GuildMembersWindowLayoutHeaderContProps {
    layout?: BoxLayout;
    onTypeDropMenu?: () => void;
}

export const GuildMembersWindowLayoutHeaderCont = ({ layout, onTypeDropMenu }: GuildMembersWindowLayoutHeaderContProps) => {
    const [ filterMembersInputValue, setFilterMembersInputValue ] = useState('');

    return (
        <Region
            name="header_cont"
            layout={{ position: 'absolute', left: 10, right: 9, top: 0, height: 77, ...layout }}
        >
            <WidgetSlot
                widgetType="badge_image"
                name="group_logo"
                options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 17, width: 39, top: 22, height: 39 }}
            />
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
    );
};

/** Named region `members_cont` of GuildMembersWindowLayout - configured through the parent's `membersCont` prop. */
export interface GuildMembersWindowLayoutMembersContProps {
    layout?: BoxLayout;
}

export const GuildMembersWindowLayoutMembersCont = ({ layout }: GuildMembersWindowLayoutMembersContProps) => {
    return (
        <Region
            name="members_cont"
            layout={{ position: 'absolute', left: 10, right: 9, top: 82, bottom: 72, ...layout }}
        />
    );
};

/** Named region `footer_cont` of GuildMembersWindowLayout - configured through the parent's `footerCont` prop. */
export interface GuildMembersWindowLayoutFooterContProps {
    captionFooterInfoTxt?: string;
    captionPaginaTextEnd?: string;
    captionPaginaTextStart?: string;
    layout?: BoxLayout;
    onNextPageButton?: () => void;
    onPreviousPageButton?: () => void;
}

export const GuildMembersWindowLayoutFooterCont = ({ captionFooterInfoTxt, captionPaginaTextEnd, captionPaginaTextStart, layout, onNextPageButton, onPreviousPageButton }: GuildMembersWindowLayoutFooterContProps) => {
    const t = useTranslation();
    const [ paginaNumberInputValue, setPaginaNumberInputValue ] = useState('');

    return (
        <Region
            name="footer_cont"
            layout={{ position: 'absolute', left: 10, right: 9, bottom: 43, height: 25, justifyContent: 'center', ...layout }}
        >
            <ContainerButton
                variant="3"
                name="previous_page_button"
                onPointerTap={onPreviousPageButton}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 25, minWidth: 50, maxWidth: 50 }}
            >
                <Icon
                    variant="4"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 21, width: 16, top: 7, height: 16 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="3"
                name="next_page_button"
                onPointerTap={onNextPageButton}
                layout={{ position: 'absolute', right: 0, width: 50, top: 0, height: 25, minWidth: 50, maxWidth: 50 }}
            >
                <Icon
                    variant="5"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 24, width: 17, top: 7, height: 16 }}
                />
            </ContainerButton>
            <Region
                name="footer_info_txt"
                visible={false}
                layout={{ position: 'absolute', marginLeft: 3.5, marginRight: -3.5, width: 144, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionFooterInfoTxt ?? t('group.members.pageinfo')}
                    textStyle="text-style-u-regular"
                />
            </Region>
            <Region layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 178, top: 4, height: 25, flexDirection: 'row', gap: 2 }}>
                <Region
                    name="pagina_text_start"
                    layout={{ width: 135, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionPaginaTextStart ?? 'X matching users. Page '} />
                </Region>
                <TextInput
                    value={paginaNumberInputValue}
                    onChange={setPaginaNumberInputValue}
                    layout={{ width: 21, height: 17, flexShrink: 0 }}
                />
                <Region
                    name="pagina_text_end"
                    layout={{ width: 18, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionPaginaTextEnd ?? '/ Y'} />
                </Region>
            </Region>
        </Region>
    );
};
