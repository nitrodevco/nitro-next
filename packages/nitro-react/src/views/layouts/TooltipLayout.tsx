import { BoxLayout, Region } from '#base/theme';

/** Generated from `2623_tooltip_xml` (layout "habbo_window_layout_tooltip", 20x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TooltipLayoutProps {
    layout?: BoxLayout;
}

export const TooltipLayout = ({ layout }: TooltipLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 22, ...layout }}>
            <Region
                name="_BTN_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                layout={{ position: 'absolute', left: 0, width: 20, top: 6, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            />
        </Region>
    );
};
