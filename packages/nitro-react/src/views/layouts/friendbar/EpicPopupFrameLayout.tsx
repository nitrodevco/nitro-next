import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `16_epic_popup_frame_xml` (layout "epic_popup_frame", 215x275) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface EpicPopupFrameLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
    srcContentStaticBitmap?: string;
}

export const EpicPopupFrameLayout = ({ layout, onClose, onCloseButton, srcContentStaticBitmap }: EpicPopupFrameLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            params={163841}
            onClose={onClose}
            layout={{ width: 215, height: 275, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    name="content_static_bitmap"
                    params={12730384}
                    src={srcContentStaticBitmap ?? layoutImage('common_loading_icon.png')}
                    layout={{ position: 'absolute', left: 6, width: 200, top: 2, height: 200, minWidth: 200, minHeight: 200 }}
                />
                <ThemeImage
                    params={1049744}
                    src={layoutImage('illumina_horizontal_separator.png')}
                    layout={{ position: 'absolute', left: 7, width: 199, top: 195, height: 14 }}
                />
                <Button
                    variant="101"
                    name="close_button"
                    params={1442897}
                    tintColor="#bbbbbb"
                    onPointerTap={onCloseButton}
                    layout={{ position: 'absolute', left: 78, width: 140, top: 201, height: 48 }}
                >
                    {t('alert.close.button')}
                </Button>
            </Region>
        </Frame>
    );
};
