import { BoxLayout, Region } from '#base/theme';

/** Generated from `1159_growing_container_view_xml` (layout "container_view", 1000x0) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrowingContainerViewLayoutProps {
    layout?: BoxLayout;
    onContainer?: () => void;
}

export const GrowingContainerViewLayout = ({ layout, onContainer }: GrowingContainerViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1000, height: 0, ...layout }}>
            <Region
                name="container"
                onPointerTap={onContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 1000, top: 0, height: 0 }}
            />
        </Region>
    );
};
