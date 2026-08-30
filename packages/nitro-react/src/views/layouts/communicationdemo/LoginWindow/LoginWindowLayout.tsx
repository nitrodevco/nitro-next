import { ReactNode, useState } from 'react';

import { Border, BoxLayout, Button, CheckBox, Droplist, Frame, Region, ScrollArea, TextInput, ThemeText } from '#base/theme';

import { LoginWindowLayoutUserlistItemItem } from './LoginWindowLayoutUserlistItemItem';

/** Generated from `2878_login_window_xml` (layout "habbo_login_dialog", 305x444) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LoginWindowLayoutProps {
    captionLabelName?: string;
    captionLabelPassword?: string;
    captionText002?: string;
    captionUsersInfo?: string;
    itemsList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onLoginBtn?: () => void;
    onUseExistingSession?: () => void;
    onUseTicket?: () => void;
}

export const LoginWindowLayout = ({ captionLabelName, captionLabelPassword, captionText002, captionUsersInfo, itemsList, layout, onClose, onLoginBtn, onUseExistingSession, onUseTicket }: LoginWindowLayoutProps) => {
    const [ nameFieldValue, setNameFieldValue ] = useState('');
    const [ pwdFieldValue, setPwdFieldValue ] = useState('');

    return (
        <Frame
            variant="101"
            id="habbo_login_dialog"
            name="habbo_login_dialog"
            caption="Habbo Login"
            onClose={onClose}
            layout={{ width: 305, height: 444, minWidth: 305, minHeight: 444, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 5, right: -5, top: 0, height: 364, flexDirection: 'column', gap: 3 }}>
                <Region
                    name="options_container"
                    layout={{ width: 198, height: 46, flexShrink: 0 }}
                >
                    <ThemeText
                        text={captionText002 ?? ''}
                        name="text002"
                        layout={{ position: 'absolute', left: 0, width: 133, top: 0, height: 28 }}
                    />
                    <CheckBox
                        variant="101"
                        name="useTicket"
                        onPointerTap={onUseTicket}
                        layout={{ position: 'absolute', left: 0, width: 194, top: 0, height: 21, minHeight: 21, maxHeight: 21 }}
                    >
                        Use Web Api
                    </CheckBox>
                    <CheckBox
                        variant="101"
                        name="useExistingSession"
                        onPointerTap={onUseExistingSession}
                        layout={{ position: 'absolute', left: 0, width: 198, bottom: 3, height: 21, minHeight: 21, maxHeight: 21 }}
                    >
                        Use existing Session
                    </CheckBox>
                </Region>
                <Region
                    name="environment_container"
                    layout={{ alignSelf: 'stretch', height: 28, flexShrink: 0 }}
                >
                    <ThemeText
                        text="Environment:"
                        layout={{ position: 'absolute', left: 0, width: 72, top: 6, bottom: 6 }}
                    />
                    <Droplist
                        variant="100"
                        name="environment_list"
                        layout={{ position: 'absolute', right: 7, width: 200, top: 0, bottom: 3, minWidth: 200 }}
                    />
                </Region>
                <Region
                    name="name_container"
                    layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0 }}
                >
                    <ThemeText
                        text={captionLabelName ?? 'Name:'}
                        textStyle="text-style-il-heading-1"
                        name="label_name"
                        layout={{ position: 'absolute', left: 0, width: 46, top: 4, bottom: 7 }}
                    />
                    <Border
                        variant="105"
                        name="name_border"
                        layout={{ position: 'absolute', right: 8, width: 200, top: 0, bottom: 1 }}
                    >
                        <TextInput
                            value={nameFieldValue}
                            onChange={setNameFieldValue}
                            layout={{ position: 'absolute', left: 5, right: 4, top: 4, bottom: 5 }}
                        />
                    </Border>
                    <Region layout={{ position: 'absolute', left: 0, width: 30, top: 0, bottom: 0 }} />
                </Region>
                <Region
                    name="password_container"
                    layout={{ alignSelf: 'stretch', height: 30, flexShrink: 0 }}
                >
                    <ThemeText
                        text={captionLabelPassword ?? 'Password:'}
                        textStyle="text-style-il-heading-1"
                        name="label_password"
                        layout={{ position: 'absolute', left: 0, width: 73, top: 4, bottom: 7 }}
                    />
                    <Border
                        variant="105"
                        name="password_border"
                        layout={{ position: 'absolute', left: 90, width: 200, top: 0, bottom: 1 }}
                    >
                        <TextInput
                            value={pwdFieldValue}
                            onChange={setPwdFieldValue}
                            layout={{ position: 'absolute', left: 5, right: 3, top: 4, bottom: 5 }}
                        />
                    </Border>
                </Region>
                <Button
                    variant="101"
                    name="login_btn"
                    tintColor="#bbbbbb"
                    onPointerTap={onLoginBtn}
                    layout={{ width: 200, height: 52, flexShrink: 0, minWidth: 200, minHeight: 52 }}
                >
                    Login
                </Button>
                <Border
                    variant="0"
                    name="users_container"
                    layout={{ width: 200, height: 157, flexShrink: 0, minWidth: 200 }}
                >
                    <ThemeText
                        text={captionUsersInfo ?? 'A list of your avatars will appear after successful login.'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                        name="users_info"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2 }}
                    >
                        <Region
                            name="list"
                            layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
                        >
                            {itemsList ?? (
                                <LoginWindowLayoutUserlistItemItem />
                            )}
                        </Region>
                    </ScrollArea>
                </Border>
            </Region>
        </Frame>
    );
};
