import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1017_confirm_pet_breeding_xml` (layout "confirm_pet_breeding", 320x623) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ConfirmPetBreedingLayoutProps {
    buttonList?: ConfirmPetBreedingLayoutButtonListProps;
    elementList?: ConfirmPetBreedingLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const ConfirmPetBreedingLayout = ({ buttonList, elementList, layout, onClose }: ConfirmPetBreedingLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            caption={t('breedpets.confirmation.widget.title')}
            onClose={onClose}
            layout={{ width: 320, height: 623, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ConfirmPetBreedingLayoutElementList {...elementList} />
                <ConfirmPetBreedingLayoutButtonList {...buttonList} />
            </Region>
        </Frame>
    );
};

/** Row template `title` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutTitleItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutTitleItem = ({ captionTitle, layout, tags }: ConfirmPetBreedingLayoutTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="title"
            tags={tags}
            layout={{ width: 264, height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionTitle ?? t('breedpets.confirmation.widget.request')}
                textOptions={{ wordWrap: true, wordWrapWidth: 264 }}
            />
        </Region>
    );
};

/** Row template `pet_name` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPetNameItemProps {
    captionPetName?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutPetNameItem = ({ captionPetName, layout, tags }: ConfirmPetBreedingLayoutPetNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pet_name"
            tags={tags}
            layout={{ width: 140, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPetName ?? t('breedpets.widget.pet1.name')}
                textStyle="text-style-il-heading-2"
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};

/** Row template `preview_image` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPreviewImageItemProps {
    layout?: BoxLayout;
    srcPreviewImage?: string;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutPreviewImageItem = ({ layout, srcPreviewImage, tags }: ConfirmPetBreedingLayoutPreviewImageItemProps) => {
    return (
        <ThemeImage
            name="preview_image"
            tags={tags}
            src={srcPreviewImage}
            layout={{ width: 140, height: 70, flexShrink: 0, minWidth: 140, maxWidth: 140, minHeight: 70, maxHeight: 70, ...layout }}
        />
    );
};

/** Row template `pet_level` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPetLevelItemProps {
    captionPetLevel?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutPetLevelItem = ({ captionPetLevel, layout, tags }: ConfirmPetBreedingLayoutPetLevelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pet_level"
            tags={tags}
            layout={{ width: 140, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPetLevel ?? t('breedpets.widget.pet1.level')}
                textStyle="text-style-il-heading-3"
                textOptions={{ wordWrap: true, wordWrapWidth: 140, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `pet_description` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPetDescriptionItemProps {
    captionPetDescription?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutPetDescriptionItem = ({ captionPetDescription, layout, tags }: ConfirmPetBreedingLayoutPetDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pet_description"
            tags={tags}
            layout={{ width: 140, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPetDescription ?? t('breedpets.widget.pet1.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 140, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `pet1_itemlist` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPet1ItemlistItemProps {
    itemsPet1Itemlist?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutPet1ItemlistItem = ({ itemsPet1Itemlist, layout, tags }: ConfirmPetBreedingLayoutPet1ItemlistItemProps) => {
    return (
        <Region
            name="pet1_itemlist"
            tags={tags}
            layout={{ flexShrink: 0, minWidth: 140, maxWidth: 140, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPet1Itemlist ?? (
                <>
                    <ConfirmPetBreedingLayoutPetNameItem />
                    <ConfirmPetBreedingLayoutPreviewImageItem />
                    <ConfirmPetBreedingLayoutPetLevelItem />
                    <ConfirmPetBreedingLayoutPetDescriptionItem />
                </>
            )}
        </Region>
    );
};

/** Row template `pet_name` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPetNameItem2Props {
    captionPetName?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutPetNameItem2 = ({ captionPetName, layout, tags }: ConfirmPetBreedingLayoutPetNameItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="pet_name"
            tags={tags}
            layout={{ width: 140, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPetName ?? t('breedpets.widget.pet2.name')}
                textStyle="text-style-il-heading-2"
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};

/** Row template `preview_image2` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPreviewImage2ItemProps {
    layout?: BoxLayout;
    srcPreviewImage2?: string;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutPreviewImage2Item = ({ layout, srcPreviewImage2, tags }: ConfirmPetBreedingLayoutPreviewImage2ItemProps) => {
    return (
        <ThemeImage
            name="preview_image2"
            tags={tags}
            src={srcPreviewImage2}
            layout={{ width: 140, height: 70, flexShrink: 0, minWidth: 140, maxWidth: 140, minHeight: 70, maxHeight: 70, ...layout }}
        />
    );
};

/** Row template `pet_level` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPetLevelItem2Props {
    captionPetLevel?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutPetLevelItem2 = ({ captionPetLevel, layout, tags }: ConfirmPetBreedingLayoutPetLevelItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="pet_level"
            tags={tags}
            layout={{ width: 140, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPetLevel ?? t('breedpets.widget.pet2.level')}
                textStyle="text-style-il-heading-3"
                textOptions={{ wordWrap: true, wordWrapWidth: 140, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `pet_description` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPetDescriptionItem2Props {
    captionPetDescription?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutPetDescriptionItem2 = ({ captionPetDescription, layout, tags }: ConfirmPetBreedingLayoutPetDescriptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="pet_description"
            tags={tags}
            layout={{ width: 140, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPetDescription ?? t('breedpets.widget.pet2.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 140, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `pet2_itemlist` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPet2ItemlistItemProps {
    itemsPet2Itemlist?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutPet2ItemlistItem = ({ itemsPet2Itemlist, layout, tags }: ConfirmPetBreedingLayoutPet2ItemlistItemProps) => {
    return (
        <Region
            name="pet2_itemlist"
            tags={tags}
            layout={{ flexShrink: 0, minWidth: 140, maxWidth: 140, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPet2Itemlist ?? (
                <>
                    <ConfirmPetBreedingLayoutPetNameItem2 />
                    <ConfirmPetBreedingLayoutPreviewImage2Item />
                    <ConfirmPetBreedingLayoutPetLevelItem2 />
                    <ConfirmPetBreedingLayoutPetDescriptionItem2 />
                </>
            )}
        </Region>
    );
};

/** Named region `preview_list` of ConfirmPetBreedingLayout - configured through the parent's `previewList` prop. */
export interface ConfirmPetBreedingLayoutPreviewListProps {
    itemsPreviewList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutPreviewList = ({ itemsPreviewList, layout, tags }: ConfirmPetBreedingLayoutPreviewListProps) => {
    return (
        <Region
            name="preview_list"
            tags={tags}
            layout={{ position: 'absolute', left: 10, top: 7, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsPreviewList ?? (
                <>
                    <ConfirmPetBreedingLayoutPet1ItemlistItem />
                    <ConfirmPetBreedingLayoutPet2ItemlistItem />
                </>
            )}
        </Region>
    );
};

/** Row template `parentContainer` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutParentContainerItemProps {
    layout?: BoxLayout;
    previewList?: ConfirmPetBreedingLayoutPreviewListProps;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutParentContainerItem = ({ layout, previewList, tags }: ConfirmPetBreedingLayoutParentContainerItemProps) => {
    return (
        <Border
            variant="103"
            name="parentContainer"
            tags={tags}
            layout={{ width: 314, height: 140, flexShrink: 0, minWidth: 310, maxWidth: 314, ...layout }}
        >
            <ConfirmPetBreedingLayoutPreviewList {...previewList} />
        </Border>
    );
};

/** Row template `puppy_namelist` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutPuppyNamelistItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutPuppyNamelistItem = ({ layout, tags }: ConfirmPetBreedingLayoutPuppyNamelistItemProps) => {
    const t = useTranslation();
    const [ puppyNameInputValue, setPuppyNameInputValue ] = useState('');

    return (
        <Region
            name="puppy_namelist"
            tags={tags}
            layout={{ width: 300, height: 52, flexShrink: 0, minWidth: 300, flexDirection: 'column', gap: 2, ...layout }}
        >
            <Region layout={{ width: 70, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('breedpets.confirmation.widget.baby.name')}
                    textStyle="text-style-il-heading-3"
                />
            </Region>
            <Border
                variant="105"
                tintColor="#f0f0f0"
                layout={{ width: 295, height: 31, flexShrink: 0 }}
            >
                <TextInput
                    value={puppyNameInputValue}
                    onChange={setPuppyNameInputValue}
                    maxLength={32}
                    layout={{ position: 'absolute', left: 5, width: 284, top: 5, height: 20 }}
                />
            </Border>
        </Region>
    );
};

/** Row template `breeding.title` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutBreedingTitleItemProps {
    captionBreedingTitle?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutBreedingTitleItem = ({ captionBreedingTitle, layout, tags }: ConfirmPetBreedingLayoutBreedingTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="breeding.title"
            tags={tags}
            layout={{ width: 78, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionBreedingTitle ?? t('breedpets.confirmation.widget.breeding.info')}
                textStyle="text-style-il-heading-3"
            />
        </Region>
    );
};

/** Named region `breeds1` of ConfirmPetBreedingLayout - configured through the parent's `breeds1` prop. */
export interface ConfirmPetBreedingLayoutBreeds1Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutBreeds1 = ({ layout, tags }: ConfirmPetBreedingLayoutBreeds1Props) => {
    return (
        <Region
            name="breeds1"
            tags={tags}
            layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 25, flexDirection: 'row', gap: 2, ...layout }}
        />
    );
};

/** Row template `rarityCategory1.container` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutRarityCategory1ContainerItemProps {
    breeds1?: ConfirmPetBreedingLayoutBreeds1Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutRarityCategory1ContainerItem = ({ breeds1, layout, tags }: ConfirmPetBreedingLayoutRarityCategory1ContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rarityCategory1.container"
            tags={tags}
            layout={{ width: 280, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 104, top: 5, height: 15, minWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('breedpets.confirmation.widget.raritycategory.1')}
                    textStyle="text-style-il-heading-3"
                />
            </Region>
            <ConfirmPetBreedingLayoutBreeds1 {...breeds1} />
        </Region>
    );
};

/** Named region `breeds2` of ConfirmPetBreedingLayout - configured through the parent's `breeds2` prop. */
export interface ConfirmPetBreedingLayoutBreeds2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutBreeds2 = ({ layout, tags }: ConfirmPetBreedingLayoutBreeds2Props) => {
    return (
        <Region
            name="breeds2"
            tags={tags}
            layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 25, flexDirection: 'row', gap: 2, ...layout }}
        />
    );
};

/** Row template `rarityCategory2.container` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutRarityCategory2ContainerItemProps {
    breeds2?: ConfirmPetBreedingLayoutBreeds2Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutRarityCategory2ContainerItem = ({ breeds2, layout, tags }: ConfirmPetBreedingLayoutRarityCategory2ContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rarityCategory2.container"
            tags={tags}
            layout={{ width: 280, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 109, top: 5, height: 15, minWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('breedpets.confirmation.widget.raritycategory.2')}
                    textStyle="text-style-il-heading-3"
                />
            </Region>
            <ConfirmPetBreedingLayoutBreeds2 {...breeds2} />
        </Region>
    );
};

/** Named region `breeds3` of ConfirmPetBreedingLayout - configured through the parent's `breeds3` prop. */
export interface ConfirmPetBreedingLayoutBreeds3Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutBreeds3 = ({ layout, tags }: ConfirmPetBreedingLayoutBreeds3Props) => {
    return (
        <Region
            name="breeds3"
            tags={tags}
            layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 25, flexDirection: 'row', gap: 2, ...layout }}
        />
    );
};

/** Row template `rarityCategory3.container` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutRarityCategory3ContainerItemProps {
    breeds3?: ConfirmPetBreedingLayoutBreeds3Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutRarityCategory3ContainerItem = ({ breeds3, layout, tags }: ConfirmPetBreedingLayoutRarityCategory3ContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rarityCategory3.container"
            tags={tags}
            layout={{ width: 280, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 143, top: 5, height: 15, minWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('breedpets.confirmation.widget.raritycategory.3')}
                    textStyle="text-style-il-heading-3"
                />
            </Region>
            <ConfirmPetBreedingLayoutBreeds3 {...breeds3} />
        </Region>
    );
};

/** Named region `breeds4` of ConfirmPetBreedingLayout - configured through the parent's `breeds4` prop. */
export interface ConfirmPetBreedingLayoutBreeds4Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutBreeds4 = ({ layout, tags }: ConfirmPetBreedingLayoutBreeds4Props) => {
    return (
        <Region
            name="breeds4"
            tags={tags}
            layout={{ position: 'absolute', left: 90, width: 200, top: 0, height: 20, flexDirection: 'row', gap: 2, ...layout }}
        />
    );
};

/** Row template `rarityCategory4.container` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutRarityCategory4ContainerItemProps {
    breeds4?: ConfirmPetBreedingLayoutBreeds4Props;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutRarityCategory4ContainerItem = ({ breeds4, layout, tags }: ConfirmPetBreedingLayoutRarityCategory4ContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rarityCategory4.container"
            tags={tags}
            layout={{ width: 280, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 129, top: 5, height: 15, minWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('breedpets.confirmation.widget.raritycategory.4')}
                    textStyle="text-style-il-heading-3"
                />
            </Region>
            <ConfirmPetBreedingLayoutBreeds4 {...breeds4} />
        </Region>
    );
};

/** Named region `category_list` of ConfirmPetBreedingLayout - configured through the parent's `categoryList` prop. */
export interface ConfirmPetBreedingLayoutCategoryListProps {
    itemsCategoryList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutCategoryList = ({ itemsCategoryList, layout, tags }: ConfirmPetBreedingLayoutCategoryListProps) => {
    return (
        <Region
            name="category_list"
            tags={tags}
            layout={{ width: 282, height: 109, flexShrink: 0, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsCategoryList ?? (
                <>
                    <ConfirmPetBreedingLayoutRarityCategory1ContainerItem />
                    <ConfirmPetBreedingLayoutRarityCategory2ContainerItem />
                    <ConfirmPetBreedingLayoutRarityCategory3ContainerItem />
                    <ConfirmPetBreedingLayoutRarityCategory4ContainerItem />
                </>
            )}
        </Region>
    );
};

/** Named region `element_list` of ConfirmPetBreedingLayout - configured through the parent's `elementList` prop. */
export interface ConfirmPetBreedingLayoutElementListProps {
    captionInfo?: string;
    captionText?: string;
    categoryList?: ConfirmPetBreedingLayoutCategoryListProps;
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutElementList = ({ captionInfo, captionText, categoryList, itemsElementList, layout, tags }: ConfirmPetBreedingLayoutElementListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="element_list"
            tags={tags}
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

/** Row template `save_button` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutSaveButtonItemProps {
    layout?: BoxLayout;
    onSaveButton?: () => void;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutSaveButtonItem = ({ layout, onSaveButton, tags }: ConfirmPetBreedingLayoutSaveButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="102"
            name="save_button"
            tags={tags}
            onPointerTap={onSaveButton}
            layout={{ width: 122, height: 30, flexShrink: 0, minWidth: 122, maxWidth: 122, ...layout }}
        >
            {t('breedpets.confirmation.widget.button.breed')}
        </Button>
    );
};

/** Row template `cancel_button` of ConfirmPetBreedingLayout - pass real rows through its `items…` slot. */
export interface ConfirmPetBreedingLayoutCancelButtonItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutCancelButtonItem = ({ layout, onCancelButton, tags }: ConfirmPetBreedingLayoutCancelButtonItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="cancel_button"
            tags={tags}
            onPointerTap={onCancelButton}
            cursor="pointer"
            layout={{ width: 295, height: 21, flexShrink: 0, minWidth: 295, maxWidth: 295, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 295, top: 0, height: 16, minWidth: 295, maxWidth: 295, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <ThemeText
                    text={t('breedpets.confirmation.widget.button.cancel')}
                    textStyle="text-style-il-link-regular"
                    textOptions={{ align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `button_list` of ConfirmPetBreedingLayout - configured through the parent's `buttonList` prop. */
export interface ConfirmPetBreedingLayoutButtonListProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ConfirmPetBreedingLayoutButtonList = ({ itemsButtonList, layout, tags }: ConfirmPetBreedingLayoutButtonListProps) => {
    return (
        <Region
            name="button_list"
            tags={tags}
            layout={{ position: 'absolute', left: 10, top: 524, minWidth: 295, maxWidth: 295, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsButtonList ?? (
                <>
                    <ConfirmPetBreedingLayoutSaveButtonItem />
                    <ConfirmPetBreedingLayoutCancelButtonItem />
                </>
            )}
        </Region>
    );
};
