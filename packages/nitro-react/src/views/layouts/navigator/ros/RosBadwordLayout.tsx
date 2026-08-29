import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `3044_ros_badword_xml` (layout "ros_badword", 200x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosBadwordLayoutProps {
    captionBadwordTxt?: string;
    layout?: BoxLayout;
    onBgRegion?: () => void;
}

export const RosBadwordLayout = ({ captionBadwordTxt, layout, onBgRegion }: RosBadwordLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 200, height: 20, ...layout }}>
            <Region
                name="badword_container"
                backgroundColor="#cc0000"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 20 }}
            >
                <Region
                    name="bg_region"
                    onPointerTap={onBgRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20 }}
                />
                <Region
                    name="badword_txt"
                    layout={{ position: 'absolute', left: 4, width: 200, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
