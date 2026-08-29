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
            params={17}
            src={srcInactiveItemsImage}
            layout={{ width: 172, height: 157, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `inactive_items` of InventoryEffectsLayout - configured through the parent's `inactiveItems` prop. */
export interface InventoryEffectsLayoutInactiveItemsProps {
    itemsInactiveItems?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryEffectsLayoutInactiveItems = ({ itemsInactiveItems, layout }: InventoryEffectsLayoutInactiveItemsProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 10, right: 196, top: 25, bottom: 65, ...layout }}
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

/** Named region `active_items` of InventoryEffectsLayout - configured through the parent's `activeItems` prop. */
export interface InventoryEffectsLayoutActiveItemsProps {
    itemsActiveItems?: ReactNode;
    layout?: BoxLayout;
}

export const InventoryEffectsLayoutActiveItems = ({ itemsActiveItems, layout }: InventoryEffectsLayoutActiveItemsProps) => {
    return (
        <Region
            name="active_items"
            params={2128}
            layout={{ position: 'absolute', right: 30, width: 128, top: 25, bottom: 65, flexDirection: 'column', ...layout }}
        >
            {itemsActiveItems ?? (
                <InventoryEffectsLayoutActiveItemsImageItem />
            )}
        </Region>
    );
};

/** Named region `descriptionArea` of InventoryEffectsLayout - configured through the parent's `descriptionArea` prop. */
export interface InventoryEffectsLayoutDescriptionAreaProps {
    captionEffectDescriptionText?: string;
    layout?: BoxLayout;
    onActivateEffectButton?: () => void;
    srcEffectDescriptionImage?: string;
}

export const InventoryEffectsLayoutDescriptionArea = ({ captionEffectDescriptionText, layout, onActivateEffectButton, srcEffectDescriptionImage }: InventoryEffectsLayoutDescriptionAreaProps) => {
    const t = useTranslation();

    return (
        <Region
            name="descriptionArea"
            params={1168}
            layout={{ position: 'absolute', left: 0, right: -52, bottom: 0, height: 55, ...layout }}
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
                layout={{ position: 'absolute', right: 109, width: 66, top: 0, height: 28 }}
            >
                Activate
            </Button>
            <Region
                name="effectDescriptionText"
                params={144}
                layout={{ position: 'absolute', left: 75, right: 189, top: 0, height: 55, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionEffectDescriptionText ?? t('inventory.effects.defaultdescription')}
                    textStyle="text-style-il-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 256 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `effects_content` of InventoryEffectsLayout - configured through the parent's `effectsContent` prop. */
export interface InventoryEffectsLayoutEffectsContentProps {
    activeItems?: InventoryEffectsLayoutActiveItemsProps;
    captionActiveTitle?: string;
    captionMyEffectsTitle?: string;
    descriptionArea?: InventoryEffectsLayoutDescriptionAreaProps;
    inactiveItems?: InventoryEffectsLayoutInactiveItemsProps;
    layout?: BoxLayout;
}

export const InventoryEffectsLayoutEffectsContent = ({ activeItems, captionActiveTitle, captionMyEffectsTitle, descriptionArea, inactiveItems, layout }: InventoryEffectsLayoutEffectsContentProps) => {
    return (
        <Region
            name="effects_content"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 468, top: 0, bottom: 0, ...layout }}
        >
            <Region
                name="ActiveTitle"
                params={786512}
                layout={{ position: 'absolute', right: 110, width: 42, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionActiveTitle ?? 'Active:'}
                    textStyle="text-style-il-heading-2"
                />
            </Region>
            <InventoryEffectsLayoutInactiveItems {...inactiveItems} />
            {/* <scrollbar_vertical> for inactive_items - rendered by that list's ScrollArea */}
            <InventoryEffectsLayoutActiveItems {...activeItems} />
            {/* <scrollbar_vertical> for inactive_items - rendered by that list's ScrollArea */}
            <Region
                name="myEffectsTitle"
                params={786576}
                layout={{ position: 'absolute', left: 6, right: 396, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionMyEffectsTitle ?? 'My Effects:'}
                    textStyle="text-style-il-heading-2"
                />
            </Region>
            <InventoryEffectsLayoutDescriptionArea {...descriptionArea} />
        </Region>
    );
};
