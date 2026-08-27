import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2881_guardian_chat_review_results_xml` (layout "guardian_chat_review_results", 248x280) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuardianChatReviewResultsLayoutProps {
    captionResultText?: string;
    captionVoteText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
    srcResultImage?: string;
    srcVoteImage?: string;
    srcVoteSeparator?: string;
}

export const GuardianChatReviewResultsLayout = ({ captionResultText, captionVoteText, layout, onClose, onCloseButton, srcResultImage, srcVoteImage, srcVoteSeparator }: GuardianChatReviewResultsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guardian_chat_review_results"
            name="guardian_chat_review_results"
            params={32769}
            caption={t('guide.bully.request.guide.results.final.title')}
            onClose={onClose}
            layout={{ width: 248, height: 280, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="103"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 246, top: 10, height: 55 }}
                >
                    <ThemeImage
                        name="result_image"
                        params={16}
                        src={srcResultImage ?? layoutImage('help_chat_review_decision_waiting_1.png')}
                        layout={{ position: 'absolute', left: 0, width: 56, top: 0, height: 53 }}
                    />
                    <Region
                        name="result_text"
                        params={16}
                        layout={{ position: 'absolute', left: 51, width: 113, top: 19, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionResultText ?? 'The user behaved well!'}
                            textStyle="text-style-il-heading-3"
                        />
                    </Region>
                </Border>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 216, top: 77, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('guide.bully.request.guide.results.final.votes')}
                        textStyle="text-style-il-heading-3"
                        textOptions={{ fill: '#444444' }}
                    />
                </Region>
                <Border
                    variant="102"
                    params={8536080}
                    layout={{ position: 'absolute', left: 7, width: 232, top: 96, height: 46 }}
                >
                    <Region
                        name="results"
                        params={147472}
                        layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column' }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 232, height: 46, flexShrink: 0 }}
                        >
                            <Region
                                name="vote_text"
                                params={3088}
                                layout={{ position: 'absolute', left: 20, width: 110, top: '50%', marginTop: -7, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionVoteText ?? 'The user behaved well'}
                                    textStyle="text-style-il-heading-3"
                                />
                            </Region>
                            <ThemeImage
                                name="vote_image"
                                params={16}
                                src={srcVoteImage ?? layoutImage('help_chat_review_decision_waiting_1.png')}
                                layout={{ position: 'absolute', left: 180, width: 52, top: 0, height: 47 }}
                            />
                            <ThemeImage
                                name="vote_separator"
                                params={16}
                                src={srcVoteSeparator ?? layoutImage('illumina_light_separator_horizontal.png')}
                                layout={{ position: 'absolute', left: 8, width: 216, top: 44, height: 3 }}
                            />
                        </Region>
                    </Region>
                </Border>
                <Region
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 246, bottom: 31, height: 99 }}
                >
                    <Region
                        params={3145936}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -89, width: 179, top: '50%', marginTop: -37.5, height: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('guide.bully.request.guide.results.thanks')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 179, align: 'center' }}
                        />
                    </Region>
                    <Button
                        variant="101"
                        name="close_button"
                        params={131281}
                        tintColor="#bbbbbb"
                        onPointerTap={onCloseButton}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -70, width: 140, top: 41, height: 52 }}
                    >
                        {t('alert.close.button')}
                    </Button>
                </Region>
                <WidgetSlot
                    widgetType="balloon"
                    params={147456}
                    options={{ 'balloon:arrow_pivot': 'left, middle' }}
                    layout={{ position: 'absolute', left: 229, width: 238, top: 105, height: 25 }}
                >
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 233, top: 0, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.bully.request.guide.results.your_vote')}
                            textStyle="text-style-il-regular-white"
                        />
                    </Region>
                </WidgetSlot>
            </Region>
        </Frame>
    );
};
