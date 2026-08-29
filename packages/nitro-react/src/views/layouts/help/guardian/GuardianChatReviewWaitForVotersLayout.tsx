import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2925_guardian_chat_review_wait_for_voters_xml` (layout "guardian_chat_review_wait_for_voters", 279x499) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuardianChatReviewWaitForVotersLayoutProps {
    captionIncidentTime?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseLink?: () => void;
    onVoteBad?: () => void;
    onVoteOk?: () => void;
    onVoteVeryBad?: () => void;
    srcWaitingAnimation?: string;
}

export const GuardianChatReviewWaitForVotersLayout = ({ captionIncidentTime, layout, onClose, onCloseLink, onVoteBad, onVoteOk, onVoteVeryBad, srcWaitingAnimation }: GuardianChatReviewWaitForVotersLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guardian_chat_review_vote"
            name="guardian_chat_review_vote"
            caption={t('guide.bully.request.guide.vote.title')}
            onClose={onClose}
            layout={{ width: 279, height: 499, ...layout }}
        >
            <WidgetSlot
                widgetType="countdown"
                name="countdown"
                options={{ 'countdown:digits': '2' }}
                layout={{ position: 'absolute', left: 207, width: 63, top: 8, height: 37 }}
            />
            <Region layout={{ position: 'absolute', left: 14, top: 42, flexDirection: 'row' }}>
                <Region layout={{ width: 193, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('guide.bully.request.guide.vote.subtitle')}
                        textStyle="text-style-il-border"
                        textOptions={{ fill: '#222222' }}
                    />
                </Region>
                <Region
                    name="incident_time"
                    layout={{ width: 66, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionIncidentTime ?? '(2 minutes ago)'}
                        textStyle="text-style-il-small"
                        textOptions={{ fill: '#222222' }}
                    />
                </Region>
            </Region>
            <Border
                variant="105"
                layout={{ position: 'absolute', left: 10, width: 258, top: 60, bottom: 174, justifyContent: 'center' }}
            >
                <Region layout={{ position: 'absolute', width: 180, top: 87, height: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <ThemeText
                        text={t('guide.bully.request.guide.vote.waiting')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 180, align: 'center' }}
                    />
                </Region>
                <ThemeImage
                    name="waiting_animation"
                    src={srcWaitingAnimation ?? layoutImage('help_chat_review_progress_big_1.png')}
                    layout={{ position: 'absolute', width: 38, top: 123, height: 38 }}
                />
            </Border>
            <Region layout={{ position: 'absolute', left: 0, width: 277, bottom: 3, height: 180, justifyContent: 'center' }}>
                <Region layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 198, top: 23, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('guide.bully.request.guide.vote.question')}
                        textStyle="text-style-il-border"
                        textOptions={{ fill: '#222222' }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, top: 41, flexDirection: 'row' }}>
                    <Region layout={{ width: 76, height: 91, flexShrink: 0, justifyContent: 'center' }}>
                        <Region layout={{ position: 'absolute', width: 68, top: 75, height: 16, maxWidth: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('guide.bully.request.guide.vote.ok')}
                                textOptions={{ fill: '#444444' }}
                            />
                        </Region>
                        <Region
                            name="vote_ok"
                            tooltip={t('guide.bully.request.guide.vote.ok.tooltip')}
                            onPointerTap={onVoteOk}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 76, top: 0, height: 77, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                src={layoutImage('help_chat_review_vote_ok.png')}
                                layout={{ position: 'absolute', width: 76, alignSelf: 'center', height: 77 }}
                            />
                        </Region>
                    </Region>
                    <Region layout={{ width: 76, height: 91, flexShrink: 0, justifyContent: 'center' }}>
                        <Region layout={{ position: 'absolute', width: 68, top: 75, height: 16, maxWidth: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('guide.bully.request.guide.vote.bad')}
                                textOptions={{ fill: '#444444' }}
                            />
                        </Region>
                        <Region
                            name="vote_bad"
                            tooltip={t('guide.bully.request.guide.vote.ok.tooltip')}
                            onPointerTap={onVoteBad}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 76, top: 0, height: 77, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                src={layoutImage('help_chat_review_vote_bad.png')}
                                layout={{ position: 'absolute', width: 76, alignSelf: 'center', height: 77 }}
                            />
                        </Region>
                    </Region>
                    <Region layout={{ width: 76, height: 91, flexShrink: 0, justifyContent: 'center' }}>
                        <Region layout={{ position: 'absolute', width: 68, top: 75, height: 16, maxWidth: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('guide.bully.request.guide.vote.very_bad')}
                                textOptions={{ fill: '#444444' }}
                            />
                        </Region>
                        <Region
                            name="vote_very_bad"
                            tooltip={t('guide.bully.request.guide.vote.ok.tooltip')}
                            onPointerTap={onVoteVeryBad}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 76, top: 0, height: 77, justifyContent: 'center' }}
                        >
                            <ThemeImage
                                src={layoutImage('help_chat_review_vote_very_bad.png')}
                                layout={{ position: 'absolute', width: 76, alignSelf: 'center', height: 77 }}
                            />
                        </Region>
                    </Region>
                </Region>
                <ThemeImage
                    src={layoutImage('illumina_light_separator_horizontal.png')}
                    layout={{ position: 'absolute', left: 6, width: 265, top: 144, height: 3 }}
                />
                <Region
                    name="close_link"
                    onPointerTap={onCloseLink}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 277, top: 149, height: 24, justifyContent: 'center' }}
                >
                    <Region layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 188, top: 2, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('guide.bully.request.guide.vote.close')}
                            textStyle="text-style-il-link-regular"
                            textOptions={{ fill: '#222222' }}
                        />
                    </Region>
                </Region>
                <Region
                    backgroundColor="#e2e2e2"
                    layout={{ position: 'absolute', left: 0, width: 277, top: 41, height: 77 }}
                />
            </Region>
        </Frame>
    );
};
