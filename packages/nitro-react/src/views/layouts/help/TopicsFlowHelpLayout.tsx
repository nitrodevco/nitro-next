import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CheckBox, ContainerButton, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2921_topics_flow_help_xml` (layout "report", 448x522) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TopicsFlowHelpLayoutProps {
    captionButtonText?: string;
    captionChangeUser?: string;
    captionContinueButton?: string;
    captionFaqLink?: string;
    captionMessageContainerDescription?: string;
    captionMessagePhaseTitle?: string;
    captionReportedUserName?: string;
    captionReportsStatus?: string;
    captionSanctionInfoLink?: string;
    captionUnlawfulMessageConfirmLabel?: string;
    captionUserInfoTitle?: string;
    itemsChatList?: ReactNode;
    itemsReasonList?: ReactNode;
    itemsUserList?: ReactNode;
    layout?: BoxLayout;
    onBackButton?: () => void;
    onButtonAccount?: () => void;
    onButtonHabboHelp?: () => void;
    onButtonUserReport?: () => void;
    onChangeUser?: () => void;
    onClose?: () => void;
    onContinueButton?: () => void;
    onFaqLink?: () => void;
    onHabbowayLink?: () => void;
    onInstructionsButton?: () => void;
    onReportsStatus?: () => void;
    onSafetybookletLink?: () => void;
    onSanctionInfoLink?: () => void;
    onSubmitButton?: () => void;
    onUnlawfulMessageConfirm?: () => void;
    srcReportsStatusBitmap?: string;
    visibleBackButton?: boolean;
    visibleButtonHabboHelp?: boolean;
    visibleChatContainer?: boolean;
    visibleMessageContainer?: boolean;
    visibleReasonContainer?: boolean;
    visibleStartContainer?: boolean;
    visibleSummaryContainer?: boolean;
    visibleUser?: boolean;
    visibleUsersContainer?: boolean;
}

export const TopicsFlowHelpLayout = ({ captionButtonText, captionChangeUser, captionContinueButton, captionFaqLink, captionMessageContainerDescription, captionMessagePhaseTitle, captionReportedUserName, captionReportsStatus, captionSanctionInfoLink, captionUnlawfulMessageConfirmLabel, captionUserInfoTitle, itemsChatList, itemsReasonList, itemsUserList, layout, onBackButton, onButtonAccount, onButtonHabboHelp, onButtonUserReport, onChangeUser, onClose, onContinueButton, onFaqLink, onHabbowayLink, onInstructionsButton, onReportsStatus, onSafetybookletLink, onSanctionInfoLink, onSubmitButton, onUnlawfulMessageConfirm, srcReportsStatusBitmap, visibleBackButton, visibleButtonHabboHelp, visibleChatContainer, visibleMessageContainer, visibleReasonContainer, visibleStartContainer, visibleSummaryContainer, visibleUser, visibleUsersContainer }: TopicsFlowHelpLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={1}
            caption={t('help.button.cfh')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 448, height: 522, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="start_container"
                    params={16}
                    visible={visibleStartContainer ?? false}
                    layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 480 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('help_help_duck.png')}
                        layout={{ position: 'absolute', left: 32, width: 124, top: 59, height: 126 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 32, width: 382, top: 22, height: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.main.frame.title')}
                            textStyle="text-style-u-headline-big"
                        />
                    </Region>
                    <Region
                        params={1}
                        layout={{ position: 'absolute', left: 170, width: 250, top: 61, height: 117, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.main.frame.description')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 32, width: 380, top: 230, height: 150, flexDirection: 'column', gap: 5 }}
                    >
                        <Region
                            visible={visibleButtonHabboHelp ?? false}
                            layout={{ width: 380, height: 40, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="6"
                                name="button_habbo_help"
                                params={17}
                                tintColor="#00aa00"
                                onPointerTap={onButtonHabboHelp}
                                layout={{ width: '100%', height: '100%' }}
                            >
                                <Region
                                    params={16}
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
                            params={17}
                            tintColor="#00aa00"
                            onPointerTap={onButtonUserReport}
                            layout={{ width: 380, height: 40, flexShrink: 0 }}
                        >
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 365, top: 7, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
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
                            params={17}
                            tintColor="#00aa00"
                            onPointerTap={onButtonAccount}
                            layout={{ width: 380, height: 40, flexShrink: 0 }}
                        >
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 365, top: 7, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('help.main.self.tips.title')}
                                    textStyle="text-style-u-headline-medium"
                                    textOptions={{ fill: '#ffffff', align: 'center' }}
                                />
                            </Region>
                        </ContainerButton>
                    </Region>
                    <ThemeImage
                        params={16}
                        src={layoutImage('icons_link_icon.png')}
                        layout={{ position: 'absolute', left: 32, width: 18, top: 378, height: 19 }}
                    />
                    <Region
                        name="faq_link"
                        params={1}
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
                        params={16}
                        src={layoutImage('icons_link_icon.png')}
                        layout={{ position: 'absolute', left: 32, width: 18, top: 406, height: 19 }}
                    />
                    <Region
                        name="sanction_info_link"
                        params={1}
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
                        params={16}
                        src={srcReportsStatusBitmap ?? layoutImage('icons_link_icon.png')}
                        layout={{ position: 'absolute', left: 32, width: 18, top: 434, height: 19 }}
                    />
                    <Region
                        name="reports_status"
                        params={1}
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
                <Region
                    name="help_container"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 480 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('help_help_duck.png')}
                        layout={{ position: 'absolute', left: 32, width: 124, top: 59, height: 126 }}
                    />
                    <Region
                        params={1}
                        layout={{ position: 'absolute', left: 170, width: 250, top: 61, height: 117, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.main.self.description')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 32, width: 382, top: 22, height: 33, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.main.frame.title')}
                            textStyle="text-style-u-headline-big"
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 32, width: 380, top: 230, height: 150, flexDirection: 'column', gap: 5 }}
                    >
                        <ContainerButton
                            variant="6"
                            name="instructions_button"
                            params={17}
                            tintColor="#00aa00"
                            onPointerTap={onInstructionsButton}
                            layout={{ width: 380, height: 40, flexShrink: 0 }}
                        >
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 380, top: 7, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
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
                            params={17}
                            tintColor="#00aa00"
                            onPointerTap={onSafetybookletLink}
                            layout={{ width: 380, height: 40, flexShrink: 0 }}
                        >
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 380, top: 7, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
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
                            params={17}
                            tintColor="#00aa00"
                            onPointerTap={onHabbowayLink}
                            layout={{ width: 380, height: 40, flexShrink: 0 }}
                        >
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 380, top: 7, height: 21, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('help.main2.habboway.button')}
                                    textStyle="text-style-u-headline-medium"
                                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 380, align: 'center' }}
                                />
                            </Region>
                        </ContainerButton>
                    </Region>
                </Region>
                <ContainerButton
                    variant="5"
                    name="continue_button"
                    params={131089}
                    tintColor="#00aa00"
                    onPointerTap={onContinueButton}
                    layout={{ position: 'absolute', left: 229, width: 189, top: 435, height: 41 }}
                >
                    <Region
                        name="continue_button"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 169, top: 9, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionContinueButton ?? t('help.emergency.main.submit.button')}
                            textStyle="text-style-u-headline-medium"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </ContainerButton>
                <Region
                    name="users_container"
                    params={16}
                    visible={visibleUsersContainer ?? false}
                    layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 430 }}
                >
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 30, width: 278, top: 30, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.emergency.main.step.two.title')}
                            textStyle="text-style-u-headline-medium"
                        />
                    </Region>
                    <Region
                        params={16}
                        visible={false}
                        layout={{ position: 'absolute', left: 30, width: 380, top: 60, height: 37, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.emergency.main.step.two.description')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                        />
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 30, width: 400, top: 100, height: 330 }}
                    >
                        <Region
                            name="user_list"
                            params={16}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            {itemsUserList ?? (
                                <TopicsFlowHelpLayoutUserPrototypeItem />
                            )}
                        </Region>
                    </ScrollArea>
                </Region>
                <Region
                    name="user"
                    params={16}
                    visible={visibleUser ?? false}
                    layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 90 }}
                >
                    <Region
                        params={16}
                        backgroundColor="#8899a2"
                        layout={{ position: 'absolute', left: 0, width: 446, top: 0, height: 90 }}
                    />
                    <Region
                        params={16}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 446, top: 89, height: 1 }}
                    />
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="reported_user_avatar"
                        params={16}
                        options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                        layout={{ position: 'absolute', left: 50, width: 33, top: 23, height: 34 }}
                    />
                    <Region
                        name="user_info_title"
                        params={16}
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
                        params={16}
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
                        params={1}
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
                <Region
                    name="reason_container"
                    params={16}
                    visible={visibleReasonContainer ?? false}
                    layout={{ position: 'absolute', left: 0, width: 445, top: 90, height: 340 }}
                >
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 30, width: 405, top: 12, height: 59, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
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
                            params={16}
                            layout={{ flexDirection: 'column', gap: 5, width: '100%' }}
                        >
                            {itemsReasonList ?? (
                                <TopicsFlowHelpLayoutReasonPrototypeItem />
                            )}
                        </Region>
                    </ScrollArea>
                </Region>
                <Region
                    name="message_container"
                    params={16}
                    visible={visibleMessageContainer ?? false}
                    layout={{ position: 'absolute', left: 0, width: 445, top: 100, height: 330 }}
                >
                    <Region
                        name="message_phase_title"
                        params={16}
                        layout={{ position: 'absolute', left: 30, width: 278, top: 20, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionMessagePhaseTitle ?? t('help.emergency.main.step.one.title')}
                            textStyle="text-style-u-headline-medium"
                        />
                    </Region>
                    <Region
                        name="message_container_description"
                        params={16}
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
                        params={16}
                        options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${help.emergency.main.step.one.entry.instruction}', 'illumina_input:multiline': 'true' }}
                        layout={{ position: 'absolute', left: 30, width: 390, top: 100, height: 120 }}
                    />
                    <Region
                        name="unlawful_message_content"
                        params={16}
                        layout={{ position: 'absolute', left: 30, width: 390, top: 230, height: 100 }}
                    >
                        <WidgetSlot
                            widgetType="illumina_input"
                            name="help_message_name"
                            params={16}
                            options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${connection.login.name}' }}
                            layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 29 }}
                        />
                        <WidgetSlot
                            widgetType="illumina_input"
                            name="help_message_email"
                            params={16}
                            options={{ 'illumina_input:button_caption': '', 'illumina_input:empty_message': '${connection.login.email}' }}
                            layout={{ position: 'absolute', left: 200, width: 188, top: 0, height: 29 }}
                        />
                        <CheckBox
                            variant="3"
                            name="unlawful_message_confirm"
                            params={17}
                            onPointerTap={onUnlawfulMessageConfirm}
                            layout={{ position: 'absolute', left: 0, width: 30, top: 40, height: 30 }}
                        />
                        <Region
                            name="unlawful_message_confirm_label"
                            params={2064}
                            layout={{ position: 'absolute', left: 20, width: 370, top: 40, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionUnlawfulMessageConfirmLabel ?? t('help.cfh.unlawful_activity.confirm_label')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 370 }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="chat_container"
                    params={16}
                    visible={visibleChatContainer ?? false}
                    layout={{ position: 'absolute', left: 0, width: 444, top: 100, height: 330 }}
                >
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 30, width: 287, top: 20, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.emergency.chat_report.subtitle')}
                            textStyle="text-style-u-headline-medium"
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 30, width: 380, top: 40, height: 57, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.emergency.chat_report.description')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 380 }}
                        />
                    </Region>
                    <Border
                        variant="105"
                        params={16}
                        layout={{ position: 'absolute', left: 30, width: 390, top: 100, height: 220 }}
                    >
                        <ScrollArea
                            orientation="vertical"
                            layout={{ position: 'absolute', left: 5, width: 380, top: 5, height: 209 }}
                        >
                            <Region
                                name="chat_list"
                                params={16}
                                layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
                            >
                                {itemsChatList ?? (
                                    <TopicsFlowHelpLayoutChatPrototypeItem />
                                )}
                            </Region>
                        </ScrollArea>
                    </Border>
                </Region>
                <Region
                    visible={visibleBackButton ?? false}
                    layout={{ position: 'absolute', left: 30, width: 189, top: 435, height: 41 }}
                >
                    <ContainerButton
                        variant="5"
                        name="back_button"
                        params={131089}
                        tintColor="#aaaaaa"
                        onPointerTap={onBackButton}
                        layout={{ width: '100%', height: '100%' }}
                    >
                        <Region
                            name="button_text"
                            params={16}
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
                <Region
                    name="summary_container"
                    params={16}
                    visible={visibleSummaryContainer ?? false}
                    layout={{ position: 'absolute', left: 0, width: 444, top: 100, height: 380 }}
                >
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 30, width: 164, top: 20, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.cfh.button.send')}
                            textStyle="text-style-u-headline-medium"
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 30, width: 390, top: 50, height: 107, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('help.main.summary')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 390 }}
                        />
                    </Region>
                    <ContainerButton
                        variant="5"
                        name="submit_button"
                        params={131089}
                        tintColor="#aa0000"
                        onPointerTap={onSubmitButton}
                        layout={{ position: 'absolute', left: 229, width: 189, top: 335, height: 41 }}
                    >
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 10, width: 169, top: 9, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('help.emergency.chat_report.submit.button')}
                                textStyle="text-style-u-headline-medium"
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </ContainerButton>
                </Region>
            </Region>
        </Frame>
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
            params={17}
            onPointerTap={onUserPrototype}
            cursor="pointer"
            layout={{ width: 367, height: 57, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="user_bg"
                tags={[ 'BACKGROUND' ]}
                params={16}
                layout={{ position: 'absolute', left: 0, width: 367, top: 0, height: 52 }}
            />
            <Region
                name="user_name"
                params={16}
                layout={{ position: 'absolute', left: 61, width: 42, top: 11, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionUserName ?? 'user123'}
                    textStyle="text-style-il-border"
                />
            </Region>
            <Region
                name="room_name"
                params={16}
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
                params={16}
                options={{ 'avatar_image:only_head': 'true' }}
                layout={{ position: 'absolute', left: -11, width: 90, top: -29, height: 130 }}
            />
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
            params={17}
            tintColor="#aa0000"
            onPointerTap={onReasonPrototype}
            layout={{ width: 355, height: 40, flexShrink: 0, ...layout }}
        >
            <Region
                name="name"
                params={16}
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
            params={16}
            layout={{ width: 360, height: 20, flexShrink: 0, ...layout }}
        >
            <CheckBox
                variant="3"
                name="chat_check"
                params={17}
                onPointerTap={onChatCheck}
                layout={{ position: 'absolute', left: 2, width: 16, top: 2, height: 16 }}
            >
                This is a chatline
            </CheckBox>
            <Region
                name="chat_text"
                params={1}
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
