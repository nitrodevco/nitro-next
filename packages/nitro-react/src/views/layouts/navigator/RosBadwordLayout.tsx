import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `3044_ros_badword_xml` (layout "ros_badword", 200x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosBadwordLayoutProps {
    badwordContainer?: RosBadwordLayoutBadwordContainerProps;
    layout?: BoxLayout;
}

export const RosBadwordLayout = ({ badwordContainer, layout }: RosBadwordLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 200, height: 20, ...layout }}>
            <RosBadwordLayoutBadwordContainer {...badwordContainer} />
        </Region>
    );
};

/** Named region `bg_region` of RosBadwordLayout - configured through the parent's `bgRegion` prop. */
export interface RosBadwordLayoutBgRegionProps {
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const RosBadwordLayoutBgRegion = ({ layout, onBgRegion }: RosBadwordLayoutBgRegionProps) => {
    return (
        <Region
            name="bg_region"
            params={17}
            onPointerTap={onBgRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20, ...layout }}
        />
    );
};

/** Named region `badword_container` of RosBadwordLayout - configured through the parent's `badwordContainer` prop. */
export interface RosBadwordLayoutBadwordContainerProps {
    bgRegion?: RosBadwordLayoutBgRegionProps;
    captionBadwordTxt?: string;
    layout?: BoxLayout;
}

export const RosBadwordLayoutBadwordContainer = ({ bgRegion, captionBadwordTxt, layout }: RosBadwordLayoutBadwordContainerProps) => {
    return (
        <Region
            name="badword_container"
            params={16}
            backgroundColor="#cc0000"
            layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 20, ...layout }}
        >
            <RosBadwordLayoutBgRegion {...bgRegion} />
            <Region
                name="badword_txt"
                params={16}
                layout={{ position: 'absolute', left: 4, width: 200, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBadwordTxt ?? 'PH Badword'}
                    textStyle="text-style-u-regular"
                />
            </Region>
        </Region>
    );
};
