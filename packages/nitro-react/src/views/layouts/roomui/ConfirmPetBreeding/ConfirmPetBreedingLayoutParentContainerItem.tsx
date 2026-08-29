import { Border, BoxLayout } from '#base/theme';

import { ConfirmPetBreedingLayoutPreviewList, ConfirmPetBreedingLayoutPreviewListProps } from './ConfirmPetBreedingLayoutPreviewList';

/** Row template `parentContainer` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutParentContainerItemProps {
    layout?: BoxLayout;
    previewList?: ConfirmPetBreedingLayoutPreviewListProps;
    visiblePreviewList?: boolean;
}

export const ConfirmPetBreedingLayoutParentContainerItem = ({ layout, previewList, visiblePreviewList }: ConfirmPetBreedingLayoutParentContainerItemProps) => {
    return (
        <Border
            variant="103"
            name="parentContainer"
            layout={{ width: 314, height: 140, flexShrink: 0, minWidth: 310, maxWidth: 314, ...layout }}
        >
            {(visiblePreviewList ?? true) && (
                <ConfirmPetBreedingLayoutPreviewList {...previewList} />
            )}
        </Border>
    );
};
