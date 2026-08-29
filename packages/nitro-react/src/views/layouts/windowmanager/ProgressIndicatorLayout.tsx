import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `2478_progress_indicator_xml` (layout "progress_indicator", 8x8) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ProgressIndicatorLayoutProps {
    layout?: BoxLayout;
}

export const ProgressIndicatorLayout = ({ layout }: ProgressIndicatorLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 8, height: 8, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row', gap: 3 }}>
                <ThemeImage
                    src={undefined}
                    layout={{ width: 8, height: 8, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};
