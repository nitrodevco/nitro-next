import { BoxLayout, Region } from '#base/theme';

import { CampaignLayoutCampaignContainer, CampaignLayoutCampaignContainerProps } from './CampaignLayoutCampaignContainer';

/** Generated from `135_Campaign_xml` (layout "QuestCampaign", 103x114) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CampaignLayoutProps {
    campaignContainer?: CampaignLayoutCampaignContainerProps;
    layout?: BoxLayout;
}

export const CampaignLayout = ({ campaignContainer, layout }: CampaignLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 103, height: 114, ...layout }}>
            <CampaignLayoutCampaignContainer {...campaignContainer} />
        </Region>
    );
};
