import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CloseButton, Region, TextInput, ThemeText } from '#base/theme';

/** Row template `input_border` of ChatinputWindowLayout - pass real rows through its `items…` slot. */
export interface ChatinputWindowLayoutInputBorderItemProps {
    captionBlockText?: string;
    helpbuttonShowHoverRegion?: ReactNode;
    layout?: BoxLayout;
    onHelpbutton?: () => void;
    onHelpbuttonShowHoverRegion?: () => void;
    visibleBlockText?: boolean;
    visibleChatInput?: boolean;
    visibleHelpbutton?: boolean;
    visibleHelpbuttonShowHoverRegion?: boolean;
}

export const ChatinputWindowLayoutInputBorderItem = ({ captionBlockText, helpbuttonShowHoverRegion, layout, onHelpbutton, onHelpbuttonShowHoverRegion, visibleBlockText, visibleChatInput, visibleHelpbutton, visibleHelpbuttonShowHoverRegion }: ChatinputWindowLayoutInputBorderItemProps) => {
    const t = useTranslation();
    const [ chatInputValue, setChatInputValue ] = useState('');

    return (
        <Border
            variant="8"
            name="input_border"
            layout={{ width: 340, height: 38, flexShrink: 0, ...layout }}
        >
            {(visibleHelpbuttonShowHoverRegion ?? true) && (
                <Region
                    name="helpbutton_show_hover_region"
                    onPointerTap={onHelpbuttonShowHoverRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 1, width: 340, top: 0, height: 37 }}
                >
                    {helpbuttonShowHoverRegion}
                </Region>
            )}
            {(visibleChatInput ?? true) && (
                <TextInput
                    value={chatInputValue}
                    onChange={setChatInputValue}
                    maxLength={100}
                    layout={{ position: 'absolute', left: 10, width: 326, top: 7, height: 24 }}
                />
            )}
            {(visibleBlockText ?? false) && (
                <Region
                    name="block_text"
                    layout={{ position: 'absolute', left: 10, width: 325, top: 9, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBlockText ?? t('chat.input.alert.flood')}
                        textOptions={{ fill: '#ff0000' }}
                    />
                </Region>
            )}
            {(visibleHelpbutton ?? true) && (
                <CloseButton
                    variant="4"
                    name="helpbutton"
                    onPointerTap={onHelpbutton}
                    layout={{ position: 'absolute', left: 313, width: 22, top: 9, height: 21 }}
                />
            )}
        </Border>
    );
};
