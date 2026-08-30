import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { WiredStyleVolterLayoutMenuItemTemplateItem } from './WiredStyleVolterLayoutMenuItemTemplateItem';
import { WiredStyleVolterLayoutMiniButtonView, WiredStyleVolterLayoutMiniButtonViewProps } from './WiredStyleVolterLayoutMiniButtonView';
import { WiredStyleVolterLayoutSourcetypeSelectorView, WiredStyleVolterLayoutSourcetypeSelectorViewProps } from './WiredStyleVolterLayoutSourcetypeSelectorView';
import { WiredStyleVolterLayoutSpacerTemplateItem } from './WiredStyleVolterLayoutSpacerTemplateItem';

/** Generated from `1165_wired_style_volter_xml` (layout "wired_style_volter", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleVolterLayoutProps {
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    itemsMenuList?: ReactNode;
    layout?: BoxLayout;
    miniButtonView?: WiredStyleVolterLayoutMiniButtonViewProps;
    onAssetButton?: () => void;
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
    sourcetypeSelectorView?: WiredStyleVolterLayoutSourcetypeSelectorViewProps;
    srcAsset?: string;
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

export const WiredStyleVolterLayout = ({ captionTextBoldView, captionTextHtml, captionTextView, itemsMenuList, layout, miniButtonView, onAssetButton, onButton, onCheckboxView, onDropdownView, onExpandCollapseRegion, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onRadiobuttonView, sourcetypeSelectorView, srcAsset, srcDownArrow, srcSliderBase, srcSliderButton, srcUpArrow, visibleButton, visibleCheckboxView, visibleDownArrow, visibleDropdownView, visibleExpandCollapseRegion, visibleFrame, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInputTemplate, visibleMiniButtonView, visibleQuickMenu, visibleRadiobuttonView, visibleRulerView, visibleSlider, visibleSourcetypeSelectorView, visibleTextBoldView, visibleTextHtml, visibleTextView, visibleUpArrow }: WiredStyleVolterLayoutProps) => {
    const t = useTranslation();
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
                backgroundColor="#3d3d3d"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {(visibleRulerView ?? false) && (
                    <Region
                        name="ruler_view"
                        layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1 }}
                    >
                        <Region
                            backgroundColor="#232323"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        />
                    </Region>
                )}
                {(visibleTextView ?? false) && (
                    <ThemeText
                        text={captionTextView ?? 'some text'}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#ffffff' }}
                        name="text_view"
                        layout={{ position: 'absolute', left: 0, width: 56, top: 0, height: 13 }}
                    />
                )}
                {(visibleTextBoldView ?? false) && (
                    <ThemeText
                        text={captionTextBoldView ?? 'some bold text'}
                        textStyle="text-style-bold"
                        textOptions={{ fill: '#ffffff' }}
                        name="text_bold_view"
                        layout={{ position: 'absolute', left: 0, width: 92, top: 0, height: 13 }}
                    />
                )}
                {(visibleTextHtml ?? false) && (
                    <ThemeText
                        text={captionTextHtml ?? 'Use this by typing'}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#ffffff' }}
                        name="text_html"
                        layout={{ position: 'absolute', left: 0, width: 96, top: 0, height: 13, overflow: 'hidden' }}
                    />
                )}
                {(visibleInputTemplate ?? false) && (
                    <Region
                        name="input_template"
                        layout={{ position: 'absolute', left: 0, width: 112, top: 0, height: 15 }}
                    >
                        <TextInput
                            value={fieldValue}
                            onChange={setFieldValue}
                            textColor="#ffffff"
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
                        variant="1"
                        name="checkbox_view"
                        onPointerTap={onCheckboxView}
                        layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 17 }}
                    />
                )}
                {(visibleRadiobuttonView ?? false) && (
                    <RadioButton
                        variant="1"
                        name="radiobutton_view"
                        onPointerTap={onRadiobuttonView}
                        layout={{ position: 'absolute', left: 0, width: 14, top: 0, height: 16 }}
                    />
                )}
                {(visibleExpandCollapseRegion ?? false) && (
                    <Region
                        name="expand_collapse_region"
                        backgroundColor="#3d3d3d"
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
                    <WiredStyleVolterLayoutSourcetypeSelectorView {...sourcetypeSelectorView} />
                )}
                {(visibleIconbuttonLeft ?? false) && (
                    <ContainerButton
                        variant="1"
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
                        variant="1"
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
                        variant="1"
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
                        variant="1"
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
                        variant="1"
                        name="button"
                        onPointerTap={onButton}
                        textStyle="text-style-button-regular"
                        layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 22 }}
                    >
                        text
                    </Button>
                )}
                {(visibleFrame ?? false) && (
                    <Frame
                        variant="0"
                        id="frame"
                        name="frame"
                        caption={t('wiredfurni.title')}
                        tintColor="#3e3e3e"
                        onClose={onFrame}
                        layout={{ position: 'absolute', left: 0, width: 240, top: 0, bottom: 0, minWidth: 100 }}
                    />
                )}
                {(visibleMiniButtonView ?? false) && (
                    <WiredStyleVolterLayoutMiniButtonView {...miniButtonView} />
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
                            tintColor="#5a5a5a"
                            layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                        >
                            <Border
                                variant="11"
                                tintColor="#424242"
                                layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1 }}
                            >
                                <Region
                                    name="menu_list"
                                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column' }}
                                >
                                    {itemsMenuList ?? (
                                        <>
                                            <WiredStyleVolterLayoutMenuItemTemplateItem />
                                            <WiredStyleVolterLayoutSpacerTemplateItem />
                                        </>
                                    )}
                                </Region>
                            </Border>
                        </Border>
                    </Border>
                )}
                <ContainerButton
                    variant="1"
                    name="asset_button"
                    dynamicStyle="button"
                    onPointerTap={onAssetButton}
                    layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
                >
                    <ThemeImage
                        name="asset"
                        src={srcAsset}
                        layout={{ position: 'absolute', left: 5, top: 5 }}
                    />
                </ContainerButton>
            </Region>
        </Region>
    );
};
