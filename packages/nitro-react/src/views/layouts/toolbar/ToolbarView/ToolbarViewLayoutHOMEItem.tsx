import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `HOME` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutHOMEItemProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onHOME?: () => void;
    srcIconsToolbarHome?: string;
    visibleBgHome?: boolean;
    visibleIconsToolbarHome?: boolean;
}

export const ToolbarViewLayoutHOMEItem = ({ context, layout, onHOME, srcIconsToolbarHome, visibleBgHome, visibleIconsToolbarHome }: ToolbarViewLayoutHOMEItemProps) => {
    return (
        (context === undefined || [ 'hotel' ].includes(context)) && (
            <Region
                name="HOME"
                onPointerTap={onHOME}
                cursor="pointer"
                layout={{ width: 76, height: 70, flexShrink: 0, ...layout }}
            >
                {(visibleBgHome ?? true) && (
                    <Border
                        variant="2"
                        name="bg_home"
                        tintColor="#57544d"
                        layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 8, justifyContent: 'center' }}
                    >
                        {(visibleIconsToolbarHome ?? true) && (
                            <ThemeImage
                                name="icons_toolbar_home"
                                src={srcIconsToolbarHome ?? layoutImage('icons_toolbar_home_normal.png')}
                                layout={{ position: 'absolute', width: 60, top: -2, height: 60 }}
                            />
                        )}
                    </Border>
                )}
                <ThemeImage
                    src={layoutImage('icons_toolbar_divider.png')}
                    layout={{ position: 'absolute', left: 0, width: 76, top: 64, height: 2 }}
                />
            </Region>
        )
    );
};
