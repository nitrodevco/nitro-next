import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `988_area_hide_ui_xml` (layout "area_hide_ui", 292x334) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AreaHideUiLayoutProps {
    layout?: BoxLayout;
    onApplyButton?: () => void;
    onClose?: () => void;
    onOnOffButton?: () => void;
    tabContent?: AreaHideUiLayoutTabContentProps;
}

export const AreaHideUiLayout = ({ layout, onApplyButton, onClose, onOnOffButton, tabContent }: AreaHideUiLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="areahide_ui"
            name="areahide_ui"
            caption={t('widget.areahide.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 292, height: 334, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="100"
                    tintColor="#ffffff"
                    layout={{ position: 'absolute', left: 3, width: 275, top: 16, height: 250 }}
                >
                    <AreaHideUiLayoutTabContent {...tabContent} />
                </Border>
                <Button
                    variant="0"
                    name="apply_button"
                    onPointerTap={onApplyButton}
                    layout={{ position: 'absolute', left: 4, width: 165, top: 272, height: 24 }}
                >
                    {t('widget.areahide.button.apply')}
                </Button>
                <Button
                    variant="0"
                    name="on_off_button"
                    onPointerTap={onOnOffButton}
                    layout={{ position: 'absolute', right: 15, width: 151, top: 272, height: 24 }}
                >
                    {t('widget.areahide.button.on')}
                </Button>
            </Region>
        </Frame>
    );
};

/** Row template `header_container` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutHeaderContainerItemProps {
    captionHideareaInfo?: string;
    layout?: BoxLayout;
    visibleHeaderContainer?: boolean;
}

export const AreaHideUiLayoutHeaderContainerItem = ({ captionHideareaInfo, layout, visibleHeaderContainer }: AreaHideUiLayoutHeaderContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header_container"
            visible={visibleHeaderContainer ?? false}
            layout={{ width: 270, height: 0, flexShrink: 0, ...layout }}
        >
            <Region
                name="hidearea_info"
                visible={false}
                layout={{ position: 'absolute', left: 4, width: 262, top: 4, height: 31, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHideareaInfo ?? t('widget.areahide.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 262 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `spacer` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutSpacerItemProps {
    layout?: BoxLayout;
}

export const AreaHideUiLayoutSpacerItem = ({ layout }: AreaHideUiLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            layout={{ width: 30, height: 5, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `select_button` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutSelectButtonItemProps {
    layout?: BoxLayout;
    onSelectButton?: () => void;
}

export const AreaHideUiLayoutSelectButtonItem = ({ layout, onSelectButton }: AreaHideUiLayoutSelectButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="select_button"
            onPointerTap={onSelectButton}
            layout={{ width: 211, height: 24, flexShrink: 0, ...layout }}
        >
            {t('widget.areahide.area_selection.select')}
        </Button>
    );
};

/** Row template `clear_button` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutClearButtonItemProps {
    layout?: BoxLayout;
    onClearButton?: () => void;
}

export const AreaHideUiLayoutClearButtonItem = ({ layout, onClearButton }: AreaHideUiLayoutClearButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="0"
            name="clear_button"
            onPointerTap={onClearButton}
            layout={{ width: 205, height: 24, flexShrink: 0, ...layout }}
        >
            {t('widget.areahide.area_selection.clear')}
        </Button>
    );
};

/** Named region `button_container` of AreaHideUiLayout - configured through the parent's `buttonContainer` prop. */
export interface AreaHideUiLayoutButtonContainerProps {
    itemsButtonContainer?: ReactNode;
    layout?: BoxLayout;
}

export const AreaHideUiLayoutButtonContainer = ({ itemsButtonContainer, layout }: AreaHideUiLayoutButtonContainerProps) => {
    return (
        <Region
            name="button_container"
            layout={{ position: 'absolute', left: 0, width: 260, top: 66, height: 25, flexDirection: 'row', gap: 12, ...layout }}
        >
            {itemsButtonContainer ?? (
                <>
                    <AreaHideUiLayoutSelectButtonItem />
                    <AreaHideUiLayoutClearButtonItem />
                </>
            )}
        </Region>
    );
};

/** Row template `area_container` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutAreaContainerItemProps {
    buttonContainer?: AreaHideUiLayoutButtonContainerProps;
    captionAreaselectionInfo?: string;
    captionAreaselectionTitle?: string;
    layout?: BoxLayout;
}

export const AreaHideUiLayoutAreaContainerItem = ({ buttonContainer, captionAreaselectionInfo, captionAreaselectionTitle, layout }: AreaHideUiLayoutAreaContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="area_container"
            layout={{ width: 260, height: 98, flexShrink: 0, ...layout }}
        >
            <Region
                name="areaselection_title"
                layout={{ position: 'absolute', left: 0, width: 158, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAreaselectionTitle ?? t('widget.areahide.area_selection')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="areaselection_info"
                layout={{ position: 'absolute', left: 0, width: 262, top: 20, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAreaselectionInfo ?? t('widget.areahide.area_selection.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 262 }}
                />
            </Region>
            <AreaHideUiLayoutButtonContainer {...buttonContainer} />
        </Region>
    );
};

/** Named region `wallitem_option` of AreaHideUiLayout - configured through the parent's `wallitemOption` prop. */
export interface AreaHideUiLayoutWallitemOptionProps {
    captionWallitemsTxt?: string;
    layout?: BoxLayout;
    onWallitemsCheckbox?: () => void;
}

export const AreaHideUiLayoutWallitemOption = ({ captionWallitemsTxt, layout, onWallitemsCheckbox }: AreaHideUiLayoutWallitemOptionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="wallitem_option"
            layout={{ position: 'absolute', left: 0, width: 262, top: 0, height: 55, ...layout }}
        >
            <CheckBox
                variant="0"
                name="wallitems_checkbox"
                onPointerTap={onWallitemsCheckbox}
                layout={{ position: 'absolute', left: 1, width: 18, top: 0, height: 18 }}
            />
            <Region
                name="wallitems_txt"
                layout={{ position: 'absolute', left: 20, width: 240, top: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionWallitemsTxt ?? t('widget.areahide.options.wallitems')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 240 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `invert_option` of AreaHideUiLayout - configured through the parent's `invertOption` prop. */
export interface AreaHideUiLayoutInvertOptionProps {
    captionInvertInfo?: string;
    captionInvertTxt?: string;
    layout?: BoxLayout;
    onInvertCheckbox?: () => void;
}

export const AreaHideUiLayoutInvertOption = ({ captionInvertInfo, captionInvertTxt, layout, onInvertCheckbox }: AreaHideUiLayoutInvertOptionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="invert_option"
            layout={{ position: 'absolute', left: 0, width: 262, top: 20, height: 43, ...layout }}
        >
            <CheckBox
                variant="0"
                name="invert_checkbox"
                onPointerTap={onInvertCheckbox}
                layout={{ position: 'absolute', left: 1, width: 18, top: 0, height: 18 }}
            />
            <Region
                name="invert_txt"
                layout={{ position: 'absolute', left: 20, width: 240, top: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInvertTxt ?? t('widget.areahide.options.invert')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 240 }}
                />
            </Region>
            <Region
                name="invert_info"
                layout={{ position: 'absolute', left: 20, width: 242, top: 16, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInvertInfo ?? t('widget.areahide.options.invert.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#999999', wordWrap: true, wordWrapWidth: 242 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `invisibility_option` of AreaHideUiLayout - configured through the parent's `invisibilityOption` prop. */
export interface AreaHideUiLayoutInvisibilityOptionProps {
    captionInvisibilityInfo?: string;
    captionInvisibilityTxt?: string;
    layout?: BoxLayout;
    onInvisiblityCheckbox?: () => void;
}

export const AreaHideUiLayoutInvisibilityOption = ({ captionInvisibilityInfo, captionInvisibilityTxt, layout, onInvisiblityCheckbox }: AreaHideUiLayoutInvisibilityOptionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="invisibility_option"
            layout={{ position: 'absolute', left: 0, width: 262, top: 68, height: 55, ...layout }}
        >
            <CheckBox
                variant="0"
                name="invisiblity_checkbox"
                onPointerTap={onInvisiblityCheckbox}
                layout={{ position: 'absolute', left: 1, width: 18, top: 0, height: 18 }}
            />
            <Region
                name="invisibility_txt"
                layout={{ position: 'absolute', left: 20, width: 240, top: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInvisibilityTxt ?? t('widget.areahide.options.invisibility')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 240 }}
                />
            </Region>
            <Region
                name="invisibility_info"
                layout={{ position: 'absolute', left: 20, width: 242, top: 16, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionInvisibilityInfo ?? t('widget.areahide.options.invisibility.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#999999', wordWrap: true, wordWrapWidth: 242 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `options_container` of AreaHideUiLayout - configured through the parent's `optionsContainer` prop. */
export interface AreaHideUiLayoutOptionsContainerProps {
    invertOption?: AreaHideUiLayoutInvertOptionProps;
    invisibilityOption?: AreaHideUiLayoutInvisibilityOptionProps;
    layout?: BoxLayout;
    wallitemOption?: AreaHideUiLayoutWallitemOptionProps;
}

export const AreaHideUiLayoutOptionsContainer = ({ invertOption, invisibilityOption, layout, wallitemOption }: AreaHideUiLayoutOptionsContainerProps) => {
    return (
        <Region
            name="options_container"
            layout={{ position: 'absolute', left: 0, width: 262, top: 20, height: 123, ...layout }}
        >
            <AreaHideUiLayoutWallitemOption {...wallitemOption} />
            <AreaHideUiLayoutInvertOption {...invertOption} />
            <AreaHideUiLayoutInvisibilityOption {...invisibilityOption} />
        </Region>
    );
};

/** Row template `saturation_container` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutSaturationContainerItemProps {
    captionOptionsTitle?: string;
    layout?: BoxLayout;
    optionsContainer?: AreaHideUiLayoutOptionsContainerProps;
}

export const AreaHideUiLayoutSaturationContainerItem = ({ captionOptionsTitle, layout, optionsContainer }: AreaHideUiLayoutSaturationContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="saturation_container"
            layout={{ width: 262, height: 143, flexShrink: 0, ...layout }}
        >
            <Region
                name="options_title"
                layout={{ position: 'absolute', left: 0, width: 123, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOptionsTitle ?? t('widget.areahide.options')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <AreaHideUiLayoutOptionsContainer {...optionsContainer} />
        </Region>
    );
};

/** Named region `tab_content` of AreaHideUiLayout - configured through the parent's `tabContent` prop. */
export interface AreaHideUiLayoutTabContentProps {
    itemsTabContent?: ReactNode;
    layout?: BoxLayout;
}

export const AreaHideUiLayoutTabContent = ({ itemsTabContent, layout }: AreaHideUiLayoutTabContentProps) => {
    return (
        <Region
            name="tab_content"
            layout={{ position: 'absolute', left: 2, width: 270, top: 2, height: 250, flexDirection: 'column', ...layout }}
        >
            {itemsTabContent ?? (
                <>
                    <AreaHideUiLayoutHeaderContainerItem />
                    <AreaHideUiLayoutSpacerItem />
                    <AreaHideUiLayoutAreaContainerItem />
                    <AreaHideUiLayoutSaturationContainerItem />
                </>
            )}
        </Region>
    );
};
