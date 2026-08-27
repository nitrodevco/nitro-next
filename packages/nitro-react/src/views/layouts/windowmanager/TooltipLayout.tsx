import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Generated from `2623_tooltip_xml` (layout "habbo_window_layout_tooltip", 20x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TooltipLayoutProps {
    captionBTNTEXT?: string;
    layout?: BoxLayout;
}

export const TooltipLayout = ({ captionBTNTEXT, layout }: TooltipLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 22, ...layout }}>
            <Region
                name="_BTN_TEXT"
                tags={[ '_EXCLUDE', '_INTERNAL', 'title' ]}
                params={2147486928}
                layout={{ position: 'absolute', left: '50%', marginLeft: -10, width: 20, top: '50%', marginTop: -5, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionBTNTEXT ?? ''}
                    textStyle="text-style-u-tool-tip"
                />
            </Region>
        </Region>
    );
};
