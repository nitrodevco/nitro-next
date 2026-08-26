import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `3043_grs_front_page_search_big_xml` (layout "grs_front_page_search_big", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsFrontPageSearchBigLayoutProps {
    layout?: BoxLayout;
}

export const GrsFrontPageSearchBigLayout = ({ layout }: GrsFrontPageSearchBigLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="cont"
                params={145}
                layout={{ position: 'absolute', left: 0, width: 271, top: 0, height: 42 }}
            >
                <Border
                    variant="0"
                    name="button_area"
                    params={144}
                    layout={{ position: 'absolute', left: 0, width: 262, top: 0, height: 36 }}
                >
                    <Region
                        name="caption"
                        params={3145744}
                        layout={{ position: 'absolute', left: 44, width: 179, top: 10, height: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text="Search Caption Placeholder"
                            textOptions={{ fill: '#000000' }}
                        />
                    </Region>
                    <ThemeImage
                        name="icon"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 6, width: 32, top: 2, height: 32 }}
                    />
                </Border>
            </Region>
        </Region>
    );
};
