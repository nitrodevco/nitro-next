import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `3044_ros_badword_xml` (layout "ros_badword", 200x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosBadwordLayoutProps {
    bgRegion?: ReactNode;
    captionBadwordTxt?: string;
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const RosBadwordLayout = ({ bgRegion, captionBadwordTxt, layout, onBgRegion }: RosBadwordLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 200, height: 20, ...layout }}>
            <Region
                name="badword_container"
                backgroundColor="#cc0000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="bg_region"
                    onPointerTap={onBgRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 111, top: 0, bottom: 0 }}
                >
                    {bgRegion}
                </Region>
                <Region
                    name="badword_txt"
                    layout={{ position: 'absolute', left: 4, right: -4, top: 1, bottom: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionBadwordTxt ?? 'PH Badword'}
                        textStyle="text-style-u-regular"
                    />
                </Region>
            </Region>
        </Region>
    );
};
