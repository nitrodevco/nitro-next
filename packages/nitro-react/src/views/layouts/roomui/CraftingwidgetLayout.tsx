import { ReactNode } from 'react';

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
    captionNumber?: string;
    itemsItemgridInventory?: ReactNode;
    itemsItemgridMixer?: ReactNode;
    layout?: BoxLayout;
    onBtnCancel?: () => void;
    onBtnCraft?: () => void;
    onClose?: () => void;
    onNumberContainer?: () => void;
    onProgressBar?: () => void;
    onTooltip?: () => void;
    srcBitmap?: string;
    srcFurnitureIcon?: string;
    tintBitmap?: string;
    tintFurnitureIcon?: string;
    tooltip?: ReactNode;
    visibleNumberContainer?: boolean;
    visibleProgressBar?: boolean;
}

export const CraftingwidgetLayout = ({ captionHeaderInventory, captionHeaderMixer, captionHeaderRecipes, captionInfoText1, captionInfoText2, captionNumber, itemsItemgridInventory, itemsItemgridMixer, layout, onBtnCancel, onBtnCraft, onClose, onNumberContainer, onProgressBar, onTooltip, srcBitmap, srcFurnitureIcon, tintBitmap, tintFurnitureIcon, tooltip, visibleNumberContainer, visibleProgressBar }: CraftingwidgetLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('crafting.title')}
            tintColor="#2d4f64"
            onClose={onClose}
            layout={{ width: 543, height: 407, minWidth: 543, minHeight: 407, ...layout }}
        >
            <ThemeImage
                src={layoutImage('craft_craft_bg.png')}
                layout={{ position: 'absolute', left: 8, width: 521, top: 8, height: 351 }}
            />
            <ThemeImage
                name="furniture_icon"
                src={srcFurnitureIcon}
                tint={tintFurnitureIcon}
                layout={{ position: 'absolute', left: 398, width: 131, top: 198, height: 101 }}
            />
            <Region
                name="header_recipes"
                layout={{ position: 'absolute', left: 26, width: 219, top: 32, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionHeaderRecipes ?? t('crafting.title.products')}
                    textOptions={{ fill: '#cec7b6', align: 'center' }}
                />
            </Region>
            <Region
                name="header_inventory"
                layout={{ position: 'absolute', left: 26, width: 219, top: 200, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionHeaderInventory ?? t('crafting.title.mixer')}
                    textOptions={{ fill: '#cec7b6', align: 'center' }}
                />
            </Region>
            <Region
                name="header_mixer"
                layout={{ position: 'absolute', left: 292, width: 215, bottom: 305, height: 28, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionHeaderMixer ?? 'Spellbook wdfsdf ef ewfwe fwfe wef ewf wefwe'}
                    textOptions={{ fill: '#9ca1a2', wordWrap: true, wordWrapWidth: 215 }}
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 304, width: 134, top: 180, height: 79, maxHeight: 120, flexDirection: 'column', gap: 8 }}>
                <Region
                    name="info_text1"
                    layout={{ width: 134, flexShrink: 0, maxWidth: 134, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfoText1 ?? 'This spell will produce yy yy yyyyyyyy yyyyyy yy yyy xxxxxx xxx xxxxx'}
                        textOptions={{ fill: '#93999a', wordWrap: true, wordWrapWidth: 134 }}
                    />
                </Region>
                <Region
                    name="info_text2"
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
                tintColor="#299f3a"
                onPointerTap={onBtnCraft}
                layout={{ position: 'absolute', left: 294, width: 216, top: 317, height: 30, minWidth: 216, maxWidth: 216 }}
            />
            {(visibleProgressBar ?? false) && (
                <Region
                    name="progress_bar"
                    onPointerTap={onProgressBar}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 285, width: 225, top: 316, height: 31 }}
                >
                    <Button
                        variant="3"
                        name="btn_cancel"
                        onPointerTap={onBtnCancel}
                        layout={{ position: 'absolute', left: 9, width: 216, top: 1, height: 30, minWidth: 216, maxWidth: 216 }}
                    >
                        {t('generic.cancel')}
                    </Button>
                    <Border
                        variant="3"
                        name="bar"
                        tintColor="#299f3a"
                        layout={{ position: 'absolute', left: 9, width: 14, top: 2, height: 27 }}
                    >
                        <Region
                            backgroundColor="#000000"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 14, height: 13 }}
                        />
                    </Border>
                    <Region
                        backgroundColor="#000000"
                        layout={{ position: 'absolute', left: 9, width: 1, top: 4, height: 24 }}
                    />
                </Region>
            )}
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 26, width: 246, top: 69, height: 108 }}
            >
                <Region
                    name="itemgrid_products"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, width: '100%' }}
                >
                    <Region layout={{ width: 40, height: 40, flexShrink: 0 }}>
                        <ThemeImage
                            name="bitmap"
                            src={srcBitmap}
                            tint={tintBitmap}
                            layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 40, minWidth: 40, maxWidth: 40 }}
                        />
                        <Region
                            name="tooltip"
                            onPointerTap={onTooltip}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                        >
                            {tooltip}
                        </Region>
                        {(visibleNumberContainer ?? false) && (
                            <Region
                                name="number_container"
                                backgroundColor="#2f6982"
                                onPointerTap={onNumberContainer}
                                cursor="pointer"
                                layout={{ position: 'absolute', left: 33, right: 1, top: 2, height: 15 }}
                            >
                                <Region
                                    name="number"
                                    layout={{ position: 'absolute', left: 1, width: 4, top: 1, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionNumber ?? ''}
                                        textOptions={{ fill: '#2f6982' }}
                                    />
                                </Region>
                            </Region>
                        )}
                    </Region>
                </Region>
            </ScrollArea>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 26, width: 246, top: 238, height: 108 }}
            >
                <Region
                    name="itemgrid_inventory"
                    layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, width: '100%' }}
                >
                    {itemsItemgridInventory}
                </Region>
            </ScrollArea>
            <Region
                name="itemgrid_mixer"
                layout={{ position: 'absolute', left: 294, width: 216, top: 71, height: 85, flexDirection: 'row', flexWrap: 'wrap', gap: 5 }}
            >
                {itemsItemgridMixer}
            </Region>
        </Frame>
    );
};
