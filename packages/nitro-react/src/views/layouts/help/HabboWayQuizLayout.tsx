import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Frame, RadioButton, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2895_habbo_way_quiz_xml` (layout "quiz_question", 499x470) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboWayQuizLayoutProps {
    analysisPane?: HabboWayQuizLayoutAnalysisPaneProps;
    captionFailureAdvice?: string;
    captionFailureResults?: string;
    captionRetakeTimeNotice?: string;
    captionSuccessResults?: string;
    captionTopIndicator?: string;
    itemsContents?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onExitButton?: () => void;
    onExitButton2?: () => void;
    onReviewButton?: () => void;
    prevNextButtons?: HabboWayQuizLayoutPrevNextButtonsProps;
    srcFailureIllustration?: string;
    srcIndicatorImage?: string;
    srcQuestionIllustration?: string;
    srcSuccessIllustration?: string;
    visibleAnalysisPane?: boolean;
    visibleExitButtonContainer?: boolean;
    visibleFailureButtons?: boolean;
    visibleFailurePane?: boolean;
    visibleQuestionPane?: boolean;
    visibleRetakeTimeNotice?: boolean;
    visibleSuccessPane?: boolean;
}

export const HabboWayQuizLayout = ({ analysisPane, captionFailureAdvice, captionFailureResults, captionRetakeTimeNotice, captionSuccessResults, captionTopIndicator, itemsContents, layout, onClose, onExitButton, onExitButton2, onReviewButton, prevNextButtons, srcFailureIllustration, srcIndicatorImage, srcQuestionIllustration, srcSuccessIllustration, visibleAnalysisPane, visibleExitButtonContainer, visibleFailureButtons, visibleFailurePane, visibleQuestionPane, visibleRetakeTimeNotice, visibleSuccessPane }: HabboWayQuizLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="101"
            caption={t('habbo.way.quiz.title')}
            onClose={onClose}
            layout={{ width: 499, height: 470, ...layout }}
        >
            <WidgetSlot
                widgetType="separator"
                layout={{ position: 'absolute', left: 6, width: 485, top: 36, height: 25 }}
            >
                <ThemeImage
                    name="indicator_image"
                    src={srcIndicatorImage}
                    layout={{ position: 'absolute', left: 19, width: 29, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 18 }}
                />
                <Region
                    name="top_indicator"
                    layout={{ position: 'absolute', left: 40, width: 77, alignSelf: 'center', height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTopIndicator ?? 'top indicator'}
                        textStyle="text-style-il-border"
                        textOptions={{ fill: '#555555' }}
                    />
                </Region>
            </WidgetSlot>
            {(visibleQuestionPane ?? false) && (
                <Region
                    name="question_pane"
                    layout={{ position: 'absolute', left: 25, width: 470, top: 60, height: 310 }}
                >
                    <Region
                        name="contents"
                        layout={{ position: 'absolute', left: 0, width: 460, top: 20, height: 285, flexDirection: 'column', gap: 15 }}
                    >
                        {itemsContents ?? (
                            <>
                                <HabboWayQuizLayoutQuestionItem />
                                <HabboWayQuizLayoutAnswerListItem />
                            </>
                        )}
                    </Region>
                    <ThemeImage
                        name="question_illustration"
                        src={srcQuestionIllustration ?? '${image.library.url}habboway/quiz_question.png'}
                        layout={{ position: 'absolute', left: 330, width: 122, top: 1, height: 300 }}
                    />
                </Region>
            )}
            {(visibleFailurePane ?? false) && (
                <Region
                    name="failure_pane"
                    layout={{ position: 'absolute', left: 0, width: 498, top: 50, height: 320, justifyContent: 'center' }}
                >
                    <Region
                        name="failure_results"
                        layout={{ position: 'absolute', width: 4, top: 27, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionFailureResults ?? ''}
                            textStyle="text-style-il-heading-title"
                        />
                    </Region>
                    <Region
                        name="failure_advice"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 291, top: 70, height: 4, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionFailureAdvice ?? ''}
                            textOptions={{ wordWrap: true, wordWrapWidth: 291, align: 'center' }}
                        />
                    </Region>
                    <ThemeImage
                        name="failure_illustration"
                        src={srcFailureIllustration ?? '${image.library.url}habboway/quiz_failure.png'}
                        layout={{ position: 'absolute', left: 146, width: 207, top: 106, height: 205 }}
                    />
                </Region>
            )}
            {(visibleSuccessPane ?? false) && (
                <Region
                    name="success_pane"
                    layout={{ position: 'absolute', left: 0, width: 498, top: 50, height: 320, justifyContent: 'center' }}
                >
                    <Region
                        name="success_results"
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 421, top: 27, height: 4, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionSuccessResults ?? ''}
                            textStyle="text-style-il-heading-title"
                            textOptions={{ wordWrap: true, wordWrapWidth: 421, align: 'center' }}
                        />
                    </Region>
                    <ThemeImage
                        name="success_illustration"
                        src={srcSuccessIllustration ?? '${image.library.url}habboway/quiz_success.png'}
                        layout={{ position: 'absolute', left: 141, width: 217, top: 88, height: 215 }}
                    />
                </Region>
            )}
            {(visibleAnalysisPane ?? false) && (
                <HabboWayQuizLayoutAnalysisPane {...analysisPane} />
            )}
            <WidgetSlot
                widgetType="separator"
                layout={{ position: 'absolute', left: 6, width: 485, bottom: 81, height: 30 }}
            />
            <HabboWayQuizLayoutPrevNextButtons {...prevNextButtons} />
            {(visibleFailureButtons ?? false) && (
                <Region
                    name="failure_buttons"
                    layout={{ position: 'absolute', left: 0, width: 498, bottom: 31, height: 65 }}
                >
                    <Button
                        variant="101"
                        name="review_button"
                        tintColor="#bbbbbb"
                        onPointerTap={onReviewButton}
                        layout={{ position: 'absolute', left: 16, width: 197, top: 0, height: 53 }}
                    >
                        {t('habbo.way.quiz.review.button')}
                    </Button>
                    <Button
                        variant="101"
                        name="exit_button"
                        tintColor="#bbbbbb"
                        onPointerTap={onExitButton}
                        layout={{ position: 'absolute', right: 17, width: 183, top: 0, height: 53 }}
                    >
                        {t('habbo.way.quiz.exit.button')}
                    </Button>
                    {/* `label` is hidden and has no name to show it by */}
                </Region>
            )}
            {(visibleExitButtonContainer ?? false) && (
                <Region
                    name="exit_button_container"
                    layout={{ position: 'absolute', left: 0, width: 499, bottom: 31, height: 65, justifyContent: 'center' }}
                >
                    <Button
                        variant="101"
                        name="exit_button"
                        tintColor="#bbbbbb"
                        onPointerTap={onExitButton2}
                        layout={{ position: 'absolute', width: 183, top: 0, height: 53 }}
                    >
                        {t('habbo.way.quiz.exit.button')}
                    </Button>
                    {(visibleRetakeTimeNotice ?? false) && (
                        <Region
                            name="retake_time_notice"
                            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 126, top: 43, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionRetakeTimeNotice ?? t('habbo.way.quiz.wait.indication')}
                                textStyle="text-style-il-small"
                            />
                        </Region>
                    )}
                </Region>
            )}
        </Frame>
    );
};

/** Row template `question` of HabboWayQuizLayout - pass real rows through its `items…` slot. */
export interface HabboWayQuizLayoutQuestionItemProps {
    captionQuestion?: string;
    layout?: BoxLayout;
}

export const HabboWayQuizLayoutQuestionItem = ({ captionQuestion, layout }: HabboWayQuizLayoutQuestionItemProps) => {
    return (
        <Region
            name="question"
            layout={{ width: 339, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionQuestion ?? 'question'}
                textOptions={{ fill: '#555555', wordWrap: true, wordWrapWidth: 339 }}
            />
        </Region>
    );
};

/** Row template `answer_list` of HabboWayQuizLayout - pass real rows through its `items…` slot. */
export interface HabboWayQuizLayoutAnswerListItemProps {
    layout?: BoxLayout;
    onRadiobutton?: () => void;
}

export const HabboWayQuizLayoutAnswerListItem = ({ layout, onRadiobutton }: HabboWayQuizLayoutAnswerListItemProps) => {
    return (
        <Region
            name="answer_list"
            layout={{ flexShrink: 0, flexDirection: 'column', gap: 10, ...layout }}
        >
            <RadioButton
                variant="100"
                onPointerTap={onRadiobutton}
                layout={{ width: 318, height: 16, flexShrink: 0, minHeight: 0, maxHeight: 100 }}
            >
                answer
            </RadioButton>
        </Region>
    );
};

/** Named region `analysis_pane` of HabboWayQuizLayout - configured through the parent's `analysisPane` prop. */
export interface HabboWayQuizLayoutAnalysisPaneProps {
    captionAnswer?: string;
    captionExplanation?: string;
    captionQuestion?: string;
    layout?: BoxLayout;
    srcAnswerIllustration?: string;
    srcExplanationIllustration?: string;
    srcSeparator?: string;
    visibleAnalysisPane?: boolean;
}

export const HabboWayQuizLayoutAnalysisPane = ({ captionAnswer, captionExplanation, captionQuestion, layout, srcAnswerIllustration, srcExplanationIllustration, srcSeparator, visibleAnalysisPane }: HabboWayQuizLayoutAnalysisPaneProps) => {
    return (
        (visibleAnalysisPane ?? false) && (
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 20, width: 477, top: 69, height: 297, ...layout }}
            >
                <Region
                    name="analysis_pane"
                    layout={{ flexDirection: 'column', width: '100%' }}
                >
                    <Region layout={{ flexShrink: 0, flexDirection: 'column', gap: 10 }}>
                        <Region
                            name="question"
                            layout={{ width: 455, height: 35, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionQuestion ?? 'Lorem ipsum question text, not quite as long as it gets. Lorem ipsum question text, not quite as long as it gets.'}
                                textStyle="text-style-il-heading-1"
                                textOptions={{ wordWrap: true, wordWrapWidth: 455 }}
                            />
                        </Region>
                        <Region
                            name="answer_container"
                            layout={{ width: 448, height: 28, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="answer_illustration"
                                src={srcAnswerIllustration ?? layoutImage('help_decline_icon.png')}
                                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 16 }}
                            />
                            <Region
                                name="answer"
                                layout={{ position: 'absolute', left: 15, width: 433, top: 0, height: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionAnswer ?? 'Lorem ipsum answer text, not quite as long as it gets. Lorem ipsum answer text, not quite as long as it gets.'}
                                    textOptions={{ fill: '#555555', wordWrap: true, wordWrapWidth: 433 }}
                                />
                            </Region>
                        </Region>
                        <Border
                            variant="102"
                            name="explanation_container"
                            layout={{ width: 435, height: 40, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="explanation_illustration"
                                src={srcExplanationIllustration ?? layoutImage('help_habboway_dove_quizz.png')}
                                layout={{ position: 'absolute', left: 10, width: 30, top: 10, height: 30 }}
                            />
                            <Region
                                name="explanation"
                                layout={{ position: 'absolute', left: 42, width: 393, top: 0, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionExplanation ?? 'Lorem ipsum explanation text, not quite as long as it gets. Lorem ipsum explanation text, not quite as long as it gets.'}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 393 }}
                                />
                            </Region>
                        </Border>
                        <ThemeImage
                            name="separator"
                            src={srcSeparator ?? layoutImage('illumina_light_separator_horizontal.png')}
                            layout={{ width: 450, height: 16, flexShrink: 0 }}
                        />
                    </Region>
                </Region>
            </ScrollArea>
        )
    );
};

/** Named region `prev_next_buttons` of HabboWayQuizLayout - configured through the parent's `prevNextButtons` prop. */
export interface HabboWayQuizLayoutPrevNextButtonsProps {
    layout?: BoxLayout;
    onNextButton?: () => void;
    onPrevButton?: () => void;
}

export const HabboWayQuizLayoutPrevNextButtons = ({ layout, onNextButton, onPrevButton }: HabboWayQuizLayoutPrevNextButtonsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="prev_next_buttons"
            layout={{ position: 'absolute', left: 0, width: 498, bottom: 31, height: 65, ...layout }}
        >
            <ContainerButton
                variant="101"
                name="prev_button"
                tintColor="#bbbbbb"
                onPointerTap={onPrevButton}
                layout={{ position: 'absolute', left: 16, width: 208, top: 0, height: 53 }}
            >
                <Region layout={{ position: 'absolute', left: 11, top: 11, flexDirection: 'row' }}>
                    <ThemeImage
                        src={layoutImage('help_habboway_prev.png')}
                        layout={{ width: 25, height: 30, flexShrink: 0 }}
                    />
                    <ThemeImage
                        src={layoutImage('illumina_light_separator_vertical.png')}
                        layout={{ width: 2, height: 20, flexShrink: 0 }}
                    />
                    <Region layout={{ width: 170, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
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
                tintColor="#bbbbbb"
                onPointerTap={onNextButton}
                layout={{ position: 'absolute', right: 17, width: 185, top: 0, height: 53 }}
            >
                <Region layout={{ position: 'absolute', left: 11, top: 11, flexDirection: 'row' }}>
                    <Region layout={{ width: 136, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('habbo.way.next.button')}
                            textStyle="text-style-il-button"
                        />
                    </Region>
                    <ThemeImage
                        src={layoutImage('illumina_light_separator_vertical.png')}
                        layout={{ width: 2, height: 20, flexShrink: 0 }}
                    />
                    <ThemeImage
                        src={layoutImage('help_habboway_next.png')}
                        layout={{ width: 25, height: 30, flexShrink: 0 }}
                    />
                    <Region layout={{ width: 11, height: 30, flexShrink: 0 }} />
                </Region>
            </ContainerButton>
            <Region
                name="prev_dimmer"
                backgroundColor="#e2e2e2"
                layout={{ position: 'absolute', left: 14, width: 240, top: 1, height: 58 }}
            />
            <Region
                name="next_dimmer"
                backgroundColor="#e2e2e2"
                layout={{ position: 'absolute', left: 243, width: 240, top: 1, height: 58 }}
            />
        </Region>
    );
};
