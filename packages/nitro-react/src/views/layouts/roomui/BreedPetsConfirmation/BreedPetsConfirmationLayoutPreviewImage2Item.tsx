import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `preview_image2` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPreviewImage2ItemProps {
    layout?: BoxLayout;
    srcPreviewImage2?: string;
    tintPreviewImage2?: string;
}

export const BreedPetsConfirmationLayoutPreviewImage2Item = ({ layout, srcPreviewImage2, tintPreviewImage2 }: BreedPetsConfirmationLayoutPreviewImage2ItemProps) => {
    return (
        <ThemeImage
            name="preview_image2"
            src={srcPreviewImage2}
            tint={tintPreviewImage2}
            layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130, ...layout }}
        />
    );
};
