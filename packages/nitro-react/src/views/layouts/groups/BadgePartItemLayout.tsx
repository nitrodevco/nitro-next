import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1207_badge_part_item_xml` (layout "badge_part_item", 41x41) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgePartItemLayoutProps {
    layout?: BoxLayout;
    onContainer?: () => void;
    srcPart?: string;
    srcSelected?: string;
    tintPart?: string;
    tintSelected?: string;
}

export const BadgePartItemLayout = ({ layout, onContainer, srcPart, srcSelected, tintPart, tintSelected }: BadgePartItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 41, height: 41, ...layout }}>
            <Region
                name="container"
                backgroundColor="#ffffff"
                onPointerTap={onContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="3"
                    name="background"
                    tintColor="#e9e9e1"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <ThemeImage
                    name="part"
                    src={srcPart}
                    tint={tintPart}
                    layout={{ position: 'absolute', left: 0, right: 2, top: 0, bottom: 2 }}
                />
                <ThemeImage
                    name="selected"
                    src={srcSelected}
                    tint={tintSelected}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </Region>
        </Region>
    );
};
