import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2925_guardian_chat_review_wait_for_voters_xml` (layout "guardian_chat_review_wait_for_voters", 279x499) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuardianChatReviewWaitForVotersLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const GuardianChatReviewWaitForVotersLayout = ({ layout, onClose }: GuardianChatReviewWaitForVotersLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guardian_chat_review_vote"
            name="guardian_chat_review_vote"
            params={32769}
            caption={t('guide.bully.request.guide.vote.title')}
            onClose={onClose}
            layout={{ width: 279, height: 499, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <WidgetSlot
                    widgetType="countdown"
                    name="countdown"
                    params={147472}
                    options={{ 'countdown:digits': '2' }}
                    layout={{ position: 'absolute', left: 207, width: 63, top: 8, height: 37 }}
                />
                <Region
                    params={147472}
                    layout={{ position: 'absolute', left: 14, width: 259, top: 42, height: 16, flexDirection: 'row' }}
                >
                    <Region
                        params={16}
                        layout={{ width: 193, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.bully.request.guide.vote.subtitle')}
                            textStyle="text-style-il-border"
                            textOptions={{ fill: '#222222' }}
                        />
                    </Region>
                    <Region
                        name="incident_time"
                        params={16}
                        layout={{ width: 66, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="(2 minutes ago)"
                            textStyle="text-style-il-small"
                            textOptions={{ fill: '#222222' }}
                        />
                    </Region>
                </Region>
                <Border
                    variant="105"
                    params={2064}
                    layout={{ position: 'absolute', left: 10, width: 258, top: 60, height: 265 }}
                >
                    <Region
                        params={208}
                        layout={{ position: 'absolute', left: 39, width: 180, top: 87, height: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={t('guide.bully.request.guide.vote.waiting')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 180, align: 'center' }}
                        />
                    </Region>
                    <ThemeImage
                        name="waiting_animation"
                        params={208}
                        src={layoutImage('help_chat_review_progress_big_1.png')}
                        layout={{ position: 'absolute', left: 110, width: 38, top: 123, height: 38 }}
                    />
                </Border>
                <Region
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 277, top: 316, height: 180 }}
                >
                    <Region
                        params={208}
                        layout={{ position: 'absolute', left: 39, width: 198, top: 23, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.bully.request.guide.vote.question')}
                            textStyle="text-style-il-border"
                            textOptions={{ fill: '#222222' }}
                        />
                    </Region>
                    <Region
                        params={147664}
                        layout={{ position: 'absolute', left: 24, width: 228, top: 41, height: 91, flexDirection: 'row' }}
                    >
                        <Region
                            params={147472}
                            layout={{ width: 76, height: 91, flexShrink: 0 }}
                        >
                            <Region
                                params={208}
                                layout={{ position: 'absolute', left: 4, width: 68, top: 75, height: 16, maxWidth: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('guide.bully.request.guide.vote.ok')}
                                    textOptions={{ fill: '#444444' }}
                                />
                            </Region>
                            <Region
                                name="vote_ok"
                                tooltip={t('guide.bully.request.guide.vote.ok.tooltip')}
                                params={131089}
                                layout={{ position: 'absolute', left: 0, width: 76, top: 0, height: 77 }}
                            >
                                <ThemeImage
                                    params={3280}
                                    src={layoutImage('help_chat_review_vote_ok.png')}
                                    layout={{ position: 'absolute', left: 0, width: 76, top: 0, height: 77 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            params={147472}
                            layout={{ width: 76, height: 91, flexShrink: 0 }}
                        >
                            <Region
                                params={208}
                                layout={{ position: 'absolute', left: 4, width: 68, top: 75, height: 16, maxWidth: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('guide.bully.request.guide.vote.bad')}
                                    textOptions={{ fill: '#444444' }}
                                />
                            </Region>
                            <Region
                                name="vote_bad"
                                tooltip={t('guide.bully.request.guide.vote.ok.tooltip')}
                                params={131089}
                                layout={{ position: 'absolute', left: 0, width: 76, top: 0, height: 77 }}
                            >
                                <ThemeImage
                                    params={3280}
                                    src={layoutImage('help_chat_review_vote_bad.png')}
                                    layout={{ position: 'absolute', left: 0, width: 76, top: 0, height: 77 }}
                                />
                            </Region>
                        </Region>
                        <Region
                            params={147472}
                            layout={{ width: 76, height: 91, flexShrink: 0 }}
                        >
                            <Region
                                params={208}
                                layout={{ position: 'absolute', left: 4, width: 68, top: 75, height: 16, maxWidth: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('guide.bully.request.guide.vote.very_bad')}
                                    textOptions={{ fill: '#444444' }}
                                />
                            </Region>
                            <Region
                                name="vote_very_bad"
                                tooltip={t('guide.bully.request.guide.vote.ok.tooltip')}
                                params={131089}
                                layout={{ position: 'absolute', left: 0, width: 76, top: 0, height: 77 }}
                            >
                                <ThemeImage
                                    params={3280}
                                    src={layoutImage('help_chat_review_vote_very_bad.png')}
                                    layout={{ position: 'absolute', left: 0, width: 76, top: 0, height: 77 }}
                                />
                            </Region>
                        </Region>
                    </Region>
                    <ThemeImage
                        params={16}
                        src={layoutImage('illumina_light_separator_horizontal.png')}
                        layout={{ position: 'absolute', left: 6, width: 265, top: 144, height: 3 }}
                    />
                    <Region
                        name="close_link"
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 277, top: 149, height: 24 }}
                    >
                        <Region
                            params={208}
                            layout={{ position: 'absolute', left: 44, width: 188, top: 2, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('guide.bully.request.guide.vote.close')}
                                textStyle="text-style-il-link-regular"
                                textOptions={{ fill: '#222222' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        params={17}
                        backgroundColor="#e2e2e2"
                        layout={{ position: 'absolute', left: 0, width: 277, top: 41, height: 77 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};
