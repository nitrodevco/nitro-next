import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `942_use_product_controller_revive_monsterplant_xml` (layout "use_product_revive_monsterplant", 290x257) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerReviveMonsterplantLayoutProps {
    elementList?: UseProductControllerReviveMonsterplantLayoutElementListProps;
    layout?: BoxLayout;
}

export const UseProductControllerReviveMonsterplantLayout = ({ elementList, layout }: UseProductControllerReviveMonsterplantLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 290, height: 257, ...layout }}>
            <UseProductControllerReviveMonsterplantLayoutElementList {...elementList} />
        </Region>
    );
};

/** Row template `separator` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutSeparatorItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const UseProductControllerReviveMonsterplantLayoutSeparatorItem = ({ layout, tags }: UseProductControllerReviveMonsterplantLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            tags={tags}
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `plant_name` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutPlantNameItemProps {
    captionPlantName?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const UseProductControllerReviveMonsterplantLayoutPlantNameItem = ({ captionPlantName, layout, tags }: UseProductControllerReviveMonsterplantLayoutPlantNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_name"
            tags={tags}
            layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantName ?? t('useproduct.widget.monsterplant.plant.name')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};

/** Row template `preview_image_region` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutPreviewImageRegionItemProps {
    layout?: BoxLayout;
    onPreviewImageRegion?: () => void;
    srcPreviewImage?: string;
    tags?: string[];
}

export const UseProductControllerReviveMonsterplantLayoutPreviewImageRegionItem = ({ layout, onPreviewImageRegion, srcPreviewImage, tags }: UseProductControllerReviveMonsterplantLayoutPreviewImageRegionItemProps) => {
    return (
        <Region
            name="preview_image_region"
            tags={tags}
            onPointerTap={onPreviewImageRegion}
            cursor="pointer"
            layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130, ...layout }}
        >
            <ThemeImage
                name="preview_image"
                src={srcPreviewImage}
                layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 130, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130 }}
            />
        </Region>
    );
};

/** Row template `plant_rarity_level` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutPlantRarityLevelItemProps {
    captionPlantRarityLevel?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const UseProductControllerReviveMonsterplantLayoutPlantRarityLevelItem = ({ captionPlantRarityLevel, layout, tags }: UseProductControllerReviveMonsterplantLayoutPlantRarityLevelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_rarity_level"
            tags={tags}
            layout={{ width: 134, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantRarityLevel ?? t('useproduct.widget.monsterplant.plant.raritylevel')}
                textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `plant_description` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutPlantDescriptionItemProps {
    captionPlantDescription?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const UseProductControllerReviveMonsterplantLayoutPlantDescriptionItem = ({ captionPlantDescription, layout, tags }: UseProductControllerReviveMonsterplantLayoutPlantDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_description"
            tags={tags}
            layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantDescription ?? t('useproduct.widget.monsterplant.plant.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `plant_itemlist` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutPlantItemlistItemProps {
    itemsPlantItemlist?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const UseProductControllerReviveMonsterplantLayoutPlantItemlistItem = ({ itemsPlantItemlist, layout, tags }: UseProductControllerReviveMonsterplantLayoutPlantItemlistItemProps) => {
    return (
        <Region
            name="plant_itemlist"
            tags={tags}
            layout={{ flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPlantItemlist ?? (
                <>
                    <UseProductControllerReviveMonsterplantLayoutPlantNameItem />
                    <UseProductControllerReviveMonsterplantLayoutPreviewImageRegionItem />
                    <UseProductControllerReviveMonsterplantLayoutPlantRarityLevelItem />
                    <UseProductControllerReviveMonsterplantLayoutPlantDescriptionItem />
                </>
            )}
        </Region>
    );
};

/** Named region `separator` of UseProductControllerReviveMonsterplantLayout - configured through the parent's `separator` prop. */
export interface UseProductControllerReviveMonsterplantLayoutSeparatorProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const UseProductControllerReviveMonsterplantLayoutSeparator = ({ layout, tags }: UseProductControllerReviveMonsterplantLayoutSeparatorProps) => {
    return (
        <Region
            name="separator"
            tags={tags}
            layout={{ width: 130, height: 17, flexShrink: 0, minWidth: 130, maxWidth: 130, ...layout }}
        />
    );
};

/** Named region `separator` of UseProductControllerReviveMonsterplantLayout - configured through the parent's `separator` prop. */
export interface UseProductControllerReviveMonsterplantLayoutSeparator2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const UseProductControllerReviveMonsterplantLayoutSeparator2 = ({ layout, tags }: UseProductControllerReviveMonsterplantLayoutSeparator2Props) => {
    return (
        <Region
            name="separator"
            tags={tags}
            layout={{ width: 130, height: 10, flexShrink: 0, minWidth: 130, maxWidth: 130, ...layout }}
        />
    );
};

/** Row template `preview_list` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutPreviewListItemProps {
    captionDescription?: string;
    captionInfo?: string;
    itemsPreviewList?: ReactNode;
    layout?: BoxLayout;
    separator?: UseProductControllerReviveMonsterplantLayoutSeparatorProps;
    separator2?: UseProductControllerReviveMonsterplantLayoutSeparator2Props;
    tags?: string[];
}

export const UseProductControllerReviveMonsterplantLayoutPreviewListItem = ({ captionDescription, captionInfo, itemsPreviewList, layout, separator, separator2, tags }: UseProductControllerReviveMonsterplantLayoutPreviewListItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_list"
            tags={tags}
            layout={{ flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsPreviewList ?? (
                <UseProductControllerReviveMonsterplantLayoutPlantItemlistItem />
            )}
            <Region layout={{ flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1 }}>
                <UseProductControllerReviveMonsterplantLayoutSeparator {...separator} />
                <Region
                    name="description"
                    layout={{ width: 130, height: 71, flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? t('useproduct.widget.text.revive_monsterplant')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                    />
                </Region>
                <UseProductControllerReviveMonsterplantLayoutSeparator2 {...separator2} />
                <Region
                    name="info"
                    layout={{ width: 130, height: 30, flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfo ?? t('useproduct.widget.info.revive_monsterplant')}
                        textStyle="text-style-u-italic"
                        textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `separator` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutSeparatorItem2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const UseProductControllerReviveMonsterplantLayoutSeparatorItem2 = ({ layout, tags }: UseProductControllerReviveMonsterplantLayoutSeparatorItem2Props) => {
    return (
        <Region
            name="separator"
            tags={tags}
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `separator` of UseProductControllerReviveMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerReviveMonsterplantLayoutSeparatorItem3Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const UseProductControllerReviveMonsterplantLayoutSeparatorItem3 = ({ layout, tags }: UseProductControllerReviveMonsterplantLayoutSeparatorItem3Props) => {
    return (
        <Region
            name="separator"
            tags={tags}
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `element_list` of UseProductControllerReviveMonsterplantLayout - configured through the parent's `elementList` prop. */
export interface UseProductControllerReviveMonsterplantLayoutElementListProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    onCancelText?: () => void;
    onSaveButton?: () => void;
    tags?: string[];
}

export const UseProductControllerReviveMonsterplantLayoutElementList = ({ itemsElementList, layout, onCancelText, onSaveButton, tags }: UseProductControllerReviveMonsterplantLayoutElementListProps) => {
    const t = useTranslation();

    return (
        <Region
            name="element_list"
            tags={tags}
            layout={{ position: 'absolute', left: 0, top: 0, maxWidth: 290, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsElementList ?? (
                <>
                    <UseProductControllerReviveMonsterplantLayoutSeparatorItem />
                    <UseProductControllerReviveMonsterplantLayoutPreviewListItem />
                    <UseProductControllerReviveMonsterplantLayoutSeparatorItem2 />
                    <UseProductControllerReviveMonsterplantLayoutSeparatorItem3 />
                </>
            )}
            <Region layout={{ width: 270, height: 30, flexShrink: 0, minHeight: 30, flexDirection: 'row', gap: 10 }}>
                <Button
                    variant="3"
                    name="cancel_text"
                    onPointerTap={onCancelText}
                    layout={{ width: 130, height: 30, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                >
                    {t('useproduct.widget.cancel')}
                </Button>
                <ButtonThick
                    variant="5"
                    name="save_button"
                    tintColor="#00aa00"
                    onPointerTap={onSaveButton}
                    layout={{ width: 130, height: 30, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                >
                    {t('useproduct.widget.revive')}
                </ButtonThick>
            </Region>
        </Region>
    );
};
