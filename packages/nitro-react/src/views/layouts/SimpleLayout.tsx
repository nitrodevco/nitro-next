import { BoxLayout, Region } from '#base/theme';

/** Generated from `1858_simple_xml` (layout "habbo_simple_window_layout", 100x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SimpleLayoutProps {
    layout?: BoxLayout;
}

export const SimpleLayout = ({ layout }: SimpleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 100, height: 100, ...layout }}>
            <Region
                name="frame"
                layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 100 }}
            >
                <Region
                    name="content_area"
                    layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 90 }}
                />
            </Region>
        </Region>
    );
};
