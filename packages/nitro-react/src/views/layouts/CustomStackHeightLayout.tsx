import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, CheckBox, ContainerButton, Frame, Icon, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `989_custom_stack_height_xml` (layout "custom_stack_height", 320x210) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CustomStackHeightLayoutProps {
    layout?: BoxLayout;
    onButtonAboveStack?: () => void;
    onButtonFloorLevel?: () => void;
    onButtonMoveDown?: () => void;
    onButtonMoveUp?: () => void;
    onClose?: () => void;
    onMultiwalkCheckbox?: () => void;
    onSliderButton?: () => void;
}

export const CustomStackHeightLayout = ({ layout, onButtonAboveStack, onButtonFloorLevel, onButtonMoveDown, onButtonMoveUp, onClose, onMultiwalkCheckbox, onSliderButton }: CustomStackHeightLayoutProps) => {
    const t = useTranslation();
    const [ inputHeightValue, setInputHeightValue ] = useState('');

    return (
        <Frame
            variant="100"
            params={32769}
            caption={t('widget.custom.stack.height.title')}
            onClose={onClose}
            layout={{ width: 320, height: 210, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Button
                    variant="102"
                    name="button_above_stack"
                    params={131089}
                    onPointerTap={onButtonAboveStack}
                    layout={{ position: 'absolute', left: 12, width: 134, top: 110, height: 29 }}
                >
                    {t('furniture.above.stack')}
                </Button>
                <Button
                    variant="102"
                    name="button_floor_level"
                    params={393233}
                    onPointerTap={onButtonFloorLevel}
                    layout={{ position: 'absolute', left: 182, width: 126, top: 110, height: 29 }}
                >
                    {t('furniture.floor.level')}
                </Button>
                <Border
                    variant="105"
                    name="slider"
                    params={17}
                    layout={{ position: 'absolute', left: 35, width: 206, top: 68, height: 30 }}
                >
                    <ContainerButton
                        variant="102"
                        name="slider_button"
                        params={33073}
                        onPointerTap={onSliderButton}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 30 }}
                    />
                </Border>
                <Region
                    name="height_text"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 294, top: 5, height: 59, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('widget.custom.stack.height.text')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 294 }}
                    />
                </Region>
                <Border
                    variant="105"
                    params={16}
                    layout={{ position: 'absolute', left: 250, width: 58, top: 68, height: 30 }}
                >
                    <TextInput
                        value={inputHeightValue}
                        onChange={setInputHeightValue}
                        layout={{ position: 'absolute', left: 7, width: 45, top: 7, height: 20 }}
                    />
                </Border>
                <Region
                    name="walktile_container"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 318, top: 149, height: 24 }}
                >
                    <CheckBox
                        variant="102"
                        name="multiwalk_checkbox"
                        params={17}
                        onPointerTap={onMultiwalkCheckbox}
                        layout={{ position: 'absolute', left: 13, width: 17, top: 3, height: 16 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 31, width: 282, top: 2, height: 19, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('widget.custom.multiwalk_mode.text')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 282 }}
                        />
                    </Region>
                </Region>
                <ContainerButton
                    variant="102"
                    name="button_move_down"
                    tooltip={t('widget.custom.height.move_down')}
                    params={1}
                    dynamicStyle="button"
                    onPointerTap={onButtonMoveDown}
                    layout={{ position: 'absolute', left: 9, width: 19, top: 84, height: 20 }}
                >
                    <Icon
                        variant="0"
                        tags={[ '#icon' ]}
                        tintColor="#7f7f7f"
                        layout={{ position: 'absolute', left: 5, width: 12, top: 5, height: 12 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="102"
                    name="button_move_up"
                    tooltip={t('widget.custom.height.move_up')}
                    params={1}
                    dynamicStyle="button"
                    onPointerTap={onButtonMoveUp}
                    layout={{ position: 'absolute', left: 9, width: 19, top: 62, height: 20 }}
                >
                    <Icon
                        variant="1"
                        tags={[ '#icon' ]}
                        tintColor="#7f7f7f"
                        layout={{ position: 'absolute', left: 5, width: 12, top: 4, height: 12 }}
                    />
                </ContainerButton>
            </Region>
        </Frame>
    );
};
