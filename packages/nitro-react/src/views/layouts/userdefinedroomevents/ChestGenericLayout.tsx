import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, CheckBox, ContainerButton, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1142_chest_generic_xml` (layout "chest_generic", 460x463) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChestGenericLayoutProps {
    itemsMainList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const ChestGenericLayout = ({ itemsMainList, layout, onClose }: ChestGenericLayoutProps) => {
    const t = useTranslation();

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
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 428, flexDirection: 'column' }}
                >
                    {itemsMainList ?? (
                        <>
                            <ChestGenericLayoutHeaderItem />
                            <ChestGenericLayoutChestContentsItem />
                            <ChestGenericLayoutFooterItem />
                        </>
                    )}
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `header` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutHeaderItemProps {
    captionDesc?: string;
    captionWarningText?: string;
    layout?: BoxLayout;
    onNotificationSettingsButton?: () => void;
    onSettingsButton?: () => void;
}

export const ChestGenericLayoutHeaderItem = ({ captionDesc, captionWarningText, layout, onNotificationSettingsButton, onSettingsButton }: ChestGenericLayoutHeaderItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            params={144}
            layout={{ width: 460, height: 51, flexShrink: 0, ...layout }}
        >
            <Region
                name="layout_1"
                params={2192}
                backgroundColor="#dadada"
                layout={{ position: 'absolute', left: 1, right: 1, top: 0, bottom: 0 }}
            />
            <Region
                name="splitter"
                params={1168}
                backgroundColor="#c0c0c0"
                layout={{ position: 'absolute', left: 1, right: 1, bottom: 0, height: 1 }}
            />
            <Region
                name="desc"
                params={8388752}
                layout={{ position: 'absolute', left: 10, right: 70, top: 10, minHeight: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDesc ?? ' A cozy chest waiting to be filled with all sorts of treasures!'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                />
            </Region>
            <Region
                name="warning_text"
                params={2185}
                visible={false}
                layout={{ position: 'absolute', left: 10, right: 44, top: 10, bottom: -6, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionWarningText ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 406 }}
                />
            </Region>
            <ContainerButton
                variant="7"
                name="notification_settings_button"
                tooltip={t('tooltip.notification_settings')}
                params={65}
                dynamicStyle="button"
                onPointerTap={onNotificationSettingsButton}
                layout={{ position: 'absolute', right: 39, width: 24, top: 7, height: 24 }}
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
                layout={{ position: 'absolute', right: 10, width: 24, top: 7, height: 24 }}
            >
                <ThemeImage
                    tags={[ '#icon' ]}
                    params={16}
                    src={layoutImage('wired_chests_gear_icon.png')}
                    layout={{ position: 'absolute', left: 5, width: 14, top: 5, height: 14 }}
                />
            </ContainerButton>
        </Region>
    );
};

/** Row template `chest_contents` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutChestContentsItemProps {
    layout?: BoxLayout;
}

export const ChestGenericLayoutChestContentsItem = ({ layout }: ChestGenericLayoutChestContentsItemProps) => {
    return (
        <Region
            name="chest_contents"
            params={144}
            layout={{ width: 458, height: 254, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `title` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutTitleItem = ({ captionTitle, layout }: ChestGenericLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="title"
            params={16}
            layout={{ width: 105, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? t('wiredchests.lock_info.title')}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Row template `spacerr` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutSpacerrItemProps {
    layout?: BoxLayout;
}

export const ChestGenericLayoutSpacerrItem = ({ layout }: ChestGenericLayoutSpacerrItemProps) => {
    return (
        <Region
            name="spacerr"
            params={16}
            layout={{ width: 30, height: 7, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `rule1` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule1ItemProps {
    captionRule1?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule1Item = ({ captionRule1, layout }: ChestGenericLayoutRule1ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rule1"
            params={129}
            layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRule1 ?? t('wiredchests.lock_info.rule_1')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};

/** Row template `rule2` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule2ItemProps {
    captionRule2?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule2Item = ({ captionRule2, layout }: ChestGenericLayoutRule2ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rule2"
            params={129}
            layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRule2 ?? t('wiredchests.lock_info.rule_2')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};

/** Row template `rule3` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule3ItemProps {
    captionRule3?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule3Item = ({ captionRule3, layout }: ChestGenericLayoutRule3ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rule3"
            params={129}
            layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRule3 ?? t('wiredchests.lock_info.rule_3')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};

/** Row template `rule4` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule4ItemProps {
    captionRule4?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule4Item = ({ captionRule4, layout }: ChestGenericLayoutRule4ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rule4"
            params={129}
            layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRule4 ?? t('wiredchests.lock_info.rule_4')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};

/** Row template `rule5` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule5ItemProps {
    captionRule5?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule5Item = ({ captionRule5, layout }: ChestGenericLayoutRule5ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rule5"
            params={129}
            layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRule5 ?? t('wiredchests.lock_info.rule_5')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};

/** Row template `rule6` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule6ItemProps {
    captionRule6?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule6Item = ({ captionRule6, layout }: ChestGenericLayoutRule6ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rule6"
            params={129}
            layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRule6 ?? t('wiredchests.lock_info.rule_6')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};

/** Row template `rule7` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule7ItemProps {
    captionRule7?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule7Item = ({ captionRule7, layout }: ChestGenericLayoutRule7ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rule7"
            params={129}
            layout={{ width: 353, height: 17, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRule7 ?? t('wiredchests.lock_info.rule_7')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};

/** Row template `spacerr` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutSpacerrItem2Props {
    layout?: BoxLayout;
}

export const ChestGenericLayoutSpacerrItem2 = ({ layout }: ChestGenericLayoutSpacerrItem2Props) => {
    return (
        <Region
            name="spacerr"
            params={16}
            layout={{ width: 30, height: 14, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `ctitle` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCtitleItemProps {
    captionCtitle?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutCtitleItem = ({ captionCtitle, layout }: ChestGenericLayoutCtitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctitle"
            params={16}
            layout={{ width: 100, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCtitle ?? t('wiredchests.capacity_info.title')}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Row template `spacerr` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutSpacerrItem3Props {
    layout?: BoxLayout;
}

export const ChestGenericLayoutSpacerrItem3 = ({ layout }: ChestGenericLayoutSpacerrItem3Props) => {
    return (
        <Region
            name="spacerr"
            params={16}
            layout={{ width: 30, height: 7, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `crule1` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCrule1ItemProps {
    captionCrule1?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutCrule1Item = ({ captionCrule1, layout }: ChestGenericLayoutCrule1ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="crule1"
            params={129}
            layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCrule1 ?? t('wiredchests.capacity_info.rule_1')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};

/** Row template `crule2` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCrule2ItemProps {
    captionCrule2?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutCrule2Item = ({ captionCrule2, layout }: ChestGenericLayoutCrule2ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="crule2"
            params={129}
            layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCrule2 ?? t('wiredchests.capacity_info.rule_2')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};

/** Row template `crule3` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCrule3ItemProps {
    captionCrule3?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutCrule3Item = ({ captionCrule3, layout }: ChestGenericLayoutCrule3ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="crule3"
            params={129}
            layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCrule3 ?? t('wiredchests.capacity_info.rule_3')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};

/** Row template `crule4` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCrule4ItemProps {
    captionCrule4?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutCrule4Item = ({ captionCrule4, layout }: ChestGenericLayoutCrule4ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="crule4"
            params={129}
            layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCrule4 ?? t('wiredchests.capacity_info.rule_4')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};

/** Row template `splitter` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutSplitterItemProps {
    layout?: BoxLayout;
}

export const ChestGenericLayoutSplitterItem = ({ layout }: ChestGenericLayoutSplitterItemProps) => {
    return (
        <Region
            name="splitter"
            params={144}
            backgroundColor="#b0b0b0"
            layout={{ width: 429, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `locking_options` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutLockingOptionsItemProps {
    itemsLockingOptions?: ReactNode;
    layout?: BoxLayout;
    onAutoLockChestCbx?: () => void;
    onLockChestCbx?: () => void;
}

export const ChestGenericLayoutLockingOptionsItem = ({ itemsLockingOptions, layout, onAutoLockChestCbx, onLockChestCbx }: ChestGenericLayoutLockingOptionsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="locking_options"
            params={144}
            layout={{ width: 443, height: 41, flexShrink: 0, flexDirection: 'column', gap: 4, ...layout }}
        >
            {itemsLockingOptions ?? (
                <ChestGenericLayoutSplitterItem />
            )}
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
        </Region>
    );
};

/** Row template `capacity_input_border` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCapacityInputBorderItemProps {
    layout?: BoxLayout;
}

export const ChestGenericLayoutCapacityInputBorderItem = ({ layout }: ChestGenericLayoutCapacityInputBorderItemProps) => {
    const [ capacityInputValue, setCapacityInputValue ] = useState('');

    return (
        <Border
            variant="4"
            name="capacity_input_border"
            params={16}
            layout={{ width: 65, height: 22, flexShrink: 0, ...layout }}
        >
            <TextInput
                value={capacityInputValue}
                onChange={setCapacityInputValue}
                layout={{ position: 'absolute', left: 5, width: 55, top: 3, height: 17 }}
            />
        </Border>
    );
};

/** Row template `max_capacity_txt` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutMaxCapacityTxtItemProps {
    captionMaxCapacityTxt?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutMaxCapacityTxtItem = ({ captionMaxCapacityTxt, layout }: ChestGenericLayoutMaxCapacityTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="max_capacity_txt"
            params={16}
            layout={{ width: 172, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionMaxCapacityTxt ?? t('wiredchests.max_capacity')} />
        </Region>
    );
};

/** Row template `upgrade_capacity_region` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutUpgradeCapacityRegionItemProps {
    layout?: BoxLayout;
    onUpgradeCapacityBtn?: () => void;
    onUpgradeCapacityRegion?: () => void;
}

export const ChestGenericLayoutUpgradeCapacityRegionItem = ({ layout, onUpgradeCapacityBtn, onUpgradeCapacityRegion }: ChestGenericLayoutUpgradeCapacityRegionItemProps) => {
    return (
        <Region
            name="upgrade_capacity_region"
            params={17}
            onPointerTap={onUpgradeCapacityRegion}
            cursor="pointer"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="upgrade_capacity_btn"
                params={17}
                onPointerTap={onUpgradeCapacityBtn}
                layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
            />
        </Region>
    );
};

/** Row template `capacity_options` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCapacityOptionsItemProps {
    captionItemCountText?: string;
    itemsCapacityOverrideContainer?: ReactNode;
    itemsUpgradeCapacityContainer?: ReactNode;
    layout?: BoxLayout;
}

export const ChestGenericLayoutCapacityOptionsItem = ({ captionItemCountText, itemsCapacityOverrideContainer, itemsUpgradeCapacityContainer, layout }: ChestGenericLayoutCapacityOptionsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="capacity_options"
            params={144}
            layout={{ width: 443, height: 30, flexShrink: 0, ...layout }}
        >
            <Region
                name="item_count_text"
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 184, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionItemCountText ?? t('wiredchests.space_used')} />
            </Region>
            <Region
                name="capacity_override_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 156, top: 2, height: 22, flexDirection: 'row', gap: 6 }}
            >
                {itemsCapacityOverrideContainer ?? (
                    <ChestGenericLayoutCapacityInputBorderItem />
                )}
                <Region
                    params={16}
                    layout={{ width: 85, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={t('wiredchests.capacity')} />
                </Region>
            </Region>
            <Region
                name="upgrade_capacity_container"
                params={262224}
                layout={{ position: 'absolute', right: 16, width: 200, top: 0, height: 25, flexDirection: 'row', gap: 6 }}
            >
                {itemsUpgradeCapacityContainer ?? (
                    <>
                        <ChestGenericLayoutMaxCapacityTxtItem />
                        <ChestGenericLayoutUpgradeCapacityRegionItem />
                    </>
                )}
            </Region>
            <Region
                name="splitter"
                params={144}
                backgroundColor="#b0b0b0"
                layout={{ position: 'absolute', left: 0, right: 14, top: 29, height: 1 }}
            />
        </Region>
    );
};

/** Row template `withdraw_all_btn` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutWithdrawAllBtnItemProps {
    layout?: BoxLayout;
    onWithdrawAllBtn?: () => void;
}

export const ChestGenericLayoutWithdrawAllBtnItem = ({ layout, onWithdrawAllBtn }: ChestGenericLayoutWithdrawAllBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="withdraw_all_btn"
            params={131089}
            onPointerTap={onWithdrawAllBtn}
            layout={{ width: 89, height: 30, flexShrink: 0, ...layout }}
        >
            {t('wiredchests.withdraw_all')}
        </Button>
    );
};

/** Row template `start_deposit_btn` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutStartDepositBtnItemProps {
    layout?: BoxLayout;
    onStartDepositBtn?: () => void;
}

export const ChestGenericLayoutStartDepositBtnItem = ({ layout, onStartDepositBtn }: ChestGenericLayoutStartDepositBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="start_deposit_btn"
            params={131089}
            onPointerTap={onStartDepositBtn}
            layout={{ width: 92, height: 30, flexShrink: 0, ...layout }}
        >
            {t('wiredchests.start_deposit')}
        </Button>
    );
};

/** Row template `view_logs_btn` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutViewLogsBtnItemProps {
    layout?: BoxLayout;
    onViewLogsBtn?: () => void;
}

export const ChestGenericLayoutViewLogsBtnItem = ({ layout, onViewLogsBtn }: ChestGenericLayoutViewLogsBtnItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="view_logs_btn"
            params={131089}
            onPointerTap={onViewLogsBtn}
            layout={{ width: 73, height: 30, flexShrink: 0, ...layout }}
        >
            {t('wiredchests.view_logs')}
        </Button>
    );
};

/** Row template `footer` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutFooterItemProps {
    captionItemCountTextBottom?: string;
    itemsFooterButtonsLeft?: ReactNode;
    itemsFooterButtonsLeft2?: ReactNode;
    itemsFooterOptions?: ReactNode;
    itemsLockInfoBubbleTexts?: ReactNode;
    layout?: BoxLayout;
    onLockInfoButton?: () => void;
    visibleLockInfoBubble?: boolean;
}

export const ChestGenericLayoutFooterItem = ({ captionItemCountTextBottom, itemsFooterButtonsLeft, itemsFooterButtonsLeft2, itemsFooterOptions, itemsLockInfoBubbleTexts, layout, onLockInfoButton, visibleLockInfoBubble }: ChestGenericLayoutFooterItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="footer"
            params={144}
            layout={{ width: 460, height: 123, flexShrink: 0, ...layout }}
        >
            <Region
                name="layout_1"
                params={2192}
                backgroundColor="#dadada"
                layout={{ position: 'absolute', left: 1, right: 1, top: 0, bottom: 13 }}
            />
            <Border
                variant="2"
                name="layout_2"
                params={1168}
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 1, right: 1, bottom: 0, height: 36 }}
            />
            <Region
                name="splitter"
                params={144}
                backgroundColor="#c0c0c0"
                layout={{ position: 'absolute', left: 1, right: 1, top: 0, height: 1 }}
            />
            <Region
                name="lock_info_button"
                params={81}
                onPointerTap={onLockInfoButton}
                cursor="pointer"
                layout={{ position: 'absolute', right: 19, width: 18, top: 6, height: 18 }}
            >
                <ThemeImage
                    params={16}
                    src={layoutImage('icons_info_grey.png')}
                    layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
                />
            </Region>
            <Region
                visible={visibleLockInfoBubble ?? false}
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
                        layout={{ position: 'absolute', left: 8, right: 24, top: 8, height: 504, flexDirection: 'column', gap: 1 }}
                    >
                        {itemsLockInfoBubbleTexts ?? (
                            <>
                                <ChestGenericLayoutTitleItem />
                                <ChestGenericLayoutSpacerrItem />
                                <ChestGenericLayoutRule1Item />
                                <ChestGenericLayoutRule2Item />
                                <ChestGenericLayoutRule3Item />
                                <ChestGenericLayoutRule4Item />
                                <ChestGenericLayoutRule5Item />
                                <ChestGenericLayoutRule6Item />
                                <ChestGenericLayoutRule7Item />
                                <ChestGenericLayoutSpacerrItem2 />
                                <ChestGenericLayoutCtitleItem />
                                <ChestGenericLayoutSpacerrItem3 />
                                <ChestGenericLayoutCrule1Item />
                                <ChestGenericLayoutCrule2Item />
                                <ChestGenericLayoutCrule3Item />
                                <ChestGenericLayoutCrule4Item />
                            </>
                        )}
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
                            params={16}
                            layout={{ width: 353, height: 17, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('wiredchests.capacity_info.desc')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                            />
                        </Region>
                    </Region>
                </Bubble>
            </Region>
            <Region
                name="footer_options"
                params={8388752}
                layout={{ position: 'absolute', left: 17, right: 0, top: 7, height: 75, flexDirection: 'column', gap: 4 }}
            >
                {itemsFooterOptions ?? (
                    <>
                        <ChestGenericLayoutLockingOptionsItem />
                        <ChestGenericLayoutCapacityOptionsItem />
                    </>
                )}
            </Region>
            <Region
                name="button_row"
                params={1168}
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 6, height: 30 }}
            >
                <Region
                    name="footer_buttons_left"
                    params={16}
                    layout={{ position: 'absolute', left: 17, width: 194, top: 0, height: 30, flexDirection: 'row', gap: 13 }}
                >
                    {itemsFooterButtonsLeft ?? (
                        <>
                            <ChestGenericLayoutWithdrawAllBtnItem />
                            <ChestGenericLayoutStartDepositBtnItem />
                        </>
                    )}
                </Region>
                <Region
                    name="footer_buttons_left"
                    params={262224}
                    layout={{ position: 'absolute', right: 17, width: 73, top: 0, height: 30, flexDirection: 'row', gap: 10 }}
                >
                    {itemsFooterButtonsLeft2 ?? (
                        <ChestGenericLayoutViewLogsBtnItem />
                    )}
                </Region>
                <Region
                    name="item_count_text_bottom"
                    params={262224}
                    visible={false}
                    layout={{ position: 'absolute', right: 15, width: 184, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionItemCountTextBottom ?? t('wiredchests.space_used')} />
                </Region>
            </Region>
        </Region>
    );
};
