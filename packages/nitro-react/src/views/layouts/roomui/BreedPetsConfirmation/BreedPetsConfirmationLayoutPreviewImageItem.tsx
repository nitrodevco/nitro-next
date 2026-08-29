import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `preview_image` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPreviewImageItemProps {
    layout?: BoxLayout;
    srcPreviewImage?: string;
    tintPreviewImage?: string;
}

export const BreedPetsConfirmationLayoutPreviewImageItem = ({ layout, srcPreviewImage, tintPreviewImage }: BreedPetsConfirmationLayoutPreviewImageItemProps) => {
    return (
        <ThemeImage
            name="preview_image"
            src={srcPreviewImage}
            tint={tintPreviewImage}
            layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130, ...layout }}
        />
    );
};
