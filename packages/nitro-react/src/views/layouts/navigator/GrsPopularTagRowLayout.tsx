import { BoxLayout, Region } from '#base/theme';

/** Generated from `3027_grs_popular_tag_row_xml` (layout "grs_popular_tag_row", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsPopularTagRowLayoutProps {
    layout?: BoxLayout;
}

export const GrsPopularTagRowLayout = ({ layout }: GrsPopularTagRowLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="row"
                params={16}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 270, top: 0, height: 20 }}
            />
        </Region>
    );
};
