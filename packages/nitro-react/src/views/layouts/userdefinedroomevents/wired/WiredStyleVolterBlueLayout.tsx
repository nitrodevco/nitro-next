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
                        tintColor="#c7d0d4"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Frame
                    variant="0"
                    id="frame"
                    name="frame"
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
                <WiredStyleVolterBlueLayoutInputTemplate {...inputTemplate} />
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
                <WiredStyleVolterBlueLayoutExpandCollapseRegion {...expandCollapseRegion} />
                <WiredStyleVolterBlueLayoutSourcetypeSelectorView {...sourcetypeSelectorView} />
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
                <WiredStyleVolterBlueLayoutSlider {...slider} />
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
                <WiredStyleVolterBlueLayoutMiniButtonView {...miniButtonView} />
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
    tags?: string[];
    visibleRulerView?: boolean;
}

export const WiredStyleVolterBlueLayoutRulerView = ({ layout, tags, visibleRulerView }: WiredStyleVolterBlueLayoutRulerViewProps) => {
    return (
        <Region
            name="ruler_view"
            tags={tags}
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

/** Named region `input_template` of WiredStyleVolterBlueLayout - configured through the parent's `inputTemplate` prop. */
export interface WiredStyleVolterBlueLayoutInputTemplateProps {
    layout?: BoxLayout;
    tags?: string[];
    visibleInputTemplate?: boolean;
}

export const WiredStyleVolterBlueLayoutInputTemplate = ({ layout, tags, visibleInputTemplate }: WiredStyleVolterBlueLayoutInputTemplateProps) => {
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region
            name="input_template"
            tags={tags}
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
    tags?: string[];
    visibleExpandCollapseRegion?: boolean;
}

export const WiredStyleVolterBlueLayoutExpandCollapseRegion = ({ layout, onExpandCollapseRegion, srcDownArrow, srcUpArrow, tags, visibleExpandCollapseRegion }: WiredStyleVolterBlueLayoutExpandCollapseRegionProps) => {
    return (
        <Region
            name="expand_collapse_region"
            tags={tags}
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

/** Named region `border` of WiredStyleVolterBlueLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterBlueLayoutBorderProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutBorder = ({ layout, tags }: WiredStyleVolterBlueLayoutBorderProps) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Named region `margin_item_color_left` of WiredStyleVolterBlueLayout - configured through the parent's `marginItemColorLeft` prop. */
export interface WiredStyleVolterBlueLayoutMarginItemColorLeftProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutMarginItemColorLeft = ({ layout, tags }: WiredStyleVolterBlueLayoutMarginItemColorLeftProps) => {
    return (
        <Region
            name="margin_item_color_left"
            tags={tags}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterBlueLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterBlueLayoutBorder2Props {
    layout?: BoxLayout;
    marginItemColorLeft?: WiredStyleVolterBlueLayoutMarginItemColorLeftProps;
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutBorder2 = ({ layout, marginItemColorLeft, tags }: WiredStyleVolterBlueLayoutBorder2Props) => {
    return (
        <Region
            name="border"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutLeftPaddingItem = ({ border, border2, layout, tags }: WiredStyleVolterBlueLayoutLeftPaddingItemProps) => {
    return (
        <Region
            name="left_padding"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutLeftPadItem = ({ layout, tags }: WiredStyleVolterBlueLayoutLeftPadItemProps) => {
    return (
        <Region
            name="left_pad"
            tags={tags}
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Row template `type_icon_bitmap` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutTypeIconBitmapItemProps {
    layout?: BoxLayout;
    srcTypeIconBitmap?: string;
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutTypeIconBitmapItem = ({ layout, srcTypeIconBitmap, tags }: WiredStyleVolterBlueLayoutTypeIconBitmapItemProps) => {
    return (
        <ThemeImage
            name="type_icon_bitmap"
            tags={tags}
            src={srcTypeIconBitmap}
            tint="#000000"
            layout={{ width: 9, height: 11, flexShrink: 0, minHeight: 11, maxHeight: 11, ...layout }}
        />
    );
};

/** Row template `right_pad` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutRightPadItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutRightPadItem = ({ layout, tags }: WiredStyleVolterBlueLayoutRightPadItemProps) => {
    return (
        <Region
            name="right_pad"
            tags={tags}
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Named region `source_elements` of WiredStyleVolterBlueLayout - configured through the parent's `sourceElements` prop. */
export interface WiredStyleVolterBlueLayoutSourceElementsProps {
    itemsSourceElements?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutSourceElements = ({ itemsSourceElements, layout, tags }: WiredStyleVolterBlueLayoutSourceElementsProps) => {
    return (
        <Region
            name="source_elements"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutSourceBtnItem = ({ layout, onSourceBtn, sourceElements, tags }: WiredStyleVolterBlueLayoutSourceBtnItemProps) => {
    return (
        <Region
            name="source_btn"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutSourceOptionsList = ({ itemsSourceOptionsList, layout, tags }: WiredStyleVolterBlueLayoutSourceOptionsListProps) => {
    return (
        <Region
            name="source_options_list"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutSourceOptionsCont = ({ layout, sourceOptionsList, tags }: WiredStyleVolterBlueLayoutSourceOptionsContProps) => {
    return (
        <Region
            name="source_options_cont"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutSourceOptionsBorderItem = ({ layout, sourceOptionsCont, tags }: WiredStyleVolterBlueLayoutSourceOptionsBorderItemProps) => {
    return (
        <Region
            name="source_options_border"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutMarginItemColorRight = ({ layout, tags }: WiredStyleVolterBlueLayoutMarginItemColorRightProps) => {
    return (
        <Region
            name="margin_item_color_right"
            tags={tags}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterBlueLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterBlueLayoutBorder3Props {
    layout?: BoxLayout;
    marginItemColorRight?: WiredStyleVolterBlueLayoutMarginItemColorRightProps;
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutBorder3 = ({ layout, marginItemColorRight, tags }: WiredStyleVolterBlueLayoutBorder3Props) => {
    return (
        <Region
            name="border"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutBorder4 = ({ layout, tags }: WiredStyleVolterBlueLayoutBorder4Props) => {
    return (
        <Region
            name="border"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutRightPaddingItem = ({ border, border2, layout, tags }: WiredStyleVolterBlueLayoutRightPaddingItemProps) => {
    return (
        <Region
            name="right_padding"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout, tags }: WiredStyleVolterBlueLayoutSourcetypeSelectorViewProps) => {
    return (
        <Region
            name="sourcetype_selector_view"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutSliderMovementArea = ({ layout, srcSliderButton, tags }: WiredStyleVolterBlueLayoutSliderMovementAreaProps) => {
    return (
        <Region
            name="slider_movement_area"
            tags={tags}
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

/** Named region `slider` of WiredStyleVolterBlueLayout - configured through the parent's `slider` prop. */
export interface WiredStyleVolterBlueLayoutSliderProps {
    layout?: BoxLayout;
    sliderMovementArea?: WiredStyleVolterBlueLayoutSliderMovementAreaProps;
    srcSliderBase?: string;
    tags?: string[];
    visibleSlider?: boolean;
}

export const WiredStyleVolterBlueLayoutSlider = ({ layout, sliderMovementArea, srcSliderBase, tags, visibleSlider }: WiredStyleVolterBlueLayoutSliderProps) => {
    return (
        <Region
            name="slider"
            tags={tags}
            visible={visibleSlider ?? false}
            layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 17, ...layout }}
        >
            <ThemeImage
                name="slider_base"
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutBorder5 = ({ layout, tags }: WiredStyleVolterBlueLayoutBorder5Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Named region `margin_item_color_left` of WiredStyleVolterBlueLayout - configured through the parent's `marginItemColorLeft` prop. */
export interface WiredStyleVolterBlueLayoutMarginItemColorLeft2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutMarginItemColorLeft2 = ({ layout, tags }: WiredStyleVolterBlueLayoutMarginItemColorLeft2Props) => {
    return (
        <Region
            name="margin_item_color_left"
            tags={tags}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterBlueLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterBlueLayoutBorder6Props {
    layout?: BoxLayout;
    marginItemColorLeft?: WiredStyleVolterBlueLayoutMarginItemColorLeft2Props;
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutBorder6 = ({ layout, marginItemColorLeft, tags }: WiredStyleVolterBlueLayoutBorder6Props) => {
    return (
        <Region
            name="border"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutLeftPaddingItem2 = ({ border, border2, layout, tags }: WiredStyleVolterBlueLayoutLeftPaddingItem2Props) => {
    return (
        <Region
            name="left_padding"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutMiniButtonClick = ({ layout, onMiniButtonClick, srcMiniButtonIcon, tags }: WiredStyleVolterBlueLayoutMiniButtonClickProps) => {
    return (
        <Region
            name="mini_button_click"
            tags={tags}
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

/** Row template `mini_button_bg` of WiredStyleVolterBlueLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterBlueLayoutMiniButtonBgItemProps {
    layout?: BoxLayout;
    miniButtonClick?: WiredStyleVolterBlueLayoutMiniButtonClickProps;
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutMiniButtonBgItem = ({ layout, miniButtonClick, tags }: WiredStyleVolterBlueLayoutMiniButtonBgItemProps) => {
    return (
        <Region
            name="mini_button_bg"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutMarginItemColorRight2 = ({ layout, tags }: WiredStyleVolterBlueLayoutMarginItemColorRight2Props) => {
    return (
        <Region
            name="margin_item_color_right"
            tags={tags}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterBlueLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterBlueLayoutBorder7Props {
    layout?: BoxLayout;
    marginItemColorRight?: WiredStyleVolterBlueLayoutMarginItemColorRight2Props;
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutBorder7 = ({ layout, marginItemColorRight, tags }: WiredStyleVolterBlueLayoutBorder7Props) => {
    return (
        <Region
            name="border"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutBorder8 = ({ layout, tags }: WiredStyleVolterBlueLayoutBorder8Props) => {
    return (
        <Region
            name="border"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutRightPaddingItem2 = ({ border, border2, layout, tags }: WiredStyleVolterBlueLayoutRightPaddingItem2Props) => {
    return (
        <Region
            name="right_padding"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutMiniButtonView = ({ itemsMiniButtonView, layout, tags }: WiredStyleVolterBlueLayoutMiniButtonViewProps) => {
    return (
        <Region
            name="mini_button_view"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutMenuItemTemplateItem = ({ captionText, layout, onCheckbox, onMenuItemTemplate, tags }: WiredStyleVolterBlueLayoutMenuItemTemplateItemProps) => {
    return (
        <Region
            name="menu_item_template"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutSpacerTemplateItem = ({ layout, tags }: WiredStyleVolterBlueLayoutSpacerTemplateItemProps) => {
    return (
        <Region
            name="spacer_template"
            tags={tags}
            layout={{ width: 141, height: 3, flexShrink: 0, ...layout }}
        >
            <Region
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
    tags?: string[];
}

export const WiredStyleVolterBlueLayoutMenuList = ({ itemsMenuList, layout, tags }: WiredStyleVolterBlueLayoutMenuListProps) => {
    return (
        <Region
            name="menu_list"
            tags={tags}
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
