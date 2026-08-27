import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `918_breed_pets_result_xml` (layout "breed_pets_result", 275x300) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BreedPetsResultLayoutProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const BreedPetsResultLayout = ({ itemsElementList, layout, onClose }: BreedPetsResultLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('breedpetsresult.widget.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 275, height: 300, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="element_list"
                    params={147472}
                    layout={{ position: 'absolute', left: 0, width: 274, top: 0, height: 291, minWidth: 274, maxWidth: 274, flexDirection: 'column', gap: 10 }}
                >
                    {itemsElementList ?? (
                        <>
                            <BreedPetsResultLayoutSeparatorItem />
                            <BreedPetsResultLayoutDescriptionItem />
                            <BreedPetsResultLayoutDescriptionSorryItem />
                            <BreedPetsResultLayoutInfoItem />
                            <BreedPetsResultLayoutInfoSorryItem />
                            <BreedPetsResultLayoutPreviewListItem />
                            <BreedPetsResultLayoutPreviewButtonlistItem />
                            <BreedPetsResultLayoutButtonListItem />
                            <BreedPetsResultLayoutSeparatorItem2 />
                        </>
                    )}
                    <Region
                        params={16}
                        layout={{ width: 244, height: 1, flexShrink: 0, minHeight: 1, maxHeight: 1 }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `separator` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeparatorItemProps {
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeparatorItem = ({ layout }: BreedPetsResultLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            params={16}
            layout={{ width: 274, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `description` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutDescriptionItemProps {
    captionDescription?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutDescriptionItem = ({ captionDescription, layout }: BreedPetsResultLayoutDescriptionItemProps) => {
    return (
        <Region
            name="description"
            params={16}
            layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDescription ?? '${breedpetsresult.widget.text '}
                textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            />
        </Region>
    );
};

/** Row template `description_sorry` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutDescriptionSorryItemProps {
    captionDescriptionSorry?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutDescriptionSorryItem = ({ captionDescriptionSorry, layout }: BreedPetsResultLayoutDescriptionSorryItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="description_sorry"
            params={16}
            visible={false}
            layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionDescriptionSorry ?? t('breedpetsresult.widget.text.sorry')}
                textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            />
        </Region>
    );
};

/** Row template `info` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutInfoItemProps {
    captionInfo?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutInfoItem = ({ captionInfo, layout }: BreedPetsResultLayoutInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="info"
            params={16}
            layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionInfo ?? t('breedpetsresult.widget.info')}
                textStyle="text-style-u-italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            />
        </Region>
    );
};

/** Row template `info_sorry` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutInfoSorryItemProps {
    captionInfoSorry?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutInfoSorryItem = ({ captionInfoSorry, layout }: BreedPetsResultLayoutInfoSorryItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="info_sorry"
            params={16}
            visible={false}
            layout={{ width: 254, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionInfoSorry ?? t('breedpetsresult.widget.info.sorry')}
                textStyle="text-style-u-italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 254 }}
            />
        </Region>
    );
};

/** Row template `seed_name` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedNameItemProps {
    captionSeedName?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedNameItem = ({ captionSeedName, layout }: BreedPetsResultLayoutSeedNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="seed_name"
            params={16}
            layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionSeedName ?? t('breedpetsresult.widget.seed1.name')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};

/** Row template `preview_image_region` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPreviewImageRegionItemProps {
    layout?: BoxLayout;
    onPreviewImageRegion?: () => void;
    srcPreviewImage?: string;
}

export const BreedPetsResultLayoutPreviewImageRegionItem = ({ layout, onPreviewImageRegion, srcPreviewImage }: BreedPetsResultLayoutPreviewImageRegionItemProps) => {
    return (
        <Region
            name="preview_image_region"
            params={17}
            onPointerTap={onPreviewImageRegion}
            cursor="pointer"
            layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130, ...layout }}
        >
            <ThemeImage
                name="preview_image"
                params={16}
                src={srcPreviewImage}
                layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 130, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130 }}
            />
        </Region>
    );
};

/** Row template `seed_rarity_level` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedRarityLevelItemProps {
    captionSeedRarityLevel?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedRarityLevelItem = ({ captionSeedRarityLevel, layout }: BreedPetsResultLayoutSeedRarityLevelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="seed_rarity_level"
            params={16}
            layout={{ width: 134, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionSeedRarityLevel ?? t('breedpetsresult.widget.seed1.raritylevel')}
                textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `seed_description` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedDescriptionItemProps {
    captionSeedDescription?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedDescriptionItem = ({ captionSeedDescription, layout }: BreedPetsResultLayoutSeedDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="seed_description"
            params={16}
            layout={{ width: 122, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionSeedDescription ?? t('breedpetsresult.widget.seed1.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `info_mutate1` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutInfoMutate1ItemProps {
    captionInfoMutate1?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutInfoMutate1Item = ({ captionInfoMutate1, layout }: BreedPetsResultLayoutInfoMutate1ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="info_mutate1"
            params={16}
            visible={false}
            layout={{ width: 122, height: 33, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionInfoMutate1 ?? t('breedpetsresult.widget.info.mutation')}
                textStyle="text-style-u-italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `seed1_itemlist` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeed1ItemlistItemProps {
    itemsSeed1Itemlist?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeed1ItemlistItem = ({ itemsSeed1Itemlist, layout }: BreedPetsResultLayoutSeed1ItemlistItemProps) => {
    return (
        <Region
            name="seed1_itemlist"
            params={147472}
            layout={{ width: 122, height: 122, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsSeed1Itemlist ?? (
                <>
                    <BreedPetsResultLayoutSeedNameItem />
                    <BreedPetsResultLayoutPreviewImageRegionItem />
                    <BreedPetsResultLayoutSeedRarityLevelItem />
                    <BreedPetsResultLayoutSeedDescriptionItem />
                    <BreedPetsResultLayoutInfoMutate1Item />
                </>
            )}
        </Region>
    );
};

/** Row template `seed_name` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedNameItem2Props {
    captionSeedName?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedNameItem2 = ({ captionSeedName, layout }: BreedPetsResultLayoutSeedNameItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="seed_name"
            params={16}
            layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionSeedName ?? t('breedpetsresult.widget.seed2.name')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};

/** Row template `preview_image_region2` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPreviewImageRegion2ItemProps {
    layout?: BoxLayout;
    onPreviewImageRegion2?: () => void;
    srcPreviewImage2?: string;
}

export const BreedPetsResultLayoutPreviewImageRegion2Item = ({ layout, onPreviewImageRegion2, srcPreviewImage2 }: BreedPetsResultLayoutPreviewImageRegion2ItemProps) => {
    return (
        <Region
            name="preview_image_region2"
            params={17}
            onPointerTap={onPreviewImageRegion2}
            cursor="pointer"
            layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130, ...layout }}
        >
            <ThemeImage
                name="preview_image2"
                params={16}
                src={srcPreviewImage2}
                layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 130, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130 }}
            />
        </Region>
    );
};

/** Row template `seed_rarity_level` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedRarityLevelItem2Props {
    captionSeedRarityLevel?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedRarityLevelItem2 = ({ captionSeedRarityLevel, layout }: BreedPetsResultLayoutSeedRarityLevelItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="seed_rarity_level"
            params={16}
            layout={{ width: 134, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionSeedRarityLevel ?? t('breedpetsresult.widget.seed2.raritylevel')}
                textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `seed_description` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeedDescriptionItem2Props {
    captionSeedDescription?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeedDescriptionItem2 = ({ captionSeedDescription, layout }: BreedPetsResultLayoutSeedDescriptionItem2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="seed_description"
            params={16}
            layout={{ width: 122, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionSeedDescription ?? t('breedpetsresult.widget.seed2.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `info_mutate2` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutInfoMutate2ItemProps {
    captionInfoMutate2?: string;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutInfoMutate2Item = ({ captionInfoMutate2, layout }: BreedPetsResultLayoutInfoMutate2ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="info_mutate2"
            params={16}
            visible={false}
            layout={{ width: 122, height: 33, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionInfoMutate2 ?? t('breedpetsresult.widget.info.mutation')}
                textStyle="text-style-u-italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `seed2_itemlist` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeed2ItemlistItemProps {
    itemsSeed2Itemlist?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeed2ItemlistItem = ({ itemsSeed2Itemlist, layout }: BreedPetsResultLayoutSeed2ItemlistItemProps) => {
    return (
        <Region
            name="seed2_itemlist"
            params={147472}
            layout={{ width: 122, height: 122, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsSeed2Itemlist ?? (
                <>
                    <BreedPetsResultLayoutSeedNameItem2 />
                    <BreedPetsResultLayoutPreviewImageRegion2Item />
                    <BreedPetsResultLayoutSeedRarityLevelItem2 />
                    <BreedPetsResultLayoutSeedDescriptionItem2 />
                    <BreedPetsResultLayoutInfoMutate2Item />
                </>
            )}
        </Region>
    );
};

/** Row template `preview_list` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPreviewListItemProps {
    itemsPreviewList?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutPreviewListItem = ({ itemsPreviewList, layout }: BreedPetsResultLayoutPreviewListItemProps) => {
    return (
        <Region
            name="preview_list"
            params={4079632}
            layout={{ width: 254, height: 122, flexShrink: 0, maxWidth: 254, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsPreviewList ?? (
                <>
                    <BreedPetsResultLayoutSeed1ItemlistItem />
                    <BreedPetsResultLayoutSeed2ItemlistItem />
                </>
            )}
        </Region>
    );
};

/** Row template `place_button1` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPlaceButton1ItemProps {
    layout?: BoxLayout;
    onPlaceButton1?: () => void;
    visiblePlaceButton1?: boolean;
}

export const BreedPetsResultLayoutPlaceButton1Item = ({ layout, onPlaceButton1, visiblePlaceButton1 }: BreedPetsResultLayoutPlaceButton1ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            visible={visiblePlaceButton1 ?? false}
            layout={{ width: 120, height: 30, flexShrink: 0, minWidth: 120, maxWidth: 120, ...layout }}
        >
            <ButtonThick
                variant="5"
                name="place_button1"
                params={131089}
                tintColor="#00aa00"
                onPointerTap={onPlaceButton1}
                layout={{ width: '100%', height: '100%' }}
            >
                {t('breedpetsresult.widget.seed2.use')}
            </ButtonThick>
        </Region>
    );
};

/** Row template `pick_button1` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPickButton1ItemProps {
    layout?: BoxLayout;
    onPickButton1?: () => void;
    visiblePickButton1?: boolean;
}

export const BreedPetsResultLayoutPickButton1Item = ({ layout, onPickButton1, visiblePickButton1 }: BreedPetsResultLayoutPickButton1ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            visible={visiblePickButton1 ?? false}
            layout={{ width: 120, height: 30, flexShrink: 0, minWidth: 120, maxWidth: 120, ...layout }}
        >
            <Button
                variant="3"
                name="pick_button1"
                params={131089}
                onPointerTap={onPickButton1}
                layout={{ width: '100%', height: '100%' }}
            >
                {t('breedpetsresult.widget.seed2.pick')}
            </Button>
        </Region>
    );
};

/** Row template `seed1_buttonlist` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeed1ButtonlistItemProps {
    itemsSeed1Buttonlist?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeed1ButtonlistItem = ({ itemsSeed1Buttonlist, layout }: BreedPetsResultLayoutSeed1ButtonlistItemProps) => {
    return (
        <Region
            name="seed1_buttonlist"
            params={933904}
            layout={{ width: 122, height: 0, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsSeed1Buttonlist ?? (
                <>
                    <BreedPetsResultLayoutPlaceButton1Item />
                    <BreedPetsResultLayoutPickButton1Item />
                </>
            )}
        </Region>
    );
};

/** Row template `place_button2` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPlaceButton2ItemProps {
    layout?: BoxLayout;
    onPlaceButton2?: () => void;
    visiblePlaceButton2?: boolean;
}

export const BreedPetsResultLayoutPlaceButton2Item = ({ layout, onPlaceButton2, visiblePlaceButton2 }: BreedPetsResultLayoutPlaceButton2ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            visible={visiblePlaceButton2 ?? false}
            layout={{ width: 120, height: 30, flexShrink: 0, minWidth: 120, maxWidth: 120, ...layout }}
        >
            <ButtonThick
                variant="5"
                name="place_button2"
                params={131089}
                tintColor="#00aa00"
                onPointerTap={onPlaceButton2}
                layout={{ width: '100%', height: '100%' }}
            >
                {t('breedpetsresult.widget.seed2.use')}
            </ButtonThick>
        </Region>
    );
};

/** Row template `pick_button2` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPickButton2ItemProps {
    layout?: BoxLayout;
    onPickButton2?: () => void;
    visiblePickButton2?: boolean;
}

export const BreedPetsResultLayoutPickButton2Item = ({ layout, onPickButton2, visiblePickButton2 }: BreedPetsResultLayoutPickButton2ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            visible={visiblePickButton2 ?? false}
            layout={{ width: 120, height: 30, flexShrink: 0, minWidth: 120, maxWidth: 120, ...layout }}
        >
            <Button
                variant="3"
                name="pick_button2"
                params={131089}
                onPointerTap={onPickButton2}
                layout={{ width: '100%', height: '100%' }}
            >
                {t('breedpetsresult.widget.seed2.pick')}
            </Button>
        </Region>
    );
};

/** Row template `seed2_buttonlist` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeed2ButtonlistItemProps {
    itemsSeed2Buttonlist?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeed2ButtonlistItem = ({ itemsSeed2Buttonlist, layout }: BreedPetsResultLayoutSeed2ButtonlistItemProps) => {
    return (
        <Region
            name="seed2_buttonlist"
            params={933904}
            layout={{ width: 122, height: 0, flexShrink: 0, minWidth: 122, maxWidth: 122, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsSeed2Buttonlist ?? (
                <>
                    <BreedPetsResultLayoutPlaceButton2Item />
                    <BreedPetsResultLayoutPickButton2Item />
                </>
            )}
        </Region>
    );
};

/** Row template `preview_buttonlist` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPreviewButtonlistItemProps {
    itemsPreviewButtonlist?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutPreviewButtonlistItem = ({ itemsPreviewButtonlist, layout }: BreedPetsResultLayoutPreviewButtonlistItemProps) => {
    return (
        <Region
            name="preview_buttonlist"
            params={4079632}
            layout={{ width: 120, height: 30, flexShrink: 0, maxWidth: 254, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsPreviewButtonlist ?? (
                <>
                    <BreedPetsResultLayoutSeed1ButtonlistItem />
                    <BreedPetsResultLayoutSeed2ButtonlistItem />
                </>
            )}
        </Region>
    );
};

/** Row template `close_button` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutCloseButtonItemProps {
    layout?: BoxLayout;
    onCloseButton?: () => void;
}

export const BreedPetsResultLayoutCloseButtonItem = ({ layout, onCloseButton }: BreedPetsResultLayoutCloseButtonItemProps) => {
    const t = useTranslation();

    return (
        <Button
            variant="3"
            name="close_button"
            params={131089}
            onPointerTap={onCloseButton}
            layout={{ width: 122, height: 30, flexShrink: 0, minWidth: 122, maxWidth: 122, ...layout }}
        >
            {t('breedpetsresult.widget.close')}
        </Button>
    );
};

/** Row template `button_list` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutButtonListItemProps {
    itemsButtonList?: ReactNode;
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutButtonListItem = ({ itemsButtonList, layout }: BreedPetsResultLayoutButtonListItemProps) => {
    return (
        <Region
            name="button_list"
            params={4079632}
            layout={{ width: 122, height: 30, flexShrink: 0, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsButtonList ?? (
                <BreedPetsResultLayoutCloseButtonItem />
            )}
        </Region>
    );
};

/** Row template `separator` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutSeparatorItem2Props {
    layout?: BoxLayout;
}

export const BreedPetsResultLayoutSeparatorItem2 = ({ layout }: BreedPetsResultLayoutSeparatorItem2Props) => {
    return (
        <Region
            name="separator"
            params={16}
            layout={{ width: 274, height: 1, flexShrink: 0, minWidth: 274, minHeight: 1, ...layout }}
        />
    );
};
