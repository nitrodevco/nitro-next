import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { BonusRarePromoLayoutProgressBarCont, BonusRarePromoLayoutProgressBarContProps } from './BonusRarePromoLayoutProgressBarCont';

/** Named region `mid_container` of BonusRarePromoLayout - configured through the parent's `midContainer` prop. */
export interface BonusRarePromoLayoutMidContainerProps {
    captionHeader?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
    progressBarCont?: BonusRarePromoLayoutProgressBarContProps;
}

export const BonusRarePromoLayoutMidContainer = ({ captionHeader, colorableTextColor, layout, progressBarCont }: BonusRarePromoLayoutMidContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="mid_container"
            layout={{ width: 304, height: 53, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionHeader ?? t('landing.view.bonus.rare.header')}
                textStyle="text-style-u-headline-medium"
                textOptions={{ fill: colorableTextColor }}
                name="header"
                layout={{ position: 'absolute', width: 246, top: 5, height: 21 }}
            />
            <BonusRarePromoLayoutProgressBarCont {...progressBarCont} />
        </Region>
    );
};
