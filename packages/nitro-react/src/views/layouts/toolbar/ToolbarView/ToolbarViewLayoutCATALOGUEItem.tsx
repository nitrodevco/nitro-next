import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `CATALOGUE` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutCATALOGUEItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onCATALOGUE?: () => void;
    srcIconsToolbarCatalogue?: string;
    visibleBgCatalogue?: boolean;
    visibleIconsToolbarCatalogue?: boolean;
    visibleText?: boolean;
}

export const ToolbarViewLayoutCATALOGUEItem = ({ captionText, context, layout, onCATALOGUE, srcIconsToolbarCatalogue, visibleBgCatalogue, visibleIconsToolbarCatalogue, visibleText }: ToolbarViewLayoutCATALOGUEItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'room', 'hotel', 'gameCenter' ].includes(context)) && (
            <Region
                name="CATALOGUE"
                onPointerTap={onCATALOGUE}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                {(visibleBgCatalogue ?? true) && (
                    <Border
                        variant="2"
                        name="bg_catalogue"
                        tintColor="#57544d"
                        layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                    >
                        {(visibleIconsToolbarCatalogue ?? true) && (
                            <ThemeImage
                                name="icons_toolbar_catalogue"
                                src={srcIconsToolbarCatalogue ?? layoutImage('icons_toolbar_catalogue_normal.png')}
                                layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                            />
                        )}
                    </Border>
                )}
                {(visibleText ?? true) && (
                    <ThemeText
                        text={captionText ?? t('toolbar.icon.label.catalogue')}
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="text"
                        layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17 }}
                    />
                )}
            </Region>
        )
    );
};
