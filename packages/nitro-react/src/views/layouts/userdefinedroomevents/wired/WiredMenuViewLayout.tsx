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
        </Frame>
    );
};

/** Named region `header_detail` of WiredMenuViewLayout - configured through the parent's `headerDetail` prop. */
export interface WiredMenuViewLayoutHeaderDetailProps {
    layout?: BoxLayout;
}

export const WiredMenuViewLayoutHeaderDetail = ({ layout }: WiredMenuViewLayoutHeaderDetailProps) => {
    return (
        <Region
            name="header_detail"
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

/** Named region `header_container` of WiredMenuViewLayout - configured through the parent's `headerContainer` prop. */
export interface WiredMenuViewLayoutHeaderContainerProps {
    captionHeaderTitle?: string;
    headerDetail?: WiredMenuViewLayoutHeaderDetailProps;
    layout?: BoxLayout;
    onDiscordRegion?: () => void;
}

export const WiredMenuViewLayoutHeaderContainer = ({ captionHeaderTitle, headerDetail, layout, onDiscordRegion }: WiredMenuViewLayoutHeaderContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header_container"
            layout={{ position: 'absolute', left: 1, width: 498, top: 32, height: 50, ...layout }}
        >
            <Region
                name="header_border"
                backgroundColor="#486f81"
                layout={{ position: 'absolute', left: 0, width: 498, top: 0, height: 50 }}
            >
                <Region
                    name="header_inner"
                    backgroundColor="#235061"
                    layout={{ position: 'absolute', left: 2, width: 494, top: 2, height: 46 }}
                />
            </Region>
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
            <Region
                name="discord_region"
                tooltip={t('wiredmenu.discord_region.tooltip')}
                dynamicStyle="brightness_and_shadow_under_gentle"
                onPointerTap={onDiscordRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 473, width: 22, top: 3, height: 25 }}
            >
                <ThemeImage
                    src={layoutImage('icon_discord.png')}
                    layout={{ position: 'absolute', left: 0, width: 22, top: 1, height: 23 }}
                />
            </Region>
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
}

export const WiredMenuViewLayoutStatisticsContainer = ({ captionStatisticsFloorfurniHtml, captionStatisticsHeavyHtml, captionStatisticsPermVarsFurniHtml, captionStatisticsPermVarsGlobalHtml, captionStatisticsPermVarsUserHtml, captionStatisticsUsageHtml, captionStatisticsWallfurniHtml, captionTitle, layout }: WiredMenuViewLayoutStatisticsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="statistics_container"
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

/** Named region `monitor_container` of WiredMenuViewLayout - configured through the parent's `monitorContainer` prop. */
export interface WiredMenuViewLayoutMonitorContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onClearLogBtn?: () => void;
    onLogOverviewBtn?: () => void;
    srcMonitorImage1?: string;
    srcMonitorImage2?: string;
    statisticsContainer?: WiredMenuViewLayoutStatisticsContainerProps;
    visibleMonitorImage1?: boolean;
}

export const WiredMenuViewLayoutMonitorContainer = ({ captionTitle, layout, onClearLogBtn, onLogOverviewBtn, srcMonitorImage1, srcMonitorImage2, statisticsContainer, visibleMonitorImage1 }: WiredMenuViewLayoutMonitorContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="monitor_container"
            layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
        >
            <WiredMenuViewLayoutStatisticsContainer {...statisticsContainer} />
            <Region
                name="image_container"
                layout={{ position: 'absolute', left: 230, width: 256, top: 4, height: 145 }}
            >
                {(visibleMonitorImage1 ?? false) && (
                    <ThemeImage
                        name="monitor_image_1"
                        src={srcMonitorImage1 ?? layoutImage('wired_monitor_element1.png')}
                        layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 145 }}
                    />
                )}
                <ThemeImage
                    name="monitor_image_2"
                    src={srcMonitorImage2 ?? layoutImage('wired_monitor_element2.png')}
                    layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 145 }}
                />
            </Region>
            <Region
                name="log_container"
                layout={{ position: 'absolute', left: 14, width: 472, top: 152, height: 218 }}
            >
                <Region
                    name="title"
                    layout={{ position: 'absolute', left: 0, width: 106, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionTitle ?? t('wiredmenu.monitor.log')} />
                </Region>
                <Region
                    name="log_table_container"
                    layout={{ position: 'absolute', left: 0, width: 472, top: 20, height: 156 }}
                />
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
        </Region>
    );
};

/** Row template `furni_option` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutFurniOptionItemProps {
    layout?: BoxLayout;
    onTypeFurniButton?: () => void;
}

export const WiredMenuViewLayoutFurniOptionItem = ({ layout, onTypeFurniButton }: WiredMenuViewLayoutFurniOptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="furni_option"
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
}

export const WiredMenuViewLayoutUserOptionItem = ({ layout, onTypeUserButton }: WiredMenuViewLayoutUserOptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_option"
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
}

export const WiredMenuViewLayoutGlobalOptionItem = ({ layout, onTypeGlobalButton }: WiredMenuViewLayoutGlobalOptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="global_option"
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
}

export const WiredMenuViewLayoutContextOptionItem = ({ layout, onTypeContextButton }: WiredMenuViewLayoutContextOptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="context_option"
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
}

export const WiredMenuViewLayoutButtons = ({ itemsButtons, layout }: WiredMenuViewLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
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
}

export const WiredMenuViewLayoutTypePickerContainer = ({ buttons, captionTitle, layout }: WiredMenuViewLayoutTypePickerContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="type_picker_container"
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

/** Row template `highlight_holders_button` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutHighlightHoldersButtonItemProps {
    layout?: BoxLayout;
    onHighlightHoldersButton?: () => void;
}

export const WiredMenuViewLayoutHighlightHoldersButtonItem = ({ layout, onHighlightHoldersButton }: WiredMenuViewLayoutHighlightHoldersButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="highlight_holders_button"
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
}

export const WiredMenuViewLayoutManageButtonItem = ({ layout, onManageButton }: WiredMenuViewLayoutManageButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="manage_button"
            tooltip={t('wiredmenu.variable_overview.manage.tooltip')}
            onPointerTap={onManageButton}
            textStyle="text-style-button-shiny-regular"
            layout={{ width: 89, height: 25, flexShrink: 0, minWidth: 89, maxWidth: 89, ...layout }}
        >
            {t('wiredmenu.variable_overview.manage')}
        </Button>
    );
};

/** Named region `variable_overview_container` of WiredMenuViewLayout - configured through the parent's `variableOverviewContainer` prop. */
export interface WiredMenuViewLayoutVariableOverviewContainerProps {
    captionTitle?: string;
    captionTitle2?: string;
    captionTitle3?: string;
    itemsButtonRow?: ReactNode;
    layout?: BoxLayout;
    typePickerContainer?: WiredMenuViewLayoutTypePickerContainerProps;
    visibleVariableOverviewContainer?: boolean;
}

export const WiredMenuViewLayoutVariableOverviewContainer = ({ captionTitle, captionTitle2, captionTitle3, itemsButtonRow, layout, typePickerContainer, visibleVariableOverviewContainer }: WiredMenuViewLayoutVariableOverviewContainerProps) => {
    const t = useTranslation();

    return (
        (visibleVariableOverviewContainer ?? false) && (
            <Region
                name="variable_overview_container"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
            >
                <WiredMenuViewLayoutTypePickerContainer {...typePickerContainer} />
                <Region
                    name="variable_picker_container"
                    layout={{ position: 'absolute', left: 14, right: 298, top: 94, height: 239 }}
                >
                    <Region
                        name="title"
                        layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionTitle ?? t('wiredmenu.variable_overview.picker')} />
                    </Region>
                    <Region
                        name="variable_list_container"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0 }}
                    />
                </Region>
                <Region
                    name="button_row"
                    layout={{ position: 'absolute', left: 14, width: 188, top: 342, height: 25, minWidth: 188, maxWidth: 188, flexDirection: 'row', gap: 10 }}
                >
                    {itemsButtonRow ?? (
                        <>
                            <WiredMenuViewLayoutHighlightHoldersButtonItem />
                            <WiredMenuViewLayoutManageButtonItem />
                        </>
                    )}
                </Region>
                <Region
                    name="variable_properties_container"
                    layout={{ position: 'absolute', left: 230, width: 256, top: 17, height: 208 }}
                >
                    <Region
                        name="title"
                        layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionTitle2 ?? t('wiredmenu.variable_overview.properties')} />
                    </Region>
                    <Region
                        name="variable_properties_table_container"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0 }}
                    />
                </Region>
                <Region
                    name="variable_texts_container"
                    layout={{ position: 'absolute', left: 230, width: 256, top: 233, height: 135 }}
                >
                    <Region
                        name="title"
                        layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionTitle3 ?? t('wiredmenu.variable_overview.text_values')} />
                    </Region>
                    <Region
                        name="variable_texts_table_container"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0 }}
                    />
                </Region>
            </Region>
        )
    );
};

/** Row template `furni_option` of WiredMenuViewLayout - pass real rows through its `items…` slot. */
export interface WiredMenuViewLayoutFurniOptionItem2Props {
    layout?: BoxLayout;
    onTypeFurniButton?: () => void;
}

export const WiredMenuViewLayoutFurniOptionItem2 = ({ layout, onTypeFurniButton }: WiredMenuViewLayoutFurniOptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="furni_option"
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
}

export const WiredMenuViewLayoutUserOptionItem2 = ({ layout, onTypeUserButton }: WiredMenuViewLayoutUserOptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="user_option"
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
}

export const WiredMenuViewLayoutGlobalOptionItem2 = ({ layout, onTypeGlobalButton }: WiredMenuViewLayoutGlobalOptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="global_option"
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
}

export const WiredMenuViewLayoutButtons2 = ({ itemsButtons, layout }: WiredMenuViewLayoutButtons2Props) => {
    return (
        <Region
            name="buttons"
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
}

export const WiredMenuViewLayoutTypePickerContainer2 = ({ buttons, captionTitle, layout }: WiredMenuViewLayoutTypePickerContainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="type_picker_container"
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

/** Named region `variable_values_container` of WiredMenuViewLayout - configured through the parent's `variableValuesContainer` prop. */
export interface WiredMenuViewLayoutVariableValuesContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onAddVarBtn?: () => void;
    onCreateVarBtn?: () => void;
    onDeleteVarBtn?: () => void;
    visibleCreateVarBubble?: boolean;
}

export const WiredMenuViewLayoutVariableValuesContainer = ({ captionTitle, layout, onAddVarBtn, onCreateVarBtn, onDeleteVarBtn, visibleCreateVarBubble }: WiredMenuViewLayoutVariableValuesContainerProps) => {
    const t = useTranslation();
    const [ valueInputValue, setValueInputValue ] = useState('');

    return (
        <Region
            name="variable_values_container"
            layout={{ position: 'absolute', left: 183, width: 303, top: 17, height: 351, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTitle ?? t('wiredmenu.inspection.variables')} />
            </Region>
            <Region
                name="variable_values_table_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 34 }}
            />
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
            {(visibleCreateVarBubble ?? false) && (
                <Bubble
                    variant="7"
                    name="create_var_bubble"
                    layout={{ position: 'absolute', left: 122, width: 186, top: 181, height: 145 }}
                >
                    <Region
                        name="variable_setting"
                        layout={{ position: 'absolute', left: 6, right: 22, top: 6, height: 42 }}
                    >
                        <Region layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText text={t('wiredmenu.inspection.select_variable')} />
                        </Region>
                        <Region
                            name="var_picker_container"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 22 }}
                        />
                    </Region>
                    <Region
                        name="value_setting"
                        layout={{ position: 'absolute', left: 6, right: 22, top: 52, height: 42 }}
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
            )}
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
    onPinCheckbox?: () => void;
    srcGlobalPlaceholder?: string;
    srcPreviewImageBitmap?: string;
    visibleGlobalPlaceholder?: boolean;
    visiblePreviewAvatar?: boolean;
    visiblePreviewImageBitmap?: boolean;
    visiblePreviewInstructionFurni?: boolean;
    visiblePreviewInstructionUser?: boolean;
    visiblePreviewPet?: boolean;
}

export const WiredMenuViewLayoutPreviewContainer = ({ captionPreviewInstructionFurni, captionPreviewInstructionUser, captionTitle, layout, onHighlightWiredBtn, onPinCheckbox, srcGlobalPlaceholder, srcPreviewImageBitmap, visibleGlobalPlaceholder, visiblePreviewAvatar, visiblePreviewImageBitmap, visiblePreviewInstructionFurni, visiblePreviewInstructionUser, visiblePreviewPet }: WiredMenuViewLayoutPreviewContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
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
                {(visiblePreviewInstructionFurni ?? false) && (
                    <Region
                        name="preview_instruction_furni"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 104, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionPreviewInstructionFurni ?? t('wiredmenu.inspection.preview_furni_instruction')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                )}
                {(visiblePreviewInstructionUser ?? false) && (
                    <Region
                        name="preview_instruction_user"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 104, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionPreviewInstructionUser ?? t('wiredmenu.inspection.preview_user_instruction')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                )}
                {(visiblePreviewAvatar ?? false) && (
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="preview_avatar"
                        options={{ 'avatar_image:cropped': 'true' }}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 34, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 84 }}
                    />
                )}
                {(visiblePreviewPet ?? false) && (
                    <WidgetSlot
                        widgetType="pet_image"
                        name="preview_pet"
                        layout={{ position: 'absolute', left: 46, right: 46, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 38, overflow: 'hidden' }}
                    />
                )}
                {(visiblePreviewImageBitmap ?? false) && (
                    <ThemeImage
                        name="preview_image_bitmap"
                        src={srcPreviewImageBitmap}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 50, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 50 }}
                    />
                )}
                {(visibleGlobalPlaceholder ?? false) && (
                    <ThemeImage
                        name="global_placeholder"
                        src={srcGlobalPlaceholder ?? layoutImage('wired_global_placeholder.png')}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 120, top: 64, height: 97 }}
                    />
                )}
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
            <Region
                name="pin_option_container"
                layout={{ position: 'absolute', left: 0, width: 197, top: 254, height: 18 }}
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
        </Region>
    );
};

/** Named region `inspection_container` of WiredMenuViewLayout - configured through the parent's `inspectionContainer` prop. */
export interface WiredMenuViewLayoutInspectionContainerProps {
    layout?: BoxLayout;
    onInspectionContainer?: () => void;
    previewContainer?: WiredMenuViewLayoutPreviewContainerProps;
    typePickerContainer?: WiredMenuViewLayoutTypePickerContainer2Props;
    variableValuesContainer?: WiredMenuViewLayoutVariableValuesContainerProps;
    visibleInspectionContainer?: boolean;
}

export const WiredMenuViewLayoutInspectionContainer = ({ layout, onInspectionContainer, previewContainer, typePickerContainer, variableValuesContainer, visibleInspectionContainer }: WiredMenuViewLayoutInspectionContainerProps) => {
    return (
        (visibleInspectionContainer ?? false) && (
            <Region
                name="inspection_container"
                onPointerTap={onInspectionContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
            >
                <WiredMenuViewLayoutTypePickerContainer2 {...typePickerContainer} />
                <WiredMenuViewLayoutVariableValuesContainer {...variableValuesContainer} />
                <WiredMenuViewLayoutPreviewContainer {...previewContainer} />
            </Region>
        )
    );
};

/** Named region `chest_controls_container` of WiredMenuViewLayout - configured through the parent's `chestControlsContainer` prop. */
export interface WiredMenuViewLayoutChestControlsContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onLockAllButton?: () => void;
    onLockOwnButton?: () => void;
    onUnlockOwnButton?: () => void;
}

export const WiredMenuViewLayoutChestControlsContainer = ({ captionTitle, layout, onLockAllButton, onLockOwnButton, onUnlockOwnButton }: WiredMenuViewLayoutChestControlsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chest_controls_container"
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

/** Named region `chests_container` of WiredMenuViewLayout - configured through the parent's `chestsContainer` prop. */
export interface WiredMenuViewLayoutChestsContainerProps {
    captionTitle?: string;
    captionTitleExtra?: string;
    chestControlsContainer?: WiredMenuViewLayoutChestControlsContainerProps;
    layout?: BoxLayout;
    onViewInDetailButton?: () => void;
    visibleChestsContainer?: boolean;
}

export const WiredMenuViewLayoutChestsContainer = ({ captionTitle, captionTitleExtra, chestControlsContainer, layout, onViewInDetailButton, visibleChestsContainer }: WiredMenuViewLayoutChestsContainerProps) => {
    const t = useTranslation();

    return (
        (visibleChestsContainer ?? false) && (
            <Region
                name="chests_container"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
            >
                <WiredMenuViewLayoutChestControlsContainer {...chestControlsContainer} />
                <Region
                    name="logs_container"
                    layout={{ position: 'absolute', left: 14, width: 472, top: 139, height: 228 }}
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
                    <Region
                        name="logs_table_container"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 40 }}
                    />
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
            </Region>
        )
    );
};

/** Named region `modify_settings_container` of WiredMenuViewLayout - configured through the parent's `modifySettingsContainer` prop. */
export interface WiredMenuViewLayoutModifySettingsContainerProps {
    layout?: BoxLayout;
    onModify1Checkbox?: () => void;
    onModify2Checkbox?: () => void;
    onModify3Checkbox?: () => void;
}

export const WiredMenuViewLayoutModifySettingsContainer = ({ layout, onModify1Checkbox, onModify2Checkbox, onModify3Checkbox }: WiredMenuViewLayoutModifySettingsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="modify_settings_container"
            layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 102, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.room_settings.modify_rights')} />
            </Region>
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 20, height: 20 }}
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
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 39, height: 20 }}
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
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 58, height: 20 }}
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
        </Region>
    );
};

/** Named region `read_settings_container` of WiredMenuViewLayout - configured through the parent's `readSettingsContainer` prop. */
export interface WiredMenuViewLayoutReadSettingsContainerProps {
    layout?: BoxLayout;
    onRead0Checkbox?: () => void;
    onRead1Checkbox?: () => void;
    onRead2Checkbox?: () => void;
    onRead3Checkbox?: () => void;
}

export const WiredMenuViewLayoutReadSettingsContainer = ({ layout, onRead0Checkbox, onRead1Checkbox, onRead2Checkbox, onRead3Checkbox }: WiredMenuViewLayoutReadSettingsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="read_settings_container"
            layout={{ position: 'absolute', left: 10, width: 233, top: 8, height: 102, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.room_settings.read_rights')} />
            </Region>
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 20, height: 20 }}
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
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 39, height: 20 }}
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
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 58, height: 20 }}
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
            <Region
                name="option_box"
                layout={{ position: 'absolute', left: 0, width: 214, top: 77, height: 20 }}
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
        </Region>
    );
};

/** Named region `room_settings_container` of WiredMenuViewLayout - configured through the parent's `roomSettingsContainer` prop. */
export interface WiredMenuViewLayoutRoomSettingsContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    modifySettingsContainer?: WiredMenuViewLayoutModifySettingsContainerProps;
    onReloadRoomBtn?: () => void;
    onRollBackBtn?: () => void;
    onTimezonePicker?: () => void;
    readSettingsContainer?: WiredMenuViewLayoutReadSettingsContainerProps;
}

export const WiredMenuViewLayoutRoomSettingsContainer = ({ captionTitle, layout, modifySettingsContainer, onReloadRoomBtn, onRollBackBtn, onTimezonePicker, readSettingsContainer }: WiredMenuViewLayoutRoomSettingsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_settings_container"
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
                <Region
                    name="timezone_container"
                    layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 50 }}
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
            </Border>
            <Border
                variant="3"
                name="room_settings_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 245, right: 0, top: 143, height: 64 }}
            >
                <Region
                    name="timezone_container"
                    layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 50 }}
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
            </Border>
        </Region>
    );
};

/** Named region `preferences_container` of WiredMenuViewLayout - configured through the parent's `preferencesContainer` prop. */
export interface WiredMenuViewLayoutPreferencesContainer2Props {
    layout?: BoxLayout;
    onPreferenceAllNotificationsCheckbox?: () => void;
    onPreferenceInspectButtonCheckbox?: () => void;
    onPreferencePlaytestCheckbox?: () => void;
    onPreferenceToolbarCheckbox?: () => void;
}

export const WiredMenuViewLayoutPreferencesContainer2 = ({ layout, onPreferenceAllNotificationsCheckbox, onPreferenceInspectButtonCheckbox, onPreferencePlaytestCheckbox, onPreferenceToolbarCheckbox }: WiredMenuViewLayoutPreferencesContainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="preferences_container"
            layout={{ position: 'absolute', left: 10, right: 4, top: 8, bottom: 2, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredmenu.settings.preferences.general')} />
            </Region>
            <Region
                name="option_container"
                layout={{ position: 'absolute', left: 0, width: 450, top: 20, height: 20 }}
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
            <Region
                name="option_container"
                layout={{ position: 'absolute', left: 0, width: 450, top: 39, height: 20 }}
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
            <Region
                name="option_container"
                layout={{ position: 'absolute', left: 0, width: 450, top: 58, height: 20 }}
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
            <Region
                name="option_container"
                layout={{ position: 'absolute', left: 0, width: 450, top: 77, height: 20 }}
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
        </Region>
    );
};

/** Named region `preferences_container` of WiredMenuViewLayout - configured through the parent's `preferencesContainer` prop. */
export interface WiredMenuViewLayoutPreferencesContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onWiredStylePicker?: () => void;
    preferencesContainer?: WiredMenuViewLayoutPreferencesContainer2Props;
}

export const WiredMenuViewLayoutPreferencesContainer = ({ captionTitle, layout, onWiredStylePicker, preferencesContainer }: WiredMenuViewLayoutPreferencesContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preferences_container"
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
                <Region
                    name="wored_style_container"
                    layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 50 }}
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
            </Border>
        </Region>
    );
};

/** Named region `settings_container` of WiredMenuViewLayout - configured through the parent's `settingsContainer` prop. */
export interface WiredMenuViewLayoutSettingsContainerProps {
    layout?: BoxLayout;
    preferencesContainer?: WiredMenuViewLayoutPreferencesContainerProps;
    roomSettingsContainer?: WiredMenuViewLayoutRoomSettingsContainerProps;
    visibleSettingsContainer?: boolean;
}

export const WiredMenuViewLayoutSettingsContainer = ({ layout, preferencesContainer, roomSettingsContainer, visibleSettingsContainer }: WiredMenuViewLayoutSettingsContainerProps) => {
    return (
        (visibleSettingsContainer ?? false) && (
            <Region
                name="settings_container"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
            >
                <WiredMenuViewLayoutRoomSettingsContainer {...roomSettingsContainer} />
                <WiredMenuViewLayoutPreferencesContainer {...preferencesContainer} />
            </Region>
        )
    );
};

/** Named region `body_container` of WiredMenuViewLayout - configured through the parent's `bodyContainer` prop. */
export interface WiredMenuViewLayoutBodyContainerProps {
    chestsContainer?: WiredMenuViewLayoutChestsContainerProps;
    inspectionContainer?: WiredMenuViewLayoutInspectionContainerProps;
    layout?: BoxLayout;
    monitorContainer?: WiredMenuViewLayoutMonitorContainerProps;
    onLoadingView?: () => void;
    settingsContainer?: WiredMenuViewLayoutSettingsContainerProps;
    variableOverviewContainer?: WiredMenuViewLayoutVariableOverviewContainerProps;
    visibleChestsContainer?: boolean;
    visibleInfoContainer?: boolean;
    visibleInspectionContainer?: boolean;
    visibleLoadingView?: boolean;
    visibleSettingsContainer?: boolean;
    visibleVariableOverviewContainer?: boolean;
}

export const WiredMenuViewLayoutBodyContainer = ({ chestsContainer, inspectionContainer, layout, monitorContainer, onLoadingView, settingsContainer, variableOverviewContainer, visibleChestsContainer, visibleInfoContainer, visibleInspectionContainer, visibleLoadingView, visibleSettingsContainer, visibleVariableOverviewContainer }: WiredMenuViewLayoutBodyContainerProps) => {
    return (
        <Region
            name="body_container"
            layout={{ position: 'absolute', left: 0, width: 500, top: 82, height: 382, ...layout }}
        >
            <WiredMenuViewLayoutMonitorContainer {...monitorContainer} />
            {(visibleVariableOverviewContainer ?? false) && (
                <WiredMenuViewLayoutVariableOverviewContainer {...variableOverviewContainer} />
            )}
            {(visibleInspectionContainer ?? false) && (
                <WiredMenuViewLayoutInspectionContainer {...inspectionContainer} />
            )}
            {(visibleChestsContainer ?? false) && (
                <WiredMenuViewLayoutChestsContainer {...chestsContainer} />
            )}
            {(visibleSettingsContainer ?? false) && (
                <WiredMenuViewLayoutSettingsContainer {...settingsContainer} />
            )}
            {(visibleInfoContainer ?? false) && (
                <Region
                    name="info_container"
                    layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382 }}
                />
            )}
            {(visibleLoadingView ?? false) && (
                <Region
                    name="loading_view"
                    backgroundColor="#e9e9e1"
                    onPointerTap={onLoadingView}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382 }}
                />
            )}
        </Region>
    );
};
