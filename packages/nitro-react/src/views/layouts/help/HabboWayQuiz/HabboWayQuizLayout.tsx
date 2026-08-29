import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { HabboWayQuizLayoutAnalysisPane, HabboWayQuizLayoutAnalysisPaneProps } from './HabboWayQuizLayoutAnalysisPane';
import { HabboWayQuizLayoutAnswerListItem } from './HabboWayQuizLayoutAnswerListItem';
import { HabboWayQuizLayoutPrevNextButtons, HabboWayQuizLayoutPrevNextButtonsProps } from './HabboWayQuizLayoutPrevNextButtons';
import { HabboWayQuizLayoutQuestionItem } from './HabboWayQuizLayoutQuestionItem';

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
    separatorWidget?: ReactNode;
    separatorWidget2?: ReactNode;
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

export const HabboWayQuizLayout = ({ analysisPane, captionFailureAdvice, captionFailureResults, captionRetakeTimeNotice, captionSuccessResults, captionTopIndicator, itemsContents, layout, onClose, onExitButton, onExitButton2, onReviewButton, prevNextButtons, separatorWidget, separatorWidget2, srcFailureIllustration, srcIndicatorImage, srcQuestionIllustration, srcSuccessIllustration, visibleAnalysisPane, visibleExitButtonContainer, visibleFailureButtons, visibleFailurePane, visibleQuestionPane, visibleRetakeTimeNotice, visibleSuccessPane }: HabboWayQuizLayoutProps) => {
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
                {separatorWidget}
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
            >
                {separatorWidget2}
            </WidgetSlot>
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
