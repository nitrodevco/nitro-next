import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

/** Generated from `955_mannequin_widget_frame_xml` (layout "mannequin_widget", 388x220) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MannequinWidgetFrameLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const MannequinWidgetFrameLayout = ({ layout, onClose }: MannequinWidgetFrameLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('mannequin.widget.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 388, height: 220, minWidth: 388, minHeight: 220, ...layout }}
        />
    );
};
