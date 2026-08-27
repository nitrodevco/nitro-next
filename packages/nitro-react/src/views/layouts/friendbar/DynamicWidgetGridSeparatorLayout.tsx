import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `30_dynamic_widget_grid_separator_xml` (layout "dynamic_widget_grid_separator", 500x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DynamicWidgetGridSeparatorLayoutProps {
    captionSeparatorTitle?: string;
    layout?: BoxLayout;
    srcBorderBar?: string;
    srcHdrLine?: string;
}

export const DynamicWidgetGridSeparatorLayout = ({ captionSeparatorTitle, layout, srcBorderBar, srcHdrLine }: DynamicWidgetGridSeparatorLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 500, height: 20, ...layout }}>
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 20, flexDirection: 'row', gap: 6 }}
            >
                <ThemeImage
                    name="border_bar"
                    params={16}
                    src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ width: 12, height: 4, flexShrink: 0, minHeight: 4, maxHeight: 4 }}
                />
                <Region
                    name="separator_title"
                    tags={[ 'COLORABLE' ]}
                    params={16}
                    layout={{ width: 40, height: 14, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSeparatorTitle ?? 'Title PH'}
                        textStyle="text-style-il-heading-3"
                    />
                </Region>
                <ThemeImage
                    name="hdr_line"
                    params={16}
                    src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ width: 450, height: 4, flexShrink: 0, minHeight: 4, maxHeight: 4 }}
                />
            </Region>
        </Region>
    );
};
