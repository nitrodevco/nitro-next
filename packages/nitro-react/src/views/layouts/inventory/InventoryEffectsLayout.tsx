import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1439_inventory_effects_xml` (layout "inventory_effects", 468x247) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryEffectsLayoutProps {
    captionActiveTitle?: string;
    captionEffectDescriptionText?: string;
    captionMyEffectsTitle?: string;
    itemsActiveItems?: ReactNode;
    itemsInactiveItems?: ReactNode;
    layout?: BoxLayout;
    onActivateEffectButton?: () => void;
    srcEffectDescriptionImage?: string;
}

export const InventoryEffectsLayout = ({ captionActiveTitle, captionEffectDescriptionText, captionMyEffectsTitle, itemsActiveItems, itemsInactiveItems, layout, onActivateEffectButton, srcEffectDescriptionImage }: InventoryEffectsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 468, height: 247, ...layout }}>
            <Region
                name="effects_content"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 468, top: 0, height: 247 }}
            >
                <Region
                    name="ActiveTitle"
                    params={786512}
                    layout={{ position: 'absolute', left: 316, width: 42, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionActiveTitle ?? 'Active:'}
                        textStyle="text-style-il-heading-2"
                    />
                </Region>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 10, width: 262, top: 25, height: 157 }}
                >
                    <Region
                        name="inactive_items"
                        params={2192}
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsInactiveItems ?? (
                            <InventoryEffectsLayoutInactiveItemsImageItem />
                        )}
                    </Region>
                </ScrollArea>
                <Region
                    name="active_items"
                    params={2128}
                    layout={{ position: 'absolute', left: 310, width: 128, top: 25, height: 157, flexDirection: 'column' }}
                >
                    {itemsActiveItems ?? (
                        <InventoryEffectsLayoutActiveItemsImageItem />
                    )}
                </Region>
                <Region
                    name="myEffectsTitle"
                    params={786576}
                    layout={{ position: 'absolute', left: 6, width: 66, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMyEffectsTitle ?? 'My Effects:'}
                        textStyle="text-style-il-heading-2"
                    />
                </Region>
                <Region
                    name="descriptionArea"
                    params={1168}
                    layout={{ position: 'absolute', left: 0, width: 520, top: 192, height: 55 }}
                >
                    <ThemeImage
                        name="effectDescriptionImage"
                        params={16}
                        src={srcEffectDescriptionImage}
                        layout={{ position: 'absolute', left: 15, width: 50, top: 0, height: 50 }}
                    />
                    <Button
                        variant="3"
                        name="activateEffect_button"
                        params={131153}
                        onPointerTap={onActivateEffectButton}
                        layout={{ position: 'absolute', left: 345, width: 66, top: 0, height: 28 }}
                    >
                        Activate
                    </Button>
                    <Region
                        name="effectDescriptionText"
                        params={144}
                        layout={{ position: 'absolute', left: 75, width: 256, top: 0, height: 55, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionEffectDescriptionText ?? t('inventory.effects.defaultdescription')}
                            textStyle="text-style-il-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 256 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

/** Row template `inactive_items_image` of InventoryEffectsLayout - pass real rows through its `items…` slot. */
export interface InventoryEffectsLayoutInactiveItemsImageItemProps {
    layout?: BoxLayout;
    srcInactiveItemsImage?: string;
}

export const InventoryEffectsLayoutInactiveItemsImageItem = ({ layout, srcInactiveItemsImage }: InventoryEffectsLayoutInactiveItemsImageItemProps) => {
    return (
        <ThemeImage
            name="inactive_items_image"
            params={17}
            src={srcInactiveItemsImage}
            layout={{ width: 172, height: 157, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `active_items_image` of InventoryEffectsLayout - pass real rows through its `items…` slot. */
export interface InventoryEffectsLayoutActiveItemsImageItemProps {
    layout?: BoxLayout;
    srcActiveItemsImage?: string;
}

export const InventoryEffectsLayoutActiveItemsImageItem = ({ layout, srcActiveItemsImage }: InventoryEffectsLayoutActiveItemsImageItemProps) => {
    return (
        <ThemeImage
            name="active_items_image"
            params={17}
            src={srcActiveItemsImage}
            layout={{ width: 128, height: 157, flexShrink: 0, ...layout }}
        />
    );
};
