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
}

export const MainWindow_3100Layout = ({ layout, onButtonExtendedProfile, onButtonFollowFriend, onButtonMinimail, onClose }: MainWindow_3100LayoutProps) => {
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
                    layout={{ position: 'absolute', left: 1, width: 210, top: 0, height: 305 }}
                >
                    <ThemeImage
                        name="convo_bg"
                        params={144}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 210, top: 0, height: 31 }}
                    />
                    <Region
                        name="conversationstab"
                        params={145}
                        layout={{ position: 'absolute', left: 0, width: 210, top: 0, height: 600 }}
                    />
                    <Region
                        name="conversation"
                        params={2192}
                        backgroundColor="#ffffff"
                        layout={{ position: 'absolute', left: 5, width: 200, top: 31, height: 269 }}
                    >
                        <Region
                            name="hdr"
                            params={144}
                            backgroundColor="#ffffff"
                            layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 32 }}
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
                                    src={undefined}
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
                                    src={undefined}
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
                                src={undefined}
                                layout={{ position: 'absolute', left: 186, width: 13, top: 6, height: 13 }}
                            />
                        </Region>
                        <Region
                            name="list"
                            params={2192}
                            backgroundColor="#ffffff"
                            layout={{ position: 'absolute', left: 0, width: 200, top: 32, height: 236 }}
                        >
                            <Region
                                name="msg_list"
                                params={2193}
                                backgroundColor="#ffffff"
                                layout={{ position: 'absolute', left: 0, width: 178, top: 0, height: 236, flexDirection: 'column' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="bg"
                        params={1168}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 210, top: 304, height: 1 }}
                    />
                </Region>
                <TextInput
                    value={messageInputValue}
                    onChange={setMessageInputValue}
                    textColor="#000000"
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 10, width: 190, top: 315, height: 54 }}
                />
            </Region>
        </Frame>
    );
};
