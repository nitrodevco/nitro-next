import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `button_camera` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonCameraItemProps {
    captionTextCamera?: string;
    layout?: BoxLayout;
    onButtonCamera?: () => void;
    visibleTextCamera?: boolean;
}

export const RoomToolsToolbarLayoutButtonCameraItem = ({ captionTextCamera, layout, onButtonCamera, visibleTextCamera }: RoomToolsToolbarLayoutButtonCameraItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_camera"
            tooltip={t('room.camera.button.tooltip')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonCamera}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 28, top: 5, height: 2 }} />
            <ThemeImage
                src={layoutImage('roomtools_camera.png')}
                layout={{ position: 'absolute', left: 2, width: 27, top: 0, height: 25 }}
            />
            {(visibleTextCamera ?? true) && (
                <ThemeText
                    text={captionTextCamera ?? t('room.camera.button.text')}
                    textStyle="text-style-u-button-tab"
                    textOptions={{ fill: '#bbbbbb' }}
                    name="text_camera"
                    layout={{ position: 'absolute', left: 36, width: 90, top: 3, height: 14, maxWidth: 90 }}
                />
            )}
        </Region>
    );
};
