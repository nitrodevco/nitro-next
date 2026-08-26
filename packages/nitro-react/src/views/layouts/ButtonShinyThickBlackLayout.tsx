import { BoxLayout, Region } from '#base/theme';

/** Generated from `2645_button_shiny_thick_black_xml` (layout "habbo_window_layout_button_shiny_thick_black", 20x28) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ButtonShinyThickBlackLayoutProps {
    layout?: BoxLayout;
}

export const ButtonShinyThickBlackLayout = ({ layout }: ButtonShinyThickBlackLayoutProps) => {
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
