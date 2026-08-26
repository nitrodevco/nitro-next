import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `2150_separator_xml` (layout "illumina_border", 30x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SeparatorLayoutProps {
    layout?: BoxLayout;
}

export const SeparatorLayout = ({ layout }: SeparatorLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 30, ...layout }}>
            <Region
                params={2192}
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
            >
                <ThemeImage
                    name="canvas"
                    params={2192}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
                <Region
                    name="children"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                />
            </Region>
        </Region>
    );
};
