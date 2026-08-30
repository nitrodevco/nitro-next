import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { CommunityGoalVotingLayoutCommunityVoteOneButtonItem } from './CommunityGoalVotingLayoutCommunityVoteOneButtonItem';
import { CommunityGoalVotingLayoutCommunityVoteTwoButtonItem } from './CommunityGoalVotingLayoutCommunityVoteTwoButtonItem';
import { CommunityGoalVotingLayoutGoalCaptionItem } from './CommunityGoalVotingLayoutGoalCaptionItem';
import { CommunityGoalVotingLayoutGoalInfoItem } from './CommunityGoalVotingLayoutGoalInfoItem';
import { CommunityGoalVotingLayoutMeterContainer, CommunityGoalVotingLayoutMeterContainerProps } from './CommunityGoalVotingLayoutMeterContainer';

/** Named region `community_goal` of CommunityGoalVotingLayout - configured through the parent's `communityGoal` prop. */
export interface CommunityGoalVotingLayoutCommunityGoalProps {
    captionCommunityTitle?: string;
    colorableTextColor?: string;
    itemsInfoContainer?: ReactNode;
    layout?: BoxLayout;
    meterContainer?: CommunityGoalVotingLayoutMeterContainerProps;
    srcBorderBar?: string;
    srcHdrLine?: string;
}

export const CommunityGoalVotingLayoutCommunityGoal = ({ captionCommunityTitle, colorableTextColor, itemsInfoContainer, layout, meterContainer, srcBorderBar, srcHdrLine }: CommunityGoalVotingLayoutCommunityGoalProps) => {
    const t = useTranslation();

    return (
        <Region
            name="community_goal"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="border_bar"
                src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                layout={{ position: 'absolute', left: 7, width: 12, top: 10, height: 4 }}
            />
            <ThemeText
                text={captionCommunityTitle ?? t('landing.view.community.headline')}
                textStyle="text-style-il-heading-3"
                textOptions={{ fill: colorableTextColor }}
                name="community_title"
                layout={{ position: 'absolute', left: 24, width: 154, top: 4, height: 14 }}
            />
            <ThemeImage
                name="hdr_line"
                src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
                layout={{ position: 'absolute', left: 193, width: 310, top: 10, height: 4 }}
            />
            <Region
                name="info_container"
                layout={{ position: 'absolute', left: 0, top: 20, flexDirection: 'column' }}
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
            <CommunityGoalVotingLayoutMeterContainer {...meterContainer} />
        </Region>
    );
};
