import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

/** Generated from `906_use_product_widget_frame_monsterplant_xml` (layout "use_product_widget_frame_monsterplant", 388x220) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductWidgetFrameMonsterplantLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const UseProductWidgetFrameMonsterplantLayout = ({ layout, onClose }: UseProductWidgetFrameMonsterplantLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('useproduct.widget.title.monsterplant')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 388, height: 220, minWidth: 388, minHeight: 220, ...layout }}
        />
    );
};
