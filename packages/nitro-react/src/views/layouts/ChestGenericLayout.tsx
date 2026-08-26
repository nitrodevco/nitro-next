import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, CheckBox, ContainerButton, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1142_chest_generic_xml` (layout "chest_generic", 460x463) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChestGenericLayoutProps {
    layout?: BoxLayout;
    onAutoLockChestCbx?: () => void;
    onClose?: () => void;
    onLockChestCbx?: () => void;
    onNotificationSettingsButton?: () => void;
    onSettingsButton?: () => void;
    onStartDepositBtn?: () => void;
    onUpgradeCapacityBtn?: () => void;
    onViewLogsBtn?: () => void;
    onWithdrawAllBtn?: () => void;
}

export const ChestGenericLayout = ({ layout, onAutoLockChestCbx, onClose, onLockChestCbx, onNotificationSettingsButton, onSettingsButton, onStartDepositBtn, onUpgradeCapacityBtn, onViewLogsBtn, onWithdrawAllBtn }: ChestGenericLayoutProps) => {
    const t = useTranslation();
    const [ capacityInputValue, setCapacityInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            params={98337}
            caption={t('wiredchests.furni_chest')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 460, height: 463, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="main_list"
                    params={144}
                    layout={{ position: 'absolute', left: 0, width: 460, top: 0, height: 428, flexDirection: 'column' }}
                >
                    <Region
                        name="header"
                        params={144}
                        layout={{ width: 460, height: 51, flexShrink: 0 }}
                    >
                        <Region
                            name="layout_1"
                            params={2192}
                            backgroundColor="#dadada"
                            layout={{ position: 'absolute', left: 1, width: 458, top: 0, height: 51 }}
                        />
                        <Region
                            name="splitter"
                            params={1168}
                            backgroundColor="#c0c0c0"
                            layout={{ position: 'absolute', left: 1, width: 458, top: 50, height: 1 }}
                        />
                        <Region
                            name="desc"
                            params={8388752}
                            layout={{ position: 'absolute', left: 10, width: 380, top: 10, height: 30, minHeight: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text=" A cozy chest waiting to be filled with all sorts of treasures!"
                                textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                            />
                        </Region>
                        <Region
                            name="warning_text"
                            params={2185}
                            visible={false}
                            layout={{ position: 'absolute', left: 10, width: 406, top: 10, height: 47, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        />
                        <ContainerButton
                            variant="7"
                            name="notification_settings_button"
                            tooltip={t('tooltip.notification_settings')}
                            params={65}
                            dynamicStyle="button"
                            onPointerTap={onNotificationSettingsButton}
                            layout={{ position: 'absolute', left: 397, width: 24, top: 7, height: 24 }}
                        >
                            <ThemeImage
                                tags={[ '#icon' ]}
                                params={16}
                                src={layoutImage('wired_chests_bell_icon.png')}
                                layout={{ position: 'absolute', left: 6, width: 12, top: 4, height: 15 }}
                            />
                        </ContainerButton>
                        <ContainerButton
                            variant="7"
                            name="settings_button"
                            tooltip={t('tooltip.settings')}
                            params={65}
                            dynamicStyle="button"
                            onPointerTap={onSettingsButton}
                            layout={{ position: 'absolute', left: 426, width: 24, top: 7, height: 24 }}
                        >
                            <ThemeImage
                                tags={[ '#icon' ]}
                                params={16}
                                src={layoutImage('wired_chests_gear_icon.png')}
                                layout={{ position: 'absolute', left: 5, width: 14, top: 5, height: 14 }}
                            />
                        </ContainerButton>
                    </Region>
                    <Region
                        name="chest_contents"
                        params={144}
                        layout={{ width: 458, height: 254, flexShrink: 0 }}
                    />
                    <Region
                        name="footer"
                        params={144}
                        layout={{ width: 460, height: 123, flexShrink: 0 }}
                    >
                        <Region
                            name="layout_1"
                            params={2192}
                            backgroundColor="#dadada"
                            layout={{ position: 'absolute', left: 1, width: 458, top: 0, height: 110 }}
                        />
                        <Border
                            variant="2"
                            name="layout_2"
                            params={1168}
                            tintColor="#dadada"
                            layout={{ position: 'absolute', left: 1, width: 458, top: 87, height: 36 }}
                        />
                        <Region
                            name="splitter"
                            params={144}
                            backgroundColor="#c0c0c0"
                            layout={{ position: 'absolute', left: 1, width: 458, top: 0, height: 1 }}
                        />
                        <Region
                            name="lock_info_button"
                            params={81}
                            layout={{ position: 'absolute', left: 423, width: 18, top: 6, height: 18 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('icons_info_grey.png')}
                                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                            />
                        </Region>
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 440, width: 385, top: -245, height: 536 }}
                        >
                            <Bubble
                                variant="7"
                                name="lock_info_bubble"
                                params={1}
                                pointer="left"
                                layout={{ width: '100%', height: '100%' }}
                            >
                                <Region
                                    name="lock_info_bubble_texts"
                                    params={8388752}
                                    layout={{ position: 'absolute', left: 8, width: 353, top: 8, height: 504, flexDirection: 'column', gap: 1 }}
                                >
                                    <Region
                                        name="title"
                                        params={16}
                                        layout={{ width: 105, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.lock_info.title')}
                                            textStyle="text-style-u-bold"
                                        />
                                    </Region>
                                    <Region
                                        name="spacerr"
                                        params={16}
                                        layout={{ width: 30, height: 7, flexShrink: 0 }}
                                    />
                                    <Region
                                        params={16}
                                        layout={{ width: 353, height: 17, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.lock_info.desc')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                                        />
                                    </Region>
                                    <Region
                                        name="rule1"
                                        params={129}
                                        layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.lock_info.rule_1')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                                        />
                                    </Region>
                                    <Region
                                        name="rule2"
                                        params={129}
                                        layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.lock_info.rule_2')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                                        />
                                    </Region>
                                    <Region
                                        name="rule3"
                                        params={129}
                                        layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.lock_info.rule_3')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                                        />
                                    </Region>
                                    <Region
                                        name="rule4"
                                        params={129}
                                        layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.lock_info.rule_4')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                                        />
                                    </Region>
                                    <Region
                                        name="rule5"
                                        params={129}
                                        layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.lock_info.rule_5')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                                        />
                                    </Region>
                                    <Region
                                        name="rule6"
                                        params={129}
                                        layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.lock_info.rule_6')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                                        />
                                    </Region>
                                    <Region
                                        name="rule7"
                                        params={129}
                                        layout={{ width: 353, height: 17, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.lock_info.rule_7')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                                        />
                                    </Region>
                                    <Region
                                        name="spacerr"
                                        params={16}
                                        layout={{ width: 30, height: 14, flexShrink: 0 }}
                                    />
                                    <Region
                                        name="ctitle"
                                        params={16}
                                        layout={{ width: 100, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.capacity_info.title')}
                                            textStyle="text-style-u-bold"
                                        />
                                    </Region>
                                    <Region
                                        name="spacerr"
                                        params={16}
                                        layout={{ width: 30, height: 7, flexShrink: 0 }}
                                    />
                                    <Region
                                        params={16}
                                        layout={{ width: 353, height: 17, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.capacity_info.desc')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                                        />
                                    </Region>
                                    <Region
                                        name="crule1"
                                        params={129}
                                        layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.capacity_info.rule_1')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                                        />
                                    </Region>
                                    <Region
                                        name="crule2"
                                        params={129}
                                        layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.capacity_info.rule_2')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                                        />
                                    </Region>
                                    <Region
                                        name="crule3"
                                        params={129}
                                        layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.capacity_info.rule_3')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                                        />
                                    </Region>
                                    <Region
                                        name="crule4"
                                        params={129}
                                        layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('wiredchests.capacity_info.rule_4')}
                                            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                                        />
                                    </Region>
                                </Region>
                            </Bubble>
                        </Region>
                        <Region
                            name="footer_options"
                            params={8388752}
                            layout={{ position: 'absolute', left: 17, width: 443, top: 7, height: 75, flexDirection: 'column', gap: 4 }}
                        >
                            <Region
                                name="locking_options"
                                params={144}
                                layout={{ width: 443, height: 41, flexShrink: 0, flexDirection: 'column', gap: 4 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ width: 106, height: 16, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                                >
                                    <CheckBox
                                        variant="3"
                                        name="lock_chest_cbx"
                                        params={17}
                                        onPointerTap={onLockChestCbx}
                                        layout={{ width: 15, height: 15, flexShrink: 0 }}
                                    />
                                    <Region
                                        params={16}
                                        layout={{ width: 86, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('wiredchests.lock_chest')} />
                                    </Region>
                                </Region>
                                <Region
                                    params={16}
                                    layout={{ width: 286, height: 16, flexShrink: 0, flexDirection: 'row', gap: 5 }}
                                >
                                    <CheckBox
                                        variant="3"
                                        name="auto_lock_chest_cbx"
                                        params={17}
                                        onPointerTap={onAutoLockChestCbx}
                                        layout={{ width: 15, height: 15, flexShrink: 0 }}
                                    />
                                    <Region
                                        params={16}
                                        layout={{ width: 266, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('wiredchests.auto_lock_chest')} />
                                    </Region>
                                </Region>
                                <Region
                                    name="splitter"
                                    params={144}
                                    backgroundColor="#b0b0b0"
                                    layout={{ width: 429, height: 1, flexShrink: 0 }}
                                />
                            </Region>
                            <Region
                                name="capacity_options"
                                params={144}
                                layout={{ width: 443, height: 30, flexShrink: 0 }}
                            >
                                <Region
                                    name="item_count_text"
                                    params={16}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 0, width: 184, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('wiredchests.space_used')} />
                                </Region>
                                <Region
                                    name="capacity_override_container"
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 156, top: 2, height: 22, flexDirection: 'row', gap: 6 }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ width: 85, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('wiredchests.capacity')} />
                                    </Region>
                                    <Border
                                        variant="4"
                                        name="capacity_input_border"
                                        params={16}
                                        layout={{ width: 65, height: 22, flexShrink: 0 }}
                                    >
                                        <TextInput
                                            value={capacityInputValue}
                                            onChange={setCapacityInputValue}
                                            layout={{ position: 'absolute', left: 5, width: 55, top: 3, height: 17 }}
                                        />
                                    </Border>
                                </Region>
                                <Region
                                    name="upgrade_capacity_container"
                                    params={262224}
                                    layout={{ position: 'absolute', left: 227, width: 200, top: 0, height: 25, flexDirection: 'row', gap: 6 }}
                                >
                                    <Region
                                        name="max_capacity_txt"
                                        params={16}
                                        layout={{ width: 172, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText text={t('wiredchests.max_capacity')} />
                                    </Region>
                                    <Region
                                        name="upgrade_capacity_region"
                                        params={17}
                                        layout={{ width: 22, height: 22, flexShrink: 0 }}
                                    >
                                        <ContainerButton
                                            variant="3"
                                            name="upgrade_capacity_btn"
                                            params={17}
                                            onPointerTap={onUpgradeCapacityBtn}
                                            layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                                        />
                                    </Region>
                                </Region>
                                <Region
                                    name="splitter"
                                    params={144}
                                    backgroundColor="#b0b0b0"
                                    layout={{ position: 'absolute', left: 0, width: 429, top: 29, height: 1 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            name="button_row"
                            params={1168}
                            layout={{ position: 'absolute', left: 0, width: 460, top: 87, height: 30 }}
                        >
                            <Region
                                name="footer_buttons_left"
                                params={16}
                                layout={{ position: 'absolute', left: 17, width: 194, top: 0, height: 30, flexDirection: 'row', gap: 13 }}
                            >
                                <Button
                                    variant="3"
                                    name="withdraw_all_btn"
                                    params={131089}
                                    onPointerTap={onWithdrawAllBtn}
                                    layout={{ width: 89, height: 30, flexShrink: 0 }}
                                >
                                    {t('wiredchests.withdraw_all')}
                                </Button>
                                <Button
                                    variant="3"
                                    name="start_deposit_btn"
                                    params={131089}
                                    onPointerTap={onStartDepositBtn}
                                    layout={{ width: 92, height: 30, flexShrink: 0 }}
                                >
                                    {t('wiredchests.start_deposit')}
                                </Button>
                            </Region>
                            <Region
                                name="footer_buttons_left"
                                params={262224}
                                layout={{ position: 'absolute', left: 370, width: 73, top: 0, height: 30, flexDirection: 'row', gap: 10 }}
                            >
                                <Button
                                    variant="3"
                                    name="view_logs_btn"
                                    params={131089}
                                    onPointerTap={onViewLogsBtn}
                                    layout={{ width: 73, height: 30, flexShrink: 0 }}
                                >
                                    {t('wiredchests.view_logs')}
                                </Button>
                            </Region>
                            <Region
                                name="item_count_text_bottom"
                                params={262224}
                                visible={false}
                                layout={{ position: 'absolute', left: 261, width: 184, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('wiredchests.space_used')} />
                            </Region>
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
