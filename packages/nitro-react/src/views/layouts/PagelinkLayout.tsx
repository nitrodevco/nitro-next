import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `1518_pagelink_xml` (layout "pagelink", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PagelinkLayoutProps {
    layout?: BoxLayout;
}

export const PagelinkLayout = ({ layout }: PagelinkLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="pagelink"
                params={17}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                backgroundColor="#ffffff"
            >
                <ThemeText
                    text="0-99"
                    textOptions={{ fill: '#000000' }}
                />
            </Region>
        </Region>
    );
};
