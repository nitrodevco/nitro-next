import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Frame, RadioButton, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2895_habbo_way_quiz_xml` (layout "quiz_question", 499x470) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboWayQuizLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onExitButton?: () => void;
    onExitButton2?: () => void;
    onNextButton?: () => void;
    onPrevButton?: () => void;
    onRadiobutton?: () => void;
    onReviewButton?: () => void;
}

export const HabboWayQuizLayout = ({ layout, onClose, onExitButton, onExitButton2, onNextButton, onPrevButton, onRadiobutton, onReviewButton }: HabboWayQuizLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="101"
            params={1}
            caption={t('habbo.way.quiz.title')}
            onClose={onClose}
            layout={{ width: 499, height: 470, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <WidgetSlot
                    widgetType="separator"
                    params={16}
                    layout={{ position: 'absolute', left: 6, width: 485, top: 36, height: 25 }}
                >
                    <ThemeImage
                        name="indicator_image"
                        params={3088}
                        src={undefined}
                        layout={{ position: 'absolute', left: 19, width: 29, top: 3, height: 18 }}
                    />
                    <Region
                        name="top_indicator"
                        params={3088}
                        layout={{ position: 'absolute', left: 40, width: 77, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="top indicator"
                            textStyle="text-style-il-border"
                            textOptions={{ fill: '#555555' }}
                        />
                    </Region>
                </WidgetSlot>
                <Region
                    name="question_pane"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 25, width: 470, top: 60, height: 310 }}
                >
                    <Region
                        name="contents"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 460, top: 20, height: 285, flexDirection: 'column', gap: 15 }}
                    >
                        <Region
                            name="question"
                            params={16}
                            layout={{ width: 339, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="question"
                                textOptions={{ fill: '#555555', wordWrap: true, wordWrapWidth: 339 }}
                            />
                        </Region>
                        <Region
                            name="answer_list"
                            params={147473}
                            layout={{ width: 318, height: 16, flexShrink: 0, flexDirection: 'column', gap: 10 }}
                        >
                            <RadioButton
                                variant="100"
                                params={147473}
                                onPointerTap={onRadiobutton}
                                layout={{ width: 318, height: 16, flexShrink: 0, minHeight: 0, maxHeight: 100 }}
                            >
                                answer
                            </RadioButton>
                        </Region>
                    </Region>
                    <ThemeImage
                        name="question_illustration"
                        params={16}
                        src="${image.library.url}habboway/quiz_question.png"
                        layout={{ position: 'absolute', left: 330, width: 122, top: 1, height: 300 }}
                    />
                </Region>
                <Region
                    name="failure_pane"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 498, top: 50, height: 320 }}
                >
                    <Region
                        name="failure_results"
                        params={208}
                        layout={{ position: 'absolute', left: 247, width: 4, top: 27, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    />
                    <Region
                        name="failure_advice"
                        params={208}
                        layout={{ position: 'absolute', left: 104, width: 291, top: 70, height: 4, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    />
                    <ThemeImage
                        name="failure_illustration"
                        params={16}
                        src="${image.library.url}habboway/quiz_failure.png"
                        layout={{ position: 'absolute', left: 146, width: 207, top: 106, height: 205 }}
                    />
                </Region>
                <Region
                    name="success_pane"
                    params={16}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 498, top: 50, height: 320 }}
                >
                    <Region
                        name="success_results"
                        params={208}
                        layout={{ position: 'absolute', left: 39, width: 421, top: 27, height: 4, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    />
                    <ThemeImage
                        name="success_illustration"
                        params={16}
                        src="${image.library.url}habboway/quiz_success.png"
                        layout={{ position: 'absolute', left: 141, width: 217, top: 88, height: 215 }}
                    />
                </Region>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 20, width: 477, top: 69, height: 297 }}
                >
                    <Region
                        name="analysis_pane"
                        params={16}
                        visible={false}
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        <Region
                            params={147472}
                            layout={{ width: 470, height: 149, flexShrink: 0, flexDirection: 'column', gap: 10 }}
                        >
                            <Region
                                name="question"
                                params={16}
                                layout={{ width: 455, height: 35, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text="Lorem ipsum question text, not quite as long as it gets. Lorem ipsum question text, not quite as long as it gets."
                                    textStyle="text-style-il-heading-1"
                                    textOptions={{ wordWrap: true, wordWrapWidth: 455 }}
                                />
                            </Region>
                            <Region
                                name="answer_container"
                                params={147472}
                                layout={{ width: 448, height: 28, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    name="answer_illustration"
                                    params={16}
                                    src={layoutImage('help_decline_icon.png')}
                                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 16 }}
                                />
                                <Region
                                    name="answer"
                                    params={16}
                                    layout={{ position: 'absolute', left: 15, width: 433, top: 0, height: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="Lorem ipsum answer text, not quite as long as it gets. Lorem ipsum answer text, not quite as long as it gets."
                                        textOptions={{ fill: '#555555', wordWrap: true, wordWrapWidth: 433 }}
                                    />
                                </Region>
                            </Region>
                            <Border
                                variant="102"
                                name="explanation_container"
                                params={147472}
                                layout={{ width: 435, height: 40, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    name="explanation_illustration"
                                    params={16}
                                    src={layoutImage('help_habboway_dove_quizz.png')}
                                    layout={{ position: 'absolute', left: 10, width: 30, top: 10, height: 30 }}
                                />
                                <Region
                                    name="explanation"
                                    params={16}
                                    layout={{ position: 'absolute', left: 42, width: 393, top: 0, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text="Lorem ipsum explanation text, not quite as long as it gets. Lorem ipsum explanation text, not quite as long as it gets."
                                        textOptions={{ wordWrap: true, wordWrapWidth: 393 }}
                                    />
                                </Region>
                            </Border>
                            <ThemeImage
                                name="separator"
                                params={16}
                                src={layoutImage('illumina_light_separator_horizontal.png')}
                                layout={{ width: 450, height: 16, flexShrink: 0 }}
                            />
                        </Region>
                    </Region>
                </ScrollArea>
                <WidgetSlot
                    widgetType="separator"
                    params={1040}
                    layout={{ position: 'absolute', left: 6, width: 485, top: 359, height: 30 }}
                />
                <Region
                    name="prev_next_buttons"
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 498, top: 374, height: 65 }}
                >
                    <ContainerButton
                        variant="101"
                        name="prev_button"
                        params={147473}
                        tintColor="#bbbbbb"
                        onPointerTap={onPrevButton}
                        layout={{ position: 'absolute', left: 16, width: 208, top: 0, height: 53 }}
                    >
                        <Region
                            params={4341776}
                            layout={{ position: 'absolute', left: 11, width: 197, top: 11, height: 42, flexDirection: 'row' }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('help_habboway_prev.png')}
                                layout={{ width: 25, height: 30, flexShrink: 0 }}
                            />
                            <ThemeImage
                                params={16}
                                src={layoutImage('illumina_light_separator_vertical.png')}
                                layout={{ width: 2, height: 20, flexShrink: 0 }}
                            />
                            <Region
                                params={16}
                                layout={{ width: 170, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('habbo.way.previous.button')}
                                    textStyle="text-style-il-button"
                                />
                            </Region>
                        </Region>
                    </ContainerButton>
                    <ContainerButton
                        variant="101"
                        name="next_button"
                        params={409617}
                        tintColor="#bbbbbb"
                        onPointerTap={onNextButton}
                        layout={{ position: 'absolute', left: 296, width: 185, top: 0, height: 53 }}
                    >
                        <Region
                            params={4341776}
                            layout={{ position: 'absolute', left: 11, width: 174, top: 11, height: 42, flexDirection: 'row' }}
                        >
                            <Region
                                params={16}
                                layout={{ width: 136, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('habbo.way.next.button')}
                                    textStyle="text-style-il-button"
                                />
                            </Region>
                            <ThemeImage
                                params={16}
                                src={layoutImage('illumina_light_separator_vertical.png')}
                                layout={{ width: 2, height: 20, flexShrink: 0 }}
                            />
                            <ThemeImage
                                params={16}
                                src={layoutImage('help_habboway_next.png')}
                                layout={{ width: 25, height: 30, flexShrink: 0 }}
                            />
                            <Region
                                params={16}
                                layout={{ width: 11, height: 30, flexShrink: 0 }}
                            />
                        </Region>
                    </ContainerButton>
                    <Region
                        name="prev_dimmer"
                        params={17}
                        backgroundColor="#e2e2e2"
                        layout={{ position: 'absolute', left: 14, width: 240, top: 1, height: 58 }}
                    />
                    <Region
                        name="next_dimmer"
                        params={17}
                        backgroundColor="#e2e2e2"
                        layout={{ position: 'absolute', left: 243, width: 240, top: 1, height: 58 }}
                    />
                </Region>
                <Region
                    name="failure_buttons"
                    params={1040}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 498, top: 374, height: 65 }}
                >
                    <Button
                        variant="101"
                        name="review_button"
                        params={131089}
                        tintColor="#bbbbbb"
                        onPointerTap={onReviewButton}
                        layout={{ position: 'absolute', left: 16, width: 197, top: 0, height: 53 }}
                    >
                        {t('habbo.way.quiz.review.button')}
                    </Button>
                    <Button
                        variant="101"
                        name="exit_button"
                        params={393233}
                        tintColor="#bbbbbb"
                        onPointerTap={onExitButton}
                        layout={{ position: 'absolute', left: 298, width: 183, top: 0, height: 53 }}
                    >
                        {t('habbo.way.quiz.exit.button')}
                    </Button>
                    <Region
                        params={262160}
                        visible={false}
                        layout={{ position: 'absolute', left: 345, width: 126, top: 43, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('habbo.way.quiz.wait.indication')}
                            textStyle="text-style-il-small"
                        />
                    </Region>
                </Region>
                <Region
                    name="exit_button_container"
                    params={1040}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 499, top: 374, height: 65 }}
                >
                    <Button
                        variant="101"
                        name="exit_button"
                        params={131281}
                        tintColor="#bbbbbb"
                        onPointerTap={onExitButton2}
                        layout={{ position: 'absolute', left: 158, width: 183, top: 0, height: 53 }}
                    >
                        {t('habbo.way.quiz.exit.button')}
                    </Button>
                    <Region
                        name="retake_time_notice"
                        params={208}
                        visible={false}
                        layout={{ position: 'absolute', left: 186, width: 126, top: 43, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('habbo.way.quiz.wait.indication')}
                            textStyle="text-style-il-small"
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
