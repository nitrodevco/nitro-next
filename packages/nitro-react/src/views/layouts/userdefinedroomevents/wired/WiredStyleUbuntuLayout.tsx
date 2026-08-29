import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1168_wired_style_ubuntu_xml` (layout "wired_style_ubuntu", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleUbuntuLayoutProps {
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    captionTitle?: string;
    closeRuleRegion?: WiredStyleUbuntuLayoutCloseRuleRegionProps;
    expandCollapseRegion?: WiredStyleUbuntuLayoutExpandCollapseRegionProps;
    grid?: WiredStyleUbuntuLayoutGridProps;
    layout?: BoxLayout;
    menuList?: WiredStyleUbuntuLayoutMenuListProps;
    miniButtonView?: WiredStyleUbuntuLayoutMiniButtonViewProps;
    onButton?: () => void;
    onCheckboxView?: () => void;
    onContainerButton?: () => void;
    onDropdownView?: () => void;
    onFrame?: () => void;
    onIconbuttonDown?: () => void;
    onIconbuttonLeft?: () => void;
    onIconbuttonRight?: () => void;
    onIconbuttonUp?: () => void;
    onRadiobuttonView?: () => void;
    rulerView?: WiredStyleUbuntuLayoutRulerViewProps;
    rulerViewVertical?: WiredStyleUbuntuLayoutRulerViewVerticalProps;
    slider?: WiredStyleUbuntuLayoutSliderProps;
    sourcetypeSelectorView?: WiredStyleUbuntuLayoutSourcetypeSelectorViewProps;
    visibleBorder?: boolean;
    visibleButton?: boolean;
    visibleContainerButton?: boolean;
    visibleDropdownView?: boolean;
    visibleIconbuttonDown?: boolean;
    visibleIconbuttonLeft?: boolean;
    visibleIconbuttonRight?: boolean;
    visibleIconbuttonUp?: boolean;
    visibleInputTemplate?: boolean;
    visibleProductIconPreviewer?: boolean;
    visibleQuickMenu?: boolean;
    visibleRadiobuttonView?: boolean;
    visibleRequirementRule?: boolean;
}

export const WiredStyleUbuntuLayout = ({ captionTextBoldView, captionTextHtml, captionTextView, captionTitle, closeRuleRegion, expandCollapseRegion, grid, layout, menuList, miniButtonView, onButton, onCheckboxView, onContainerButton, onDropdownView, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onRadiobuttonView, rulerView, rulerViewVertical, slider, sourcetypeSelectorView, visibleBorder, visibleButton, visibleContainerButton, visibleDropdownView, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInputTemplate, visibleProductIconPreviewer, visibleQuickMenu, visibleRadiobuttonView, visibleRequirementRule }: WiredStyleUbuntuLayoutProps) => {
    const t = useTranslation();
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
                backgroundColor="#e9e9e1"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
            >
                <Border
                    variant="5"
                    name="requirement_rule"
                    tintColor="#dadada"
                    visible={visibleRequirementRule ?? false}
                    layout={{ position: 'absolute', left: 0, width: 193, top: 0, height: 68 }}
                >
                    <Region
                        name="title"
                        layout={{ position: 'absolute', left: 6, width: 106, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionTitle ?? 'Payment option 1:'} />
                    </Region>
                    <WiredStyleUbuntuLayoutCloseRuleRegion {...closeRuleRegion} />
                    <WiredStyleUbuntuLayoutGrid {...grid} />
                </Border>
                <Border
                    variant="3"
                    name="product_icon_previewer"
                    tintColor="#dadada"
                    visible={visibleProductIconPreviewer ?? false}
                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                >
                    <WidgetSlot
                        widgetType="product_icon"
                        name="icon_preview"
                        layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                    />
                </Border>
                <WiredStyleUbuntuLayoutRulerView {...rulerView} />
                <WiredStyleUbuntuLayoutRulerViewVertical {...rulerViewVertical} />
                <Region
                    name="text_view"
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionTextView ?? 'some text'} />
                </Region>
                <Region
                    name="text_bold_view"
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionTextBoldView ?? 'some bold text'} />
                </Region>
                <Region
                    name="text_html"
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 17, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionTextHtml ?? 'Use this by typing'} />
                </Region>
                <Border
                    variant="4"
                    name="input_template"
                    visible={visibleInputTemplate ?? false}
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 24 }}
                >
                    <TextInput
                        value={fieldValue}
                        onChange={setFieldValue}
                        layout={{ position: 'absolute', left: 5, right: 5, top: 3, bottom: 3 }}
                    />
                </Border>
                <Dropmenu
                    variant="3"
                    name="dropdown_view"
                    onPointerTap={onDropdownView}
                    visible={visibleDropdownView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 24 }}
                />
                <CheckBox
                    variant="3"
                    name="checkbox_view"
                    onPointerTap={onCheckboxView}
                    layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 15, minHeight: 15, maxHeight: 15 }}
                />
                <RadioButton
                    variant="3"
                    name="radiobutton_view"
                    onPointerTap={onRadiobuttonView}
                    visible={visibleRadiobuttonView ?? false}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15, minHeight: 15, maxHeight: 15 }}
                />
                <WiredStyleUbuntuLayoutExpandCollapseRegion {...expandCollapseRegion} />
                <ContainerButton
                    variant="3"
                    name="iconbutton_left"
                    onPointerTap={onIconbuttonLeft}
                    visible={visibleIconbuttonLeft ?? false}
                    layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                >
                    <Icon
                        variant="2"
                        tintColor="#7f7f7f"
                        layout={{ position: 'absolute', left: 6, width: 12, top: 6, height: 12 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="3"
                    name="iconbutton_right"
                    onPointerTap={onIconbuttonRight}
                    visible={visibleIconbuttonRight ?? false}
                    layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                >
                    <Icon
                        variant="3"
                        tintColor="#7f7f7f"
                        layout={{ position: 'absolute', left: 6, width: 12, top: 6, height: 12 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="3"
                    name="iconbutton_up"
                    onPointerTap={onIconbuttonUp}
                    visible={visibleIconbuttonUp ?? false}
                    layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                >
                    <Icon
                        variant="1"
                        tintColor="#7f7f7f"
                        layout={{ position: 'absolute', left: 7, width: 12, top: 5, height: 12 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="3"
                    name="iconbutton_down"
                    onPointerTap={onIconbuttonDown}
                    visible={visibleIconbuttonDown ?? false}
                    layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                >
                    <Icon
                        variant="0"
                        tintColor="#7f7f7f"
                        layout={{ position: 'absolute', left: 7, width: 12, top: 6, height: 12 }}
                    />
                </ContainerButton>
                <Button
                    variant="3"
                    name="button"
                    onPointerTap={onButton}
                    textStyle="text-style-button-shiny-regular"
                    visible={visibleButton ?? false}
                    layout={{ position: 'absolute', left: 0, width: 43, top: 0, height: 24 }}
                >
                    text
                </Button>
                <Frame
                    variant="3"
                    id="frame"
                    name="frame"
                    visible={false}
                    caption={t('wiredfurni.title')}
                    tintColor="#418db0"
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 0, width: 240, top: 0, height: 200, minWidth: 100 }}
                />
                <Border
                    variant="3"
                    name="quick_menu"
                    tintColor="#000000"
                    visible={visibleQuickMenu ?? false}
                    layout={{ position: 'absolute', left: 0, width: 145, top: 0, height: 27 }}
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
                            <WiredStyleUbuntuLayoutMenuList {...menuList} />
                        </Border>
                    </Border>
                </Border>
                <WiredStyleUbuntuLayoutSourcetypeSelectorView {...sourcetypeSelectorView} />
                <WiredStyleUbuntuLayoutSlider {...slider} />
                <WiredStyleUbuntuLayoutMiniButtonView {...miniButtonView} />
                <Border
                    variant="3"
                    name="border"
                    tintColor="#dadada"
                    visible={visibleBorder ?? false}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
                <ContainerButton
                    variant="7"
                    name="container_button"
                    onPointerTap={onContainerButton}
                    visible={visibleContainerButton ?? false}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `close_rule_region` of WiredStyleUbuntuLayout - configured through the parent's `closeRuleRegion` prop. */
export interface WiredStyleUbuntuLayoutCloseRuleRegionProps {
    layout?: BoxLayout;
    onCloseRuleRegion?: () => void;
}

export const WiredStyleUbuntuLayoutCloseRuleRegion = ({ layout, onCloseRuleRegion }: WiredStyleUbuntuLayoutCloseRuleRegionProps) => {
    return (
        <Region
            name="close_rule_region"
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onCloseRuleRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 4, width: 15, top: 3, height: 15, ...layout }}
        >
            <Border
                variant="12"
                tintColor="#dddddd"
                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
            >
                <ThemeImage
                    src={layoutImage('common_close_x.png')}
                    tint="#777777"
                    layout={{ position: 'absolute', left: 3, width: 9, top: 3, height: 9 }}
                />
            </Border>
        </Region>
    );
};

/** Named region `close_region` of WiredStyleUbuntuLayout - configured through the parent's `closeRegion` prop. */
export interface WiredStyleUbuntuLayoutCloseRegionProps {
    layout?: BoxLayout;
    onCloseRegion?: () => void;
}

export const WiredStyleUbuntuLayoutCloseRegion = ({ layout, onCloseRegion }: WiredStyleUbuntuLayoutCloseRegionProps) => {
    return (
        <Region
            name="close_region"
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onCloseRegion}
            cursor="pointer"
            layout={{ position: 'absolute', right: 0, width: 15, top: 0, height: 15, ...layout }}
        >
            <Border
                variant="12"
                tintColor="#dddddd"
                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
            >
                <ThemeImage
                    src={layoutImage('common_close_x.png')}
                    tint="#777777"
                    layout={{ position: 'absolute', left: 3, width: 9, top: 3, height: 9 }}
                />
            </Border>
        </Region>
    );
};

/** Row template `element_entry_template` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutElementEntryTemplateItemProps {
    captionQuantityAmount?: string;
    closeRegion?: WiredStyleUbuntuLayoutCloseRegionProps;
    layout?: BoxLayout;
    onElementEntryTemplate?: () => void;
    srcCoinsIcon?: string;
}

export const WiredStyleUbuntuLayoutElementEntryTemplateItem = ({ captionQuantityAmount, closeRegion, layout, onElementEntryTemplate, srcCoinsIcon }: WiredStyleUbuntuLayoutElementEntryTemplateItemProps) => {
    return (
        <Region
            name="element_entry_template"
            dynamicStyle="brightness_and_shadow_under_gentle"
            onPointerTap={onElementEntryTemplate}
            cursor="pointer"
            layout={{ width: 42, height: 42, flexShrink: 0, ...layout }}
        >
            <Border
                variant="4"
                name="icon_border"
                tintColor="#eeeeee"
                layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
            >
                <WidgetSlot
                    widgetType="product_icon"
                    name="element_icon_widget"
                    layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                />
                <ThemeImage
                    name="coins_icon"
                    src={srcCoinsIcon ?? layoutImage('inventory_furni_icon_credits.png')}
                    layout={{ position: 'absolute', left: 8, width: 25, top: 12, height: 18 }}
                    visible={false}
                />
                <Border
                    variant="4"
                    name="quantity_border"
                    tintColor="#cccccc"
                    blend={0.8}
                    layout={{ position: 'absolute', right: 3, width: 16, bottom: 2, height: 13 }}
                >
                    <Region
                        name="quantity_amount"
                        layout={{ position: 'absolute', left: 3, top: -1, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionQuantityAmount ?? '2'}
                            textOptions={{ fill: '#222222' }}
                        />
                    </Region>
                </Border>
                <WiredStyleUbuntuLayoutCloseRegion {...closeRegion} />
            </Border>
        </Region>
    );
};

/** Row template `add_more_container` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutAddMoreContainerItemProps {
    layout?: BoxLayout;
    onAddMore?: () => void;
}

export const WiredStyleUbuntuLayoutAddMoreContainerItem = ({ layout, onAddMore }: WiredStyleUbuntuLayoutAddMoreContainerItemProps) => {
    return (
        <Region
            name="add_more_container"
            layout={{ width: 26, height: 42, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ContainerButton
                variant="3"
                name="add_more"
                onPointerTap={onAddMore}
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 23, alignSelf: 'center', height: 22 }}
            />
        </Region>
    );
};

/** Named region `grid` of WiredStyleUbuntuLayout - configured through the parent's `grid` prop. */
export interface WiredStyleUbuntuLayoutGridProps {
    itemsGrid?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutGrid = ({ itemsGrid, layout }: WiredStyleUbuntuLayoutGridProps) => {
    return (
        <Region
            name="grid"
            layout={{ position: 'absolute', left: 6, right: 6, top: 21, height: 42, flexDirection: 'row', flexWrap: 'wrap', gap: 6, ...layout }}
        >
            {itemsGrid ?? (
                <>
                    <WiredStyleUbuntuLayoutElementEntryTemplateItem />
                    <WiredStyleUbuntuLayoutAddMoreContainerItem />
                </>
            )}
        </Region>
    );
};

/** Named region `ruler_view` of WiredStyleUbuntuLayout - configured through the parent's `rulerView` prop. */
export interface WiredStyleUbuntuLayoutRulerViewProps {
    layout?: BoxLayout;
    visibleRulerView?: boolean;
}

export const WiredStyleUbuntuLayoutRulerView = ({ layout, visibleRulerView }: WiredStyleUbuntuLayoutRulerViewProps) => {
    return (
        <Region
            name="ruler_view"
            visible={visibleRulerView ?? false}
            layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1, ...layout }}
        >
            <Region
                backgroundColor="#b5b5b5"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1 }}
            />
        </Region>
    );
};

/** Named region `ruler_view_vertical` of WiredStyleUbuntuLayout - configured through the parent's `rulerViewVertical` prop. */
export interface WiredStyleUbuntuLayoutRulerViewVerticalProps {
    layout?: BoxLayout;
    visibleRulerViewVertical?: boolean;
}

export const WiredStyleUbuntuLayoutRulerViewVertical = ({ layout, visibleRulerViewVertical }: WiredStyleUbuntuLayoutRulerViewVerticalProps) => {
    return (
        <Region
            name="ruler_view_vertical"
            visible={visibleRulerViewVertical ?? false}
            layout={{ position: 'absolute', left: 0, width: 1, top: 0, height: 50, ...layout }}
        >
            <Region
                backgroundColor="#b5b5b5"
                layout={{ position: 'absolute', left: 0, width: 1, top: 0, bottom: 0 }}
            />
        </Region>
    );
};

/** Named region `expand_collapse_region` of WiredStyleUbuntuLayout - configured through the parent's `expandCollapseRegion` prop. */
export interface WiredStyleUbuntuLayoutExpandCollapseRegionProps {
    layout?: BoxLayout;
    onExpandCollapseRegion?: () => void;
    srcDownArrow?: string;
    srcUpArrow?: string;
    visibleExpandCollapseRegion?: boolean;
}

export const WiredStyleUbuntuLayoutExpandCollapseRegion = ({ layout, onExpandCollapseRegion, srcDownArrow, srcUpArrow, visibleExpandCollapseRegion }: WiredStyleUbuntuLayoutExpandCollapseRegionProps) => {
    return (
        <Region
            name="expand_collapse_region"
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
            <ThemeImage
                name="down_arrow"
                src={srcDownArrow ?? layoutImage('wired_volter_downarrow.png')}
                tint="#999999"
                layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 10 }}
            />
        </Region>
    );
};

/** Row template `menu_item_template` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutMenuItemTemplateItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onCheckbox?: () => void;
    onMenuItemTemplate?: () => void;
    visibleMenuItemTemplate?: boolean;
}

export const WiredStyleUbuntuLayoutMenuItemTemplateItem = ({ captionText, layout, onCheckbox, onMenuItemTemplate, visibleMenuItemTemplate }: WiredStyleUbuntuLayoutMenuItemTemplateItemProps) => {
    return (
        <Region
            name="menu_item_template"
            visible={visibleMenuItemTemplate ?? false}
            onPointerTap={onMenuItemTemplate}
            cursor="pointer"
            layout={{ width: 141, height: 20, flexShrink: 0, ...layout }}
        >
            <CheckBox
                variant="3"
                name="checkbox"
                onPointerTap={onCheckbox}
                layout={{ position: 'absolute', left: 8, width: 17, top: 3, height: 17, minHeight: 17, maxHeight: 17 }}
            />
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

/** Row template `spacer_template` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutSpacerTemplateItemProps {
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutSpacerTemplateItem = ({ layout }: WiredStyleUbuntuLayoutSpacerTemplateItemProps) => {
    return (
        <Region
            name="spacer_template"
            layout={{ width: 141, height: 3, flexShrink: 0, ...layout }}
        >
            <Region
                backgroundColor="#aaaaaa"
                layout={{ position: 'absolute', left: 6, right: 6, top: 1, height: 1 }}
            />
        </Region>
    );
};

/** Named region `menu_list` of WiredStyleUbuntuLayout - configured through the parent's `menuList` prop. */
export interface WiredStyleUbuntuLayoutMenuListProps {
    itemsMenuList?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutMenuList = ({ itemsMenuList, layout }: WiredStyleUbuntuLayoutMenuListProps) => {
    return (
        <Region
            name="menu_list"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 3, flexDirection: 'column', ...layout }}
        >
            {itemsMenuList ?? (
                <>
                    <WiredStyleUbuntuLayoutMenuItemTemplateItem />
                    <WiredStyleUbuntuLayoutSpacerTemplateItem />
                </>
            )}
        </Region>
    );
};

/** Named region `border` of WiredStyleUbuntuLayout - configured through the parent's `border` prop. */
export interface WiredStyleUbuntuLayoutBorderProps {
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutBorder = ({ layout }: WiredStyleUbuntuLayoutBorderProps) => {
    return (
        <Region
            name="border"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Named region `margin_item_color_left` of WiredStyleUbuntuLayout - configured through the parent's `marginItemColorLeft` prop. */
export interface WiredStyleUbuntuLayoutMarginItemColorLeftProps {
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutMarginItemColorLeft = ({ layout }: WiredStyleUbuntuLayoutMarginItemColorLeftProps) => {
    return (
        <Region
            name="margin_item_color_left"
            backgroundColor="#333333"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleUbuntuLayout - configured through the parent's `border` prop. */
export interface WiredStyleUbuntuLayoutBorder2Props {
    layout?: BoxLayout;
    marginItemColorLeft?: WiredStyleUbuntuLayoutMarginItemColorLeftProps;
}

export const WiredStyleUbuntuLayoutBorder2 = ({ layout, marginItemColorLeft }: WiredStyleUbuntuLayoutBorder2Props) => {
    return (
        <Region
            name="border"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleUbuntuLayoutMarginItemColorLeft {...marginItemColorLeft} />
        </Region>
    );
};

/** Row template `left_padding` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutLeftPaddingItemProps {
    border?: WiredStyleUbuntuLayoutBorderProps;
    border2?: WiredStyleUbuntuLayoutBorder2Props;
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutLeftPaddingItem = ({ border, border2, layout }: WiredStyleUbuntuLayoutLeftPaddingItemProps) => {
    return (
        <Region
            name="left_padding"
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleUbuntuLayoutBorder {...border} />
            <WiredStyleUbuntuLayoutBorder2 {...border2} />
        </Region>
    );
};

/** Row template `left_pad` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutLeftPadItemProps {
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutLeftPadItem = ({ layout }: WiredStyleUbuntuLayoutLeftPadItemProps) => {
    return (
        <Region
            name="left_pad"
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Row template `type_icon_bitmap` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutTypeIconBitmapItemProps {
    layout?: BoxLayout;
    srcTypeIconBitmap?: string;
}

export const WiredStyleUbuntuLayoutTypeIconBitmapItem = ({ layout, srcTypeIconBitmap }: WiredStyleUbuntuLayoutTypeIconBitmapItemProps) => {
    return (
        <ThemeImage
            name="type_icon_bitmap"
            src={srcTypeIconBitmap}
            layout={{ width: 9, height: 11, flexShrink: 0, minHeight: 11, maxHeight: 11, ...layout }}
        />
    );
};

/** Row template `right_pad` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutRightPadItemProps {
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutRightPadItem = ({ layout }: WiredStyleUbuntuLayoutRightPadItemProps) => {
    return (
        <Region
            name="right_pad"
            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15, ...layout }}
        />
    );
};

/** Named region `source_elements` of WiredStyleUbuntuLayout - configured through the parent's `sourceElements` prop. */
export interface WiredStyleUbuntuLayoutSourceElementsProps {
    itemsSourceElements?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutSourceElements = ({ itemsSourceElements, layout }: WiredStyleUbuntuLayoutSourceElementsProps) => {
    return (
        <Region
            name="source_elements"
            backgroundColor="#333333"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row', ...layout }}
        >
            {itemsSourceElements ?? (
                <>
                    <WiredStyleUbuntuLayoutLeftPadItem />
                    <WiredStyleUbuntuLayoutTypeIconBitmapItem />
                    <WiredStyleUbuntuLayoutRightPadItem />
                </>
            )}
        </Region>
    );
};

/** Row template `source_btn` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutSourceBtnItemProps {
    layout?: BoxLayout;
    onSourceBtn?: () => void;
    sourceElements?: WiredStyleUbuntuLayoutSourceElementsProps;
}

export const WiredStyleUbuntuLayoutSourceBtnItem = ({ layout, onSourceBtn, sourceElements }: WiredStyleUbuntuLayoutSourceBtnItemProps) => {
    return (
        <Region
            name="source_btn"
            backgroundColor="#ffffff"
            onPointerTap={onSourceBtn}
            cursor="pointer"
            layout={{ width: 13, height: 15, flexShrink: 0, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleUbuntuLayoutSourceElements {...sourceElements} />
        </Region>
    );
};

/** Named region `source_options_list` of WiredStyleUbuntuLayout - configured through the parent's `sourceOptionsList` prop. */
export interface WiredStyleUbuntuLayoutSourceOptionsListProps {
    itemsSourceOptionsList?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutSourceOptionsList = ({ itemsSourceOptionsList, layout }: WiredStyleUbuntuLayoutSourceOptionsListProps) => {
    return (
        <Region
            name="source_options_list"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, minHeight: 15, maxHeight: 15, flexDirection: 'row', gap: 1, ...layout }}
        >
            {itemsSourceOptionsList ?? (
                <WiredStyleUbuntuLayoutSourceBtnItem />
            )}
        </Region>
    );
};

/** Named region `source_options_cont` of WiredStyleUbuntuLayout - configured through the parent's `sourceOptionsCont` prop. */
export interface WiredStyleUbuntuLayoutSourceOptionsContProps {
    layout?: BoxLayout;
    sourceOptionsList?: WiredStyleUbuntuLayoutSourceOptionsListProps;
}

export const WiredStyleUbuntuLayoutSourceOptionsCont = ({ layout, sourceOptionsList }: WiredStyleUbuntuLayoutSourceOptionsContProps) => {
    return (
        <Region
            name="source_options_cont"
            backgroundColor="#181818"
            layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleUbuntuLayoutSourceOptionsList {...sourceOptionsList} />
        </Region>
    );
};

/** Row template `source_options_border` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutSourceOptionsBorderItemProps {
    layout?: BoxLayout;
    sourceOptionsCont?: WiredStyleUbuntuLayoutSourceOptionsContProps;
}

export const WiredStyleUbuntuLayoutSourceOptionsBorderItem = ({ layout, sourceOptionsCont }: WiredStyleUbuntuLayoutSourceOptionsBorderItemProps) => {
    return (
        <Region
            name="source_options_border"
            backgroundColor="#000000"
            layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleUbuntuLayoutSourceOptionsCont {...sourceOptionsCont} />
        </Region>
    );
};

/** Named region `margin_item_color_right` of WiredStyleUbuntuLayout - configured through the parent's `marginItemColorRight` prop. */
export interface WiredStyleUbuntuLayoutMarginItemColorRightProps {
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutMarginItemColorRight = ({ layout }: WiredStyleUbuntuLayoutMarginItemColorRightProps) => {
    return (
        <Region
            name="margin_item_color_right"
            backgroundColor="#222222"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13, ...layout }}
        />
    );
};

/** Named region `border` of WiredStyleUbuntuLayout - configured through the parent's `border` prop. */
export interface WiredStyleUbuntuLayoutBorder3Props {
    layout?: BoxLayout;
    marginItemColorRight?: WiredStyleUbuntuLayoutMarginItemColorRightProps;
}

export const WiredStyleUbuntuLayoutBorder3 = ({ layout, marginItemColorRight }: WiredStyleUbuntuLayoutBorder3Props) => {
    return (
        <Region
            name="border"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15, ...layout }}
        >
            <WiredStyleUbuntuLayoutMarginItemColorRight {...marginItemColorRight} />
        </Region>
    );
};

/** Named region `border` of WiredStyleUbuntuLayout - configured through the parent's `border` prop. */
export interface WiredStyleUbuntuLayoutBorder4Props {
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutBorder4 = ({ layout }: WiredStyleUbuntuLayoutBorder4Props) => {
    return (
        <Region
            name="border"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1, ...layout }}
        />
    );
};

/** Row template `right_padding` of WiredStyleUbuntuLayout - pass real rows through its `items…` slot. */
export interface WiredStyleUbuntuLayoutRightPaddingItemProps {
    border?: WiredStyleUbuntuLayoutBorder3Props;
    border2?: WiredStyleUbuntuLayoutBorder4Props;
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutRightPaddingItem = ({ border, border2, layout }: WiredStyleUbuntuLayoutRightPaddingItemProps) => {
    return (
        <Region
            name="right_padding"
            layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17, ...layout }}
        >
            <WiredStyleUbuntuLayoutBorder3 {...border} />
            <WiredStyleUbuntuLayoutBorder4 {...border2} />
        </Region>
    );
};

/** Named region `sourcetype_selector_view` of WiredStyleUbuntuLayout - configured through the parent's `sourcetypeSelectorView` prop. */
export interface WiredStyleUbuntuLayoutSourcetypeSelectorViewProps {
    itemsSourcetypeSelectorView?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutSourcetypeSelectorView = ({ itemsSourcetypeSelectorView, layout }: WiredStyleUbuntuLayoutSourcetypeSelectorViewProps) => {
    return (
        <Region
            name="sourcetype_selector_view"
            visible={false}
            layout={{ position: 'absolute', left: 0, top: -2, minHeight: 17, maxHeight: 17, flexDirection: 'row', ...layout }}
        >
            {itemsSourcetypeSelectorView ?? (
                <>
                    <WiredStyleUbuntuLayoutLeftPaddingItem />
                    <WiredStyleUbuntuLayoutSourceOptionsBorderItem />
                    <WiredStyleUbuntuLayoutRightPaddingItem />
                </>
            )}
        </Region>
    );
};

/** Named region `slider_movement_area` of WiredStyleUbuntuLayout - configured through the parent's `sliderMovementArea` prop. */
export interface WiredStyleUbuntuLayoutSliderMovementAreaProps {
    layout?: BoxLayout;
    srcSliderButton?: string;
}

export const WiredStyleUbuntuLayoutSliderMovementArea = ({ layout, srcSliderButton }: WiredStyleUbuntuLayoutSliderMovementAreaProps) => {
    return (
        <Region
            name="slider_movement_area"
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

/** Named region `slider` of WiredStyleUbuntuLayout - configured through the parent's `slider` prop. */
export interface WiredStyleUbuntuLayoutSliderProps {
    layout?: BoxLayout;
    sliderMovementArea?: WiredStyleUbuntuLayoutSliderMovementAreaProps;
    srcSliderBase?: string;
    visibleSlider?: boolean;
}

export const WiredStyleUbuntuLayoutSlider = ({ layout, sliderMovementArea, srcSliderBase, visibleSlider }: WiredStyleUbuntuLayoutSliderProps) => {
    return (
        <Region
            name="slider"
            visible={visibleSlider ?? false}
            layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 18, ...layout }}
        >
            <ThemeImage
                name="slider_base"
                src={srcSliderBase ?? layoutImage('wired_styles_volter_slider_bg.png')}
                tint="#999999"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 19 }}
            />
            <WiredStyleUbuntuLayoutSliderMovementArea {...sliderMovementArea} />
        </Region>
    );
};

/** Named region `mini_button_view` of WiredStyleUbuntuLayout - configured through the parent's `miniButtonView` prop. */
export interface WiredStyleUbuntuLayoutMiniButtonViewProps {
    layout?: BoxLayout;
    onMiniButtonClick?: () => void;
    srcMiniButtonIcon?: string;
    visibleMiniButtonView?: boolean;
}

export const WiredStyleUbuntuLayoutMiniButtonView = ({ layout, onMiniButtonClick, srcMiniButtonIcon, visibleMiniButtonView }: WiredStyleUbuntuLayoutMiniButtonViewProps) => {
    return (
        <Region
            name="mini_button_view"
            visible={visibleMiniButtonView ?? false}
            layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 19, ...layout }}
        >
            <ContainerButton
                variant="3"
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
