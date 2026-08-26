import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1216_bottom_bar_left_xml` (layout "bottom_bar_left", 623x46) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BottomBarLeftLayoutProps {
    layout?: BoxLayout;
}

export const BottomBarLeftLayout = ({ layout }: BottomBarLeftLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 623, height: 46, ...layout }}>
            <Region
                name="main_toolbar"
                tags={[ 'FIT:toolbar' ]}
                layout={{ position: 'absolute', left: 0, width: 623, top: 0, height: 46 }}
            >
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 60, width: 35, top: 25, height: 16 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('common_beta_sign.png')}
                        layout={{ position: 'absolute', left: 60, width: 35, top: 25, height: 16 }}
                    />
                </Region>
                <Region
                    name="arrow_container_left"
                    tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'FIT:toolbarCollapseLeft' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 1, height: 46 }}
                >
                    <Region
                        name="collapse_left"
                        params={1}
                        layout={{ position: 'absolute', left: 0, width: 15, top: -2, height: 45 }}
                    >
                        <ThemeImage
                            name="icons_toolbar_collapse_left"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={layoutImage('roomtools_minimizebutton.png')}
                            layout={{ position: 'absolute', left: 1, width: 13, top: 0, height: 45 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="arrow_container_right"
                    tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'VISIBLE_COLLAPSED', 'FIT:toolbarCollapseRight' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 1, height: 46 }}
                >
                    <Region
                        name="collapse_right"
                        params={1}
                        layout={{ position: 'absolute', left: 0, width: 15, top: -2, height: 46 }}
                    >
                        <ThemeImage
                            name="icons_toolbar_collapse_right"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={layoutImage('roomtools_minimizebutton.png')}
                            layout={{ position: 'absolute', left: 1, width: 13, top: 0, height: 45 }}
                        />
                    </Region>
                </Region>
                <Region
                    name="toolbar_items"
                    params={16}
                    layout={{ position: 'absolute', left: 19, width: 607, top: 0, height: 46 }}
                >
                    <Region
                        name="RECEPTION"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_GAME_CENTER', 'FIT:toolbarReception', 'RECEPTION' ]}
                        tooltip="${toolbar.icon.tooltip.exitroom.hotelview)"
                        params={1}
                        dynamicStyle="lifted_hover"
                        layout={{ position: 'absolute', left: 0, width: 45, top: 1, height: 41 }}
                    >
                        <ThemeImage
                            name="icons_toolbar_reception"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={layoutImage('bottom_bar_logo.png')}
                            layout={{ position: 'absolute', left: 8, width: 28, top: 5, height: 28 }}
                        />
                    </Region>
                    <Region
                        name="HOME"
                        tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'FIT:toolbarHome', 'HOME', 'VISIBLE_NOOB' ]}
                        tooltip={t('toolbar.icon.tooltip.exitroom.home')}
                        params={1}
                        dynamicStyle="lifted_hover"
                        layout={{ position: 'absolute', left: 53, width: 45, top: 1, height: 41 }}
                    >
                        <ThemeImage
                            name="icons_toolbar_home"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={layoutImage('bottom_bar_home.png')}
                            layout={{ position: 'absolute', left: 6, width: 32, top: 5, height: 30 }}
                        />
                    </Region>
                    <Region
                        name="NAVIGATOR"
                        tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'VISIBLE_ROOM', 'VISIBLE_GAME_CENTER', 'FIT:toolbarNavigator', 'VISIBLE_NOOB' ]}
                        tooltip={t('toolbar.icon.label.navigator')}
                        params={1}
                        dynamicStyle="lifted_hover"
                        layout={{ position: 'absolute', left: 106, width: 45, top: 1, height: 41 }}
                    >
                        <ThemeImage
                            name="icons_toolbar_navigator"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={layoutImage('bottom_bar_navigator.png')}
                            layout={{ position: 'absolute', left: 0, width: 44, top: 5, height: 30 }}
                        />
                    </Region>
                    <Region
                        name="PROGRESSION"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'FIT', 'toolbarProgression' ]}
                        tooltip={t('toolbar.icon.label.progression')}
                        params={1}
                        dynamicStyle="lifted_hover"
                        layout={{ position: 'absolute', left: 159, width: 45, top: 1, height: 41 }}
                    >
                        <ThemeImage
                            name="icons_toolbar_progression"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={layoutImage('bottom_bar_progression.png')}
                            layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 37 }}
                        />
                    </Region>
                    <Region
                        name="GAMES"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'FIT:toolbarGames' ]}
                        tooltip={t('toolbar.icon.label.games')}
                        params={1}
                        dynamicStyle="lifted_hover"
                        layout={{ position: 'absolute', left: 212, width: 45, top: 1, height: 41 }}
                    >
                        <ThemeImage
                            name="icons_toolbar_games"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={layoutImage('bottom_bar_games.png')}
                            layout={{ position: 'absolute', left: 6, width: 33, top: 0, height: 43 }}
                        />
                    </Region>
                    <Region
                        name="STORIES"
                        tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'FIT:toolbarStories' ]}
                        tooltip={t('toolbar.icon.label.stories')}
                        params={1}
                        dynamicStyle="lifted_hover"
                        layout={{ position: 'absolute', left: 265, width: 45, top: 1, height: 41 }}
                    >
                        <ThemeImage
                            name="icons_toolbar_stories"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={layoutImage('bottom_bar_stories.png')}
                            layout={{ position: 'absolute', left: 5, width: 35, top: 1, height: 37 }}
                        />
                    </Region>
                    <Region
                        name="CATALOGUE"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'VISIBLE_COLLAPSED', 'FIT:toolbarCatalogue', 'VISIBLE_NOOB' ]}
                        tooltip={t('toolbar.icon.label.catalogue')}
                        params={1}
                        dynamicStyle="lifted_hover"
                        layout={{ position: 'absolute', left: 318, width: 45, top: 1, height: 41 }}
                    >
                        <ThemeImage
                            name="icons_toolbar_catalogue"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={layoutImage('bottom_bar_shop.png')}
                            layout={{ position: 'absolute', left: 4, width: 37, top: 1, height: 37 }}
                        />
                    </Region>
                    <Region
                        name="BUILDER"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_COLLAPSED', 'FIT:toolbarCatalogue', 'VISIBLE_NOOB' ]}
                        tooltip={t('toolbar.icon.label.builder')}
                        params={1}
                        dynamicStyle="lifted_hover"
                        layout={{ position: 'absolute', left: 371, width: 45, top: 1, height: 41 }}
                    >
                        <ThemeImage
                            name="icons_toolbar_builder"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={layoutImage('bottom_bar_buildersclub.png')}
                            layout={{ position: 'absolute', left: 5, width: 35, top: 1, height: 37 }}
                        />
                    </Region>
                    <Region
                        name="INVENTORY"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_COLLAPSED', 'FIT:toolbarInventory', 'VISIBLE_NOOB' ]}
                        tooltip={t('toolbar.icon.label.inventory')}
                        params={1}
                        dynamicStyle="lifted_hover"
                        layout={{ position: 'absolute', left: 424, width: 45, top: 1, height: 43 }}
                    >
                        <ThemeImage
                            name="icons_toolbar_inventory"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={layoutImage('bottom_bar_inventory.png')}
                            layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 41 }}
                        />
                    </Region>
                    <Region
                        name="MEMENU"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'VISIBLE_COLLAPSED', 'FIT:toolbarMeMenu', 'VISIBLE_NOOB' ]}
                        tooltip={t('toolbar.icon.label.memenu')}
                        params={1}
                        dynamicStyle="lifted_hover"
                        layout={{ position: 'absolute', left: 477, width: 45, top: 1, height: 45 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('bottom_bar_memenu_bg.png')}
                            layout={{ position: 'absolute', left: 0, width: 45, top: -1, height: 45 }}
                        />
                        <ThemeImage
                            name="icon_me_menu"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={undefined}
                            layout={{ position: 'absolute', left: 1, width: 44, top: -1, height: 41 }}
                        />
                        <ThemeImage
                            src={layoutImage('bottom_bar_memenu_circle.png')}
                            layout={{ position: 'absolute', left: 0, width: 45, top: -1, height: 45 }}
                        />
                    </Region>
                    <Region
                        name="WIRED_MENU"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_COLLAPSED', 'VISIBLE_NOOB' ]}
                        tooltip={t('toolbar.icon.label.wired_menu')}
                        params={1}
                        dynamicStyle="lifted_hover"
                        layout={{ position: 'absolute', left: 530, width: 45, top: 1, height: 45 }}
                    >
                        <ThemeImage
                            name="icons_toolbar_wired_menu"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={layoutImage('bottom_bar_wired_menu.png')}
                            layout={{ position: 'absolute', left: 3, width: 38, top: 0, height: 45 }}
                        />
                    </Region>
                    <Region
                        name="CAMERA"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_COLLAPSED', 'VISIBLE_NOOB' ]}
                        tooltip={t('camera.interface.title')}
                        params={1}
                        dynamicStyle="lifted_hover"
                        layout={{ position: 'absolute', left: 583, width: 45, top: 1, height: 45 }}
                    >
                        <ThemeImage
                            name="icons_toolbar_camera"
                            tags={[ 'ICON_BMP', '#icon' ]}
                            params={208}
                            src={layoutImage('bottom_bar_camera.png')}
                            layout={{ position: 'absolute', left: 3, width: 38, top: 0, height: 45 }}
                        />
                    </Region>
                    <ThemeImage
                        name="line"
                        params={16}
                        src={layoutImage('bottom_bar_divider_1px.png')}
                        layout={{ position: 'absolute', left: 636, width: 1, top: 1, height: 40 }}
                    />
                </Region>
                <Border
                    variant="2"
                    params={16}
                    tintColor="#3b3933"
                    layout={{ position: 'absolute', left: -6, width: 20, top: 0, height: 43 }}
                />
            </Region>
        </Region>
    );
};
