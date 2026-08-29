import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2899_guardian_chat_review_vote_xml` (layout "guardian_chat_review_vote", 279x499) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GuardianChatReviewVoteLayoutProps {
    captionIncidentTime?: string;
    chatlog?: GuardianChatReviewVoteLayoutChatlogProps;
    closeLink?: GuardianChatReviewVoteLayoutCloseLinkProps;
    layout?: BoxLayout;
    onClose?: () => void;
    voteBad?: GuardianChatReviewVoteLayoutVoteBadProps;
    voteOk?: GuardianChatReviewVoteLayoutVoteOkProps;
    voteVeryBad?: GuardianChatReviewVoteLayoutVoteVeryBadProps;
}

export const GuardianChatReviewVoteLayout = ({ captionIncidentTime, chatlog, closeLink, layout, onClose, voteBad, voteOk, voteVeryBad }: GuardianChatReviewVoteLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="guardian_chat_review_vote"
            name="guardian_chat_review_vote"
            params={98305}
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
                    layout={{ position: 'absolute', left: 14, top: 42, flexDirection: 'row' }}
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
                            text={captionIncidentTime ?? '(2 minutes ago)'}
                            textStyle="text-style-il-small"
                            textOptions={{ fill: '#222222' }}
                        />
                    </Region>
                </Region>
                <Border
                    variant="105"
                    params={2064}
                    layout={{ position: 'absolute', left: 10, width: 258, top: 60, bottom: 174 }}
                >
                    <GuardianChatReviewVoteLayoutChatlog {...chatlog} />
                </Border>
                <Region
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 277, bottom: 3, height: 180, justifyContent: 'center' }}
                >
                    <Region
                        params={208}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 198, top: 23, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('guide.bully.request.guide.vote.question')}
                            textStyle="text-style-il-border"
                            textOptions={{ fill: '#222222' }}
                        />
                    </Region>
                    <Region
                        params={147664}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, top: 41, flexDirection: 'row' }}
                    >
                        <Region
                            params={147472}
                            layout={{ width: 76, height: 91, flexShrink: 0, justifyContent: 'center' }}
                        >
                            <Region
                                params={208}
                                layout={{ position: 'absolute', width: 68, top: 75, height: 16, maxWidth: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('guide.bully.request.guide.vote.ok')}
                                    textOptions={{ fill: '#444444' }}
                                />
                            </Region>
                            <GuardianChatReviewVoteLayoutVoteOk {...voteOk} />
                        </Region>
                        <Region
                            params={147472}
                            layout={{ width: 76, height: 91, flexShrink: 0, justifyContent: 'center' }}
                        >
                            <Region
                                params={208}
                                layout={{ position: 'absolute', width: 68, top: 75, height: 16, maxWidth: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('guide.bully.request.guide.vote.bad')}
                                    textOptions={{ fill: '#444444' }}
                                />
                            </Region>
                            <GuardianChatReviewVoteLayoutVoteBad {...voteBad} />
                        </Region>
                        <Region
                            params={147472}
                            layout={{ width: 76, height: 91, flexShrink: 0, justifyContent: 'center' }}
                        >
                            <Region
                                params={208}
                                layout={{ position: 'absolute', width: 68, top: 75, height: 16, maxWidth: 68, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('guide.bully.request.guide.vote.very_bad')}
                                    textOptions={{ fill: '#444444' }}
                                />
                            </Region>
                            <GuardianChatReviewVoteLayoutVoteVeryBad {...voteVeryBad} />
                        </Region>
                    </Region>
                    <ThemeImage
                        params={16}
                        src={layoutImage('illumina_light_separator_horizontal.png')}
                        layout={{ position: 'absolute', left: 6, width: 265, top: 144, height: 3 }}
                    />
                    <GuardianChatReviewVoteLayoutCloseLink {...closeLink} />
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `reported_user_template` of GuardianChatReviewVoteLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewVoteLayoutReportedUserTemplateItemProps {
    captionMessage?: string;
    layout?: BoxLayout;
}

export const GuardianChatReviewVoteLayoutReportedUserTemplateItem = ({ captionMessage, layout }: GuardianChatReviewVoteLayoutReportedUserTemplateItemProps) => {
    return (
        <Region
            name="reported_user_template"
            params={147472}
            layout={{ width: 226, height: 22, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('help_chat_review_avatar_perpetrator.png')}
                layout={{ position: 'absolute', left: 0, width: 16, top: 3, height: 17 }}
            />
            <Region
                name="message"
                params={16}
                layout={{ position: 'absolute', left: 23, width: 203, top: 0, height: 22, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMessage ?? 'lorem ipsum blah blah'}
                    textStyle="text-style-il-regular-white"
                    textOptions={{ fill: '#a9322b', wordWrap: true, wordWrapWidth: 203 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `separator_template` of GuardianChatReviewVoteLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewVoteLayoutSeparatorTemplateItemProps {
    layout?: BoxLayout;
    srcSeparatorTemplate?: string;
}

export const GuardianChatReviewVoteLayoutSeparatorTemplateItem = ({ layout, srcSeparatorTemplate }: GuardianChatReviewVoteLayoutSeparatorTemplateItemProps) => {
    return (
        <ThemeImage
            name="separator_template"
            params={16}
            src={srcSeparatorTemplate ?? layoutImage('illumina_light_separator_horizontal.png')}
            layout={{ width: 226, height: 2, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `other_user_template` of GuardianChatReviewVoteLayout - pass real rows through its `items…` slot. */
export interface GuardianChatReviewVoteLayoutOtherUserTemplateItemProps {
    captionMessage?: string;
    layout?: BoxLayout;
}

export const GuardianChatReviewVoteLayoutOtherUserTemplateItem = ({ captionMessage, layout }: GuardianChatReviewVoteLayoutOtherUserTemplateItemProps) => {
    return (
        <Region
            name="other_user_template"
            params={147472}
            layout={{ width: 226, height: 22, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('help_chat_review_avatar_anonymous.png')}
                layout={{ position: 'absolute', left: 0, width: 16, top: 3, height: 17 }}
            />
            <Region
                name="message"
                params={16}
                layout={{ position: 'absolute', left: 23, width: 203, top: 0, height: 22, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMessage ?? 'lorem ipsum blah blah'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 203 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `chatlog` of GuardianChatReviewVoteLayout - configured through the parent's `chatlog` prop. */
export interface GuardianChatReviewVoteLayoutChatlogProps {
    itemsChatlog?: ReactNode;
    layout?: BoxLayout;
}

export const GuardianChatReviewVoteLayoutChatlog = ({ itemsChatlog, layout }: GuardianChatReviewVoteLayoutChatlogProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 12, width: 244, top: 2, bottom: 3, ...layout }}
        >
            <Region
                name="chatlog"
                params={2064}
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsChatlog ?? (
                    <>
                        <GuardianChatReviewVoteLayoutReportedUserTemplateItem />
                        <GuardianChatReviewVoteLayoutSeparatorTemplateItem />
                        <GuardianChatReviewVoteLayoutOtherUserTemplateItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `vote_ok` of GuardianChatReviewVoteLayout - configured through the parent's `voteOk` prop. */
export interface GuardianChatReviewVoteLayoutVoteOkProps {
    layout?: BoxLayout;
    onVoteOk?: () => void;
}

export const GuardianChatReviewVoteLayoutVoteOk = ({ layout, onVoteOk }: GuardianChatReviewVoteLayoutVoteOkProps) => {
    const t = useTranslation();

    return (
        <Region
            name="vote_ok"
            tooltip={t('guide.bully.request.guide.vote.ok.tooltip')}
            params={131089}
            onPointerTap={onVoteOk}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 76, top: 0, height: 77, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                params={3280}
                src={layoutImage('help_chat_review_vote_ok.png')}
                layout={{ position: 'absolute', width: 76, alignSelf: 'center', height: 77 }}
            />
        </Region>
    );
};

/** Named region `vote_bad` of GuardianChatReviewVoteLayout - configured through the parent's `voteBad` prop. */
export interface GuardianChatReviewVoteLayoutVoteBadProps {
    layout?: BoxLayout;
    onVoteBad?: () => void;
}

export const GuardianChatReviewVoteLayoutVoteBad = ({ layout, onVoteBad }: GuardianChatReviewVoteLayoutVoteBadProps) => {
    const t = useTranslation();

    return (
        <Region
            name="vote_bad"
            tooltip={t('guide.bully.request.guide.vote.bad.tooltip')}
            params={131089}
            onPointerTap={onVoteBad}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 76, top: 0, height: 77, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                params={3280}
                src={layoutImage('help_chat_review_vote_bad.png')}
                layout={{ position: 'absolute', width: 76, alignSelf: 'center', height: 77 }}
            />
        </Region>
    );
};

/** Named region `vote_very_bad` of GuardianChatReviewVoteLayout - configured through the parent's `voteVeryBad` prop. */
export interface GuardianChatReviewVoteLayoutVoteVeryBadProps {
    layout?: BoxLayout;
    onVoteVeryBad?: () => void;
}

export const GuardianChatReviewVoteLayoutVoteVeryBad = ({ layout, onVoteVeryBad }: GuardianChatReviewVoteLayoutVoteVeryBadProps) => {
    const t = useTranslation();

    return (
        <Region
            name="vote_very_bad"
            tooltip={t('guide.bully.request.guide.vote.very_bad.tooltip')}
            params={131089}
            onPointerTap={onVoteVeryBad}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 76, top: 0, height: 77, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                params={3280}
                src={layoutImage('help_chat_review_vote_very_bad.png')}
                layout={{ position: 'absolute', width: 76, alignSelf: 'center', height: 77 }}
            />
        </Region>
    );
};

/** Named region `close_link` of GuardianChatReviewVoteLayout - configured through the parent's `closeLink` prop. */
export interface GuardianChatReviewVoteLayoutCloseLinkProps {
    layout?: BoxLayout;
    onCloseLink?: () => void;
}

export const GuardianChatReviewVoteLayoutCloseLink = ({ layout, onCloseLink }: GuardianChatReviewVoteLayoutCloseLinkProps) => {
    const t = useTranslation();

    return (
        <Region
            name="close_link"
            params={17}
            onPointerTap={onCloseLink}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 277, top: 149, height: 24, justifyContent: 'center', ...layout }}
        >
            <Region
                params={208}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 188, top: 2, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('guide.bully.request.guide.vote.close')}
                    textStyle="text-style-il-link-regular"
                    textOptions={{ fill: '#222222' }}
                />
            </Region>
        </Region>
    );
};
