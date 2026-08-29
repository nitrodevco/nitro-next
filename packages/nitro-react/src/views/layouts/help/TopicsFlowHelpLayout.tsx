import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CheckBox, ContainerButton, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2921_topics_flow_help_xml` (layout "report", 448x522) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TopicsFlowHelpLayoutProps {
    captionButtonText?: string;
    captionContinueButton?: string;
    chatContainer?: TopicsFlowHelpLayoutChatContainerProps;
    helpContainer?: TopicsFlowHelpLayoutHelpContainerProps;
    layout?: BoxLayout;
    messageContainer?: TopicsFlowHelpLayoutMessageContainerProps;
    onBackButton?: () => void;
    onClose?: () => void;
    onContinueButton?: () => void;
    reasonContainer?: TopicsFlowHelpLayoutReasonContainerProps;
    startContainer?: TopicsFlowHelpLayoutStartContainerProps;
    summaryContainer?: TopicsFlowHelpLayoutSummaryContainerProps;
    user?: TopicsFlowHelpLayoutUserProps;
    usersContainer?: TopicsFlowHelpLayoutUsersContainerProps;
    visibleBackButton?: boolean;
}

export const TopicsFlowHelpLayout = ({ captionButtonText, captionContinueButton, chatContainer, helpContainer, layout, messageContainer, onBackButton, onClose, onContinueButton, reasonContainer, startContainer, summaryContainer, user, usersContainer, visibleBackButton }: TopicsFlowHelpLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('help.button.cfh')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 448, height: 522, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <TopicsFlowHelpLayoutStartContainer {...startContainer} />
                <TopicsFlowHelpLayoutHelpContainer {...helpContainer} />
                <ContainerButton
                    variant="5"
                    name="continue_button"
                    tintColor="#00aa00"
                    onPointerTap={onContinueButton}
                    layout={{ position: 'absolute', left: 229, width: 189, top: 435, height: 41 }}
                >
                    <Region
                        name="continue_button"
                        layout={{ position: 'absolute', left: 10, width: 169, top: 9, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionContinueButton ?? t('help.emergency.main.submit.button')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
                <TopicsFlowHelpLayoutUsersContainer {...usersContainer} />
                <TopicsFlowHelpLayoutUser {...user} />
                <TopicsFlowHelpLayoutReasonContainer {...reasonContainer} />
                <TopicsFlowHelpLayoutMessageContainer {...messageContainer} />
                <TopicsFlowHelpLayoutChatContainer {...chatContainer} />
                <Region
                    visible={visibleBackButton ?? false}
                    layout={{ position: 'absolute', left: 30, width: 189, top: 435, height: 41 }}
                >
                    <ContainerButton
                        variant="5"
                        name="back_button"
                        tintColor="#aaaaaa"
                        onPointerTap={onBackButton}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            name="button_text"
                            layout={{ position: 'absolute', left: 10, width: 169, top: 9, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionButtonText ?? t('generic.back')}
                                textStyle="text-style-u-headline-medium"
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </ContainerButton>
                </Region>
                <TopicsFlowHelpLayoutSummaryContainer {...summaryContainer} />
            </Region>
        </Frame>
    );
};

/** Named region `start_container` of TopicsFlowHelpLayout - configured through the parent's `startContainer` prop. */
export interface TopicsFlowHelpLayoutStartContainerProps {
    captionFaqLink?: string;
    captionReportsStatus?: string;
    captionSanctionInfoLink?: string;
    layout?: BoxLayout;
    onButtonAccount?: () => void;
    onButtonHabboHelp?: () => void;
    onButtonUserReport?: () => void;
    onFaqLink?: () => void;
    onReportsStatus?: () => void;
    onSanctionInfoLink?: () => void;
    srcReportsStatusBitmap?: string;
    visibleButtonHabboHelp?: boolean;
    visibleStartContainer?: boolean;
}

export const TopicsFlowHelpLayoutStartContainer = ({ captionFaqLink, captionReportsStatus, captionSanctionInfoLink, layout, onButtonAccount, onButtonHabboHelp, onButtonUserReport, onFaqLink, onReportsStatus, onSanctionInfoLink, srcReportsStatusBitmap, visibleButtonHabboHelp, visibleStartContainer }: TopicsFlowHelpLayoutStartContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="start_container"
            visible={visibleStartContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 480, ...layout }}
        >
            <ThemeImage
                src={layoutImage('help_help_duck.png')}
                layout={{ position: 'absolute', left: 32, width: 124, top: 59, height: 126 }}
            />
            <Region layout={{ position: 'absolute', left: 32, width: 382, top: 22, height: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.main.frame.title')}
                    textStyle="text-style-u-headline-big"
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 170, width: 250, top: 61, height: 117, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.main.frame.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 32, width: 380, top: 230, height: 150, flexDirection: 'column', gap: 5 }}>
                <Region
                    visible={visibleButtonHabboHelp ?? false}
                    layout={{ width: 380, height: 40, flexShrink: 0 }}
                >
                    <ContainerButton
                        variant="6"
                        name="button_habbo_help"
                        tintColor="#00aa00"
                        onPointerTap={onButtonHabboHelp}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 0, width: 365, top: 7, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('help.main.help.title')}
                                textStyle="text-style-u-headline-medium"
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </ContainerButton>
                </Region>
                <ContainerButton
                    variant="6"
                    name="button_user_report"
                    tintColor="#00aa00"
                    onPointerTap={onButtonUserReport}
                    layout={{ width: 380, height: 40, flexShrink: 0 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 365, top: 7, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('help.main.bully.subtitle')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
                <ContainerButton
                    variant="6"
                    name="button_account"
                    tintColor="#00aa00"
                    onPointerTap={onButtonAccount}
                    layout={{ width: 380, height: 40, flexShrink: 0 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 365, top: 7, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('help.main.self.tips.title')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
            <ThemeImage
                src={layoutImage('icons_link_icon.png')}
                layout={{ position: 'absolute', left: 32, width: 18, top: 378, height: 19 }}
            />
            <Region
                name="faq_link"
                layout={{ position: 'absolute', left: 54, width: 354, top: 377, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                onPointerTap={onFaqLink}
                cursor="pointer"
            >
                <ThemeText
                    text={captionFaqLink ?? t('help.main.faq.link.text')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <ThemeImage
                src={layoutImage('icons_link_icon.png')}
                layout={{ position: 'absolute', left: 32, width: 18, top: 406, height: 19 }}
            />
            <Region
                name="sanction_info_link"
                layout={{ position: 'absolute', left: 54, width: 354, top: 404, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                onPointerTap={onSanctionInfoLink}
                cursor="pointer"
            >
                <ThemeText
                    text={captionSanctionInfoLink ?? t('help.main.my.sanction.status')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <ThemeImage
                name="reports_status_bitmap"
                src={srcReportsStatusBitmap ?? layoutImage('icons_link_icon.png')}
                layout={{ position: 'absolute', left: 32, width: 18, top: 434, height: 19 }}
            />
            <Region
                name="reports_status"
                layout={{ position: 'absolute', left: 54, width: 354, top: 432, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                onPointerTap={onReportsStatus}
                cursor="pointer"
            >
                <ThemeText
                    text={captionReportsStatus ?? t('help.main.my.reports.status')}
                    textStyle="text-style-u-bold"
                />
            </Region>
        </Region>
    );
};

/** Named region `help_container` of TopicsFlowHelpLayout - configured through the parent's `helpContainer` prop. */
export interface TopicsFlowHelpLayoutHelpContainerProps {
    layout?: BoxLayout;
    onHabbowayLink?: () => void;
    onInstructionsButton?: () => void;
    onSafetybookletLink?: () => void;
}

export const TopicsFlowHelpLayoutHelpContainer = ({ layout, onHabbowayLink, onInstructionsButton, onSafetybookletLink }: TopicsFlowHelpLayoutHelpContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="help_container"
            layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 480, ...layout }}
        >
            <ThemeImage
                src={layoutImage('help_help_duck.png')}
                layout={{ position: 'absolute', left: 32, width: 124, top: 59, height: 126 }}
            />
            <Region layout={{ position: 'absolute', left: 170, width: 250, top: 61, height: 117, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.main.self.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 32, width: 382, top: 22, height: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.main.frame.title')}
                    textStyle="text-style-u-headline-big"
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 32, width: 380, top: 230, height: 150, flexDirection: 'column', gap: 5 }}>
                <ContainerButton
                    variant="6"
                    name="instructions_button"
                    tintColor="#00aa00"
                    onPointerTap={onInstructionsButton}
                    layout={{ width: 380, height: 40, flexShrink: 0 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 380, top: 7, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('help.main2.tour.subtitle')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 380, align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
                <ContainerButton
                    variant="6"
                    name="safetybooklet_link"
                    tintColor="#00aa00"
                    onPointerTap={onSafetybookletLink}
                    layout={{ width: 380, height: 40, flexShrink: 0 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 380, top: 7, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('help.main.button.self_help')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 380, align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
                <ContainerButton
                    variant="6"
                    name="habboway_link"
                    tintColor="#00aa00"
                    onPointerTap={onHabbowayLink}
                    layout={{ width: 380, height: 40, flexShrink: 0 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 380, top: 7, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('help.main2.habboway.button')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 380, align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
            </Region>
        </Region>
    );
};

/** Row template `user_prototype` of TopicsFlowHelpLayout - pass real rows through its `items…` slot. */
export interface TopicsFlowHelpLayoutUserPrototypeItemProps {
    captionRoomName?: string;
    captionUserName?: string;
    layout?: BoxLayout;
    onUserPrototype?: () => void;
}

export const TopicsFlowHelpLayoutUserPrototypeItem = ({ captionRoomName, captionUserName, layout, onUserPrototype }: TopicsFlowHelpLayoutUserPrototypeItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_prototype"
            onPointerTap={onUserPrototype}
            cursor="pointer"
            layout={{ width: 367, height: 57, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="user_bg"
                layout={{ position: 'absolute', left: 0, width: 367, top: 0, height: 52 }}
            />
            <Region
                name="user_name"
                layout={{ position: 'absolute', left: 61, width: 42, top: 11, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionUserName ?? 'user123'}
                    textStyle="text-style-il-border"
                />
            </Region>
            <Region
                name="room_name"
                layout={{ position: 'absolute', left: 61, width: 218, top: 24, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionRoomName ?? t('help.emergency.main.step.two.room.name')}
                    textOptions={{ fill: '#444444' }}
                />
            </Region>
            <WidgetSlot
                widgetType="avatar_image"
                name="user_avatar"
                options={{ 'avatar_image:only_head': 'true' }}
                layout={{ position: 'absolute', left: -11, width: 90, top: -29, height: 130 }}
            />
        </Region>
    );
};

/** Named region `user_list` of TopicsFlowHelpLayout - configured through the parent's `userList` prop. */
export interface TopicsFlowHelpLayoutUserListProps {
    itemsUserList?: ReactNode;
    layout?: BoxLayout;
}

export const TopicsFlowHelpLayoutUserList = ({ itemsUserList, layout }: TopicsFlowHelpLayoutUserListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 30, width: 400, top: 100, height: 330, ...layout }}
        >
            <Region
                name="user_list"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsUserList ?? (
                    <TopicsFlowHelpLayoutUserPrototypeItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `users_container` of TopicsFlowHelpLayout - configured through the parent's `usersContainer` prop. */
export interface TopicsFlowHelpLayoutUsersContainerProps {
    layout?: BoxLayout;
    userList?: TopicsFlowHelpLayoutUserListProps;
    visibleUsersContainer?: boolean;
}

export const TopicsFlowHelpLayoutUsersContainer = ({ layout, userList, visibleUsersContainer }: TopicsFlowHelpLayoutUsersContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="users_container"
            visible={visibleUsersContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 430, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 30, width: 278, top: 30, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.emergency.main.step.two.title')}
                    textStyle="text-style-u-headline-medium"
                />
            </Region>
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 30, width: 380, top: 60, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('help.emergency.main.step.two.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                />
            </Region>
            <TopicsFlowHelpLayoutUserList {...userList} />
        </Region>
    );
};

/** Named region `user` of TopicsFlowHelpLayout - configured through the parent's `user` prop. */
export interface TopicsFlowHelpLayoutUserProps {
    captionChangeUser?: string;
    captionReportedUserName?: string;
    captionUserInfoTitle?: string;
    layout?: BoxLayout;
    onChangeUser?: () => void;
    visibleUser?: boolean;
}

export const TopicsFlowHelpLayoutUser = ({ captionChangeUser, captionReportedUserName, captionUserInfoTitle, layout, onChangeUser, visibleUser }: TopicsFlowHelpLayoutUserProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user"
            visible={visibleUser ?? false}
            layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 90, ...layout }}
        >
            <Region
                backgroundColor="#8899a2"
                layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 90 }}
            />
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 446, top: 89, height: 1 }}
            />
            <WidgetSlot
                widgetType="avatar_image"
                name="reported_user_avatar"
                options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                layout={{ position: 'absolute', left: 50, width: 33, top: 23, height: 34 }}
            />
            <Region
                name="user_info_title"
                layout={{ position: 'absolute', left: 110, width: 160, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionUserInfoTitle ?? t('help.cfh.selected_user.title')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#efefef' }}
                />
            </Region>
            <Region
                name="reported_user_name"
                layout={{ position: 'absolute', left: 110, width: 93, top: 30, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionReportedUserName ?? 'UserName'}
                    textStyle="text-style-u-headline-big"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="change_user"
                layout={{ position: 'absolute', left: 110, width: 256, top: 60, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                onPointerTap={onChangeUser}
                cursor="pointer"
            >
                <ThemeText
                    text={captionChangeUser ?? t('help.cfh.selected_user.change')}
                    textStyle="text-style-id-link-strong"
                    textOptions={{ fill: '#efefef' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `reason_prototype` of TopicsFlowHelpLayout - pass real rows through its `items…` slot. */
export interface TopicsFlowHelpLayoutReasonPrototypeItemProps {
    captionName?: string;
    layout?: BoxLayout;
    onReasonPrototype?: () => void;
}

export const TopicsFlowHelpLayoutReasonPrototypeItem = ({ captionName, layout, onReasonPrototype }: TopicsFlowHelpLayoutReasonPrototypeItemProps) => {
    return (
        <ContainerButton
            variant="5"
            name="reason_prototype"
            tintColor="#aa0000"
            onPointerTap={onReasonPrototype}
            layout={{ width: 355, height: 40, flexShrink: 0, ...layout }}
        >
            <Region
                name="name"
                layout={{ position: 'absolute', left: 10, width: 335, top: 8, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionName ?? 'Category Name'}
                    textStyle="text-style-u-headline-medium"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 335, align: 'center' }}
                />
            </Region>
        </ContainerButton>
    );
};

/** Named region `reason_list` of TopicsFlowHelpLayout - configured through the parent's `reasonList` prop. */
export interface TopicsFlowHelpLayoutReasonListProps {
    itemsReasonList?: ReactNode;
    layout?: BoxLayout;
}

export const TopicsFlowHelpLayoutReasonList = ({ itemsReasonList, layout }: TopicsFlowHelpLayoutReasonListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 30, width: 385, top: 70, height: 270, ...layout }}
        >
            <Region
                name="reason_list"
                layout={{ flexDirection: 'column', gap: 5, width: '100%' }}
            >
                {itemsReasonList ?? (
                    <TopicsFlowHelpLayoutReasonPrototypeItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `reason_container` of TopicsFlowHelpLayout - configured through the parent's `reasonContainer` prop. */
export interface TopicsFlowHelpLayoutReasonContainerProps {
    layout?: BoxLayout;
    reasonList?: TopicsFlowHelpLayoutReasonListProps;
    visibleReasonContainer?: boolean;
}

export const TopicsFlowHelpLayoutReasonContainer = ({ layout, reasonList, visibleReasonContainer }: TopicsFlowHelpLayoutReasonContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="reason_container"
            visible={visibleReasonContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 445, top: 90, height: 340, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 30, width: 405, top: 12, height: 59, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.cfh.pick.topic')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 405 }}
                />
            </Region>
            <TopicsFlowHelpLayoutReasonList {...reasonList} />
        </Region>
    );
};

/** Named region `unlawful_message_content` of TopicsFlowHelpLayout - configured through the parent's `unlawfulMessageContent` prop. */
export interface TopicsFlowHelpLayoutUnlawfulMessageContentProps {
    captionUnlawfulMessageConfirmLabel?: string;
    layout?: BoxLayout;
    onUnlawfulMessageConfirm?: () => void;
}

export const TopicsFlowHelpLayoutUnlawfulMessageContent = ({ captionUnlawfulMessageConfirmLabel, layout, onUnlawfulMessageConfirm }: TopicsFlowHelpLayoutUnlawfulMessageContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="unlawful_message_content"
            layout={{ position: 'absolute', left: 30, width: 390, top: 230, height: 100, ...layout }}
        >
            <WidgetSlot
                widgetType="illumina_input"
                name="help_message_name"
                options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${connection.login.name}' }}
                layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 29 }}
            />
            <WidgetSlot
                widgetType="illumina_input"
                name="help_message_email"
                options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${connection.login.email}' }}
                layout={{ position: 'absolute', left: 200, width: 188, top: 0, height: 29 }}
            />
            <CheckBox
                variant="3"
                name="unlawful_message_confirm"
                onPointerTap={onUnlawfulMessageConfirm}
                layout={{ position: 'absolute', left: 0, width: 30, top: 40, height: 30 }}
            />
            <Region
                name="unlawful_message_confirm_label"
                layout={{ position: 'absolute', left: 20, width: 370, top: 40, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionUnlawfulMessageConfirmLabel ?? t('help.cfh.unlawful_activity.confirm_label')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 370 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `message_container` of TopicsFlowHelpLayout - configured through the parent's `messageContainer` prop. */
export interface TopicsFlowHelpLayoutMessageContainerProps {
    captionMessageContainerDescription?: string;
    captionMessagePhaseTitle?: string;
    layout?: BoxLayout;
    unlawfulMessageContent?: TopicsFlowHelpLayoutUnlawfulMessageContentProps;
    visibleMessageContainer?: boolean;
}

export const TopicsFlowHelpLayoutMessageContainer = ({ captionMessageContainerDescription, captionMessagePhaseTitle, layout, unlawfulMessageContent, visibleMessageContainer }: TopicsFlowHelpLayoutMessageContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="message_container"
            visible={visibleMessageContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 445, top: 100, height: 330, ...layout }}
        >
            <Region
                name="message_phase_title"
                layout={{ position: 'absolute', left: 30, width: 278, top: 20, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMessagePhaseTitle ?? t('help.emergency.main.step.one.title')}
                    textStyle="text-style-u-headline-medium"
                />
            </Region>
            <Region
                name="message_container_description"
                layout={{ position: 'absolute', left: 30, width: 380, top: 50, height: 57, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMessageContainerDescription ?? t('help.emergency.main.step.one.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                />
            </Region>
            <WidgetSlot
                widgetType="illumina_input"
                name="help_message"
                options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${help.emergency.main.step.one.entry.instruction}', 'illumina_input:multiline': 'true' }}
                layout={{ position: 'absolute', left: 30, width: 390, top: 100, height: 120 }}
            />
            <TopicsFlowHelpLayoutUnlawfulMessageContent {...unlawfulMessageContent} />
        </Region>
    );
};

/** Row template `chat_prototype` of TopicsFlowHelpLayout - pass real rows through its `items…` slot. */
export interface TopicsFlowHelpLayoutChatPrototypeItemProps {
    captionChatText?: string;
    layout?: BoxLayout;
    onChatCheck?: () => void;
    onChatText?: () => void;
}

export const TopicsFlowHelpLayoutChatPrototypeItem = ({ captionChatText, layout, onChatCheck, onChatText }: TopicsFlowHelpLayoutChatPrototypeItemProps) => {
    return (
        <Region
            name="chat_prototype"
            layout={{ width: 360, height: 20, flexShrink: 0, ...layout }}
        >
            <CheckBox
                variant="3"
                name="chat_check"
                onPointerTap={onChatCheck}
                layout={{ position: 'absolute', left: 2, width: 16, top: 2, height: 16 }}
            >
                This is a chatline
            </CheckBox>
            <Region
                name="chat_text"
                layout={{ position: 'absolute', left: 20, width: 336, top: 2, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                onPointerTap={onChatText}
                cursor="pointer"
            >
                <ThemeText
                    text={captionChatText ?? 'This is a chat line'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 336 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `chat_list` of TopicsFlowHelpLayout - configured through the parent's `chatList` prop. */
export interface TopicsFlowHelpLayoutChatListProps {
    itemsChatList?: ReactNode;
    layout?: BoxLayout;
}

export const TopicsFlowHelpLayoutChatList = ({ itemsChatList, layout }: TopicsFlowHelpLayoutChatListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 5, width: 380, top: 5, height: 209, ...layout }}
        >
            <Region
                name="chat_list"
                layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
            >
                {itemsChatList ?? (
                    <TopicsFlowHelpLayoutChatPrototypeItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `chat_container` of TopicsFlowHelpLayout - configured through the parent's `chatContainer` prop. */
export interface TopicsFlowHelpLayoutChatContainerProps {
    chatList?: TopicsFlowHelpLayoutChatListProps;
    layout?: BoxLayout;
    visibleChatContainer?: boolean;
}

export const TopicsFlowHelpLayoutChatContainer = ({ chatList, layout, visibleChatContainer }: TopicsFlowHelpLayoutChatContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chat_container"
            visible={visibleChatContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 444, top: 100, height: 330, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 30, width: 287, top: 20, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.emergency.chat_report.subtitle')}
                    textStyle="text-style-u-headline-medium"
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 30, width: 380, top: 40, height: 57, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.emergency.chat_report.description')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                />
            </Region>
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 30, width: 390, top: 100, height: 220 }}
            >
                <TopicsFlowHelpLayoutChatList {...chatList} />
            </Border>
        </Region>
    );
};

/** Named region `summary_container` of TopicsFlowHelpLayout - configured through the parent's `summaryContainer` prop. */
export interface TopicsFlowHelpLayoutSummaryContainerProps {
    layout?: BoxLayout;
    onSubmitButton?: () => void;
    visibleSummaryContainer?: boolean;
}

export const TopicsFlowHelpLayoutSummaryContainer = ({ layout, onSubmitButton, visibleSummaryContainer }: TopicsFlowHelpLayoutSummaryContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="summary_container"
            visible={visibleSummaryContainer ?? false}
            layout={{ position: 'absolute', left: 0, width: 444, top: 100, height: 380, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 30, width: 164, top: 20, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.cfh.button.send')}
                    textStyle="text-style-u-headline-medium"
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 30, width: 390, top: 50, height: 107, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.main.summary')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 390 }}
                />
            </Region>
            <ContainerButton
                variant="5"
                name="submit_button"
                tintColor="#aa0000"
                onPointerTap={onSubmitButton}
                layout={{ position: 'absolute', left: 229, width: 189, top: 335, height: 41 }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 169, top: 9, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text={t('help.emergency.chat_report.submit.button')}
                        textStyle="text-style-u-headline-medium"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </Region>
            </ContainerButton>
        </Region>
    );
};
