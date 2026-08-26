import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1205_badge_color_item_xml` (layout "badge_color_item", 15x15) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeColorItemLayoutProps {
    layout?: BoxLayout;
}

export const BadgeColorItemLayout = ({ layout }: BadgeColorItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 15, height: 15, ...layout }}>
            <Region
                name="container"
                params={17}
                layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
            >
                <ThemeImage
                    name="background"
                    params={2192}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                />
                <ThemeImage
                    name="foreground"
                    params={2192}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                />
                <ThemeImage
                    name="selected"
                    params={2192}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15 }}
                />
            </Region>
        </Region>
    );
};
