import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, Region, ScrollArea, ThemeText, WidgetSlot } from '#base/theme';

import { TopicsFlowHelpLayoutChatContainer, TopicsFlowHelpLayoutChatContainerProps } from './TopicsFlowHelpLayoutChatContainer';
import { TopicsFlowHelpLayoutHelpContainer, TopicsFlowHelpLayoutHelpContainerProps } from './TopicsFlowHelpLayoutHelpContainer';
import { TopicsFlowHelpLayoutMessageContainer, TopicsFlowHelpLayoutMessageContainerProps } from './TopicsFlowHelpLayoutMessageContainer';
import { TopicsFlowHelpLayoutReasonPrototypeItem } from './TopicsFlowHelpLayoutReasonPrototypeItem';
import { TopicsFlowHelpLayoutStartContainer, TopicsFlowHelpLayoutStartContainerProps } from './TopicsFlowHelpLayoutStartContainer';
import { TopicsFlowHelpLayoutUsersContainer, TopicsFlowHelpLayoutUsersContainerProps } from './TopicsFlowHelpLayoutUsersContainer';

/** Generated from `2921_topics_flow_help_xml` (layout "report", 448x522) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TopicsFlowHelpLayoutProps {
    captionButtonText?: string;
    captionChangeUser?: string;
    captionContinueButton?: string;
    captionReportedUserName?: string;
    captionUserInfoTitle?: string;
    chatContainer?: TopicsFlowHelpLayoutChatContainerProps;
    helpContainer?: TopicsFlowHelpLayoutHelpContainerProps;
    itemsReasonList?: ReactNode;
    layout?: BoxLayout;
    messageContainer?: TopicsFlowHelpLayoutMessageContainerProps;
    onBackButton?: () => void;
    onChangeUser?: () => void;
    onClose?: () => void;
    onContinueButton?: () => void;
    onSubmitButton?: () => void;
    reportedUserAvatar?: ReactNode;
    startContainer?: TopicsFlowHelpLayoutStartContainerProps;
    usersContainer?: TopicsFlowHelpLayoutUsersContainerProps;
    visibleBackButton?: boolean;
    visibleChatContainer?: boolean;
    visibleMessageContainer?: boolean;
    visibleReasonContainer?: boolean;
    visibleStartContainer?: boolean;
    visibleSummaryContainer?: boolean;
    visibleUser?: boolean;
    visibleUsersContainer?: boolean;
}

export const TopicsFlowHelpLayout = ({ captionButtonText, captionChangeUser, captionContinueButton, captionReportedUserName, captionUserInfoTitle, chatContainer, helpContainer, itemsReasonList, layout, messageContainer, onBackButton, onChangeUser, onClose, onContinueButton, onSubmitButton, reportedUserAvatar, startContainer, usersContainer, visibleBackButton, visibleChatContainer, visibleMessageContainer, visibleReasonContainer, visibleStartContainer, visibleSummaryContainer, visibleUser, visibleUsersContainer }: TopicsFlowHelpLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('help.button.cfh')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 448, height: 522, ...layout }}
        >
            {(visibleStartContainer ?? false) && (
                <TopicsFlowHelpLayoutStartContainer {...startContainer} />
            )}
            <TopicsFlowHelpLayoutHelpContainer {...helpContainer} />
            <ContainerButton
                variant="5"
                name="continue_button"
                tintColor="#00aa00"
                onPointerTap={onContinueButton}
                layout={{ position: 'absolute', left: 229, width: 189, top: 435, height: 41 }}
            >
                <ThemeText
                    text={captionContinueButton ?? t('help.emergency.main.submit.button')}
                    textStyle="text-style-u-headline-medium"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </ContainerButton>
            {(visibleUsersContainer ?? false) && (
                <TopicsFlowHelpLayoutUsersContainer {...usersContainer} />
            )}
            {(visibleUser ?? false) && (
                <Region
                    name="user"
                    layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 90 }}
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
                    >
                        {reportedUserAvatar}
                    </WidgetSlot>
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
            )}
            {(visibleReasonContainer ?? false) && (
                <Region
                    name="reason_container"
                    layout={{ position: 'absolute', left: 0, width: 445, top: 90, height: 340 }}
                >
                    <Region layout={{ position: 'absolute', left: 30, width: 405, top: 12, height: 59, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('help.cfh.pick.topic')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 405 }}
                        />
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 30, width: 385, top: 70, height: 270 }}
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
                </Region>
            )}
            {(visibleMessageContainer ?? false) && (
                <TopicsFlowHelpLayoutMessageContainer {...messageContainer} />
            )}
            {(visibleChatContainer ?? false) && (
                <TopicsFlowHelpLayoutChatContainer {...chatContainer} />
            )}
            {(visibleBackButton ?? false) && (
                <ContainerButton
                    variant="5"
                    name="back_button"
                    tintColor="#aaaaaa"
                    onPointerTap={onBackButton}
                    layout={{ position: 'absolute', left: 30, width: 189, top: 435, height: 41 }}
                >
                    <ThemeText
                        text={captionButtonText ?? t('generic.back')}
                        textStyle="text-style-u-headline-medium"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                    />
                </ContainerButton>
            )}
            {(visibleSummaryContainer ?? false) && (
                <Region
                    name="summary_container"
                    layout={{ position: 'absolute', left: 0, width: 444, top: 100, height: 380 }}
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
                        <ThemeText
                            text={t('help.emergency.chat_report.submit.button')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                </Region>
            )}
        </Frame>
    );
};
