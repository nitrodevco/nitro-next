import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1077_poll_question_xml` (layout "poll_question", 382x561) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PollQuestionLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onPollQuestionButtonOk?: () => void;
}

export const PollQuestionLayout = ({ layout, onClose, onPollQuestionButtonOk }: PollQuestionLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="poll_question_frame"
            name="poll_question_frame"
            params={32769}
            caption={t('poll_question_title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 382, height: 561, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="header_region"
                    params={1}
                    backgroundColor="#0e3f52"
                    layout={{ position: 'absolute', left: -5, width: 380, top: 8, height: 60 }}
                >
                    <Region
                        name="poll_question_headline"
                        params={144}
                        layout={{ position: 'absolute', left: 80, width: 290, top: 15, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('poll_question_headline')}
                            textStyle="text-style-u-headline-big"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <ThemeImage
                        name="poll_prompt_image"
                        params={16}
                        src={layoutImage('poll_poll_prompt_question.png')}
                        layout={{ position: 'absolute', left: 10, width: 40, top: 7, height: 40 }}
                    />
                </Region>
                <Region
                    params={8538128}
                    layout={{ position: 'absolute', left: 0, width: 370, top: 70, height: 424 }}
                >
                    <Region
                        name="poll_content_wrapper"
                        params={8538257}
                        layout={{ position: 'absolute', left: 5, width: 365, top: 0, height: 424, flexDirection: 'column' }}
                    >
                        <ScrollArea
                            orientation="vertical"
                            layout={{ width: 365, height: 414, flexShrink: 0 }}
                        >
                            <Region
                                params={16400}
                                layout={{ flexDirection: 'column', width: '100%' }}
                            >
                                <Region
                                    name="poll_question_text"
                                    params={8601616}
                                    layout={{ width: 360, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                />
                                <Region
                                    params={12714000}
                                    layout={{ width: 1, height: 10, flexShrink: 0 }}
                                />
                                <Region
                                    name="poll_question_answer_container"
                                    params={8538128}
                                    layout={{ width: 363, height: 384, flexShrink: 0 }}
                                />
                            </Region>
                        </ScrollArea>
                        <Region
                            params={16}
                            layout={{ width: 1, height: 10, flexShrink: 0 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="footer_container"
                    params={10224656}
                    layout={{ position: 'absolute', left: 5, width: 383, top: 486, height: 45 }}
                >
                    <Region
                        name="poll_question_number"
                        params={144}
                        layout={{ position: 'absolute', left: 0, width: 129, top: 10, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('poll_question_number')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                    <Region
                        name="poll_question_cancel"
                        params={393233}
                        layout={{ position: 'absolute', left: 190, width: 74, top: 10, height: 17, minWidth: 74, maxWidth: 74, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('cancel')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="poll_question_button_ok"
                        params={131089}
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
