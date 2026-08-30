import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Frame, Icon, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `989_custom_stack_height_xml` (layout "custom_stack_height", 320x210) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CustomStackHeightLayoutProps {
    captionHeightText?: string;
    layout?: BoxLayout;
    onButtonAboveStack?: () => void;
    onButtonFloorLevel?: () => void;
    onButtonMoveDown?: () => void;
    onButtonMoveUp?: () => void;
    onClose?: () => void;
    onMultiwalkCheckbox?: () => void;
    onSliderButton?: () => void;
}

export const CustomStackHeightLayout = ({ captionHeightText, layout, onButtonAboveStack, onButtonFloorLevel, onButtonMoveDown, onButtonMoveUp, onClose, onMultiwalkCheckbox, onSliderButton }: CustomStackHeightLayoutProps) => {
    const t = useTranslation();
    const [ inputHeightValue, setInputHeightValue ] = useState('');

    return (
        <Frame
            variant="100"
            caption={t('widget.custom.stack.height.title')}
            onClose={onClose}
            layout={{ width: 320, height: 210, minWidth: 320, minHeight: 185, maxHeight: 210, ...layout }}
        >
            <Button
                variant="102"
                name="button_above_stack"
                onPointerTap={onButtonAboveStack}
                layout={{ position: 'absolute', left: 12, width: 134, top: 110, height: 29 }}
            >
                {t('furniture.above.stack')}
            </Button>
            <Button
                variant="102"
                name="button_floor_level"
                onPointerTap={onButtonFloorLevel}
                layout={{ position: 'absolute', right: 0, width: 126, top: 110, height: 29 }}
            >
                {t('furniture.floor.level')}
            </Button>
            <Border
                variant="105"
                name="slider"
                layout={{ position: 'absolute', left: 35, width: 206, alignSelf: 'center', marginTop: -1.5, marginBottom: 1.5, height: 30 }}
            >
                <ContainerButton
                    variant="102"
                    name="slider_button"
                    onPointerTap={onSliderButton}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, bottom: 0 }}
                />
            </Border>
            <ThemeText
                text={captionHeightText ?? t('widget.custom.stack.height.text')}
                textOptions={{ wordWrap: true, wordWrapWidth: 294 }}
                name="height_text"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, right: 4, top: 5, height: 59 }}
            />
            <Border
                variant="105"
                layout={{ position: 'absolute', right: 0, width: 58, alignSelf: 'center', marginTop: -1.5, marginBottom: 1.5, height: 30 }}
            >
                <TextInput
                    value={inputHeightValue}
                    onChange={setInputHeightValue}
                    layout={{ position: 'absolute', left: 7, right: 6, top: 7, bottom: 3 }}
                />
            </Border>
            <Region
                name="walktile_container"
                layout={{ position: 'absolute', left: 0, right: -10, bottom: -4, height: 24 }}
            >
                <CheckBox
                    variant="102"
                    name="multiwalk_checkbox"
                    onPointerTap={onMultiwalkCheckbox}
                    layout={{ position: 'absolute', left: 13, width: 17, top: 3, height: 16 }}
                />
                <ThemeText
                    text={t('widget.custom.multiwalk_mode.text')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 282 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 5, width: 282, top: 2, bottom: 3 }}
                />
            </Region>
            <ContainerButton
                variant="102"
                name="button_move_down"
                tooltip={t('widget.custom.height.move_down')}
                dynamicStyle="button"
                onPointerTap={onButtonMoveDown}
                layout={{ position: 'absolute', left: 9, width: 19, top: 84, height: 20 }}
            >
                <Icon
                    variant="0"
                    tintColor="#7f7f7f"
                    layout={{ position: 'absolute', left: 5, width: 12, top: 5, height: 12 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="102"
                name="button_move_up"
                tooltip={t('widget.custom.height.move_up')}
                dynamicStyle="button"
                onPointerTap={onButtonMoveUp}
                layout={{ position: 'absolute', left: 9, width: 19, top: 62, height: 20 }}
            >
                <Icon
                    variant="1"
                    tintColor="#7f7f7f"
                    layout={{ position: 'absolute', left: 5, width: 12, top: 4, height: 12 }}
                />
            </ContainerButton>
        </Frame>
    );
};
