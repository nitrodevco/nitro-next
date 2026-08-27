import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `72_moving_object_xml` (layout "moving object", 13x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MovingObjectLayoutProps {
    layout?: BoxLayout;
}

export const MovingObjectLayout = ({ layout }: MovingObjectLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 13, height: 25, ...layout }}>
            <ThemeImage
                params={16}
                src={undefined}
                layout={{ position: 'absolute', left: 0, width: 13, top: 0, height: 25 }}
            />
        </Region>
    );
};
