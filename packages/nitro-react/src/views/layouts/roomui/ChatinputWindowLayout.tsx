import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CloseButton, ContainerButton, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `925_chatinput_window_xml` (layout "chatinput_window", 1280x1024) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatinputWindowLayoutProps {
    layout?: BoxLayout;
    masterContainer?: ChatinputWindowLayoutMasterContainerProps;
}

export const ChatinputWindowLayout = ({ layout, masterContainer }: ChatinputWindowLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1280, height: 1024, ...layout }}>
            <ChatinputWindowLayoutMasterContainer {...masterContainer} />
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
            layout={{ width: 83, height: 38, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="preview_bitmap"
                src={srcPreviewBitmap}
                layout={{ position: 'absolute', left: 7, width: 55, top: 2, height: 34 }}
            />
            <Region
                name="dropdown_icon_container"
                layout={{ position: 'absolute', left: 63, width: 18, top: 3, height: 33 }}
            >
                <Icon
                    variant="7"
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
    visibleBlockText?: boolean;
}

export const ChatinputWindowLayoutInputBorderItem = ({ captionBlockText, layout, onHelpbutton, onHelpbuttonShowHoverRegion, visibleBlockText }: ChatinputWindowLayoutInputBorderItemProps) => {
    const t = useTranslation();
    const [ chatInputValue, setChatInputValue ] = useState('');

    return (
        <Border
            variant="8"
            name="input_border"
            layout={{ width: 340, height: 38, flexShrink: 0, ...layout }}
        >
            <Region
                name="helpbutton_show_hover_region"
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
            <CloseButton
                variant="4"
                name="helpbutton"
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
            onPointerTap={onSendButton}
            layout={{ width: 47, height: 38, flexShrink: 0, ...layout }}
        >
            <ThemeText text={captionSendButtonText ?? '.'} />
        </ContainerButton>
    );
};

/** Named region `chat_input_container` of ChatinputWindowLayout - configured through the parent's `chatInputContainer` prop. */
export interface ChatinputWindowLayoutChatInputContainerProps {
    itemsChatInputContainer?: ReactNode;
    layout?: BoxLayout;
}

export const ChatinputWindowLayoutChatInputContainer = ({ itemsChatInputContainer, layout }: ChatinputWindowLayoutChatInputContainerProps) => {
    return (
        <Region
            name="chat_input_container"
            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 484, top: 60, height: 57, flexDirection: 'row', gap: 7, ...layout }}
        >
            {itemsChatInputContainer ?? (
                <>
                    <ChatinputWindowLayoutStylesItem />
                    <ChatinputWindowLayoutInputBorderItem />
                    <ChatinputWindowLayoutSendButtonItem />
                </>
            )}
        </Region>
    );
};

/** Named region `bubblecont` of ChatinputWindowLayout - configured through the parent's `bubblecont` prop. */
export interface ChatinputWindowLayoutBubblecontProps {
    chatInputContainer?: ChatinputWindowLayoutChatInputContainerProps;
    layout?: BoxLayout;
}

export const ChatinputWindowLayoutBubblecont = ({ chatInputContainer, layout }: ChatinputWindowLayoutBubblecontProps) => {
    return (
        <Region
            name="bubblecont"
            dropShadow={{ distance: 4, alpha: 0.6 }}
            layout={{ position: 'absolute', left: 18, width: 733, bottom: 238, height: 117, minWidth: 90, justifyContent: 'center', ...layout }}
        >
            <ChatinputWindowLayoutChatInputContainer {...chatInputContainer} />
        </Region>
    );
};

/** Named region `master_container` of ChatinputWindowLayout - configured through the parent's `masterContainer` prop. */
export interface ChatinputWindowLayoutMasterContainerProps {
    bubblecont?: ChatinputWindowLayoutBubblecontProps;
    layout?: BoxLayout;
}

export const ChatinputWindowLayoutMasterContainer = ({ bubblecont, layout }: ChatinputWindowLayoutMasterContainerProps) => {
    return (
        <Region
            name="master_container"
            layout={{ position: 'absolute', left: 0, width: 1280, top: 0, height: 1024, minWidth: 90, ...layout }}
        >
            <ChatinputWindowLayoutBubblecont {...bubblecont} />
            <Region
                name="chatstyles_menu"
                dropShadow={{ distance: 4, alpha: 0.6 }}
                layout={{ position: 'absolute', left: 2, width: 160, bottom: 258, height: 105 }}
            />
        </Region>
    );
};
