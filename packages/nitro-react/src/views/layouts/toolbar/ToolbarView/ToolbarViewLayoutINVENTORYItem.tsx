import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `INVENTORY` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutINVENTORYItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onINVENTORY?: () => void;
    srcIconsToolbarInventory?: string;
    visibleBgInventory?: boolean;
    visibleIconsToolbarInventory?: boolean;
    visibleText?: boolean;
}

export const ToolbarViewLayoutINVENTORYItem = ({ captionText, context, layout, onINVENTORY, srcIconsToolbarInventory, visibleBgInventory, visibleIconsToolbarInventory, visibleText }: ToolbarViewLayoutINVENTORYItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'room' ].includes(context)) && (
            <Region
                name="INVENTORY"
                onPointerTap={onINVENTORY}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                {(visibleBgInventory ?? true) && (
                    <Border
                        variant="2"
                        name="bg_inventory"
                        tintColor="#57544d"
                        layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                    >
                        {(visibleIconsToolbarInventory ?? true) && (
                            <ThemeImage
                                name="icons_toolbar_inventory"
                                src={srcIconsToolbarInventory ?? layoutImage('icons_toolbar_inventory_normal.png')}
                                layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                            />
                        )}
                    </Border>
                )}
                {(visibleText ?? true) && (
                    <Region
                        name="text"
                        layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionText ?? t('toolbar.icon.label.inventory')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                )}
            </Region>
        )
    );
};
