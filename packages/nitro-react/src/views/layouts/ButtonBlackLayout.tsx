import { BoxLayout, Region } from '#base/theme';

/** Generated from `2799_button_black_xml` (layout "habbo_window_layout_button_black", 20x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ButtonBlackLayoutProps {
    layout?: BoxLayout;
}

export const ButtonBlackLayout = ({ layout }: ButtonBlackLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 22, ...layout }}>
            <Region
                name="_BTN_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            />
        </Region>
    );
};
