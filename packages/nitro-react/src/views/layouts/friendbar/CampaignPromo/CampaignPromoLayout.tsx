import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { CampaignPromoLayoutButtonItem } from './CampaignPromoLayoutButtonItem';
import { CampaignPromoLayoutPromoTextItem } from './CampaignPromoLayoutPromoTextItem';
import { CampaignPromoLayoutPromoTitleItem } from './CampaignPromoLayoutPromoTitleItem';
import { CampaignPromoLayoutSpacingItem } from './CampaignPromoLayoutSpacingItem';
import { CampaignPromoLayoutSpacingItem2 } from './CampaignPromoLayoutSpacingItem2';

/** Generated from `1_campaign_promo_xml` (layout "campaing_promo", 500x130) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CampaignPromoLayoutProps {
    itemsContent?: ReactNode;
    layout?: BoxLayout;
    srcPromoBackground?: string;
}

export const CampaignPromoLayout = ({ itemsContent, layout, srcPromoBackground }: CampaignPromoLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 500, height: 130, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, maxWidth: 500 }}>
                <ThemeImage
                    name="promo_background"
                    src={srcPromoBackground}
                    layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 130 }}
                />
                <Region
                    name="content"
                    layout={{ position: 'absolute', left: 161, width: 275, alignSelf: 'center', marginTop: -1, marginBottom: 1, height: 96, flexDirection: 'column' }}
                >
                    {itemsContent ?? (
                        <>
                            <CampaignPromoLayoutPromoTitleItem />
                            <CampaignPromoLayoutSpacingItem />
                            <CampaignPromoLayoutPromoTextItem />
                            <CampaignPromoLayoutSpacingItem2 />
                            <CampaignPromoLayoutButtonItem />
                        </>
                    )}
                </Region>
            </Region>
        </Region>
    );
};
