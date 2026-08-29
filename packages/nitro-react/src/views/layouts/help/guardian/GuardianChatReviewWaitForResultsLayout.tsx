import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2888_guardian_chat_review_wait_for_results_xml` (layout "guardian_chat_review_wait_for_results", 248x280) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuardianChatReviewWaitForResultsLayoutProps {
    captionVoteText?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
    srcVoteImage?: string;
    srcVoteSeparator?: string;
}

export const GuardianChatReviewWaitForResultsLayout = ({ captionVoteText, layout, onClose, onCloseButton, srcVoteImage, srcVoteSeparator }: GuardianChatReviewWaitForResultsLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guardian_chat_review_wait_for_results"
            name="guardian_chat_review_wait_for_results"
            caption={t('guide.bully.request.guide.results.title')}
            onClose={onClose}
            layout={{ width: 248, height: 280, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <Region layout={{ position: 'absolute', marginLeft: 30, marginRight: -30, width: 308, top: 12, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('guide.bully.request.guide.results.waiting.title')}
                        textStyle="text-style-il-heading-1"
                        textOptions={{ fill: '#888888' }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, width: 170, top: 37, height: 24, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <ThemeText
                        text={t('guide.bully.request.guide.results.waiting.description')}
                        textStyle="text-style-il-small"
                        textOptions={{ wordWrap: true, wordWrapWidth: 170, align: 'center' }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 5, width: 191, top: 77, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('guide.bully.request.guide.results.votes')}
                        textStyle="text-style-il-heading-3"
                        textOptions={{ fill: '#444444' }}
                    />
                </Region>
                <Border
                    variant="102"
                    layout={{ position: 'absolute', left: 7, width: 232, top: 96, height: 46 }}
                >
                    <Region
                        name="results"
                        layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column' }}
                    >
                        <Region layout={{ width: 232, height: 46, flexShrink: 0 }}>
                            <Region
                                name="vote_text"
                                layout={{ position: 'absolute', left: 20, width: 91, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionVoteText ?? 'User behaved well'}
                                    textStyle="text-style-il-heading-3"
                                />
                            </Region>
                            <ThemeImage
                                name="vote_image"
                                src={srcVoteImage ?? layoutImage('help_chat_review_decision_waiting_1.png')}
                                layout={{ position: 'absolute', left: 180, width: 52, top: 0, height: 47 }}
                            />
                            <ThemeImage
                                name="vote_separator"
                                src={srcVoteSeparator ?? layoutImage('illumina_light_separator_horizontal.png')}
                                layout={{ position: 'absolute', left: 8, width: 216, top: 44, height: 3 }}
                            />
                        </Region>
                    </Region>
                </Border>
                <Region layout={{ position: 'absolute', left: 0, width: 246, bottom: 31, height: 99, justifyContent: 'center' }}>
                    <Region layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 179, alignSelf: 'center', marginTop: -23.5, marginBottom: 23.5, height: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('guide.bully.request.guide.results.wait')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 179, align: 'center' }}
                        />
                    </Region>
                    <Button
                        variant="101"
                        name="close_button"
                        tintColor="#bbbbbb"
                        onPointerTap={onCloseButton}
                        layout={{ position: 'absolute', width: 140, top: 41, height: 52 }}
                    >
                        {t('alert.close.button')}
                    </Button>
                </Region>
                <WidgetSlot
                    widgetType="balloon"
                    options={{ 'balloon:arrow_pivot': 'left, middle' }}
                    layout={{ position: 'absolute', left: 229, width: 238, top: 105, height: 25 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 233, top: 0, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
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
