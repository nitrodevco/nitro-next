import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1063_use_product_controller_rebreed_monsterplant_xml` (layout "use_product_rebreed_monsterplant", 290x257) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerRebreedMonsterplantLayoutProps {
    itemsElementList?: ReactNode;
    layout?: BoxLayout;
    onCancelText?: () => void;
    onSaveButton?: () => void;
}

export const UseProductControllerRebreedMonsterplantLayout = ({ itemsElementList, layout, onCancelText, onSaveButton }: UseProductControllerRebreedMonsterplantLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 290, height: 257, ...layout }}>
            <Region
                name="element_list"
                params={147472}
                layout={{ position: 'absolute', left: 0, top: 0, maxWidth: 290, flexDirection: 'column', gap: 10 }}
            >
                {itemsElementList ?? (
                    <>
                        <UseProductControllerRebreedMonsterplantLayoutSeparatorItem />
                        <UseProductControllerRebreedMonsterplantLayoutPreviewListItem />
                        <UseProductControllerRebreedMonsterplantLayoutSeparatorItem2 />
                        <UseProductControllerRebreedMonsterplantLayoutSeparatorItem3 />
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
                        {t('useproduct.widget.rebreed')}
                    </ButtonThick>
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `separator` of UseProductControllerRebreedMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerRebreedMonsterplantLayoutSeparatorItemProps {
    layout?: BoxLayout;
}

export const UseProductControllerRebreedMonsterplantLayoutSeparatorItem = ({ layout }: UseProductControllerRebreedMonsterplantLayoutSeparatorItemProps) => {
    return (
        <Region
            name="separator"
            params={16}
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `plant_name` of UseProductControllerRebreedMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerRebreedMonsterplantLayoutPlantNameItemProps {
    captionPlantName?: string;
    layout?: BoxLayout;
}

export const UseProductControllerRebreedMonsterplantLayoutPlantNameItem = ({ captionPlantName, layout }: UseProductControllerRebreedMonsterplantLayoutPlantNameItemProps) => {
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

/** Row template `preview_image_region` of UseProductControllerRebreedMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerRebreedMonsterplantLayoutPreviewImageRegionItemProps {
    layout?: BoxLayout;
    onPreviewImageRegion?: () => void;
    srcPreviewImage?: string;
}

export const UseProductControllerRebreedMonsterplantLayoutPreviewImageRegionItem = ({ layout, onPreviewImageRegion, srcPreviewImage }: UseProductControllerRebreedMonsterplantLayoutPreviewImageRegionItemProps) => {
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

/** Row template `plant_rarity_level` of UseProductControllerRebreedMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerRebreedMonsterplantLayoutPlantRarityLevelItemProps {
    captionPlantRarityLevel?: string;
    layout?: BoxLayout;
}

export const UseProductControllerRebreedMonsterplantLayoutPlantRarityLevelItem = ({ captionPlantRarityLevel, layout }: UseProductControllerRebreedMonsterplantLayoutPlantRarityLevelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_rarity_level"
            params={16}
            layout={{ width: 134, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantRarityLevel ?? t('useproduct.widget.monsterplant.plant.raritylevel')}
                textOptions={{ wordWrap: true, wordWrapWidth: 134, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `plant_description` of UseProductControllerRebreedMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerRebreedMonsterplantLayoutPlantDescriptionItemProps {
    captionPlantDescription?: string;
    layout?: BoxLayout;
}

export const UseProductControllerRebreedMonsterplantLayoutPlantDescriptionItem = ({ captionPlantDescription, layout }: UseProductControllerRebreedMonsterplantLayoutPlantDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="plant_description"
            params={16}
            layout={{ width: 122, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionPlantDescription ?? t('useproduct.widget.monsterplant.plant.description')}
                textOptions={{ wordWrap: true, wordWrapWidth: 122, align: 'center' }}
            />
        </Region>
    );
};

/** Row template `plant_itemlist` of UseProductControllerRebreedMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerRebreedMonsterplantLayoutPlantItemlistItemProps {
    itemsPlantItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const UseProductControllerRebreedMonsterplantLayoutPlantItemlistItem = ({ itemsPlantItemlist, layout }: UseProductControllerRebreedMonsterplantLayoutPlantItemlistItemProps) => {
    return (
        <Region
            name="plant_itemlist"
            params={147472}
            layout={{ flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1, ...layout }}
        >
            {itemsPlantItemlist ?? (
                <>
                    <UseProductControllerRebreedMonsterplantLayoutPlantNameItem />
                    <UseProductControllerRebreedMonsterplantLayoutPreviewImageRegionItem />
                    <UseProductControllerRebreedMonsterplantLayoutPlantRarityLevelItem />
                    <UseProductControllerRebreedMonsterplantLayoutPlantDescriptionItem />
                </>
            )}
        </Region>
    );
};

/** Row template `preview_list` of UseProductControllerRebreedMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerRebreedMonsterplantLayoutPreviewListItemProps {
    captionDescription?: string;
    captionInfo?: string;
    itemsPreviewList?: ReactNode;
    layout?: BoxLayout;
}

export const UseProductControllerRebreedMonsterplantLayoutPreviewListItem = ({ captionDescription, captionInfo, itemsPreviewList, layout }: UseProductControllerRebreedMonsterplantLayoutPreviewListItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_list"
            params={147472}
            layout={{ flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsPreviewList ?? (
                <UseProductControllerRebreedMonsterplantLayoutPlantItemlistItem />
            )}
            <Region
                params={147472}
                layout={{ flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'column', gap: 1 }}
            >
                <Region
                    name="separator"
                    params={16}
                    layout={{ width: 130, height: 17, flexShrink: 0, minWidth: 130, maxWidth: 130 }}
                />
                <Region
                    name="description"
                    params={16}
                    layout={{ width: 130, height: 57, flexShrink: 0, minWidth: 130, maxWidth: 130, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? t('useproduct.widget.text.rebreed_monsterplant')}
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
                        text={captionInfo ?? t('useproduct.widget.info.rebreed_monsterplant')}
                        textStyle="text-style-u-italic"
                        textOptions={{ wordWrap: true, wordWrapWidth: 130 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `separator` of UseProductControllerRebreedMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerRebreedMonsterplantLayoutSeparatorItem2Props {
    layout?: BoxLayout;
}

export const UseProductControllerRebreedMonsterplantLayoutSeparatorItem2 = ({ layout }: UseProductControllerRebreedMonsterplantLayoutSeparatorItem2Props) => {
    return (
        <Region
            name="separator"
            params={16}
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `separator` of UseProductControllerRebreedMonsterplantLayout - pass real rows through its `items…` slot. */
export interface UseProductControllerRebreedMonsterplantLayoutSeparatorItem3Props {
    layout?: BoxLayout;
}

export const UseProductControllerRebreedMonsterplantLayoutSeparatorItem3 = ({ layout }: UseProductControllerRebreedMonsterplantLayoutSeparatorItem3Props) => {
    return (
        <Region
            name="separator"
            params={16}
            layout={{ width: 270, height: 1, flexShrink: 0, ...layout }}
        />
    );
};
