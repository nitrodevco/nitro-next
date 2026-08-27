import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1207_badge_part_item_xml` (layout "badge_part_item", 41x41) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgePartItemLayoutProps {
    layout?: BoxLayout;
    onContainer?: () => void;
    srcPart?: string;
    srcSelected?: string;
}

export const BadgePartItemLayout = ({ layout, onContainer, srcPart, srcSelected }: BadgePartItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 41, height: 41, ...layout }}>
            <Region
                name="container"
                params={17}
                backgroundColor="#ffffff"
                onPointerTap={onContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 41 }}
            >
                <Border
                    variant="3"
                    name="background"
                    params={16}
                    tintColor="#e9e9e1"
                    layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 41 }}
                />
                <ThemeImage
                    name="part"
                    params={2192}
                    src={srcPart}
                    layout={{ position: 'absolute', left: 0, right: 2, top: 0, bottom: 2 }}
                />
                <ThemeImage
                    name="selected"
                    params={2192}
                    src={srcSelected}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </Region>
        </Region>
    );
};
