import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `88_community_goal_voting_xml` (layout "community_goal_voting", 516x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CommunityGoalVotingLayoutProps {
    captionCommunityTitle?: string;
    captionCommunityTotalStatus?: string;
    itemsInfoContainer?: ReactNode;
    layout?: BoxLayout;
    srcBorderBar?: string;
    srcHdrLine?: string;
    srcMeterLevel0?: string;
    srcMeterLevel1?: string;
    srcMeterLevel1Icon?: string;
    srcMeterLevel1IconLocked?: string;
    srcMeterLevel2?: string;
    srcMeterLevel2Icon?: string;
    srcMeterLevel2IconLocked?: string;
    srcMeterLevel3?: string;
    srcMeterLevel3Icon?: string;
    srcMeterLevel3IconLocked?: string;
    srcMeterNeedle?: string;
}

export const CommunityGoalVotingLayout = ({ captionCommunityTitle, captionCommunityTotalStatus, itemsInfoContainer, layout, srcBorderBar, srcHdrLine, srcMeterLevel0, srcMeterLevel1, srcMeterLevel1Icon, srcMeterLevel1IconLocked, srcMeterLevel2, srcMeterLevel2Icon, srcMeterLevel2IconLocked, srcMeterLevel3, srcMeterLevel3Icon, srcMeterLevel3IconLocked, srcMeterNeedle }: CommunityGoalVotingLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 516, height: 200, ...layout }}>
            <Region
                name="community_goal"
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 516, top: 0, height: 200 }}
            >
                <ThemeImage
                    name="border_bar"
                    params={16}
                    src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 7, width: 12, top: 10, height: 4 }}
                />
                <Region
                    name="community_title"
                    tags={[ 'COLORABLE' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 24, width: 154, top: 4, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCommunityTitle ?? t('landing.view.community.headline')}
                        textStyle="text-style-il-heading-3"
                    />
                </Region>
                <ThemeImage
                    name="hdr_line"
                    params={16}
                    src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 193, width: 310, top: 10, height: 4 }}
                />
                <Region
                    name="info_container"
                    params={147472}
                    layout={{ position: 'absolute', left: 0, width: 300, top: 20, height: 150, flexDirection: 'column' }}
                >
                    {itemsInfoContainer ?? (
                        <>
                            <CommunityGoalVotingLayoutGoalCaptionItem />
                            <CommunityGoalVotingLayoutGoalInfoItem />
                            <CommunityGoalVotingLayoutCommunityVoteOneButtonItem />
                            <CommunityGoalVotingLayoutCommunityVoteTwoButtonItem />
                        </>
                    )}
                </Region>
                <Region
                    name="meter_container"
                    params={16400}
                    layout={{ position: 'absolute', left: 290, width: 226, top: 0, height: 200 }}
                >
                    <Region
                        name="community_total_status"
                        tags={[ 'COLORABLE' ]}
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 200, top: 145, height: 16, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionCommunityTotalStatus ?? t('landing.view.community.meter')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 200, align: 'center' }}
                        />
                    </Region>
                    <ThemeImage
                        name="meter_level_0"
                        params={16}
                        src={srcMeterLevel0 ?? '${image.library.url}reception/meter_level_0.png'}
                        layout={{ position: 'absolute', left: 20, width: 183, top: 0, height: 144 }}
                    />
                    <ThemeImage
                        name="meter_level_1"
                        params={16}
                        src={srcMeterLevel1 ?? '${image.library.url}reception/meter_level_1.png'}
                        layout={{ position: 'absolute', left: 30, width: 88, top: 39, height: 93 }}
                    />
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 30, width: 88, top: 39, height: 93 }}
                    >
                        <ThemeImage
                            name="meter_level_1_icon"
                            params={16}
                            src={srcMeterLevel1Icon}
                            layout={{ position: 'absolute', left: 30, width: 88, top: 39, height: 93 }}
                        />
                    </Region>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 30, width: 88, top: 39, height: 93 }}
                    >
                        <ThemeImage
                            name="meter_level_1_icon_locked"
                            params={16}
                            src={srcMeterLevel1IconLocked}
                            layout={{ position: 'absolute', left: 30, width: 88, top: 39, height: 93 }}
                        />
                    </Region>
                    <ThemeImage
                        name="meter_level_2"
                        params={16}
                        src={srcMeterLevel2 ?? '${image.library.url}reception/meter_level_2.png'}
                        layout={{ position: 'absolute', left: 50, width: 133, top: 10, height: 78 }}
                    />
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 50, width: 133, top: 10, height: 78 }}
                    >
                        <ThemeImage
                            name="meter_level_2_icon"
                            params={16}
                            src={srcMeterLevel2Icon}
                            layout={{ position: 'absolute', left: 50, width: 133, top: 10, height: 78 }}
                        />
                    </Region>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 50, width: 133, top: 10, height: 78 }}
                    >
                        <ThemeImage
                            name="meter_level_2_icon_locked"
                            params={16}
                            src={srcMeterLevel2IconLocked}
                            layout={{ position: 'absolute', left: 50, width: 133, top: 10, height: 78 }}
                        />
                    </Region>
                    <ThemeImage
                        name="meter_level_3"
                        params={16}
                        src={srcMeterLevel3 ?? '${image.library.url}reception/meter_level_3.png'}
                        layout={{ position: 'absolute', left: 125, width: 69, top: 39, height: 93 }}
                    />
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 125, width: 69, top: 39, height: 93 }}
                    >
                        <ThemeImage
                            name="meter_level_3_icon"
                            params={16}
                            src={srcMeterLevel3Icon}
                            layout={{ position: 'absolute', left: 125, width: 69, top: 39, height: 93 }}
                        />
                    </Region>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 125, width: 69, top: 39, height: 93 }}
                    >
                        <ThemeImage
                            name="meter_level_3_icon_locked"
                            params={16}
                            src={srcMeterLevel3IconLocked}
                            layout={{ position: 'absolute', left: 125, width: 69, top: 39, height: 93 }}
                        />
                    </Region>
                    <ThemeImage
                        name="meter_needle"
                        params={16}
                        src={srcMeterNeedle ?? layoutImage('landing_view_needle_meter_needle0.png')}
                        layout={{ position: 'absolute', left: 60, width: 96, top: 48, height: 85 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `goal_caption` of CommunityGoalVotingLayout - pass real rows through its `items…` slot. */
export interface CommunityGoalVotingLayoutGoalCaptionItemProps {
    captionGoalCaption?: string;
    layout?: BoxLayout;
}

export const CommunityGoalVotingLayoutGoalCaptionItem = ({ captionGoalCaption, layout }: CommunityGoalVotingLayoutGoalCaptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="goal_caption"
            tags={[ 'COLORABLE' ]}
            params={16}
            layout={{ width: 300, height: 24, flexShrink: 0, minWidth: 300, maxWidth: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionGoalCaption ?? t('landing.view.community.caption')}
                textStyle="text-style-il-heading-1"
            />
        </Region>
    );
};

/** Row template `goal_info` of CommunityGoalVotingLayout - pass real rows through its `items…` slot. */
export interface CommunityGoalVotingLayoutGoalInfoItemProps {
    captionGoalInfo?: string;
    layout?: BoxLayout;
}

export const CommunityGoalVotingLayoutGoalInfoItem = ({ captionGoalInfo, layout }: CommunityGoalVotingLayoutGoalInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="goal_info"
            tags={[ 'COLORABLE' ]}
            params={16}
            layout={{ width: 300, height: 16, flexShrink: 0, minWidth: 300, maxWidth: 300, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionGoalInfo ?? t('landing.view.community.info')}
                textOptions={{ wordWrap: true, wordWrapWidth: 300 }}
            />
        </Region>
    );
};

/** Row template `community_vote_one_button` of CommunityGoalVotingLayout - pass real rows through its `items…` slot. */
export interface CommunityGoalVotingLayoutCommunityVoteOneButtonItemProps {
    layout?: BoxLayout;
    onCommunityVoteOneButton?: () => void;
}

export const CommunityGoalVotingLayoutCommunityVoteOneButtonItem = ({ layout, onCommunityVoteOneButton }: CommunityGoalVotingLayoutCommunityVoteOneButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="100"
            name="community_vote_one_button"
            params={131089}
            onPointerTap={onCommunityVoteOneButton}
            layout={{ width: 250, height: 45, flexShrink: 0, minWidth: 250, maxWidth: 250, ...layout }}
        >
            {t('landing.view.community_catalog_button.text')}
        </Button>
    );
};

/** Row template `community_vote_two_button` of CommunityGoalVotingLayout - pass real rows through its `items…` slot. */
export interface CommunityGoalVotingLayoutCommunityVoteTwoButtonItemProps {
    layout?: BoxLayout;
    onCommunityVoteTwoButton?: () => void;
}

export const CommunityGoalVotingLayoutCommunityVoteTwoButtonItem = ({ layout, onCommunityVoteTwoButton }: CommunityGoalVotingLayoutCommunityVoteTwoButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="100"
            name="community_vote_two_button"
            params={131089}
            onPointerTap={onCommunityVoteTwoButton}
            layout={{ width: 250, height: 45, flexShrink: 0, minWidth: 250, maxWidth: 250, ...layout }}
        >
            {t('landing.view.community_catalog_button.text')}
        </Button>
    );
};
