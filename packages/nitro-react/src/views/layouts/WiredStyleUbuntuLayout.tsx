import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Dropmenu, Frame, Icon, RadioButton, Region, TextInput, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1168_wired_style_ubuntu_xml` (layout "wired_style_ubuntu", 200x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredStyleUbuntuLayoutProps {
    layout?: BoxLayout;
    onAddMore?: () => void;
    onButton?: () => void;
    onCheckbox?: () => void;
    onCheckboxView?: () => void;
    onContainerButton?: () => void;
    onDropdownView?: () => void;
    onFrame?: () => void;
    onIconbuttonDown?: () => void;
    onIconbuttonLeft?: () => void;
    onIconbuttonRight?: () => void;
    onIconbuttonUp?: () => void;
    onMiniButtonClick?: () => void;
    onRadiobuttonView?: () => void;
}

export const WiredStyleUbuntuLayout = ({ layout, onAddMore, onButton, onCheckbox, onCheckboxView, onContainerButton, onDropdownView, onFrame, onIconbuttonDown, onIconbuttonLeft, onIconbuttonRight, onIconbuttonUp, onMiniButtonClick, onRadiobuttonView }: WiredStyleUbuntuLayoutProps) => {
    const t = useTranslation();
    const [ fieldValue, setFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 200, height: 200, ...layout }}>
            <Region
                params={16}
                backgroundColor="#e9e9e1"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 200 }}
            >
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 193, top: 0, height: 68 }}
                >
                    <Border
                        variant="5"
                        name="requirement_rule"
                        params={17}
                        tintColor="#dadada"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            name="title"
                            params={16}
                            layout={{ position: 'absolute', left: 6, width: 106, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="Payment option 1:" />
                        </Region>
                        <Region
                            name="close_rule_region"
                            params={65}
                            dynamicStyle="brightness_and_shadow_under"
                            layout={{ position: 'absolute', left: 174, width: 15, top: 3, height: 15 }}
                        >
                            <Border
                                variant="12"
                                tags={[ '#bg' ]}
                                params={16}
                                tintColor="#dddddd"
                                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                            >
                                <ThemeImage
                                    tags={[ '#bg' ]}
                                    params={16}
                                    src={layoutImage('common_close_x.png')}
                                    tint="#777777"
                                    layout={{ position: 'absolute', left: 3, width: 9, top: 3, height: 9 }}
                                />
                            </Border>
                        </Region>
                        <Region
                            name="grid"
                            params={8388752}
                            layout={{ position: 'absolute', left: 6, width: 181, top: 21, height: 42, flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}
                        >
                            <Region
                                name="element_entry_template"
                                params={1}
                                dynamicStyle="brightness_and_shadow_under_gentle"
                                layout={{ width: 42, height: 42, flexShrink: 0 }}
                            >
                                <Border
                                    variant="4"
                                    name="icon_border"
                                    tags={[ '#icon' ]}
                                    tintColor="#eeeeee"
                                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                                >
                                    <WidgetSlot
                                        widgetType="product_icon"
                                        name="element_icon_widget"
                                        params={16}
                                        layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                                    />
                                    <Region
                                        visible={false}
                                        layout={{ position: 'absolute', left: 8, width: 25, top: 12, height: 18 }}
                                    >
                                        <ThemeImage
                                            name="coins_icon"
                                            params={16}
                                            src={layoutImage('inventory_furni_icon_credits.png')}
                                            layout={{ position: 'absolute', left: 8, width: 25, top: 12, height: 18 }}
                                        />
                                    </Region>
                                    <Border
                                        variant="4"
                                        name="quantity_border"
                                        tags={[ '#ico' ]}
                                        params={263248}
                                        tintColor="#cccccc"
                                        blend={0.8}
                                        layout={{ position: 'absolute', left: 23, width: 16, top: 27, height: 13 }}
                                    >
                                        <Region
                                            name="quantity_amount"
                                            tags={[ '#ico' ]}
                                            params={4194320}
                                            layout={{ position: 'absolute', left: 3, width: 9, top: -1, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text="2"
                                                textOptions={{ fill: '#222222' }}
                                            />
                                        </Region>
                                    </Border>
                                    <Region
                                        name="close_region"
                                        params={65}
                                        dynamicStyle="brightness_and_shadow_under"
                                        layout={{ position: 'absolute', left: 27, width: 15, top: 0, height: 15 }}
                                    >
                                        <Border
                                            variant="12"
                                            tags={[ '#bg' ]}
                                            params={16}
                                            tintColor="#dddddd"
                                            layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                                        >
                                            <ThemeImage
                                                tags={[ '#bg' ]}
                                                params={16}
                                                src={layoutImage('common_close_x.png')}
                                                tint="#777777"
                                                layout={{ position: 'absolute', left: 3, width: 9, top: 3, height: 9 }}
                                            />
                                        </Border>
                                    </Region>
                                </Border>
                            </Region>
                            <Region
                                name="add_more_container"
                                params={16}
                                layout={{ width: 26, height: 42, flexShrink: 0 }}
                            >
                                <ContainerButton
                                    variant="3"
                                    name="add_more"
                                    params={3281}
                                    onPointerTap={onAddMore}
                                    layout={{ position: 'absolute', left: 2, width: 23, top: 10, height: 22 }}
                                />
                            </Region>
                        </Region>
                    </Border>
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 42, top: 0, height: 42 }}
                >
                    <Border
                        variant="3"
                        name="product_icon_previewer"
                        params={16}
                        tintColor="#dadada"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <WidgetSlot
                            widgetType="product_icon"
                            name="icon_preview"
                            params={16}
                            layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 40 }}
                        />
                    </Border>
                </Region>
                <Region
                    name="ruler_view"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1 }}
                >
                    <Region
                        params={4194448}
                        backgroundColor="#b5b5b5"
                        layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 1 }}
                    />
                </Region>
                <Region
                    name="ruler_view_vertical"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 1, top: 0, height: 50 }}
                >
                    <Region
                        params={4196368}
                        backgroundColor="#b5b5b5"
                        layout={{ position: 'absolute', left: 0, width: 1, top: 0, height: 50 }}
                    />
                </Region>
                <Region
                    name="text_view"
                    params={147472}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text="some text" />
                </Region>
                <Region
                    name="text_bold_view"
                    params={147472}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text="some bold text" />
                </Region>
                <Region
                    name="text_html"
                    params={1073741840}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text="Use this by typing" />
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 24 }}
                >
                    <Border
                        variant="4"
                        name="input_template"
                        params={16}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <TextInput
                            value={fieldValue}
                            onChange={setFieldValue}
                            layout={{ position: 'absolute', left: 5, width: 168, top: 3, height: 18 }}
                        />
                    </Border>
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 149, top: 0, height: 24 }}
                >
                    <Dropmenu
                        variant="3"
                        name="dropdown_view"
                        params={17}
                        onPointerTap={onDropdownView}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <CheckBox
                    variant="3"
                    name="checkbox_view"
                    params={17}
                    onPointerTap={onCheckboxView}
                    layout={{ position: 'absolute', left: 0, width: 17, top: 0, height: 15, minHeight: 15, maxHeight: 15 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15, minHeight: 15, maxHeight: 15 }}
                >
                    <RadioButton
                        variant="3"
                        name="radiobutton_view"
                        params={17}
                        onPointerTap={onRadiobuttonView}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    name="expand_collapse_region"
                    params={17}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 16, top: 2, height: 12 }}
                >
                    <ThemeImage
                        name="up_arrow"
                        params={16}
                        src={layoutImage('wired_volter_uparrow.png')}
                        tint="#999999"
                        layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 10 }}
                    />
                    <ThemeImage
                        name="down_arrow"
                        params={16}
                        src={layoutImage('wired_volter_downarrow.png')}
                        tint="#999999"
                        layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 10 }}
                    />
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                >
                    <ContainerButton
                        variant="3"
                        name="iconbutton_left"
                        params={17}
                        onPointerTap={onIconbuttonLeft}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="2"
                            params={16}
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 6, width: 12, top: 6, height: 12 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                >
                    <ContainerButton
                        variant="3"
                        name="iconbutton_right"
                        params={17}
                        onPointerTap={onIconbuttonRight}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="3"
                            params={16}
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 6, width: 12, top: 6, height: 12 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                >
                    <ContainerButton
                        variant="3"
                        name="iconbutton_up"
                        params={17}
                        onPointerTap={onIconbuttonUp}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="1"
                            params={16}
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 7, width: 12, top: 5, height: 12 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                >
                    <ContainerButton
                        variant="3"
                        name="iconbutton_down"
                        params={17}
                        onPointerTap={onIconbuttonDown}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Icon
                            variant="0"
                            params={16}
                            tintColor="#7f7f7f"
                            layout={{ position: 'absolute', left: 7, width: 12, top: 6, height: 12 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 43, top: 0, height: 24 }}
                >
                    <Button
                        variant="3"
                        name="button"
                        params={131089}
                        onPointerTap={onButton}
                        textStyle="text-style-button-shiny-regular"
                        layout={{ width: '100%', height: '100%' }}
                    >
                        text
                    </Button>
                </Region>
                <Frame
                    variant="3"
                    id="frame"
                    name="frame"
                    params={32769}
                    visible={false}
                    caption={t('wiredfurni.title')}
                    tintColor="#418db0"
                    onClose={onFrame}
                    layout={{ position: 'absolute', left: 0, width: 240, top: 0, height: 200, minWidth: 100 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%' }} />
                </Frame>
                <Region
                    visible={false}
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
                            tintColor="#f2f2f2"
                            layout={{ position: 'absolute', left: 1, width: 143, top: 1, height: 25 }}
                        >
                            <Border
                                variant="11"
                                params={2192}
                                tintColor="#d6d6d6"
                                layout={{ position: 'absolute', left: 1, width: 141, top: 1, height: 23 }}
                            >
                                <Region
                                    name="menu_list"
                                    params={144}
                                    layout={{ position: 'absolute', left: 0, width: 141, top: 0, height: 3, flexDirection: 'column' }}
                                >
                                    <Region
                                        name="menu_item_template"
                                        params={145}
                                        visible={false}
                                        layout={{ width: 141, height: 20, flexShrink: 0 }}
                                    >
                                        <CheckBox
                                            variant="3"
                                            name="checkbox"
                                            params={17}
                                            onPointerTap={onCheckbox}
                                            layout={{ position: 'absolute', left: 8, width: 17, top: 3, height: 17, minHeight: 17, maxHeight: 17 }}
                                        />
                                        <Region
                                            name="text"
                                            params={16}
                                            layout={{ position: 'absolute', left: 28, width: 101, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText
                                                text="Copy configuration"
                                                textStyle="text-style-il-regular"
                                            />
                                        </Region>
                                    </Region>
                                    <Region
                                        name="spacer_template"
                                        params={144}
                                        layout={{ width: 141, height: 3, flexShrink: 0 }}
                                    >
                                        <Region
                                            params={144}
                                            backgroundColor="#aaaaaa"
                                            layout={{ position: 'absolute', left: 6, width: 129, top: 1, height: 1 }}
                                        />
                                    </Region>
                                </Region>
                            </Border>
                        </Border>
                    </Border>
                </Region>
                <Region
                    name="sourcetype_selector_view"
                    params={147456}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 17, top: -2, height: 17, minHeight: 17, maxHeight: 17, flexDirection: 'row' }}
                >
                    <Region
                        name="left_padding"
                        params={16}
                        layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17 }}
                    >
                        <Region
                            name="border"
                            params={16}
                            backgroundColor="#000000"
                            layout={{ position: 'absolute', left: 0, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1 }}
                        />
                        <Region
                            name="border"
                            params={16}
                            backgroundColor="#000000"
                            layout={{ position: 'absolute', left: 1, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15 }}
                        >
                            <Region
                                name="margin_item_color_left"
                                params={16}
                                backgroundColor="#333333"
                                layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="source_options_border"
                        params={149520}
                        backgroundColor="#000000"
                        layout={{ width: 13, height: 17, flexShrink: 0, minHeight: 17, maxHeight: 17 }}
                    >
                        <Region
                            name="source_options_cont"
                            params={147600}
                            backgroundColor="#181818"
                            layout={{ position: 'absolute', left: 0, width: 13, top: 1, height: 15, minHeight: 15, maxHeight: 15 }}
                        >
                            <Region
                                name="source_options_list"
                                params={147600}
                                layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 15, minHeight: 15, maxHeight: 15, flexDirection: 'row', gap: 1 }}
                            >
                                <Region
                                    name="source_btn"
                                    params={147473}
                                    backgroundColor="#ffffff"
                                    layout={{ width: 13, height: 15, flexShrink: 0, minHeight: 15, maxHeight: 15 }}
                                >
                                    <Region
                                        name="source_elements"
                                        params={147600}
                                        backgroundColor="#333333"
                                        layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 15, minHeight: 15, maxHeight: 15, flexDirection: 'row' }}
                                    >
                                        <Region
                                            name="left_pad"
                                            params={16}
                                            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15 }}
                                        />
                                        <ThemeImage
                                            name="type_icon_bitmap"
                                            params={3932176}
                                            src={undefined}
                                            layout={{ width: 9, height: 11, flexShrink: 0, minHeight: 11, maxHeight: 11 }}
                                        />
                                        <Region
                                            name="right_pad"
                                            params={16}
                                            layout={{ width: 2, height: 15, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 15, maxHeight: 15 }}
                                        />
                                    </Region>
                                </Region>
                            </Region>
                        </Region>
                    </Region>
                    <Region
                        name="right_padding"
                        params={16}
                        layout={{ width: 2, height: 17, flexShrink: 0, minWidth: 2, maxWidth: 2, minHeight: 17, maxHeight: 17 }}
                    >
                        <Region
                            name="border"
                            params={16}
                            backgroundColor="#000000"
                            layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 15, minWidth: 1, maxWidth: 1, minHeight: 15, maxHeight: 15 }}
                        >
                            <Region
                                name="margin_item_color_right"
                                params={16}
                                backgroundColor="#222222"
                                layout={{ position: 'absolute', left: 0, width: 1, top: 1, height: 13, minWidth: 1, maxWidth: 1, minHeight: 13, maxHeight: 13 }}
                            />
                        </Region>
                        <Region
                            name="border"
                            params={16}
                            backgroundColor="#000000"
                            layout={{ position: 'absolute', left: 1, width: 1, top: 2, height: 13, minWidth: 1, maxWidth: 1 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="slider"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 18 }}
                >
                    <ThemeImage
                        name="slider_base"
                        params={144}
                        src={layoutImage('wired_styles_volter_slider_bg.png')}
                        tint="#999999"
                        layout={{ position: 'absolute', left: 0, width: 148, top: 0, height: 19 }}
                    />
                    <Region
                        name="slider_movement_area"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 148, top: 1, height: 17 }}
                    >
                        <ThemeImage
                            name="slider_button"
                            params={33073}
                            src={layoutImage('wired_styles_illumina_slider_obj.png')}
                            layout={{ position: 'absolute', left: 0, width: 12, top: 0, height: 17 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="mini_button_view"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 19 }}
                >
                    <ContainerButton
                        variant="3"
                        name="mini_button_click"
                        params={17}
                        onPointerTap={onMiniButtonClick}
                        layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 19, maxWidth: 19 }}
                    >
                        <ThemeImage
                            name="mini_button_icon"
                            params={16}
                            src={undefined}
                            layout={{ position: 'absolute', left: 3, width: 13, top: 2, height: 15 }}
                        />
                    </ContainerButton>
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                >
                    <Border
                        variant="3"
                        name="border"
                        params={16}
                        tintColor="#dadada"
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                >
                    <ContainerButton
                        variant="7"
                        name="container_button"
                        params={17}
                        onPointerTap={onContainerButton}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
