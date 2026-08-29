import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `831_use_product_controller_fertilize_monsterplant_xml` (layout "use_product_fertilize_monsterplant", 290x257) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerFertilizeMonsterplantLayoutProps {
    elementList?: UseProductControllerFertilizeMonsterplantLayoutElementListProps;
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayout = ({ elementList, layout }: UseProductControllerFertilizeMonsterplantLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 290, height: 257, ...layout }}>
            <UseProductControllerFertilizeMonsterplantLayoutElementList {...elementList} />
        </Region>
    );
};

/** Row template `separator` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutSeparatorItemProps {
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayoutSeparatorItem = ({ layout }: UseProductControllerFertilizeMonsterplantLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            params={16}
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `plant_name` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutPlantNameItemProps {
    captionPlantName?: string;
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayoutPlantNameItem = ({ captionPlantName, layout }: UseProductControllerFertilizeMonsterplantLayoutPlantNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_name"
            params={16}
            layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantName ?? t('useproduct.widget.monsterplant.plant.name')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};

/** Row template `preview_image` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutPreviewImageItemProps {
    layout?: BoxLayout;
    srcPreviewImage?: string;
}

export const UseProductControllerFertilizeMonsterplantLayoutPreviewImageItem = ({ layout, srcPreviewImage }: UseProductControllerFertilizeMonsterplantLayoutPreviewImageItemProps) => {
    return (
        <ThemeImage
            name="preview_image"
            params={16}
            src={srcPreviewImage}
            layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130, ...layout }}
        />
    );
};

/** Row template `plant_rarity_level` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutPlantRarityLevelItemProps {
    captionPlantRarityLevel?: string;
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayoutPlantRarityLevelItem = ({ captionPlantRarityLevel, layout }: UseProductControllerFertilizeMonsterplantLayoutPlantRarityLevelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_rarity_level"
            params={16}
            layout={{ width: 134, height: 44, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantRarityLevel ?? t('useproduct.widget.monsterplant.plant.raritylevel')}
                textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `plant_description` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutPlantDescriptionItemProps {
    captionPlantDescription?: string;
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayoutPlantDescriptionItem = ({ captionPlantDescription, layout }: UseProductControllerFertilizeMonsterplantLayoutPlantDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_description"
            params={16}
            layout={{ width: 122, height: 44, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantDescription ?? t('useproduct.widget.monsterplant.plant.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `plant_itemlist` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutPlantItemlistItemProps {
    itemsPlantItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayoutPlantItemlistItem = ({ itemsPlantItemlist, layout }: UseProductControllerFertilizeMonsterplantLayoutPlantItemlistItemProps) => {
    return (
        <Region
            name="plant_itemlist"
            params={147472}
            layout={{ flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPlantItemlist ?? (
                <>
                    <UseProductControllerFertilizeMonsterplantLayoutPlantNameItem />
                    <UseProductControllerFertilizeMonsterplantLayoutPreviewImageItem />
                    <UseProductControllerFertilizeMonsterplantLayoutPlantRarityLevelItem />
                    <UseProductControllerFertilizeMonsterplantLayoutPlantDescriptionItem />
                </>
            )}
        </Region>
    );
};

/** Named region `separator` of UseProductControllerFertilizeMonsterplantLayout - configured through the parent's `separator` prop. */
export interface UseProductControllerFertilizeMonsterplantLayoutSeparatorProps {
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayoutSeparator = ({ layout }: UseProductControllerFertilizeMonsterplantLayoutSeparatorProps) => {
    return (
        <Region
            name="separator"
            params={16}
            layout={{ width: 130, height: 17, flexShrink: 0, minWidth: 130, maxWidth: 130, ...layout }}
        />
    );
};

/** Named region `separator` of UseProductControllerFertilizeMonsterplantLayout - configured through the parent's `separator` prop. */
export interface UseProductControllerFertilizeMonsterplantLayoutSeparator2Props {
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayoutSeparator2 = ({ layout }: UseProductControllerFertilizeMonsterplantLayoutSeparator2Props) => {
    return (
        <Region
            name="separator"
            params={16}
            layout={{ width: 130, height: 10, flexShrink: 0, minWidth: 130, maxWidth: 130, ...layout }}
        />
    );
};

/** Row template `preview_list` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutPreviewListItemProps {
    captionDescription?: string;
    captionInfo?: string;
    itemsPreviewList?: ReactNode;
    layout?: BoxLayout;
    separator?: UseProductControllerFertilizeMonsterplantLayoutSeparatorProps;
    separator2?: UseProductControllerFertilizeMonsterplantLayoutSeparator2Props;
}

export const UseProductControllerFertilizeMonsterplantLayoutPreviewListItem = ({ captionDescription, captionInfo, itemsPreviewList, layout, separator, separator2 }: UseProductControllerFertilizeMonsterplantLayoutPreviewListItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_list"
            params={147472}
            layout={{ flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsPreviewList ?? (
                <UseProductControllerFertilizeMonsterplantLayoutPlantItemlistItem />
            )}
            <Region
                params={147472}
                layout={{ flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1 }}
            >
                <UseProductControllerFertilizeMonsterplantLayoutSeparator {...separator} />
                <Region
                    name="description"
                    params={16}
                    layout={{ width: 130, height: 44, flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? t('useproduct.widget.text.fertilize_monsterplant')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                    />
                </Region>
                <UseProductControllerFertilizeMonsterplantLayoutSeparator2 {...separator2} />
                <Region
                    name="info"
                    params={16}
                    layout={{ width: 130, height: 30, flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfo ?? t('useproduct.widget.info.fertilize_monsterplant')}
                        textStyle="text-style-u-italic"
                        textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `separator` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutSeparatorItem2Props {
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayoutSeparatorItem2 = ({ layout }: UseProductControllerFertilizeMonsterplantLayoutSeparatorItem2Props) => {
    return (
        <Region
            name="separator"
            params={16}
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `separator` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutSeparatorItem3Props {
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayoutSeparatorItem3 = ({ layout }: UseProductControllerFertilizeMonsterplantLayoutSeparatorItem3Props) => {
    return (
        <Region
            name="separator"
            params={16}
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `element_list` of UseProductControllerFertilizeMonsterplantLayout - configured through the parent's `elementList` prop. */
export interface UseProductControllerFertilizeMonsterplantLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    onCancelText?: () => void;
    onSaveButton?: () => void;
}

export const UseProductControllerFertilizeMonsterplantLayoutElementList = ({ itemsElementList, layout, onCancelText, onSaveButton }: UseProductControllerFertilizeMonsterplantLayoutElementListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="element_list"
            params={147472}
            layout={{ position: 'absolute', left: 0, top: 0, maxWidth: 290, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <UseProductControllerFertilizeMonsterplantLayoutSeparatorItem />
                    <UseProductControllerFertilizeMonsterplantLayoutPreviewListItem />
                    <UseProductControllerFertilizeMonsterplantLayoutSeparatorItem2 />
                    <UseProductControllerFertilizeMonsterplantLayoutSeparatorItem3 />
                </>
            )}
            <Region
                params={16}
                layout={{ width: 270, height: 30, flexShrink: 0, minHeight: 30, flexDirection: 'row', gap: 10 }}
            >
                <Button
                    variant="3"
                    name="cancel_text"
                    params={131089}
                    onPointerTap={onCancelText}
                    layout={{ width: 130, height: 30, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                >
                    {t('useproduct.widget.cancel')}
                </Button>
                <ButtonThick
                    variant="5"
                    name="save_button"
                    params={131089}
                    tintColor="#00aa00"
                    onPointerTap={onSaveButton}
                    layout={{ width: 130, height: 30, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                >
                    {t('useproduct.widget.fertilize')}
                </ButtonThick>
            </Region>
        </Region>
    );
};
