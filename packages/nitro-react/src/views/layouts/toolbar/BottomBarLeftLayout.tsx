import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1216_bottom_bar_left_xml` (layout "bottom_bar_left", 623x46) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BottomBarLeftLayoutProps {
    layout?: BoxLayout;
    mainToolbar?: BottomBarLeftLayoutMainToolbarProps;
}

export const BottomBarLeftLayout = ({ layout, mainToolbar }: BottomBarLeftLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 623, height: 46, ...layout }}>
            <BottomBarLeftLayoutMainToolbar {...mainToolbar} />
        </Region>
    );
};

/** Named region `toolbar_items` of BottomBarLeftLayout - configured through the parent's `toolbarItems` prop. */
export interface BottomBarLeftLayoutToolbarItemsProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onBUILDER?: () => void;
    onCAMERA?: () => void;
    onCATALOGUE?: () => void;
    onGAMES?: () => void;
    onHOME?: () => void;
    onINVENTORY?: () => void;
    onMEMENU?: () => void;
    onNAVIGATOR?: () => void;
    onPROGRESSION?: () => void;
    onRECEPTION?: () => void;
    onSTORIES?: () => void;
    onWIREDMENU?: () => void;
    srcIconMeMenu?: string;
    srcIconsToolbarBuilder?: string;
    srcIconsToolbarCamera?: string;
    srcIconsToolbarCatalogue?: string;
    srcIconsToolbarGames?: string;
    srcIconsToolbarHome?: string;
    srcIconsToolbarInventory?: string;
    srcIconsToolbarNavigator?: string;
    srcIconsToolbarProgression?: string;
    srcIconsToolbarReception?: string;
    srcIconsToolbarStories?: string;
    srcIconsToolbarWiredMenu?: string;
    srcLine?: string;
}

export const BottomBarLeftLayoutToolbarItems = ({ context, layout, onBUILDER, onCAMERA, onCATALOGUE, onGAMES, onHOME, onINVENTORY, onMEMENU, onNAVIGATOR, onPROGRESSION, onRECEPTION, onSTORIES, onWIREDMENU, srcIconMeMenu, srcIconsToolbarBuilder, srcIconsToolbarCamera, srcIconsToolbarCatalogue, srcIconsToolbarGames, srcIconsToolbarHome, srcIconsToolbarInventory, srcIconsToolbarNavigator, srcIconsToolbarProgression, srcIconsToolbarReception, srcIconsToolbarStories, srcIconsToolbarWiredMenu, srcLine }: BottomBarLeftLayoutToolbarItemsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="toolbar_items"
            layout={{ position: 'absolute', left: 19, width: 607, top: 0, height: 46, ...layout }}
        >
            {(context === undefined || [ 'room', 'gameCenter' ].includes(context)) && (
                <Region
                    name="RECEPTION"
                    tooltip="${toolbar.icon.tooltip.exitroom.hotelview)"
                    dynamicStyle="lifted_hover"
                    onPointerTap={onRECEPTION}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 45, top: 1, height: 41, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_reception"
                        src={srcIconsToolbarReception ?? layoutImage('bottom_bar_logo.png')}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 28, top: 5, height: 28 }}
                    />
                </Region>
            )}
            {(context === undefined || [ 'hotel', 'noob' ].includes(context)) && (
                <Region
                    name="HOME"
                    tooltip={t('toolbar.icon.tooltip.exitroom.home')}
                    dynamicStyle="lifted_hover"
                    onPointerTap={onHOME}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 53, width: 45, top: 1, height: 41, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_home"
                        src={srcIconsToolbarHome ?? layoutImage('bottom_bar_home.png')}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 32, top: 5, height: 30 }}
                    />
                </Region>
            )}
            {(context === undefined || [ 'hotel', 'room', 'gameCenter', 'noob' ].includes(context)) && (
                <Region
                    name="NAVIGATOR"
                    tooltip={t('toolbar.icon.label.navigator')}
                    dynamicStyle="lifted_hover"
                    onPointerTap={onNAVIGATOR}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 106, width: 45, top: 1, height: 41, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_navigator"
                        src={srcIconsToolbarNavigator ?? layoutImage('bottom_bar_navigator.png')}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 44, top: 5, height: 30 }}
                    />
                </Region>
            )}
            {(context === undefined || [ 'room' ].includes(context)) && (
                <Region
                    name="PROGRESSION"
                    tooltip={t('toolbar.icon.label.progression')}
                    dynamicStyle="lifted_hover"
                    onPointerTap={onPROGRESSION}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 159, width: 45, top: 1, height: 41, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_progression"
                        src={srcIconsToolbarProgression ?? layoutImage('bottom_bar_progression.png')}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 44, top: 0, height: 37 }}
                    />
                </Region>
            )}
            {(context === undefined || [ 'room', 'hotel' ].includes(context)) && (
                <Region
                    name="GAMES"
                    tooltip={t('toolbar.icon.label.games')}
                    dynamicStyle="lifted_hover"
                    onPointerTap={onGAMES}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 212, width: 45, top: 1, height: 41, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_games"
                        src={srcIconsToolbarGames ?? layoutImage('bottom_bar_games.png')}
                        layout={{ position: 'absolute', width: 33, top: 0, height: 43 }}
                    />
                </Region>
            )}
            {(context === undefined || [ 'hotel' ].includes(context)) && (
                <Region
                    name="STORIES"
                    tooltip={t('toolbar.icon.label.stories')}
                    dynamicStyle="lifted_hover"
                    onPointerTap={onSTORIES}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 265, width: 45, top: 1, height: 41, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_stories"
                        src={srcIconsToolbarStories ?? layoutImage('bottom_bar_stories.png')}
                        layout={{ position: 'absolute', width: 35, top: 1, height: 37 }}
                    />
                </Region>
            )}
            {(context === undefined || [ 'room', 'hotel', 'gameCenter', 'collapsed', 'noob' ].includes(context)) && (
                <Region
                    name="CATALOGUE"
                    tooltip={t('toolbar.icon.label.catalogue')}
                    dynamicStyle="lifted_hover"
                    onPointerTap={onCATALOGUE}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 318, width: 45, top: 1, height: 41, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_catalogue"
                        src={srcIconsToolbarCatalogue ?? layoutImage('bottom_bar_shop.png')}
                        layout={{ position: 'absolute', width: 37, top: 1, height: 37 }}
                    />
                </Region>
            )}
            {(context === undefined || [ 'room', 'hotel', 'collapsed', 'noob' ].includes(context)) && (
                <Region
                    name="BUILDER"
                    tooltip={t('toolbar.icon.label.builder')}
                    dynamicStyle="lifted_hover"
                    onPointerTap={onBUILDER}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 371, width: 45, top: 1, height: 41, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_builder"
                        src={srcIconsToolbarBuilder ?? layoutImage('bottom_bar_buildersclub.png')}
                        layout={{ position: 'absolute', width: 35, top: 1, height: 37 }}
                    />
                </Region>
            )}
            {(context === undefined || [ 'room', 'collapsed', 'noob' ].includes(context)) && (
                <Region
                    name="INVENTORY"
                    tooltip={t('toolbar.icon.label.inventory')}
                    dynamicStyle="lifted_hover"
                    onPointerTap={onINVENTORY}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 424, width: 45, top: 1, height: 43, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_inventory"
                        src={srcIconsToolbarInventory ?? layoutImage('bottom_bar_inventory.png')}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 44, top: 0, height: 41 }}
                    />
                </Region>
            )}
            {(context === undefined || [ 'room', 'hotel', 'gameCenter', 'collapsed', 'noob' ].includes(context)) && (
                <Region
                    name="MEMENU"
                    tooltip={t('toolbar.icon.label.memenu')}
                    dynamicStyle="lifted_hover"
                    onPointerTap={onMEMENU}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 477, width: 45, top: 1, height: 45, justifyContent: 'center' }}
                >
                    <ThemeImage
                        src={layoutImage('bottom_bar_memenu_bg.png')}
                        layout={{ position: 'absolute', left: 0, width: 45, top: -1, height: 45 }}
                    />
                    <ThemeImage
                        name="icon_me_menu"
                        src={srcIconMeMenu}
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 44, top: -1, height: 41 }}
                    />
                    <ThemeImage
                        src={layoutImage('bottom_bar_memenu_circle.png')}
                        layout={{ position: 'absolute', left: 0, width: 45, top: -1, height: 45 }}
                    />
                </Region>
            )}
            {(context === undefined || [ 'room', 'collapsed', 'noob' ].includes(context)) && (
                <Region
                    name="WIRED_MENU"
                    tooltip={t('toolbar.icon.label.wired_menu')}
                    dynamicStyle="lifted_hover"
                    onPointerTap={onWIREDMENU}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 530, width: 45, top: 1, height: 45, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_wired_menu"
                        src={srcIconsToolbarWiredMenu ?? layoutImage('bottom_bar_wired_menu.png')}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 38, top: 0, height: 45 }}
                    />
                </Region>
            )}
            {(context === undefined || [ 'room', 'collapsed', 'noob' ].includes(context)) && (
                <Region
                    name="CAMERA"
                    tooltip={t('camera.interface.title')}
                    dynamicStyle="lifted_hover"
                    onPointerTap={onCAMERA}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 583, width: 45, top: 1, height: 45, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_camera"
                        src={srcIconsToolbarCamera ?? layoutImage('bottom_bar_camera.png')}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 38, top: 0, height: 45 }}
                    />
                </Region>
            )}
            <ThemeImage
                name="line"
                src={srcLine ?? layoutImage('bottom_bar_divider_1px.png')}
                layout={{ position: 'absolute', left: 636, width: 1, top: 1, height: 40 }}
            />
        </Region>
    );
};

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
            layout={{ position: 'absolute', left: 0, width: 623, top: 0, height: 46, ...layout }}
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
                        layout={{ position: 'absolute', left: 0, width: 15, top: -2, height: 45, justifyContent: 'center' }}
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
                        layout={{ position: 'absolute', left: 0, width: 15, top: -2, height: 46, justifyContent: 'center' }}
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
