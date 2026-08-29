import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CloseButton, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1021_chatinput_window_new_xml` (layout "chatinput_window_new", 471x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatinputWindowNewLayoutProps {
    layout?: BoxLayout;
    masterContainer?: ChatinputWindowNewLayoutMasterContainerProps;
}

export const ChatinputWindowNewLayout = ({ layout, masterContainer }: ChatinputWindowNewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 471, height: 100, ...layout }}>
            <ChatinputWindowNewLayoutMasterContainer {...masterContainer} />
        </Region>
    );
};

/** Named region `helpbutton_show_hover_region` of ChatinputWindowNewLayout - configured through the parent's `helpbuttonShowHoverRegion` prop. */
export interface ChatinputWindowNewLayoutHelpbuttonShowHoverRegionProps {
    layout?: BoxLayout;
    onHelpbuttonShowHoverRegion?: () => void;
    tags?: string[];
}

export const ChatinputWindowNewLayoutHelpbuttonShowHoverRegion = ({ layout, onHelpbuttonShowHoverRegion, tags }: ChatinputWindowNewLayoutHelpbuttonShowHoverRegionProps) => {
    return (
        <Region
            name="helpbutton_show_hover_region"
            tags={tags}
            onPointerTap={onHelpbuttonShowHoverRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 1, width: 401, top: -1, height: 37, ...layout }}
        />
    );
};

/** Named region `styles` of ChatinputWindowNewLayout - configured through the parent's `styles` prop. */
export interface ChatinputWindowNewLayoutStylesProps {
    layout?: BoxLayout;
    onStyles?: () => void;
    srcStyleBg?: string;
    srcStyleIcon?: string;
    tags?: string[];
}

export const ChatinputWindowNewLayoutStyles = ({ layout, onStyles, srcStyleBg, srcStyleIcon, tags }: ChatinputWindowNewLayoutStylesProps) => {
    return (
        <Region
            name="styles"
            tags={tags}
            onPointerTap={onStyles}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 39, ...layout }}
        >
            <ThemeImage
                name="style_bg"
                src={srcStyleBg ?? layoutImage('common_chat_style_block.png')}
                layout={{ position: 'absolute', left: 0, width: 57, top: 0, height: 38 }}
            />
            <ThemeImage
                name="style_icon"
                tags={[ '#icon' ]}
                src={srcStyleIcon ?? layoutImage('common_chat_styles.png')}
                layout={{ position: 'absolute', left: 25, width: 17, top: 10, height: 19 }}
            />
            <Icon
                variant="7"
                dynamicStyle="brightness_and_shadow_under"
                tintColor="#4c4c4c"
                layout={{ position: 'absolute', left: 10, width: 10, top: 17, height: 5 }}
            />
        </Region>
    );
};

/** Named region `chat_extra_button` of ChatinputWindowNewLayout - configured through the parent's `chatExtraButton` prop. */
export interface ChatinputWindowNewLayoutChatExtraButtonProps {
    layout?: BoxLayout;
    onChatExtraButton?: () => void;
    srcChatExtraBg?: string;
    srcChatExtraBg2?: string;
    srcChatExtraIcon?: string;
    srcChatExtraSetIcon?: string;
    tags?: string[];
}

export const ChatinputWindowNewLayoutChatExtraButton = ({ layout, onChatExtraButton, srcChatExtraBg, srcChatExtraBg2, srcChatExtraIcon, srcChatExtraSetIcon, tags }: ChatinputWindowNewLayoutChatExtraButtonProps) => {
    return (
        <Region
            name="chat_extra_button"
            tags={tags}
            dynamicStyle="lifted_hover"
            onPointerTap={onChatExtraButton}
            cursor="pointer"
            layout={{ position: 'absolute', left: 427, width: 41, top: 0, height: 38, ...layout }}
        >
            <Region
                tags={[ '#icon' ]}
                layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 38 }}
            >
                <ThemeImage
                    name="chat_extra_bg"
                    src={srcChatExtraBg ?? layoutImage('habbicons_sticky_note.png')}
                    layout={{ position: 'absolute', left: 0, width: 36, top: 0, height: 38 }}
                />
                <ThemeImage
                    name="chat_extra_set_icon"
                    src={srcChatExtraSetIcon}
                    layout={{ position: 'absolute', left: 3, width: 30, top: 3, height: 30 }}
                />
                <ThemeImage
                    name="chat_extra_icon"
                    src={srcChatExtraIcon ?? layoutImage('habbicons_clip.png')}
                    layout={{ position: 'absolute', left: 23, width: 18, top: 2, height: 15 }}
                />
                <ThemeImage
                    name="chat_extra_bg"
                    src={srcChatExtraBg2 ?? layoutImage('habbicons_sticky_note2.png')}
                    layout={{ position: 'absolute', left: 24, width: 12, top: 26, height: 12 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `chat_input_container` of ChatinputWindowNewLayout - configured through the parent's `chatInputContainer` prop. */
export interface ChatinputWindowNewLayoutChatInputContainerProps {
    captionBlockText?: string;
    chatExtraButton?: ChatinputWindowNewLayoutChatExtraButtonProps;
    helpbuttonShowHoverRegion?: ChatinputWindowNewLayoutHelpbuttonShowHoverRegionProps;
    layout?: BoxLayout;
    styles?: ChatinputWindowNewLayoutStylesProps;
    tags?: string[];
}

export const ChatinputWindowNewLayoutChatInputContainer = ({ captionBlockText, chatExtraButton, helpbuttonShowHoverRegion, layout, styles, tags }: ChatinputWindowNewLayoutChatInputContainerProps) => {
    const t = useTranslation();
    const [ chatInputValue, setChatInputValue ] = useState('');

    return (
        <Region
            name="chat_input_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 471, top: 60, height: 57, ...layout }}
        >
            <Border
                variant="8"
                name="input_border"
                tintColor="#e5e5e5"
                layout={{ position: 'absolute', left: 11, width: 400, top: 0, height: 38 }}
            >
                <ChatinputWindowNewLayoutHelpbuttonShowHoverRegion {...helpbuttonShowHoverRegion} />
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
                <TextInput
                    value={chatInputValue}
                    onChange={setChatInputValue}
                    maxLength={100}
                    textColor="#777777"
                    layout={{ position: 'absolute', left: 50, width: 326, top: 7, height: 24 }}
                />
            </Border>
            <ChatinputWindowNewLayoutStyles {...styles} />
            <ChatinputWindowNewLayoutChatExtraButton {...chatExtraButton} />
        </Region>
    );
};

/** Named region `bubblecont` of ChatinputWindowNewLayout - configured through the parent's `bubblecont` prop. */
export interface ChatinputWindowNewLayoutBubblecontProps {
    chatInputContainer?: ChatinputWindowNewLayoutChatInputContainerProps;
    layout?: BoxLayout;
    onHelpbutton?: () => void;
    tags?: string[];
}

export const ChatinputWindowNewLayoutBubblecont = ({ chatInputContainer, layout, onHelpbutton, tags }: ChatinputWindowNewLayoutBubblecontProps) => {
    return (
        <Region
            name="bubblecont"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 471, bottom: 0, height: 100, minWidth: 90, ...layout }}
        >
            <ChatinputWindowNewLayoutChatInputContainer {...chatInputContainer} />
            <CloseButton
                variant="4"
                name="helpbutton"
                onPointerTap={onHelpbutton}
                layout={{ position: 'absolute', left: 382, width: 20, top: 68, height: 25, minHeight: 25, maxHeight: 25 }}
            />
        </Region>
    );
};

/** Named region `chatstyles_menu` of ChatinputWindowNewLayout - configured through the parent's `chatstylesMenu` prop. */
export interface ChatinputWindowNewLayoutChatstylesMenuProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ChatinputWindowNewLayoutChatstylesMenu = ({ layout, tags }: ChatinputWindowNewLayoutChatstylesMenuProps) => {
    return (
        <Region
            name="chatstyles_menu"
            tags={tags}
            dropShadow={{ distance: 4, alpha: 0.6 }}
            layout={{ position: 'absolute', left: 2, width: 160, bottom: 46, height: 60, ...layout }}
        />
    );
};

/** Named region `habbicon_menu` of ChatinputWindowNewLayout - configured through the parent's `habbiconMenu` prop. */
export interface ChatinputWindowNewLayoutHabbiconMenuProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ChatinputWindowNewLayoutHabbiconMenu = ({ layout, tags }: ChatinputWindowNewLayoutHabbiconMenuProps) => {
    return (
        <Region
            name="habbicon_menu"
            tags={tags}
            dropShadow={{ distance: 4, alpha: 0.6 }}
            layout={{ position: 'absolute', left: 2, width: 270, bottom: -154, height: 260, ...layout }}
        />
    );
};

/** Named region `master_container` of ChatinputWindowNewLayout - configured through the parent's `masterContainer` prop. */
export interface ChatinputWindowNewLayoutMasterContainerProps {
    bubblecont?: ChatinputWindowNewLayoutBubblecontProps;
    chatstylesMenu?: ChatinputWindowNewLayoutChatstylesMenuProps;
    habbiconMenu?: ChatinputWindowNewLayoutHabbiconMenuProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const ChatinputWindowNewLayoutMasterContainer = ({ bubblecont, chatstylesMenu, habbiconMenu, layout, tags }: ChatinputWindowNewLayoutMasterContainerProps) => {
    return (
        <Region
            name="master_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 471, top: 0, height: 100, minWidth: 90, ...layout }}
        >
            <ChatinputWindowNewLayoutBubblecont
                tags={[ 'chat_bubble' ]}
                {...bubblecont}
            />
            <ChatinputWindowNewLayoutChatstylesMenu {...chatstylesMenu} />
            <ChatinputWindowNewLayoutHabbiconMenu {...habbiconMenu} />
        </Region>
    );
};
