import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1067_breed_pets_confirmation_xml` (layout "breed_pets_confirmation", 274x387) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BreedPetsConfirmationLayoutProps {
    elementList?: BreedPetsConfirmationLayoutElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const BreedPetsConfirmationLayout = ({ elementList, layout, onClose }: BreedPetsConfirmationLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('breedpets.widget.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 274, height: 387, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <BreedPetsConfirmationLayoutElementList {...elementList} />
            </Region>
        </Frame>
    );
};

/** Row template `separator` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutSeparatorItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutSeparatorItem = ({ layout, tags }: BreedPetsConfirmationLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            tags={tags}
            layout={{ width: 274, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `description` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutDescriptionItemProps {
    captionDescription?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutDescriptionItem = ({ captionDescription, layout, tags }: BreedPetsConfirmationLayoutDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="description"
            tags={tags}
            layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDescription ?? t('breedpets.widget.text')}
                textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            />
        </Region>
    );
};

/** Row template `request` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutRequestItemProps {
    captionRequest?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutRequestItem = ({ captionRequest, layout, tags }: BreedPetsConfirmationLayoutRequestItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="request"
            tags={tags}
            layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRequest ?? t('breedpets.widget.request')}
                textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            />
        </Region>
    );
};

/** Row template `info` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutInfoItemProps {
    captionInfo?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutInfoItem = ({ captionInfo, layout, tags }: BreedPetsConfirmationLayoutInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="info"
            tags={tags}
            layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionInfo ?? t('breedpets.widget.info')}
                textStyle="text-style-u-italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            />
        </Region>
    );
};

/** Row template `plant_name` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlantNameItemProps {
    captionPlantName?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutPlantNameItem = ({ captionPlantName, layout, tags }: BreedPetsConfirmationLayoutPlantNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_name"
            tags={tags}
            layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantName ?? t('breedpets.widget.plant1.name')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};

/** Row template `preview_image` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPreviewImageItemProps {
    layout?: BoxLayout;
    srcPreviewImage?: string;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutPreviewImageItem = ({ layout, srcPreviewImage, tags }: BreedPetsConfirmationLayoutPreviewImageItemProps) => {
    return (
        <ThemeImage
            name="preview_image"
            tags={tags}
            src={srcPreviewImage}
            layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130, ...layout }}
        />
    );
};

/** Row template `plant_rarity_level` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlantRarityLevelItemProps {
    captionPlantRarityLevel?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutPlantRarityLevelItem = ({ captionPlantRarityLevel, layout, tags }: BreedPetsConfirmationLayoutPlantRarityLevelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_rarity_level"
            tags={tags}
            layout={{ width: 134, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantRarityLevel ?? t('breedpets.widget.plant1.raritylevel')}
                textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `plant_description` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlantDescriptionItemProps {
    captionPlantDescription?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutPlantDescriptionItem = ({ captionPlantDescription, layout, tags }: BreedPetsConfirmationLayoutPlantDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_description"
            tags={tags}
            layout={{ width: 122, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantDescription ?? t('breedpets.widget.plant1.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `plant1_itemlist` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlant1ItemlistItemProps {
    itemsPlant1Itemlist?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutPlant1ItemlistItem = ({ itemsPlant1Itemlist, layout, tags }: BreedPetsConfirmationLayoutPlant1ItemlistItemProps) => {
    return (
        <Region
            name="plant1_itemlist"
            tags={tags}
            layout={{ flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPlant1Itemlist ?? (
                <>
                    <BreedPetsConfirmationLayoutPlantNameItem />
                    <BreedPetsConfirmationLayoutPreviewImageItem />
                    <BreedPetsConfirmationLayoutPlantRarityLevelItem />
                    <BreedPetsConfirmationLayoutPlantDescriptionItem />
                </>
            )}
        </Region>
    );
};

/** Row template `plant_name` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlantNameItem2Props {
    captionPlantName?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutPlantNameItem2 = ({ captionPlantName, layout, tags }: BreedPetsConfirmationLayoutPlantNameItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_name"
            tags={tags}
            layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantName ?? t('breedpets.widget.plant2.name')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};

/** Row template `preview_image2` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPreviewImage2ItemProps {
    layout?: BoxLayout;
    srcPreviewImage2?: string;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutPreviewImage2Item = ({ layout, srcPreviewImage2, tags }: BreedPetsConfirmationLayoutPreviewImage2ItemProps) => {
    return (
        <ThemeImage
            name="preview_image2"
            tags={tags}
            src={srcPreviewImage2}
            layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130, ...layout }}
        />
    );
};

/** Row template `plant_rarity_level` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlantRarityLevelItem2Props {
    captionPlantRarityLevel?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutPlantRarityLevelItem2 = ({ captionPlantRarityLevel, layout, tags }: BreedPetsConfirmationLayoutPlantRarityLevelItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_rarity_level"
            tags={tags}
            layout={{ width: 134, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantRarityLevel ?? t('breedpets.widget.plant2.raritylevel')}
                textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `plant_description` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlantDescriptionItem2Props {
    captionPlantDescription?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutPlantDescriptionItem2 = ({ captionPlantDescription, layout, tags }: BreedPetsConfirmationLayoutPlantDescriptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_description"
            tags={tags}
            layout={{ width: 122, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantDescription ?? t('breedpets.widget.plant2.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `plant2_itemlist` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPlant2ItemlistItemProps {
    itemsPlant2Itemlist?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutPlant2ItemlistItem = ({ itemsPlant2Itemlist, layout, tags }: BreedPetsConfirmationLayoutPlant2ItemlistItemProps) => {
    return (
        <Region
            name="plant2_itemlist"
            tags={tags}
            layout={{ flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPlant2Itemlist ?? (
                <>
                    <BreedPetsConfirmationLayoutPlantNameItem2 />
                    <BreedPetsConfirmationLayoutPreviewImage2Item />
                    <BreedPetsConfirmationLayoutPlantRarityLevelItem2 />
                    <BreedPetsConfirmationLayoutPlantDescriptionItem2 />
                </>
            )}
        </Region>
    );
};

/** Row template `preview_list` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutPreviewListItemProps {
    itemsPreviewList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutPreviewListItem = ({ itemsPreviewList, layout, tags }: BreedPetsConfirmationLayoutPreviewListItemProps) => {
    return (
        <Region
            name="preview_list"
            tags={tags}
            layout={{ flexShrink: 0, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsPreviewList ?? (
                <>
                    <BreedPetsConfirmationLayoutPlant1ItemlistItem />
                    <BreedPetsConfirmationLayoutPlant2ItemlistItem />
                </>
            )}
        </Region>
    );
};

/** Row template `separator` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutSeparatorItem2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutSeparatorItem2 = ({ layout, tags }: BreedPetsConfirmationLayoutSeparatorItem2Props) => {
    return (
        <Region
            name="separator"
            tags={tags}
            layout={{ width: 274, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `cancel_button` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutCancelButtonItemProps {
    layout?: BoxLayout;
    onCancelButton?: () => void;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutCancelButtonItem = ({ layout, onCancelButton, tags }: BreedPetsConfirmationLayoutCancelButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="cancel_button"
            tags={tags}
            onPointerTap={onCancelButton}
            layout={{ width: 122, height: 30, flexShrink: 0, minWidth: 122, maxWidth: 122, ...layout }}
        >
            {t('breedpets.widget.cancel')}
        </Button>
    );
};

/** Row template `save_button` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutSaveButtonItemProps {
    layout?: BoxLayout;
    onSaveButton?: () => void;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutSaveButtonItem = ({ layout, onSaveButton, tags }: BreedPetsConfirmationLayoutSaveButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="save_button"
            tags={tags}
            tintColor="#00aa00"
            onPointerTap={onSaveButton}
            layout={{ width: 122, height: 30, flexShrink: 0, minWidth: 122, maxWidth: 122, ...layout }}
        >
            {t('breedpets.widget.use')}
        </ButtonThick>
    );
};

/** Row template `accept_button` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutAcceptButtonItemProps {
    layout?: BoxLayout;
    onAcceptButton?: () => void;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutAcceptButtonItem = ({ layout, onAcceptButton, tags }: BreedPetsConfirmationLayoutAcceptButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="accept_button"
            tags={tags}
            tintColor="#00aa00"
            onPointerTap={onAcceptButton}
            layout={{ width: 122, height: 30, flexShrink: 0, minWidth: 122, maxWidth: 122, ...layout }}
        >
            {t('breedpets.widget.accept')}
        </ButtonThick>
    );
};

/** Row template `button_list` of BreedPetsConfirmationLayout - pass real rows through its `items…` slot. */
export interface BreedPetsConfirmationLayoutButtonListItemProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutButtonListItem = ({ itemsButtonList, layout, tags }: BreedPetsConfirmationLayoutButtonListItemProps) => {
    return (
        <Region
            name="button_list"
            tags={tags}
            layout={{ flexShrink: 0, minWidth: 254, maxWidth: 254, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsButtonList ?? (
                <>
                    <BreedPetsConfirmationLayoutCancelButtonItem />
                    <BreedPetsConfirmationLayoutSaveButtonItem />
                    <BreedPetsConfirmationLayoutAcceptButtonItem />
                </>
            )}
        </Region>
    );
};

/** Named region `element_list` of BreedPetsConfirmationLayout - configured through the parent's `elementList` prop. */
export interface BreedPetsConfirmationLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const BreedPetsConfirmationLayoutElementList = ({ itemsElementList, layout, tags }: BreedPetsConfirmationLayoutElementListProps) => {
    return (
        <Region
            name="element_list"
            tags={tags}
            layout={{ position: 'absolute', left: 0, top: 0, maxWidth: 272, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <BreedPetsConfirmationLayoutSeparatorItem />
                    <BreedPetsConfirmationLayoutDescriptionItem />
                    <BreedPetsConfirmationLayoutRequestItem />
                    <BreedPetsConfirmationLayoutInfoItem />
                    <BreedPetsConfirmationLayoutPreviewListItem />
                    <BreedPetsConfirmationLayoutSeparatorItem2 />
                    <BreedPetsConfirmationLayoutButtonListItem />
                </>
            )}
            <Region layout={{ width: 272, height: 1, flexShrink: 0, minWidth: 272 }} />
        </Region>
    );
};
