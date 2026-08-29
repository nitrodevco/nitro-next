import { ReactNode, useState } from 'react';

import { Border, BoxLayout, Button, CheckBox, Droplist, Frame, Region, ScrollArea, TextInput, ThemeText } from '#base/theme';

/** Generated from `2878_login_window_xml` (layout "habbo_login_dialog", 305x444) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LoginWindowLayoutProps {
    captionUsersInfo?: string;
    environmentContainer?: LoginWindowLayoutEnvironmentContainerProps;
    layout?: BoxLayout;
    list?: LoginWindowLayoutListProps;
    nameContainer?: LoginWindowLayoutNameContainerProps;
    onClose?: () => void;
    onLoginBtn?: () => void;
    optionsContainer?: LoginWindowLayoutOptionsContainerProps;
    passwordContainer?: LoginWindowLayoutPasswordContainerProps;
}

export const LoginWindowLayout = ({ captionUsersInfo, environmentContainer, layout, list, nameContainer, onClose, onLoginBtn, optionsContainer, passwordContainer }: LoginWindowLayoutProps) => {
    return (
        <Frame
            variant="101"
            id="habbo_login_dialog"
            name="habbo_login_dialog"
            caption="Habbo Login"
            onClose={onClose}
            layout={{ width: 305, height: 444, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 5, width: 293, top: 0, height: 364, flexDirection: 'column', gap: 3 }}>
                <LoginWindowLayoutOptionsContainer {...optionsContainer} />
                <LoginWindowLayoutEnvironmentContainer {...environmentContainer} />
                <LoginWindowLayoutNameContainer {...nameContainer} />
                <LoginWindowLayoutPasswordContainer {...passwordContainer} />
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
                    <Region
                        name="users_info"
                        layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 157, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionUsersInfo ?? 'A list of your avatars will appear after successful login.'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                        />
                    </Region>
                    <LoginWindowLayoutList {...list} />
                </Border>
            </Region>
        </Frame>
    );
};

/** Named region `options_container` of LoginWindowLayout - configured through the parent's `optionsContainer` prop. */
export interface LoginWindowLayoutOptionsContainerProps {
    captionText002?: string;
    layout?: BoxLayout;
    onUseExistingSession?: () => void;
    onUseTicket?: () => void;
}

export const LoginWindowLayoutOptionsContainer = ({ captionText002, layout, onUseExistingSession, onUseTicket }: LoginWindowLayoutOptionsContainerProps) => {
    return (
        <Region
            name="options_container"
            layout={{ width: 198, height: 46, flexShrink: 0, ...layout }}
        >
            <Region
                name="text002"
                layout={{ position: 'absolute', left: 0, width: 133, top: 0, height: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionText002 ?? ''} />
            </Region>
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
                layout={{ position: 'absolute', left: 0, width: 198, top: 22, height: 21, minHeight: 21, maxHeight: 21 }}
            >
                Use existing Session
            </CheckBox>
        </Region>
    );
};

/** Named region `environment_container` of LoginWindowLayout - configured through the parent's `environmentContainer` prop. */
export interface LoginWindowLayoutEnvironmentContainerProps {
    layout?: BoxLayout;
}

export const LoginWindowLayoutEnvironmentContainer = ({ layout }: LoginWindowLayoutEnvironmentContainerProps) => {
    return (
        <Region
            name="environment_container"
            layout={{ width: 296, height: 28, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 72, top: 6, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText text="Environment:" />
            </Region>
            <Droplist
                variant="100"
                name="environment_list"
                layout={{ position: 'absolute', left: 89, width: 200, top: 0, height: 25, minWidth: 200 }}
            />
        </Region>
    );
};

/** Named region `name_container` of LoginWindowLayout - configured through the parent's `nameContainer` prop. */
export interface LoginWindowLayoutNameContainerProps {
    captionLabelName?: string;
    layout?: BoxLayout;
}

export const LoginWindowLayoutNameContainer = ({ captionLabelName, layout }: LoginWindowLayoutNameContainerProps) => {
    const [ nameFieldValue, setNameFieldValue ] = useState('');

    return (
        <Region
            name="name_container"
            layout={{ width: 298, height: 30, flexShrink: 0, ...layout }}
        >
            <Region
                name="label_name"
                layout={{ position: 'absolute', left: 0, width: 46, top: 4, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionLabelName ?? 'Name:'}
                    textStyle="text-style-il-heading-1"
                />
            </Region>
            <Border
                variant="105"
                name="name_border"
                layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 29 }}
            >
                <TextInput
                    value={nameFieldValue}
                    onChange={setNameFieldValue}
                    layout={{ position: 'absolute', left: 5, width: 191, top: 4, height: 20 }}
                />
            </Border>
            <Region layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }} />
        </Region>
    );
};

/** Named region `password_container` of LoginWindowLayout - configured through the parent's `passwordContainer` prop. */
export interface LoginWindowLayoutPasswordContainerProps {
    captionLabelPassword?: string;
    layout?: BoxLayout;
}

export const LoginWindowLayoutPasswordContainer = ({ captionLabelPassword, layout }: LoginWindowLayoutPasswordContainerProps) => {
    const [ pwdFieldValue, setPwdFieldValue ] = useState('');

    return (
        <Region
            name="password_container"
            layout={{ width: 306, height: 30, flexShrink: 0, ...layout }}
        >
            <Region
                name="label_password"
                layout={{ position: 'absolute', left: 0, width: 73, top: 4, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionLabelPassword ?? 'Password:'}
                    textStyle="text-style-il-heading-1"
                />
            </Region>
            <Border
                variant="105"
                name="password_border"
                layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 29 }}
            >
                <TextInput
                    value={pwdFieldValue}
                    onChange={setPwdFieldValue}
                    layout={{ position: 'absolute', left: 5, width: 192, top: 4, height: 20 }}
                />
            </Border>
        </Region>
    );
};

/** Row template `userlist_item` of LoginWindowLayout - pass real rows through its `items…` slot. */
export interface LoginWindowLayoutUserlistItemItemProps {
    layout?: BoxLayout;
    onUserlistItem?: () => void;
}

export const LoginWindowLayoutUserlistItemItem = ({ layout, onUserlistItem }: LoginWindowLayoutUserlistItemItemProps) => {
    return (
        <Button
            variant="102"
            name="userlist_item"
            onPointerTap={onUserlistItem}
            layout={{ width: 196, height: 28, flexShrink: 0, minWidth: 196, maxWidth: 196, ...layout }}
        >
            username
        </Button>
    );
};

/** Named region `list` of LoginWindowLayout - configured through the parent's `list` prop. */
export interface LoginWindowLayoutListProps {
    itemsList?: ReactNode;
    layout?: BoxLayout;
}

export const LoginWindowLayoutList = ({ itemsList, layout }: LoginWindowLayoutListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 2, width: 196, top: 2, height: 153, ...layout }}
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
    );
};
