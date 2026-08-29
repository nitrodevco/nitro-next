import { Border, BoxLayout, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

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
                                layout={{ position: 'absolute', left: 15, width: 433, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
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
                                layout={{ position: 'absolute', left: 42, width: 393, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
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
