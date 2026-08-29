import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1157_wired_style_volter_yellow_xml` (layout "wired_style_volter_yellow", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleVolterYellowLayoutProps {
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    expandCollapseRegion?: WiredStyleVolterYellowLayoutExpandCollapseRegionProps;
    inputTemplate?: WiredStyleVolterYellowLayoutInputTemplateProps;
    layout?: BoxLayout;
    menuList?: WiredStyleVolterYellowLayoutMenuListProps;
    miniButtonView?: WiredStyleVolterYellowLayoutMiniButtonViewProps;
    onButton?: () => void;
    onCheckboxView?: () => void;
    onDropdownView?: () => void;
    onFrame?: () => void;
    onIconbuttonDown?: () => void;
    onIconbuttonLeft?: () => void;
    onIconbuttonRight?: () => void;
    onIconbuttonUp?: () => void;
    onRadiobuttonView?: () => void;
    rulerView?: WiredStyleVolterYellowLayoutRulerViewProps;
    slider?: WiredStyleVolterYellowLayoutSliderProps;
    sourcetypeSelectorView?: WiredStyleVolterYellowLayoutSourcetypeSelectorViewProps;
    visibleButton?: boolean;
    visibleCheckboxView?: boolean;
    visibleDropdownView?: boolean;
    visibleIconbuttonDown?: boolean;
    visibleIconbuttonLeft?: boolean;
    visibleIconbuttonRight?: boolean;
    visibleIconbuttonUp?: boolean;
    visibleInnerBorder?: boolean;
    visibleQuickMenu?: boolean;
}

export const WiredStyleVolterYellowLayout = ({ captionTextBoldView, captionTextHtml, captionTextView, expandCollapseRegion, inputTemplate, layout, menuList, miniButtonView, onButton, onCheckboxView, onDropdownView, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onRadiobuttonView, rulerView, slider, sourcetypeSelectorView, visibleButton, visibleCheckboxView, visibleDropdownView, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInnerBorder, visibleQuickMenu }: WiredStyleVolterYellowLayoutProps) => {
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
                        tintColor="#faea7c"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Frame
                    variant="2"
                    id="frame"
                    name="frame"
                    visible={false}
                    caption={t('wiredfurni.title')}
                    tintColor="#fac200"
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 200, minWidth: 100 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%' }} />
                </Frame>
                <WiredStyleVolterYellowLayoutRulerView {...rulerView} />
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
                <WiredStyleVolterYellowLayoutInputTemplate {...inputTemplate} />
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
                <RadioButton
                    variant="2"
                    name="radiobutton_view"
                    onPointerTap={onRadiobuttonView}
                    layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 17 }}
                />
                <WiredStyleVolterYellowLayoutExpandCollapseRegion {...expandCollapseRegion} />
                <WiredStyleVolterYellowLayoutSourcetypeSelectorView {...sourcetypeSelectorView} />
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
                <WiredStyleVolterYellowLayoutSlider {...slider} />
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
                <WiredStyleVolterYellowLayoutMiniButtonView {...miniButtonView} />
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
                                <WiredStyleVolterYellowLayoutMenuList {...menuList} />
                            </Border>
                        </Border>
                    </Border>
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `ruler_view` of WiredStyleVolterYellowLayout - configured through the parent's `rulerView` prop. */
export interface WiredStyleVolterYellowLayoutRulerViewProps {
    layout?: BoxLayout;
    tags?: string[];
    visibleRulerView?: boolean;
}

export const WiredStyleVolterYellowLayoutRulerView = ({ layout, tags, visibleRulerView }: WiredStyleVolterYellowLayoutRulerViewProps) => {
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

/** Named region `input_template` of WiredStyleVolterYellowLayout - configured through the parent's `inputTemplate` prop. */
export interface WiredStyleVolterYellowLayoutInputTemplateProps {
    layout?: BoxLayout;
    tags?: string[];
    visibleInputTemplate?: boolean;
}

export const WiredStyleVolterYellowLayoutInputTemplate = ({ layout, tags, visibleInputTemplate }: WiredStyleVolterYellowLayoutInputTemplateProps) => {
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

/** Named region `expand_collapse_region` of WiredStyleVolterYellowLayout - configured through the parent's `expandCollapseRegion` prop. */
export interface WiredStyleVolterYellowLayoutExpandCollapseRegionProps {
    layout?: BoxLayout;
    onExpandCollapseRegion?: () => void;
    srcDownArrow?: string;
    srcUpArrow?: string;
    tags?: string[];
    visibleExpandCollapseRegion?: boolean;
}

export const WiredStyleVolterYellowLayoutExpandCollapseRegion = ({ layout, onExpandCollapseRegion, srcDownArrow, srcUpArrow, tags, visibleExpandCollapseRegion }: WiredStyleVolterYellowLayoutExpandCollapseRegionProps) => {
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

/** Named region `border` of WiredStyleVolterYellowLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterYellowLayoutBorderProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutBorder = ({ layout, tags }: WiredStyleVolterYellowLayoutBorderProps) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Named region `margin_item_color_left` of WiredStyleVolterYellowLayout - configured through the parent's `marginItemColorLeft` prop. */
export interface WiredStyleVolterYellowLayoutMarginItemColorLeftProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutMarginItemColorLeft = ({ layout, tags }: WiredStyleVolterYellowLayoutMarginItemColorLeftProps) => {
    return (
        <Region
            name="margin_item_color_left"
            tags={tags}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterYellowLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterYellowLayoutBorder2Props {
    layout?: BoxLayout;
    marginItemColorLeft?: WiredStyleVolterYellowLayoutMarginItemColorLeftProps;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutBorder2 = ({ layout, marginItemColorLeft, tags }: WiredStyleVolterYellowLayoutBorder2Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterYellowLayoutMarginItemColorLeft {...marginItemColorLeft} />
        </Region>
    );
};

/** Row template `left_padding` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutLeftPaddingItemProps {
    border?: WiredStyleVolterYellowLayoutBorderProps;
    border2?: WiredStyleVolterYellowLayoutBorder2Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutLeftPaddingItem = ({ border, border2, layout, tags }: WiredStyleVolterYellowLayoutLeftPaddingItemProps) => {
    return (
        <Region
            name="left_padding"
            tags={tags}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterYellowLayoutBorder {...border} />
            <WiredStyleVolterYellowLayoutBorder2 {...border2} />
        </Region>
    );
};

/** Row template `left_pad` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutLeftPadItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutLeftPadItem = ({ layout, tags }: WiredStyleVolterYellowLayoutLeftPadItemProps) => {
    return (
        <Region
            name="left_pad"
            tags={tags}
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Row template `type_icon_bitmap` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutTypeIconBitmapItemProps {
    layout?: BoxLayout;
    srcTypeIconBitmap?: string;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutTypeIconBitmapItem = ({ layout, srcTypeIconBitmap, tags }: WiredStyleVolterYellowLayoutTypeIconBitmapItemProps) => {
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

/** Row template `right_pad` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutRightPadItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutRightPadItem = ({ layout, tags }: WiredStyleVolterYellowLayoutRightPadItemProps) => {
    return (
        <Region
            name="right_pad"
            tags={tags}
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Named region `source_elements` of WiredStyleVolterYellowLayout - configured through the parent's `sourceElements` prop. */
export interface WiredStyleVolterYellowLayoutSourceElementsProps {
    itemsSourceElements?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutSourceElements = ({ itemsSourceElements, layout, tags }: WiredStyleVolterYellowLayoutSourceElementsProps) => {
    return (
        <Region
            name="source_elements"
            tags={tags}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row', ...layout }}
        >
            {itemsSourceElements ?? (
                <>
                    <WiredStyleVolterYellowLayoutLeftPadItem />
                    <WiredStyleVolterYellowLayoutTypeIconBitmapItem />
                    <WiredStyleVolterYellowLayoutRightPadItem />
                </>
            )}
        </Region>
    );
};

/** Row template `source_btn` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutSourceBtnItemProps {
    layout?: BoxLayout;
    onSourceBtn?: () => void;
    sourceElements?: WiredStyleVolterYellowLayoutSourceElementsProps;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutSourceBtnItem = ({ layout, onSourceBtn, sourceElements, tags }: WiredStyleVolterYellowLayoutSourceBtnItemProps) => {
    return (
        <Region
            name="source_btn"
            tags={tags}
            backgroundColor="#ffffff"
            onPointerTap={onSourceBtn}
            cursor="pointer"
            layout={{ width: 13, height: 15, flexShrink: 0, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterYellowLayoutSourceElements {...sourceElements} />
        </Region>
    );
};

/** Named region `source_options_list` of WiredStyleVolterYellowLayout - configured through the parent's `sourceOptionsList` prop. */
export interface WiredStyleVolterYellowLayoutSourceOptionsListProps {
    itemsSourceOptionsList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutSourceOptionsList = ({ itemsSourceOptionsList, layout, tags }: WiredStyleVolterYellowLayoutSourceOptionsListProps) => {
    return (
        <Region
            name="source_options_list"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row', gap: 1, ...layout }}
        >
            {itemsSourceOptionsList ?? (
                <WiredStyleVolterYellowLayoutSourceBtnItem />
            )}
        </Region>
    );
};

/** Named region `source_options_cont` of WiredStyleVolterYellowLayout - configured through the parent's `sourceOptionsCont` prop. */
export interface WiredStyleVolterYellowLayoutSourceOptionsContProps {
    layout?: BoxLayout;
    sourceOptionsList?: WiredStyleVolterYellowLayoutSourceOptionsListProps;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutSourceOptionsCont = ({ layout, sourceOptionsList, tags }: WiredStyleVolterYellowLayoutSourceOptionsContProps) => {
    return (
        <Region
            name="source_options_cont"
            tags={tags}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterYellowLayoutSourceOptionsList {...sourceOptionsList} />
        </Region>
    );
};

/** Row template `source_options_border` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutSourceOptionsBorderItemProps {
    layout?: BoxLayout;
    sourceOptionsCont?: WiredStyleVolterYellowLayoutSourceOptionsContProps;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutSourceOptionsBorderItem = ({ layout, sourceOptionsCont, tags }: WiredStyleVolterYellowLayoutSourceOptionsBorderItemProps) => {
    return (
        <Region
            name="source_options_border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterYellowLayoutSourceOptionsCont {...sourceOptionsCont} />
        </Region>
    );
};

/** Named region `margin_item_color_right` of WiredStyleVolterYellowLayout - configured through the parent's `marginItemColorRight` prop. */
export interface WiredStyleVolterYellowLayoutMarginItemColorRightProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutMarginItemColorRight = ({ layout, tags }: WiredStyleVolterYellowLayoutMarginItemColorRightProps) => {
    return (
        <Region
            name="margin_item_color_right"
            tags={tags}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterYellowLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterYellowLayoutBorder3Props {
    layout?: BoxLayout;
    marginItemColorRight?: WiredStyleVolterYellowLayoutMarginItemColorRightProps;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutBorder3 = ({ layout, marginItemColorRight, tags }: WiredStyleVolterYellowLayoutBorder3Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterYellowLayoutMarginItemColorRight {...marginItemColorRight} />
        </Region>
    );
};

/** Named region `border` of WiredStyleVolterYellowLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterYellowLayoutBorder4Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutBorder4 = ({ layout, tags }: WiredStyleVolterYellowLayoutBorder4Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Row template `right_padding` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutRightPaddingItemProps {
    border?: WiredStyleVolterYellowLayoutBorder3Props;
    border2?: WiredStyleVolterYellowLayoutBorder4Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutRightPaddingItem = ({ border, border2, layout, tags }: WiredStyleVolterYellowLayoutRightPaddingItemProps) => {
    return (
        <Region
            name="right_padding"
            tags={tags}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterYellowLayoutBorder3 {...border} />
            <WiredStyleVolterYellowLayoutBorder4 {...border2} />
        </Region>
    );
};

/** Named region `sourcetype_selector_view` of WiredStyleVolterYellowLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleVolterYellowLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout, tags }: WiredStyleVolterYellowLayoutSourcetypeSelectorViewProps) => {
    return (
        <Region
            name="sourcetype_selector_view"
            tags={tags}
            visible={false}
            layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
        >
            {itemsSourcetypeSelectorView ?? (
                <>
                    <WiredStyleVolterYellowLayoutLeftPaddingItem />
                    <WiredStyleVolterYellowLayoutSourceOptionsBorderItem />
                    <WiredStyleVolterYellowLayoutRightPaddingItem />
                </>
            )}
        </Region>
    );
};

/** Named region `slider_movement_area` of WiredStyleVolterYellowLayout - configured through the parent's `sliderMovementArea` prop. */
export interface WiredStyleVolterYellowLayoutSliderMovementAreaProps {
    layout?: BoxLayout;
    srcSliderButton?: string;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutSliderMovementArea = ({ layout, srcSliderButton, tags }: WiredStyleVolterYellowLayoutSliderMovementAreaProps) => {
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

/** Named region `slider` of WiredStyleVolterYellowLayout - configured through the parent's `slider` prop. */
export interface WiredStyleVolterYellowLayoutSliderProps {
    layout?: BoxLayout;
    sliderMovementArea?: WiredStyleVolterYellowLayoutSliderMovementAreaProps;
    srcSliderBase?: string;
    tags?: string[];
    visibleSlider?: boolean;
}

export const WiredStyleVolterYellowLayoutSlider = ({ layout, sliderMovementArea, srcSliderBase, tags, visibleSlider }: WiredStyleVolterYellowLayoutSliderProps) => {
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
            <WiredStyleVolterYellowLayoutSliderMovementArea {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `border` of WiredStyleVolterYellowLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterYellowLayoutBorder5Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutBorder5 = ({ layout, tags }: WiredStyleVolterYellowLayoutBorder5Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Named region `margin_item_color_left` of WiredStyleVolterYellowLayout - configured through the parent's `marginItemColorLeft` prop. */
export interface WiredStyleVolterYellowLayoutMarginItemColorLeft2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutMarginItemColorLeft2 = ({ layout, tags }: WiredStyleVolterYellowLayoutMarginItemColorLeft2Props) => {
    return (
        <Region
            name="margin_item_color_left"
            tags={tags}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterYellowLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterYellowLayoutBorder6Props {
    layout?: BoxLayout;
    marginItemColorLeft?: WiredStyleVolterYellowLayoutMarginItemColorLeft2Props;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutBorder6 = ({ layout, marginItemColorLeft, tags }: WiredStyleVolterYellowLayoutBorder6Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterYellowLayoutMarginItemColorLeft2 {...marginItemColorLeft} />
        </Region>
    );
};

/** Row template `left_padding` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutLeftPaddingItem2Props {
    border?: WiredStyleVolterYellowLayoutBorder5Props;
    border2?: WiredStyleVolterYellowLayoutBorder6Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutLeftPaddingItem2 = ({ border, border2, layout, tags }: WiredStyleVolterYellowLayoutLeftPaddingItem2Props) => {
    return (
        <Region
            name="left_padding"
            tags={tags}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterYellowLayoutBorder5 {...border} />
            <WiredStyleVolterYellowLayoutBorder6 {...border2} />
        </Region>
    );
};

/** Named region `mini_button_click` of WiredStyleVolterYellowLayout - configured through the parent's `miniButtonClick` prop. */
export interface WiredStyleVolterYellowLayoutMiniButtonClickProps {
    layout?: BoxLayout;
    onMiniButtonClick?: () => void;
    srcMiniButtonIcon?: string;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutMiniButtonClick = ({ layout, onMiniButtonClick, srcMiniButtonIcon, tags }: WiredStyleVolterYellowLayoutMiniButtonClickProps) => {
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

/** Row template `mini_button_bg` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutMiniButtonBgItemProps {
    layout?: BoxLayout;
    miniButtonClick?: WiredStyleVolterYellowLayoutMiniButtonClickProps;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutMiniButtonBgItem = ({ layout, miniButtonClick, tags }: WiredStyleVolterYellowLayoutMiniButtonBgItemProps) => {
    return (
        <Region
            name="mini_button_bg"
            tags={tags}
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterYellowLayoutMiniButtonClick {...miniButtonClick} />
        </Region>
    );
};

/** Named region `margin_item_color_right` of WiredStyleVolterYellowLayout - configured through the parent's `marginItemColorRight` prop. */
export interface WiredStyleVolterYellowLayoutMarginItemColorRight2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutMarginItemColorRight2 = ({ layout, tags }: WiredStyleVolterYellowLayoutMarginItemColorRight2Props) => {
    return (
        <Region
            name="margin_item_color_right"
            tags={tags}
            backgroundColor="#ffeda5"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterYellowLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterYellowLayoutBorder7Props {
    layout?: BoxLayout;
    marginItemColorRight?: WiredStyleVolterYellowLayoutMarginItemColorRight2Props;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutBorder7 = ({ layout, marginItemColorRight, tags }: WiredStyleVolterYellowLayoutBorder7Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterYellowLayoutMarginItemColorRight2 {...marginItemColorRight} />
        </Region>
    );
};

/** Named region `border` of WiredStyleVolterYellowLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterYellowLayoutBorder8Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutBorder8 = ({ layout, tags }: WiredStyleVolterYellowLayoutBorder8Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Row template `right_padding` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutRightPaddingItem2Props {
    border?: WiredStyleVolterYellowLayoutBorder7Props;
    border2?: WiredStyleVolterYellowLayoutBorder8Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutRightPaddingItem2 = ({ border, border2, layout, tags }: WiredStyleVolterYellowLayoutRightPaddingItem2Props) => {
    return (
        <Region
            name="right_padding"
            tags={tags}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterYellowLayoutBorder7 {...border} />
            <WiredStyleVolterYellowLayoutBorder8 {...border2} />
        </Region>
    );
};

/** Named region `mini_button_view` of WiredStyleVolterYellowLayout - configured through the parent's `miniButtonView` prop. */
export interface WiredStyleVolterYellowLayoutMiniButtonViewProps {
    itemsMiniButtonView?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutMiniButtonView = ({ itemsMiniButtonView, layout, tags }: WiredStyleVolterYellowLayoutMiniButtonViewProps) => {
    return (
        <Region
            name="mini_button_view"
            tags={tags}
            visible={false}
            layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
        >
            {itemsMiniButtonView ?? (
                <>
                    <WiredStyleVolterYellowLayoutLeftPaddingItem2 />
                    <WiredStyleVolterYellowLayoutMiniButtonBgItem />
                    <WiredStyleVolterYellowLayoutRightPaddingItem2 />
                </>
            )}
        </Region>
    );
};

/** Row template `menu_item_template` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutMenuItemTemplateItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onCheckbox?: () => void;
    onMenuItemTemplate?: () => void;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutMenuItemTemplateItem = ({ captionText, layout, onCheckbox, onMenuItemTemplate, tags }: WiredStyleVolterYellowLayoutMenuItemTemplateItemProps) => {
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

/** Row template `spacer_template` of WiredStyleVolterYellowLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterYellowLayoutSpacerTemplateItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutSpacerTemplateItem = ({ layout, tags }: WiredStyleVolterYellowLayoutSpacerTemplateItemProps) => {
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

/** Named region `menu_list` of WiredStyleVolterYellowLayout - configured through the parent's `menuList` prop. */
export interface WiredStyleVolterYellowLayoutMenuListProps {
    itemsMenuList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterYellowLayoutMenuList = ({ itemsMenuList, layout, tags }: WiredStyleVolterYellowLayoutMenuListProps) => {
    return (
        <Region
            name="menu_list"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 23, flexDirection: 'column', ...layout }}
        >
            {itemsMenuList ?? (
                <>
                    <WiredStyleVolterYellowLayoutMenuItemTemplateItem />
                    <WiredStyleVolterYellowLayoutSpacerTemplateItem />
                </>
            )}
        </Region>
    );
};
