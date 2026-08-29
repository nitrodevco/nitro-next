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
    layout?: BoxLayout;
    miniButtonView?: WiredStyleVolterLayoutMiniButtonViewProps;
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
    sourcetypeSelectorView?: WiredStyleVolterLayoutSourcetypeSelectorViewProps;
    srcAsset?: string;
    srcDownArrow?: string;
    srcSliderBase?: string;
    srcSliderButton?: string;
    srcUpArrow?: string;
    visibleButton?: boolean;
    visibleCheckboxView?: boolean;
    visibleDownArrow?: boolean;
    visibleDropdownView?: boolean;
    visibleExpandCollapseRegion?: boolean;
    visibleFrame?: boolean;
    visibleIconbuttonDown?: boolean;
    visibleIconbuttonLeft?: boolean;
    visibleIconbuttonRight?: boolean;
    visibleIconbuttonUp?: boolean;
    visibleInputTemplate?: boolean;
    visibleMiniButtonView?: boolean;
    visibleQuickMenu?: boolean;
    visibleRadiobuttonView?: boolean;
    visibleRulerView?: boolean;
    visibleSlider?: boolean;
    visibleSourcetypeSelectorView?: boolean;
    visibleTextBoldView?: boolean;
    visibleTextHtml?: boolean;
    visibleTextView?: boolean;
    visibleUpArrow?: boolean;
}

export const WiredStyleVolterLayout = ({ captionTextBoldView, captionTextHtml, captionTextView, itemsMenuList, layout, miniButtonView, onAssetButton, onButton, onCheckboxView, onDropdownView, onExpandCollapseRegion, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onRadiobuttonView, sourcetypeSelectorView, srcAsset, srcDownArrow, srcSliderBase, srcSliderButton, srcUpArrow, visibleButton, visibleCheckboxView, visibleDownArrow, visibleDropdownView, visibleExpandCollapseRegion, visibleFrame, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInputTemplate, visibleMiniButtonView, visibleQuickMenu, visibleRadiobuttonView, visibleRulerView, visibleSlider, visibleSourcetypeSelectorView, visibleTextBoldView, visibleTextHtml, visibleTextView, visibleUpArrow }: WiredStyleVolterLayoutProps) => {
    const t = useTranslation();
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
                backgroundColor="#3d3d3d"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
            >
                {(visibleRulerView ?? false) && (
                    <Region
                        name="ruler_view"
                        layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1 }}
                    >
                        <Region
                            backgroundColor="#232323"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1 }}
                        />
                    </Region>
                )}
                {(visibleTextView ?? false) && (
                    <Region
                        name="text_view"
                        layout={{ position: 'absolute', left: 0, width: 56, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTextView ?? 'some text'}
                            textStyle="text-style-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                )}
                {(visibleTextBoldView ?? false) && (
                    <Region
                        name="text_bold_view"
                        layout={{ position: 'absolute', left: 0, width: 92, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTextBoldView ?? 'some bold text'}
                            textStyle="text-style-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                )}
                {(visibleTextHtml ?? false) && (
                    <Region
                        name="text_html"
                        layout={{ position: 'absolute', left: 0, width: 96, top: 0, height: 13, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTextHtml ?? 'Use this by typing'}
                            textStyle="text-style-regular"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                )}
                {(visibleInputTemplate ?? false) && (
                    <Region
                        name="input_template"
                        layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 15 }}
                    >
                        <TextInput
                            value={fieldValue}
                            onChange={setFieldValue}
                            textColor="#ffffff"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    </Region>
                )}
                {(visibleDropdownView ?? false) && (
                    <Dropmenu
                        variant="200"
                        name="dropdown_view"
                        onPointerTap={onDropdownView}
                        layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 22 }}
                    />
                )}
                {(visibleCheckboxView ?? false) && (
                    <CheckBox
                        variant="1"
                        name="checkbox_view"
                        onPointerTap={onCheckboxView}
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 17 }}
                    />
                )}
                {(visibleRadiobuttonView ?? false) && (
                    <RadioButton
                        variant="1"
                        name="radiobutton_view"
                        onPointerTap={onRadiobuttonView}
                        layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 16 }}
                    />
                )}
                {(visibleExpandCollapseRegion ?? false) && (
                    <Region
                        name="expand_collapse_region"
                        backgroundColor="#3d3d3d"
                        onPointerTap={onExpandCollapseRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 10 }}
                    >
                        {(visibleUpArrow ?? false) && (
                            <ThemeImage
                                name="up_arrow"
                                src={srcUpArrow ?? layoutImage('wired_volter_uparrow.png')}
                                layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 10 }}
                            />
                        )}
                        {(visibleDownArrow ?? false) && (
                            <ThemeImage
                                name="down_arrow"
                                src={srcDownArrow ?? layoutImage('wired_volter_downarrow.png')}
                                layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 10 }}
                            />
                        )}
                    </Region>
                )}
                {(visibleSourcetypeSelectorView ?? false) && (
                    <WiredStyleVolterLayoutSourcetypeSelectorView {...sourcetypeSelectorView} />
                )}
                {(visibleIconbuttonLeft ?? false) && (
                    <ContainerButton
                        variant="1"
                        name="iconbutton_left"
                        onPointerTap={onIconbuttonLeft}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    >
                        <Icon
                            variant="2"
                            tintColor="#777777"
                            layout={{ position: 'absolute', left: 5, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                )}
                {(visibleIconbuttonRight ?? false) && (
                    <ContainerButton
                        variant="1"
                        name="iconbutton_right"
                        onPointerTap={onIconbuttonRight}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    >
                        <Icon
                            variant="3"
                            tintColor="#777777"
                            layout={{ position: 'absolute', left: 5, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                )}
                {(visibleIconbuttonUp ?? false) && (
                    <ContainerButton
                        variant="1"
                        name="iconbutton_up"
                        onPointerTap={onIconbuttonUp}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    >
                        <Icon
                            variant="1"
                            tintColor="#777777"
                            layout={{ position: 'absolute', left: 6, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                )}
                {(visibleIconbuttonDown ?? false) && (
                    <ContainerButton
                        variant="1"
                        name="iconbutton_down"
                        onPointerTap={onIconbuttonDown}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    >
                        <Icon
                            variant="0"
                            tintColor="#777777"
                            layout={{ position: 'absolute', left: 6, width: 12, top: 6, height: 12 }}
                        />
                    </ContainerButton>
                )}
                {(visibleSlider ?? false) && (
                    <Region
                        name="slider"
                        layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 17 }}
                    >
                        <ThemeImage
                            name="slider_base"
                            src={srcSliderBase ?? layoutImage('wired_styles_volter_slider_bg.png')}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17 }}
                        />
                        <Region
                            name="slider_movement_area"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15 }}
                        >
                            <ThemeImage
                                name="slider_button"
                                src={srcSliderButton ?? layoutImage('wired_styles_volter_slider_obj.png')}
                                layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
                            />
                        </Region>
                    </Region>
                )}
                {(visibleButton ?? false) && (
                    <Button
                        variant="1"
                        name="button"
                        onPointerTap={onButton}
                        textStyle="text-style-button-regular"
                        layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 22 }}
                    >
                        text
                    </Button>
                )}
                {(visibleFrame ?? false) && (
                    <Frame
                        variant="0"
                        id="frame"
                        name="frame"
                        caption={t('wiredfurni.title')}
                        tintColor="#3e3e3e"
                        onClose={onFrame}
                        layout={{ position: 'absolute', left: 0, width: 240, top: 0, height: 200, minWidth: 100 }}
                    />
                )}
                {(visibleMiniButtonView ?? false) && (
                    <WiredStyleVolterLayoutMiniButtonView {...miniButtonView} />
                )}
                {(visibleQuickMenu ?? false) && (
                    <Border
                        variant="3"
                        name="quick_menu"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 145, top: 0, height: 27 }}
                    >
                        <Border
                            variant="11"
                            tintColor="#5a5a5a"
                            layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                        >
                            <Border
                                variant="11"
                                tintColor="#424242"
                                layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                            >
                                <Region
                                    name="menu_list"
                                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 23, flexDirection: 'column' }}
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
                )}
                <ContainerButton
                    variant="1"
                    name="asset_button"
                    dynamicStyle="button"
                    onPointerTap={onAssetButton}
                    layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
                >
                    <ThemeImage
                        name="asset"
                        src={srcAsset}
                        layout={{ position: 'absolute', left: 5, top: 5 }}
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
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="border"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1 }}
            />
            <Region
                name="border"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15 }}
            >
                <Region
                    name="margin_item_color_left"
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
            backgroundColor="#ffffff"
            onPointerTap={onSourceBtn}
            cursor="pointer"
            layout={{ width: 13, height: 15, flexShrink: 0, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <Region
                name="source_elements"
                backgroundColor="#333333"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row' }}
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
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="source_options_cont"
                backgroundColor="#181818"
                layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, minHeight: 15, maxHeight: 15 }}
            >
                <Region
                    name="source_options_list"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row', gap: 1 }}
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
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="border"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15 }}
            >
                <Region
                    name="margin_item_color_right"
                    backgroundColor="#222222"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                />
            </Region>
            <Region
                name="border"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1 }}
            />
        </Region>
    );
};

/** Named region `sourcetype_selector_view` of WiredStyleVolterLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleVolterLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
    visibleSourcetypeSelectorView?: boolean;
}

export const WiredStyleVolterLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout, visibleSourcetypeSelectorView }: WiredStyleVolterLayoutSourcetypeSelectorViewProps) => {
    return (
        (visibleSourcetypeSelectorView ?? false) && (
            <Region
                name="sourcetype_selector_view"
                layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
            >
                {itemsSourcetypeSelectorView ?? (
                    <>
                        <WiredStyleVolterLayoutLeftPaddingItem />
                        <WiredStyleVolterLayoutSourceOptionsBorderItem />
                        <WiredStyleVolterLayoutRightPaddingItem />
                    </>
                )}
            </Region>
        )
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
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="border"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1 }}
            />
            <Region
                name="border"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15 }}
            >
                <Region
                    name="margin_item_color_left"
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
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="mini_button_click"
                backgroundColor="#333333"
                onPointerTap={onMiniButtonClick}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, minHeight: 15, maxHeight: 15 }}
            >
                <ThemeImage
                    name="mini_button_icon"
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
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="border"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15 }}
            >
                <Region
                    name="margin_item_color_right"
                    backgroundColor="#333333"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                />
            </Region>
            <Region
                name="border"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1 }}
            />
        </Region>
    );
};

/** Named region `mini_button_view` of WiredStyleVolterLayout - configured through the parent's `miniButtonView` prop. */
export interface WiredStyleVolterLayoutMiniButtonViewProps {
    itemsMiniButtonView?: ReactNode;
    layout?: BoxLayout;
    visibleMiniButtonView?: boolean;
}

export const WiredStyleVolterLayoutMiniButtonView = ({ itemsMiniButtonView, layout, visibleMiniButtonView }: WiredStyleVolterLayoutMiniButtonViewProps) => {
    return (
        (visibleMiniButtonView ?? false) && (
            <Region
                name="mini_button_view"
                layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
            >
                {itemsMiniButtonView ?? (
                    <>
                        <WiredStyleVolterLayoutLeftPaddingItem2 />
                        <WiredStyleVolterLayoutMiniButtonBgItem />
                        <WiredStyleVolterLayoutRightPaddingItem2 />
                    </>
                )}
            </Region>
        )
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
            onPointerTap={onMenuItemTemplate}
            cursor="pointer"
            layout={{ width: 141, height: 20, flexShrink: 0, ...layout }}
        >
            <CheckBox
                variant="1"
                name="checkbox"
                onPointerTap={onCheckbox}
                layout={{ position: 'absolute', left: 6, width: 16, top: 3, height: 16 }}
            />
            <Region
                name="text"
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
            layout={{ width: 141, height: 3, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#666666"
                layout={{ position: 'absolute', left: 6, right: 6, top: 1, height: 1 }}
            />
        </Region>
    );
};
