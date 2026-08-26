import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, CheckBox, ContainerButton, Dropmenu, Frame, Region, ScrollArea, TabButton, TabContext, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1138_wired_menu_view_xml` (layout "wired_menu_view", 500x500) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredMenuViewLayoutProps {
    layout?: BoxLayout;
    onAddVarBtn?: () => void;
    onClearLogBtn?: () => void;
    onClose?: () => void;
    onCreateVarBtn?: () => void;
    onDeleteVarBtn?: () => void;
    onHighlightHoldersButton?: () => void;
    onHighlightWiredBtn?: () => void;
    onLockAllButton?: () => void;
    onLockOwnButton?: () => void;
    onLogOverviewBtn?: () => void;
    onManageButton?: () => void;
    onModify1Checkbox?: () => void;
    onModify2Checkbox?: () => void;
    onModify3Checkbox?: () => void;
    onPinCheckbox?: () => void;
    onPreferenceAllNotificationsCheckbox?: () => void;
    onPreferenceInspectButtonCheckbox?: () => void;
    onPreferencePlaytestCheckbox?: () => void;
    onPreferenceToolbarCheckbox?: () => void;
    onRead0Checkbox?: () => void;
    onRead1Checkbox?: () => void;
    onRead2Checkbox?: () => void;
    onRead3Checkbox?: () => void;
    onReloadRoomBtn?: () => void;
    onRollBackBtn?: () => void;
    onTimezonePicker?: () => void;
    onTopViewChestsButton?: () => void;
    onTopViewInfoButton?: () => void;
    onTopViewInspectionButton?: () => void;
    onTopViewMonitorButton?: () => void;
    onTopViewSettingsButton?: () => void;
    onTopViewVariableOverviewButton?: () => void;
    onTypeContextButton?: () => void;
    onTypeFurniButton?: () => void;
    onTypeFurniButton2?: () => void;
    onTypeGlobalButton?: () => void;
    onTypeGlobalButton2?: () => void;
    onTypeUserButton?: () => void;
    onTypeUserButton2?: () => void;
    onUnlockOwnButton?: () => void;
    onViewInDetailButton?: () => void;
    onWiredStylePicker?: () => void;
}

export const WiredMenuViewLayout = ({ layout, onAddVarBtn, onClearLogBtn, onClose, onCreateVarBtn, onDeleteVarBtn, onHighlightHoldersButton, onHighlightWiredBtn, onLockAllButton, onLockOwnButton, onLogOverviewBtn, onManageButton, onModify1Checkbox, onModify2Checkbox, onModify3Checkbox, onPinCheckbox, onPreferenceAllNotificationsCheckbox, onPreferenceInspectButtonCheckbox, onPreferencePlaytestCheckbox, onPreferenceToolbarCheckbox, onRead0Checkbox, onRead1Checkbox, onRead2Checkbox, onRead3Checkbox, onReloadRoomBtn, onRollBackBtn, onTimezonePicker, onTopViewChestsButton, onTopViewInfoButton, onTopViewInspectionButton, onTopViewMonitorButton, onTopViewSettingsButton, onTopViewVariableOverviewButton, onTypeContextButton, onTypeFurniButton, onTypeFurniButton2, onTypeGlobalButton, onTypeGlobalButton2, onTypeUserButton, onTypeUserButton2, onUnlockOwnButton, onViewInDetailButton, onWiredStylePicker }: WiredMenuViewLayoutProps) => {
    const t = useTranslation();
    const [ valueInputValue, setValueInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="wiredmenu_frame"
            name="wiredmenu_frame"
            params={1073774593}
            caption={t('wiredmenu.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 500, height: 500, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <TabContext
                    variant="3"
                    name="tab_context"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 500, top: 2, height: 30 }}
                >
                    <TabButton
                        variant="3"
                        name="top_view_monitor_button"
                        params={17}
                        onPointerTap={onTopViewMonitorButton}
                        layout={{ position: 'absolute', left: 0, width: 70, top: 0, height: 32 }}
                    >
                        {t('wiredmenu.monitor.tab')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_variable_overview_button"
                        params={17}
                        onPointerTap={onTopViewVariableOverviewButton}
                        layout={{ position: 'absolute', left: 70, width: 74, top: 0, height: 32 }}
                    >
                        {t('wiredmenu.variable_overview.tab')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_inspection_button"
                        params={17}
                        onPointerTap={onTopViewInspectionButton}
                        layout={{ position: 'absolute', left: 144, width: 82, top: 0, height: 32 }}
                    >
                        {t('wiredmenu.inspection.tab')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_chests_button"
                        params={17}
                        onPointerTap={onTopViewChestsButton}
                        layout={{ position: 'absolute', left: 226, width: 109, top: 0, height: 32 }}
                    >
                        {t('wiredmenu.chests.tab')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_settings_button"
                        params={17}
                        onPointerTap={onTopViewSettingsButton}
                        layout={{ position: 'absolute', left: 335, width: 70, top: 0, height: 32 }}
                    >
                        {t('wiredmenu.settings.tab')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="top_view_info_button"
                        params={17}
                        onPointerTap={onTopViewInfoButton}
                        layout={{ position: 'absolute', left: 405, width: 46, top: 0, height: 32 }}
                    >
                        {t('wiredmenu.info.tab')}
                    </TabButton>
                </TabContext>
                <Region
                    name="header_container"
                    params={16}
                    layout={{ position: 'absolute', left: 1, width: 498, top: 32, height: 50 }}
                >
                    <Region
                        name="header_border"
                        params={16}
                        backgroundColor="#486f81"
                        layout={{ position: 'absolute', left: 0, width: 498, top: 0, height: 50 }}
                    >
                        <Region
                            name="header_inner"
                            params={16}
                            backgroundColor="#235061"
                            layout={{ position: 'absolute', left: 2, width: 494, top: 2, height: 46 }}
                        />
                    </Region>
                    <Region
                        name="header_detail"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 50 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('wired_box_lines.png')}
                            layout={{ position: 'absolute', left: 8, width: 64, top: 20, height: 51 }}
                        />
                        <ThemeImage
                            params={16}
                            src={layoutImage('wired_box_lines.png')}
                            layout={{ position: 'absolute', left: 78, width: 64, top: -20, height: 51 }}
                        />
                        <ThemeImage
                            params={16}
                            src={layoutImage('wired_box_lines.png')}
                            layout={{ position: 'absolute', left: 148, width: 64, top: 20, height: 51 }}
                        />
                        <ThemeImage
                            params={16}
                            src={layoutImage('wired_box_lines.png')}
                            layout={{ position: 'absolute', left: 218, width: 64, top: -20, height: 51 }}
                        />
                        <ThemeImage
                            params={16}
                            src={layoutImage('wired_box_lines.png')}
                            layout={{ position: 'absolute', left: 288, width: 64, top: 20, height: 51 }}
                        />
                        <ThemeImage
                            params={16}
                            src={layoutImage('wired_box_lines.png')}
                            layout={{ position: 'absolute', left: 358, width: 64, top: -20, height: 51 }}
                        />
                        <ThemeImage
                            params={16}
                            src={layoutImage('wired_box_lines.png')}
                            layout={{ position: 'absolute', left: 428, width: 64, top: 20, height: 51 }}
                        />
                    </Region>
                    <Region
                        name="header_title"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 500, top: 14, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text="Header Title"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="discord_region"
                        tooltip={t('wiredmenu.discord_region.tooltip')}
                        params={1}
                        dynamicStyle="brightness_and_shadow_under_gentle"
                        layout={{ position: 'absolute', left: 473, width: 22, top: 3, height: 25 }}
                    >
                        <ThemeImage
                            tags={[ '#icon' ]}
                            params={16}
                            src={layoutImage('icon_discord.png')}
                            layout={{ position: 'absolute', left: 0, width: 22, top: 1, height: 23 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="body_container"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 500, top: 82, height: 382 }}
                >
                    <Region
                        name="monitor_container"
                        params={12582928}
                        layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382 }}
                    >
                        <Region
                            name="statistics_container"
                            params={16}
                            layout={{ position: 'absolute', left: 14, width: 215, top: 18, height: 123 }}
                        >
                            <Region
                                name="title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 106, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.monitor.statistics')} />
                            </Region>
                            <Border
                                variant="3"
                                name="statistics_contents"
                                params={16}
                                tintColor="#dadada"
                                layout={{ position: 'absolute', left: 0, width: 204, top: 20, height: 99 }}
                            >
                                <ScrollArea
                                    orientation="vertical"
                                    layout={{ position: 'absolute', left: 5, width: 197, top: 5, height: 89 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
                                    >
                                        <Region
                                            name="statistics_usage_html"
                                            params={1073758352}
                                            layout={{ width: 68, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text="Wired usage:" />
                                        </Region>
                                        <Region
                                            name="statistics_heavy_html"
                                            params={1073758352}
                                            layout={{ width: 48, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text="Is heavy:" />
                                        </Region>
                                        <Region
                                            name="statistics_floorfurni_html"
                                            params={1073758352}
                                            layout={{ width: 60, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text="Floor furni:" />
                                        </Region>
                                        <Region
                                            name="statistics_wallfurni_html"
                                            params={1073758352}
                                            layout={{ width: 57, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text="Wall furni:" />
                                        </Region>
                                        <Region
                                            name="statistics_perm_vars_furni_html"
                                            params={1073758352}
                                            layout={{ width: 114, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text="Permanent furni vars:" />
                                        </Region>
                                        <Region
                                            name="statistics_perm_vars_user_html"
                                            params={1073758352}
                                            layout={{ width: 113, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text="Permanent user vars:" />
                                        </Region>
                                        <Region
                                            name="statistics_perm_vars_global_html"
                                            params={1073758352}
                                            layout={{ width: 122, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text="Permanent global vars:" />
                                        </Region>
                                    </Region>
                                </ScrollArea>
                            </Border>
                        </Region>
                        <Region
                            name="image_container"
                            params={16}
                            layout={{ position: 'absolute', left: 230, width: 256, top: 4, height: 145 }}
                        >
                            <Region
                                visible={false}
                                layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 145 }}
                            >
                                <ThemeImage
                                    name="monitor_image_1"
                                    params={16}
                                    src={layoutImage('wired_monitor_element1.png')}
                                    layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 145 }}
                                />
                            </Region>
                            <ThemeImage
                                name="monitor_image_2"
                                params={17}
                                src={layoutImage('wired_monitor_element2.png')}
                                layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 145 }}
                            />
                        </Region>
                        <Region
                            name="log_container"
                            params={16}
                            layout={{ position: 'absolute', left: 14, width: 472, top: 152, height: 218 }}
                        >
                            <Region
                                name="title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 106, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.monitor.log')} />
                            </Region>
                            <Region
                                name="log_table_container"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 472, top: 20, height: 156 }}
                            />
                            <Button
                                variant="5"
                                name="clear_log_btn"
                                params={131089}
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
                                params={393233}
                                onPointerTap={onLogOverviewBtn}
                                textStyle="text-style-button-shiny-regular"
                                layout={{ position: 'absolute', left: 361, width: 110, top: 185, height: 30, minWidth: 110, maxWidth: 110 }}
                            >
                                {t('wiredmenu.monitor.log_overview')}
                            </Button>
                        </Region>
                    </Region>
                    <Region
                        name="variable_overview_container"
                        params={12582928}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382 }}
                    >
                        <Region
                            name="type_picker_container"
                            params={16}
                            layout={{ position: 'absolute', left: 14, width: 197, top: 18, height: 70 }}
                        >
                            <Region
                                name="title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.variable_overview.type')} />
                            </Region>
                            <Border
                                variant="3"
                                name="type_options"
                                params={16}
                                tintColor="#dadada"
                                layout={{ position: 'absolute', left: 0, width: 188, top: 20, height: 47 }}
                            >
                                <Region
                                    name="buttons"
                                    params={16}
                                    layout={{ position: 'absolute', left: 5, width: 183, top: 5, height: 37, flexDirection: 'row', gap: 10 }}
                                >
                                    <Region
                                        name="furni_option"
                                        params={16}
                                        layout={{ width: 37, height: 37, flexShrink: 0 }}
                                    >
                                        <Button
                                            variant="3"
                                            name="type_furni_button"
                                            tooltip={t('wiredfurni.params.sourcetype.furni')}
                                            params={131089}
                                            onPointerTap={onTypeFurniButton}
                                            textStyle="text-style-button-shiny-regular"
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
                                        />
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('icon_wired_variable_furni_large.png')}
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
                                        />
                                    </Region>
                                    <Region
                                        name="user_option"
                                        params={16}
                                        layout={{ width: 37, height: 37, flexShrink: 0 }}
                                    >
                                        <Button
                                            variant="3"
                                            name="type_user_button"
                                            tooltip={t('wiredfurni.params.sourcetype.users')}
                                            params={131089}
                                            onPointerTap={onTypeUserButton}
                                            textStyle="text-style-button-shiny-regular"
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
                                        />
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('icon_wired_variable_user_large.png')}
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
                                        />
                                    </Region>
                                    <Region
                                        name="global_option"
                                        params={16}
                                        layout={{ width: 37, height: 37, flexShrink: 0 }}
                                    >
                                        <Button
                                            variant="3"
                                            name="type_global_button"
                                            tooltip={t('wiredfurni.params.sourcetype.global')}
                                            params={131089}
                                            onPointerTap={onTypeGlobalButton}
                                            textStyle="text-style-button-shiny-regular"
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
                                        />
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('icon_wired_variable_global_large.png')}
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
                                        />
                                    </Region>
                                    <Region
                                        name="context_option"
                                        params={16}
                                        layout={{ width: 37, height: 37, flexShrink: 0 }}
                                    >
                                        <Button
                                            variant="3"
                                            name="type_context_button"
                                            tooltip={t('wiredfurni.params.sourcetype.context')}
                                            params={131089}
                                            onPointerTap={onTypeContextButton}
                                            textStyle="text-style-button-shiny-regular"
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
                                        />
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('icon_wired_variable_context_large.png')}
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
                                        />
                                    </Region>
                                </Region>
                            </Border>
                        </Region>
                        <Region
                            name="variable_picker_container"
                            params={144}
                            layout={{ position: 'absolute', left: 14, width: 188, top: 94, height: 239 }}
                        >
                            <Region
                                name="title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.variable_overview.picker')} />
                            </Region>
                            <Region
                                name="variable_list_container"
                                params={2192}
                                layout={{ position: 'absolute', left: 0, width: 188, top: 20, height: 219 }}
                            />
                        </Region>
                        <Region
                            name="button_row"
                            params={16}
                            layout={{ position: 'absolute', left: 14, width: 188, top: 342, height: 25, minWidth: 188, maxWidth: 188, flexDirection: 'row', gap: 10 }}
                        >
                            <Button
                                variant="3"
                                name="highlight_holders_button"
                                tooltip={t('wiredmenu.variable_overview.highlight_holders.tooltip')}
                                params={131089}
                                onPointerTap={onHighlightHoldersButton}
                                textStyle="text-style-button-shiny-regular"
                                layout={{ width: 89, height: 25, flexShrink: 0, minWidth: 89, maxWidth: 89 }}
                            >
                                {t('wiredmenu.variable_overview.highlight_holders')}
                            </Button>
                            <Button
                                variant="3"
                                name="manage_button"
                                tooltip={t('wiredmenu.variable_overview.manage.tooltip')}
                                params={131089}
                                onPointerTap={onManageButton}
                                textStyle="text-style-button-shiny-regular"
                                layout={{ width: 89, height: 25, flexShrink: 0, minWidth: 89, maxWidth: 89 }}
                            >
                                {t('wiredmenu.variable_overview.manage')}
                            </Button>
                        </Region>
                        <Region
                            name="variable_properties_container"
                            params={16}
                            layout={{ position: 'absolute', left: 230, width: 256, top: 17, height: 208 }}
                        >
                            <Region
                                name="title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.variable_overview.properties')} />
                            </Region>
                            <Region
                                name="variable_properties_table_container"
                                params={2192}
                                layout={{ position: 'absolute', left: 0, width: 256, top: 20, height: 188 }}
                            />
                        </Region>
                        <Region
                            name="variable_texts_container"
                            params={16}
                            layout={{ position: 'absolute', left: 230, width: 256, top: 233, height: 135 }}
                        >
                            <Region
                                name="title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.variable_overview.text_values')} />
                            </Region>
                            <Region
                                name="variable_texts_table_container"
                                params={2192}
                                layout={{ position: 'absolute', left: 0, width: 256, top: 20, height: 115 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="inspection_container"
                        params={12582929}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382 }}
                    >
                        <Region
                            name="type_picker_container"
                            params={16}
                            layout={{ position: 'absolute', left: 14, width: 150, top: 18, height: 70 }}
                        >
                            <Region
                                name="title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.inspection.type')} />
                            </Region>
                            <Border
                                variant="3"
                                name="type_options"
                                params={16}
                                tintColor="#dadada"
                                layout={{ position: 'absolute', left: 0, width: 141, top: 20, height: 47 }}
                            >
                                <Region
                                    name="buttons"
                                    params={16}
                                    layout={{ position: 'absolute', left: 5, width: 131, top: 5, height: 37, flexDirection: 'row', gap: 10 }}
                                >
                                    <Region
                                        name="furni_option"
                                        params={16}
                                        layout={{ width: 37, height: 37, flexShrink: 0 }}
                                    >
                                        <Button
                                            variant="3"
                                            name="type_furni_button"
                                            tooltip={t('wiredfurni.params.sourcetype.furni')}
                                            params={131089}
                                            onPointerTap={onTypeFurniButton2}
                                            textStyle="text-style-button-shiny-regular"
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
                                        />
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('icon_wired_variable_furni_large.png')}
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
                                        />
                                    </Region>
                                    <Region
                                        name="user_option"
                                        params={16}
                                        layout={{ width: 37, height: 37, flexShrink: 0 }}
                                    >
                                        <Button
                                            variant="3"
                                            name="type_user_button"
                                            tooltip={t('wiredfurni.params.sourcetype.users')}
                                            params={131089}
                                            onPointerTap={onTypeUserButton2}
                                            textStyle="text-style-button-shiny-regular"
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
                                        />
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('icon_wired_variable_user_large.png')}
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
                                        />
                                    </Region>
                                    <Region
                                        name="global_option"
                                        params={16}
                                        layout={{ width: 37, height: 37, flexShrink: 0 }}
                                    >
                                        <Button
                                            variant="3"
                                            name="type_global_button"
                                            tooltip={t('wiredfurni.params.sourcetype.global')}
                                            params={131089}
                                            onPointerTap={onTypeGlobalButton2}
                                            textStyle="text-style-button-shiny-regular"
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 36 }}
                                        />
                                        <ThemeImage
                                            params={16}
                                            src={layoutImage('icon_wired_variable_global_large.png')}
                                            layout={{ position: 'absolute', left: 0, width: 37, top: 0, height: 37 }}
                                        />
                                    </Region>
                                </Region>
                            </Border>
                        </Region>
                        <Region
                            name="variable_values_container"
                            params={16}
                            layout={{ position: 'absolute', left: 183, width: 303, top: 17, height: 351 }}
                        >
                            <Region
                                name="title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.inspection.variables')} />
                            </Region>
                            <Region
                                name="variable_values_table_container"
                                params={2192}
                                layout={{ position: 'absolute', left: 0, width: 303, top: 20, height: 297 }}
                            />
                            <Region
                                params={1168}
                                layout={{ position: 'absolute', left: 0, width: 303, top: 326, height: 30, flexDirection: 'row', gap: 13 }}
                            >
                                <Button
                                    variant="3"
                                    name="delete_var_btn"
                                    params={131089}
                                    onPointerTap={onDeleteVarBtn}
                                    textStyle="text-style-button-shiny-regular"
                                    layout={{ width: 145, height: 25, flexShrink: 0, minWidth: 145, maxWidth: 145 }}
                                >
                                    {t('wiredmenu.inspection.delete')}
                                </Button>
                                <Button
                                    variant="3"
                                    name="add_var_btn"
                                    params={131089}
                                    onPointerTap={onAddVarBtn}
                                    textStyle="text-style-button-shiny-regular"
                                    layout={{ width: 145, height: 25, flexShrink: 0, minWidth: 145, maxWidth: 145 }}
                                >
                                    {t('wiredmenu.inspection.add')}
                                </Button>
                            </Region>
                            <Region
                                visible={false}
                                layout={{ position: 'absolute', left: 122, width: 186, top: 181, height: 145 }}
                            >
                                <Bubble
                                    variant="7"
                                    name="create_var_bubble"
                                    params={1}
                                    layout={{ width: '100%', height: '100%' }}
                                >
                                    <Region
                                        name="variable_setting"
                                        params={144}
                                        layout={{ position: 'absolute', left: 6, width: 158, top: 6, height: 42 }}
                                    >
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text={t('wiredmenu.inspection.select_variable')} />
                                        </Region>
                                        <Region
                                            name="var_picker_container"
                                            params={144}
                                            layout={{ position: 'absolute', left: 0, width: 158, top: 20, height: 22 }}
                                        />
                                    </Region>
                                    <Region
                                        name="value_setting"
                                        params={144}
                                        layout={{ position: 'absolute', left: 6, width: 158, top: 52, height: 42 }}
                                    >
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text={t('wiredmenu.inspection.select_value')} />
                                        </Region>
                                        <Border
                                            variant="4"
                                            name="value_input_border"
                                            params={16}
                                            layout={{ position: 'absolute', left: 0, width: 80, top: 20, height: 22 }}
                                        >
                                            <TextInput
                                                value={valueInputValue}
                                                onChange={setValueInputValue}
                                                layout={{ position: 'absolute', left: 5, width: 71, top: 3, height: 17 }}
                                            />
                                        </Border>
                                    </Region>
                                    <Button
                                        variant="3"
                                        name="create_var_btn"
                                        params={132241}
                                        onPointerTap={onCreateVarBtn}
                                        textStyle="text-style-button-shiny-regular"
                                        layout={{ position: 'absolute', left: 6, width: 158, top: 100, height: 25, minWidth: 158, maxWidth: 158 }}
                                    >
                                        {t('wiredmenu.inspection.create')}
                                    </Button>
                                </Bubble>
                            </Region>
                        </Region>
                        <Region
                            name="preview_container"
                            params={16}
                            layout={{ position: 'absolute', left: 14, width: 150, top: 94, height: 274 }}
                        >
                            <Region
                                name="title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.inspection.preview')} />
                            </Region>
                            <Border
                                variant="3"
                                name="preview_border"
                                params={144}
                                tintColor="#dadada"
                                layout={{ position: 'absolute', left: 0, width: 141, top: 20, height: 225 }}
                            >
                                <Region
                                    name="preview_instruction_furni"
                                    params={144}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 0, width: 141, top: 104, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('wiredmenu.inspection.preview_furni_instruction')}
                                        textOptions={{ align: 'center' }}
                                    />
                                </Region>
                                <Region
                                    name="preview_instruction_user"
                                    params={144}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 0, width: 141, top: 104, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ThemeText
                                        text={t('wiredmenu.inspection.preview_user_instruction')}
                                        textOptions={{ align: 'center' }}
                                    />
                                </Region>
                                <WidgetSlot
                                    widgetType="avatar_image"
                                    name="preview_avatar"
                                    params={3932368}
                                    visible={false}
                                    options={{ 'avatar_image:cropped': 'true' }}
                                    layout={{ position: 'absolute', left: 53, width: 34, top: 70, height: 84 }}
                                />
                                <WidgetSlot
                                    widgetType="pet_image"
                                    name="preview_pet"
                                    params={1077674128}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 46, width: 49, top: 93, height: 38 }}
                                />
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 45, width: 50, top: 87, height: 50 }}
                                >
                                    <ThemeImage
                                        name="preview_image_bitmap"
                                        params={3932368}
                                        src={undefined}
                                        layout={{ position: 'absolute', left: 45, width: 50, top: 87, height: 50 }}
                                    />
                                </Region>
                                <Region
                                    visible={false}
                                    layout={{ position: 'absolute', left: 10, width: 120, top: 64, height: 97 }}
                                >
                                    <ThemeImage
                                        name="global_placeholder"
                                        params={208}
                                        src={layoutImage('wired_global_placeholder.png')}
                                        layout={{ position: 'absolute', left: 10, width: 120, top: 64, height: 97 }}
                                    />
                                </Region>
                                <ContainerButton
                                    variant="7"
                                    name="highlight_wired_btn"
                                    tooltip={t('wiredmenu.inspection.highlight_wireds')}
                                    params={81}
                                    onPointerTap={onHighlightWiredBtn}
                                    layout={{ position: 'absolute', left: 110, width: 25, top: 6, height: 26 }}
                                >
                                    <ThemeImage
                                        params={16}
                                        src="${image.library.url}catalogue/icon_80.png"
                                        layout={{ position: 'absolute', left: 4, width: 16, top: 6, height: 14 }}
                                    />
                                </ContainerButton>
                            </Border>
                            <Region
                                name="pin_option_container"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 197, top: 254, height: 18 }}
                            >
                                <CheckBox
                                    variant="3"
                                    name="pin_checkbox"
                                    params={17}
                                    onPointerTap={onPinCheckbox}
                                    layout={{ position: 'absolute', left: 0, width: 17, top: 1, height: 17 }}
                                />
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 20, width: 82, top: 0, height: 17, minHeight: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('wiredmenu.inspection.pin')} />
                                </Region>
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="chests_container"
                        params={12582928}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382 }}
                    >
                        <Region
                            name="chest_controls_container"
                            params={16}
                            layout={{ position: 'absolute', left: 14, width: 472, top: 18, height: 110 }}
                        >
                            <Region
                                name="title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 84, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.chests.chest_control')} />
                            </Region>
                            <Border
                                variant="3"
                                name="preferences_border"
                                params={2192}
                                tintColor="#dadada"
                                layout={{ position: 'absolute', left: 0, width: 472, top: 20, height: 90 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 10, width: 452, top: 10, height: 30, flexDirection: 'row', gap: 10 }}
                                >
                                    <Button
                                        variant="3"
                                        name="lock_own_button"
                                        params={131089}
                                        onPointerTap={onLockOwnButton}
                                        textStyle="text-style-button-shiny-regular"
                                        layout={{ width: 221, height: 30, flexShrink: 0, minWidth: 221, maxWidth: 221 }}
                                    >
                                        {t('wiredmenu.chests.chest_control.lock_own')}
                                    </Button>
                                    <Button
                                        variant="3"
                                        name="unlock_own_button"
                                        params={131089}
                                        onPointerTap={onUnlockOwnButton}
                                        textStyle="text-style-button-shiny-regular"
                                        layout={{ width: 221, height: 30, flexShrink: 0, minWidth: 221, maxWidth: 221 }}
                                    >
                                        {t('wiredmenu.chests.chest_control.unlock_own')}
                                    </Button>
                                </Region>
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 10, width: 221, top: 50, height: 30, flexDirection: 'row' }}
                                >
                                    <Button
                                        variant="3"
                                        name="lock_all_button"
                                        params={131089}
                                        onPointerTap={onLockAllButton}
                                        textStyle="text-style-button-shiny-regular"
                                        layout={{ width: 221, height: 30, flexShrink: 0, minWidth: 221, maxWidth: 221 }}
                                    >
                                        {t('wiredmenu.chests.chest_control.lock_all')}
                                    </Button>
                                </Region>
                            </Border>
                        </Region>
                        <Region
                            name="logs_container"
                            params={16}
                            layout={{ position: 'absolute', left: 14, width: 472, top: 139, height: 228 }}
                        >
                            <Region
                                name="title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 136, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.chests.room_logs')} />
                            </Region>
                            <Region
                                name="title_extra"
                                params={262160}
                                layout={{ position: 'absolute', left: 272, width: 197, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.chests.room_logs.extra')} />
                            </Region>
                            <Region
                                name="logs_table_container"
                                params={2192}
                                layout={{ position: 'absolute', left: 0, width: 472, top: 20, height: 168 }}
                            />
                            <Button
                                variant="3"
                                name="view_in_detail_button"
                                params={131089}
                                onPointerTap={onViewInDetailButton}
                                textStyle="text-style-button-shiny-regular"
                                layout={{ position: 'absolute', left: 0, width: 114, top: 197, height: 30 }}
                            >
                                {t('wiredmenu.chests.room_logs.view_detail')}
                            </Button>
                        </Region>
                    </Region>
                    <Region
                        name="settings_container"
                        params={12582928}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382 }}
                    >
                        <Region
                            name="room_settings_container"
                            params={16}
                            layout={{ position: 'absolute', left: 14, width: 472, top: 18, height: 220 }}
                        >
                            <Region
                                name="title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="${wiredmenu.settings.room_settings)" />
                            </Region>
                            <Border
                                variant="3"
                                name="room_settings_border"
                                params={144}
                                tintColor="#dadada"
                                layout={{ position: 'absolute', left: 0, width: 227, top: 20, height: 111 }}
                            >
                                <Region
                                    name="modify_settings_container"
                                    params={16}
                                    layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 102 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('wiredmenu.settings.room_settings.modify_rights')} />
                                    </Region>
                                    <Region
                                        name="option_box"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 214, top: 20, height: 20 }}
                                    >
                                        <CheckBox
                                            variant="3"
                                            name="modify_1_checkbox"
                                            params={17}
                                            onPointerTap={onModify1Checkbox}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                                        />
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text={t('wiredmenu.settings.permission_level.1')} />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="option_box"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 214, top: 39, height: 20 }}
                                    >
                                        <CheckBox
                                            variant="3"
                                            name="modify_2_checkbox"
                                            params={17}
                                            onPointerTap={onModify2Checkbox}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                                        />
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text={t('wiredmenu.settings.permission_level.2')} />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="option_box"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 214, top: 58, height: 20 }}
                                    >
                                        <CheckBox
                                            variant="3"
                                            name="modify_3_checkbox"
                                            params={17}
                                            onPointerTap={onModify3Checkbox}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                                        />
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text={t('wiredmenu.settings.permission_level.3')} />
                                        </Region>
                                    </Region>
                                </Region>
                            </Border>
                            <Border
                                variant="3"
                                name="room_settings_border"
                                params={144}
                                tintColor="#dadada"
                                layout={{ position: 'absolute', left: 245, width: 227, top: 20, height: 111 }}
                            >
                                <Region
                                    name="read_settings_container"
                                    params={16}
                                    layout={{ position: 'absolute', left: 10, width: 233, top: 8, height: 102 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('wiredmenu.settings.room_settings.read_rights')} />
                                    </Region>
                                    <Region
                                        name="option_box"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 214, top: 20, height: 20 }}
                                    >
                                        <CheckBox
                                            variant="3"
                                            name="read_0_checkbox"
                                            params={17}
                                            onPointerTap={onRead0Checkbox}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                                        />
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text={t('wiredmenu.settings.permission_level.0')} />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="option_box"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 214, top: 39, height: 20 }}
                                    >
                                        <CheckBox
                                            variant="3"
                                            name="read_1_checkbox"
                                            params={17}
                                            onPointerTap={onRead1Checkbox}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                                        />
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text={t('wiredmenu.settings.permission_level.1')} />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="option_box"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 214, top: 58, height: 20 }}
                                    >
                                        <CheckBox
                                            variant="3"
                                            name="read_2_checkbox"
                                            params={17}
                                            onPointerTap={onRead2Checkbox}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                                        />
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text={t('wiredmenu.settings.permission_level.2')} />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="option_box"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 214, top: 77, height: 20 }}
                                    >
                                        <CheckBox
                                            variant="3"
                                            name="read_3_checkbox"
                                            params={17}
                                            onPointerTap={onRead3Checkbox}
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 1, height: 20 }}
                                        />
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 20, width: 210, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text={t('wiredmenu.settings.permission_level.3')} />
                                        </Region>
                                    </Region>
                                </Region>
                            </Border>
                            <Border
                                variant="3"
                                name="room_settings_border"
                                params={144}
                                tintColor="#dadada"
                                layout={{ position: 'absolute', left: 0, width: 227, top: 143, height: 64 }}
                            >
                                <Region
                                    name="timezone_container"
                                    params={16}
                                    layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 50 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('wiredmenu.settings.room_settings.timezone')} />
                                    </Region>
                                    <Dropmenu
                                        variant="3"
                                        name="timezone_picker"
                                        params={17}
                                        onPointerTap={onTimezonePicker}
                                        layout={{ position: 'absolute', left: 0, width: 206, top: 21, height: 25 }}
                                    />
                                </Region>
                            </Border>
                            <Border
                                variant="3"
                                name="room_settings_border"
                                params={144}
                                tintColor="#dadada"
                                layout={{ position: 'absolute', left: 245, width: 227, top: 143, height: 64 }}
                            >
                                <Region
                                    name="timezone_container"
                                    params={16}
                                    layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 50 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('wiredmenu.settings.room_settings.room_state')} />
                                    </Region>
                                    <Button
                                        variant="3"
                                        name="reload_room_btn"
                                        params={131089}
                                        onPointerTap={onReloadRoomBtn}
                                        textStyle="text-style-button-shiny-regular"
                                        layout={{ position: 'absolute', left: 0, width: 98, top: 21, height: 28, minWidth: 98, maxWidth: 98 }}
                                    >
                                        {t('wiredmenu.settings.room_state.reload')}
                                    </Button>
                                    <Button
                                        variant="5"
                                        name="roll_back_btn"
                                        params={131089}
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
                        <Region
                            name="preferences_container"
                            params={16}
                            layout={{ position: 'absolute', left: 14, width: 472, top: 237, height: 131 }}
                        >
                            <Region
                                name="title"
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 208, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredmenu.settings.preferences')} />
                            </Region>
                            <Border
                                variant="3"
                                name="preferences_border"
                                params={2192}
                                tintColor="#dadada"
                                layout={{ position: 'absolute', left: 0, width: 227, top: 20, height: 111 }}
                            >
                                <Region
                                    name="preferences_container"
                                    params={2192}
                                    layout={{ position: 'absolute', left: 10, width: 213, top: 8, height: 101 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('wiredmenu.settings.preferences.general')} />
                                    </Region>
                                    <Region
                                        name="option_container"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 450, top: 20, height: 20 }}
                                    >
                                        <CheckBox
                                            variant="3"
                                            name="preference_toolbar_checkbox"
                                            params={17}
                                            onPointerTap={onPreferenceToolbarCheckbox}
                                            layout={{ position: 'absolute', left: 0, width: 19, top: 1, height: 18 }}
                                        />
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 20, width: 390, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text={t('wiredmenu.settings.preferences.toolbar')} />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="option_container"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 450, top: 39, height: 20 }}
                                    >
                                        <CheckBox
                                            variant="3"
                                            name="preference_inspect_button_checkbox"
                                            params={17}
                                            onPointerTap={onPreferenceInspectButtonCheckbox}
                                            layout={{ position: 'absolute', left: 0, width: 19, top: 1, height: 18 }}
                                        />
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 20, width: 390, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text={t('wiredmenu.settings.preferences.inspect_button')} />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="option_container"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 450, top: 58, height: 20 }}
                                    >
                                        <CheckBox
                                            variant="3"
                                            name="preference_playtest_checkbox"
                                            params={17}
                                            onPointerTap={onPreferencePlaytestCheckbox}
                                            layout={{ position: 'absolute', left: 0, width: 19, top: 1, height: 18 }}
                                        />
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 20, width: 430, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text={t('wiredmenu.settings.preferences.playtest')} />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="option_container"
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 450, top: 77, height: 20 }}
                                    >
                                        <CheckBox
                                            variant="3"
                                            name="preference_all_notifications_checkbox"
                                            params={17}
                                            onPointerTap={onPreferenceAllNotificationsCheckbox}
                                            layout={{ position: 'absolute', left: 0, width: 19, top: 1, height: 18 }}
                                        />
                                        <Region
                                            params={16}
                                            layout={{ position: 'absolute', left: 20, width: 430, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text={t('wiredmenu.settings.preferences.show_all_errors')} />
                                        </Region>
                                    </Region>
                                </Region>
                            </Border>
                            <Border
                                variant="3"
                                name="wired_style_border"
                                params={144}
                                tintColor="#dadada"
                                layout={{ position: 'absolute', left: 245, width: 227, top: 20, height: 64 }}
                            >
                                <Region
                                    name="wored_style_container"
                                    params={16}
                                    layout={{ position: 'absolute', left: 10, width: 212, top: 8, height: 50 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ position: 'absolute', left: 0, width: 205, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('wiredmenu.settings.preferences.wired_style')} />
                                    </Region>
                                    <Dropmenu
                                        variant="3"
                                        name="wired_style_picker"
                                        params={17}
                                        onPointerTap={onWiredStylePicker}
                                        layout={{ position: 'absolute', left: 0, width: 206, top: 21, height: 25 }}
                                    />
                                </Region>
                            </Border>
                        </Region>
                    </Region>
                    <Region
                        name="info_container"
                        params={12582928}
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382 }}
                    />
                    <Region
                        name="loading_view"
                        params={12582937}
                        visible={false}
                        backgroundColor="#e9e9e1"
                        layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
