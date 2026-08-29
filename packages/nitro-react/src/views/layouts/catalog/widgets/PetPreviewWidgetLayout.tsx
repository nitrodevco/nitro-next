import { BoxLayout, Region } from '#base/theme';
import { PetPreviewWidget2, PetPreviewWidget2Props } from '#base/views/layouts/catalog/widgets/PetPreviewWidget2';

/** Generated from `1573_petPreviewWidget_xml` (layout "petPreviewWidget", 158x207) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PetPreviewWidgetLayoutProps {
    layout?: BoxLayout;
    petPreviewWidget?: PetPreviewWidget2Props;
}

export const PetPreviewWidgetLayout = ({ layout, petPreviewWidget }: PetPreviewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 158, height: 207, ...layout }}>
            <PetPreviewWidget2
                layout={{ position: 'absolute', left: 174, width: 158, top: 154, height: 207 }}
                {...petPreviewWidget}
            />
        </Region>
    );
};
