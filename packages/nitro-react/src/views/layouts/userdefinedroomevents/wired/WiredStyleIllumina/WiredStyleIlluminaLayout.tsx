import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { WiredStyleIlluminaLayoutMenuItemTemplateItem } from './WiredStyleIlluminaLayoutMenuItemTemplateItem';
import { WiredStyleIlluminaLayoutSourcetypeSelectorView, WiredStyleIlluminaLayoutSourcetypeSelectorViewProps } from './WiredStyleIlluminaLayoutSourcetypeSelectorView';
import { WiredStyleIlluminaLayoutSpacerTemplateItem } from './WiredStyleIlluminaLayoutSpacerTemplateItem';

/** Generated from `1171_wired_style_illumina_xml` (layout "wired_style_illumina", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleIlluminaLayoutProps {
    captionLimitText?: string;
    captionTextBoldView?: string;
    captionTextHtml?: string;
    captionTextView?: string;
    itemsMenuList?: ReactNode;
    layout?: BoxLayout;
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
    onMiniButtonClick?: () => void;
    onRadiobuttonView?: () => void;
    sourcetypeSelectorView?: WiredStyleIlluminaLayoutSourcetypeSelectorViewProps;
    srcAsset?: string;
    srcDownArrow?: string;
    srcMiniButtonIcon?: string;
    srcSliderBase?: string;
    srcSliderButton?: string;
    srcUpArrow?: string;
    visibleAssetButton?: boolean;
    visibleButton?: boolean;
    visibleCharLimitWarn?: boolean;
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
    visibleQuickMenu?: boolean;
    visibleRadiobuttonView?: boolean;
    visibleRulerView?: boolean;
    visibleSlider?: boolean;
    visibleSourcetypeSelectorView?: boolean;
    visibleTextBoldView?: boolean;
    visibleTextHtml?: boolean;
    visibleTextView?: boolean;
}

export const WiredStyleIlluminaLayout = ({ captionLimitText, captionTextBoldView, captionTextHtml, captionTextView, itemsMenuList, layout, onAssetButton, onButton, onCheckboxView, onDropdownView, onExpandCollapseRegion, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onMiniButtonClick, onRadiobuttonView, sourcetypeSelectorView, srcAsset, srcDownArrow, srcMiniButtonIcon, srcSliderBase, srcSliderButton, srcUpArrow, visibleAssetButton, visibleButton, visibleCharLimitWarn, visibleCheckboxView, visibleDownArrow, visibleDropdownView, visibleExpandCollapseRegion, visibleFrame, visibleIconbuttonDown, visibleIconbuttonLeft, visibleIconbuttonRight, visibleIconbuttonUp, visibleInputTemplate, visibleQuickMenu, visibleRadiobuttonView, visibleRulerView, visibleSlider, visibleSourcetypeSelectorView, visibleTextBoldView, visibleTextHtml, visibleTextView }: WiredStyleIlluminaLayoutProps) => {
    const t = useTranslation();
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
                backgroundColor="#e2e2e2"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                {(visibleRulerView ?? false) && (
                    <Region
                        name="ruler_view"
                        layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 2 }}
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
                )}
                {(visibleTextView ?? false) && (
                    <ThemeText
                        text={captionTextView ?? 'some text'}
                        textStyle="text-style-il-regular"
                        name="text_view"
                        layout={{ position: 'absolute', left: 0, width: 53, top: 0, height: 16 }}
                    />
                )}
                {(visibleTextBoldView ?? false) && (
                    <ThemeText
                        text={captionTextBoldView ?? 'some bold text'}
                        textStyle="text-style-il-regular"
                        name="text_bold_view"
                        layout={{ position: 'absolute', left: 0, width: 82, top: 0, height: 16 }}
                    />
                )}
                {(visibleTextHtml ?? false) && (
                    <ThemeText
                        text={captionTextHtml ?? 'Use this by typing'}
                        textStyle="text-style-il-regular"
                        name="text_html"
                        layout={{ position: 'absolute', left: 0, width: 97, top: 0, height: 16, overflow: 'hidden' }}
                    />
                )}
                {(visibleInputTemplate ?? false) && (
                    <Border
                        variant="105"
                        name="input_template"
                        layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 21 }}
                    >
                        <TextInput
                            value={fieldValue}
                            onChange={setFieldValue}
                            textColor="#4a4a4a"
                            layout={{ position: 'absolute', left: 4, right: 4, top: 2, bottom: 3 }}
                        />
                        {(visibleCharLimitWarn ?? false) && (
                            <Region
                                name="char_limit_warn"
                                layout={{ position: 'absolute', right: 0, width: 116, top: -30, height: 50 }}
                            >
                                <Border
                                    variant="2"
                                    tintColor="#222222"
                                    blend={0.7}
                                    layout={{ position: 'absolute', right: 0, width: 49, top: 10, height: 17 }}
                                >
                                    <ThemeText
                                        text={captionLimitText ?? '95/100'}
                                        textStyle="text-style-il-regular-white"
                                        name="limit_text"
                                        layout={{ position: 'absolute', left: 5, top: 1, height: 16 }}
                                    />
                                </Border>
                            </Region>
                        )}
                    </Border>
                )}
                {(visibleDropdownView ?? false) && (
                    <Dropmenu
                        variant="100"
                        name="dropdown_view"
                        onPointerTap={onDropdownView}
                        layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 22 }}
                    />
                )}
                {(visibleCheckboxView ?? false) && (
                    <CheckBox
                        variant="101"
                        name="checkbox_view"
                        onPointerTap={onCheckboxView}
                        layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 21, minHeight: 21, maxHeight: 21 }}
                    />
                )}
                {(visibleRadiobuttonView ?? false) && (
                    <RadioButton
                        variant="100"
                        name="radiobutton_view"
                        onPointerTap={onRadiobuttonView}
                        layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 16, minHeight: 16, maxHeight: 16 }}
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
                        {(visibleDownArrow ?? false) && (
                            <ThemeImage
                                name="down_arrow"
                                src={srcDownArrow ?? layoutImage('wired_volter_downarrow.png')}
                                tint="#999999"
                                layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 10 }}
                            />
                        )}
                    </Region>
                )}
                {(visibleIconbuttonLeft ?? false) && (
                    <ContainerButton
                        variant="102"
                        name="iconbutton_left"
                        onPointerTap={onIconbuttonLeft}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    >
                        <Icon
                            variant="2"
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 5, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                )}
                {(visibleIconbuttonRight ?? false) && (
                    <ContainerButton
                        variant="102"
                        name="iconbutton_right"
                        onPointerTap={onIconbuttonRight}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    >
                        <Icon
                            variant="3"
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 5, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                )}
                {(visibleIconbuttonUp ?? false) && (
                    <ContainerButton
                        variant="102"
                        name="iconbutton_up"
                        onPointerTap={onIconbuttonUp}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    >
                        <Icon
                            variant="1"
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 6, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                )}
                {(visibleIconbuttonDown ?? false) && (
                    <ContainerButton
                        variant="102"
                        name="iconbutton_down"
                        onPointerTap={onIconbuttonDown}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    >
                        <Icon
                            variant="0"
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 6, width: 12, top: 6, height: 12 }}
                        />
                    </ContainerButton>
                )}
                {(visibleButton ?? false) && (
                    <Button
                        variant="102"
                        name="button"
                        onPointerTap={onButton}
                        textStyle="text-style-il-button"
                        layout={{ position: 'absolute', left: 0, width: 49, top: 0, height: 22 }}
                    >
                        text
                    </Button>
                )}
                {(visibleFrame ?? false) && (
                    <Frame
                        variant="102"
                        id="frame"
                        name="frame"
                        caption={t('wiredfurni.title')}
                        tintColor="#3e3e3e"
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
                                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column' }}
                                >
                                    {itemsMenuList ?? (
                                        <>
                                            <WiredStyleIlluminaLayoutMenuItemTemplateItem />
                                            <WiredStyleIlluminaLayoutSpacerTemplateItem />
                                        </>
                                    )}
                                </Region>
                            </Border>
                        </Border>
                    </Border>
                )}
                {(visibleSourcetypeSelectorView ?? false) && (
                    <WiredStyleIlluminaLayoutSourcetypeSelectorView {...sourcetypeSelectorView} />
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
                <Region
                    name="mini_button_view"
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 19 }}
                >
                    <ContainerButton
                        variant="102"
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
                {(visibleAssetButton ?? false) && (
                    <ContainerButton
                        variant="102"
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
                )}
            </Region>
        </Region>
    );
};
