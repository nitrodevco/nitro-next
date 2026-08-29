import { BoxLayout, Region } from '#base/theme';
import { TrophyWidget, TrophyWidgetProps } from '#base/views/layouts/catalog/widgets/TrophyWidget';

/** Generated from `1623_trophyWidget_xml` (layout "trophyWidget", 110x127) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TrophyWidgetLayoutProps {
    layout?: BoxLayout;
    trophyWidget?: TrophyWidgetProps;
}

export const TrophyWidgetLayout = ({ layout, trophyWidget }: TrophyWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 110, height: 127, ...layout }}>
            <TrophyWidget
                layout={{ position: 'absolute', left: 28, width: 110, top: 75, height: 127 }}
                {...trophyWidget}
            />
        </Region>
    );
};
