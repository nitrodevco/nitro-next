import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1165_wired_style_volter_xml` (layout "wired_style_volter", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleVolterLayoutProps {
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    expandCollapseRegion?: WiredStyleVolterLayoutExpandCollapseRegionProps;
    inputTemplate?: WiredStyleVolterLayoutInputTemplateProps;
    layout?: BoxLayout;
    menuList?: WiredStyleVolterLayoutMenuListProps;
    miniButtonView?: WiredStyleVolterLayoutMiniButtonViewProps;
    onAssetButton?: () => void;
    onButton?: () => void;
    onCheckboxView?: () => void;
    onDropdownView?: () => void;
    onFrame?: () => void;
    onIconbuttonDown?: () => void;
    onIconbuttonLeft?: () => void;
    onIconbuttonRight?: () => void;
    onIconbuttonUp?: () => void;
    onRadiobuttonView?: () => void;
    rulerView?: WiredStyleVolterLayoutRulerViewProps;
    slider?: WiredStyleVolterLayoutSliderProps;
    sourcetypeSelectorView?: WiredStyleVolterLayoutSourcetypeSelectorViewProps;
    srcAsset?: string;
    visibleButton?: boolean;
    visibleCheckboxView?: boolean;
    visibleDropdownView?: boolean;
    visibleIconbuttonDown?: boolean;
    visibleIconbuttonLeft?: boolean;
    visibleIconbuttonRight?: boolean;
    visibleIconbuttonUp?: boolean;
    visibleQuickMenu?: boolean;
    visibleRadiobuttonView?: boolean;
}

export const WiredStyleVolterLayout = ({ captionTextBoldView, captionTextHtml, captionTextView, expandCollapseRegion, inputTemplate, layout, menuList, miniButtonView, onAssetButton, onButton, onCheckboxView, onDropdownView, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onRadiobuttonView, rulerView, slider, sourcetypeSelectorView, srcAsset, visibleButton, visibleCheckboxView, visibleDropdownView, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleQuickMenu, visibleRadiobuttonView }: WiredStyleVolterLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
                backgroundColor="#3d3d3d"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
            >
                <WiredStyleVolterLayoutRulerView {...rulerView} />
                <Region
                    name="text_view"
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
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 96, top: 0, height: 13, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTextHtml ?? 'Use this by typing'}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <WiredStyleVolterLayoutInputTemplate {...inputTemplate} />
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
                        variant="1"
                        name="checkbox_view"
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
                        onPointerTap={onRadiobuttonView}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <WiredStyleVolterLayoutExpandCollapseRegion {...expandCollapseRegion} />
                <WiredStyleVolterLayoutSourcetypeSelectorView {...sourcetypeSelectorView} />
                <Region
                    visible={visibleIconbuttonLeft ?? false}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ContainerButton
                        variant="1"
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
                        variant="1"
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
                        variant="1"
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
                        variant="1"
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
                <WiredStyleVolterLayoutSlider {...slider} />
                <Region
                    visible={visibleButton ?? false}
                    layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 22 }}
                >
                    <Button
                        variant="1"
                        name="button"
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
                    visible={false}
                    caption={t('wiredfurni.title')}
                    tintColor="#3e3e3e"
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 0, width: 240, top: 0, height: 200, minWidth: 100 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%' }} />
                </Frame>
                <WiredStyleVolterLayoutMiniButtonView {...miniButtonView} />
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
                            tintColor="#5a5a5a"
                            layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                        >
                            <Border
                                variant="11"
                                tintColor="#424242"
                                layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                            >
                                <WiredStyleVolterLayoutMenuList {...menuList} />
                            </Border>
                        </Border>
                    </Border>
                </Region>
                <ContainerButton
                    variant="1"
                    name="asset_button"
                    dynamicStyle="button"
                    onPointerTap={onAssetButton}
                    layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
                >
                    <ThemeImage
                        name="asset"
                        tags={[ '#icon' ]}
                        src={srcAsset}
                        layout={{ position: 'absolute', left: 5, top: 5 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Named region `ruler_view` of WiredStyleVolterLayout - configured through the parent's `rulerView` prop. */
export interface WiredStyleVolterLayoutRulerViewProps {
    layout?: BoxLayout;
    tags?: string[];
    visibleRulerView?: boolean;
}

export const WiredStyleVolterLayoutRulerView = ({ layout, tags, visibleRulerView }: WiredStyleVolterLayoutRulerViewProps) => {
    return (
        <Region
            name="ruler_view"
            tags={tags}
            visible={visibleRulerView ?? false}
            layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1, ...layout }}
        >
            <Region
                backgroundColor="#232323"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1 }}
            />
        </Region>
    );
};

/** Named region `input_template` of WiredStyleVolterLayout - configured through the parent's `inputTemplate` prop. */
export interface WiredStyleVolterLayoutInputTemplateProps {
    layout?: BoxLayout;
    tags?: string[];
    visibleInputTemplate?: boolean;
}

export const WiredStyleVolterLayoutInputTemplate = ({ layout, tags, visibleInputTemplate }: WiredStyleVolterLayoutInputTemplateProps) => {
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region
            name="input_template"
            tags={tags}
            visible={visibleInputTemplate ?? false}
            layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 15, ...layout }}
        >
            <TextInput
                value={fieldValue}
                onChange={setFieldValue}
                textColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
        </Region>
    );
};

/** Named region `expand_collapse_region` of WiredStyleVolterLayout - configured through the parent's `expandCollapseRegion` prop. */
export interface WiredStyleVolterLayoutExpandCollapseRegionProps {
    layout?: BoxLayout;
    onExpandCollapseRegion?: () => void;
    srcDownArrow?: string;
    srcUpArrow?: string;
    tags?: string[];
    visibleExpandCollapseRegion?: boolean;
}

export const WiredStyleVolterLayoutExpandCollapseRegion = ({ layout, onExpandCollapseRegion, srcDownArrow, srcUpArrow, tags, visibleExpandCollapseRegion }: WiredStyleVolterLayoutExpandCollapseRegionProps) => {
    return (
        <Region
            name="expand_collapse_region"
            tags={tags}
            visible={visibleExpandCollapseRegion ?? false}
            backgroundColor="#3d3d3d"
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

/** Named region `border` of WiredStyleVolterLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterLayoutBorderProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutBorder = ({ layout, tags }: WiredStyleVolterLayoutBorderProps) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Named region `margin_item_color_left` of WiredStyleVolterLayout - configured through the parent's `marginItemColorLeft` prop. */
export interface WiredStyleVolterLayoutMarginItemColorLeftProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutMarginItemColorLeft = ({ layout, tags }: WiredStyleVolterLayoutMarginItemColorLeftProps) => {
    return (
        <Region
            name="margin_item_color_left"
            tags={tags}
            backgroundColor="#333333"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterLayoutBorder2Props {
    layout?: BoxLayout;
    marginItemColorLeft?: WiredStyleVolterLayoutMarginItemColorLeftProps;
    tags?: string[];
}

export const WiredStyleVolterLayoutBorder2 = ({ layout, marginItemColorLeft, tags }: WiredStyleVolterLayoutBorder2Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterLayoutMarginItemColorLeft {...marginItemColorLeft} />
        </Region>
    );
};

/** Row template `left_padding` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutLeftPaddingItemProps {
    border?: WiredStyleVolterLayoutBorderProps;
    border2?: WiredStyleVolterLayoutBorder2Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutLeftPaddingItem = ({ border, border2, layout, tags }: WiredStyleVolterLayoutLeftPaddingItemProps) => {
    return (
        <Region
            name="left_padding"
            tags={tags}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterLayoutBorder {...border} />
            <WiredStyleVolterLayoutBorder2 {...border2} />
        </Region>
    );
};

/** Row template `left_pad` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutLeftPadItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutLeftPadItem = ({ layout, tags }: WiredStyleVolterLayoutLeftPadItemProps) => {
    return (
        <Region
            name="left_pad"
            tags={tags}
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Row template `type_icon_bitmap` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutTypeIconBitmapItemProps {
    layout?: BoxLayout;
    srcTypeIconBitmap?: string;
    tags?: string[];
}

export const WiredStyleVolterLayoutTypeIconBitmapItem = ({ layout, srcTypeIconBitmap, tags }: WiredStyleVolterLayoutTypeIconBitmapItemProps) => {
    return (
        <ThemeImage
            name="type_icon_bitmap"
            tags={tags}
            src={srcTypeIconBitmap}
            layout={{ width: 9, height: 11, flexShrink: 0, minHeight: 11, maxHeight: 11, ...layout }}
        />
    );
};

/** Row template `right_pad` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutRightPadItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutRightPadItem = ({ layout, tags }: WiredStyleVolterLayoutRightPadItemProps) => {
    return (
        <Region
            name="right_pad"
            tags={tags}
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Named region `source_elements` of WiredStyleVolterLayout - configured through the parent's `sourceElements` prop. */
export interface WiredStyleVolterLayoutSourceElementsProps {
    itemsSourceElements?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutSourceElements = ({ itemsSourceElements, layout, tags }: WiredStyleVolterLayoutSourceElementsProps) => {
    return (
        <Region
            name="source_elements"
            tags={tags}
            backgroundColor="#333333"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row', ...layout }}
        >
            {itemsSourceElements ?? (
                <>
                    <WiredStyleVolterLayoutLeftPadItem />
                    <WiredStyleVolterLayoutTypeIconBitmapItem />
                    <WiredStyleVolterLayoutRightPadItem />
                </>
            )}
        </Region>
    );
};

/** Row template `source_btn` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutSourceBtnItemProps {
    layout?: BoxLayout;
    onSourceBtn?: () => void;
    sourceElements?: WiredStyleVolterLayoutSourceElementsProps;
    tags?: string[];
}

export const WiredStyleVolterLayoutSourceBtnItem = ({ layout, onSourceBtn, sourceElements, tags }: WiredStyleVolterLayoutSourceBtnItemProps) => {
    return (
        <Region
            name="source_btn"
            tags={tags}
            backgroundColor="#ffffff"
            onPointerTap={onSourceBtn}
            cursor="pointer"
            layout={{ width: 13, height: 15, flexShrink: 0, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterLayoutSourceElements {...sourceElements} />
        </Region>
    );
};

/** Named region `source_options_list` of WiredStyleVolterLayout - configured through the parent's `sourceOptionsList` prop. */
export interface WiredStyleVolterLayoutSourceOptionsListProps {
    itemsSourceOptionsList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutSourceOptionsList = ({ itemsSourceOptionsList, layout, tags }: WiredStyleVolterLayoutSourceOptionsListProps) => {
    return (
        <Region
            name="source_options_list"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row', gap: 1, ...layout }}
        >
            {itemsSourceOptionsList ?? (
                <WiredStyleVolterLayoutSourceBtnItem />
            )}
        </Region>
    );
};

/** Named region `source_options_cont` of WiredStyleVolterLayout - configured through the parent's `sourceOptionsCont` prop. */
export interface WiredStyleVolterLayoutSourceOptionsContProps {
    layout?: BoxLayout;
    sourceOptionsList?: WiredStyleVolterLayoutSourceOptionsListProps;
    tags?: string[];
}

export const WiredStyleVolterLayoutSourceOptionsCont = ({ layout, sourceOptionsList, tags }: WiredStyleVolterLayoutSourceOptionsContProps) => {
    return (
        <Region
            name="source_options_cont"
            tags={tags}
            backgroundColor="#181818"
            layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterLayoutSourceOptionsList {...sourceOptionsList} />
        </Region>
    );
};

/** Row template `source_options_border` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutSourceOptionsBorderItemProps {
    layout?: BoxLayout;
    sourceOptionsCont?: WiredStyleVolterLayoutSourceOptionsContProps;
    tags?: string[];
}

export const WiredStyleVolterLayoutSourceOptionsBorderItem = ({ layout, sourceOptionsCont, tags }: WiredStyleVolterLayoutSourceOptionsBorderItemProps) => {
    return (
        <Region
            name="source_options_border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterLayoutSourceOptionsCont {...sourceOptionsCont} />
        </Region>
    );
};

/** Named region `margin_item_color_right` of WiredStyleVolterLayout - configured through the parent's `marginItemColorRight` prop. */
export interface WiredStyleVolterLayoutMarginItemColorRightProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutMarginItemColorRight = ({ layout, tags }: WiredStyleVolterLayoutMarginItemColorRightProps) => {
    return (
        <Region
            name="margin_item_color_right"
            tags={tags}
            backgroundColor="#222222"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterLayoutBorder3Props {
    layout?: BoxLayout;
    marginItemColorRight?: WiredStyleVolterLayoutMarginItemColorRightProps;
    tags?: string[];
}

export const WiredStyleVolterLayoutBorder3 = ({ layout, marginItemColorRight, tags }: WiredStyleVolterLayoutBorder3Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterLayoutMarginItemColorRight {...marginItemColorRight} />
        </Region>
    );
};

/** Named region `border` of WiredStyleVolterLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterLayoutBorder4Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutBorder4 = ({ layout, tags }: WiredStyleVolterLayoutBorder4Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Row template `right_padding` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutRightPaddingItemProps {
    border?: WiredStyleVolterLayoutBorder3Props;
    border2?: WiredStyleVolterLayoutBorder4Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutRightPaddingItem = ({ border, border2, layout, tags }: WiredStyleVolterLayoutRightPaddingItemProps) => {
    return (
        <Region
            name="right_padding"
            tags={tags}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterLayoutBorder3 {...border} />
            <WiredStyleVolterLayoutBorder4 {...border2} />
        </Region>
    );
};

/** Named region `sourcetype_selector_view` of WiredStyleVolterLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleVolterLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout, tags }: WiredStyleVolterLayoutSourcetypeSelectorViewProps) => {
    return (
        <Region
            name="sourcetype_selector_view"
            tags={tags}
            visible={false}
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
    );
};

/** Named region `slider_movement_area` of WiredStyleVolterLayout - configured through the parent's `sliderMovementArea` prop. */
export interface WiredStyleVolterLayoutSliderMovementAreaProps {
    layout?: BoxLayout;
    srcSliderButton?: string;
    tags?: string[];
}

export const WiredStyleVolterLayoutSliderMovementArea = ({ layout, srcSliderButton, tags }: WiredStyleVolterLayoutSliderMovementAreaProps) => {
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

/** Named region `slider` of WiredStyleVolterLayout - configured through the parent's `slider` prop. */
export interface WiredStyleVolterLayoutSliderProps {
    layout?: BoxLayout;
    sliderMovementArea?: WiredStyleVolterLayoutSliderMovementAreaProps;
    srcSliderBase?: string;
    tags?: string[];
    visibleSlider?: boolean;
}

export const WiredStyleVolterLayoutSlider = ({ layout, sliderMovementArea, srcSliderBase, tags, visibleSlider }: WiredStyleVolterLayoutSliderProps) => {
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
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 17 }}
            />
            <WiredStyleVolterLayoutSliderMovementArea {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `border` of WiredStyleVolterLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterLayoutBorder5Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutBorder5 = ({ layout, tags }: WiredStyleVolterLayoutBorder5Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Named region `margin_item_color_left` of WiredStyleVolterLayout - configured through the parent's `marginItemColorLeft` prop. */
export interface WiredStyleVolterLayoutMarginItemColorLeft2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutMarginItemColorLeft2 = ({ layout, tags }: WiredStyleVolterLayoutMarginItemColorLeft2Props) => {
    return (
        <Region
            name="margin_item_color_left"
            tags={tags}
            backgroundColor="#333333"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterLayoutBorder6Props {
    layout?: BoxLayout;
    marginItemColorLeft?: WiredStyleVolterLayoutMarginItemColorLeft2Props;
    tags?: string[];
}

export const WiredStyleVolterLayoutBorder6 = ({ layout, marginItemColorLeft, tags }: WiredStyleVolterLayoutBorder6Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterLayoutMarginItemColorLeft2 {...marginItemColorLeft} />
        </Region>
    );
};

/** Row template `left_padding` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutLeftPaddingItem2Props {
    border?: WiredStyleVolterLayoutBorder5Props;
    border2?: WiredStyleVolterLayoutBorder6Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutLeftPaddingItem2 = ({ border, border2, layout, tags }: WiredStyleVolterLayoutLeftPaddingItem2Props) => {
    return (
        <Region
            name="left_padding"
            tags={tags}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterLayoutBorder5 {...border} />
            <WiredStyleVolterLayoutBorder6 {...border2} />
        </Region>
    );
};

/** Named region `mini_button_click` of WiredStyleVolterLayout - configured through the parent's `miniButtonClick` prop. */
export interface WiredStyleVolterLayoutMiniButtonClickProps {
    layout?: BoxLayout;
    onMiniButtonClick?: () => void;
    srcMiniButtonIcon?: string;
    tags?: string[];
}

export const WiredStyleVolterLayoutMiniButtonClick = ({ layout, onMiniButtonClick, srcMiniButtonIcon, tags }: WiredStyleVolterLayoutMiniButtonClickProps) => {
    return (
        <Region
            name="mini_button_click"
            tags={tags}
            backgroundColor="#333333"
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

/** Row template `mini_button_bg` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutMiniButtonBgItemProps {
    layout?: BoxLayout;
    miniButtonClick?: WiredStyleVolterLayoutMiniButtonClickProps;
    tags?: string[];
}

export const WiredStyleVolterLayoutMiniButtonBgItem = ({ layout, miniButtonClick, tags }: WiredStyleVolterLayoutMiniButtonBgItemProps) => {
    return (
        <Region
            name="mini_button_bg"
            tags={tags}
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterLayoutMiniButtonClick {...miniButtonClick} />
        </Region>
    );
};

/** Named region `margin_item_color_right` of WiredStyleVolterLayout - configured through the parent's `marginItemColorRight` prop. */
export interface WiredStyleVolterLayoutMarginItemColorRight2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutMarginItemColorRight2 = ({ layout, tags }: WiredStyleVolterLayoutMarginItemColorRight2Props) => {
    return (
        <Region
            name="margin_item_color_right"
            tags={tags}
            backgroundColor="#333333"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleVolterLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterLayoutBorder7Props {
    layout?: BoxLayout;
    marginItemColorRight?: WiredStyleVolterLayoutMarginItemColorRight2Props;
    tags?: string[];
}

export const WiredStyleVolterLayoutBorder7 = ({ layout, marginItemColorRight, tags }: WiredStyleVolterLayoutBorder7Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleVolterLayoutMarginItemColorRight2 {...marginItemColorRight} />
        </Region>
    );
};

/** Named region `border` of WiredStyleVolterLayout - configured through the parent's `border` prop. */
export interface WiredStyleVolterLayoutBorder8Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutBorder8 = ({ layout, tags }: WiredStyleVolterLayoutBorder8Props) => {
    return (
        <Region
            name="border"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Row template `right_padding` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutRightPaddingItem2Props {
    border?: WiredStyleVolterLayoutBorder7Props;
    border2?: WiredStyleVolterLayoutBorder8Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutRightPaddingItem2 = ({ border, border2, layout, tags }: WiredStyleVolterLayoutRightPaddingItem2Props) => {
    return (
        <Region
            name="right_padding"
            tags={tags}
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleVolterLayoutBorder7 {...border} />
            <WiredStyleVolterLayoutBorder8 {...border2} />
        </Region>
    );
};

/** Named region `mini_button_view` of WiredStyleVolterLayout - configured through the parent's `miniButtonView` prop. */
export interface WiredStyleVolterLayoutMiniButtonViewProps {
    itemsMiniButtonView?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutMiniButtonView = ({ itemsMiniButtonView, layout, tags }: WiredStyleVolterLayoutMiniButtonViewProps) => {
    return (
        <Region
            name="mini_button_view"
            tags={tags}
            visible={false}
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
    );
};

/** Row template `menu_item_template` of WiredStyleVolterLayout - pass real rows through its `items…` slot. */
export interface WiredStyleVolterLayoutMenuItemTemplateItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onCheckbox?: () => void;
    onMenuItemTemplate?: () => void;
    tags?: string[];
}

export const WiredStyleVolterLayoutMenuItemTemplateItem = ({ captionText, layout, onCheckbox, onMenuItemTemplate, tags }: WiredStyleVolterLayoutMenuItemTemplateItemProps) => {
    return (
        <Region
            name="menu_item_template"
            tags={tags}
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
    tags?: string[];
}

export const WiredStyleVolterLayoutSpacerTemplateItem = ({ layout, tags }: WiredStyleVolterLayoutSpacerTemplateItemProps) => {
    return (
        <Region
            name="spacer_template"
            tags={tags}
            layout={{ width: 141, height: 3, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#666666"
                layout={{ position: 'absolute', left: 6, right: 6, top: 1, height: 1 }}
            />
        </Region>
    );
};

/** Named region `menu_list` of WiredStyleVolterLayout - configured through the parent's `menuList` prop. */
export interface WiredStyleVolterLayoutMenuListProps {
    itemsMenuList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleVolterLayoutMenuList = ({ itemsMenuList, layout, tags }: WiredStyleVolterLayoutMenuListProps) => {
    return (
        <Region
            name="menu_list"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 23, flexDirection: 'column', ...layout }}
        >
            {itemsMenuList ?? (
                <>
                    <WiredStyleVolterLayoutMenuItemTemplateItem />
                    <WiredStyleVolterLayoutSpacerTemplateItem />
                </>
            )}
        </Region>
    );
};
