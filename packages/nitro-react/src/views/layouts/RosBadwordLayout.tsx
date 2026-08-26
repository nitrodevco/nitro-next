import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `3044_ros_badword_xml` (layout "ros_badword", 200x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RosBadwordLayoutProps {
    layout?: BoxLayout;
}

export const RosBadwordLayout = ({ layout }: RosBadwordLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 200, height: 20, ...layout }}>
            <Region
                name="badword_container"
                params={16}
                backgroundColor="#cc0000"
                layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 20 }}
            >
                <Region
                    name="bg_region"
                    params={17}
                    layout={{ position: 'absolute', left: 0, width: 111, top: 0, height: 20 }}
                />
                <Region
                    name="badword_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 4, width: 200, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text="PH Badword"
                        textStyle="text-style-u-regular"
                    />
                </Region>
            </Region>
        </Region>
    );
};
