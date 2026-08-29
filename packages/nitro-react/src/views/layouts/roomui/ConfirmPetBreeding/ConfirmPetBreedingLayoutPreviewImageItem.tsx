import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `preview_image` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPreviewImageItemProps {
    layout?: BoxLayout;
    srcPreviewImage?: string;
    tintPreviewImage?: string;
}

export const ConfirmPetBreedingLayoutPreviewImageItem = ({ layout, srcPreviewImage, tintPreviewImage }: ConfirmPetBreedingLayoutPreviewImageItemProps) => {
    return (
        <ThemeImage
            name="preview_image"
            src={srcPreviewImage}
            tint={tintPreviewImage}
            layout={{ width: 140, height: 70, flexShrink: 0, minWidth: 140, maxWidth: 140, minHeight: 70, maxHeight: 70, ...layout }}
        />
    );
};
