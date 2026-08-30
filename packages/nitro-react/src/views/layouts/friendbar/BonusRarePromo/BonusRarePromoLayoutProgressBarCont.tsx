import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `progress_bar_cont` of BonusRarePromoLayout - configured through the parent's `progressBarCont` prop. */
export interface BonusRarePromoLayoutProgressBarContProps {
    barABkg?: ReactNode;
    captionStatus?: string;
    layout?: BoxLayout;
    srcBarAC?: string;
    srcBarAR?: string;
    srcBarC?: string;
    srcBarL?: string;
    srcBarR?: string;
    visibleBarABkg?: boolean;
}

export const BonusRarePromoLayoutProgressBarCont = ({ barABkg, captionStatus, layout, srcBarAC, srcBarAR, srcBarC, srcBarL, srcBarR, visibleBarABkg }: BonusRarePromoLayoutProgressBarContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="progress_bar_cont"
            layout={{ position: 'absolute', right: 0, width: 302, top: 30, height: 23, ...layout }}
        >
            <ThemeImage
                name="bar_l"
                src={srcBarL ?? layoutImage('achievement_ach_progressbar1.png')}
                layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 23 }}
            />
            <ThemeImage
                name="bar_c"
                src={srcBarC ?? layoutImage('achievement_ach_progressbar2.png')}
                layout={{ position: 'absolute', left: 4, right: 7, top: 0, height: 23 }}
            />
            <ThemeImage
                name="bar_r"
                src={srcBarR ?? layoutImage('achievement_ach_progressbar3.png')}
                layout={{ position: 'absolute', right: 3, width: 4, top: 0, height: 23 }}
            />
            {(visibleBarABkg ?? false) && (
                <Region
                    name="bar_a_bkg"
                    backgroundColor="#ffff00"
                    layout={{ position: 'absolute', left: 4, right: 6, top: 3, height: 17 }}
                >
                    {barABkg}
                </Region>
            )}
            <ThemeImage
                name="bar_a_c"
                src={srcBarAC ?? layoutImage('achievement_ach_progressbar4.png')}
                layout={{ position: 'absolute', left: 4, width: 142, top: 3, height: 17 }}
            />
            <ThemeImage
                name="bar_a_r"
                src={srcBarAR ?? layoutImage('achievement_ach_progressbar5.png')}
                layout={{ position: 'absolute', left: 145, width: 2, top: 3, height: 17 }}
            />
            <ThemeText
                text={captionStatus ?? t('landing.view.bonus.rare.status')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 178 }}
                name="status"
                verticalAlign="top"
                layout={{ position: 'absolute', right: 68, width: 178, top: 3, height: 17 }}
            />
        </Region>
    );
};
