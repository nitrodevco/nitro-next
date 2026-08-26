import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Frame, Region, ThemeImage } from '#base/theme';

/** Generated from `912_iro_room_thumbnail_camera_xml` (layout "iro_room_thumbnail_camera", 148x217) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface IroRoomThumbnailCameraLayoutProps {
    layout?: BoxLayout;
    onButtonCancel?: () => void;
    onButtonCapture?: () => void;
    onClose?: () => void;
}

export const IroRoomThumbnailCameraLayout = ({ layout, onButtonCancel, onButtonCapture, onClose }: IroRoomThumbnailCameraLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('navigator.thumbnail.camera.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 148, height: 217, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={16}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 14, width: 112, top: 12, height: 112 }}
                >
                    <ThemeImage
                        name="viewfinder"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 1, width: 110, top: 1, height: 110 }}
                    />
                </Region>
                <Region
                    params={786640}
                    layout={{ position: 'absolute', left: 4, width: 135, top: 138, height: 30, flexDirection: 'row', gap: 5 }}
                >
                    <ButtonThick
                        variant="6"
                        name="button_cancel"
                        params={131089}
                        tintColor="#ff0000"
                        onPointerTap={onButtonCancel}
                        layout={{ width: 65, height: 30, flexShrink: 0, minWidth: 65, maxWidth: 65 }}
                    >
                        {t('navigator.thumbnail.camera.title.cancel')}
                    </ButtonThick>
                    <ButtonThick
                        variant="6"
                        name="button_capture"
                        params={131089}
                        tintColor="#00ff00"
                        onPointerTap={onButtonCapture}
                        layout={{ width: 65, height: 30, flexShrink: 0, minWidth: 65, maxWidth: 65 }}
                    >
                        {t('navigator.thumbnail.camera.title.capture')}
                    </ButtonThick>
                </Region>
            </Region>
        </Frame>
    );
};
