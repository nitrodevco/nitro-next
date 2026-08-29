import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1182_wired_style_volter_blue_xml` (layout "wired_style_volter_blue", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleVolterBlueLayoutProps {
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    expandCollapseRegion?: WiredStyleVolterBlueLayoutExpandCollapseRegionProps;
    inputTemplate?: WiredStyleVolterBlueLayoutInputTemplateProps;
    layout?: BoxLayout;
    menuList?: WiredStyleVolterBlueLayoutMenuListProps;
    miniButtonView?: WiredStyleVolterBlueLayoutMiniButtonViewProps;
    onButton?: () => void;
    onCheckboxView?: () => void;
    onDropdownView?: () => void;
    onFrame?: () => void;
    onIconbuttonDown?: () => void;
    onIconbuttonLeft?: () => void;
    onIconbuttonRight?: () => void;
    onIconbuttonUp?: () => void;
    onRadiobuttonView?: () => void;
    rulerView?: WiredStyleVolterBlueLayoutRulerViewProps;
    slider?: WiredStyleVolterBlueLayoutSliderProps;
    sourcetypeSelectorView?: WiredStyleVolterBlueLayoutSourcetypeSelectorViewProps;
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

export const WiredStyleVolterBlueLayout = ({ captionTextBoldView, captionTextHtml, captionTextView, expandCollapseRegion, inputTemplate, layout, menuList, miniButtonView, onButton, onCheckboxView, onDropdownView, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onRadiobuttonView, rulerView, slider, sourcetypeSelectorView, visibleButton, visibleCheckboxView, visibleDropdownView, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInnerBorder, visibleQuickMenu, visibleRadiobuttonView }: WiredStyleVolterBlueLayoutProps) => {
    const t = useTranslation();

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
                        tintColor="#c7d0d4"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Frame
                    variant="0"
                    id="frame"
                    name="frame"
                    params={32769}
                    visible={false}
                    caption={t('wiredfurni.title')}
                    tintColor="#7da9b5"
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 200, minWidth: 100 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%' }} />
                </Frame>
                <WiredStyleVolterBlueLayoutRulerView {...rulerView} />
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
                    layout={{ position: 'absolute', left: 0, width: 96, top: 0, height: 13, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextHtml ?? 'Use this by typing'}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#222222' }}
                    />
                </Region>
                <WiredStyleVolterBlueLayoutInputTemplate {...inputTemplate} />
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
                <Region
                    visible={visibleRadiobuttonView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 17 }}
                >
                    <RadioButton
                        variant="2"
                        name="radiobutton_view"
                        params={17}
                        onPointerTap={onRadiobuttonView}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <WiredStyleVolterBlueLayoutExpandCollapseRegion {...expandCollapseRegion} />
                <WiredStyleVolterBlueLayoutSourcetypeSelectorView {...sourcetypeSelectorView} />
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
                <WiredStyleVolterBlueLayoutSlider {...slider} />
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
                <WiredStyleVolterBlueLayoutMiniButtonView {...miniButtonView} />
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
                            layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                        >
                            <Border
                                variant="11"
                                params={2192}
                                layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                            >
                                <WiredStyleVolterBlueLayoutMenuList {...menuList} />
                            </Border>
                        </Border>
                    </Border>
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `ruler_view` of WiredStyleVolterBlueLayout - configured through the parent's `rulerView` prop. */
export interface WiredStyleVolterBlueLayoutRulerViewProps {
    layout?: BoxLayout;
    visibleRulerView?: boolean;
}

export const WiredStyleVolterBlueLayoutRulerView = ({ layout, visibleRulerView }: WiredStyleVolterBlueLayoutRulerViewProps) => {
    return (
        <Region
            name="ruler_view"
            params={16}
            visible={visibleRulerView ?? false}
            layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1, ...layout }}
        >
            <Region
                params={4194448}
                backgroundColor="#222222"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1 }}
            />
        </Region>
    );
};

/** Named region `input_template` of WiredStyleVolterBlueLayout - configured through the parent's `inputTemplate` prop. */
export interface WiredStyleVolterBlueLayoutInputTemplateProps {
    layout?: BoxLayout;
    visibleInputTemplate?: boolean;
}

export const WiredStyleVolterBlueLayoutInputTemplate = ({ layout, visibleInputTemplate }: WiredStyleVolterBlueLayoutInputTemplateProps) => {
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region
            name="input_template"
            params={16}
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

/** Named region `expand_collapse_region` of WiredStyleVolterBlueLayout - configured through the parent's `expandCollapseRegion` prop. */
export interface WiredStyleVolterBlueLayoutExpandCollapseRegionProps {
    layout?: BoxLayout;
    onExpandCollapseRegion?: () => void;
    srcDownArrow?: string;
    srcUpArrow?: string;
    visibleExpandCollapseRegion?: boolean;
}

export const WiredStyleVolterBlueLayoutExpandCollapseRegion = ({ layout, onExpandCollapseRegion, srcDownArrow, srcUpArrow, visibleExpandCollapseRegion }: WiredStyleVolterBlueLayoutExpandCollapseRegionProps) => {
    return (
        <Region
            name="expand_collapse_region"
            params={17}
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
    );
};

/** Named region `border` of WiredStyleVolterBlueLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterBlueLayoutBorderProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutBorder = ({ layout }: WiredStyleVolterBlueLayoutBorderProps) => {
    return (
        <Region
            name="border"
            params={16}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Named region `margin_item_color_left` of WiredStyleVolterBlueLayout - configured through the parent's `marginItemColorLeft` prop. */
export interface WiredStyleVolterBlueLayoutMarginItemColorLeftProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutMarginItemColorLeft = ({ layout }: WiredStyleVolterBlueLayoutMarginItemColorLeftProps) => {
    return (
        <Region
            name="margin_item_color_left"
            params={16}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterBlueLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterBlueLayoutBorder2Props {
    layout?: BoxLayout;
    marginItemColorLeft?: WiredStyleVolterBlueLayoutMarginItemColorLeftProps;
}

export const WiredStyleVolterBlueLayoutBorder2 = ({ layout, marginItemColorLeft }: WiredStyleVolterBlueLayoutBorder2Props) => {
    return (
        <Region
            name="border"
            params={16}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterBlueLayoutMarginItemColorLeft {...marginItemColorLeft} />
        </Region>
    );
};

/** Row template `left_padding` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutLeftPaddingItemProps {
    border?: WiredStyleVolterBlueLayoutBorderProps;
    border2?: WiredStyleVolterBlueLayoutBorder2Props;
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutLeftPaddingItem = ({ border, border2, layout }: WiredStyleVolterBlueLayoutLeftPaddingItemProps) => {
    return (
        <Region
            name="left_padding"
            params={16}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterBlueLayoutBorder {...border} />
            <WiredStyleVolterBlueLayoutBorder2 {...border2} />
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
            params={16}
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
            params={3932176}
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
            params={16}
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Named region `source_elements` of WiredStyleVolterBlueLayout - configured through the parent's `sourceElements` prop. */
export interface WiredStyleVolterBlueLayoutSourceElementsProps {
    itemsSourceElements?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutSourceElements = ({ itemsSourceElements, layout }: WiredStyleVolterBlueLayoutSourceElementsProps) => {
    return (
        <Region
            name="source_elements"
            params={147600}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row', ...layout }}
        >
            {itemsSourceElements ?? (
                <>
                    <WiredStyleVolterBlueLayoutLeftPadItem />
                    <WiredStyleVolterBlueLayoutTypeIconBitmapItem />
                    <WiredStyleVolterBlueLayoutRightPadItem />
                </>
            )}
        </Region>
    );
};

/** Row template `source_btn` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutSourceBtnItemProps {
    layout?: BoxLayout;
    onSourceBtn?: () => void;
    sourceElements?: WiredStyleVolterBlueLayoutSourceElementsProps;
}

export const WiredStyleVolterBlueLayoutSourceBtnItem = ({ layout, onSourceBtn, sourceElements }: WiredStyleVolterBlueLayoutSourceBtnItemProps) => {
    return (
        <Region
            name="source_btn"
            params={147473}
            backgroundColor="#ffffff"
            onPointerTap={onSourceBtn}
            cursor="pointer"
            layout={{ width: 13, height: 15, flexShrink: 0, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterBlueLayoutSourceElements {...sourceElements} />
        </Region>
    );
};

/** Named region `source_options_list` of WiredStyleVolterBlueLayout - configured through the parent's `sourceOptionsList` prop. */
export interface WiredStyleVolterBlueLayoutSourceOptionsListProps {
    itemsSourceOptionsList?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutSourceOptionsList = ({ itemsSourceOptionsList, layout }: WiredStyleVolterBlueLayoutSourceOptionsListProps) => {
    return (
        <Region
            name="source_options_list"
            params={147600}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row', gap: 1, ...layout }}
        >
            {itemsSourceOptionsList ?? (
                <WiredStyleVolterBlueLayoutSourceBtnItem />
            )}
        </Region>
    );
};

/** Named region `source_options_cont` of WiredStyleVolterBlueLayout - configured through the parent's `sourceOptionsCont` prop. */
export interface WiredStyleVolterBlueLayoutSourceOptionsContProps {
    layout?: BoxLayout;
    sourceOptionsList?: WiredStyleVolterBlueLayoutSourceOptionsListProps;
}

export const WiredStyleVolterBlueLayoutSourceOptionsCont = ({ layout, sourceOptionsList }: WiredStyleVolterBlueLayoutSourceOptionsContProps) => {
    return (
        <Region
            name="source_options_cont"
            params={147600}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterBlueLayoutSourceOptionsList {...sourceOptionsList} />
        </Region>
    );
};

/** Row template `source_options_border` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutSourceOptionsBorderItemProps {
    layout?: BoxLayout;
    sourceOptionsCont?: WiredStyleVolterBlueLayoutSourceOptionsContProps;
}

export const WiredStyleVolterBlueLayoutSourceOptionsBorderItem = ({ layout, sourceOptionsCont }: WiredStyleVolterBlueLayoutSourceOptionsBorderItemProps) => {
    return (
        <Region
            name="source_options_border"
            params={149520}
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterBlueLayoutSourceOptionsCont {...sourceOptionsCont} />
        </Region>
    );
};

/** Named region `margin_item_color_right` of WiredStyleVolterBlueLayout - configured through the parent's `marginItemColorRight` prop. */
export interface WiredStyleVolterBlueLayoutMarginItemColorRightProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutMarginItemColorRight = ({ layout }: WiredStyleVolterBlueLayoutMarginItemColorRightProps) => {
    return (
        <Region
            name="margin_item_color_right"
            params={16}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterBlueLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterBlueLayoutBorder3Props {
    layout?: BoxLayout;
    marginItemColorRight?: WiredStyleVolterBlueLayoutMarginItemColorRightProps;
}

export const WiredStyleVolterBlueLayoutBorder3 = ({ layout, marginItemColorRight }: WiredStyleVolterBlueLayoutBorder3Props) => {
    return (
        <Region
            name="border"
            params={16}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterBlueLayoutMarginItemColorRight {...marginItemColorRight} />
        </Region>
    );
};

/** Named region `border` of WiredStyleVolterBlueLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterBlueLayoutBorder4Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutBorder4 = ({ layout }: WiredStyleVolterBlueLayoutBorder4Props) => {
    return (
        <Region
            name="border"
            params={16}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Row template `right_padding` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutRightPaddingItemProps {
    border?: WiredStyleVolterBlueLayoutBorder3Props;
    border2?: WiredStyleVolterBlueLayoutBorder4Props;
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutRightPaddingItem = ({ border, border2, layout }: WiredStyleVolterBlueLayoutRightPaddingItemProps) => {
    return (
        <Region
            name="right_padding"
            params={16}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterBlueLayoutBorder3 {...border} />
            <WiredStyleVolterBlueLayoutBorder4 {...border2} />
        </Region>
    );
};

/** Named region `sourcetype_selector_view` of WiredStyleVolterBlueLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleVolterBlueLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout }: WiredStyleVolterBlueLayoutSourcetypeSelectorViewProps) => {
    return (
        <Region
            name="sourcetype_selector_view"
            params={147456}
            visible={false}
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
    );
};

/** Named region `slider_movement_area` of WiredStyleVolterBlueLayout - configured through the parent's `sliderMovementArea` prop. */
export interface WiredStyleVolterBlueLayoutSliderMovementAreaProps {
    layout?: BoxLayout;
    srcSliderButton?: string;
}

export const WiredStyleVolterBlueLayoutSliderMovementArea = ({ layout, srcSliderButton }: WiredStyleVolterBlueLayoutSliderMovementAreaProps) => {
    return (
        <Region
            name="slider_movement_area"
            params={144}
            layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, ...layout }}
        >
            <ThemeImage
                name="slider_button"
                params={33073}
                src={srcSliderButton ?? layoutImage('wired_styles_volter_slider_obj.png')}
                layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 15 }}
            />
        </Region>
    );
};

/** Named region `slider` of WiredStyleVolterBlueLayout - configured through the parent's `slider` prop. */
export interface WiredStyleVolterBlueLayoutSliderProps {
    layout?: BoxLayout;
    sliderMovementArea?: WiredStyleVolterBlueLayoutSliderMovementAreaProps;
    srcSliderBase?: string;
    visibleSlider?: boolean;
}

export const WiredStyleVolterBlueLayoutSlider = ({ layout, sliderMovementArea, srcSliderBase, visibleSlider }: WiredStyleVolterBlueLayoutSliderProps) => {
    return (
        <Region
            name="slider"
            params={16}
            visible={visibleSlider ?? false}
            layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 17, ...layout }}
        >
            <ThemeImage
                name="slider_base"
                params={144}
                src={srcSliderBase ?? layoutImage('wired_styles_volter_slider_bg.png')}
                tint="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17 }}
            />
            <WiredStyleVolterBlueLayoutSliderMovementArea {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `border` of WiredStyleVolterBlueLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterBlueLayoutBorder5Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutBorder5 = ({ layout }: WiredStyleVolterBlueLayoutBorder5Props) => {
    return (
        <Region
            name="border"
            params={16}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Named region `margin_item_color_left` of WiredStyleVolterBlueLayout - configured through the parent's `marginItemColorLeft` prop. */
export interface WiredStyleVolterBlueLayoutMarginItemColorLeft2Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutMarginItemColorLeft2 = ({ layout }: WiredStyleVolterBlueLayoutMarginItemColorLeft2Props) => {
    return (
        <Region
            name="margin_item_color_left"
            params={16}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterBlueLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterBlueLayoutBorder6Props {
    layout?: BoxLayout;
    marginItemColorLeft?: WiredStyleVolterBlueLayoutMarginItemColorLeft2Props;
}

export const WiredStyleVolterBlueLayoutBorder6 = ({ layout, marginItemColorLeft }: WiredStyleVolterBlueLayoutBorder6Props) => {
    return (
        <Region
            name="border"
            params={16}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterBlueLayoutMarginItemColorLeft2 {...marginItemColorLeft} />
        </Region>
    );
};

/** Row template `left_padding` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutLeftPaddingItem2Props {
    border?: WiredStyleVolterBlueLayoutBorder5Props;
    border2?: WiredStyleVolterBlueLayoutBorder6Props;
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutLeftPaddingItem2 = ({ border, border2, layout }: WiredStyleVolterBlueLayoutLeftPaddingItem2Props) => {
    return (
        <Region
            name="left_padding"
            params={16}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterBlueLayoutBorder5 {...border} />
            <WiredStyleVolterBlueLayoutBorder6 {...border2} />
        </Region>
    );
};

/** Named region `mini_button_click` of WiredStyleVolterBlueLayout - configured through the parent's `miniButtonClick` prop. */
export interface WiredStyleVolterBlueLayoutMiniButtonClickProps {
    layout?: BoxLayout;
    onMiniButtonClick?: () => void;
    srcMiniButtonIcon?: string;
}

export const WiredStyleVolterBlueLayoutMiniButtonClick = ({ layout, onMiniButtonClick, srcMiniButtonIcon }: WiredStyleVolterBlueLayoutMiniButtonClickProps) => {
    return (
        <Region
            name="mini_button_click"
            params={145}
            backgroundColor="#ffeda5"
            onPointerTap={onMiniButtonClick}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <ThemeImage
                name="mini_button_icon"
                params={16}
                src={srcMiniButtonIcon}
                layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 15 }}
            />
        </Region>
    );
};

/** Row template `mini_button_bg` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutMiniButtonBgItemProps {
    layout?: BoxLayout;
    miniButtonClick?: WiredStyleVolterBlueLayoutMiniButtonClickProps;
}

export const WiredStyleVolterBlueLayoutMiniButtonBgItem = ({ layout, miniButtonClick }: WiredStyleVolterBlueLayoutMiniButtonBgItemProps) => {
    return (
        <Region
            name="mini_button_bg"
            params={149520}
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterBlueLayoutMiniButtonClick {...miniButtonClick} />
        </Region>
    );
};

/** Named region `margin_item_color_right` of WiredStyleVolterBlueLayout - configured through the parent's `marginItemColorRight` prop. */
export interface WiredStyleVolterBlueLayoutMarginItemColorRight2Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutMarginItemColorRight2 = ({ layout }: WiredStyleVolterBlueLayoutMarginItemColorRight2Props) => {
    return (
        <Region
            name="margin_item_color_right"
            params={16}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterBlueLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterBlueLayoutBorder7Props {
    layout?: BoxLayout;
    marginItemColorRight?: WiredStyleVolterBlueLayoutMarginItemColorRight2Props;
}

export const WiredStyleVolterBlueLayoutBorder7 = ({ layout, marginItemColorRight }: WiredStyleVolterBlueLayoutBorder7Props) => {
    return (
        <Region
            name="border"
            params={16}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterBlueLayoutMarginItemColorRight2 {...marginItemColorRight} />
        </Region>
    );
};

/** Named region `border` of WiredStyleVolterBlueLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterBlueLayoutBorder8Props {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutBorder8 = ({ layout }: WiredStyleVolterBlueLayoutBorder8Props) => {
    return (
        <Region
            name="border"
            params={16}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Row template `right_padding` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutRightPaddingItem2Props {
    border?: WiredStyleVolterBlueLayoutBorder7Props;
    border2?: WiredStyleVolterBlueLayoutBorder8Props;
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutRightPaddingItem2 = ({ border, border2, layout }: WiredStyleVolterBlueLayoutRightPaddingItem2Props) => {
    return (
        <Region
            name="right_padding"
            params={16}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterBlueLayoutBorder7 {...border} />
            <WiredStyleVolterBlueLayoutBorder8 {...border2} />
        </Region>
    );
};

/** Named region `mini_button_view` of WiredStyleVolterBlueLayout - configured through the parent's `miniButtonView` prop. */
export interface WiredStyleVolterBlueLayoutMiniButtonViewProps {
    itemsMiniButtonView?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutMiniButtonView = ({ itemsMiniButtonView, layout }: WiredStyleVolterBlueLayoutMiniButtonViewProps) => {
    return (
        <Region
            name="mini_button_view"
            params={147456}
            visible={false}
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

/** Row template `spacer_template` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutSpacerTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutSpacerTemplateItem = ({ layout }: WiredStyleVolterBlueLayoutSpacerTemplateItemProps) => {
    return (
        <Region
            name="spacer_template"
            params={144}
            layout={{ width: 141, height: 3, flexShrink: 0, ...layout }}
        >
            <Region
                params={144}
                backgroundColor="#999999"
                layout={{ position: 'absolute', left: 6, right: 6, top: 1, height: 1 }}
            />
        </Region>
    );
};

/** Named region `menu_list` of WiredStyleVolterBlueLayout - configured through the parent's `menuList` prop. */
export interface WiredStyleVolterBlueLayoutMenuListProps {
    itemsMenuList?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleVolterBlueLayoutMenuList = ({ itemsMenuList, layout }: WiredStyleVolterBlueLayoutMenuListProps) => {
    return (
        <Region
            name="menu_list"
            params={144}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 23, flexDirection: 'column', ...layout }}
        >
            {itemsMenuList ?? (
                <>
                    <WiredStyleVolterBlueLayoutMenuItemTemplateItem />
                    <WiredStyleVolterBlueLayoutSpacerTemplateItem />
                </>
            )}
        </Region>
    );
};
