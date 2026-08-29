import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, Icon, Region, TextInput, ThemeImage } from '#base/theme';

/** Generated from `3100_main_window_xml` (layout "messenger_main_window", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MainWindow_3100LayoutProps {
    content?: MainWindow_3100LayoutContentProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const MainWindow_3100Layout = ({ content, layout, onClose }: MainWindow_3100LayoutProps) => {
    const t = useTranslation();
    const [ messageInputValue, setMessageInputValue ] = useState('');

    return (
        <Frame
            variant="2"
            id="messenger_window"
            name="messenger_window"
            caption={t('messenger.title')}
            onClose={onClose}
            layout={{ width: 212, height: 405, ...layout }}
        >
            <MainWindow_3100LayoutContent {...content} />
            <TextInput
                value={messageInputValue}
                onChange={setMessageInputValue}
                textColor="#000000"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 10, right: 12, bottom: 36, height: 54 }}
            />
        </Frame>
    );
};

/** Named region `hdr` of MainWindow_3100Layout - configured through the parent's `hdr` prop. */
export interface MainWindow_3100LayoutHdrProps {
    layout?: BoxLayout;
    onButtonExtendedProfile?: () => void;
    onButtonFollowFriend?: () => void;
    onButtonMinimail?: () => void;
    srcClose?: string;
    srcIcon?: string;
    srcIcon2?: string;
}

export const MainWindow_3100LayoutHdr = ({ layout, onButtonExtendedProfile, onButtonFollowFriend, onButtonMinimail, srcClose, srcIcon, srcIcon2 }: MainWindow_3100LayoutHdrProps) => {
    const t = useTranslation();

    return (
        <Region
            name="hdr"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 32, ...layout }}
        >
            <ContainerButton
                variant="0"
                name="button_minimail"
                tooltip={t('messenger.minimail.tooltip')}
                onPointerTap={onButtonMinimail}
                layout={{ position: 'absolute', left: 36, width: 32, top: 5, height: 22 }}
            >
                <ThemeImage
                    name="icon"
                    src={srcIcon}
                    layout={{ position: 'absolute', left: 8, width: 19, top: 4, height: 14 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="0"
                name="button_follow_friend"
                tooltip={t('messenger.followfriend.tooltip')}
                onPointerTap={onButtonFollowFriend}
                layout={{ position: 'absolute', left: 0, width: 32, top: 5, height: 22 }}
            >
                <ThemeImage
                    name="icon"
                    src={srcIcon2}
                    layout={{ position: 'absolute', left: 7, width: 16, top: 4, height: 14 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="0"
                name="button_extended_profile"
                tooltip={t('infostand.profile.link.tooltip')}
                onPointerTap={onButtonExtendedProfile}
                layout={{ position: 'absolute', left: 72, width: 32, top: 5, height: 22 }}
            >
                <Icon
                    variant="21"
                    name="icon_eye_off"
                    layout={{ position: 'absolute', left: 9, width: 15, top: 6, height: 11 }}
                />
            </ContainerButton>
            <ThemeImage
                name="close"
                src={srcClose}
                layout={{ position: 'absolute', right: 1, width: 13, top: 6, height: 13 }}
            />
        </Region>
    );
};

/** Named region `conversation` of MainWindow_3100Layout - configured through the parent's `conversation` prop. */
export interface MainWindow_3100LayoutConversationProps {
    hdr?: MainWindow_3100LayoutHdrProps;
    layout?: BoxLayout;
}

export const MainWindow_3100LayoutConversation = ({ hdr, layout }: MainWindow_3100LayoutConversationProps) => {
    return (
        <Region
            name="conversation"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 5, right: 5, top: 31, bottom: 5, ...layout }}
        >
            <MainWindow_3100LayoutHdr {...hdr} />
            <Region
                name="list"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 32, bottom: 1 }}
            >
                <Region
                    name="msg_list"
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, right: 22, top: 0, bottom: 0, flexDirection: 'column' }}
                />
                {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
            </Region>
        </Region>
    );
};

/** Named region `content` of MainWindow_3100Layout - configured through the parent's `content` prop. */
export interface MainWindow_3100LayoutContentProps {
    conversation?: MainWindow_3100LayoutConversationProps;
    layout?: BoxLayout;
    onContent?: () => void;
    onConversationstab?: () => void;
    srcConvoBg?: string;
}

export const MainWindow_3100LayoutContent = ({ conversation, layout, onContent, onConversationstab, srcConvoBg }: MainWindow_3100LayoutContentProps) => {
    return (
        <Region
            name="content"
            backgroundColor="#ffffff"
            onPointerTap={onContent}
            cursor="pointer"
            layout={{ position: 'absolute', left: 1, right: 1, top: 0, bottom: 100, ...layout }}
        >
            <ThemeImage
                name="convo_bg"
                src={srcConvoBg}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 31 }}
            />
            <Region
                name="conversationstab"
                onPointerTap={onConversationstab}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 600 }}
            />
            <MainWindow_3100LayoutConversation {...conversation} />
            <Region
                name="bg"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1 }}
            />
        </Region>
    );
};
