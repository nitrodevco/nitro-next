import { BoxLayout, Region } from '#base/theme';
import { PetPreviewWidget, PetPreviewWidgetProps } from '#base/views/layouts/catalog/widgets/PetPreviewWidget';

/** Generated from `1573_petPreviewWidget_xml` (layout "petPreviewWidget", 158x207) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetPreviewWidgetLayoutProps {
    layout?: BoxLayout;
    petPreviewWidget?: PetPreviewWidgetProps;
}

export const PetPreviewWidgetLayout = ({ layout, petPreviewWidget }: PetPreviewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 158, height: 207, ...layout }}>
            <PetPreviewWidget
                layout={{ position: 'absolute', left: 174, width: 158, top: 154, height: 207 }}
                {...petPreviewWidget}
            />
        </Region>
    );
};
