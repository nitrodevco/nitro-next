import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, Frame, Region, ThemeText } from '#base/theme';

/** Generated from `988_area_hide_ui_xml` (layout "area_hide_ui", 292x334) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AreaHideUiLayoutProps {
    itemsTabContent?: ReactNode;
    layout?: BoxLayout;
    onApplyButton?: () => void;
    onClose?: () => void;
    onOnOffButton?: () => void;
}

export const AreaHideUiLayout = ({ itemsTabContent, layout, onApplyButton, onClose, onOnOffButton }: AreaHideUiLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="areahide_ui"
            name="areahide_ui"
            params={163841}
            caption={t('widget.areahide.title')}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 292, height: 334, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="100"
                    params={16}
                    tintColor="#ffffff"
                    layout={{ position: 'absolute', left: 3, width: 275, top: 16, height: 250 }}
                >
                    <Region
                        name="tab_content"
                        params={16}
                        layout={{ position: 'absolute', left: 2, width: 270, top: 2, height: 250, flexDirection: 'column' }}
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
                </Border>
                <Button
                    variant="0"
                    name="apply_button"
                    params={131089}
                    onPointerTap={onApplyButton}
                    layout={{ position: 'absolute', left: 4, width: 165, top: 272, height: 24 }}
                >
                    {t('widget.areahide.button.apply')}
                </Button>
                <Button
                    variant="0"
                    name="on_off_button"
                    params={393233}
                    onPointerTap={onOnOffButton}
                    layout={{ position: 'absolute', left: 126, width: 151, top: 272, height: 24 }}
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
            params={16}
            visible={visibleHeaderContainer ?? false}
            layout={{ width: 270, height: 0, flexShrink: 0, ...layout }}
        >
            <Region
                name="hidearea_info"
                params={16}
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
            params={16}
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
            params={131089}
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
            params={131089}
            onPointerTap={onClearButton}
            layout={{ width: 205, height: 24, flexShrink: 0, ...layout }}
        >
            {t('widget.areahide.area_selection.clear')}
        </Button>
    );
};

/** Row template `area_container` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutAreaContainerItemProps {
    captionAreaselectionInfo?: string;
    captionAreaselectionTitle?: string;
    itemsButtonContainer?: ReactNode;
    layout?: BoxLayout;
}

export const AreaHideUiLayoutAreaContainerItem = ({ captionAreaselectionInfo, captionAreaselectionTitle, itemsButtonContainer, layout }: AreaHideUiLayoutAreaContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="area_container"
            params={16}
            layout={{ width: 260, height: 98, flexShrink: 0, ...layout }}
        >
            <Region
                name="areaselection_title"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 158, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAreaselectionTitle ?? t('widget.areahide.area_selection')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="areaselection_info"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 262, top: 20, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAreaselectionInfo ?? t('widget.areahide.area_selection.info')}
                    textStyle="text-style-u-small"
                    textOptions={{ wordWrap: true, wordWrapWidth: 262 }}
                />
            </Region>
            <Region
                name="button_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 260, top: 66, height: 25, flexDirection: 'row', gap: 12 }}
            >
                {itemsButtonContainer ?? (
                    <>
                        <AreaHideUiLayoutSelectButtonItem />
                        <AreaHideUiLayoutClearButtonItem />
                    </>
                )}
            </Region>
        </Region>
    );
};

/** Row template `saturation_container` of AreaHideUiLayout - pass real rows through its `items…` slot. */
export interface AreaHideUiLayoutSaturationContainerItemProps {
    captionInvertInfo?: string;
    captionInvertTxt?: string;
    captionInvisibilityInfo?: string;
    captionInvisibilityTxt?: string;
    captionOptionsTitle?: string;
    captionWallitemsTxt?: string;
    layout?: BoxLayout;
    onInvertCheckbox?: () => void;
    onInvisiblityCheckbox?: () => void;
    onWallitemsCheckbox?: () => void;
}

export const AreaHideUiLayoutSaturationContainerItem = ({ captionInvertInfo, captionInvertTxt, captionInvisibilityInfo, captionInvisibilityTxt, captionOptionsTitle, captionWallitemsTxt, layout, onInvertCheckbox, onInvisiblityCheckbox, onWallitemsCheckbox }: AreaHideUiLayoutSaturationContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="saturation_container"
            params={16}
            layout={{ width: 262, height: 143, flexShrink: 0, ...layout }}
        >
            <Region
                name="options_title"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 123, top: 0, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOptionsTitle ?? t('widget.areahide.options')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="options_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 262, top: 20, height: 123 }}
            >
                <Region
                    name="wallitem_option"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 262, top: 0, height: 55 }}
                >
                    <CheckBox
                        variant="0"
                        name="wallitems_checkbox"
                        params={17}
                        onPointerTap={onWallitemsCheckbox}
                        layout={{ position: 'absolute', left: 1, width: 18, top: 0, height: 18 }}
                    />
                    <Region
                        name="wallitems_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 20, width: 240, top: 0, height: 15, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionWallitemsTxt ?? t('widget.areahide.options.wallitems')}
                            textStyle="text-style-u-small"
                            textOptions={{ wordWrap: true, wordWrapWidth: 240 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="invert_option"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 262, top: 20, height: 43 }}
                >
                    <CheckBox
                        variant="0"
                        name="invert_checkbox"
                        params={17}
                        onPointerTap={onInvertCheckbox}
                        layout={{ position: 'absolute', left: 1, width: 18, top: 0, height: 18 }}
                    />
                    <Region
                        name="invert_txt"
                        params={16}
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
                        params={16}
                        layout={{ position: 'absolute', left: 20, width: 242, top: 16, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInvertInfo ?? t('widget.areahide.options.invert.info')}
                            textStyle="text-style-u-small"
                            textOptions={{ fill: '#999999', wordWrap: true, wordWrapWidth: 242 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="invisibility_option"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 262, top: 68, height: 55 }}
                >
                    <CheckBox
                        variant="0"
                        name="invisiblity_checkbox"
                        params={17}
                        onPointerTap={onInvisiblityCheckbox}
                        layout={{ position: 'absolute', left: 1, width: 18, top: 0, height: 18 }}
                    />
                    <Region
                        name="invisibility_txt"
                        params={16}
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
                        params={16}
                        layout={{ position: 'absolute', left: 20, width: 242, top: 16, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInvisibilityInfo ?? t('widget.areahide.options.invisibility.info')}
                            textStyle="text-style-u-small"
                            textOptions={{ fill: '#999999', wordWrap: true, wordWrapWidth: 242 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
