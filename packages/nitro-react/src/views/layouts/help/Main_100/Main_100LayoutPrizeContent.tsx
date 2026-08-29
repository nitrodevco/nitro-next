import { BoxLayout, Region } from '#base/theme';

import { Main_100LayoutPrizeTemplate, Main_100LayoutPrizeTemplateProps } from './Main_100LayoutPrizeTemplate';
import { Main_100LayoutPrizeTemplatePremium, Main_100LayoutPrizeTemplatePremiumProps } from './Main_100LayoutPrizeTemplatePremium';

/** Named region `prize_content` of Main_100Layout - configured through the parent's `prizeContent` prop. */
export interface Main_100LayoutPrizeContentProps {
    layout?: BoxLayout;
    prizeTemplate?: Main_100LayoutPrizeTemplateProps;
    prizeTemplatePremium?: Main_100LayoutPrizeTemplatePremiumProps;
}

export const Main_100LayoutPrizeContent = ({ layout, prizeTemplate, prizeTemplatePremium }: Main_100LayoutPrizeContentProps) => {
    return (
        <Region
            name="prize_content"
            layout={{ position: 'absolute', left: 196, right: 53, top: 2, bottom: 2, ...layout }}
        >
            <Main_100LayoutPrizeTemplate {...prizeTemplate} />
            <Main_100LayoutPrizeTemplatePremium {...prizeTemplatePremium} />
        </Region>
    );
};
