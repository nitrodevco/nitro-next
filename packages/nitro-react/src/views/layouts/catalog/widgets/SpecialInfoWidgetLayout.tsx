import { BoxLayout, Region } from '#base/theme';
import { SpecialInfoWidget2, SpecialInfoWidget2Props } from '#base/views/layouts/catalog/widgets/SpecialInfoWidget2';

/** Generated from `1618_specialInfoWidget_xml` (layout "specialInfoWidget", 142x73) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SpecialInfoWidgetLayoutProps {
    layout?: BoxLayout;
    specialInfoWidget?: SpecialInfoWidget2Props;
}

export const SpecialInfoWidgetLayout = ({ layout, specialInfoWidget }: SpecialInfoWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 142, height: 73, ...layout }}>
            <SpecialInfoWidget2
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                {...specialInfoWidget}
            />
        </Region>
    );
};
