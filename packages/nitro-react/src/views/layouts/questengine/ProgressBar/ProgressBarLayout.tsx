import { BoxLayout, Region } from '#base/theme';

import { ProgressBarLayoutProgressBarCont, ProgressBarLayoutProgressBarContProps } from './ProgressBarLayoutProgressBarCont';

/** Generated from `113_ProgressBar_xml` (layout "ProgressBar", 300x23) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ProgressBarLayoutProps {
    layout?: BoxLayout;
    progressBarCont?: ProgressBarLayoutProgressBarContProps;
}

export const ProgressBarLayout = ({ layout, progressBarCont }: ProgressBarLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 300, height: 23, ...layout }}>
            <ProgressBarLayoutProgressBarCont {...progressBarCont} />
        </Region>
    );
};
