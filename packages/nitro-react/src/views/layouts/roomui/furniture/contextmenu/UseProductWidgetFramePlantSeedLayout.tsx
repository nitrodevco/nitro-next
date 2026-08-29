import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

/** Generated from `1074_use_product_widget_frame_plant_seed_xml` (layout "use_product_widget_frame_plant_seed", 388x220) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductWidgetFramePlantSeedLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const UseProductWidgetFramePlantSeedLayout = ({ layout, onClose }: UseProductWidgetFramePlantSeedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('useproduct.widget.title.plant_seed')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 388, height: 220, ...layout }}
        />
    );
};
