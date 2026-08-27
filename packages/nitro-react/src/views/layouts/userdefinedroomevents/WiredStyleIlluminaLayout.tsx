import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1171_wired_style_illumina_xml` (layout "wired_style_illumina", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleIlluminaLayoutProps {
    captionLimitText?: string;
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    itemsMenuList?: ReactNode;
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
    onAssetButton?: () => void;
    onButton?: () => void;
    onCheckboxView?: () => void;
    onDropdownView?: () => void;
    onExpandCollapseRegion?: () => void;
    onFrame?: () => void;
    onIconbuttonDown?: () => void;
    onIconbuttonLeft?: () => void;
    onIconbuttonRight?: () => void;
    onIconbuttonUp?: () => void;
    onMiniButtonClick?: () => void;
    onRadiobuttonView?: () => void;
    srcAsset?: string;
    srcDownArrow?: string;
    srcMiniButtonIcon?: string;
    srcSliderBase?: string;
    srcSliderButton?: string;
    srcUpArrow?: string;
    visibleAssetButton?: boolean;
    visibleButton?: boolean;
    visibleCharLimitWarn?: boolean;
    visibleCheckboxView?: boolean;
    visibleDropdownView?: boolean;
    visibleExpandCollapseRegion?: boolean;
    visibleIconbuttonDown?: boolean;
    visibleIconbuttonLeft?: boolean;
    visibleIconbuttonRight?: boolean;
    visibleIconbuttonUp?: boolean;
    visibleInputTemplate?: boolean;
    visibleQuickMenu?: boolean;
    visibleRadiobuttonView?: boolean;
    visibleRulerView?: boolean;
    visibleSlider?: boolean;
}

export const WiredStyleIlluminaLayout = ({ captionLimitText, captionTextBoldView, captionTextHtml, captionTextView, itemsMenuList, itemsSourcetypeSelectorView, layout, onAssetButton, onButton, onCheckboxView, onDropdownView, onExpandCollapseRegion, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onMiniButtonClick, onRadiobuttonView, srcAsset, srcDownArrow, srcMiniButtonIcon, srcSliderBase, srcSliderButton, srcUpArrow, visibleAssetButton, visibleButton, visibleCharLimitWarn, visibleCheckboxView, visibleDropdownView, visibleExpandCollapseRegion, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInputTemplate, visibleQuickMenu, visibleRadiobuttonView, visibleRulerView, visibleSlider }: WiredStyleIlluminaLayoutProps) => {
    const t = useTranslation();
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
                params={16}
                backgroundColor="#e2e2e2"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
            >
                <Region
                    name="ruler_view"
                    params={16}
                    visible={visibleRulerView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 2 }}
                >
                    <Region
                        params={4194448}
                        backgroundColor="#aaaaaa"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1 }}
                    />
                    <Region
                        params={4194448}
                        backgroundColor="#ffffff"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 1 }}
                    />
                </Region>
                <Region
                    name="text_view"
                    params={147472}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextView ?? 'some text'}
                        textStyle="text-style-il-regular"
                    />
                </Region>
                <Region
                    name="text_bold_view"
                    params={147472}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 82, top: 0, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextBoldView ?? 'some bold text'}
                        textStyle="text-style-il-regular"
                    />
                </Region>
                <Region
                    name="text_html"
                    params={1073741840}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 97, top: 0, height: 16, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextHtml ?? 'Use this by typing'}
                        textStyle="text-style-il-regular"
                    />
                </Region>
                <Region
                    visible={visibleInputTemplate ?? false}
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 21 }}
                >
                    <Border
                        variant="105"
                        name="input_template"
                        params={16}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <TextInput
                            value={fieldValue}
                            onChange={setFieldValue}
                            textColor="#4a4a4a"
                            layout={{ position: 'absolute', left: 4, right: 4, top: 2, bottom: 3 }}
                        />
                        <Region
                            name="char_limit_warn"
                            params={64}
                            visible={visibleCharLimitWarn ?? false}
                            layout={{ position: 'absolute', right: 0, width: 116, top: -30, height: 50 }}
                        >
                            <Border
                                variant="2"
                                params={262160}
                                tintColor="#222222"
                                blend={0.7}
                                layout={{ position: 'absolute', right: 0, width: 49, top: 10, height: 17 }}
                            >
                                <Region
                                    name="limit_text"
                                    params={4194320}
                                    layout={{ position: 'absolute', left: 5, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionLimitText ?? '95/100'}
                                        textStyle="text-style-il-regular-white"
                                    />
                                </Region>
                            </Border>
                        </Region>
                    </Border>
                </Region>
                <Region
                    visible={visibleDropdownView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 22 }}
                >
                    <Dropmenu
                        variant="100"
                        name="dropdown_view"
                        params={17}
                        onPointerTap={onDropdownView}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    visible={visibleCheckboxView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 21, minHeight: 21, maxHeight: 21 }}
                >
                    <CheckBox
                        variant="101"
                        name="checkbox_view"
                        params={17}
                        onPointerTap={onCheckboxView}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    visible={visibleRadiobuttonView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 16, minHeight: 16, maxHeight: 16 }}
                >
                    <RadioButton
                        variant="100"
                        name="radiobutton_view"
                        params={17}
                        onPointerTap={onRadiobuttonView}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="expand_collapse_region"
                    params={17}
                    visible={visibleExpandCollapseRegion ?? false}
                    onPointerTap={onExpandCollapseRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 16, top: 2, height: 12 }}
                >
                    <ThemeImage
                        name="up_arrow"
                        params={16}
                        src={srcUpArrow ?? layoutImage('wired_volter_uparrow.png')}
                        tint="#999999"
                        layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 10 }}
                    />
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 10 }}
                    >
                        <ThemeImage
                            name="down_arrow"
                            params={16}
                            src={srcDownArrow ?? layoutImage('wired_volter_downarrow.png')}
                            tint="#999999"
                            layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 10 }}
                        />
                    </Region>
                </Region>
                <Region
                    visible={visibleIconbuttonLeft ?? false}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ContainerButton
                        variant="102"
                        name="iconbutton_left"
                        params={17}
                        onPointerTap={onIconbuttonLeft}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="2"
                            params={16}
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 5, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={visibleIconbuttonRight ?? false}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ContainerButton
                        variant="102"
                        name="iconbutton_right"
                        params={17}
                        onPointerTap={onIconbuttonRight}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="3"
                            params={16}
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 5, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={visibleIconbuttonUp ?? false}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ContainerButton
                        variant="102"
                        name="iconbutton_up"
                        params={17}
                        onPointerTap={onIconbuttonUp}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="1"
                            params={16}
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 6, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={visibleIconbuttonDown ?? false}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ContainerButton
                        variant="102"
                        name="iconbutton_down"
                        params={17}
                        onPointerTap={onIconbuttonDown}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="0"
                            params={16}
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 6, width: 12, top: 6, height: 12 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={visibleButton ?? false}
                    layout={{ position: 'absolute', left: 0, width: 49, top: 0, height: 22 }}
                >
                    <Button
                        variant="102"
                        name="button"
                        params={131089}
                        onPointerTap={onButton}
                        textStyle="text-style-il-button"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        text
                    </Button>
                </Region>
                <Frame
                    variant="102"
                    id="frame"
                    name="frame"
                    params={32769}
                    visible={false}
                    caption={t('wiredfurni.title')}
                    tintColor="#3e3e3e"
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 0, width: 240, top: 0, height: 200, minWidth: 100 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%' }} />
                </Frame>
                <Region
                    visible={visibleQuickMenu ?? false}
                    layout={{ position: 'absolute', left: 0, width: 145, top: 0, height: 27 }}
                >
                    <Border
                        variant="3"
                        name="quick_menu"
                        params={1}
                        tintColor="#000000"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Border
                            variant="11"
                            params={2192}
                            tintColor="#f2f2f2"
                            layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                        >
                            <Border
                                variant="11"
                                params={2192}
                                tintColor="#d6d6d6"
                                layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                            >
                                <Region
                                    name="menu_list"
                                    params={144}
                                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 23, flexDirection: 'column' }}
                                >
                                    {itemsMenuList ?? (
                                        <>
                                            <WiredStyleIlluminaLayoutMenuItemTemplateItem />
                                            <WiredStyleIlluminaLayoutSpacerTemplateItem />
                                        </>
                                    )}
                                </Region>
                            </Border>
                        </Border>
                    </Border>
                </Region>
                <Region
                    name="sourcetype_selector_view"
                    tags={[ 'NEW' ]}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 19, flexDirection: 'row' }}
                >
                    {itemsSourcetypeSelectorView ?? (
                        <>
                            <WiredStyleIlluminaLayoutLeftButtonTemplateItem />
                            <WiredStyleIlluminaLayoutSplitterTemplateItem />
                            <WiredStyleIlluminaLayoutMiddleButtonTemplateItem />
                            <WiredStyleIlluminaLayoutSplitterTemplateItem2 />
                            <WiredStyleIlluminaLayoutRightButtonTemplateItem />
                        </>
                    )}
                </Region>
                <Region
                    name="slider"
                    params={16}
                    visible={visibleSlider ?? false}
                    layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 18 }}
                >
                    <ThemeImage
                        name="slider_base"
                        params={144}
                        src={srcSliderBase ?? layoutImage('wired_styles_volter_slider_bg.png')}
                        tint="#999999"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 19 }}
                    />
                    <Region
                        name="slider_movement_area"
                        params={144}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 17 }}
                    >
                        <ThemeImage
                            name="slider_button"
                            params={33073}
                            src={srcSliderButton ?? layoutImage('wired_styles_illumina_slider_obj.png')}
                            layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 17 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="mini_button_view"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 19 }}
                >
                    <ContainerButton
                        variant="102"
                        name="mini_button_click"
                        params={17}
                        onPointerTap={onMiniButtonClick}
                        layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 19, maxWidth: 19 }}
                    >
                        <ThemeImage
                            name="mini_button_icon"
                            params={16}
                            src={srcMiniButtonIcon}
                            layout={{ position: 'absolute', left: 3, width: 13, top: 2, height: 15 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={visibleAssetButton ?? false}
                    layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
                >
                    <ContainerButton
                        variant="102"
                        name="asset_button"
                        params={1}
                        dynamicStyle="button"
                        onPointerTap={onAssetButton}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <ThemeImage
                            name="asset"
                            tags={[ '#icon' ]}
                            params={12582928}
                            src={srcAsset}
                            layout={{ position: 'absolute', left: 5, top: 5 }}
                        />
                    </ContainerButton>
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `menu_item_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutMenuItemTemplateItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onCheckbox?: () => void;
    onMenuItemTemplate?: () => void;
    visibleCheckbox?: boolean;
}

export const WiredStyleIlluminaLayoutMenuItemTemplateItem = ({ captionText, layout, onCheckbox, onMenuItemTemplate, visibleCheckbox }: WiredStyleIlluminaLayoutMenuItemTemplateItemProps) => {
    return (
        <Region
            name="menu_item_template"
            params={145}
            onPointerTap={onMenuItemTemplate}
            cursor="pointer"
            layout={{ width: 141, height: 20, flexShrink: 0, ...layout }}
        >
            <Region
                visible={visibleCheckbox ?? false}
                layout={{ position: 'absolute', left: 6, width: 19, top: 1, height: 21, minHeight: 21, maxHeight: 21 }}
            >
                <CheckBox
                    variant="101"
                    name="checkbox"
                    params={17}
                    onPointerTap={onCheckbox}
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
            <Region
                name="text"
                params={16}
                layout={{ position: 'absolute', left: 28, width: 101, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionText ?? 'Copy configuration'}
                    textStyle="text-style-il-regular"
                />
            </Region>
        </Region>
    );
};

/** Row template `spacer_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutSpacerTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleIlluminaLayoutSpacerTemplateItem = ({ layout }: WiredStyleIlluminaLayoutSpacerTemplateItemProps) => {
    return (
        <Region
            name="spacer_template"
            params={144}
            layout={{ width: 141, height: 3, flexShrink: 0, ...layout }}
        >
            <Region
                params={144}
                backgroundColor="#aaaaaa"
                layout={{ position: 'absolute', left: 6, right: 6, top: 1, height: 1 }}
            />
        </Region>
    );
};

/** Row template `left_button_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutLeftButtonTemplateItemProps {
    layout?: BoxLayout;
    onLeftButtonTemplate?: () => void;
    srcTypeImage?: string;
}

export const WiredStyleIlluminaLayoutLeftButtonTemplateItem = ({ layout, onLeftButtonTemplate, srcTypeImage }: WiredStyleIlluminaLayoutLeftButtonTemplateItemProps) => {
    return (
        <ContainerButton
            variant="104"
            name="left_button_template"
            params={1}
            dynamicStyle="button"
            onPointerTap={onLeftButtonTemplate}
            layout={{ width: 17, height: 19, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="type_image"
                tags={[ '#icon' ]}
                params={4194320}
                src={srcTypeImage ?? layoutImage('wired_styles_illumina_icon_source_furni.png')}
                layout={{ position: 'absolute', left: 6, top: 4, height: 11 }}
            />
        </ContainerButton>
    );
};

/** Row template `splitter_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutSplitterTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleIlluminaLayoutSplitterTemplateItem = ({ layout }: WiredStyleIlluminaLayoutSplitterTemplateItemProps) => {
    return (
        <Region
            name="splitter_template"
            params={16}
            layout={{ width: 1, height: 19, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                backgroundColor="#919191"
                layout={{ position: 'absolute', left: 0, width: 1, top: 0, height: 18 }}
            />
            <Region
                params={16}
                backgroundColor="#f2f2f2"
                layout={{ position: 'absolute', left: 0, width: 1, top: 18, height: 1 }}
            />
        </Region>
    );
};

/** Row template `middle_button_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutMiddleButtonTemplateItemProps {
    layout?: BoxLayout;
    onMiddleButtonTemplate?: () => void;
    srcTypeImage?: string;
}

export const WiredStyleIlluminaLayoutMiddleButtonTemplateItem = ({ layout, onMiddleButtonTemplate, srcTypeImage }: WiredStyleIlluminaLayoutMiddleButtonTemplateItemProps) => {
    return (
        <ContainerButton
            variant="106"
            name="middle_button_template"
            params={1}
            dynamicStyle="button"
            onPointerTap={onMiddleButtonTemplate}
            layout={{ width: 14, height: 19, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="type_image"
                tags={[ '#icon' ]}
                params={4194320}
                src={srcTypeImage ?? layoutImage('wired_styles_illumina_icon_source_users.png')}
                layout={{ position: 'absolute', left: 3, top: 5, height: 10 }}
            />
        </ContainerButton>
    );
};

/** Row template `splitter_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutSplitterTemplateItem2Props {
    layout?: BoxLayout;
}

export const WiredStyleIlluminaLayoutSplitterTemplateItem2 = ({ layout }: WiredStyleIlluminaLayoutSplitterTemplateItem2Props) => {
    return (
        <Region
            name="splitter_template"
            params={16}
            layout={{ width: 1, height: 19, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                backgroundColor="#919191"
                layout={{ position: 'absolute', left: 0, width: 1, top: 0, height: 18 }}
            />
            <Region
                params={16}
                backgroundColor="#f2f2f2"
                layout={{ position: 'absolute', left: 0, width: 1, top: 18, height: 1 }}
            />
        </Region>
    );
};

/** Row template `right_button_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutRightButtonTemplateItemProps {
    layout?: BoxLayout;
    onRightButtonTemplate?: () => void;
    srcTypeImage?: string;
}

export const WiredStyleIlluminaLayoutRightButtonTemplateItem = ({ layout, onRightButtonTemplate, srcTypeImage }: WiredStyleIlluminaLayoutRightButtonTemplateItemProps) => {
    return (
        <ContainerButton
            variant="105"
            name="right_button_template"
            params={1}
            dynamicStyle="button"
            onPointerTap={onRightButtonTemplate}
            layout={{ width: 17, height: 19, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="type_image"
                tags={[ '#icon' ]}
                params={4194320}
                src={srcTypeImage ?? layoutImage('wired_styles_illumina_icon_source_global.png')}
                layout={{ position: 'absolute', left: 4, top: 6, height: 7 }}
            />
        </ContainerButton>
    );
};
