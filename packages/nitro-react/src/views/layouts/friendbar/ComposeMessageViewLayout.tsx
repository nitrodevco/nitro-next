import { useState } from 'react';

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
    layout?: BoxLayout;
    onCancelBtn?: () => void;
    onClose?: () => void;
    onMessageTextContainer?: () => void;
    onPostBtn?: () => void;
    onTopClickArea?: () => void;
    onTopPart?: () => void;
}

export const ComposeMessageViewLayout = ({ captionCancelBtnLabel, captionFormattingHelp, captionMessageTextHeader, captionSendMessageLabel, captionStatusText, captionThreadSubjectHeader, captionTopHeaderText, captionTopText, layout, onCancelBtn, onClose, onMessageTextContainer, onPostBtn, onTopClickArea, onTopPart }: ComposeMessageViewLayoutProps) => {
    const t = useTranslation();
    const [ threadSubjectValue, setThreadSubjectValue ] = useState('');
    const [ messageTextValue, setMessageTextValue ] = useState('');

    return (
        <Frame
            variant="3"
            params={98337}
            caption={t('groupforum.compose.window_title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 455, height: 470, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="top_part"
                    params={129}
                    backgroundColor="#0e3f52"
                    onPointerTap={onTopPart}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: -5, right: 7, top: 8, height: 80 }}
                >
                    <Region
                        name="top_click_area"
                        params={145}
                        onPointerTap={onTopClickArea}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80 }}
                    />
                    <Region
                        name="icon_background"
                        params={16}
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 80 }}
                    >
                        <WidgetSlot
                            widgetType="badge_image"
                            name="group_icon"
                            params={16}
                            options={{ 'badge_image:type': 'group', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                            layout={{ position: 'absolute', left: 20, width: 40, top: 20, height: 40 }}
                        />
                    </Region>
                    <Region
                        name="top_header_text"
                        params={16}
                        layout={{ position: 'absolute', left: 90, width: 678, top: 10, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTopHeaderText ?? 'Super-duper long group title'}
                            textStyle="text-style-u-headline-big"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="top_text"
                        params={144}
                        layout={{ position: 'absolute', left: 90, right: 4, top: 40, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTopText ?? 'Super-duper long goup description, maybe even multiline, but takes a few lines anyway'}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 359 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="thread_subject_container"
                    params={144}
                    layout={{ position: 'absolute', left: 0, right: 11, top: 96, height: 48 }}
                >
                    <Region
                        params={145}
                        backgroundColor="#227aad"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 21 }}
                    />
                    <Region
                        name="thread_subject_header"
                        params={144}
                        layout={{ position: 'absolute', left: 1, right: -9, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionThreadSubjectHeader ?? t('groupforum.compose.subject')}
                            textOptions={{ fill: '#eeeeee' }}
                        />
                    </Region>
                    <TextInput
                        value={threadSubjectValue}
                        onChange={setThreadSubjectValue}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 21, height: 22 }}
                    />
                </Region>
                <Region
                    name="message_text_container"
                    params={2193}
                    onPointerTap={onMessageTextContainer}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 11, top: 145, bottom: 105 }}
                >
                    <Region
                        params={145}
                        backgroundColor="#227aad"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 21 }}
                    />
                    <Region
                        name="message_text_header"
                        params={144}
                        layout={{ position: 'absolute', left: 1, right: 0, top: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionMessageTextHeader ?? t('groupforum.compose.message')}
                            textStyle="text-style-regular"
                            textOptions={{ fill: '#eeeeee' }}
                        />
                    </Region>
                    <TextInput
                        value={messageTextValue}
                        onChange={setMessageTextValue}
                        multiline
                        backgroundColor="#ffffff"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0 }}
                    />
                    <Region
                        name="formatting_help"
                        params={262145}
                        layout={{ position: 'absolute', right: 4, width: 197, top: 4, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                    >
                        <ThemeText
                            text={captionFormattingHelp ?? t('groupforum.compose.formatting_help')}
                            textStyle="text-style-id-link-regular"
                            textOptions={{ align: 'right' }}
                        />
                    </Region>
                </Region>
                <ContainerButton
                    variant="3"
                    name="cancel_btn"
                    params={1041}
                    tintColor="#dddddd"
                    onPointerTap={onCancelBtn}
                    layout={{ position: 'absolute', left: 25, width: 120, bottom: 62, height: 30, minWidth: 120 }}
                >
                    <Region
                        name="cancel_btn_label"
                        params={3935440}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -60, width: 163, top: '50%', marginTop: -8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCancelBtnLabel ?? t('groupforum.compose.cancel')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                </ContainerButton>
                <ContainerButton
                    variant="3"
                    name="post_btn"
                    params={263249}
                    tintColor="#0a9bc5"
                    onPointerTap={onPostBtn}
                    layout={{ position: 'absolute', right: 40, width: 120, bottom: 62, height: 30, minWidth: 120 }}
                >
                    <Region
                        name="send_message_label"
                        params={3935440}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -60, width: 152, top: '50%', marginTop: -8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionSendMessageLabel ?? t('groupforum.compose.post')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </ContainerButton>
                <Region
                    name="status_text"
                    params={787600}
                    layout={{ position: 'absolute', left: 10, right: 21, bottom: 31, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStatusText ?? 'Thread subject should not be empty!'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 424 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
