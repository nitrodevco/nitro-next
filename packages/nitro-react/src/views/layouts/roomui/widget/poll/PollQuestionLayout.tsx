import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1077_poll_question_xml` (layout "poll_question", 382x561) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PollQuestionLayoutProps {
    captionPollQuestionCancel?: string;
    captionPollQuestionHeadline?: string;
    captionPollQuestionNumber?: string;
    captionPollQuestionText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onHeaderRegion?: () => void;
    onPollQuestionButtonOk?: () => void;
    pollQuestionAnswerContainer?: ReactNode;
    srcPollPromptImage?: string;
}

export const PollQuestionLayout = ({ captionPollQuestionCancel, captionPollQuestionHeadline, captionPollQuestionNumber, captionPollQuestionText, layout, onClose, onHeaderRegion, onPollQuestionButtonOk, pollQuestionAnswerContainer, srcPollPromptImage }: PollQuestionLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="poll_question_frame"
            name="poll_question_frame"
            caption={t('poll_question_title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 382, height: 561, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region
                    name="header_region"
                    backgroundColor="#0e3f52"
                    onPointerTap={onHeaderRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: -5, width: 380, top: 8, height: 60 }}
                >
                    <Region
                        name="poll_question_headline"
                        layout={{ position: 'absolute', left: 80, right: 10, top: 15, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPollQuestionHeadline ?? t('poll_question_headline')}
                            textStyle="text-style-u-headline-big"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <ThemeImage
                        name="poll_prompt_image"
                        src={srcPollPromptImage ?? layoutImage('poll_poll_prompt_question.png')}
                        layout={{ position: 'absolute', left: 10, width: 40, top: 7, height: 40 }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 0, width: 370, top: 70, bottom: 67 }}>
                    <Region
                        name="poll_content_wrapper"
                        layout={{ position: 'absolute', left: 5, right: 0, top: 0, bottom: 0, flexDirection: 'column' }}
                    >
                        <ScrollArea
                            orientation="vertical"
                            layout={{ width: 365, height: 414, flexShrink: 0 }}
                        >
                            <Region layout={{ flexDirection: 'column', width: '100%' }}>
                                <Region
                                    name="poll_question_text"
                                    layout={{ width: 360, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionPollQuestionText ?? ''}
                                        textStyle="text-style-u-regular"
                                        textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                                    />
                                </Region>
                                <Region layout={{ width: 1, height: 10, flexShrink: 0 }} />
                                <Region
                                    name="poll_question_answer_container"
                                    layout={{ width: 363, height: 384, flexShrink: 0 }}
                                >
                                    {pollQuestionAnswerContainer}
                                </Region>
                            </Region>
                        </ScrollArea>
                        <Region layout={{ width: 1, height: 10, flexShrink: 0 }} />
                    </Region>
                </Region>
                <Region
                    name="footer_container"
                    layout={{ position: 'absolute', marginLeft: 5.5, marginRight: -5.5, width: 383, bottom: 30, height: 45 }}
                >
                    <Region
                        name="poll_question_number"
                        layout={{ position: 'absolute', left: 0, right: 254, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPollQuestionNumber ?? t('poll_question_number')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                    <Region
                        name="poll_question_cancel"
                        layout={{ position: 'absolute', right: 119, width: 74, top: 10, height: 17, minWidth: 74, maxWidth: 74, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPollQuestionCancel ?? t('cancel')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="poll_question_button_ok"
                        tintColor="#00aa00"
                        onPointerTap={onPollQuestionButtonOk}
                        layout={{ position: 'absolute', left: 270, width: 80, top: 0, height: 40, minWidth: 80, maxWidth: 80 }}
                    >
                        {t('ok')}
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};
