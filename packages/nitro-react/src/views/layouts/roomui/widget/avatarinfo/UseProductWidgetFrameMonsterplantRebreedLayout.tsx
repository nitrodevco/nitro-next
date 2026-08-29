import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

/** Generated from `1000_use_product_widget_frame_monsterplant_rebreed_xml` (layout "use_product_widget_frame_monsterplant_rebreed", 388x220) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductWidgetFrameMonsterplantRebreedLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const UseProductWidgetFrameMonsterplantRebreedLayout = ({ layout, onClose }: UseProductWidgetFrameMonsterplantRebreedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('useproduct.widget.title.monsterplant_rebreed')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 388, height: 220, ...layout }}
        />
    );
};
