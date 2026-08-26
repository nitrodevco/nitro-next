import { BoxLayout, Region } from '#base/theme';

/** Generated from `1976_button_shiny_large_5_xml` (layout "habbo_window_layout_button_shiny_large_5", 20x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ButtonShinyLarge5LayoutProps {
    layout?: BoxLayout;
}

export const ButtonShinyLarge5Layout = ({ layout }: ButtonShinyLarge5LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 28, ...layout }}>
            <Region
                name="_BTN_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 28, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            />
        </Region>
    );
};
