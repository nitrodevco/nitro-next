import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `button_zoom` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonZoomItemProps {
    captionTextZoom?: string;
    layout?: BoxLayout;
    onButtonZoom?: () => void;
    visibleButtonZoom?: boolean;
    visibleTextZoom?: boolean;
}

export const RoomToolsToolbarLayoutButtonZoomItem = ({ captionTextZoom, layout, onButtonZoom, visibleButtonZoom, visibleTextZoom }: RoomToolsToolbarLayoutButtonZoomItemProps) => {
    const t = useTranslation();

    return (
        (visibleButtonZoom ?? false) && (
            <Region
                name="button_zoom"
                tooltip={t('toolbar.icon.tooltip.zoom')}
                dynamicStyle="brightness_and_shadow_under"
                onPointerTap={onButtonZoom}
                cursor="pointer"
                layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
            >
                <Region layout={{ position: 'absolute', left: 0, width: 28, top: 0, height: 25 }} />
                <ThemeImage
                    src={layoutImage('roomtools_magnifier.png')}
                    layout={{ position: 'absolute', left: 3, width: 25, top: 0, height: 25 }}
                />
                {(visibleTextZoom ?? true) && (
                    <Region
                        name="text_zoom"
                        layout={{ position: 'absolute', left: 36, width: 90, top: 3, height: 14, maxWidth: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTextZoom ?? t('room.zoom.button.text')}
                            textStyle="text-style-u-button-tab"
                            textOptions={{ fill: '#bbbbbb' }}
                        />
                    </Region>
                )}
            </Region>
        )
    );
};
