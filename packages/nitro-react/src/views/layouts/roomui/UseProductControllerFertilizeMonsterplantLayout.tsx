import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `831_use_product_controller_fertilize_monsterplant_xml` (layout "use_product_fertilize_monsterplant", 290x257) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerFertilizeMonsterplantLayoutProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    onCancelText?: () => void;
    onSaveButton?: () => void;
}

export const UseProductControllerFertilizeMonsterplantLayout = ({ itemsElementList, layout, onCancelText, onSaveButton }: UseProductControllerFertilizeMonsterplantLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 290, height: 257, ...layout }}>
            <Region
                name="element_list"
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 257, maxWidth: 290, flexDirection: 'column', gap: 10 }}
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
            layout={{ width: 130, height: 238, flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1, ...layout }}
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

/** Row template `preview_list` of UseProductControllerFertilizeMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerFertilizeMonsterplantLayoutPreviewListItemProps {
    captionDescription?: string;
    captionInfo?: string;
    itemsPreviewList?: ReactNode;
    layout?: BoxLayout;
}

export const UseProductControllerFertilizeMonsterplantLayoutPreviewListItem = ({ captionDescription, captionInfo, itemsPreviewList, layout }: UseProductControllerFertilizeMonsterplantLayoutPreviewListItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_list"
            params={147472}
            layout={{ width: 270, height: 184, flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsPreviewList ?? (
                <UseProductControllerFertilizeMonsterplantLayoutPlantItemlistItem />
            )}
            <Region
                params={147472}
                layout={{ width: 130, height: 104, flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1 }}
            >
                <Region
                    name="separator"
                    params={16}
                    layout={{ width: 130, height: 17, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                />
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
                <Region
                    name="separator"
                    params={16}
                    layout={{ width: 130, height: 10, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                />
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
