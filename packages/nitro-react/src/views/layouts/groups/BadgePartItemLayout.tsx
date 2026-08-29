import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1207_badge_part_item_xml` (layout "badge_part_item", 41x41) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgePartItemLayoutProps {
    container?: BadgePartItemLayoutContainerProps;
    layout?: BoxLayout;
}

export const BadgePartItemLayout = ({ container, layout }: BadgePartItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 41, height: 41, ...layout }}>
            <BadgePartItemLayoutContainer {...container} />
        </Region>
    );
};

/** Named region `container` of BadgePartItemLayout - configured through the parent's `container` prop. */
export interface BadgePartItemLayoutContainerProps {
    layout?: BoxLayout;
    onContainer?: () => void;
    srcPart?: string;
    srcSelected?: string;
}

export const BadgePartItemLayoutContainer = ({ layout, onContainer, srcPart, srcSelected }: BadgePartItemLayoutContainerProps) => {
    return (
        <Region
            name="container"
            backgroundColor="#ffffff"
            onPointerTap={onContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 41, ...layout }}
        >
            <Border
                variant="3"
                name="background"
                tintColor="#e9e9e1"
                layout={{ position: 'absolute', left: 0, width: 41, top: 0, height: 41 }}
            />
            <ThemeImage
                name="part"
                src={srcPart}
                layout={{ position: 'absolute', left: 0, right: 2, top: 0, bottom: 2 }}
            />
            <ThemeImage
                name="selected"
                src={srcSelected}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
        </Region>
    );
};
