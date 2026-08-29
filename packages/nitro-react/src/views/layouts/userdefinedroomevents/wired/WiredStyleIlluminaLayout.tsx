import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1171_wired_style_illumina_xml` (layout "wired_style_illumina", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleIlluminaLayoutProps {
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    charLimitWarn?: WiredStyleIlluminaLayoutCharLimitWarnProps;
    expandCollapseRegion?: WiredStyleIlluminaLayoutExpandCollapseRegionProps;
    layout?: BoxLayout;
    menuList?: WiredStyleIlluminaLayoutMenuListProps;
    miniButtonView?: WiredStyleIlluminaLayoutMiniButtonViewProps;
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
    rulerView?: WiredStyleIlluminaLayoutRulerViewProps;
    slider?: WiredStyleIlluminaLayoutSliderProps;
    sourcetypeSelectorView?: WiredStyleIlluminaLayoutSourcetypeSelectorViewProps;
    srcAsset?: string;
    visibleAssetButton?: boolean;
    visibleButton?: boolean;
    visibleCheckboxView?: boolean;
    visibleDropdownView?: boolean;
    visibleIconbuttonDown?: boolean;
    visibleIconbuttonLeft?: boolean;
    visibleIconbuttonRight?: boolean;
    visibleIconbuttonUp?: boolean;
    visibleInputTemplate?: boolean;
    visibleQuickMenu?: boolean;
    visibleRadiobuttonView?: boolean;
}

export const WiredStyleIlluminaLayout = ({ captionTextBoldView, captionTextHtml, captionTextView, charLimitWarn, expandCollapseRegion, layout, menuList, miniButtonView, onAssetButton, onButton, onCheckboxView, onDropdownView, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onRadiobuttonView, rulerView, slider, sourcetypeSelectorView, srcAsset, visibleAssetButton, visibleButton, visibleCheckboxView, visibleDropdownView, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInputTemplate, visibleQuickMenu, visibleRadiobuttonView }: WiredStyleIlluminaLayoutProps) => {
    const t = useTranslation();
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
                backgroundColor="#e2e2e2"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
            >
                <WiredStyleIlluminaLayoutRulerView {...rulerView} />
                <Region
                    name="text_view"
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
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <TextInput
                            value={fieldValue}
                            onChange={setFieldValue}
                            textColor="#4a4a4a"
                            layout={{ position: 'absolute', left: 4, right: 4, top: 2, bottom: 3 }}
                        />
                        <WiredStyleIlluminaLayoutCharLimitWarn {...charLimitWarn} />
                    </Border>
                </Region>
                <Region
                    visible={visibleDropdownView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 22 }}
                >
                    <Dropmenu
                        variant="100"
                        name="dropdown_view"
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
                        onPointerTap={onRadiobuttonView}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <WiredStyleIlluminaLayoutExpandCollapseRegion {...expandCollapseRegion} />
                <Region
                    visible={visibleIconbuttonLeft ?? false}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                >
                    <ContainerButton
                        variant="102"
                        name="iconbutton_left"
                        onPointerTap={onIconbuttonLeft}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="2"
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
                        onPointerTap={onIconbuttonRight}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="3"
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
                        onPointerTap={onIconbuttonUp}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="1"
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
                        onPointerTap={onIconbuttonDown}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="0"
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
                        tintColor="#000000"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Border
                            variant="11"
                            tintColor="#f2f2f2"
                            layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                        >
                            <Border
                                variant="11"
                                tintColor="#d6d6d6"
                                layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                            >
                                <WiredStyleIlluminaLayoutMenuList {...menuList} />
                            </Border>
                        </Border>
                    </Border>
                </Region>
                <WiredStyleIlluminaLayoutSourcetypeSelectorView
                    tags={[ 'NEW' ]}
                    {...sourcetypeSelectorView}
                />
                <WiredStyleIlluminaLayoutSlider {...slider} />
                <WiredStyleIlluminaLayoutMiniButtonView {...miniButtonView} />
                <Region
                    visible={visibleAssetButton ?? false}
                    layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
                >
                    <ContainerButton
                        variant="102"
                        name="asset_button"
                        dynamicStyle="button"
                        onPointerTap={onAssetButton}
                        layout={{ width: '100%', height: '100%' }}
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
        </Region>
    );
};

/** Named region `ruler_view` of WiredStyleIlluminaLayout - configured through the parent's `rulerView` prop. */
export interface WiredStyleIlluminaLayoutRulerViewProps {
    layout?: BoxLayout;
    tags?: string[];
    visibleRulerView?: boolean;
}

export const WiredStyleIlluminaLayoutRulerView = ({ layout, tags, visibleRulerView }: WiredStyleIlluminaLayoutRulerViewProps) => {
    return (
        <Region
            name="ruler_view"
            tags={tags}
            visible={visibleRulerView ?? false}
            layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 2, ...layout }}
        >
            <Region
                backgroundColor="#aaaaaa"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1 }}
            />
            <Region
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 1 }}
            />
        </Region>
    );
};

/** Named region `char_limit_warn` of WiredStyleIlluminaLayout - configured through the parent's `charLimitWarn` prop. */
export interface WiredStyleIlluminaLayoutCharLimitWarnProps {
    captionLimitText?: string;
    layout?: BoxLayout;
    tags?: string[];
    visibleCharLimitWarn?: boolean;
}

export const WiredStyleIlluminaLayoutCharLimitWarn = ({ captionLimitText, layout, tags, visibleCharLimitWarn }: WiredStyleIlluminaLayoutCharLimitWarnProps) => {
    return (
        <Region
            name="char_limit_warn"
            tags={tags}
            visible={visibleCharLimitWarn ?? false}
            layout={{ position: 'absolute', right: 0, width: 116, top: -30, height: 50, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#222222"
                blend={0.7}
                layout={{ position: 'absolute', right: 0, width: 49, top: 10, height: 17 }}
            >
                <Region
                    name="limit_text"
                    layout={{ position: 'absolute', left: 5, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLimitText ?? '95/100'}
                        textStyle="text-style-il-regular-white"
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Named region `expand_collapse_region` of WiredStyleIlluminaLayout - configured through the parent's `expandCollapseRegion` prop. */
export interface WiredStyleIlluminaLayoutExpandCollapseRegionProps {
    layout?: BoxLayout;
    onExpandCollapseRegion?: () => void;
    srcDownArrow?: string;
    srcUpArrow?: string;
    tags?: string[];
    visibleExpandCollapseRegion?: boolean;
}

export const WiredStyleIlluminaLayoutExpandCollapseRegion = ({ layout, onExpandCollapseRegion, srcDownArrow, srcUpArrow, tags, visibleExpandCollapseRegion }: WiredStyleIlluminaLayoutExpandCollapseRegionProps) => {
    return (
        <Region
            name="expand_collapse_region"
            tags={tags}
            visible={visibleExpandCollapseRegion ?? false}
            onPointerTap={onExpandCollapseRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 16, top: 2, height: 12, ...layout }}
        >
            <ThemeImage
                name="up_arrow"
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
                    src={srcDownArrow ?? layoutImage('wired_volter_downarrow.png')}
                    tint="#999999"
                    layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 10 }}
                />
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
    tags?: string[];
    visibleCheckbox?: boolean;
}

export const WiredStyleIlluminaLayoutMenuItemTemplateItem = ({ captionText, layout, onCheckbox, onMenuItemTemplate, tags, visibleCheckbox }: WiredStyleIlluminaLayoutMenuItemTemplateItemProps) => {
    return (
        <Region
            name="menu_item_template"
            tags={tags}
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
                    onPointerTap={onCheckbox}
                    layout={{ width: '100%', height: '100%' }}
                />
            </Region>
            <Region
                name="text"
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
    tags?: string[];
}

export const WiredStyleIlluminaLayoutSpacerTemplateItem = ({ layout, tags }: WiredStyleIlluminaLayoutSpacerTemplateItemProps) => {
    return (
        <Region
            name="spacer_template"
            tags={tags}
            layout={{ width: 141, height: 3, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#aaaaaa"
                layout={{ position: 'absolute', left: 6, right: 6, top: 1, height: 1 }}
            />
        </Region>
    );
};

/** Named region `menu_list` of WiredStyleIlluminaLayout - configured through the parent's `menuList` prop. */
export interface WiredStyleIlluminaLayoutMenuListProps {
    itemsMenuList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleIlluminaLayoutMenuList = ({ itemsMenuList, layout, tags }: WiredStyleIlluminaLayoutMenuListProps) => {
    return (
        <Region
            name="menu_list"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 23, flexDirection: 'column', ...layout }}
        >
            {itemsMenuList ?? (
                <>
                    <WiredStyleIlluminaLayoutMenuItemTemplateItem />
                    <WiredStyleIlluminaLayoutSpacerTemplateItem />
                </>
            )}
        </Region>
    );
};

/** Row template `left_button_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutLeftButtonTemplateItemProps {
    layout?: BoxLayout;
    onLeftButtonTemplate?: () => void;
    srcTypeImage?: string;
    tags?: string[];
}

export const WiredStyleIlluminaLayoutLeftButtonTemplateItem = ({ layout, onLeftButtonTemplate, srcTypeImage, tags }: WiredStyleIlluminaLayoutLeftButtonTemplateItemProps) => {
    return (
        <ContainerButton
            variant="104"
            name="left_button_template"
            tags={tags}
            dynamicStyle="button"
            onPointerTap={onLeftButtonTemplate}
            layout={{ width: 17, height: 19, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="type_image"
                tags={[ '#icon' ]}
                src={srcTypeImage ?? layoutImage('wired_styles_illumina_icon_source_furni.png')}
                layout={{ position: 'absolute', left: 6, top: 4, height: 11 }}
            />
        </ContainerButton>
    );
};

/** Row template `splitter_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutSplitterTemplateItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleIlluminaLayoutSplitterTemplateItem = ({ layout, tags }: WiredStyleIlluminaLayoutSplitterTemplateItemProps) => {
    return (
        <Region
            name="splitter_template"
            tags={tags}
            layout={{ width: 1, height: 19, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#919191"
                layout={{ position: 'absolute', left: 0, width: 1, top: 0, height: 18 }}
            />
            <Region
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
    tags?: string[];
}

export const WiredStyleIlluminaLayoutMiddleButtonTemplateItem = ({ layout, onMiddleButtonTemplate, srcTypeImage, tags }: WiredStyleIlluminaLayoutMiddleButtonTemplateItemProps) => {
    return (
        <ContainerButton
            variant="106"
            name="middle_button_template"
            tags={tags}
            dynamicStyle="button"
            onPointerTap={onMiddleButtonTemplate}
            layout={{ width: 14, height: 19, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="type_image"
                tags={[ '#icon' ]}
                src={srcTypeImage ?? layoutImage('wired_styles_illumina_icon_source_users.png')}
                layout={{ position: 'absolute', left: 3, top: 5, height: 10 }}
            />
        </ContainerButton>
    );
};

/** Row template `splitter_template` of WiredStyleIlluminaLayout - pass real rows through its `items…` slot. */
export interface WiredStyleIlluminaLayoutSplitterTemplateItem2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleIlluminaLayoutSplitterTemplateItem2 = ({ layout, tags }: WiredStyleIlluminaLayoutSplitterTemplateItem2Props) => {
    return (
        <Region
            name="splitter_template"
            tags={tags}
            layout={{ width: 1, height: 19, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#919191"
                layout={{ position: 'absolute', left: 0, width: 1, top: 0, height: 18 }}
            />
            <Region
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
    tags?: string[];
}

export const WiredStyleIlluminaLayoutRightButtonTemplateItem = ({ layout, onRightButtonTemplate, srcTypeImage, tags }: WiredStyleIlluminaLayoutRightButtonTemplateItemProps) => {
    return (
        <ContainerButton
            variant="105"
            name="right_button_template"
            tags={tags}
            dynamicStyle="button"
            onPointerTap={onRightButtonTemplate}
            layout={{ width: 17, height: 19, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="type_image"
                tags={[ '#icon' ]}
                src={srcTypeImage ?? layoutImage('wired_styles_illumina_icon_source_global.png')}
                layout={{ position: 'absolute', left: 4, top: 6, height: 7 }}
            />
        </ContainerButton>
    );
};

/** Named region `sourcetype_selector_view` of WiredStyleIlluminaLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleIlluminaLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const WiredStyleIlluminaLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout, tags }: WiredStyleIlluminaLayoutSourcetypeSelectorViewProps) => {
    return (
        <Region
            name="sourcetype_selector_view"
            tags={tags}
            visible={false}
            layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 19, flexDirection: 'row', ...layout }}
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
    );
};

/** Named region `slider_movement_area` of WiredStyleIlluminaLayout - configured through the parent's `sliderMovementArea` prop. */
export interface WiredStyleIlluminaLayoutSliderMovementAreaProps {
    layout?: BoxLayout;
    srcSliderButton?: string;
    tags?: string[];
}

export const WiredStyleIlluminaLayoutSliderMovementArea = ({ layout, srcSliderButton, tags }: WiredStyleIlluminaLayoutSliderMovementAreaProps) => {
    return (
        <Region
            name="slider_movement_area"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 17, ...layout }}
        >
            <ThemeImage
                name="slider_button"
                src={srcSliderButton ?? layoutImage('wired_styles_illumina_slider_obj.png')}
                layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 17 }}
            />
        </Region>
    );
};

/** Named region `slider` of WiredStyleIlluminaLayout - configured through the parent's `slider` prop. */
export interface WiredStyleIlluminaLayoutSliderProps {
    layout?: BoxLayout;
    sliderMovementArea?: WiredStyleIlluminaLayoutSliderMovementAreaProps;
    srcSliderBase?: string;
    tags?: string[];
    visibleSlider?: boolean;
}

export const WiredStyleIlluminaLayoutSlider = ({ layout, sliderMovementArea, srcSliderBase, tags, visibleSlider }: WiredStyleIlluminaLayoutSliderProps) => {
    return (
        <Region
            name="slider"
            tags={tags}
            visible={visibleSlider ?? false}
            layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 18, ...layout }}
        >
            <ThemeImage
                name="slider_base"
                src={srcSliderBase ?? layoutImage('wired_styles_volter_slider_bg.png')}
                tint="#999999"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 19 }}
            />
            <WiredStyleIlluminaLayoutSliderMovementArea {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `mini_button_view` of WiredStyleIlluminaLayout - configured through the parent's `miniButtonView` prop. */
export interface WiredStyleIlluminaLayoutMiniButtonViewProps {
    layout?: BoxLayout;
    onMiniButtonClick?: () => void;
    srcMiniButtonIcon?: string;
    tags?: string[];
}

export const WiredStyleIlluminaLayoutMiniButtonView = ({ layout, onMiniButtonClick, srcMiniButtonIcon, tags }: WiredStyleIlluminaLayoutMiniButtonViewProps) => {
    return (
        <Region
            name="mini_button_view"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 19, ...layout }}
        >
            <ContainerButton
                variant="102"
                name="mini_button_click"
                onPointerTap={onMiniButtonClick}
                layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 19, maxWidth: 19 }}
            >
                <ThemeImage
                    name="mini_button_icon"
                    src={srcMiniButtonIcon}
                    layout={{ position: 'absolute', left: 3, width: 13, top: 2, height: 15 }}
                />
            </ContainerButton>
        </Region>
    );
};
