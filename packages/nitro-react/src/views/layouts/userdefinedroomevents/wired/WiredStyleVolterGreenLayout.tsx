import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1155_wired_style_volter_green_xml` (layout "wired_style_volter_green", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleVolterGreenLayoutProps {
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    expandCollapseRegion?: WiredStyleVolterGreenLayoutExpandCollapseRegionProps;
    inputTemplate?: WiredStyleVolterGreenLayoutInputTemplateProps;
    layout?: BoxLayout;
    menuList?: WiredStyleVolterGreenLayoutMenuListProps;
    miniButtonView?: WiredStyleVolterGreenLayoutMiniButtonViewProps;
    onButton?: () => void;
    onCheckboxView?: () => void;
    onDropdownView?: () => void;
    onFrame?: () => void;
    onIconbuttonDown?: () => void;
    onIconbuttonLeft?: () => void;
    onIconbuttonRight?: () => void;
    onIconbuttonUp?: () => void;
    onRadiobuttonView?: () => void;
    rulerView?: WiredStyleVolterGreenLayoutRulerViewProps;
    slider?: WiredStyleVolterGreenLayoutSliderProps;
    sourcetypeSelectorView?: WiredStyleVolterGreenLayoutSourcetypeSelectorViewProps;
    visibleButton?: boolean;
    visibleCheckboxView?: boolean;
    visibleDropdownView?: boolean;
    visibleIconbuttonDown?: boolean;
    visibleIconbuttonLeft?: boolean;
    visibleIconbuttonRight?: boolean;
    visibleIconbuttonUp?: boolean;
    visibleInnerBorder?: boolean;
    visibleQuickMenu?: boolean;
    visibleRadiobuttonView?: boolean;
}

export const WiredStyleVolterGreenLayout = ({ captionTextBoldView, captionTextHtml, captionTextView, expandCollapseRegion, inputTemplate, layout, menuList, miniButtonView, onButton, onCheckboxView, onDropdownView, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onRadiobuttonView, rulerView, slider, sourcetypeSelectorView, visibleButton, visibleCheckboxView, visibleDropdownView, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInnerBorder, visibleQuickMenu, visibleRadiobuttonView }: WiredStyleVolterGreenLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
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
                        tintColor="#bfd6c9"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Frame
                    variant="0"
                    id="frame"
                    name="frame"
                    visible={false}
                    caption={t('wiredfurni.title')}
                    tintColor="#78b090"
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 200, minWidth: 100 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%' }} />
                </Frame>
                <WiredStyleVolterGreenLayoutRulerView {...rulerView} />
                <Region
                    name="text_view"
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
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 96, top: 0, height: 13, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextHtml ?? 'Use this by typing'}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#222222' }}
                    />
                </Region>
                <WiredStyleVolterGreenLayoutInputTemplate {...inputTemplate} />
                <Region
                    visible={visibleDropdownView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 22 }}
                >
                    <Dropmenu
                        variant="200"
                        name="dropdown_view"
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
                        onPointerTap={onCheckboxView}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    visible={visibleRadiobuttonView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 17 }}
                >
                    <RadioButton
                        variant="2"
                        name="radiobutton_view"
                        onPointerTap={onRadiobuttonView}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <WiredStyleVolterGreenLayoutExpandCollapseRegion {...expandCollapseRegion} />
                <WiredStyleVolterGreenLayoutSourcetypeSelectorView {...sourcetypeSelectorView} />
                <Region
                    visible={visibleIconbuttonLeft ?? false}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ContainerButton
                        variant="2"
                        name="iconbutton_left"
                        onPointerTap={onIconbuttonLeft}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="2"
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
                        onPointerTap={onIconbuttonRight}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="3"
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
                        onPointerTap={onIconbuttonUp}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="1"
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
                        onPointerTap={onIconbuttonDown}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="0"
                            tintColor="#777777"
                            layout={{ position: 'absolute', left: 6, width: 12, top: 6, height: 12 }}
                        />
                    </ContainerButton>
                </Region>
                <WiredStyleVolterGreenLayoutSlider {...slider} />
                <Region
                    visible={visibleButton ?? false}
                    layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 22 }}
                >
                    <Button
                        variant="2"
                        name="button"
                        onPointerTap={onButton}
                        textStyle="text-style-button-regular"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        text
                    </Button>
                </Region>
                <WiredStyleVolterGreenLayoutMiniButtonView {...miniButtonView} />
                <Region
                    visible={visibleQuickMenu ?? false}
                    layout={{ position: 'absolute', left: 0, width: 145, top: 0, height: 27 }}
                >
                    <Border
                        variant="3"
                        name="quick_menu"
                        tintColor="#000000"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Border
                            variant="11"
                            layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                        >
                            <Border
                                variant="11"
                                layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                            >
                                <WiredStyleVolterGreenLayoutMenuList {...menuList} />
                            </Border>
                        </Border>
                    </Border>
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `ruler_view` of WiredStyleVolterGreenLayout - configured through the parent's `rulerView` prop. */
export interface WiredStyleVolterGreenLayoutRulerViewProps {
    layout?: BoxLayout;
    visibleRulerView?: boolean;
}

export const WiredStyleVolterGreenLayoutRulerView = ({ layout, visibleRulerView }: WiredStyleVolterGreenLayoutRulerViewProps) => {
    return (
        <Region
            name="ruler_view"
            visible={visibleRulerView ?? false}
            layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1, ...layout }}
        >
            <Region
                backgroundColor="#222222"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1 }}
            />
        </Region>
    );
};

/** Named region `input_template` of WiredStyleVolterGreenLayout - configured through the parent's `inputTemplate` prop. */
export interface WiredStyleVolterGreenLayoutInputTemplateProps {
    layout?: BoxLayout;
    visibleInputTemplate?: boolean;
}

export const WiredStyleVolterGreenLayoutInputTemplate = ({ layout, visibleInputTemplate }: WiredStyleVolterGreenLayoutInputTemplateProps) => {
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region
            name="input_template"
            visible={visibleInputTemplate ?? false}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 15, ...layout }}
        >
            <TextInput
                value={fieldValue}
                onChange={setFieldValue}
                textColor="#222222"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
        </Region>
    );
};

/** Named region `expand_collapse_region` of WiredStyleVolterGreenLayout - configured through the parent's `expandCollapseRegion` prop. */
export interface WiredStyleVolterGreenLayoutExpandCollapseRegionProps {
    layout?: BoxLayout;
    onExpandCollapseRegion?: () => void;
    srcDownArrow?: string;
    srcUpArrow?: string;
    visibleExpandCollapseRegion?: boolean;
}

export const WiredStyleVolterGreenLayoutExpandCollapseRegion = ({ layout, onExpandCollapseRegion, srcDownArrow, srcUpArrow, visibleExpandCollapseRegion }: WiredStyleVolterGreenLayoutExpandCollapseRegionProps) => {
    return (
        <Region
            name="expand_collapse_region"
            visible={visibleExpandCollapseRegion ?? false}
            onPointerTap={onExpandCollapseRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 10, ...layout }}
        >
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 10 }}
            >
                <ThemeImage
                    name="up_arrow"
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
                    src={srcDownArrow ?? layoutImage('wired_volter_downarrow.png')}
                    layout={{ position: 'absolute', left: 0, width: 16, top: 0, height: 10 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `border` of WiredStyleVolterGreenLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterGreenLayoutBorderProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutBorder = ({ layout }: WiredStyleVolterGreenLayoutBorderProps) => {
    return (
        <Region
            name="border"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Named region `margin_item_color_left` of WiredStyleVolterGreenLayout - configured through the parent's `marginItemColorLeft` prop. */
export interface WiredStyleVolterGreenLayoutMarginItemColorLeftProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutMarginItemColorLeft = ({ layout }: WiredStyleVolterGreenLayoutMarginItemColorLeftProps) => {
    return (
        <Region
            name="margin_item_color_left"
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterGreenLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterGreenLayoutBorder2Props {
    layout?: BoxLayout;
    marginItemColorLeft?: WiredStyleVolterGreenLayoutMarginItemColorLeftProps;
}

export const WiredStyleVolterGreenLayoutBorder2 = ({ layout, marginItemColorLeft }: WiredStyleVolterGreenLayoutBorder2Props) => {
    return (
        <Region
            name="border"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterGreenLayoutMarginItemColorLeft {...marginItemColorLeft} />
        </Region>
    );
};

/** Row template `left_padding` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutLeftPaddingItemProps {
    border?: WiredStyleVolterGreenLayoutBorderProps;
    border2?: WiredStyleVolterGreenLayoutBorder2Props;
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutLeftPaddingItem = ({ border, border2, layout }: WiredStyleVolterGreenLayoutLeftPaddingItemProps) => {
    return (
        <Region
            name="left_padding"
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterGreenLayoutBorder {...border} />
            <WiredStyleVolterGreenLayoutBorder2 {...border2} />
        </Region>
    );
};

/** Row template `left_pad` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutLeftPadItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutLeftPadItem = ({ layout }: WiredStyleVolterGreenLayoutLeftPadItemProps) => {
    return (
        <Region
            name="left_pad"
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Row template `type_icon_bitmap` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutTypeIconBitmapItemProps {
    layout?: BoxLayout;
    srcTypeIconBitmap?: string;
}

export const WiredStyleVolterGreenLayoutTypeIconBitmapItem = ({ layout, srcTypeIconBitmap }: WiredStyleVolterGreenLayoutTypeIconBitmapItemProps) => {
    return (
        <ThemeImage
            name="type_icon_bitmap"
            src={srcTypeIconBitmap}
            tint="#000000"
            layout={{ width: 9, height: 11, flexShrink: 0, minHeight: 11, maxHeight: 11, ...layout }}
        />
    );
};

/** Row template `right_pad` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutRightPadItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutRightPadItem = ({ layout }: WiredStyleVolterGreenLayoutRightPadItemProps) => {
    return (
        <Region
            name="right_pad"
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Named region `source_elements` of WiredStyleVolterGreenLayout - configured through the parent's `sourceElements` prop. */
export interface WiredStyleVolterGreenLayoutSourceElementsProps {
    itemsSourceElements?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutSourceElements = ({ itemsSourceElements, layout }: WiredStyleVolterGreenLayoutSourceElementsProps) => {
    return (
        <Region
            name="source_elements"
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row', ...layout }}
        >
            {itemsSourceElements ?? (
                <>
                    <WiredStyleVolterGreenLayoutLeftPadItem />
                    <WiredStyleVolterGreenLayoutTypeIconBitmapItem />
                    <WiredStyleVolterGreenLayoutRightPadItem />
                </>
            )}
        </Region>
    );
};

/** Row template `source_btn` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutSourceBtnItemProps {
    layout?: BoxLayout;
    onSourceBtn?: () => void;
    sourceElements?: WiredStyleVolterGreenLayoutSourceElementsProps;
}

export const WiredStyleVolterGreenLayoutSourceBtnItem = ({ layout, onSourceBtn, sourceElements }: WiredStyleVolterGreenLayoutSourceBtnItemProps) => {
    return (
        <Region
            name="source_btn"
            backgroundColor="#ffffff"
            onPointerTap={onSourceBtn}
            cursor="pointer"
            layout={{ width: 13, height: 15, flexShrink: 0, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterGreenLayoutSourceElements {...sourceElements} />
        </Region>
    );
};

/** Named region `source_options_list` of WiredStyleVolterGreenLayout - configured through the parent's `sourceOptionsList` prop. */
export interface WiredStyleVolterGreenLayoutSourceOptionsListProps {
    itemsSourceOptionsList?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutSourceOptionsList = ({ itemsSourceOptionsList, layout }: WiredStyleVolterGreenLayoutSourceOptionsListProps) => {
    return (
        <Region
            name="source_options_list"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row', gap: 1, ...layout }}
        >
            {itemsSourceOptionsList ?? (
                <WiredStyleVolterGreenLayoutSourceBtnItem />
            )}
        </Region>
    );
};

/** Named region `source_options_cont` of WiredStyleVolterGreenLayout - configured through the parent's `sourceOptionsCont` prop. */
export interface WiredStyleVolterGreenLayoutSourceOptionsContProps {
    layout?: BoxLayout;
    sourceOptionsList?: WiredStyleVolterGreenLayoutSourceOptionsListProps;
}

export const WiredStyleVolterGreenLayoutSourceOptionsCont = ({ layout, sourceOptionsList }: WiredStyleVolterGreenLayoutSourceOptionsContProps) => {
    return (
        <Region
            name="source_options_cont"
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterGreenLayoutSourceOptionsList {...sourceOptionsList} />
        </Region>
    );
};

/** Row template `source_options_border` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutSourceOptionsBorderItemProps {
    layout?: BoxLayout;
    sourceOptionsCont?: WiredStyleVolterGreenLayoutSourceOptionsContProps;
}

export const WiredStyleVolterGreenLayoutSourceOptionsBorderItem = ({ layout, sourceOptionsCont }: WiredStyleVolterGreenLayoutSourceOptionsBorderItemProps) => {
    return (
        <Region
            name="source_options_border"
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterGreenLayoutSourceOptionsCont {...sourceOptionsCont} />
        </Region>
    );
};

/** Named region `margin_item_color_right` of WiredStyleVolterGreenLayout - configured through the parent's `marginItemColorRight` prop. */
export interface WiredStyleVolterGreenLayoutMarginItemColorRightProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutMarginItemColorRight = ({ layout }: WiredStyleVolterGreenLayoutMarginItemColorRightProps) => {
    return (
        <Region
            name="margin_item_color_right"
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterGreenLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterGreenLayoutBorder3Props {
    layout?: BoxLayout;
    marginItemColorRight?: WiredStyleVolterGreenLayoutMarginItemColorRightProps;
}

export const WiredStyleVolterGreenLayoutBorder3 = ({ layout, marginItemColorRight }: WiredStyleVolterGreenLayoutBorder3Props) => {
    return (
        <Region
            name="border"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterGreenLayoutMarginItemColorRight {...marginItemColorRight} />
        </Region>
    );
};

/** Named region `border` of WiredStyleVolterGreenLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterGreenLayoutBorder4Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutBorder4 = ({ layout }: WiredStyleVolterGreenLayoutBorder4Props) => {
    return (
        <Region
            name="border"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Row template `right_padding` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutRightPaddingItemProps {
    border?: WiredStyleVolterGreenLayoutBorder3Props;
    border2?: WiredStyleVolterGreenLayoutBorder4Props;
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutRightPaddingItem = ({ border, border2, layout }: WiredStyleVolterGreenLayoutRightPaddingItemProps) => {
    return (
        <Region
            name="right_padding"
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterGreenLayoutBorder3 {...border} />
            <WiredStyleVolterGreenLayoutBorder4 {...border2} />
        </Region>
    );
};

/** Named region `sourcetype_selector_view` of WiredStyleVolterGreenLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleVolterGreenLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout }: WiredStyleVolterGreenLayoutSourcetypeSelectorViewProps) => {
    return (
        <Region
            name="sourcetype_selector_view"
            visible={false}
            layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
        >
            {itemsSourcetypeSelectorView ?? (
                <>
                    <WiredStyleVolterGreenLayoutLeftPaddingItem />
                    <WiredStyleVolterGreenLayoutSourceOptionsBorderItem />
                    <WiredStyleVolterGreenLayoutRightPaddingItem />
                </>
            )}
        </Region>
    );
};

/** Named region `slider_movement_area` of WiredStyleVolterGreenLayout - configured through the parent's `sliderMovementArea` prop. */
export interface WiredStyleVolterGreenLayoutSliderMovementAreaProps {
    layout?: BoxLayout;
    srcSliderButton?: string;
}

export const WiredStyleVolterGreenLayoutSliderMovementArea = ({ layout, srcSliderButton }: WiredStyleVolterGreenLayoutSliderMovementAreaProps) => {
    return (
        <Region
            name="slider_movement_area"
            layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, ...layout }}
        >
            <ThemeImage
                name="slider_button"
                src={srcSliderButton ?? layoutImage('wired_styles_volter_slider_obj.png')}
                layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
            />
        </Region>
    );
};

/** Named region `slider` of WiredStyleVolterGreenLayout - configured through the parent's `slider` prop. */
export interface WiredStyleVolterGreenLayoutSliderProps {
    layout?: BoxLayout;
    sliderMovementArea?: WiredStyleVolterGreenLayoutSliderMovementAreaProps;
    srcSliderBase?: string;
    visibleSlider?: boolean;
}

export const WiredStyleVolterGreenLayoutSlider = ({ layout, sliderMovementArea, srcSliderBase, visibleSlider }: WiredStyleVolterGreenLayoutSliderProps) => {
    return (
        <Region
            name="slider"
            visible={visibleSlider ?? false}
            layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 17, ...layout }}
        >
            <ThemeImage
                name="slider_base"
                src={srcSliderBase ?? layoutImage('wired_styles_volter_slider_bg.png')}
                tint="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17 }}
            />
            <WiredStyleVolterGreenLayoutSliderMovementArea {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `border` of WiredStyleVolterGreenLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterGreenLayoutBorder5Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutBorder5 = ({ layout }: WiredStyleVolterGreenLayoutBorder5Props) => {
    return (
        <Region
            name="border"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Named region `margin_item_color_left` of WiredStyleVolterGreenLayout - configured through the parent's `marginItemColorLeft` prop. */
export interface WiredStyleVolterGreenLayoutMarginItemColorLeft2Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutMarginItemColorLeft2 = ({ layout }: WiredStyleVolterGreenLayoutMarginItemColorLeft2Props) => {
    return (
        <Region
            name="margin_item_color_left"
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterGreenLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterGreenLayoutBorder6Props {
    layout?: BoxLayout;
    marginItemColorLeft?: WiredStyleVolterGreenLayoutMarginItemColorLeft2Props;
}

export const WiredStyleVolterGreenLayoutBorder6 = ({ layout, marginItemColorLeft }: WiredStyleVolterGreenLayoutBorder6Props) => {
    return (
        <Region
            name="border"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterGreenLayoutMarginItemColorLeft2 {...marginItemColorLeft} />
        </Region>
    );
};

/** Row template `left_padding` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutLeftPaddingItem2Props {
    border?: WiredStyleVolterGreenLayoutBorder5Props;
    border2?: WiredStyleVolterGreenLayoutBorder6Props;
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutLeftPaddingItem2 = ({ border, border2, layout }: WiredStyleVolterGreenLayoutLeftPaddingItem2Props) => {
    return (
        <Region
            name="left_padding"
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterGreenLayoutBorder5 {...border} />
            <WiredStyleVolterGreenLayoutBorder6 {...border2} />
        </Region>
    );
};

/** Named region `mini_button_click` of WiredStyleVolterGreenLayout - configured through the parent's `miniButtonClick` prop. */
export interface WiredStyleVolterGreenLayoutMiniButtonClickProps {
    layout?: BoxLayout;
    onMiniButtonClick?: () => void;
    srcMiniButtonIcon?: string;
}

export const WiredStyleVolterGreenLayoutMiniButtonClick = ({ layout, onMiniButtonClick, srcMiniButtonIcon }: WiredStyleVolterGreenLayoutMiniButtonClickProps) => {
    return (
        <Region
            name="mini_button_click"
            backgroundColor="#ffeda5"
            onPointerTap={onMiniButtonClick}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <ThemeImage
                name="mini_button_icon"
                src={srcMiniButtonIcon}
                layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 15 }}
            />
        </Region>
    );
};

/** Row template `mini_button_bg` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutMiniButtonBgItemProps {
    layout?: BoxLayout;
    miniButtonClick?: WiredStyleVolterGreenLayoutMiniButtonClickProps;
}

export const WiredStyleVolterGreenLayoutMiniButtonBgItem = ({ layout, miniButtonClick }: WiredStyleVolterGreenLayoutMiniButtonBgItemProps) => {
    return (
        <Region
            name="mini_button_bg"
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterGreenLayoutMiniButtonClick {...miniButtonClick} />
        </Region>
    );
};

/** Named region `margin_item_color_right` of WiredStyleVolterGreenLayout - configured through the parent's `marginItemColorRight` prop. */
export interface WiredStyleVolterGreenLayoutMarginItemColorRight2Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutMarginItemColorRight2 = ({ layout }: WiredStyleVolterGreenLayoutMarginItemColorRight2Props) => {
    return (
        <Region
            name="margin_item_color_right"
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterGreenLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterGreenLayoutBorder7Props {
    layout?: BoxLayout;
    marginItemColorRight?: WiredStyleVolterGreenLayoutMarginItemColorRight2Props;
}

export const WiredStyleVolterGreenLayoutBorder7 = ({ layout, marginItemColorRight }: WiredStyleVolterGreenLayoutBorder7Props) => {
    return (
        <Region
            name="border"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterGreenLayoutMarginItemColorRight2 {...marginItemColorRight} />
        </Region>
    );
};

/** Named region `border` of WiredStyleVolterGreenLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterGreenLayoutBorder8Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutBorder8 = ({ layout }: WiredStyleVolterGreenLayoutBorder8Props) => {
    return (
        <Region
            name="border"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Row template `right_padding` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutRightPaddingItem2Props {
    border?: WiredStyleVolterGreenLayoutBorder7Props;
    border2?: WiredStyleVolterGreenLayoutBorder8Props;
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutRightPaddingItem2 = ({ border, border2, layout }: WiredStyleVolterGreenLayoutRightPaddingItem2Props) => {
    return (
        <Region
            name="right_padding"
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterGreenLayoutBorder7 {...border} />
            <WiredStyleVolterGreenLayoutBorder8 {...border2} />
        </Region>
    );
};

/** Named region `mini_button_view` of WiredStyleVolterGreenLayout - configured through the parent's `miniButtonView` prop. */
export interface WiredStyleVolterGreenLayoutMiniButtonViewProps {
    itemsMiniButtonView?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutMiniButtonView = ({ itemsMiniButtonView, layout }: WiredStyleVolterGreenLayoutMiniButtonViewProps) => {
    return (
        <Region
            name="mini_button_view"
            visible={false}
            layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
        >
            {itemsMiniButtonView ?? (
                <>
                    <WiredStyleVolterGreenLayoutLeftPaddingItem2 />
                    <WiredStyleVolterGreenLayoutMiniButtonBgItem />
                    <WiredStyleVolterGreenLayoutRightPaddingItem2 />
                </>
            )}
        </Region>
    );
};

/** Row template `menu_item_template` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutMenuItemTemplateItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onCheckbox?: () => void;
    onMenuItemTemplate?: () => void;
}

export const WiredStyleVolterGreenLayoutMenuItemTemplateItem = ({ captionText, layout, onCheckbox, onMenuItemTemplate }: WiredStyleVolterGreenLayoutMenuItemTemplateItemProps) => {
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

/** Row template `spacer_template` of WiredStyleVolterGreenLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterGreenLayoutSpacerTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutSpacerTemplateItem = ({ layout }: WiredStyleVolterGreenLayoutSpacerTemplateItemProps) => {
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

/** Named region `menu_list` of WiredStyleVolterGreenLayout - configured through the parent's `menuList` prop. */
export interface WiredStyleVolterGreenLayoutMenuListProps {
    itemsMenuList?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleVolterGreenLayoutMenuList = ({ itemsMenuList, layout }: WiredStyleVolterGreenLayoutMenuListProps) => {
    return (
        <Region
            name="menu_list"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 23, flexDirection: 'column', ...layout }}
        >
            {itemsMenuList ?? (
                <>
                    <WiredStyleVolterGreenLayoutMenuItemTemplateItem />
                    <WiredStyleVolterGreenLayoutSpacerTemplateItem />
                </>
            )}
        </Region>
    );
};
