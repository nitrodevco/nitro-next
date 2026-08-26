import { useState } from 'react';

import { Border, BoxLayout, Button, CheckBox, Droplist, Frame, Region, ScrollArea, TextInput, ThemeText } from '#base/theme';

/** Generated from `2878_login_window_xml` (layout "habbo_login_dialog", 305x444) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LoginWindowLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onLoginBtn?: () => void;
    onUseExistingSession?: () => void;
    onUserlistItem?: () => void;
    onUseTicket?: () => void;
}

export const LoginWindowLayout = ({ layout, onClose, onLoginBtn, onUseExistingSession, onUserlistItem, onUseTicket }: LoginWindowLayoutProps) => {
    const [ nameFieldValue, setNameFieldValue ] = useState('');
    const [ pwdFieldValue, setPwdFieldValue ] = useState('');

    return (
        <Frame
            variant="101"
            id="habbo_login_dialog"
            name="habbo_login_dialog"
            params={1}
            caption="Habbo Login"
            onClose={onClose}
            layout={{ width: 305, height: 444, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 293, top: 0, height: 364, flexDirection: 'column', gap: 3 }}
                >
                    <Region
                        name="options_container"
                        params={16}
                        layout={{ width: 198, height: 46, flexShrink: 0 }}
                    >
                        <Region
                            name="text002"
                            params={49}
                            layout={{ position: 'absolute', left: 0, width: 133, top: 0, height: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        />
                        <CheckBox
                            variant="101"
                            name="useTicket"
                            params={49}
                            onPointerTap={onUseTicket}
                            layout={{ position: 'absolute', left: 0, width: 194, top: 0, height: 21, minHeight: 21, maxHeight: 21 }}
                        >
                            Use Web Api
                        </CheckBox>
                        <CheckBox
                            variant="101"
                            name="useExistingSession"
                            params={49}
                            onPointerTap={onUseExistingSession}
                            layout={{ position: 'absolute', left: 0, width: 198, top: 22, height: 21, minHeight: 21, maxHeight: 21 }}
                        >
                            Use existing Session
                        </CheckBox>
                    </Region>
                    <Region
                        name="environment_container"
                        params={16}
                        layout={{ width: 296, height: 28, flexShrink: 0 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 72, top: 6, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text="Environment:" />
                        </Region>
                        <Droplist
                            variant="100"
                            name="environment_list"
                            params={17}
                            layout={{ position: 'absolute', left: 89, width: 200, top: 0, height: 25, minWidth: 200 }}
                        />
                    </Region>
                    <Region
                        name="name_container"
                        params={16}
                        layout={{ width: 298, height: 30, flexShrink: 0 }}
                    >
                        <Region
                            name="label_name"
                            params={33}
                            layout={{ position: 'absolute', left: 0, width: 46, top: 4, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Name:"
                                textStyle="text-style-il-heading-1"
                            />
                        </Region>
                        <Border
                            variant="105"
                            name="name_border"
                            params={16}
                            layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 29 }}
                        >
                            <TextInput
                                value={nameFieldValue}
                                onChange={setNameFieldValue}
                                layout={{ position: 'absolute', left: 5, width: 191, top: 4, height: 20 }}
                            />
                        </Border>
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                        />
                    </Region>
                    <Region
                        name="password_container"
                        params={16}
                        layout={{ width: 306, height: 30, flexShrink: 0 }}
                    >
                        <Region
                            name="label_password"
                            params={33}
                            layout={{ position: 'absolute', left: 0, width: 73, top: 4, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="Password:"
                                textStyle="text-style-il-heading-1"
                            />
                        </Region>
                        <Border
                            variant="105"
                            name="password_border"
                            params={16}
                            layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 29 }}
                        >
                            <TextInput
                                value={pwdFieldValue}
                                onChange={setPwdFieldValue}
                                layout={{ position: 'absolute', left: 5, width: 192, top: 4, height: 20 }}
                            />
                        </Border>
                    </Region>
                    <Button
                        variant="101"
                        name="login_btn"
                        params={131121}
                        tintColor="#bbbbbb"
                        onPointerTap={onLoginBtn}
                        layout={{ width: 200, height: 52, flexShrink: 0, minWidth: 200, minHeight: 52 }}
                    >
                        Login
                    </Button>
                    <Border
                        variant="0"
                        name="users_container"
                        params={16}
                        layout={{ width: 200, height: 157, flexShrink: 0, minWidth: 200 }}
                    >
                        <Region
                            name="users_info"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 157, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="A list of your avatars will appear after successful login."
                                textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                            />
                        </Region>
                        <ScrollArea
                            orientation="vertical"
                            layout={{ position: 'absolute', left: 2, width: 196, top: 2, height: 153 }}
                        >
                            <Region
                                name="list"
                                params={16}
                                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
                            >
                                <Button
                                    variant="102"
                                    name="userlist_item"
                                    params={131089}
                                    onPointerTap={onUserlistItem}
                                    layout={{ width: 196, height: 28, flexShrink: 0, minWidth: 196, maxWidth: 196 }}
                                >
                                    username
                                </Button>
                            </Region>
                        </ScrollArea>
                    </Border>
                </Region>
            </Region>
        </Frame>
    );
};
