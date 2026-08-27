import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1157_wired_style_volter_yellow_xml` (layout "wired_style_volter_yellow", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleVolterYellowLayoutProps {
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    itemsMenuList?: ReactNode;
    itemsMiniButtonView?: ReactNode;
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
    onButton?: () => void;
    onCheckboxView?: () => void;
    onDropdownView?: () => void;
    onExpandCollapseRegion?: () => void;
    onFrame?: () => void;
    onIconbuttonDown?: () => void;
    onIconbuttonLeft?: () => void;
    onIconbuttonRight?: () => void;
    onIconbuttonUp?: () => void;
    onRadiobuttonView?: () => void;
    srcDownArrow?: string;
    srcSliderBase?: string;
    srcSliderButton?: string;
    srcUpArrow?: string;
    visibleButton?: boolean;
    visibleCheckboxView?: boolean;
    visibleDropdownView?: boolean;
    visibleExpandCollapseRegion?: boolean;
    visibleIconbuttonDown?: boolean;
    visibleIconbuttonLeft?: boolean;
    visibleIconbuttonRight?: boolean;
    visibleIconbuttonUp?: boolean;
    visibleInnerBorder?: boolean;
    visibleInputTemplate?: boolean;
    visibleQuickMenu?: boolean;
    visibleRulerView?: boolean;
    visibleSlider?: boolean;
}

export const WiredStyleVolterYellowLayout = ({ captionTextBoldView, captionTextHtml, captionTextView, itemsMenuList, itemsMiniButtonView, itemsSourcetypeSelectorView, layout, onButton, onCheckboxView, onDropdownView, onExpandCollapseRegion, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onRadiobuttonView, srcDownArrow, srcSliderBase, srcSliderButton, srcUpArrow, visibleButton, visibleCheckboxView, visibleDropdownView, visibleExpandCollapseRegion, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInnerBorder, visibleInputTemplate, visibleQuickMenu, visibleRulerView, visibleSlider }: WiredStyleVolterYellowLayoutProps) => {
    const t = useTranslation();
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
                params={16}
                backgroundColor="#f4d763"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
            >
                <Region
                    visible={visibleInnerBorder ?? false}
                    layout={{ position: 'absolute', left: 0, width: 119, top: 0, height: 98 }}
                >
                    <Border
                        variant="13"
                        name="inner_border"
                        params={16}
                        tintColor="#faea7c"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Frame
                    variant="2"
                    id="frame"
                    name="frame"
                    params={32769}
                    visible={false}
                    caption={t('wiredfurni.title')}
                    tintColor="#fac200"
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 200, minWidth: 100 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%' }} />
                </Frame>
                <Region
                    name="ruler_view"
                    params={16}
                    visible={visibleRulerView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1 }}
                >
                    <Region
                        params={4194448}
                        backgroundColor="#222222"
                        layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1 }}
                    />
                </Region>
                <Region
                    name="text_view"
                    params={147472}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 56, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextView ?? 'some text'}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#222222' }}
                    />
                </Region>
                <Region
                    name="text_bold_view"
                    params={147472}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 92, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextBoldView ?? 'some bold text'}
                        textStyle="text-style-bold"
                        textOptions={{ fill: '#222222' }}
                    />
                </Region>
                <Region
                    name="text_html"
                    params={1073741840}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 96, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextHtml ?? 'Use this by typing'}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#222222' }}
                    />
                </Region>
                <Region
                    name="input_template"
                    params={16}
                    visible={visibleInputTemplate ?? false}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 15 }}
                >
                    <TextInput
                        value={fieldValue}
                        onChange={setFieldValue}
                        textColor="#222222"
                        layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 15 }}
                    />
                </Region>
                <Region
                    visible={visibleDropdownView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 22 }}
                >
                    <Dropmenu
                        variant="200"
                        name="dropdown_view"
                        params={17}
                        onPointerTap={onDropdownView}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    visible={visibleCheckboxView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 17 }}
                >
                    <CheckBox
                        variant="2"
                        name="checkbox_view"
                        params={17}
                        onPointerTap={onCheckboxView}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <RadioButton
                    variant="2"
                    name="radiobutton_view"
                    params={17}
                    onPointerTap={onRadiobuttonView}
                    layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 17 }}
                />
                <Region
                    name="expand_collapse_region"
                    params={17}
                    visible={visibleExpandCollapseRegion ?? false}
                    onPointerTap={onExpandCollapseRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 10 }}
                >
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 10 }}
                    >
                        <ThemeImage
                            name="up_arrow"
                            params={16}
                            src={srcUpArrow ?? layoutImage('wired_volter_uparrow.png')}
                            layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 10 }}
                        />
                    </Region>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 10 }}
                    >
                        <ThemeImage
                            name="down_arrow"
                            params={16}
                            src={srcDownArrow ?? layoutImage('wired_volter_downarrow.png')}
                            layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 10 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="sourcetype_selector_view"
                    params={147456}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 17, top: -2, height: 17, minHeight: 17, maxHeight: 17, flexDirection: 'row' }}
                >
                    {itemsSourcetypeSelectorView ?? (
                        <>
                            <WiredStyleVolterYellowLayoutLeftPaddingItem />
                            <WiredStyleVolterYellowLayoutSourceOptionsBorderItem />
                            <WiredStyleVolterYellowLayoutRightPaddingItem />
                        </>
                    )}
                </Region>
                <Region
                    visible={visibleIconbuttonLeft ?? false}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ContainerButton
                        variant="2"
                        name="iconbutton_left"
                        params={17}
                        onPointerTap={onIconbuttonLeft}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="2"
                            params={16}
                            tintColor="#777777"
                            layout={{ position: 'absolute', left: 5, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={visibleIconbuttonRight ?? false}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ContainerButton
                        variant="2"
                        name="iconbutton_right"
                        params={17}
                        onPointerTap={onIconbuttonRight}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="3"
                            params={16}
                            tintColor="#777777"
                            layout={{ position: 'absolute', left: 5, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={visibleIconbuttonUp ?? false}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ContainerButton
                        variant="2"
                        name="iconbutton_up"
                        params={17}
                        onPointerTap={onIconbuttonUp}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="1"
                            params={16}
                            tintColor="#777777"
                            layout={{ position: 'absolute', left: 6, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={visibleIconbuttonDown ?? false}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ContainerButton
                        variant="2"
                        name="iconbutton_down"
                        params={17}
                        onPointerTap={onIconbuttonDown}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="0"
                            params={16}
                            tintColor="#777777"
                            layout={{ position: 'absolute', left: 6, width: 12, top: 6, height: 12 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    name="slider"
                    params={16}
                    visible={visibleSlider ?? false}
                    layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 17 }}
                >
                    <ThemeImage
                        name="slider_base"
                        params={144}
                        src={srcSliderBase ?? layoutImage('wired_styles_volter_slider_bg.png')}
                        tint="#000000"
                        layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 17 }}
                    />
                    <Region
                        name="slider_movement_area"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 148, top: 1, height: 15 }}
                    >
                        <ThemeImage
                            name="slider_button"
                            params={33073}
                            src={srcSliderButton ?? layoutImage('wired_styles_volter_slider_obj.png')}
                            layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
                        />
                    </Region>
                </Region>
                <Region
                    visible={visibleButton ?? false}
                    layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 22 }}
                >
                    <Button
                        variant="2"
                        name="button"
                        params={131089}
                        onPointerTap={onButton}
                        textStyle="text-style-button-regular"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        text
                    </Button>
                </Region>
                <Region
                    name="mini_button_view"
                    params={147456}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 17, top: -2, height: 17, minHeight: 17, maxHeight: 17, flexDirection: 'row' }}
                >
                    {itemsMiniButtonView ?? (
                        <>
                            <WiredStyleVolterYellowLayoutLeftPaddingItem2 />
                            <WiredStyleVolterYellowLayoutMiniButtonBgItem />
                            <WiredStyleVolterYellowLayoutRightPaddingItem2 />
                        </>
                    )}
                </Region>
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
                            layout={{ position: 'absolute', left: 1, width: 143, top: 1, height: 25 }}
                        >
                            <Border
                                variant="11"
                                params={2192}
                                layout={{ position: 'absolute', left: 1, width: 141, top: 1, height: 23 }}
                            >
                                <Region
                                    name="menu_list"
                                    params={144}
                                    layout={{ position: 'absolute', left: 0, width: 141, top: 0, height: 23, flexDirection: 'column' }}
                                >
                                    {itemsMenuList ?? (
                                        <>
                                            <WiredStyleVolterYellowLayoutMenuItemTemplateItem />
                                            <WiredStyleVolterYellowLayoutSpacerTemplateItem />
                                        </>
                                    )}
                                </Region>
                            </Border>
                        </Border>
                    </Border>
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `left_padding` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutLeftPaddingItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterYellowLayoutLeftPaddingItem = ({ layout }: WiredStyleVolterYellowLayoutLeftPaddingItemProps) => {
    return (
        <Region
            name="left_padding"
            params={16}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="border"
                params={16}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1 }}
            />
            <Region
                name="border"
                params={16}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15 }}
            >
                <Region
                    name="margin_item_color_left"
                    params={16}
                    backgroundColor="#ffeda5"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `left_pad` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutLeftPadItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterYellowLayoutLeftPadItem = ({ layout }: WiredStyleVolterYellowLayoutLeftPadItemProps) => {
    return (
        <Region
            name="left_pad"
            params={16}
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Row template `type_icon_bitmap` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutTypeIconBitmapItemProps {
    layout?: BoxLayout;
    srcTypeIconBitmap?: string;
}

export const WiredStyleVolterYellowLayoutTypeIconBitmapItem = ({ layout, srcTypeIconBitmap }: WiredStyleVolterYellowLayoutTypeIconBitmapItemProps) => {
    return (
        <ThemeImage
            name="type_icon_bitmap"
            params={3932176}
            src={srcTypeIconBitmap}
            tint="#000000"
            layout={{ width: 9, height: 11, flexShrink: 0, minHeight: 11, maxHeight: 11, ...layout }}
        />
    );
};

/** Row template `right_pad` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutRightPadItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterYellowLayoutRightPadItem = ({ layout }: WiredStyleVolterYellowLayoutRightPadItemProps) => {
    return (
        <Region
            name="right_pad"
            params={16}
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Row template `source_btn` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutSourceBtnItemProps {
    itemsSourceElements?: ReactNode;
    layout?: BoxLayout;
    onSourceBtn?: () => void;
}

export const WiredStyleVolterYellowLayoutSourceBtnItem = ({ itemsSourceElements, layout, onSourceBtn }: WiredStyleVolterYellowLayoutSourceBtnItemProps) => {
    return (
        <Region
            name="source_btn"
            params={147473}
            backgroundColor="#ffffff"
            onPointerTap={onSourceBtn}
            cursor="pointer"
            layout={{ width: 13, height: 15, flexShrink: 0, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <Region
                name="source_elements"
                params={147600}
                backgroundColor="#ffeda5"
                layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 15, minHeight: 15, maxHeight: 15, flexDirection: 'row' }}
            >
                {itemsSourceElements ?? (
                    <>
                        <WiredStyleVolterYellowLayoutLeftPadItem />
                        <WiredStyleVolterYellowLayoutTypeIconBitmapItem />
                        <WiredStyleVolterYellowLayoutRightPadItem />
                    </>
                )}
            </Region>
        </Region>
    );
};

/** Row template `source_options_border` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutSourceOptionsBorderItemProps {
    itemsSourceOptionsList?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleVolterYellowLayoutSourceOptionsBorderItem = ({ itemsSourceOptionsList, layout }: WiredStyleVolterYellowLayoutSourceOptionsBorderItemProps) => {
    return (
        <Region
            name="source_options_border"
            params={149520}
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="source_options_cont"
                params={147600}
                backgroundColor="#ffeda5"
                layout={{ position: 'absolute', left: 0, width: 13, top: 1, height: 15, minHeight: 15, maxHeight: 15 }}
            >
                <Region
                    name="source_options_list"
                    params={147600}
                    layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 15, minHeight: 15, maxHeight: 15, flexDirection: 'row', gap: 1 }}
                >
                    {itemsSourceOptionsList ?? (
                        <WiredStyleVolterYellowLayoutSourceBtnItem />
                    )}
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `right_padding` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutRightPaddingItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterYellowLayoutRightPaddingItem = ({ layout }: WiredStyleVolterYellowLayoutRightPaddingItemProps) => {
    return (
        <Region
            name="right_padding"
            params={16}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="border"
                params={16}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15 }}
            >
                <Region
                    name="margin_item_color_right"
                    params={16}
                    backgroundColor="#ffeda5"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                />
            </Region>
            <Region
                name="border"
                params={16}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1 }}
            />
        </Region>
    );
};

/** Row template `left_padding` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutLeftPaddingItem2Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterYellowLayoutLeftPaddingItem2 = ({ layout }: WiredStyleVolterYellowLayoutLeftPaddingItem2Props) => {
    return (
        <Region
            name="left_padding"
            params={16}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="border"
                params={16}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1 }}
            />
            <Region
                name="border"
                params={16}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15 }}
            >
                <Region
                    name="margin_item_color_left"
                    params={16}
                    backgroundColor="#ffeda5"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `mini_button_bg` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutMiniButtonBgItemProps {
    layout?: BoxLayout;
    onMiniButtonClick?: () => void;
    srcMiniButtonIcon?: string;
}

export const WiredStyleVolterYellowLayoutMiniButtonBgItem = ({ layout, onMiniButtonClick, srcMiniButtonIcon }: WiredStyleVolterYellowLayoutMiniButtonBgItemProps) => {
    return (
        <Region
            name="mini_button_bg"
            params={149520}
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="mini_button_click"
                params={145}
                backgroundColor="#ffeda5"
                onPointerTap={onMiniButtonClick}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 13, top: 1, height: 15, minHeight: 15, maxHeight: 15 }}
            >
                <ThemeImage
                    name="mini_button_icon"
                    params={16}
                    src={srcMiniButtonIcon}
                    layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 15 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `right_padding` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutRightPaddingItem2Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterYellowLayoutRightPaddingItem2 = ({ layout }: WiredStyleVolterYellowLayoutRightPaddingItem2Props) => {
    return (
        <Region
            name="right_padding"
            params={16}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="border"
                params={16}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15 }}
            >
                <Region
                    name="margin_item_color_right"
                    params={16}
                    backgroundColor="#ffeda5"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                />
            </Region>
            <Region
                name="border"
                params={16}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1 }}
            />
        </Region>
    );
};

/** Row template `menu_item_template` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutMenuItemTemplateItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onCheckbox?: () => void;
    onMenuItemTemplate?: () => void;
}

export const WiredStyleVolterYellowLayoutMenuItemTemplateItem = ({ captionText, layout, onCheckbox, onMenuItemTemplate }: WiredStyleVolterYellowLayoutMenuItemTemplateItemProps) => {
    return (
        <Region
            name="menu_item_template"
            params={145}
            onPointerTap={onMenuItemTemplate}
            cursor="pointer"
            layout={{ width: 141, height: 20, flexShrink: 0, ...layout }}
        >
            <CheckBox
                variant="2"
                name="checkbox"
                params={17}
                onPointerTap={onCheckbox}
                layout={{ position: 'absolute', left: 6, width: 16, top: 3, height: 16 }}
            />
            <Region
                name="text"
                params={16}
                layout={{ position: 'absolute', left: 28, width: 99, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionText ?? 'Copy configuration'}
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#222222' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `spacer_template` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutSpacerTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterYellowLayoutSpacerTemplateItem = ({ layout }: WiredStyleVolterYellowLayoutSpacerTemplateItemProps) => {
    return (
        <Region
            name="spacer_template"
            params={144}
            layout={{ width: 141, height: 3, flexShrink: 0, ...layout }}
        >
            <Region
                params={144}
                backgroundColor="#999999"
                layout={{ position: 'absolute', left: 6, width: 129, top: 1, height: 1 }}
            />
        </Region>
    );
};
