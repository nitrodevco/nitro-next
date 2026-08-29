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

/** Named region `dropdown_icon_container` of ChatinputWindowLayout - configured through the parent's `dropdownIconContainer` prop. */
export interface ChatinputWindowLayoutDropdownIconContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ChatinputWindowLayoutDropdownIconContainer = ({ layout, tags }: ChatinputWindowLayoutDropdownIconContainerProps) => {
    return (
        <Region
            name="dropdown_icon_container"
            tags={tags}
            layout={{ position: 'absolute', left: 63, width: 18, top: 3, height: 33, ...layout }}
        >
            <Icon
                variant="7"
                tintColor="#000000"
                layout={{ position: 'absolute', left: 2, width: 10, top: 14, height: 5 }}
            />
        </Region>
    );
};

/** Row template `styles` of ChatinputWindowLayout - pass real rows through its `items…` slot. */
export interface ChatinputWindowLayoutStylesItemProps {
    dropdownIconContainer?: ChatinputWindowLayoutDropdownIconContainerProps;
    layout?: BoxLayout;
    srcPreviewBitmap?: string;
    tags?: string[];
}

export const ChatinputWindowLayoutStylesItem = ({ dropdownIconContainer, layout, srcPreviewBitmap, tags }: ChatinputWindowLayoutStylesItemProps) => {
    return (
        <Border
            variant="8"
            name="styles"
            tags={tags}
            layout={{ width: 83, height: 38, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="preview_bitmap"
                src={srcPreviewBitmap}
                layout={{ position: 'absolute', left: 7, width: 55, top: 2, height: 34 }}
            />
            <ChatinputWindowLayoutDropdownIconContainer {...dropdownIconContainer} />
        </Border>
    );
};

/** Named region `helpbutton_show_hover_region` of ChatinputWindowLayout - configured through the parent's `helpbuttonShowHoverRegion` prop. */
export interface ChatinputWindowLayoutHelpbuttonShowHoverRegionProps {
    layout?: BoxLayout;
    onHelpbuttonShowHoverRegion?: () => void;
    tags?: string[];
}

export const ChatinputWindowLayoutHelpbuttonShowHoverRegion = ({ layout, onHelpbuttonShowHoverRegion, tags }: ChatinputWindowLayoutHelpbuttonShowHoverRegionProps) => {
    return (
        <Region
            name="helpbutton_show_hover_region"
            tags={tags}
            onPointerTap={onHelpbuttonShowHoverRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 1, width: 340, top: 0, height: 37, ...layout }}
        />
    );
};

/** Row template `input_border` of ChatinputWindowLayout - pass real rows through its `items…` slot. */
export interface ChatinputWindowLayoutInputBorderItemProps {
    captionBlockText?: string;
    helpbuttonShowHoverRegion?: ChatinputWindowLayoutHelpbuttonShowHoverRegionProps;
    layout?: BoxLayout;
    onHelpbutton?: () => void;
    tags?: string[];
}

export const ChatinputWindowLayoutInputBorderItem = ({ captionBlockText, helpbuttonShowHoverRegion, layout, onHelpbutton, tags }: ChatinputWindowLayoutInputBorderItemProps) => {
    const t = useTranslation();
    const [ chatInputValue, setChatInputValue ] = useState('');

    return (
        <Border
            variant="8"
            name="input_border"
            tags={tags}
            layout={{ width: 340, height: 38, flexShrink: 0, ...layout }}
        >
            <ChatinputWindowLayoutHelpbuttonShowHoverRegion {...helpbuttonShowHoverRegion} />
            <TextInput
                value={chatInputValue}
                onChange={setChatInputValue}
                maxLength={100}
                layout={{ position: 'absolute', left: 10, width: 326, top: 7, height: 24 }}
            />
            <Region
                name="block_text"
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
    tags?: string[];
}

export const ChatinputWindowLayoutSendButtonItem = ({ captionSendButtonText, layout, onSendButton, tags }: ChatinputWindowLayoutSendButtonItemProps) => {
    return (
        <ContainerButton
            variant="4"
            name="send_button"
            tags={tags}
            onPointerTap={onSendButton}
            layout={{ width: 47, height: 38, flexShrink: 0, ...layout }}
        >
            <Region
                name="send_button_text"
                layout={{ position: 'absolute', left: 20, top: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionSendButtonText ?? '.'} />
            </Region>
        </ContainerButton>
    );
};

/** Named region `chat_input_container` of ChatinputWindowLayout - configured through the parent's `chatInputContainer` prop. */
export interface ChatinputWindowLayoutChatInputContainerProps {
    itemsChatInputContainer?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChatinputWindowLayoutChatInputContainer = ({ itemsChatInputContainer, layout, tags }: ChatinputWindowLayoutChatInputContainerProps) => {
    return (
        <Region
            name="chat_input_container"
            tags={tags}
            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 484, top: 60, height: 57, flexDirection: 'row', gap: 7, ...layout }}
        >
            {itemsChatInputContainer ?? (
                <>
                    <ChatinputWindowLayoutStylesItem />
                    <ChatinputWindowLayoutInputBorderItem />
                    <ChatinputWindowLayoutSendButtonItem tags={[ 'FIT:chatSayButton' ]} />
                </>
            )}
        </Region>
    );
};

/** Named region `bubblecont` of ChatinputWindowLayout - configured through the parent's `bubblecont` prop. */
export interface ChatinputWindowLayoutBubblecontProps {
    chatInputContainer?: ChatinputWindowLayoutChatInputContainerProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChatinputWindowLayoutBubblecont = ({ chatInputContainer, layout, tags }: ChatinputWindowLayoutBubblecontProps) => {
    return (
        <Region
            name="bubblecont"
            tags={tags}
            dropShadow={{ distance: 4, alpha: 0.6 }}
            layout={{ position: 'absolute', left: 18, width: 733, bottom: 238, height: 117, minWidth: 90, justifyContent: 'center', ...layout }}
        >
            <ChatinputWindowLayoutChatInputContainer {...chatInputContainer} />
        </Region>
    );
};

/** Named region `chatstyles_menu` of ChatinputWindowLayout - configured through the parent's `chatstylesMenu` prop. */
export interface ChatinputWindowLayoutChatstylesMenuProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ChatinputWindowLayoutChatstylesMenu = ({ layout, tags }: ChatinputWindowLayoutChatstylesMenuProps) => {
    return (
        <Region
            name="chatstyles_menu"
            tags={tags}
            dropShadow={{ distance: 4, alpha: 0.6 }}
            layout={{ position: 'absolute', left: 2, width: 160, bottom: 258, height: 105, ...layout }}
        />
    );
};

/** Named region `master_container` of ChatinputWindowLayout - configured through the parent's `masterContainer` prop. */
export interface ChatinputWindowLayoutMasterContainerProps {
    bubblecont?: ChatinputWindowLayoutBubblecontProps;
    chatstylesMenu?: ChatinputWindowLayoutChatstylesMenuProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChatinputWindowLayoutMasterContainer = ({ bubblecont, chatstylesMenu, layout, tags }: ChatinputWindowLayoutMasterContainerProps) => {
    return (
        <Region
            name="master_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 1280, top: 0, height: 1024, minWidth: 90, ...layout }}
        >
            <ChatinputWindowLayoutBubblecont
                tags={[ 'chat_bubble' ]}
                {...bubblecont}
            />
            <ChatinputWindowLayoutChatstylesMenu {...chatstylesMenu} />
        </Region>
    );
};
