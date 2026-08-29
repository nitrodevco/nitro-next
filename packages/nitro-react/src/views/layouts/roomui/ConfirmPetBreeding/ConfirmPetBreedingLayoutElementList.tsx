import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

import { ConfirmPetBreedingLayoutBreedingTitleItem } from './ConfirmPetBreedingLayoutBreedingTitleItem';
import { ConfirmPetBreedingLayoutCategoryList, ConfirmPetBreedingLayoutCategoryListProps } from './ConfirmPetBreedingLayoutCategoryList';
import { ConfirmPetBreedingLayoutParentContainerItem } from './ConfirmPetBreedingLayoutParentContainerItem';
import { ConfirmPetBreedingLayoutPuppyNamelistItem } from './ConfirmPetBreedingLayoutPuppyNamelistItem';
import { ConfirmPetBreedingLayoutTitleItem } from './ConfirmPetBreedingLayoutTitleItem';

/** Named region `element_list` of ConfirmPetBreedingLayout - configured through the parent's `elementList` prop. */
export interface ConfirmPetBreedingLayoutElementListProps {
    captionInfo?: string;
    captionText?: string;
    categoryList?: ConfirmPetBreedingLayoutCategoryListProps;
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
}

export const ConfirmPetBreedingLayoutElementList = ({ captionInfo, captionText, categoryList, itemsElementList, layout }: ConfirmPetBreedingLayoutElementListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="element_list"
            layout={{ position: 'absolute', left: 0, top: 0, maxWidth: 318, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <ConfirmPetBreedingLayoutTitleItem />
                    <ConfirmPetBreedingLayoutParentContainerItem />
                    <ConfirmPetBreedingLayoutPuppyNamelistItem />
                    <ConfirmPetBreedingLayoutBreedingTitleItem />
                </>
            )}
            <Border
                variant="102"
                layout={{ width: 295, height: 209, flexShrink: 0 }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 287, top: 10, height: 199, flexDirection: 'column', gap: 5 }}>
                    <Region
                        name="text"
                        layout={{ width: 286, height: 40, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionText ?? t('breedpets.confirmation.widget.text')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 286 }}
                        />
                    </Region>
                    <Region
                        name="info"
                        layout={{ width: 290, height: 40, flexShrink: 0, minWidth: 290, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfo ?? t('breedpets.confirmation.widget.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 290 }}
                        />
                    </Region>
                    <ConfirmPetBreedingLayoutCategoryList {...categoryList} />
                </Region>
            </Border>
        </Region>
    );
};
