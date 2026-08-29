import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1439_inventory_effects_xml` (layout "inventory_effects", 468x247) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryEffectsLayoutProps {
    effectsContent?: InventoryEffectsLayoutEffectsContentProps;
    layout?: BoxLayout;
}

export const InventoryEffectsLayout = ({ effectsContent, layout }: InventoryEffectsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 468, height: 247, ...layout }}>
            <InventoryEffectsLayoutEffectsContent {...effectsContent} />
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
            src={srcActiveItemsImage}
            layout={{ width: 128, height: 157, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `effects_content` of InventoryEffectsLayout - configured through the parent's `effectsContent` prop. */
export interface InventoryEffectsLayoutEffectsContentProps {
    captionActiveTitle?: string;
    captionEffectDescriptionText?: string;
    captionMyEffectsTitle?: string;
    itemsActiveItems?: ReactNode;
    itemsInactiveItems?: ReactNode;
    layout?: BoxLayout;
    onActivateEffectButton?: () => void;
    srcEffectDescriptionImage?: string;
}

export const InventoryEffectsLayoutEffectsContent = ({ captionActiveTitle, captionEffectDescriptionText, captionMyEffectsTitle, itemsActiveItems, itemsInactiveItems, layout, onActivateEffectButton, srcEffectDescriptionImage }: InventoryEffectsLayoutEffectsContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="effects_content"
            layout={{ position: 'absolute', left: 0, width: 468, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ActiveTitle"
                layout={{ position: 'absolute', right: 110, width: 42, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionActiveTitle ?? 'Active:'}
                    textStyle="text-style-il-heading-2"
                />
            </Region>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 10, right: 196, top: 25, bottom: 65 }}
            >
                <Region
                    name="inactive_items"
                    layout={{ flexDirection: 'column', width: '100%' }}
                >
                    {itemsInactiveItems ?? (
                        <InventoryEffectsLayoutInactiveItemsImageItem />
                    )}
                </Region>
            </ScrollArea>
            {/* <scrollbar_vertical> for inactive_items - rendered by that list's ScrollArea */}
            <Region
                name="active_items"
                layout={{ position: 'absolute', right: 30, width: 128, top: 25, bottom: 65, flexDirection: 'column' }}
            >
                {itemsActiveItems ?? (
                    <InventoryEffectsLayoutActiveItemsImageItem />
                )}
            </Region>
            {/* <scrollbar_vertical> for inactive_items - rendered by that list's ScrollArea */}
            <Region
                name="myEffectsTitle"
                layout={{ position: 'absolute', left: 6, right: 396, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMyEffectsTitle ?? 'My Effects:'}
                    textStyle="text-style-il-heading-2"
                />
            </Region>
            <Region
                name="descriptionArea"
                layout={{ position: 'absolute', left: 0, right: -52, bottom: 0, height: 55 }}
            >
                <ThemeImage
                    name="effectDescriptionImage"
                    src={srcEffectDescriptionImage}
                    layout={{ position: 'absolute', left: 15, width: 50, top: 0, height: 50 }}
                />
                <Button
                    variant="3"
                    name="activateEffect_button"
                    onPointerTap={onActivateEffectButton}
                    layout={{ position: 'absolute', right: 109, width: 66, top: 0, height: 28 }}
                >
                    Activate
                </Button>
                <Region
                    name="effectDescriptionText"
                    layout={{ position: 'absolute', left: 75, right: 189, top: 0, height: 55, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionEffectDescriptionText ?? t('inventory.effects.defaultdescription')}
                        textStyle="text-style-il-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 256 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
