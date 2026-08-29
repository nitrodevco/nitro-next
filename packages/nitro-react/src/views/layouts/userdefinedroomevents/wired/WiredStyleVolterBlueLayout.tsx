import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1182_wired_style_volter_blue_xml` (layout "wired_style_volter_blue", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleVolterBlueLayoutProps {
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    itemsMenuList?: ReactNode;
    layout?: BoxLayout;
    miniButtonView?: WiredStyleVolterBlueLayoutMiniButtonViewProps;
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
    sourcetypeSelectorView?: WiredStyleVolterBlueLayoutSourcetypeSelectorViewProps;
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
    visibleInnerBorder?: boolean;
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

export const WiredStyleVolterBlueLayout = ({ captionTextBoldView, captionTextHtml, captionTextView, itemsMenuList, layout, miniButtonView, onButton, onCheckboxView, onDropdownView, onExpandCollapseRegion, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onRadiobuttonView, sourcetypeSelectorView, srcDownArrow, srcSliderBase, srcSliderButton, srcUpArrow, visibleButton, visibleCheckboxView, visibleDownArrow, visibleDropdownView, visibleExpandCollapseRegion, visibleFrame, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInnerBorder, visibleInputTemplate, visibleMiniButtonView, visibleQuickMenu, visibleRadiobuttonView, visibleRulerView, visibleSlider, visibleSourcetypeSelectorView, visibleTextBoldView, visibleTextHtml, visibleTextView, visibleUpArrow }: WiredStyleVolterBlueLayoutProps) => {
    const t = useTranslation();
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
                backgroundColor="#f4d763"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
            >
                {(visibleInnerBorder ?? false) && (
                    <Border
                        variant="13"
                        name="inner_border"
                        tintColor="#c7d0d4"
                        layout={{ position: 'absolute', left: 0, width: 119, top: 0, height: 98 }}
                    />
                )}
                {(visibleFrame ?? false) && (
                    <Frame
                        variant="0"
                        id="frame"
                        name="frame"
                        caption={t('wiredfurni.title')}
                        tintColor="#7da9b5"
                        onClose={onFrame}
                        layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 200, minWidth: 100 }}
                    />
                )}
                {(visibleRulerView ?? false) && (
                    <Region
                        name="ruler_view"
                        layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1 }}
                    >
                        <Region
                            backgroundColor="#222222"
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
                            textOptions={{ fill: '#222222' }}
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
                            textOptions={{ fill: '#222222' }}
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
                            textOptions={{ fill: '#222222' }}
                        />
                    </Region>
                )}
                {(visibleInputTemplate ?? false) && (
                    <Region
                        name="input_template"
                        backgroundColor="#ffffff"
                        layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 15 }}
                    >
                        <TextInput
                            value={fieldValue}
                            onChange={setFieldValue}
                            textColor="#222222"
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
                        variant="2"
                        name="checkbox_view"
                        onPointerTap={onCheckboxView}
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 17 }}
                    />
                )}
                {(visibleRadiobuttonView ?? false) && (
                    <RadioButton
                        variant="2"
                        name="radiobutton_view"
                        onPointerTap={onRadiobuttonView}
                        layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 17 }}
                    />
                )}
                {(visibleExpandCollapseRegion ?? false) && (
                    <Region
                        name="expand_collapse_region"
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
                    <WiredStyleVolterBlueLayoutSourcetypeSelectorView {...sourcetypeSelectorView} />
                )}
                {(visibleIconbuttonLeft ?? false) && (
                    <ContainerButton
                        variant="2"
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
                        variant="2"
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
                        variant="2"
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
                        variant="2"
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
                            tint="#000000"
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
                        variant="2"
                        name="button"
                        onPointerTap={onButton}
                        textStyle="text-style-button-regular"
                        layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 22 }}
                    >
                        text
                    </Button>
                )}
                {(visibleMiniButtonView ?? false) && (
                    <WiredStyleVolterBlueLayoutMiniButtonView {...miniButtonView} />
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
                            layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                        >
                            <Border
                                variant="11"
                                layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                            >
                                <Region
                                    name="menu_list"
                                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 23, flexDirection: 'column' }}
                                >
                                    {itemsMenuList ?? (
                                        <>
                                            <WiredStyleVolterBlueLayoutMenuItemTemplateItem />
                                            <WiredStyleVolterBlueLayoutSpacerTemplateItem />
                                        </>
                                    )}
                                </Region>
                            </Border>
                        </Border>
                    </Border>
                )}
            </Region>
        </Region>
    );
};

/** Row template `left_padding` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutLeftPaddingItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutLeftPaddingItem = ({ layout }: WiredStyleVolterBlueLayoutLeftPaddingItemProps) => {
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
                    backgroundColor="#ffeda5"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `left_pad` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutLeftPadItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutLeftPadItem = ({ layout }: WiredStyleVolterBlueLayoutLeftPadItemProps) => {
    return (
        <Region
            name="left_pad"
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Row template `type_icon_bitmap` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutTypeIconBitmapItemProps {
    layout?: BoxLayout;
    srcTypeIconBitmap?: string;
}

export const WiredStyleVolterBlueLayoutTypeIconBitmapItem = ({ layout, srcTypeIconBitmap }: WiredStyleVolterBlueLayoutTypeIconBitmapItemProps) => {
    return (
        <ThemeImage
            name="type_icon_bitmap"
            src={srcTypeIconBitmap}
            tint="#000000"
            layout={{ width: 9, height: 11, flexShrink: 0, minHeight: 11, maxHeight: 11, ...layout }}
        />
    );
};

/** Row template `right_pad` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutRightPadItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutRightPadItem = ({ layout }: WiredStyleVolterBlueLayoutRightPadItemProps) => {
    return (
        <Region
            name="right_pad"
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Row template `source_btn` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutSourceBtnItemProps {
    itemsSourceElements?: ReactNode;
    layout?: BoxLayout;
    onSourceBtn?: () => void;
}

export const WiredStyleVolterBlueLayoutSourceBtnItem = ({ itemsSourceElements, layout, onSourceBtn }: WiredStyleVolterBlueLayoutSourceBtnItemProps) => {
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
                backgroundColor="#ffeda5"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row' }}
            >
                {itemsSourceElements ?? (
                    <>
                        <WiredStyleVolterBlueLayoutLeftPadItem />
                        <WiredStyleVolterBlueLayoutTypeIconBitmapItem />
                        <WiredStyleVolterBlueLayoutRightPadItem />
                    </>
                )}
            </Region>
        </Region>
    );
};

/** Row template `source_options_border` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutSourceOptionsBorderItemProps {
    itemsSourceOptionsList?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutSourceOptionsBorderItem = ({ itemsSourceOptionsList, layout }: WiredStyleVolterBlueLayoutSourceOptionsBorderItemProps) => {
    return (
        <Region
            name="source_options_border"
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="source_options_cont"
                backgroundColor="#ffeda5"
                layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, minHeight: 15, maxHeight: 15 }}
            >
                <Region
                    name="source_options_list"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row', gap: 1 }}
                >
                    {itemsSourceOptionsList ?? (
                        <WiredStyleVolterBlueLayoutSourceBtnItem />
                    )}
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `right_padding` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutRightPaddingItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutRightPaddingItem = ({ layout }: WiredStyleVolterBlueLayoutRightPaddingItemProps) => {
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
                    backgroundColor="#ffeda5"
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

/** Named region `sourcetype_selector_view` of WiredStyleVolterBlueLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleVolterBlueLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
    visibleSourcetypeSelectorView?: boolean;
}

export const WiredStyleVolterBlueLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout, visibleSourcetypeSelectorView }: WiredStyleVolterBlueLayoutSourcetypeSelectorViewProps) => {
    return (
        (visibleSourcetypeSelectorView ?? false) && (
            <Region
                name="sourcetype_selector_view"
                layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
            >
                {itemsSourcetypeSelectorView ?? (
                    <>
                        <WiredStyleVolterBlueLayoutLeftPaddingItem />
                        <WiredStyleVolterBlueLayoutSourceOptionsBorderItem />
                        <WiredStyleVolterBlueLayoutRightPaddingItem />
                    </>
                )}
            </Region>
        )
    );
};

/** Row template `left_padding` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutLeftPaddingItem2Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutLeftPaddingItem2 = ({ layout }: WiredStyleVolterBlueLayoutLeftPaddingItem2Props) => {
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
                    backgroundColor="#ffeda5"
                    layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `mini_button_bg` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutMiniButtonBgItemProps {
    layout?: BoxLayout;
    onMiniButtonClick?: () => void;
    srcMiniButtonIcon?: string;
}

export const WiredStyleVolterBlueLayoutMiniButtonBgItem = ({ layout, onMiniButtonClick, srcMiniButtonIcon }: WiredStyleVolterBlueLayoutMiniButtonBgItemProps) => {
    return (
        <Region
            name="mini_button_bg"
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <Region
                name="mini_button_click"
                backgroundColor="#ffeda5"
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

/** Row template `right_padding` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutRightPaddingItem2Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutRightPaddingItem2 = ({ layout }: WiredStyleVolterBlueLayoutRightPaddingItem2Props) => {
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
                    backgroundColor="#ffeda5"
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

/** Named region `mini_button_view` of WiredStyleVolterBlueLayout - configured through the parent's `miniButtonView` prop. */
export interface WiredStyleVolterBlueLayoutMiniButtonViewProps {
    itemsMiniButtonView?: ReactNode;
    layout?: BoxLayout;
    visibleMiniButtonView?: boolean;
}

export const WiredStyleVolterBlueLayoutMiniButtonView = ({ itemsMiniButtonView, layout, visibleMiniButtonView }: WiredStyleVolterBlueLayoutMiniButtonViewProps) => {
    return (
        (visibleMiniButtonView ?? false) && (
            <Region
                name="mini_button_view"
                layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
            >
                {itemsMiniButtonView ?? (
                    <>
                        <WiredStyleVolterBlueLayoutLeftPaddingItem2 />
                        <WiredStyleVolterBlueLayoutMiniButtonBgItem />
                        <WiredStyleVolterBlueLayoutRightPaddingItem2 />
                    </>
                )}
            </Region>
        )
    );
};

/** Row template `menu_item_template` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutMenuItemTemplateItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onCheckbox?: () => void;
    onMenuItemTemplate?: () => void;
}

export const WiredStyleVolterBlueLayoutMenuItemTemplateItem = ({ captionText, layout, onCheckbox, onMenuItemTemplate }: WiredStyleVolterBlueLayoutMenuItemTemplateItemProps) => {
    return (
        <Region
            name="menu_item_template"
            onPointerTap={onMenuItemTemplate}
            cursor="pointer"
            layout={{ width: 141, height: 20, flexShrink: 0, ...layout }}
        >
            <CheckBox
                variant="2"
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
                    textOptions={{ fill: '#222222' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `spacer_template` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutSpacerTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutSpacerTemplateItem = ({ layout }: WiredStyleVolterBlueLayoutSpacerTemplateItemProps) => {
    return (
        <Region
            name="spacer_template"
            layout={{ width: 141, height: 3, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#999999"
                layout={{ position: 'absolute', left: 6, right: 6, top: 1, height: 1 }}
            />
        </Region>
    );
};
