import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, CheckBox, ContainerButton, Dropmenu, Frame, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1138_wired_menu_view_xml` (layout "wired_menu_view", 500x500) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredMenuViewLayoutProps {
    bodyContainer?: WiredMenuViewLayoutBodyContainerProps;
    headerContainer?: WiredMenuViewLayoutHeaderContainerProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onTopViewChestsButton?: () => void;
    onTopViewInfoButton?: () => void;
    onTopViewInspectionButton?: () => void;
    onTopViewMonitorButton?: () => void;
    onTopViewSettingsButton?: () => void;
    onTopViewVariableOverviewButton?: () => void;
}

export const WiredMenuViewLayout = ({ bodyContainer, headerContainer, layout, onClose, onTopViewChestsButton, onTopViewInfoButton, onTopViewInspectionButton, onTopViewMonitorButton, onTopViewSettingsButton, onTopViewVariableOverviewButton }: WiredMenuViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="wiredmenu_frame"
            name="wiredmenu_frame"
            caption={t('wiredmenu.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 500, height: 500, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <TabContext
                    variant="3"
                    name="tab_context"
                    layout={{ position: 'absolute', left: 0, width: 500, top: 2, height: 30 }}
                >
                    <TabButton
                        variant="3"
                        name="top_view_monitor_button"
                        onPointerTap={onTopViewMonitorButton}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 0, height: 32 }}
                    >
                        {t('wiredmenu.monitor.tab')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_variable_overview_button"
                        onPointerTap={onTopViewVariableOverviewButton}
                        layout={{ position: 'absolute', left: 70, width: 74, top: 0, height: 32 }}
                    >
                        {t('wiredmenu.variable_overview.tab')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_inspection_button"
                        onPointerTap={onTopViewInspectionButton}
                        layout={{ position: 'absolute', left: 144, width: 82, top: 0, height: 32 }}
                    >
                        {t('wiredmenu.inspection.tab')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_chests_button"
                        onPointerTap={onTopViewChestsButton}
                        layout={{ position: 'absolute', left: 226, width: 109, top: 0, height: 32 }}
                    >
                        {t('wiredmenu.chests.tab')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_settings_button"
                        onPointerTap={onTopViewSettingsButton}
                        layout={{ position: 'absolute', left: 335, width: 70, top: 0, height: 32 }}
                    >
                        {t('wiredmenu.settings.tab')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_info_button"
                        onPointerTap={onTopViewInfoButton}
                        layout={{ position: 'absolute', left: 405, width: 46, top: 0, height: 32 }}
                    >
                        {t('wiredmenu.info.tab')}
                    </TabButton>
                </TabContext>
                <WiredMenuViewLayoutHeaderContainer {...headerContainer} />
                <WiredMenuViewLayoutBodyContainer {...bodyContainer} />
            </Region>
        </Frame>
    );
};

/** Named region `header_inner` of WiredMenuViewLayout - configured through the parent's `headerInner` prop. */
export interface WiredMenuViewLayoutHeaderInnerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutHeaderInner = ({ layout, tags }: WiredMenuViewLayoutHeaderInnerProps) => {
    return (
        <Region
            name="header_inner"
            tags={tags}
            backgroundColor="#235061"
            layout={{ position: 'absolute', left: 2, width: 494, top: 2, height: 46, ...layout }}
        />
    );
};

/** Named region `header_border` of WiredMenuViewLayout - configured through the parent's `headerBorder` prop. */
export interface WiredMenuViewLayoutHeaderBorderProps {
    headerInner?: WiredMenuViewLayoutHeaderInnerProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutHeaderBorder = ({ headerInner, layout, tags }: WiredMenuViewLayoutHeaderBorderProps) => {
    return (
        <Region
            name="header_border"
            tags={tags}
            backgroundColor="#486f81"
            layout={{ position: 'absolute', left: 0, width: 498, top: 0, height: 50, ...layout }}
        >
            <WiredMenuViewLayoutHeaderInner {...headerInner} />
        </Region>
    );
};

/** Named region `header_detail` of WiredMenuViewLayout - configured through the parent's `headerDetail` prop. */
export interface WiredMenuViewLayoutHeaderDetailProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutHeaderDetail = ({ layout, tags }: WiredMenuViewLayoutHeaderDetailProps) => {
    return (
        <Region
            name="header_detail"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 50, ...layout }}
        >
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 8, width: 64, top: 20, height: 51 }}
            />
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 78, width: 64, top: -20, height: 51 }}
            />
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 148, width: 64, top: 20, height: 51 }}
            />
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 218, width: 64, top: -20, height: 51 }}
            />
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 288, width: 64, top: 20, height: 51 }}
            />
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 358, width: 64, top: -20, height: 51 }}
            />
            <ThemeImage
                src={layoutImage('wired_box_lines.png')}
                layout={{ position: 'absolute', left: 428, width: 64, top: 20, height: 51 }}
            />
        </Region>
    );
};

/** Named region `discord_region` of WiredMenuViewLayout - configured through the parent's `discordRegion` prop. */
export interface WiredMenuViewLayoutDiscordRegionProps {
    layout?: BoxLayout;
    onDiscordRegion?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutDiscordRegion = ({ layout, onDiscordRegion, tags }: WiredMenuViewLayoutDiscordRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="discord_region"
            tags={tags}
            tooltip={t('wiredmenu.discord_region.tooltip')}
            dynamicStyle="brightness_and_shadow_under_gentle"
            onPointerTap={onDiscordRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 473, width: 22, top: 3, height: 25, ...layout }}
        >
            <ThemeImage
                tags={[ '#icon' ]}
                src={layoutImage('icon_discord.png')}
                layout={{ position: 'absolute', left: 0, width: 22, top: 1, height: 23 }}
            />
        </Region>
    );
};

/** Named region `header_container` of WiredMenuViewLayout - configured through the parent's `headerContainer` prop. */
export interface WiredMenuViewLayoutHeaderContainerProps {
    captionHeaderTitle?: string;
    discordRegion?: WiredMenuViewLayoutDiscordRegionProps;
    headerBorder?: WiredMenuViewLayoutHeaderBorderProps;
    headerDetail?: WiredMenuViewLayoutHeaderDetailProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutHeaderContainer = ({ captionHeaderTitle, discordRegion, headerBorder, headerDetail, layout, tags }: WiredMenuViewLayoutHeaderContainerProps) => {
    return (
        <Region
            name="header_container"
            tags={tags}
            layout={{ position: 'absolute', left: 1, width: 498, top: 32, height: 50, ...layout }}
        >
            <WiredMenuViewLayoutHeaderBorder {...headerBorder} />
            <WiredMenuViewLayoutHeaderDetail {...headerDetail} />
            <Region
                name="header_title"
                layout={{ position: 'absolute', left: 0, width: 500, top: 14, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionHeaderTitle ?? 'Header Title'}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
            <WiredMenuViewLayoutDiscordRegion {...discordRegion} />
        </Region>
    );
};

/** Named region `statistics_container` of WiredMenuViewLayout - configured through the parent's `statisticsContainer` prop. */
export interface WiredMenuViewLayoutStatisticsContainerProps {
    captionStatisticsFloorfurniHtml?: string;
    captionStatisticsHeavyHtml?: string;
    captionStatisticsPermVarsFurniHtml?: string;
    captionStatisticsPermVarsGlobalHtml?: string;
    captionStatisticsPermVarsUserHtml?: string;
    captionStatisticsUsageHtml?: string;
    captionStatisticsWallfurniHtml?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutStatisticsContainer = ({ captionStatisticsFloorfurniHtml, captionStatisticsHeavyHtml, captionStatisticsPermVarsFurniHtml, captionStatisticsPermVarsGlobalHtml, captionStatisticsPermVarsUserHtml, captionStatisticsUsageHtml, captionStatisticsWallfurniHtml, captionTitle, layout, tags }: WiredMenuViewLayoutStatisticsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="statistics_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 215, top: 18, height: 123, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 106, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? t('wiredmenu.monitor.statistics')} />
            </Region>
            <Border
                variant="3"
                name="statistics_contents"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, width: 204, top: 20, height: 99 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 5, width: 197, top: 5, height: 89 }}
                >
                    <Region layout={{ flexDirection: 'column', gap: 2, width: '100%' }}>
                        <Region
                            name="statistics_usage_html"
                            layout={{ width: 68, height: 16, flexShrink: 0, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionStatisticsUsageHtml ?? 'Wired usage:'} />
                        </Region>
                        <Region
                            name="statistics_heavy_html"
                            layout={{ width: 48, height: 16, flexShrink: 0, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionStatisticsHeavyHtml ?? 'Is heavy:'} />
                        </Region>
                        <Region
                            name="statistics_floorfurni_html"
                            layout={{ width: 60, height: 16, flexShrink: 0, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionStatisticsFloorfurniHtml ?? 'Floor furni:'} />
                        </Region>
                        <Region
                            name="statistics_wallfurni_html"
                            layout={{ width: 57, height: 16, flexShrink: 0, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionStatisticsWallfurniHtml ?? 'Wall furni:'} />
                        </Region>
                        <Region
                            name="statistics_perm_vars_furni_html"
                            layout={{ width: 114, height: 16, flexShrink: 0, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionStatisticsPermVarsFurniHtml ?? 'Permanent furni vars:'} />
                        </Region>
                        <Region
                            name="statistics_perm_vars_user_html"
                            layout={{ width: 113, height: 16, flexShrink: 0, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionStatisticsPermVarsUserHtml ?? 'Permanent user vars:'} />
                        </Region>
                        <Region
                            name="statistics_perm_vars_global_html"
                            layout={{ width: 122, height: 16, flexShrink: 0, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionStatisticsPermVarsGlobalHtml ?? 'Permanent global vars:'} />
                        </Region>
                    </Region>
                </ScrollArea>
            </Border>
        </Region>
    );
};

/** Named region `image_container` of WiredMenuViewLayout - configured through the parent's `imageContainer` prop. */
export interface WiredMenuViewLayoutImageContainerProps {
    layout?: BoxLayout;
    srcMonitorImage1?: string;
    srcMonitorImage2?: string;
    tags?: string[];
}

export const WiredMenuViewLayoutImageContainer = ({ layout, srcMonitorImage1, srcMonitorImage2, tags }: WiredMenuViewLayoutImageContainerProps) => {
    return (
        <Region
            name="image_container"
            tags={tags}
            layout={{ position: 'absolute', left: 230, width: 256, top: 4, height: 145, ...layout }}
        >
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 145 }}
            >
                <ThemeImage
                    name="monitor_image_1"
                    src={srcMonitorImage1 ?? layoutImage('wired_monitor_element1.png')}
                    layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 145 }}
                />
            </Region>
            <ThemeImage
                name="monitor_image_2"
                src={srcMonitorImage2 ?? layoutImage('wired_monitor_element2.png')}
                layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 145 }}
            />
        </Region>
    );
};

/** Named region `log_table_container` of WiredMenuViewLayout - configured through the parent's `logTableContainer` prop. */
export interface WiredMenuViewLayoutLogTableContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutLogTableContainer = ({ layout, tags }: WiredMenuViewLayoutLogTableContainerProps) => {
    return (
        <Region
            name="log_table_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 472, top: 20, height: 156, ...layout }}
        />
    );
};

/** Named region `log_container` of WiredMenuViewLayout - configured through the parent's `logContainer` prop. */
export interface WiredMenuViewLayoutLogContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    logTableContainer?: WiredMenuViewLayoutLogTableContainerProps;
    onClearLogBtn?: () => void;
    onLogOverviewBtn?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutLogContainer = ({ captionTitle, layout, logTableContainer, onClearLogBtn, onLogOverviewBtn, tags }: WiredMenuViewLayoutLogContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="log_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 472, top: 152, height: 218, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 106, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? t('wiredmenu.monitor.log')} />
            </Region>
            <WiredMenuViewLayoutLogTableContainer {...logTableContainer} />
            <Button
                variant="5"
                name="clear_log_btn"
                tintColor="#e33934"
                onPointerTap={onClearLogBtn}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 0, width: 110, top: 185, height: 30, minWidth: 110, maxWidth: 110 }}
            >
                {t('wiredmenu.monitor.clear_all')}
            </Button>
            <Button
                variant="3"
                name="log_overview_btn"
                onPointerTap={onLogOverviewBtn}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 1, width: 110, top: 185, height: 30, minWidth: 110, maxWidth: 110 }}
            >
                {t('wiredmenu.monitor.log_overview')}
            </Button>
        </Region>
    );
};

/** Named region `monitor_container` of WiredMenuViewLayout - configured through the parent's `monitorContainer` prop. */
export interface WiredMenuViewLayoutMonitorContainerProps {
    imageContainer?: WiredMenuViewLayoutImageContainerProps;
    layout?: BoxLayout;
    logContainer?: WiredMenuViewLayoutLogContainerProps;
    statisticsContainer?: WiredMenuViewLayoutStatisticsContainerProps;
    tags?: string[];
}

export const WiredMenuViewLayoutMonitorContainer = ({ imageContainer, layout, logContainer, statisticsContainer, tags }: WiredMenuViewLayoutMonitorContainerProps) => {
    return (
        <Region
            name="monitor_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
        >
            <WiredMenuViewLayoutStatisticsContainer {...statisticsContainer} />
            <WiredMenuViewLayoutImageContainer {...imageContainer} />
            <WiredMenuViewLayoutLogContainer {...logContainer} />
        </Region>
    );
};

/** Row template `furni_option` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutFurniOptionItemProps {
    layout?: BoxLayout;
    onTypeFurniButton?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutFurniOptionItem = ({ layout, onTypeFurniButton, tags }: WiredMenuViewLayoutFurniOptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="furni_option"
            tags={tags}
            layout={{ width: 37, height: 37, flexShrink: 0, ...layout }}
        >
            <Button
                variant="3"
                name="type_furni_button"
                tooltip={t('wiredfurni.params.sourcetype.furni')}
                onPointerTap={onTypeFurniButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
            />
            <ThemeImage
                src={layoutImage('icon_wired_variable_furni_large.png')}
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
            />
        </Region>
    );
};

/** Row template `user_option` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutUserOptionItemProps {
    layout?: BoxLayout;
    onTypeUserButton?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutUserOptionItem = ({ layout, onTypeUserButton, tags }: WiredMenuViewLayoutUserOptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_option"
            tags={tags}
            layout={{ width: 37, height: 37, flexShrink: 0, ...layout }}
        >
            <Button
                variant="3"
                name="type_user_button"
                tooltip={t('wiredfurni.params.sourcetype.users')}
                onPointerTap={onTypeUserButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
            />
            <ThemeImage
                src={layoutImage('icon_wired_variable_user_large.png')}
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
            />
        </Region>
    );
};

/** Row template `global_option` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutGlobalOptionItemProps {
    layout?: BoxLayout;
    onTypeGlobalButton?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutGlobalOptionItem = ({ layout, onTypeGlobalButton, tags }: WiredMenuViewLayoutGlobalOptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="global_option"
            tags={tags}
            layout={{ width: 37, height: 37, flexShrink: 0, ...layout }}
        >
            <Button
                variant="3"
                name="type_global_button"
                tooltip={t('wiredfurni.params.sourcetype.global')}
                onPointerTap={onTypeGlobalButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
            />
            <ThemeImage
                src={layoutImage('icon_wired_variable_global_large.png')}
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
            />
        </Region>
    );
};

/** Row template `context_option` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutContextOptionItemProps {
    layout?: BoxLayout;
    onTypeContextButton?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutContextOptionItem = ({ layout, onTypeContextButton, tags }: WiredMenuViewLayoutContextOptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="context_option"
            tags={tags}
            layout={{ width: 37, height: 37, flexShrink: 0, ...layout }}
        >
            <Button
                variant="3"
                name="type_context_button"
                tooltip={t('wiredfurni.params.sourcetype.context')}
                onPointerTap={onTypeContextButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
            />
            <ThemeImage
                src={layoutImage('icon_wired_variable_context_large.png')}
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
            />
        </Region>
    );
};

/** Named region `buttons` of WiredMenuViewLayout - configured through the parent's `buttons` prop. */
export interface WiredMenuViewLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutButtons = ({ itemsButtons, layout, tags }: WiredMenuViewLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            layout={{ position: 'absolute', left: 5, width: 183, top: 5, height: 37, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <WiredMenuViewLayoutFurniOptionItem />
                    <WiredMenuViewLayoutUserOptionItem />
                    <WiredMenuViewLayoutGlobalOptionItem />
                    <WiredMenuViewLayoutContextOptionItem />
                </>
            )}
        </Region>
    );
};

/** Named region `type_picker_container` of WiredMenuViewLayout - configured through the parent's `typePickerContainer` prop. */
export interface WiredMenuViewLayoutTypePickerContainerProps {
    buttons?: WiredMenuViewLayoutButtonsProps;
    captionTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutTypePickerContainer = ({ buttons, captionTitle, layout, tags }: WiredMenuViewLayoutTypePickerContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="type_picker_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 197, top: 18, height: 70, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? t('wiredmenu.variable_overview.type')} />
            </Region>
            <Border
                variant="3"
                name="type_options"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, width: 188, top: 20, height: 47 }}
            >
                <WiredMenuViewLayoutButtons {...buttons} />
            </Border>
        </Region>
    );
};

/** Named region `variable_list_container` of WiredMenuViewLayout - configured through the parent's `variableListContainer` prop. */
export interface WiredMenuViewLayoutVariableListContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutVariableListContainer = ({ layout, tags }: WiredMenuViewLayoutVariableListContainerProps) => {
    return (
        <Region
            name="variable_list_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0, ...layout }}
        />
    );
};

/** Named region `variable_picker_container` of WiredMenuViewLayout - configured through the parent's `variablePickerContainer` prop. */
export interface WiredMenuViewLayoutVariablePickerContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
    variableListContainer?: WiredMenuViewLayoutVariableListContainerProps;
}

export const WiredMenuViewLayoutVariablePickerContainer = ({ captionTitle, layout, tags, variableListContainer }: WiredMenuViewLayoutVariablePickerContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="variable_picker_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, right: 298, top: 94, height: 239, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? t('wiredmenu.variable_overview.picker')} />
            </Region>
            <WiredMenuViewLayoutVariableListContainer {...variableListContainer} />
        </Region>
    );
};

/** Row template `highlight_holders_button` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutHighlightHoldersButtonItemProps {
    layout?: BoxLayout;
    onHighlightHoldersButton?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutHighlightHoldersButtonItem = ({ layout, onHighlightHoldersButton, tags }: WiredMenuViewLayoutHighlightHoldersButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="highlight_holders_button"
            tags={tags}
            tooltip={t('wiredmenu.variable_overview.highlight_holders.tooltip')}
            onPointerTap={onHighlightHoldersButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 89, height: 25, flexShrink: 0, minWidth: 89, maxWidth: 89, ...layout }}
        >
            {t('wiredmenu.variable_overview.highlight_holders')}
        </Button>
    );
};

/** Row template `manage_button` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutManageButtonItemProps {
    layout?: BoxLayout;
    onManageButton?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutManageButtonItem = ({ layout, onManageButton, tags }: WiredMenuViewLayoutManageButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="manage_button"
            tags={tags}
            tooltip={t('wiredmenu.variable_overview.manage.tooltip')}
            onPointerTap={onManageButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 89, height: 25, flexShrink: 0, minWidth: 89, maxWidth: 89, ...layout }}
        >
            {t('wiredmenu.variable_overview.manage')}
        </Button>
    );
};

/** Named region `button_row` of WiredMenuViewLayout - configured through the parent's `buttonRow` prop. */
export interface WiredMenuViewLayoutButtonRowProps {
    itemsButtonRow?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutButtonRow = ({ itemsButtonRow, layout, tags }: WiredMenuViewLayoutButtonRowProps) => {
    return (
        <Region
            name="button_row"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 188, top: 342, height: 25, minWidth: 188, maxWidth: 188, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsButtonRow ?? (
                <>
                    <WiredMenuViewLayoutHighlightHoldersButtonItem />
                    <WiredMenuViewLayoutManageButtonItem />
                </>
            )}
        </Region>
    );
};

/** Named region `variable_properties_table_container` of WiredMenuViewLayout - configured through the parent's `variablePropertiesTableContainer` prop. */
export interface WiredMenuViewLayoutVariablePropertiesTableContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutVariablePropertiesTableContainer = ({ layout, tags }: WiredMenuViewLayoutVariablePropertiesTableContainerProps) => {
    return (
        <Region
            name="variable_properties_table_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0, ...layout }}
        />
    );
};

/** Named region `variable_properties_container` of WiredMenuViewLayout - configured through the parent's `variablePropertiesContainer` prop. */
export interface WiredMenuViewLayoutVariablePropertiesContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
    variablePropertiesTableContainer?: WiredMenuViewLayoutVariablePropertiesTableContainerProps;
}

export const WiredMenuViewLayoutVariablePropertiesContainer = ({ captionTitle, layout, tags, variablePropertiesTableContainer }: WiredMenuViewLayoutVariablePropertiesContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="variable_properties_container"
            tags={tags}
            layout={{ position: 'absolute', left: 230, width: 256, top: 17, height: 208, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? t('wiredmenu.variable_overview.properties')} />
            </Region>
            <WiredMenuViewLayoutVariablePropertiesTableContainer {...variablePropertiesTableContainer} />
        </Region>
    );
};

/** Named region `variable_texts_table_container` of WiredMenuViewLayout - configured through the parent's `variableTextsTableContainer` prop. */
export interface WiredMenuViewLayoutVariableTextsTableContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutVariableTextsTableContainer = ({ layout, tags }: WiredMenuViewLayoutVariableTextsTableContainerProps) => {
    return (
        <Region
            name="variable_texts_table_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0, ...layout }}
        />
    );
};

/** Named region `variable_texts_container` of WiredMenuViewLayout - configured through the parent's `variableTextsContainer` prop. */
export interface WiredMenuViewLayoutVariableTextsContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
    variableTextsTableContainer?: WiredMenuViewLayoutVariableTextsTableContainerProps;
}

export const WiredMenuViewLayoutVariableTextsContainer = ({ captionTitle, layout, tags, variableTextsTableContainer }: WiredMenuViewLayoutVariableTextsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="variable_texts_container"
            tags={tags}
            layout={{ position: 'absolute', left: 230, width: 256, top: 233, height: 135, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? t('wiredmenu.variable_overview.text_values')} />
            </Region>
            <WiredMenuViewLayoutVariableTextsTableContainer {...variableTextsTableContainer} />
        </Region>
    );
};

/** Named region `variable_overview_container` of WiredMenuViewLayout - configured through the parent's `variableOverviewContainer` prop. */
export interface WiredMenuViewLayoutVariableOverviewContainerProps {
    buttonRow?: WiredMenuViewLayoutButtonRowProps;
    layout?: BoxLayout;
    tags?: string[];
    typePickerContainer?: WiredMenuViewLayoutTypePickerContainerProps;
    variablePickerContainer?: WiredMenuViewLayoutVariablePickerContainerProps;
    variablePropertiesContainer?: WiredMenuViewLayoutVariablePropertiesContainerProps;
    variableTextsContainer?: WiredMenuViewLayoutVariableTextsContainerProps;
    visibleVariableOverviewContainer?: boolean;
}

export const WiredMenuViewLayoutVariableOverviewContainer = ({ buttonRow, layout, tags, typePickerContainer, variablePickerContainer, variablePropertiesContainer, variableTextsContainer, visibleVariableOverviewContainer }: WiredMenuViewLayoutVariableOverviewContainerProps) => {
    return (
        <Region
            name="variable_overview_container"
            tags={tags}
            visible={visibleVariableOverviewContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
        >
            <WiredMenuViewLayoutTypePickerContainer {...typePickerContainer} />
            <WiredMenuViewLayoutVariablePickerContainer {...variablePickerContainer} />
            <WiredMenuViewLayoutButtonRow {...buttonRow} />
            <WiredMenuViewLayoutVariablePropertiesContainer {...variablePropertiesContainer} />
            <WiredMenuViewLayoutVariableTextsContainer {...variableTextsContainer} />
        </Region>
    );
};

/** Row template `furni_option` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutFurniOptionItem2Props {
    layout?: BoxLayout;
    onTypeFurniButton?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutFurniOptionItem2 = ({ layout, onTypeFurniButton, tags }: WiredMenuViewLayoutFurniOptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="furni_option"
            tags={tags}
            layout={{ width: 37, height: 37, flexShrink: 0, ...layout }}
        >
            <Button
                variant="3"
                name="type_furni_button"
                tooltip={t('wiredfurni.params.sourcetype.furni')}
                onPointerTap={onTypeFurniButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
            />
            <ThemeImage
                src={layoutImage('icon_wired_variable_furni_large.png')}
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
            />
        </Region>
    );
};

/** Row template `user_option` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutUserOptionItem2Props {
    layout?: BoxLayout;
    onTypeUserButton?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutUserOptionItem2 = ({ layout, onTypeUserButton, tags }: WiredMenuViewLayoutUserOptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="user_option"
            tags={tags}
            layout={{ width: 37, height: 37, flexShrink: 0, ...layout }}
        >
            <Button
                variant="3"
                name="type_user_button"
                tooltip={t('wiredfurni.params.sourcetype.users')}
                onPointerTap={onTypeUserButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
            />
            <ThemeImage
                src={layoutImage('icon_wired_variable_user_large.png')}
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
            />
        </Region>
    );
};

/** Row template `global_option` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutGlobalOptionItem2Props {
    layout?: BoxLayout;
    onTypeGlobalButton?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutGlobalOptionItem2 = ({ layout, onTypeGlobalButton, tags }: WiredMenuViewLayoutGlobalOptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="global_option"
            tags={tags}
            layout={{ width: 37, height: 37, flexShrink: 0, ...layout }}
        >
            <Button
                variant="3"
                name="type_global_button"
                tooltip={t('wiredfurni.params.sourcetype.global')}
                onPointerTap={onTypeGlobalButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
            />
            <ThemeImage
                src={layoutImage('icon_wired_variable_global_large.png')}
                layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
            />
        </Region>
    );
};

/** Named region `buttons` of WiredMenuViewLayout - configured through the parent's `buttons` prop. */
export interface WiredMenuViewLayoutButtons2Props {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutButtons2 = ({ itemsButtons, layout, tags }: WiredMenuViewLayoutButtons2Props) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            layout={{ position: 'absolute', left: 5, width: 131, top: 5, height: 37, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <WiredMenuViewLayoutFurniOptionItem2 />
                    <WiredMenuViewLayoutUserOptionItem2 />
                    <WiredMenuViewLayoutGlobalOptionItem2 />
                </>
            )}
        </Region>
    );
};

/** Named region `type_picker_container` of WiredMenuViewLayout - configured through the parent's `typePickerContainer` prop. */
export interface WiredMenuViewLayoutTypePickerContainer2Props {
    buttons?: WiredMenuViewLayoutButtons2Props;
    captionTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutTypePickerContainer2 = ({ buttons, captionTitle, layout, tags }: WiredMenuViewLayoutTypePickerContainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="type_picker_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 150, top: 18, height: 70, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? t('wiredmenu.inspection.type')} />
            </Region>
            <Border
                variant="3"
                name="type_options"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, width: 141, top: 20, height: 47 }}
            >
                <WiredMenuViewLayoutButtons2 {...buttons} />
            </Border>
        </Region>
    );
};

/** Named region `variable_values_table_container` of WiredMenuViewLayout - configured through the parent's `variableValuesTableContainer` prop. */
export interface WiredMenuViewLayoutVariableValuesTableContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutVariableValuesTableContainer = ({ layout, tags }: WiredMenuViewLayoutVariableValuesTableContainerProps) => {
    return (
        <Region
            name="variable_values_table_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 34, ...layout }}
        />
    );
};

/** Named region `var_picker_container` of WiredMenuViewLayout - configured through the parent's `varPickerContainer` prop. */
export interface WiredMenuViewLayoutVarPickerContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutVarPickerContainer = ({ layout, tags }: WiredMenuViewLayoutVarPickerContainerProps) => {
    return (
        <Region
            name="var_picker_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 22, ...layout }}
        />
    );
};

/** Named region `variable_setting` of WiredMenuViewLayout - configured through the parent's `variableSetting` prop. */
export interface WiredMenuViewLayoutVariableSettingProps {
    layout?: BoxLayout;
    tags?: string[];
    varPickerContainer?: WiredMenuViewLayoutVarPickerContainerProps;
}

export const WiredMenuViewLayoutVariableSetting = ({ layout, tags, varPickerContainer }: WiredMenuViewLayoutVariableSettingProps) => {
    const t = useTranslation();

    return (
        <Region
            name="variable_setting"
            tags={tags}
            layout={{ position: 'absolute', left: 6, right: 22, top: 6, height: 42, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.inspection.select_variable')} />
            </Region>
            <WiredMenuViewLayoutVarPickerContainer {...varPickerContainer} />
        </Region>
    );
};

/** Named region `value_setting` of WiredMenuViewLayout - configured through the parent's `valueSetting` prop. */
export interface WiredMenuViewLayoutValueSettingProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutValueSetting = ({ layout, tags }: WiredMenuViewLayoutValueSettingProps) => {
    const t = useTranslation();
    const [ valueInputValue, setValueInputValue ] = useState('');

    return (
        <Region
            name="value_setting"
            tags={tags}
            layout={{ position: 'absolute', left: 6, right: 22, top: 52, height: 42, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.inspection.select_value')} />
            </Region>
            <Border
                variant="4"
                name="value_input_border"
                layout={{ position: 'absolute', left: 0, width: 80, top: 20, height: 22 }}
            >
                <TextInput
                    value={valueInputValue}
                    onChange={setValueInputValue}
                    layout={{ position: 'absolute', left: 5, right: 4, top: 3, bottom: 2 }}
                />
            </Border>
        </Region>
    );
};

/** Named region `variable_values_container` of WiredMenuViewLayout - configured through the parent's `variableValuesContainer` prop. */
export interface WiredMenuViewLayoutVariableValuesContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onAddVarBtn?: () => void;
    onCreateVarBtn?: () => void;
    onDeleteVarBtn?: () => void;
    tags?: string[];
    valueSetting?: WiredMenuViewLayoutValueSettingProps;
    variableSetting?: WiredMenuViewLayoutVariableSettingProps;
    variableValuesTableContainer?: WiredMenuViewLayoutVariableValuesTableContainerProps;
    visibleCreateVarBubble?: boolean;
}

export const WiredMenuViewLayoutVariableValuesContainer = ({ captionTitle, layout, onAddVarBtn, onCreateVarBtn, onDeleteVarBtn, tags, valueSetting, variableSetting, variableValuesTableContainer, visibleCreateVarBubble }: WiredMenuViewLayoutVariableValuesContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="variable_values_container"
            tags={tags}
            layout={{ position: 'absolute', left: 183, width: 303, top: 17, height: 351, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? t('wiredmenu.inspection.variables')} />
            </Region>
            <WiredMenuViewLayoutVariableValuesTableContainer {...variableValuesTableContainer} />
            <Region layout={{ position: 'absolute', left: 0, right: 0, bottom: -5, height: 30, flexDirection: 'row', gap: 13 }}>
                <Button
                    variant="3"
                    name="delete_var_btn"
                    onPointerTap={onDeleteVarBtn}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ width: 145, height: 25, flexShrink: 0, minWidth: 145, maxWidth: 145 }}
                >
                    {t('wiredmenu.inspection.delete')}
                </Button>
                <Button
                    variant="3"
                    name="add_var_btn"
                    onPointerTap={onAddVarBtn}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ width: 145, height: 25, flexShrink: 0, minWidth: 145, maxWidth: 145 }}
                >
                    {t('wiredmenu.inspection.add')}
                </Button>
            </Region>
            <Region
                visible={visibleCreateVarBubble ?? false}
                layout={{ position: 'absolute', left: 122, width: 186, top: 181, height: 145 }}
            >
                <Bubble
                    variant="7"
                    name="create_var_bubble"
                    layout={{ width: '100%', height: '100%' }}
                >
                    <WiredMenuViewLayoutVariableSetting {...variableSetting} />
                    <WiredMenuViewLayoutValueSetting {...valueSetting} />
                    <Button
                        variant="3"
                        name="create_var_btn"
                        onPointerTap={onCreateVarBtn}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', left: 6, right: 22, bottom: 20, height: 25, minWidth: 158, maxWidth: 158 }}
                    >
                        {t('wiredmenu.inspection.create')}
                    </Button>
                </Bubble>
            </Region>
        </Region>
    );
};

/** Named region `pin_option_container` of WiredMenuViewLayout - configured through the parent's `pinOptionContainer` prop. */
export interface WiredMenuViewLayoutPinOptionContainerProps {
    layout?: BoxLayout;
    onPinCheckbox?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutPinOptionContainer = ({ layout, onPinCheckbox, tags }: WiredMenuViewLayoutPinOptionContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pin_option_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 197, top: 254, height: 18, ...layout }}
        >
            <CheckBox
                variant="3"
                name="pin_checkbox"
                onPointerTap={onPinCheckbox}
                layout={{ position: 'absolute', left: 0, width: 17, top: 1, height: 17 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 82, top: 0, height: 17, minHeight: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.inspection.pin')} />
            </Region>
        </Region>
    );
};

/** Named region `preview_container` of WiredMenuViewLayout - configured through the parent's `previewContainer` prop. */
export interface WiredMenuViewLayoutPreviewContainerProps {
    captionPreviewInstructionFurni?: string;
    captionPreviewInstructionUser?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    onHighlightWiredBtn?: () => void;
    pinOptionContainer?: WiredMenuViewLayoutPinOptionContainerProps;
    srcGlobalPlaceholder?: string;
    srcPreviewImageBitmap?: string;
    tags?: string[];
}

export const WiredMenuViewLayoutPreviewContainer = ({ captionPreviewInstructionFurni, captionPreviewInstructionUser, captionTitle, layout, onHighlightWiredBtn, pinOptionContainer, srcGlobalPlaceholder, srcPreviewImageBitmap, tags }: WiredMenuViewLayoutPreviewContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 150, top: 94, height: 274, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? t('wiredmenu.inspection.preview')} />
            </Region>
            <Border
                variant="3"
                name="preview_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, right: 9, top: 20, height: 225, justifyContent: 'center' }}
            >
                <Region
                    name="preview_instruction_furni"
                    visible={false}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 104, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionPreviewInstructionFurni ?? t('wiredmenu.inspection.preview_furni_instruction')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region
                    name="preview_instruction_user"
                    visible={false}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 104, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionPreviewInstructionUser ?? t('wiredmenu.inspection.preview_user_instruction')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="avatar_image"
                    name="preview_avatar"
                    visible={false}
                    options={{ 'avatar_image:cropped': 'true' }}
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 34, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 84 }}
                />
                <WidgetSlot
                    widgetType="pet_image"
                    name="preview_pet"
                    visible={false}
                    layout={{ position: 'absolute', left: 46, right: 46, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 38, overflow: 'hidden' }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 50, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 50 }}
                >
                    <ThemeImage
                        name="preview_image_bitmap"
                        src={srcPreviewImageBitmap}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 50, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 50 }}
                    />
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 120, top: 64, height: 97 }}
                >
                    <ThemeImage
                        name="global_placeholder"
                        src={srcGlobalPlaceholder ?? layoutImage('wired_global_placeholder.png')}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 120, top: 64, height: 97 }}
                    />
                </Region>
                <ContainerButton
                    variant="7"
                    name="highlight_wired_btn"
                    tooltip={t('wiredmenu.inspection.highlight_wireds')}
                    onPointerTap={onHighlightWiredBtn}
                    layout={{ position: 'absolute', right: 6, width: 25, top: 6, height: 26 }}
                >
                    <ThemeImage
                        src="${image.library.url}catalogue/icon_80.png"
                        layout={{ position: 'absolute', left: 4, width: 16, top: 6, height: 14 }}
                    />
                </ContainerButton>
            </Border>
            <WiredMenuViewLayoutPinOptionContainer {...pinOptionContainer} />
        </Region>
    );
};

/** Named region `inspection_container` of WiredMenuViewLayout - configured through the parent's `inspectionContainer` prop. */
export interface WiredMenuViewLayoutInspectionContainerProps {
    layout?: BoxLayout;
    onInspectionContainer?: () => void;
    previewContainer?: WiredMenuViewLayoutPreviewContainerProps;
    tags?: string[];
    typePickerContainer?: WiredMenuViewLayoutTypePickerContainer2Props;
    variableValuesContainer?: WiredMenuViewLayoutVariableValuesContainerProps;
    visibleInspectionContainer?: boolean;
}

export const WiredMenuViewLayoutInspectionContainer = ({ layout, onInspectionContainer, previewContainer, tags, typePickerContainer, variableValuesContainer, visibleInspectionContainer }: WiredMenuViewLayoutInspectionContainerProps) => {
    return (
        <Region
            name="inspection_container"
            tags={tags}
            visible={visibleInspectionContainer ?? false}
            onPointerTap={onInspectionContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
        >
            <WiredMenuViewLayoutTypePickerContainer2 {...typePickerContainer} />
            <WiredMenuViewLayoutVariableValuesContainer {...variableValuesContainer} />
            <WiredMenuViewLayoutPreviewContainer {...previewContainer} />
        </Region>
    );
};

/** Named region `chest_controls_container` of WiredMenuViewLayout - configured through the parent's `chestControlsContainer` prop. */
export interface WiredMenuViewLayoutChestControlsContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onLockAllButton?: () => void;
    onLockOwnButton?: () => void;
    onUnlockOwnButton?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutChestControlsContainer = ({ captionTitle, layout, onLockAllButton, onLockOwnButton, onUnlockOwnButton, tags }: WiredMenuViewLayoutChestControlsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chest_controls_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 472, top: 18, height: 110, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 84, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? t('wiredmenu.chests.chest_control')} />
            </Region>
            <Border
                variant="3"
                name="preferences_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0 }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 452, top: 10, height: 30, flexDirection: 'row', gap: 10 }}>
                    <Button
                        variant="3"
                        name="lock_own_button"
                        onPointerTap={onLockOwnButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ width: 221, height: 30, flexShrink: 0, minWidth: 221, maxWidth: 221 }}
                    >
                        {t('wiredmenu.chests.chest_control.lock_own')}
                    </Button>
                    <Button
                        variant="3"
                        name="unlock_own_button"
                        onPointerTap={onUnlockOwnButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ width: 221, height: 30, flexShrink: 0, minWidth: 221, maxWidth: 221 }}
                    >
                        {t('wiredmenu.chests.chest_control.unlock_own')}
                    </Button>
                </Region>
                <Region layout={{ position: 'absolute', left: 10, width: 221, top: 50, height: 30, flexDirection: 'row' }}>
                    <Button
                        variant="3"
                        name="lock_all_button"
                        onPointerTap={onLockAllButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ width: 221, height: 30, flexShrink: 0, minWidth: 221, maxWidth: 221 }}
                    >
                        {t('wiredmenu.chests.chest_control.lock_all')}
                    </Button>
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `logs_table_container` of WiredMenuViewLayout - configured through the parent's `logsTableContainer` prop. */
export interface WiredMenuViewLayoutLogsTableContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredMenuViewLayoutLogsTableContainer = ({ layout, tags }: WiredMenuViewLayoutLogsTableContainerProps) => {
    return (
        <Region
            name="logs_table_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 40, ...layout }}
        />
    );
};

/** Named region `logs_container` of WiredMenuViewLayout - configured through the parent's `logsContainer` prop. */
export interface WiredMenuViewLayoutLogsContainerProps {
    captionTitle?: string;
    captionTitleExtra?: string;
    layout?: BoxLayout;
    logsTableContainer?: WiredMenuViewLayoutLogsTableContainerProps;
    onViewInDetailButton?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutLogsContainer = ({ captionTitle, captionTitleExtra, layout, logsTableContainer, onViewInDetailButton, tags }: WiredMenuViewLayoutLogsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="logs_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 472, top: 139, height: 228, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 136, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? t('wiredmenu.chests.room_logs')} />
            </Region>
            <Region
                name="title_extra"
                layout={{ position: 'absolute', right: 3, width: 197, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitleExtra ?? t('wiredmenu.chests.room_logs.extra')} />
            </Region>
            <WiredMenuViewLayoutLogsTableContainer {...logsTableContainer} />
            <Button
                variant="3"
                name="view_in_detail_button"
                onPointerTap={onViewInDetailButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 0, width: 114, top: 197, height: 30 }}
            >
                {t('wiredmenu.chests.room_logs.view_detail')}
            </Button>
        </Region>
    );
};

/** Named region `chests_container` of WiredMenuViewLayout - configured through the parent's `chestsContainer` prop. */
export interface WiredMenuViewLayoutChestsContainerProps {
    chestControlsContainer?: WiredMenuViewLayoutChestControlsContainerProps;
    layout?: BoxLayout;
    logsContainer?: WiredMenuViewLayoutLogsContainerProps;
    tags?: string[];
    visibleChestsContainer?: boolean;
}

export const WiredMenuViewLayoutChestsContainer = ({ chestControlsContainer, layout, logsContainer, tags, visibleChestsContainer }: WiredMenuViewLayoutChestsContainerProps) => {
    return (
        <Region
            name="chests_container"
            tags={tags}
            visible={visibleChestsContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
        >
            <WiredMenuViewLayoutChestControlsContainer {...chestControlsContainer} />
            <WiredMenuViewLayoutLogsContainer {...logsContainer} />
        </Region>
    );
};

/** Named region `option_box` of WiredMenuViewLayout - configured through the parent's `optionBox` prop. */
export interface WiredMenuViewLayoutOptionBoxProps {
    layout?: BoxLayout;
    onModify1Checkbox?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutOptionBox = ({ layout, onModify1Checkbox, tags }: WiredMenuViewLayoutOptionBoxProps) => {
    const t = useTranslation();

    return (
        <Region
            name="option_box"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 214, top: 20, height: 20, ...layout }}
        >
            <CheckBox
                variant="3"
                name="modify_1_checkbox"
                onPointerTap={onModify1Checkbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.permission_level.1')} />
            </Region>
        </Region>
    );
};

/** Named region `option_box` of WiredMenuViewLayout - configured through the parent's `optionBox` prop. */
export interface WiredMenuViewLayoutOptionBox2Props {
    layout?: BoxLayout;
    onModify2Checkbox?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutOptionBox2 = ({ layout, onModify2Checkbox, tags }: WiredMenuViewLayoutOptionBox2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="option_box"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 214, top: 39, height: 20, ...layout }}
        >
            <CheckBox
                variant="3"
                name="modify_2_checkbox"
                onPointerTap={onModify2Checkbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.permission_level.2')} />
            </Region>
        </Region>
    );
};

/** Named region `option_box` of WiredMenuViewLayout - configured through the parent's `optionBox` prop. */
export interface WiredMenuViewLayoutOptionBox3Props {
    layout?: BoxLayout;
    onModify3Checkbox?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutOptionBox3 = ({ layout, onModify3Checkbox, tags }: WiredMenuViewLayoutOptionBox3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="option_box"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 214, top: 58, height: 20, ...layout }}
        >
            <CheckBox
                variant="3"
                name="modify_3_checkbox"
                onPointerTap={onModify3Checkbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.permission_level.3')} />
            </Region>
        </Region>
    );
};

/** Named region `modify_settings_container` of WiredMenuViewLayout - configured through the parent's `modifySettingsContainer` prop. */
export interface WiredMenuViewLayoutModifySettingsContainerProps {
    layout?: BoxLayout;
    optionBox?: WiredMenuViewLayoutOptionBoxProps;
    optionBox2?: WiredMenuViewLayoutOptionBox2Props;
    optionBox3?: WiredMenuViewLayoutOptionBox3Props;
    tags?: string[];
}

export const WiredMenuViewLayoutModifySettingsContainer = ({ layout, optionBox, optionBox2, optionBox3, tags }: WiredMenuViewLayoutModifySettingsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="modify_settings_container"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 102, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.room_settings.modify_rights')} />
            </Region>
            <WiredMenuViewLayoutOptionBox {...optionBox} />
            <WiredMenuViewLayoutOptionBox2 {...optionBox2} />
            <WiredMenuViewLayoutOptionBox3 {...optionBox3} />
        </Region>
    );
};

/** Named region `option_box` of WiredMenuViewLayout - configured through the parent's `optionBox` prop. */
export interface WiredMenuViewLayoutOptionBox4Props {
    layout?: BoxLayout;
    onRead0Checkbox?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutOptionBox4 = ({ layout, onRead0Checkbox, tags }: WiredMenuViewLayoutOptionBox4Props) => {
    const t = useTranslation();

    return (
        <Region
            name="option_box"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 214, top: 20, height: 20, ...layout }}
        >
            <CheckBox
                variant="3"
                name="read_0_checkbox"
                onPointerTap={onRead0Checkbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.permission_level.0')} />
            </Region>
        </Region>
    );
};

/** Named region `option_box` of WiredMenuViewLayout - configured through the parent's `optionBox` prop. */
export interface WiredMenuViewLayoutOptionBox5Props {
    layout?: BoxLayout;
    onRead1Checkbox?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutOptionBox5 = ({ layout, onRead1Checkbox, tags }: WiredMenuViewLayoutOptionBox5Props) => {
    const t = useTranslation();

    return (
        <Region
            name="option_box"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 214, top: 39, height: 20, ...layout }}
        >
            <CheckBox
                variant="3"
                name="read_1_checkbox"
                onPointerTap={onRead1Checkbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.permission_level.1')} />
            </Region>
        </Region>
    );
};

/** Named region `option_box` of WiredMenuViewLayout - configured through the parent's `optionBox` prop. */
export interface WiredMenuViewLayoutOptionBox6Props {
    layout?: BoxLayout;
    onRead2Checkbox?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutOptionBox6 = ({ layout, onRead2Checkbox, tags }: WiredMenuViewLayoutOptionBox6Props) => {
    const t = useTranslation();

    return (
        <Region
            name="option_box"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 214, top: 58, height: 20, ...layout }}
        >
            <CheckBox
                variant="3"
                name="read_2_checkbox"
                onPointerTap={onRead2Checkbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.permission_level.2')} />
            </Region>
        </Region>
    );
};

/** Named region `option_box` of WiredMenuViewLayout - configured through the parent's `optionBox` prop. */
export interface WiredMenuViewLayoutOptionBox7Props {
    layout?: BoxLayout;
    onRead3Checkbox?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutOptionBox7 = ({ layout, onRead3Checkbox, tags }: WiredMenuViewLayoutOptionBox7Props) => {
    const t = useTranslation();

    return (
        <Region
            name="option_box"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 214, top: 77, height: 20, ...layout }}
        >
            <CheckBox
                variant="3"
                name="read_3_checkbox"
                onPointerTap={onRead3Checkbox}
                layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.permission_level.3')} />
            </Region>
        </Region>
    );
};

/** Named region `read_settings_container` of WiredMenuViewLayout - configured through the parent's `readSettingsContainer` prop. */
export interface WiredMenuViewLayoutReadSettingsContainerProps {
    layout?: BoxLayout;
    optionBox?: WiredMenuViewLayoutOptionBox4Props;
    optionBox2?: WiredMenuViewLayoutOptionBox5Props;
    optionBox3?: WiredMenuViewLayoutOptionBox6Props;
    optionBox4?: WiredMenuViewLayoutOptionBox7Props;
    tags?: string[];
}

export const WiredMenuViewLayoutReadSettingsContainer = ({ layout, optionBox, optionBox2, optionBox3, optionBox4, tags }: WiredMenuViewLayoutReadSettingsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="read_settings_container"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 233, top: 8, height: 102, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.room_settings.read_rights')} />
            </Region>
            <WiredMenuViewLayoutOptionBox4 {...optionBox} />
            <WiredMenuViewLayoutOptionBox5 {...optionBox2} />
            <WiredMenuViewLayoutOptionBox6 {...optionBox3} />
            <WiredMenuViewLayoutOptionBox7 {...optionBox4} />
        </Region>
    );
};

/** Named region `timezone_container` of WiredMenuViewLayout - configured through the parent's `timezoneContainer` prop. */
export interface WiredMenuViewLayoutTimezoneContainerProps {
    layout?: BoxLayout;
    onTimezonePicker?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutTimezoneContainer = ({ layout, onTimezonePicker, tags }: WiredMenuViewLayoutTimezoneContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="timezone_container"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 50, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.room_settings.timezone')} />
            </Region>
            <Dropmenu
                variant="3"
                name="timezone_picker"
                onPointerTap={onTimezonePicker}
                layout={{ position: 'absolute', left: 0, width: 206, top: 21, height: 25 }}
            />
        </Region>
    );
};

/** Named region `timezone_container` of WiredMenuViewLayout - configured through the parent's `timezoneContainer` prop. */
export interface WiredMenuViewLayoutTimezoneContainer2Props {
    layout?: BoxLayout;
    onReloadRoomBtn?: () => void;
    onRollBackBtn?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutTimezoneContainer2 = ({ layout, onReloadRoomBtn, onRollBackBtn, tags }: WiredMenuViewLayoutTimezoneContainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="timezone_container"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 50, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.room_settings.room_state')} />
            </Region>
            <Button
                variant="3"
                name="reload_room_btn"
                onPointerTap={onReloadRoomBtn}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 0, width: 98, top: 21, height: 28, minWidth: 98, maxWidth: 98 }}
            >
                {t('wiredmenu.settings.room_state.reload')}
            </Button>
            <Button
                variant="5"
                name="roll_back_btn"
                tintColor="#e33934"
                onPointerTap={onRollBackBtn}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 109, width: 98, top: 21, height: 28, minWidth: 98, maxWidth: 98 }}
            >
                {t('wiredmenu.settings.room_state.roll_back')}
            </Button>
        </Region>
    );
};

/** Named region `room_settings_container` of WiredMenuViewLayout - configured through the parent's `roomSettingsContainer` prop. */
export interface WiredMenuViewLayoutRoomSettingsContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    modifySettingsContainer?: WiredMenuViewLayoutModifySettingsContainerProps;
    readSettingsContainer?: WiredMenuViewLayoutReadSettingsContainerProps;
    tags?: string[];
    timezoneContainer?: WiredMenuViewLayoutTimezoneContainerProps;
    timezoneContainer2?: WiredMenuViewLayoutTimezoneContainer2Props;
}

export const WiredMenuViewLayoutRoomSettingsContainer = ({ captionTitle, layout, modifySettingsContainer, readSettingsContainer, tags, timezoneContainer, timezoneContainer2 }: WiredMenuViewLayoutRoomSettingsContainerProps) => {
    return (
        <Region
            name="room_settings_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 472, top: 18, height: 220, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? '${wiredmenu.settings.room_settings)'} />
            </Region>
            <Border
                variant="3"
                name="room_settings_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, right: 245, top: 20, height: 111 }}
            >
                <WiredMenuViewLayoutModifySettingsContainer {...modifySettingsContainer} />
            </Border>
            <Border
                variant="3"
                name="room_settings_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 245, right: 0, top: 20, height: 111 }}
            >
                <WiredMenuViewLayoutReadSettingsContainer {...readSettingsContainer} />
            </Border>
            <Border
                variant="3"
                name="room_settings_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, right: 245, top: 143, height: 64 }}
            >
                <WiredMenuViewLayoutTimezoneContainer {...timezoneContainer} />
            </Border>
            <Border
                variant="3"
                name="room_settings_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 245, right: 0, top: 143, height: 64 }}
            >
                <WiredMenuViewLayoutTimezoneContainer2 {...timezoneContainer2} />
            </Border>
        </Region>
    );
};

/** Named region `option_container` of WiredMenuViewLayout - configured through the parent's `optionContainer` prop. */
export interface WiredMenuViewLayoutOptionContainerProps {
    layout?: BoxLayout;
    onPreferenceToolbarCheckbox?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutOptionContainer = ({ layout, onPreferenceToolbarCheckbox, tags }: WiredMenuViewLayoutOptionContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="option_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 450, top: 20, height: 20, ...layout }}
        >
            <CheckBox
                variant="3"
                name="preference_toolbar_checkbox"
                onPointerTap={onPreferenceToolbarCheckbox}
                layout={{ position: 'absolute', left: 0, width: 19, top: 1, height: 18 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 390, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.preferences.toolbar')} />
            </Region>
        </Region>
    );
};

/** Named region `option_container` of WiredMenuViewLayout - configured through the parent's `optionContainer` prop. */
export interface WiredMenuViewLayoutOptionContainer2Props {
    layout?: BoxLayout;
    onPreferenceInspectButtonCheckbox?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutOptionContainer2 = ({ layout, onPreferenceInspectButtonCheckbox, tags }: WiredMenuViewLayoutOptionContainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="option_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 450, top: 39, height: 20, ...layout }}
        >
            <CheckBox
                variant="3"
                name="preference_inspect_button_checkbox"
                onPointerTap={onPreferenceInspectButtonCheckbox}
                layout={{ position: 'absolute', left: 0, width: 19, top: 1, height: 18 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 390, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.preferences.inspect_button')} />
            </Region>
        </Region>
    );
};

/** Named region `option_container` of WiredMenuViewLayout - configured through the parent's `optionContainer` prop. */
export interface WiredMenuViewLayoutOptionContainer3Props {
    layout?: BoxLayout;
    onPreferencePlaytestCheckbox?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutOptionContainer3 = ({ layout, onPreferencePlaytestCheckbox, tags }: WiredMenuViewLayoutOptionContainer3Props) => {
    const t = useTranslation();

    return (
        <Region
            name="option_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 450, top: 58, height: 20, ...layout }}
        >
            <CheckBox
                variant="3"
                name="preference_playtest_checkbox"
                onPointerTap={onPreferencePlaytestCheckbox}
                layout={{ position: 'absolute', left: 0, width: 19, top: 1, height: 18 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 430, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.preferences.playtest')} />
            </Region>
        </Region>
    );
};

/** Named region `option_container` of WiredMenuViewLayout - configured through the parent's `optionContainer` prop. */
export interface WiredMenuViewLayoutOptionContainer4Props {
    layout?: BoxLayout;
    onPreferenceAllNotificationsCheckbox?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutOptionContainer4 = ({ layout, onPreferenceAllNotificationsCheckbox, tags }: WiredMenuViewLayoutOptionContainer4Props) => {
    const t = useTranslation();

    return (
        <Region
            name="option_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 450, top: 77, height: 20, ...layout }}
        >
            <CheckBox
                variant="3"
                name="preference_all_notifications_checkbox"
                onPointerTap={onPreferenceAllNotificationsCheckbox}
                layout={{ position: 'absolute', left: 0, width: 19, top: 1, height: 18 }}
            />
            <Region layout={{ position: 'absolute', left: 20, width: 430, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.preferences.show_all_errors')} />
            </Region>
        </Region>
    );
};

/** Named region `preferences_container` of WiredMenuViewLayout - configured through the parent's `preferencesContainer` prop. */
export interface WiredMenuViewLayoutPreferencesContainer2Props {
    layout?: BoxLayout;
    optionContainer?: WiredMenuViewLayoutOptionContainerProps;
    optionContainer2?: WiredMenuViewLayoutOptionContainer2Props;
    optionContainer3?: WiredMenuViewLayoutOptionContainer3Props;
    optionContainer4?: WiredMenuViewLayoutOptionContainer4Props;
    tags?: string[];
}

export const WiredMenuViewLayoutPreferencesContainer2 = ({ layout, optionContainer, optionContainer2, optionContainer3, optionContainer4, tags }: WiredMenuViewLayoutPreferencesContainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="preferences_container"
            tags={tags}
            layout={{ position: 'absolute', left: 10, right: 4, top: 8, bottom: 2, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.preferences.general')} />
            </Region>
            <WiredMenuViewLayoutOptionContainer {...optionContainer} />
            <WiredMenuViewLayoutOptionContainer2 {...optionContainer2} />
            <WiredMenuViewLayoutOptionContainer3 {...optionContainer3} />
            <WiredMenuViewLayoutOptionContainer4 {...optionContainer4} />
        </Region>
    );
};

/** Named region `wored_style_container` of WiredMenuViewLayout - configured through the parent's `woredStyleContainer` prop. */
export interface WiredMenuViewLayoutWoredStyleContainerProps {
    layout?: BoxLayout;
    onWiredStylePicker?: () => void;
    tags?: string[];
}

export const WiredMenuViewLayoutWoredStyleContainer = ({ layout, onWiredStylePicker, tags }: WiredMenuViewLayoutWoredStyleContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="wored_style_container"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 50, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.preferences.wired_style')} />
            </Region>
            <Dropmenu
                variant="3"
                name="wired_style_picker"
                onPointerTap={onWiredStylePicker}
                layout={{ position: 'absolute', left: 0, width: 206, top: 21, height: 25 }}
            />
        </Region>
    );
};

/** Named region `preferences_container` of WiredMenuViewLayout - configured through the parent's `preferencesContainer` prop. */
export interface WiredMenuViewLayoutPreferencesContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    preferencesContainer?: WiredMenuViewLayoutPreferencesContainer2Props;
    tags?: string[];
    woredStyleContainer?: WiredMenuViewLayoutWoredStyleContainerProps;
}

export const WiredMenuViewLayoutPreferencesContainer = ({ captionTitle, layout, preferencesContainer, tags, woredStyleContainer }: WiredMenuViewLayoutPreferencesContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preferences_container"
            tags={tags}
            layout={{ position: 'absolute', left: 14, width: 472, top: 237, height: 131, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? t('wiredmenu.settings.preferences')} />
            </Region>
            <Border
                variant="3"
                name="preferences_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, right: 245, top: 20, bottom: 0 }}
            >
                <WiredMenuViewLayoutPreferencesContainer2 {...preferencesContainer} />
            </Border>
            <Border
                variant="3"
                name="wired_style_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 245, right: 0, top: 20, height: 64 }}
            >
                <WiredMenuViewLayoutWoredStyleContainer {...woredStyleContainer} />
            </Border>
        </Region>
    );
};

/** Named region `settings_container` of WiredMenuViewLayout - configured through the parent's `settingsContainer` prop. */
export interface WiredMenuViewLayoutSettingsContainerProps {
    layout?: BoxLayout;
    preferencesContainer?: WiredMenuViewLayoutPreferencesContainerProps;
    roomSettingsContainer?: WiredMenuViewLayoutRoomSettingsContainerProps;
    tags?: string[];
    visibleSettingsContainer?: boolean;
}

export const WiredMenuViewLayoutSettingsContainer = ({ layout, preferencesContainer, roomSettingsContainer, tags, visibleSettingsContainer }: WiredMenuViewLayoutSettingsContainerProps) => {
    return (
        <Region
            name="settings_container"
            tags={tags}
            visible={visibleSettingsContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
        >
            <WiredMenuViewLayoutRoomSettingsContainer {...roomSettingsContainer} />
            <WiredMenuViewLayoutPreferencesContainer {...preferencesContainer} />
        </Region>
    );
};

/** Named region `info_container` of WiredMenuViewLayout - configured through the parent's `infoContainer` prop. */
export interface WiredMenuViewLayoutInfoContainerProps {
    layout?: BoxLayout;
    tags?: string[];
    visibleInfoContainer?: boolean;
}

export const WiredMenuViewLayoutInfoContainer = ({ layout, tags, visibleInfoContainer }: WiredMenuViewLayoutInfoContainerProps) => {
    return (
        <Region
            name="info_container"
            tags={tags}
            visible={visibleInfoContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
        />
    );
};

/** Named region `loading_view` of WiredMenuViewLayout - configured through the parent's `loadingView` prop. */
export interface WiredMenuViewLayoutLoadingViewProps {
    layout?: BoxLayout;
    onLoadingView?: () => void;
    tags?: string[];
    visibleLoadingView?: boolean;
}

export const WiredMenuViewLayoutLoadingView = ({ layout, onLoadingView, tags, visibleLoadingView }: WiredMenuViewLayoutLoadingViewProps) => {
    return (
        <Region
            name="loading_view"
            tags={tags}
            visible={visibleLoadingView ?? false}
            backgroundColor="#e9e9e1"
            onPointerTap={onLoadingView}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
        />
    );
};

/** Named region `body_container` of WiredMenuViewLayout - configured through the parent's `bodyContainer` prop. */
export interface WiredMenuViewLayoutBodyContainerProps {
    chestsContainer?: WiredMenuViewLayoutChestsContainerProps;
    infoContainer?: WiredMenuViewLayoutInfoContainerProps;
    inspectionContainer?: WiredMenuViewLayoutInspectionContainerProps;
    layout?: BoxLayout;
    loadingView?: WiredMenuViewLayoutLoadingViewProps;
    monitorContainer?: WiredMenuViewLayoutMonitorContainerProps;
    settingsContainer?: WiredMenuViewLayoutSettingsContainerProps;
    tags?: string[];
    variableOverviewContainer?: WiredMenuViewLayoutVariableOverviewContainerProps;
}

export const WiredMenuViewLayoutBodyContainer = ({ chestsContainer, infoContainer, inspectionContainer, layout, loadingView, monitorContainer, settingsContainer, tags, variableOverviewContainer }: WiredMenuViewLayoutBodyContainerProps) => {
    return (
        <Region
            name="body_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 500, top: 82, height: 382, ...layout }}
        >
            <WiredMenuViewLayoutMonitorContainer {...monitorContainer} />
            <WiredMenuViewLayoutVariableOverviewContainer {...variableOverviewContainer} />
            <WiredMenuViewLayoutInspectionContainer {...inspectionContainer} />
            <WiredMenuViewLayoutChestsContainer {...chestsContainer} />
            <WiredMenuViewLayoutSettingsContainer {...settingsContainer} />
            <WiredMenuViewLayoutInfoContainer {...infoContainer} />
            <WiredMenuViewLayoutLoadingView {...loadingView} />
        </Region>
    );
};
