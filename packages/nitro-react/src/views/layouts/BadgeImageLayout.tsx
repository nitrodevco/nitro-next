import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `2475_badge_image_xml` (layout "badge_image", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeImageLayoutProps {
    layout?: BoxLayout;
}

export const BadgeImageLayout = ({ layout }: BadgeImageLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <Region
                params={2196}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            >
                <ThemeImage
                    name="bitmap"
                    params={2192}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
                <Region
                    name="region"
                    params={2193}
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
            </Region>
        </Region>
    );
};
