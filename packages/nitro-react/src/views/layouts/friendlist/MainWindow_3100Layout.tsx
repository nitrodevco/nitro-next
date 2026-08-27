import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, Icon, Region, TextInput, ThemeImage } from '#base/theme';

/** Generated from `3100_main_window_xml` (layout "messenger_main_window", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MainWindow_3100LayoutProps {
    layout?: BoxLayout;
    onButtonExtendedProfile?: () => void;
    onButtonFollowFriend?: () => void;
    onButtonMinimail?: () => void;
    onClose?: () => void;
    onContent?: () => void;
    onConversationstab?: () => void;
    srcClose?: string;
    srcConvoBg?: string;
    srcIcon?: string;
    srcIcon2?: string;
}

export const MainWindow_3100Layout = ({ layout, onButtonExtendedProfile, onButtonFollowFriend, onButtonMinimail, onClose, onContent, onConversationstab, srcClose, srcConvoBg, srcIcon, srcIcon2 }: MainWindow_3100LayoutProps) => {
    const t = useTranslation();
    const [ messageInputValue, setMessageInputValue ] = useState('');

    return (
        <Frame
            variant="2"
            id="messenger_window"
            name="messenger_window"
            params={98305}
            caption={t('messenger.title')}
            onClose={onClose}
            layout={{ width: 212, height: 405, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="content"
                    params={2193}
                    backgroundColor="#ffffff"
                    onPointerTap={onContent}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 1, right: 1, top: 0, bottom: 100 }}
                >
                    <ThemeImage
                        name="convo_bg"
                        params={144}
                        src={srcConvoBg}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 31 }}
                    />
                    <Region
                        name="conversationstab"
                        params={145}
                        onPointerTap={onConversationstab}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 600 }}
                    />
                    <Region
                        name="conversation"
                        params={2192}
                        backgroundColor="#ffffff"
                        layout={{ position: 'absolute', left: 5, right: 5, top: 31, bottom: 5 }}
                    >
                        <Region
                            name="hdr"
                            params={144}
                            backgroundColor="#ffffff"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 32 }}
                        >
                            <ContainerButton
                                variant="0"
                                name="button_minimail"
                                tooltip={t('messenger.minimail.tooltip')}
                                params={17}
                                onPointerTap={onButtonMinimail}
                                layout={{ position: 'absolute', left: 36, width: 32, top: 5, height: 22 }}
                            >
                                <ThemeImage
                                    name="icon"
                                    params={16}
                                    src={srcIcon}
                                    layout={{ position: 'absolute', left: 8, width: 19, top: 4, height: 14 }}
                                />
                            </ContainerButton>
                            <ContainerButton
                                variant="0"
                                name="button_follow_friend"
                                tooltip={t('messenger.followfriend.tooltip')}
                                params={17}
                                onPointerTap={onButtonFollowFriend}
                                layout={{ position: 'absolute', left: 0, width: 32, top: 5, height: 22 }}
                            >
                                <ThemeImage
                                    name="icon"
                                    params={16}
                                    src={srcIcon2}
                                    layout={{ position: 'absolute', left: 7, width: 16, top: 4, height: 14 }}
                                />
                            </ContainerButton>
                            <ContainerButton
                                variant="0"
                                name="button_extended_profile"
                                tooltip={t('infostand.profile.link.tooltip')}
                                params={17}
                                onPointerTap={onButtonExtendedProfile}
                                layout={{ position: 'absolute', left: 72, width: 32, top: 5, height: 22 }}
                            >
                                <Icon
                                    variant="21"
                                    name="icon_eye_off"
                                    params={16}
                                    layout={{ position: 'absolute', left: 9, width: 15, top: 6, height: 11 }}
                                />
                            </ContainerButton>
                            <ThemeImage
                                name="close"
                                params={81}
                                src={srcClose}
                                layout={{ position: 'absolute', right: 1, width: 13, top: 6, height: 13 }}
                            />
                        </Region>
                        <Region
                            name="list"
                            params={2192}
                            backgroundColor="#ffffff"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 32, bottom: 1 }}
                        >
                            <Region
                                name="msg_list"
                                params={2193}
                                backgroundColor="#ffffff"
                                layout={{ position: 'absolute', left: 0, right: 22, top: 0, bottom: 0, flexDirection: 'column' }}
                            />
                            {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
                        </Region>
                    </Region>
                    <Region
                        name="bg"
                        params={1168}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1 }}
                    />
                </Region>
                <TextInput
                    value={messageInputValue}
                    onChange={setMessageInputValue}
                    textColor="#000000"
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 10, right: 12, bottom: 36, height: 54 }}
                />
            </Region>
        </Frame>
    );
};
