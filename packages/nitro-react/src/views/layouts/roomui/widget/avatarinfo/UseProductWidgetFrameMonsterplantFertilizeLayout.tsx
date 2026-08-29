import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

/** Generated from `900_use_product_widget_frame_monsterplant_fertilize_xml` (layout "use_product_widget_frame_monsterplant_fertilize", 388x220) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductWidgetFrameMonsterplantFertilizeLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const UseProductWidgetFrameMonsterplantFertilizeLayout = ({ layout, onClose }: UseProductWidgetFrameMonsterplantFertilizeLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('useproduct.widget.title.monsterplant_fertilize')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 388, height: 220, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }} />
        </Frame>
    );
};
