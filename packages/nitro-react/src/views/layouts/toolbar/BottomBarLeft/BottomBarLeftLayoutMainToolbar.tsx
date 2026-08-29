import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { BottomBarLeftLayoutToolbarItems, BottomBarLeftLayoutToolbarItemsProps } from './BottomBarLeftLayoutToolbarItems';

/** Named region `main_toolbar` of BottomBarLeftLayout - configured through the parent's `mainToolbar` prop. */
export interface BottomBarLeftLayoutMainToolbarProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onCollapseLeft?: () => void;
    onCollapseRight?: () => void;
    srcIconsToolbarCollapseLeft?: string;
    srcIconsToolbarCollapseRight?: string;
    toolbarItems?: BottomBarLeftLayoutToolbarItemsProps;
}

export const BottomBarLeftLayoutMainToolbar = ({ context, layout, onCollapseLeft, onCollapseRight, srcIconsToolbarCollapseLeft, srcIconsToolbarCollapseRight, toolbarItems }: BottomBarLeftLayoutMainToolbarProps) => {
    return (
        <Region
            name="main_toolbar"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            {/* `static_bitmap` is hidden and has no name to show it by */}
            {(context === undefined || [ 'room', 'hotel', 'gameCenter' ].includes(context)) && (
                <Region
                    name="arrow_container_left"
                    layout={{ position: 'absolute', left: 0, width: 15, top: 1, height: 46 }}
                >
                    <Region
                        name="collapse_left"
                        onPointerTap={onCollapseLeft}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, right: 0, top: -2, height: 45, justifyContent: 'center' }}
                    >
                        <ThemeImage
                            name="icons_toolbar_collapse_left"
                            src={srcIconsToolbarCollapseLeft ?? layoutImage('roomtools_minimizebutton.png')}
                            layout={{ position: 'absolute', width: 13, top: 0, height: 45 }}
                        />
                    </Region>
                </Region>
            )}
            {(context === undefined || [ 'room', 'hotel', 'gameCenter', 'collapsed' ].includes(context)) && (
                <Region
                    name="arrow_container_right"
                    layout={{ position: 'absolute', left: 0, width: 15, top: 1, height: 46 }}
                >
                    <Region
                        name="collapse_right"
                        onPointerTap={onCollapseRight}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, right: 0, top: -2, height: 46, justifyContent: 'center' }}
                    >
                        <ThemeImage
                            name="icons_toolbar_collapse_right"
                            src={srcIconsToolbarCollapseRight ?? layoutImage('roomtools_minimizebutton.png')}
                            layout={{ position: 'absolute', width: 13, top: 0, height: 45 }}
                        />
                    </Region>
                </Region>
            )}
            <BottomBarLeftLayoutToolbarItems {...toolbarItems} />
            <Border
                variant="2"
                tintColor="#3b3933"
                layout={{ position: 'absolute', left: -6, width: 20, top: 0, height: 43 }}
            />
        </Region>
    );
};
