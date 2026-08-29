import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { WiredStyleUbuntuLayoutGrid, WiredStyleUbuntuLayoutGridProps } from './WiredStyleUbuntuLayoutGrid';
import { WiredStyleUbuntuLayoutMenuItemTemplateItem } from './WiredStyleUbuntuLayoutMenuItemTemplateItem';
import { WiredStyleUbuntuLayoutSourcetypeSelectorView, WiredStyleUbuntuLayoutSourcetypeSelectorViewProps } from './WiredStyleUbuntuLayoutSourcetypeSelectorView';
import { WiredStyleUbuntuLayoutSpacerTemplateItem } from './WiredStyleUbuntuLayoutSpacerTemplateItem';

/** Generated from `1168_wired_style_ubuntu_xml` (layout "wired_style_ubuntu", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleUbuntuLayoutProps {
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    captionTitle?: string;
    grid?: WiredStyleUbuntuLayoutGridProps;
    iconPreview?: ReactNode;
    itemsMenuList?: ReactNode;
    layout?: BoxLayout;
    onButton?: () => void;
    onCheckboxView?: () => void;
    onCloseRuleRegion?: () => void;
    onContainerButton?: () => void;
    onDropdownView?: () => void;
    onExpandCollapseRegion?: () => void;
    onFrame?: () => void;
    onIconbuttonDown?: () => void;
    onIconbuttonLeft?: () => void;
    onIconbuttonRight?: () => void;
    onIconbuttonUp?: () => void;
    onMiniButtonClick?: () => void;
    onRadiobuttonView?: () => void;
    sourcetypeSelectorView?: WiredStyleUbuntuLayoutSourcetypeSelectorViewProps;
    srcDownArrow?: string;
    srcMiniButtonIcon?: string;
    srcSliderBase?: string;
    srcSliderButton?: string;
    srcUpArrow?: string;
    visibleBorder?: boolean;
    visibleButton?: boolean;
    visibleContainerButton?: boolean;
    visibleDropdownView?: boolean;
    visibleExpandCollapseRegion?: boolean;
    visibleFrame?: boolean;
    visibleIconbuttonDown?: boolean;
    visibleIconbuttonLeft?: boolean;
    visibleIconbuttonRight?: boolean;
    visibleIconbuttonUp?: boolean;
    visibleInputTemplate?: boolean;
    visibleMiniButtonView?: boolean;
    visibleProductIconPreviewer?: boolean;
    visibleQuickMenu?: boolean;
    visibleRadiobuttonView?: boolean;
    visibleRequirementRule?: boolean;
    visibleRulerView?: boolean;
    visibleRulerViewVertical?: boolean;
    visibleSlider?: boolean;
    visibleSourcetypeSelectorView?: boolean;
    visibleTextBoldView?: boolean;
    visibleTextHtml?: boolean;
    visibleTextView?: boolean;
}

export const WiredStyleUbuntuLayout = ({ captionTextBoldView, captionTextHtml, captionTextView, captionTitle, grid, iconPreview, itemsMenuList, layout, onButton, onCheckboxView, onCloseRuleRegion, onContainerButton, onDropdownView, onExpandCollapseRegion, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onMiniButtonClick, onRadiobuttonView, sourcetypeSelectorView, srcDownArrow, srcMiniButtonIcon, srcSliderBase, srcSliderButton, srcUpArrow, visibleBorder, visibleButton, visibleContainerButton, visibleDropdownView, visibleExpandCollapseRegion, visibleFrame, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInputTemplate, visibleMiniButtonView, visibleProductIconPreviewer, visibleQuickMenu, visibleRadiobuttonView, visibleRequirementRule, visibleRulerView, visibleRulerViewVertical, visibleSlider, visibleSourcetypeSelectorView, visibleTextBoldView, visibleTextHtml, visibleTextView }: WiredStyleUbuntuLayoutProps) => {
    const t = useTranslation();
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
                backgroundColor="#e9e9e1"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {(visibleRequirementRule ?? false) && (
                    <Border
                        variant="5"
                        name="requirement_rule"
                        tintColor="#dadada"
                        layout={{ position: 'absolute', left: 0, width: 193, top: 0, height: 68 }}
                    >
                        <Region
                            name="title"
                            layout={{ position: 'absolute', left: 6, width: 106, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionTitle ?? 'Payment option 1:'}
                        </Region>
                        <Region
                            name="close_rule_region"
                            dynamicStyle="brightness_and_shadow_under"
                            onPointerTap={onCloseRuleRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', right: 4, width: 15, top: 3, height: 15 }}
                        >
                            <Border
                                variant="12"
                                tintColor="#dddddd"
                                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                            >
                                <ThemeImage
                                    src={layoutImage('common_close_x.png')}
                                    tint="#777777"
                                    layout={{ position: 'absolute', left: 3, width: 9, top: 3, height: 9 }}
                                />
                            </Border>
                        </Region>
                        <WiredStyleUbuntuLayoutGrid {...grid} />
                    </Border>
                )}
                {(visibleProductIconPreviewer ?? false) && (
                    <Border
                        variant="3"
                        name="product_icon_previewer"
                        tintColor="#dadada"
                        layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                    >
                        <WidgetSlot
                            widgetType="product_icon"
                            name="icon_preview"
                            layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                        >
                            {iconPreview}
                        </WidgetSlot>
                    </Border>
                )}
                {(visibleRulerView ?? false) && (
                    <Region
                        name="ruler_view"
                        layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1 }}
                    >
                        <Region
                            backgroundColor="#b5b5b5"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    </Region>
                )}
                {(visibleRulerViewVertical ?? false) && (
                    <Region
                        name="ruler_view_vertical"
                        layout={{ position: 'absolute', left: 0, width: 1, top: 0, height: 50 }}
                    >
                        <Region
                            backgroundColor="#b5b5b5"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    </Region>
                )}
                {(visibleTextView ?? false) && (
                    <Region
                        name="text_view"
                        layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionTextView ?? 'some text'}
                    </Region>
                )}
                {(visibleTextBoldView ?? false) && (
                    <Region
                        name="text_bold_view"
                        layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionTextBoldView ?? 'some bold text'}
                    </Region>
                )}
                {(visibleTextHtml ?? false) && (
                    <Region
                        name="text_html"
                        layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 17, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionTextHtml ?? 'Use this by typing'}
                    </Region>
                )}
                {(visibleInputTemplate ?? false) && (
                    <Border
                        variant="4"
                        name="input_template"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 24 }}
                    >
                        <TextInput
                            value={fieldValue}
                            onChange={setFieldValue}
                            layout={{ position: 'absolute', left: 5, right: 5, top: 3, bottom: 3 }}
                        />
                    </Border>
                )}
                {(visibleDropdownView ?? false) && (
                    <Dropmenu
                        variant="3"
                        name="dropdown_view"
                        onPointerTap={onDropdownView}
                        layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 24 }}
                    />
                )}
                <CheckBox
                    variant="3"
                    name="checkbox_view"
                    onPointerTap={onCheckboxView}
                    layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 15, minHeight: 15, maxHeight: 15 }}
                />
                {(visibleRadiobuttonView ?? false) && (
                    <RadioButton
                        variant="3"
                        name="radiobutton_view"
                        onPointerTap={onRadiobuttonView}
                        layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15, minHeight: 15, maxHeight: 15 }}
                    />
                )}
                {(visibleExpandCollapseRegion ?? false) && (
                    <Region
                        name="expand_collapse_region"
                        onPointerTap={onExpandCollapseRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 16, top: 2, height: 12 }}
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
                )}
                {(visibleIconbuttonLeft ?? false) && (
                    <ContainerButton
                        variant="3"
                        name="iconbutton_left"
                        onPointerTap={onIconbuttonLeft}
                        layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                    >
                        <Icon
                            variant="2"
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 6, width: 12, top: 6, height: 12 }}
                        />
                    </ContainerButton>
                )}
                {(visibleIconbuttonRight ?? false) && (
                    <ContainerButton
                        variant="3"
                        name="iconbutton_right"
                        onPointerTap={onIconbuttonRight}
                        layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                    >
                        <Icon
                            variant="3"
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 6, width: 12, top: 6, height: 12 }}
                        />
                    </ContainerButton>
                )}
                {(visibleIconbuttonUp ?? false) && (
                    <ContainerButton
                        variant="3"
                        name="iconbutton_up"
                        onPointerTap={onIconbuttonUp}
                        layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                    >
                        <Icon
                            variant="1"
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 7, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                )}
                {(visibleIconbuttonDown ?? false) && (
                    <ContainerButton
                        variant="3"
                        name="iconbutton_down"
                        onPointerTap={onIconbuttonDown}
                        layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                    >
                        <Icon
                            variant="0"
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 7, width: 12, top: 6, height: 12 }}
                        />
                    </ContainerButton>
                )}
                {(visibleButton ?? false) && (
                    <Button
                        variant="3"
                        name="button"
                        onPointerTap={onButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ position: 'absolute', left: 0, width: 43, top: 0, height: 24 }}
                    >
                        text
                    </Button>
                )}
                {(visibleFrame ?? false) && (
                    <Frame
                        variant="3"
                        id="frame"
                        name="frame"
                        caption={t('wiredfurni.title')}
                        tintColor="#418db0"
                        onClose={onFrame}
                        layout={{ position: 'absolute', left: 0, width: 240, top: 0, bottom: 0, minWidth: 100 }}
                    />
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
                            tintColor="#f2f2f2"
                            layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                        >
                            <Border
                                variant="11"
                                tintColor="#d6d6d6"
                                layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                            >
                                <Region
                                    name="menu_list"
                                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 3, flexDirection: 'column' }}
                                >
                                    {itemsMenuList ?? (
                                        <>
                                            <WiredStyleUbuntuLayoutMenuItemTemplateItem />
                                            <WiredStyleUbuntuLayoutSpacerTemplateItem />
                                        </>
                                    )}
                                </Region>
                            </Border>
                        </Border>
                    </Border>
                )}
                {(visibleSourcetypeSelectorView ?? false) && (
                    <WiredStyleUbuntuLayoutSourcetypeSelectorView {...sourcetypeSelectorView} />
                )}
                {(visibleSlider ?? false) && (
                    <Region
                        name="slider"
                        layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 18 }}
                    >
                        <ThemeImage
                            name="slider_base"
                            src={srcSliderBase ?? layoutImage('wired_styles_volter_slider_bg.png')}
                            tint="#999999"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 19 }}
                        />
                        <Region
                            name="slider_movement_area"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 17 }}
                        >
                            <ThemeImage
                                name="slider_button"
                                src={srcSliderButton ?? layoutImage('wired_styles_illumina_slider_obj.png')}
                                layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 17 }}
                            />
                        </Region>
                    </Region>
                )}
                {(visibleMiniButtonView ?? false) && (
                    <Region
                        name="mini_button_view"
                        layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 19 }}
                    >
                        <ContainerButton
                            variant="3"
                            name="mini_button_click"
                            onPointerTap={onMiniButtonClick}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, maxWidth: 19 }}
                        >
                            <ThemeImage
                                name="mini_button_icon"
                                src={srcMiniButtonIcon}
                                layout={{ position: 'absolute', left: 3, width: 13, top: 2, height: 15 }}
                            />
                        </ContainerButton>
                    </Region>
                )}
                {(visibleBorder ?? false) && (
                    <Border
                        variant="3"
                        name="border"
                        tintColor="#dadada"
                        layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                    />
                )}
                {(visibleContainerButton ?? false) && (
                    <ContainerButton
                        variant="7"
                        name="container_button"
                        onPointerTap={onContainerButton}
                        layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                    />
                )}
            </Region>
        </Region>
    );
};
