import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `RECEPTION` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutRECEPTIONItemProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onRECEPTION?: () => void;
    srcIconsToolbarReception?: string;
    visibleBgReception?: boolean;
    visibleIconsToolbarReception?: boolean;
}

export const ToolbarViewLayoutRECEPTIONItem = ({ context, layout, onRECEPTION, srcIconsToolbarReception, visibleBgReception, visibleIconsToolbarReception }: ToolbarViewLayoutRECEPTIONItemProps) => {
    return (
        (context === undefined || [ 'room', 'gameCenter' ].includes(context)) && (
            <Region
                name="RECEPTION"
                onPointerTap={onRECEPTION}
                cursor="pointer"
                layout={{ width: 76, height: 70, flexShrink: 0, ...layout }}
            >
                {(visibleBgReception ?? true) && (
                    <Border
                        variant="2"
                        name="bg_reception"
                        tintColor="#57544d"
                        layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 8, justifyContent: 'center' }}
                    >
                        {(visibleIconsToolbarReception ?? true) && (
                            <ThemeImage
                                name="icons_toolbar_reception"
                                src={srcIconsToolbarReception ?? layoutImage('icons_toolbar_reception_normal.png')}
                                layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
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
