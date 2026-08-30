import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { InventoryEffectsLayoutActiveItemsImageItem } from './InventoryEffectsLayoutActiveItemsImageItem';
import { InventoryEffectsLayoutInactiveItemsImageItem } from './InventoryEffectsLayoutInactiveItemsImageItem';

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
    tintEffectDescriptionImage?: string;
}

export const InventoryEffectsLayoutEffectsContent = ({ captionActiveTitle, captionEffectDescriptionText, captionMyEffectsTitle, itemsActiveItems, itemsInactiveItems, layout, onActivateEffectButton, srcEffectDescriptionImage, tintEffectDescriptionImage }: InventoryEffectsLayoutEffectsContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="effects_content"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeText
                text={captionActiveTitle ?? 'Active:'}
                textStyle="text-style-il-heading-2"
                name="ActiveTitle"
                layout={{ position: 'absolute', right: 110, width: 42, top: 7, height: 17 }}
            />
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
            <ThemeText
                text={captionMyEffectsTitle ?? 'My Effects:'}
                textStyle="text-style-il-heading-2"
                name="myEffectsTitle"
                layout={{ position: 'absolute', left: 6, right: 396, top: 7, height: 17 }}
            />
            <Region
                name="descriptionArea"
                layout={{ position: 'absolute', left: 0, right: -52, bottom: 0, height: 55 }}
            >
                <ThemeImage
                    name="effectDescriptionImage"
                    src={srcEffectDescriptionImage}
                    tint={tintEffectDescriptionImage}
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
                <ThemeText
                    text={captionEffectDescriptionText ?? t('inventory.effects.defaultdescription')}
                    textStyle="text-style-il-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 256 }}
                    name="effectDescriptionText"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 75, right: 189, top: 0, bottom: 0 }}
                />
            </Region>
        </Region>
    );
};
