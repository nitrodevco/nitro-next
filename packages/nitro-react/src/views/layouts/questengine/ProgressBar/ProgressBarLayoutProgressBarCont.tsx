import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `progress_bar_cont` of ProgressBarLayout - configured through the parent's `progressBarCont` prop. */
export interface ProgressBarLayoutProgressBarContProps {
    barABkg?: ReactNode;
    captionProgressTxt?: string;
    layout?: BoxLayout;
    srcBarAC?: string;
    srcBarAR?: string;
    srcBarC?: string;
    srcBarL?: string;
    srcBarR?: string;
}

export const ProgressBarLayoutProgressBarCont = ({ barABkg, captionProgressTxt, layout, srcBarAC, srcBarAR, srcBarC, srcBarL, srcBarR }: ProgressBarLayoutProgressBarContProps) => {
    return (
        <Region
            name="progress_bar_cont"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="bar_l"
                src={srcBarL ?? layoutImage('achievement_ach_progressbar1.png')}
                layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 23 }}
            />
            <ThemeImage
                name="bar_c"
                src={srcBarC ?? layoutImage('achievement_ach_progressbar2.png')}
                layout={{ position: 'absolute', left: 4, width: 1, top: 0, height: 23 }}
            />
            <ThemeImage
                name="bar_r"
                src={srcBarR ?? layoutImage('achievement_ach_progressbar3.png')}
                layout={{ position: 'absolute', left: 5, width: 4, top: 0, height: 23 }}
            />
            <Region
                name="bar_a_bkg"
                backgroundColor="#ffff00"
                layout={{ position: 'absolute', left: 4, width: 1, top: 3, height: 17 }}
            >
                {barABkg}
            </Region>
            <ThemeImage
                name="bar_a_c"
                src={srcBarAC ?? layoutImage('achievement_ach_progressbar4.png')}
                layout={{ position: 'absolute', left: 4, width: 1, top: 3, height: 17 }}
            />
            <ThemeImage
                name="bar_a_r"
                src={srcBarAR ?? layoutImage('achievement_ach_progressbar5.png')}
                layout={{ position: 'absolute', left: 5, width: 1, top: 3, height: 17 }}
            />
            <Region
                name="progress_txt"
                layout={{ position: 'absolute', left: 7, right: 211, top: 3, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionProgressTxt ?? 'Progress text'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 82 }}
                />
            </Region>
        </Region>
    );
};
