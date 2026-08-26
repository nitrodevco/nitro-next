import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `3_moving_object_floating_xml` (layout "moving_object_floating", 13x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MovingObjectFloatingLayoutProps {
    layout?: BoxLayout;
}

export const MovingObjectFloatingLayout = ({ layout }: MovingObjectFloatingLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 13, height: 25, ...layout }}>
            <ThemeImage
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 25 }}
            />
        </Region>
    );
};
