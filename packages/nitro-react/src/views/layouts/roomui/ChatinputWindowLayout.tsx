import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CloseButton, ContainerButton, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `925_chatinput_window_xml` (layout "chatinput_window", 1280x1024) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatinputWindowLayoutProps {
    itemsChatInputContainer?: ReactNode;
    layout?: BoxLayout;
}

export const ChatinputWindowLayout = ({ itemsChatInputContainer, layout }: ChatinputWindowLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1280, height: 1024, ...layout }}>
            <Region
                name="master_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 1280, top: 0, height: 1024, minWidth: 90 }}
            >
                <Region
                    name="bubblecont"
                    tags={[ 'chat_bubble' ]}
                    params={1049600}
                    layout={{ position: 'absolute', left: 18, width: 733, top: 669, height: 117, minWidth: 90 }}
                >
                    <Region
                        name="chat_input_container"
                        params={4194512}
                        layout={{ position: 'absolute', left: 124, width: 484, top: 60, height: 57, flexDirection: 'row', gap: 7 }}
                    >
                        {itemsChatInputContainer ?? (
                            <>
                                <ChatinputWindowLayoutStylesItem />
                                <ChatinputWindowLayoutInputBorderItem />
                                <ChatinputWindowLayoutSendButtonItem />
                            </>
                        )}
                    </Region>
                </Region>
                <Region
                    name="chatstyles_menu"
                    params={1180672}
                    layout={{ position: 'absolute', left: 2, width: 160, top: 661, height: 105 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `styles` of ChatinputWindowLayout - pass real rows through its `items…` slot. */
export interface ChatinputWindowLayoutStylesItemProps {
    layout?: BoxLayout;
    srcPreviewBitmap?: string;
}

export const ChatinputWindowLayoutStylesItem = ({ layout, srcPreviewBitmap }: ChatinputWindowLayoutStylesItemProps) => {
    return (
        <Border
            variant="8"
            name="styles"
            params={17}
            layout={{ width: 83, height: 38, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="preview_bitmap"
                params={16}
                src={srcPreviewBitmap}
                layout={{ position: 'absolute', left: 7, width: 55, top: 2, height: 34 }}
            />
            <Region
                name="dropdown_icon_container"
                params={16}
                layout={{ position: 'absolute', left: 63, width: 18, top: 3, height: 33 }}
            >
                <Icon
                    variant="7"
                    params={16}
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 2, width: 10, top: 14, height: 5 }}
                />
            </Region>
        </Border>
    );
};

/** Row template `input_border` of ChatinputWindowLayout - pass real rows through its `items…` slot. */
export interface ChatinputWindowLayoutInputBorderItemProps {
    captionBlockText?: string;
    layout?: BoxLayout;
    onHelpbutton?: () => void;
    onHelpbuttonShowHoverRegion?: () => void;
}

export const ChatinputWindowLayoutInputBorderItem = ({ captionBlockText, layout, onHelpbutton, onHelpbuttonShowHoverRegion }: ChatinputWindowLayoutInputBorderItemProps) => {
    const t = useTranslation();
    const [ chatInputValue, setChatInputValue ] = useState('');

    return (
        <Border
            variant="8"
            name="input_border"
            params={16}
            layout={{ width: 340, height: 38, flexShrink: 0, ...layout }}
        >
            <Region
                name="helpbutton_show_hover_region"
                params={17}
                onPointerTap={onHelpbuttonShowHoverRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 1, width: 340, top: 0, height: 37 }}
            />
            <TextInput
                value={chatInputValue}
                onChange={setChatInputValue}
                maxLength={100}
                layout={{ position: 'absolute', left: 10, width: 326, top: 7, height: 24 }}
            />
            <Region
                name="block_text"
                params={16}
                visible={false}
                layout={{ position: 'absolute', left: 10, width: 325, top: 9, height: 23, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBlockText ?? t('chat.input.alert.flood')}
                    textOptions={{ fill: '#ff0000' }}
                />
            </Region>
            <CloseButton
                variant="4"
                name="helpbutton"
                params={17}
                onPointerTap={onHelpbutton}
                layout={{ position: 'absolute', left: 313, width: 22, top: 9, height: 21 }}
            />
        </Border>
    );
};

/** Row template `send_button` of ChatinputWindowLayout - pass real rows through its `items…` slot. */
export interface ChatinputWindowLayoutSendButtonItemProps {
    captionSendButtonText?: string;
    layout?: BoxLayout;
    onSendButton?: () => void;
}

export const ChatinputWindowLayoutSendButtonItem = ({ captionSendButtonText, layout, onSendButton }: ChatinputWindowLayoutSendButtonItemProps) => {
    return (
        <ContainerButton
            variant="4"
            name="send_button"
            tags={[ 'FIT:chatSayButton' ]}
            params={12582929}
            onPointerTap={onSendButton}
            layout={{ width: 47, height: 38, flexShrink: 0, ...layout }}
        >
            <Region
                name="send_button_text"
                params={12582928}
                layout={{ position: 'absolute', left: 20, width: 8, top: 6, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionSendButtonText ?? '.'} />
            </Region>
        </ContainerButton>
    );
};
