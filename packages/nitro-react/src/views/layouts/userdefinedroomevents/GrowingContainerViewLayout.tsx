import { BoxLayout, Region } from '#base/theme';

/** Generated from `1159_growing_container_view_xml` (layout "container_view", 1000x0) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrowingContainerViewLayoutProps {
    container?: GrowingContainerViewLayoutContainerProps;
    layout?: BoxLayout;
}

export const GrowingContainerViewLayout = ({ container, layout }: GrowingContainerViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1000, height: 0, ...layout }}>
            <GrowingContainerViewLayoutContainer {...container} />
        </Region>
    );
};

/** Named region `container` of GrowingContainerViewLayout - configured through the parent's `container` prop. */
export interface GrowingContainerViewLayoutContainerProps {
    layout?: BoxLayout;
    onContainer?: () => void;
}

export const GrowingContainerViewLayoutContainer = ({ layout, onContainer }: GrowingContainerViewLayoutContainerProps) => {
    return (
        <Region
            name="container"
            onPointerTap={onContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 1000, top: 0, height: 0, ...layout }}
        />
    );
};
