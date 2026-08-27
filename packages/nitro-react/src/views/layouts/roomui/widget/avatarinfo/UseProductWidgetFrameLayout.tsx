import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

/** Generated from `921_use_product_widget_frame_xml` (layout "use_product_widget_frame", 388x220) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductWidgetFrameLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const UseProductWidgetFrameLayout = ({ layout, onClose }: UseProductWidgetFrameLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('useproduct.widget.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 388, height: 220, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }} />
        </Frame>
    );
};
