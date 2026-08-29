import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `852_craftingwidget_xml` (layout "craftingwidget", 543x407) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CraftingwidgetLayoutProps {
    captionHeaderInventory?: string;
    captionHeaderMixer?: string;
    captionHeaderRecipes?: string;
    captionInfoText1?: string;
    captionInfoText2?: string;
    itemgridInventory?: CraftingwidgetLayoutItemgridInventoryProps;
    itemgridMixer?: CraftingwidgetLayoutItemgridMixerProps;
    itemgridProducts?: CraftingwidgetLayoutItemgridProductsProps;
    layout?: BoxLayout;
    onBtnCraft?: () => void;
    onClose?: () => void;
    progressBar?: CraftingwidgetLayoutProgressBarProps;
    srcFurnitureIcon?: string;
}

export const CraftingwidgetLayout = ({ captionHeaderInventory, captionHeaderMixer, captionHeaderRecipes, captionInfoText1, captionInfoText2, itemgridInventory, itemgridMixer, itemgridProducts, layout, onBtnCraft, onClose, progressBar, srcFurnitureIcon }: CraftingwidgetLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={32769}
            caption={t('crafting.title')}
            tintColor="#2d4f64"
            onClose={onClose}
            layout={{ width: 543, height: 407, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <ThemeImage
                    params={16}
                    src={layoutImage('craft_craft_bg.png')}
                    layout={{ position: 'absolute', left: 8, width: 521, top: 8, height: 351 }}
                />
                <ThemeImage
                    name="furniture_icon"
                    params={16}
                    src={srcFurnitureIcon}
                    layout={{ position: 'absolute', left: 398, width: 131, top: 198, height: 101 }}
                />
                <Region
                    name="header_recipes"
                    params={16}
                    layout={{ position: 'absolute', left: 26, width: 219, top: 32, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionHeaderRecipes ?? t('crafting.title.products')}
                        textOptions={{ fill: '#cec7b6', align: 'center' }}
                    />
                </Region>
                <Region
                    name="header_inventory"
                    params={16}
                    layout={{ position: 'absolute', left: 26, width: 219, top: 200, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionHeaderInventory ?? t('crafting.title.mixer')}
                        textOptions={{ fill: '#cec7b6', align: 'center' }}
                    />
                </Region>
                <Region
                    name="header_mixer"
                    params={1048592}
                    layout={{ position: 'absolute', left: 292, width: 215, bottom: 346, height: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionHeaderMixer ?? 'Spellbook wdfsdf ef ewfwe fwfe wef ewf wefwe'}
                        textOptions={{ fill: '#9ca1a2', wordWrap: true, wordWrapWidth: 215 }}
                    />
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 304, width: 134, top: 180, height: 79, maxHeight: 120, flexDirection: 'column', gap: 8 }}
                >
                    <Region
                        name="info_text1"
                        params={9584688}
                        layout={{ width: 134, flexShrink: 0, maxWidth: 134, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoText1 ?? 'This spell will produce yy yy yyyyyyyy yyyyyy yy yyy xxxxxx xxx xxxxx'}
                            textOptions={{ fill: '#93999a', wordWrap: true, wordWrapWidth: 134 }}
                        />
                    </Region>
                    <Region
                        name="info_text2"
                        params={9437232}
                        layout={{ width: 134, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoText2 ?? 'This spell will produce xxxxxx xxx xxxxx'}
                            textOptions={{ fill: '#697577', wordWrap: true, wordWrapWidth: 134 }}
                        />
                    </Region>
                </Region>
                <Button
                    variant="6"
                    name="btn_craft"
                    params={131089}
                    tintColor="#299f3a"
                    onPointerTap={onBtnCraft}
                    layout={{ position: 'absolute', left: 294, width: 216, top: 317, height: 30, minWidth: 216, maxWidth: 216 }}
                />
                <CraftingwidgetLayoutProgressBar {...progressBar} />
                <CraftingwidgetLayoutItemgridProducts {...itemgridProducts} />
                <CraftingwidgetLayoutItemgridInventory {...itemgridInventory} />
                <CraftingwidgetLayoutItemgridMixer {...itemgridMixer} />
            </Region>
        </Frame>
    );
};

/** Named region `progress_bar` of CraftingwidgetLayout - configured through the parent's `progressBar` prop. */
export interface CraftingwidgetLayoutProgressBarProps {
    layout?: BoxLayout;
    onBtnCancel?: () => void;
    onProgressBar?: () => void;
    visibleProgressBar?: boolean;
}

export const CraftingwidgetLayoutProgressBar = ({ layout, onBtnCancel, onProgressBar, visibleProgressBar }: CraftingwidgetLayoutProgressBarProps) => {
    const t = useTranslation();

    return (
        <Region
            name="progress_bar"
            params={131073}
            visible={visibleProgressBar ?? false}
            onPointerTap={onProgressBar}
            cursor="pointer"
            layout={{ position: 'absolute', left: 285, width: 225, top: 316, height: 31, ...layout }}
        >
            <Button
                variant="3"
                name="btn_cancel"
                params={131091}
                onPointerTap={onBtnCancel}
                layout={{ position: 'absolute', left: 9, width: 216, top: 1, height: 30, minWidth: 216, maxWidth: 216 }}
            >
                {t('generic.cancel')}
            </Button>
            <Border
                variant="3"
                name="bar"
                params={19}
                tintColor="#299f3a"
                layout={{ position: 'absolute', left: 9, width: 14, top: 2, height: 27 }}
            >
                <Region
                    params={147}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 14, height: 13 }}
                />
            </Border>
            <Region
                params={19}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 9, width: 1, top: 4, height: 24 }}
            />
        </Region>
    );
};

/** Named region `tooltip` of CraftingwidgetLayout - configured through the parent's `tooltip` prop. */
export interface CraftingwidgetLayoutTooltipProps {
    layout?: BoxLayout;
    onTooltip?: () => void;
}

export const CraftingwidgetLayoutTooltip = ({ layout, onTooltip }: CraftingwidgetLayoutTooltipProps) => {
    return (
        <Region
            name="tooltip"
            params={17}
            onPointerTap={onTooltip}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, ...layout }}
        />
    );
};

/** Named region `number_container` of CraftingwidgetLayout - configured through the parent's `numberContainer` prop. */
export interface CraftingwidgetLayoutNumberContainerProps {
    captionNumber?: string;
    layout?: BoxLayout;
    onNumberContainer?: () => void;
    visibleNumberContainer?: boolean;
}

export const CraftingwidgetLayoutNumberContainer = ({ captionNumber, layout, onNumberContainer, visibleNumberContainer }: CraftingwidgetLayoutNumberContainerProps) => {
    return (
        <Region
            name="number_container"
            tags={[ 'COUNT' ]}
            params={393363}
            visible={visibleNumberContainer ?? false}
            backgroundColor="#2f6982"
            onPointerTap={onNumberContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 33, right: 1, top: 2, height: 15, ...layout }}
        >
            <Region
                name="number"
                tags={[ 'NUMBER', 'COUNT' ]}
                params={19}
                layout={{ position: 'absolute', left: 1, width: 4, top: 1, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionNumber ?? ''}
                    textOptions={{ fill: '#2f6982' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `itemgrid_products` of CraftingwidgetLayout - configured through the parent's `itemgridProducts` prop. */
export interface CraftingwidgetLayoutItemgridProductsProps {
    layout?: BoxLayout;
    numberContainer?: CraftingwidgetLayoutNumberContainerProps;
    srcBitmap?: string;
    tooltip?: CraftingwidgetLayoutTooltipProps;
}

export const CraftingwidgetLayoutItemgridProducts = ({ layout, numberContainer, srcBitmap, tooltip }: CraftingwidgetLayoutItemgridProductsProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 26, width: 246, top: 69, height: 108, ...layout }}
        >
            <Region
                name="itemgrid_products"
                params={16}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, width: '100%' }}
            >
                <Region
                    params={17}
                    layout={{ width: 40, height: 40, flexShrink: 0 }}
                >
                    <ThemeImage
                        name="bitmap"
                        tags={[ 'BITMAP' ]}
                        params={17}
                        src={srcBitmap}
                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
                    />
                    <CraftingwidgetLayoutTooltip {...tooltip} />
                    <CraftingwidgetLayoutNumberContainer {...numberContainer} />
                </Region>
            </Region>
        </ScrollArea>
    );
};

/** Named region `itemgrid_inventory` of CraftingwidgetLayout - configured through the parent's `itemgridInventory` prop. */
export interface CraftingwidgetLayoutItemgridInventoryProps {
    layout?: BoxLayout;
}

export const CraftingwidgetLayoutItemgridInventory = ({ layout }: CraftingwidgetLayoutItemgridInventoryProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 26, width: 246, top: 238, height: 108, ...layout }}
        >
            <Region
                name="itemgrid_inventory"
                params={16}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `itemgrid_mixer` of CraftingwidgetLayout - configured through the parent's `itemgridMixer` prop. */
export interface CraftingwidgetLayoutItemgridMixerProps {
    layout?: BoxLayout;
}

export const CraftingwidgetLayoutItemgridMixer = ({ layout }: CraftingwidgetLayoutItemgridMixerProps) => {
    return (
        <Region
            name="itemgrid_mixer"
            params={16}
            layout={{ position: 'absolute', left: 294, width: 216, top: 71, height: 85, flexDirection: 'row', flexWrap: 'wrap', gap: 5, ...layout }}
        />
    );
};
