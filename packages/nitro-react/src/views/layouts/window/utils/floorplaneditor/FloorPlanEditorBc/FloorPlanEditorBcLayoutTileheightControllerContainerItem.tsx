import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `tileheight_controller_container` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutTileheightControllerContainerItemProps {
    captionTileHeightText?: string;
    layout?: BoxLayout;
    srcTileHeightColormap?: string;
    srcTileHeightSliderTrack?: string;
    tintTileHeightColormap?: string;
    visibleTileHeightColormap?: boolean;
    visibleTileHeightSliderTrack?: boolean;
    visibleTileHeightText?: boolean;
}

export const FloorPlanEditorBcLayoutTileheightControllerContainerItem = ({ captionTileHeightText, layout, srcTileHeightColormap, srcTileHeightSliderTrack, tintTileHeightColormap, visibleTileHeightColormap, visibleTileHeightSliderTrack, visibleTileHeightText }: FloorPlanEditorBcLayoutTileheightControllerContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tileheight_controller_container"
            layout={{ width: 317, height: 48, flexShrink: 0, ...layout }}
        >
            {(visibleTileHeightText ?? true) && (
                <ThemeText
                    text={captionTileHeightText ?? t('floor.plan.editor.tile.height')}
                    name="tile_height_text"
                    layout={{ position: 'absolute', left: 0, width: 156, top: 4, height: 16 }}
                />
            )}
            {(visibleTileHeightColormap ?? true) && (
                <ThemeImage
                    name="tile_height_colormap"
                    src={srcTileHeightColormap}
                    tint={tintTileHeightColormap}
                    layout={{ position: 'absolute', left: 1, width: 315, top: 23, height: 19 }}
                />
            )}
            {(visibleTileHeightSliderTrack ?? true) && (
                <ThemeImage
                    name="tile_height_slider_track"
                    src={srcTileHeightSliderTrack ?? layoutImage('avatar_editor_avatar_editor_download_icon.png')}
                    layout={{ position: 'absolute', left: 0, width: 12, top: 29, height: 16 }}
                />
            )}
        </Region>
    );
};
