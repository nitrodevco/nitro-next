import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1165_wired_style_volter_xml` (layout "wired_style_volter", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleVolterLayoutProps {
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    itemsMenuList?: ReactNode;
    itemsMiniButtonView?: ReactNode;
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
    onRadiobuttonView?: () => void;
    srcAsset?: string;
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
    visibleInputTemplate?: boolean;
    visibleQuickMenu?: boolean;
    visibleRadiobuttonView?: boolean;
    visibleRulerView?: boolean;
    visibleSlider?: boolean;
}

export const WiredStyleVolterLayout = ({ captionTextBoldView, captionTextHtml, captionTextView, itemsMenuList, itemsMiniButtonView, itemsSourcetypeSelectorView, layout, onAssetButton, onButton, onCheckboxView, onDropdownView, onExpandCollapseRegion, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onRadiobuttonView, srcAsset, srcDownArrow, srcSliderBase, srcSliderButton, srcUpArrow, visibleButton, visibleCheckboxView, visibleDropdownView, visibleExpandCollapseRegion, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInputTemplate, visibleQuickMenu, visibleRadiobuttonView, visibleRulerView, visibleSlider }: WiredStyleVolterLayoutProps) => {
    const t = useTranslation();
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
                params={16}
                backgroundColor="#3d3d3d"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
            >
                <Region
                    name="ruler_view"
                    params={16}
                    visible={visibleRulerView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1 }}
                >
                    <Region
                        params={4194448}
                        backgroundColor="#232323"
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
                        textOptions={{ fill: '#ffffff' }}
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
                        textOptions={{ fill: '#ffffff' }}
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
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="input_template"
                    params={16}
                    visible={visibleInputTemplate ?? false}
                    layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 15 }}
                >
                    <TextInput
                        value={fieldValue}
                        onChange={setFieldValue}
                        textColor="#ffffff"
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
                        variant="1"
                        name="checkbox_view"
                        params={17}
                        onPointerTap={onCheckboxView}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    visible={visibleRadiobuttonView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 16 }}
                >
                    <RadioButton
                        variant="1"
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
                    backgroundColor="#3d3d3d"
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
                            <WiredStyleVolterLayoutLeftPaddingItem />
                            <WiredStyleVolterLayoutSourceOptionsBorderItem />
                            <WiredStyleVolterLayoutRightPaddingItem />
                        </>
                    )}
                </Region>
                <Region
                    visible={visibleIconbuttonLeft ?? false}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ContainerButton
                        variant="1"
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
                        variant="1"
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
                        variant="1"
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
                        variant="1"
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
                        variant="1"
                        name="button"
                        params={131089}
                        onPointerTap={onButton}
                        textStyle="text-style-button-regular"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        text
                    </Button>
                </Region>
                <Frame
                    variant="0"
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
                    name="mini_button_view"
                    params={147456}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 17, top: -2, height: 17, minHeight: 17, maxHeight: 17, flexDirection: 'row' }}
                >
                    {itemsMiniButtonView ?? (
                        <>
                            <WiredStyleVolterLayoutLeftPaddingItem2 />
                            <WiredStyleVolterLayoutMiniButtonBgItem />
                            <WiredStyleVolterLayoutRightPaddingItem2 />
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
                            tintColor="#5a5a5a"
                            layout={{ position: 'absolute', left: 1, width: 143, top: 1, height: 25 }}
                        >
                            <Border
                                variant="11"
                                params={2192}
                                tintColor="#424242"
                                layout={{ position: 'absolute', left: 1, width: 141, top: 1, height: 23 }}
                            >
                                <Region
                                    name="menu_list"
                                    params={144}
                                    layout={{ position: 'absolute', left: 0, width: 141, top: 0, height: 23, flexDirection: 'column' }}
                                >
                                    {itemsMenuList ?? (
                                        <>
                                            <WiredStyleVolterLayoutMenuItemTemplateItem />
                                            <WiredStyleVolterLayoutSpacerTemplateItem />
                                        </>
                                    )}
                                </Region>
                            </Border>
                        </Border>
                    </Border>
                </Region>
                <ContainerButton
                    variant="1"
                    name="asset_button"
                    params={1}
                    dynamicStyle="button"
                    onPointerTap={onAssetButton}
                    layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
                >
                    <ThemeImage
                        name="asset"
                        tags={[ '#icon' ]}
                        params={12582928}
                        src={srcAsset}
                        layout={{ position: 'absolute', left: 5, width: 15, top: 5, height: 15 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `left_padding` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutLeftPaddingItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterLayoutLeftPaddingItem = ({ layout }: WiredStyleVolterLayoutLeftPaddingItemProps) => {
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
                    backgroundColor="#333333"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `left_pad` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutLeftPadItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterLayoutLeftPadItem = ({ layout }: WiredStyleVolterLayoutLeftPadItemProps) => {
    return (
        <Region
            name="left_pad"
            params={16}
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Row template `type_icon_bitmap` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutTypeIconBitmapItemProps {
    layout?: BoxLayout;
    srcTypeIconBitmap?: string;
}

export const WiredStyleVolterLayoutTypeIconBitmapItem = ({ layout, srcTypeIconBitmap }: WiredStyleVolterLayoutTypeIconBitmapItemProps) => {
    return (
        <ThemeImage
            name="type_icon_bitmap"
            params={3932176}
            src={srcTypeIconBitmap}
            layout={{ width: 9, height: 11, flexShrink: 0, minHeight: 11, maxHeight: 11, ...layout }}
        />
    );
};

/** Row template `right_pad` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutRightPadItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterLayoutRightPadItem = ({ layout }: WiredStyleVolterLayoutRightPadItemProps) => {
    return (
        <Region
            name="right_pad"
            params={16}
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Row template `source_btn` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutSourceBtnItemProps {
    itemsSourceElements?: ReactNode;
    layout?: BoxLayout;
    onSourceBtn?: () => void;
}

export const WiredStyleVolterLayoutSourceBtnItem = ({ itemsSourceElements, layout, onSourceBtn }: WiredStyleVolterLayoutSourceBtnItemProps) => {
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
                backgroundColor="#333333"
                layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 15, minHeight: 15, maxHeight: 15, flexDirection: 'row' }}
            >
                {itemsSourceElements ?? (
                    <>
                        <WiredStyleVolterLayoutLeftPadItem />
                        <WiredStyleVolterLayoutTypeIconBitmapItem />
                        <WiredStyleVolterLayoutRightPadItem />
                    </>
                )}
            </Region>
        </Region>
    );
};

/** Row template `source_options_border` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutSourceOptionsBorderItemProps {
    itemsSourceOptionsList?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleVolterLayoutSourceOptionsBorderItem = ({ itemsSourceOptionsList, layout }: WiredStyleVolterLayoutSourceOptionsBorderItemProps) => {
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
                backgroundColor="#181818"
                layout={{ position: 'absolute', left: 0, width: 13, top: 1, height: 15, minHeight: 15, maxHeight: 15 }}
            >
                <Region
                    name="source_options_list"
                    params={147600}
                    layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 15, minHeight: 15, maxHeight: 15, flexDirection: 'row', gap: 1 }}
                >
                    {itemsSourceOptionsList ?? (
                        <WiredStyleVolterLayoutSourceBtnItem />
                    )}
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `right_padding` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutRightPaddingItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterLayoutRightPaddingItem = ({ layout }: WiredStyleVolterLayoutRightPaddingItemProps) => {
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
                    backgroundColor="#222222"
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

/** Row template `left_padding` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutLeftPaddingItem2Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterLayoutLeftPaddingItem2 = ({ layout }: WiredStyleVolterLayoutLeftPaddingItem2Props) => {
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
                    backgroundColor="#333333"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `mini_button_bg` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutMiniButtonBgItemProps {
    layout?: BoxLayout;
    onMiniButtonClick?: () => void;
    srcMiniButtonIcon?: string;
}

export const WiredStyleVolterLayoutMiniButtonBgItem = ({ layout, onMiniButtonClick, srcMiniButtonIcon }: WiredStyleVolterLayoutMiniButtonBgItemProps) => {
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
                backgroundColor="#333333"
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

/** Row template `right_padding` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutRightPaddingItem2Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterLayoutRightPaddingItem2 = ({ layout }: WiredStyleVolterLayoutRightPaddingItem2Props) => {
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
                    backgroundColor="#333333"
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

/** Row template `menu_item_template` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutMenuItemTemplateItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onCheckbox?: () => void;
    onMenuItemTemplate?: () => void;
}

export const WiredStyleVolterLayoutMenuItemTemplateItem = ({ captionText, layout, onCheckbox, onMenuItemTemplate }: WiredStyleVolterLayoutMenuItemTemplateItemProps) => {
    return (
        <Region
            name="menu_item_template"
            params={145}
            onPointerTap={onMenuItemTemplate}
            cursor="pointer"
            layout={{ width: 141, height: 20, flexShrink: 0, ...layout }}
        >
            <CheckBox
                variant="1"
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
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `spacer_template` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutSpacerTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterLayoutSpacerTemplateItem = ({ layout }: WiredStyleVolterLayoutSpacerTemplateItemProps) => {
    return (
        <Region
            name="spacer_template"
            params={144}
            layout={{ width: 141, height: 3, flexShrink: 0, ...layout }}
        >
            <Region
                params={144}
                backgroundColor="#666666"
                layout={{ position: 'absolute', left: 6, width: 129, top: 1, height: 1 }}
            />
        </Region>
    );
};
