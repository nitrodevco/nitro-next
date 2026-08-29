import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1205_badge_color_item_xml` (layout "badge_color_item", 15x15) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeColorItemLayoutProps {
    container?: BadgeColorItemLayoutContainerProps;
    layout?: BoxLayout;
}

export const BadgeColorItemLayout = ({ container, layout }: BadgeColorItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 15, height: 15, ...layout }}>
            <BadgeColorItemLayoutContainer {...container} />
        </Region>
    );
};

/** Named region `container` of BadgeColorItemLayout - configured through the parent's `container` prop. */
export interface BadgeColorItemLayoutContainerProps {
    layout?: BoxLayout;
    onContainer?: () => void;
    srcBackground?: string;
    srcForeground?: string;
    srcSelected?: string;
    tags?: string[];
}

export const BadgeColorItemLayoutContainer = ({ layout, onContainer, srcBackground, srcForeground, srcSelected, tags }: BadgeColorItemLayoutContainerProps) => {
    return (
        <Region
            name="container"
            tags={tags}
            onPointerTap={onContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 15, ...layout }}
        >
            <ThemeImage
                name="background"
                src={srcBackground}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <ThemeImage
                name="foreground"
                src={srcForeground}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <ThemeImage
                name="selected"
                src={srcSelected}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
        </Region>
    );
};
