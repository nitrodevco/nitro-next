import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `preview_image_region` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutPreviewImageRegionItemProps {
    layout?: BoxLayout;
    onPreviewImageRegion?: () => void;
    srcPreviewImage?: string;
    tintPreviewImage?: string;
    visiblePreviewImage?: boolean;
}

export const UseProductControllerReviveMonsterplantLayoutPreviewImageRegionItem = ({ layout, onPreviewImageRegion, srcPreviewImage, tintPreviewImage, visiblePreviewImage }: UseProductControllerReviveMonsterplantLayoutPreviewImageRegionItemProps) => {
    return (
        <Region
            name="preview_image_region"
            onPointerTap={onPreviewImageRegion}
            cursor="pointer"
            layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130, ...layout }}
        >
            {(visiblePreviewImage ?? true) && (
                <ThemeImage
                    name="preview_image"
                    src={srcPreviewImage}
                    tint={tintPreviewImage}
                    layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 130, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130 }}
                />
            )}
        </Region>
    );
};
