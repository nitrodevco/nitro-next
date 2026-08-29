import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, CheckBox, ContainerButton, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1142_chest_generic_xml` (layout "chest_generic", 460x463) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChestGenericLayoutProps {
    layout?: BoxLayout;
    mainList?: ChestGenericLayoutMainListProps;
    onClose?: () => void;
}

export const ChestGenericLayout = ({ layout, mainList, onClose }: ChestGenericLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('wiredchests.furni_chest')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 460, height: 463, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ChestGenericLayoutMainList {...mainList} />
            </Region>
        </Frame>
    );
};

/** Named region `layout_1` of ChestGenericLayout - configured through the parent's `layout1` prop. */
export interface ChestGenericLayoutLayout1Props {
    layout?: BoxLayout;
}

export const ChestGenericLayoutLayout1 = ({ layout }: ChestGenericLayoutLayout1Props) => {
    return (
        <Region
            name="layout_1"
            backgroundColor="#dadada"
            layout={{ position: 'absolute', left: 1, right: 1, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Named region `splitter` of ChestGenericLayout - configured through the parent's `splitter` prop. */
export interface ChestGenericLayoutSplitterProps {
    layout?: BoxLayout;
}

export const ChestGenericLayoutSplitter = ({ layout }: ChestGenericLayoutSplitterProps) => {
    return (
        <Region
            name="splitter"
            backgroundColor="#c0c0c0"
            layout={{ position: 'absolute', left: 1, right: 1, bottom: 0, height: 1, ...layout }}
        />
    );
};

/** Row template `header` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutHeaderItemProps {
    captionDesc?: string;
    captionWarningText?: string;
    layout?: BoxLayout;
    layout1?: ChestGenericLayoutLayout1Props;
    onNotificationSettingsButton?: () => void;
    onSettingsButton?: () => void;
    splitter?: ChestGenericLayoutSplitterProps;
}

export const ChestGenericLayoutHeaderItem = ({ captionDesc, captionWarningText, layout, layout1, onNotificationSettingsButton, onSettingsButton, splitter }: ChestGenericLayoutHeaderItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            layout={{ width: 460, height: 51, flexShrink: 0, ...layout }}
        >
            <ChestGenericLayoutLayout1 {...layout1} />
            <ChestGenericLayoutSplitter {...splitter} />
            <Region
                name="desc"
                layout={{ position: 'absolute', left: 10, right: 70, top: 10, minHeight: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionDesc ?? ' A cozy chest waiting to be filled with all sorts of treasures!'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                />
            </Region>
            <Region
                name="warning_text"
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
                dynamicStyle="button"
                onPointerTap={onNotificationSettingsButton}
                layout={{ position: 'absolute', right: 39, width: 24, top: 7, height: 24 }}
            >
                <ThemeImage
                    src={layoutImage('wired_chests_bell_icon.png')}
                    layout={{ position: 'absolute', left: 6, width: 12, top: 4, height: 15 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="7"
                name="settings_button"
                tooltip={t('tooltip.settings')}
                dynamicStyle="button"
                onPointerTap={onSettingsButton}
                layout={{ position: 'absolute', right: 10, width: 24, top: 7, height: 24 }}
            >
                <ThemeImage
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
            layout={{ width: 458, height: 254, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `layout_1` of ChestGenericLayout - configured through the parent's `layout1` prop. */
export interface ChestGenericLayoutLayout12Props {
    layout?: BoxLayout;
}

export const ChestGenericLayoutLayout12 = ({ layout }: ChestGenericLayoutLayout12Props) => {
    return (
        <Region
            name="layout_1"
            backgroundColor="#dadada"
            layout={{ position: 'absolute', left: 1, right: 1, top: 0, bottom: 13, ...layout }}
        />
    );
};

/** Named region `splitter` of ChestGenericLayout - configured through the parent's `splitter` prop. */
export interface ChestGenericLayoutSplitter2Props {
    layout?: BoxLayout;
}

export const ChestGenericLayoutSplitter2 = ({ layout }: ChestGenericLayoutSplitter2Props) => {
    return (
        <Region
            name="splitter"
            backgroundColor="#c0c0c0"
            layout={{ position: 'absolute', left: 1, right: 1, top: 0, height: 1, ...layout }}
        />
    );
};

/** Named region `lock_info_button` of ChestGenericLayout - configured through the parent's `lockInfoButton` prop. */
export interface ChestGenericLayoutLockInfoButtonProps {
    layout?: BoxLayout;
    onLockInfoButton?: () => void;
}

export const ChestGenericLayoutLockInfoButton = ({ layout, onLockInfoButton }: ChestGenericLayoutLockInfoButtonProps) => {
    return (
        <Region
            name="lock_info_button"
            onPointerTap={onLockInfoButton}
            cursor="pointer"
            layout={{ position: 'absolute', right: 19, width: 18, top: 6, height: 18, ...layout }}
        >
            <ThemeImage
                src={layoutImage('icons_info_grey.png')}
                layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 18 }}
            />
        </Region>
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
            layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCrule4 ?? t('wiredchests.capacity_info.rule_4')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};

/** Named region `lock_info_bubble_texts` of ChestGenericLayout - configured through the parent's `lockInfoBubbleTexts` prop. */
export interface ChestGenericLayoutLockInfoBubbleTextsProps {
    itemsLockInfoBubbleTexts?: ReactNode;
    layout?: BoxLayout;
}

export const ChestGenericLayoutLockInfoBubbleTexts = ({ itemsLockInfoBubbleTexts, layout }: ChestGenericLayoutLockInfoBubbleTextsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="lock_info_bubble_texts"
            layout={{ position: 'absolute', left: 8, right: 24, top: 8, height: 504, flexDirection: 'column', gap: 1, ...layout }}
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
            <Region layout={{ width: 353, height: 17, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('wiredchests.lock_info.desc')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                />
            </Region>
            <Region layout={{ width: 353, height: 17, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('wiredchests.capacity_info.desc')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
                />
            </Region>
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
            layout={{ width: 443, height: 41, flexShrink: 0, flexDirection: 'column', gap: 4, ...layout }}
        >
            {itemsLockingOptions ?? (
                <ChestGenericLayoutSplitterItem />
            )}
            <Region layout={{ width: 106, height: 16, flexShrink: 0, flexDirection: 'row', gap: 5 }}>
                <CheckBox
                    variant="3"
                    name="lock_chest_cbx"
                    onPointerTap={onLockChestCbx}
                    layout={{ width: 15, height: 15, flexShrink: 0 }}
                />
                <Region layout={{ width: 86, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText text={t('wiredchests.lock_chest')} />
                </Region>
            </Region>
            <Region layout={{ width: 286, height: 16, flexShrink: 0, flexDirection: 'row', gap: 5 }}>
                <CheckBox
                    variant="3"
                    name="auto_lock_chest_cbx"
                    onPointerTap={onAutoLockChestCbx}
                    layout={{ width: 15, height: 15, flexShrink: 0 }}
                />
                <Region layout={{ width: 266, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
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

/** Named region `capacity_override_container` of ChestGenericLayout - configured through the parent's `capacityOverrideContainer` prop. */
export interface ChestGenericLayoutCapacityOverrideContainerProps {
    itemsCapacityOverrideContainer?: ReactNode;
    layout?: BoxLayout;
}

export const ChestGenericLayoutCapacityOverrideContainer = ({ itemsCapacityOverrideContainer, layout }: ChestGenericLayoutCapacityOverrideContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="capacity_override_container"
            layout={{ position: 'absolute', left: 0, width: 156, top: 2, height: 22, flexDirection: 'row', gap: 6, ...layout }}
        >
            {itemsCapacityOverrideContainer ?? (
                <ChestGenericLayoutCapacityInputBorderItem />
            )}
            <Region layout={{ width: 85, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text={t('wiredchests.capacity')} />
            </Region>
        </Region>
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
            onPointerTap={onUpgradeCapacityRegion}
            cursor="pointer"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="upgrade_capacity_btn"
                onPointerTap={onUpgradeCapacityBtn}
                layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
            />
        </Region>
    );
};

/** Named region `upgrade_capacity_container` of ChestGenericLayout - configured through the parent's `upgradeCapacityContainer` prop. */
export interface ChestGenericLayoutUpgradeCapacityContainerProps {
    itemsUpgradeCapacityContainer?: ReactNode;
    layout?: BoxLayout;
}

export const ChestGenericLayoutUpgradeCapacityContainer = ({ itemsUpgradeCapacityContainer, layout }: ChestGenericLayoutUpgradeCapacityContainerProps) => {
    return (
        <Region
            name="upgrade_capacity_container"
            layout={{ position: 'absolute', right: 16, width: 200, top: 0, height: 25, flexDirection: 'row', gap: 6, ...layout }}
        >
            {itemsUpgradeCapacityContainer ?? (
                <>
                    <ChestGenericLayoutMaxCapacityTxtItem />
                    <ChestGenericLayoutUpgradeCapacityRegionItem />
                </>
            )}
        </Region>
    );
};

/** Named region `splitter` of ChestGenericLayout - configured through the parent's `splitter` prop. */
export interface ChestGenericLayoutSplitter3Props {
    layout?: BoxLayout;
}

export const ChestGenericLayoutSplitter3 = ({ layout }: ChestGenericLayoutSplitter3Props) => {
    return (
        <Region
            name="splitter"
            backgroundColor="#b0b0b0"
            layout={{ position: 'absolute', left: 0, right: 14, top: 29, height: 1, ...layout }}
        />
    );
};

/** Row template `capacity_options` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCapacityOptionsItemProps {
    capacityOverrideContainer?: ChestGenericLayoutCapacityOverrideContainerProps;
    captionItemCountText?: string;
    layout?: BoxLayout;
    splitter?: ChestGenericLayoutSplitter3Props;
    upgradeCapacityContainer?: ChestGenericLayoutUpgradeCapacityContainerProps;
}

export const ChestGenericLayoutCapacityOptionsItem = ({ capacityOverrideContainer, captionItemCountText, layout, splitter, upgradeCapacityContainer }: ChestGenericLayoutCapacityOptionsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="capacity_options"
            layout={{ width: 443, height: 30, flexShrink: 0, ...layout }}
        >
            <Region
                name="item_count_text"
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 184, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionItemCountText ?? t('wiredchests.space_used')} />
            </Region>
            <ChestGenericLayoutCapacityOverrideContainer {...capacityOverrideContainer} />
            <ChestGenericLayoutUpgradeCapacityContainer {...upgradeCapacityContainer} />
            <ChestGenericLayoutSplitter3 {...splitter} />
        </Region>
    );
};

/** Named region `footer_options` of ChestGenericLayout - configured through the parent's `footerOptions` prop. */
export interface ChestGenericLayoutFooterOptionsProps {
    itemsFooterOptions?: ReactNode;
    layout?: BoxLayout;
}

export const ChestGenericLayoutFooterOptions = ({ itemsFooterOptions, layout }: ChestGenericLayoutFooterOptionsProps) => {
    return (
        <Region
            name="footer_options"
            layout={{ position: 'absolute', left: 17, right: 0, top: 7, height: 75, flexDirection: 'column', gap: 4, ...layout }}
        >
            {itemsFooterOptions ?? (
                <>
                    <ChestGenericLayoutLockingOptionsItem />
                    <ChestGenericLayoutCapacityOptionsItem />
                </>
            )}
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
            onPointerTap={onStartDepositBtn}
            layout={{ width: 92, height: 30, flexShrink: 0, ...layout }}
        >
            {t('wiredchests.start_deposit')}
        </Button>
    );
};

/** Named region `footer_buttons_left` of ChestGenericLayout - configured through the parent's `footerButtonsLeft` prop. */
export interface ChestGenericLayoutFooterButtonsLeftProps {
    itemsFooterButtonsLeft?: ReactNode;
    layout?: BoxLayout;
}

export const ChestGenericLayoutFooterButtonsLeft = ({ itemsFooterButtonsLeft, layout }: ChestGenericLayoutFooterButtonsLeftProps) => {
    return (
        <Region
            name="footer_buttons_left"
            layout={{ position: 'absolute', left: 17, width: 194, top: 0, height: 30, flexDirection: 'row', gap: 13, ...layout }}
        >
            {itemsFooterButtonsLeft ?? (
                <>
                    <ChestGenericLayoutWithdrawAllBtnItem />
                    <ChestGenericLayoutStartDepositBtnItem />
                </>
            )}
        </Region>
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
            onPointerTap={onViewLogsBtn}
            layout={{ width: 73, height: 30, flexShrink: 0, ...layout }}
        >
            {t('wiredchests.view_logs')}
        </Button>
    );
};

/** Named region `footer_buttons_left` of ChestGenericLayout - configured through the parent's `footerButtonsLeft` prop. */
export interface ChestGenericLayoutFooterButtonsLeft2Props {
    itemsFooterButtonsLeft?: ReactNode;
    layout?: BoxLayout;
}

export const ChestGenericLayoutFooterButtonsLeft2 = ({ itemsFooterButtonsLeft, layout }: ChestGenericLayoutFooterButtonsLeft2Props) => {
    return (
        <Region
            name="footer_buttons_left"
            layout={{ position: 'absolute', right: 17, width: 73, top: 0, height: 30, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsFooterButtonsLeft ?? (
                <ChestGenericLayoutViewLogsBtnItem />
            )}
        </Region>
    );
};

/** Named region `button_row` of ChestGenericLayout - configured through the parent's `buttonRow` prop. */
export interface ChestGenericLayoutButtonRowProps {
    captionItemCountTextBottom?: string;
    footerButtonsLeft?: ChestGenericLayoutFooterButtonsLeftProps;
    footerButtonsLeft2?: ChestGenericLayoutFooterButtonsLeft2Props;
    layout?: BoxLayout;
}

export const ChestGenericLayoutButtonRow = ({ captionItemCountTextBottom, footerButtonsLeft, footerButtonsLeft2, layout }: ChestGenericLayoutButtonRowProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_row"
            layout={{ position: 'absolute', left: 0, right: 0, bottom: 6, height: 30, ...layout }}
        >
            <ChestGenericLayoutFooterButtonsLeft {...footerButtonsLeft} />
            <ChestGenericLayoutFooterButtonsLeft2 {...footerButtonsLeft2} />
            <Region
                name="item_count_text_bottom"
                visible={false}
                layout={{ position: 'absolute', right: 15, width: 184, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionItemCountTextBottom ?? t('wiredchests.space_used')} />
            </Region>
        </Region>
    );
};

/** Row template `footer` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutFooterItemProps {
    buttonRow?: ChestGenericLayoutButtonRowProps;
    footerOptions?: ChestGenericLayoutFooterOptionsProps;
    layout?: BoxLayout;
    layout1?: ChestGenericLayoutLayout12Props;
    lockInfoBubbleTexts?: ChestGenericLayoutLockInfoBubbleTextsProps;
    lockInfoButton?: ChestGenericLayoutLockInfoButtonProps;
    splitter?: ChestGenericLayoutSplitter2Props;
    visibleLockInfoBubble?: boolean;
}

export const ChestGenericLayoutFooterItem = ({ buttonRow, footerOptions, layout, layout1, lockInfoBubbleTexts, lockInfoButton, splitter, visibleLockInfoBubble }: ChestGenericLayoutFooterItemProps) => {
    return (
        <Region
            name="footer"
            layout={{ width: 460, height: 123, flexShrink: 0, ...layout }}
        >
            <ChestGenericLayoutLayout12 {...layout1} />
            <Border
                variant="2"
                name="layout_2"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 1, right: 1, bottom: 0, height: 36 }}
            />
            <ChestGenericLayoutSplitter2 {...splitter} />
            <ChestGenericLayoutLockInfoButton {...lockInfoButton} />
            <Region
                visible={visibleLockInfoBubble ?? false}
                layout={{ position: 'absolute', left: 440, width: 385, top: -245, height: 536 }}
            >
                <Bubble
                    variant="7"
                    name="lock_info_bubble"
                    pointer="left"
                    layout={{ width: '100%', height: '100%' }}
                >
                    <ChestGenericLayoutLockInfoBubbleTexts {...lockInfoBubbleTexts} />
                </Bubble>
            </Region>
            <ChestGenericLayoutFooterOptions {...footerOptions} />
            <ChestGenericLayoutButtonRow {...buttonRow} />
        </Region>
    );
};

/** Named region `main_list` of ChestGenericLayout - configured through the parent's `mainList` prop. */
export interface ChestGenericLayoutMainListProps {
    itemsMainList?: ReactNode;
    layout?: BoxLayout;
}

export const ChestGenericLayoutMainList = ({ itemsMainList, layout }: ChestGenericLayoutMainListProps) => {
    return (
        <Region
            name="main_list"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 428, flexDirection: 'column', ...layout }}
        >
            {itemsMainList ?? (
                <>
                    <ChestGenericLayoutHeaderItem />
                    <ChestGenericLayoutChestContentsItem />
                    <ChestGenericLayoutFooterItem />
                </>
            )}
        </Region>
    );
};
