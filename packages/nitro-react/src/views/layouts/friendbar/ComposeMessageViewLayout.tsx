import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Frame, Region, TextInput, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `90_compose_message_view_xml` (layout "new_compose_message", 455x470) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ComposeMessageViewLayoutProps {
    captionCancelBtnLabel?: string;
    captionFormattingHelp?: string;
    captionMessageTextHeader?: string;
    captionSendMessageLabel?: string;
    captionStatusText?: string;
    captionThreadSubjectHeader?: string;
    captionTopHeaderText?: string;
    captionTopText?: string;
    groupIcon?: ReactNode;
    layout?: BoxLayout;
    onCancelBtn?: () => void;
    onClose?: () => void;
    onMessageTextContainer?: () => void;
    onPostBtn?: () => void;
    onTopClickArea?: () => void;
    onTopPart?: () => void;
    topClickArea?: ReactNode;
}

export const ComposeMessageViewLayout = ({ captionCancelBtnLabel, captionFormattingHelp, captionMessageTextHeader, captionSendMessageLabel, captionStatusText, captionThreadSubjectHeader, captionTopHeaderText, captionTopText, groupIcon, layout, onCancelBtn, onClose, onMessageTextContainer, onPostBtn, onTopClickArea, onTopPart, topClickArea }: ComposeMessageViewLayoutProps) => {
    const t = useTranslation();
    const [ threadSubjectValue, setThreadSubjectValue ] = useState('');
    const [ messageTextValue, setMessageTextValue ] = useState('');

    return (
        <Frame
            variant="3"
            caption={t('groupforum.compose.window_title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 455, height: 470, minWidth: 455, minHeight: 455, ...layout }}
        >
            <Region
                name="top_part"
                backgroundColor="#0e3f52"
                onPointerTap={onTopPart}
                cursor="pointer"
                layout={{ position: 'absolute', left: -5, right: -5, top: 8, height: 80 }}
            >
                <Region
                    name="top_click_area"
                    onPointerTap={onTopClickArea}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {topClickArea}
                </Region>
                <Region
                    name="icon_background"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 80, top: 0, bottom: 0 }}
                >
                    <WidgetSlot
                        widgetType="badge_image"
                        name="group_icon"
                        options={{ 'badge_image:type': 'group', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                        layout={{ position: 'absolute', left: 20, width: 40, top: 20, height: 40 }}
                    >
                        {groupIcon}
                    </WidgetSlot>
                </Region>
                <ThemeText
                    text={captionTopHeaderText ?? 'Super-duper long group title'}
                    textStyle="text-style-u-headline-big"
                    textOptions={{ fill: '#ffffff' }}
                    name="top_header_text"
                    layout={{ position: 'absolute', left: 90, width: 678, top: 10, height: 30 }}
                />
                <ThemeText
                    text={captionTopText ?? 'Super-duper long goup description, maybe even multiline, but takes a few lines anyway'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 359 }}
                    name="top_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 90, right: 4, top: 40, height: 40 }}
                />
            </Region>
            <Region
                name="thread_subject_container"
                layout={{ position: 'absolute', left: 0, right: -1, top: 96, height: 48 }}
            >
                <Region
                    backgroundColor="#227aad"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 21 }}
                />
                <ThemeText
                    text={captionThreadSubjectHeader ?? t('groupforum.compose.subject')}
                    textOptions={{ fill: '#eeeeee' }}
                    name="thread_subject_header"
                    layout={{ position: 'absolute', left: 1, right: -9, top: 1, height: 16 }}
                />
                <TextInput
                    value={threadSubjectValue}
                    onChange={setThreadSubjectValue}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 21, height: 22 }}
                />
            </Region>
            <Region
                name="message_text_container"
                onPointerTap={onMessageTextContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: -1, top: 145, bottom: 64 }}
            >
                <Region
                    backgroundColor="#227aad"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 21 }}
                />
                <ThemeText
                    text={captionMessageTextHeader ?? t('groupforum.compose.message')}
                    textStyle="text-style-regular"
                    textOptions={{ fill: '#eeeeee' }}
                    name="message_text_header"
                    layout={{ position: 'absolute', left: 1, right: 0, top: 1, height: 16 }}
                />
                <TextInput
                    value={messageTextValue}
                    onChange={setMessageTextValue}
                    multiline
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0 }}
                />
                <ThemeText
                    text={captionFormattingHelp ?? t('groupforum.compose.formatting_help')}
                    textStyle="text-style-id-link-regular"
                    textOptions={{ align: 'right' }}
                    name="formatting_help"
                    layout={{ position: 'absolute', right: 4, width: 197, top: 4, height: 16 }}
                />
            </Region>
            <ContainerButton
                variant="3"
                name="cancel_btn"
                tintColor="#dddddd"
                onPointerTap={onCancelBtn}
                layout={{ position: 'absolute', left: 25, width: 120, bottom: 21, height: 30, minWidth: 120, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCancelBtnLabel ?? t('groupforum.compose.cancel')}
                    textStyle="text-style-u-bold"
                />
            </ContainerButton>
            <ContainerButton
                variant="3"
                name="post_btn"
                tintColor="#0a9bc5"
                onPointerTap={onPostBtn}
                layout={{ position: 'absolute', right: 28, width: 120, bottom: 21, height: 30, minWidth: 120, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionSendMessageLabel ?? t('groupforum.compose.post')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </ContainerButton>
            <ThemeText
                text={captionStatusText ?? 'Thread subject should not be empty!'}
                textOptions={{ wordWrap: true, wordWrapWidth: 424 }}
                name="status_text"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, right: 9, bottom: -10, height: 17 }}
            />
        </Frame>
    );
};
