import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { WiredStyleVolterGreenLayoutMenuItemTemplateItem } from './WiredStyleVolterGreenLayoutMenuItemTemplateItem';
import { WiredStyleVolterGreenLayoutMiniButtonView, WiredStyleVolterGreenLayoutMiniButtonViewProps } from './WiredStyleVolterGreenLayoutMiniButtonView';
import { WiredStyleVolterGreenLayoutSourcetypeSelectorView, WiredStyleVolterGreenLayoutSourcetypeSelectorViewProps } from './WiredStyleVolterGreenLayoutSourcetypeSelectorView';
import { WiredStyleVolterGreenLayoutSpacerTemplateItem } from './WiredStyleVolterGreenLayoutSpacerTemplateItem';

/** Generated from `1155_wired_style_volter_green_xml` (layout "wired_style_volter_green", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleVolterGreenLayoutProps {
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    itemsMenuList?: ReactNode;
    layout?: BoxLayout;
    miniButtonView?: WiredStyleVolterGreenLayoutMiniButtonViewProps;
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
    sourcetypeSelectorView?: WiredStyleVolterGreenLayoutSourcetypeSelectorViewProps;
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

export const WiredStyleVolterGreenLayout = ({ captionTextBoldView, captionTextHtml, captionTextView, itemsMenuList, layout, miniButtonView, onButton, onCheckboxView, onDropdownView, onExpandCollapseRegion, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onRadiobuttonView, sourcetypeSelectorView, srcDownArrow, srcSliderBase, srcSliderButton, srcUpArrow, visibleButton, visibleCheckboxView, visibleDownArrow, visibleDropdownView, visibleExpandCollapseRegion, visibleFrame, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInnerBorder, visibleInputTemplate, visibleMiniButtonView, visibleQuickMenu, visibleRadiobuttonView, visibleRulerView, visibleSlider, visibleSourcetypeSelectorView, visibleTextBoldView, visibleTextHtml, visibleTextView, visibleUpArrow }: WiredStyleVolterGreenLayoutProps) => {
    const t = useTranslation();
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
                backgroundColor="#f4d763"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {(visibleInnerBorder ?? false) && (
                    <Border
                        variant="13"
                        name="inner_border"
                        tintColor="#bfd6c9"
                        layout={{ position: 'absolute', left: 0, width: 119, top: 0, height: 98 }}
                    />
                )}
                {(visibleFrame ?? false) && (
                    <Frame
                        variant="0"
                        id="frame"
                        name="frame"
                        caption={t('wiredfurni.title')}
                        tintColor="#78b090"
                        onClose={onFrame}
                        layout={{ position: 'absolute', left: 0, width: 256, top: 0, bottom: 0, minWidth: 100 }}
                    />
                )}
                {(visibleRulerView ?? false) && (
                    <Region
                        name="ruler_view"
                        layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1 }}
                    >
                        <Region
                            backgroundColor="#222222"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    </Region>
                )}
                {(visibleTextView ?? false) && (
                    <ThemeText
                        text={captionTextView ?? 'some text'}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#222222' }}
                        name="text_view"
                        layout={{ position: 'absolute', left: 0, width: 56, top: 0, height: 13 }}
                    />
                )}
                {(visibleTextBoldView ?? false) && (
                    <ThemeText
                        text={captionTextBoldView ?? 'some bold text'}
                        textStyle="text-style-bold"
                        textOptions={{ fill: '#222222' }}
                        name="text_bold_view"
                        layout={{ position: 'absolute', left: 0, width: 92, top: 0, height: 13 }}
                    />
                )}
                {(visibleTextHtml ?? false) && (
                    <ThemeText
                        text={captionTextHtml ?? 'Use this by typing'}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#222222' }}
                        name="text_html"
                        layout={{ position: 'absolute', left: 0, width: 96, top: 0, height: 13, overflow: 'hidden' }}
                    />
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
                    <WiredStyleVolterGreenLayoutSourcetypeSelectorView {...sourcetypeSelectorView} />
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
                    <WiredStyleVolterGreenLayoutMiniButtonView {...miniButtonView} />
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
                                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column' }}
                                >
                                    {itemsMenuList ?? (
                                        <>
                                            <WiredStyleVolterGreenLayoutMenuItemTemplateItem />
                                            <WiredStyleVolterGreenLayoutSpacerTemplateItem />
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
