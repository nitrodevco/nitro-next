import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `preview_image2` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPreviewImage2ItemProps {
    layout?: BoxLayout;
    srcPreviewImage2?: string;
    tintPreviewImage2?: string;
}

export const ConfirmPetBreedingLayoutPreviewImage2Item = ({ layout, srcPreviewImage2, tintPreviewImage2 }: ConfirmPetBreedingLayoutPreviewImage2ItemProps) => {
    return (
        <ThemeImage
            name="preview_image2"
            src={srcPreviewImage2}
            tint={tintPreviewImage2}
            layout={{ width: 140, height: 70, flexShrink: 0, minWidth: 140, maxWidth: 140, minHeight: 70, maxHeight: 70, ...layout }}
        />
    );
};
