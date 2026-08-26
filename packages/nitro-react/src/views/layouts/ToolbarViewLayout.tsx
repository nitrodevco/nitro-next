import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1242_toolbar_view_xml` (layout "toolbar_view_squeezed", 87x875) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ToolbarViewLayoutProps {
    layout?: BoxLayout;
}

export const ToolbarViewLayout = ({ layout }: ToolbarViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 87, height: 875, ...layout }}>
            <Border
                variant="6"
                name="main_toolbar"
                tags={[ 'FIT:toolbar' ]}
                params={147456}
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 0, width: 87, top: 0, height: 875 }}
            >
                <Region
                    name="toolbar_items"
                    params={8536080}
                    layout={{ position: 'absolute', left: 0, width: 87, top: 5, height: 870, flexDirection: 'column' }}
                >
                    <Region
                        name="RECEPTION"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_GAME_CENTER', 'FIT:toolbarReception', 'RECEPTION' ]}
                        params={17}
                        layout={{ width: 76, height: 70, flexShrink: 0 }}
                    >
                        <Border
                            variant="2"
                            name="bg_reception"
                            tags={[ 'ICON_BORDER' ]}
                            params={2064}
                            tintColor="#57544d"
                            layout={{ position: 'absolute', left: 3, width: 70, top: 5, height: 57 }}
                        >
                            <ThemeImage
                                name="icons_toolbar_reception"
                                tags={[ 'ICON_BMP' ]}
                                params={208}
                                src={layoutImage('icons_toolbar_reception_normal.png')}
                                layout={{ position: 'absolute', left: 5, width: 60, top: 0, height: 60 }}
                            />
                        </Border>
                        <ThemeImage
                            params={16}
                            src={layoutImage('icons_toolbar_divider.png')}
                            layout={{ position: 'absolute', left: 0, width: 76, top: 64, height: 2 }}
                        />
                    </Region>
                    <Region
                        name="HOME"
                        tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'FIT:toolbarHome', 'HOME' ]}
                        params={17}
                        layout={{ width: 76, height: 70, flexShrink: 0 }}
                    >
                        <Border
                            variant="2"
                            name="bg_home"
                            tags={[ 'ICON_BORDER' ]}
                            params={2064}
                            tintColor="#57544d"
                            layout={{ position: 'absolute', left: 3, width: 70, top: 5, height: 57 }}
                        >
                            <ThemeImage
                                name="icons_toolbar_home"
                                tags={[ 'ICON_BMP' ]}
                                params={208}
                                src={layoutImage('icons_toolbar_home_normal.png')}
                                layout={{ position: 'absolute', left: 5, width: 60, top: -2, height: 60 }}
                            />
                        </Border>
                        <ThemeImage
                            params={16}
                            src={layoutImage('icons_toolbar_divider.png')}
                            layout={{ position: 'absolute', left: 0, width: 76, top: 64, height: 2 }}
                        />
                    </Region>
                    <Region
                        name="NAVIGATOR"
                        tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'VISIBLE_ROOM', 'VISIBLE_GAME_CENTER', 'FIT:toolbarNavigator' ]}
                        params={17}
                        layout={{ width: 76, height: 80, flexShrink: 0 }}
                    >
                        <Border
                            variant="2"
                            name="bg_navigator"
                            tags={[ 'ICON_BORDER' ]}
                            params={2064}
                            tintColor="#57544d"
                            layout={{ position: 'absolute', left: 3, width: 70, top: 5, height: 75 }}
                        >
                            <ThemeImage
                                name="icons_toolbar_navigator"
                                tags={[ 'ICON_BMP' ]}
                                params={208}
                                src={layoutImage('icons_toolbar_navigator_normal.png')}
                                layout={{ position: 'absolute', left: 5, width: 60, top: -2, height: 60 }}
                            />
                        </Border>
                        <Region
                            name="text"
                            params={263184}
                            layout={{ position: 'absolute', left: 0, width: 76, top: 62, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('toolbar.icon.label.navigator')}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="QUESTS"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'FIT:toolbarQuests' ]}
                        params={17}
                        layout={{ width: 76, height: 80, flexShrink: 0 }}
                    >
                        <Border
                            variant="2"
                            name="bg_quests"
                            tags={[ 'ICON_BORDER' ]}
                            params={2064}
                            tintColor="#57544d"
                            layout={{ position: 'absolute', left: 3, width: 70, top: 5, height: 75 }}
                        >
                            <ThemeImage
                                name="icons_toolbar_quests"
                                tags={[ 'ICON_BMP' ]}
                                params={208}
                                src={layoutImage('icons_toolbar_quests_normal.png')}
                                layout={{ position: 'absolute', left: 5, width: 60, top: 0, height: 60 }}
                            />
                        </Border>
                        <Region
                            name="text"
                            params={263184}
                            layout={{ position: 'absolute', left: 0, width: 76, top: 62, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('toolbar.icon.label.quests')}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="GAMES"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'FIT:toolbarGames' ]}
                        params={17}
                        layout={{ width: 76, height: 80, flexShrink: 0 }}
                    >
                        <Border
                            variant="2"
                            name="bg_games"
                            tags={[ 'ICON_BORDER' ]}
                            params={2064}
                            tintColor="#57544d"
                            layout={{ position: 'absolute', left: 3, width: 70, top: 5, height: 75 }}
                        >
                            <ThemeImage
                                name="icons_toolbar_games"
                                tags={[ 'ICON_BMP' ]}
                                params={208}
                                src={layoutImage('icons_toolbar_games_normal.png')}
                                layout={{ position: 'absolute', left: 5, width: 60, top: 0, height: 60 }}
                            />
                        </Border>
                        <Region
                            name="text"
                            params={263184}
                            layout={{ position: 'absolute', left: 0, width: 76, top: 62, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('toolbar.icon.label.games')}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="STORIES"
                        tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'FIT:toolbarStories' ]}
                        params={17}
                        layout={{ width: 76, height: 80, flexShrink: 0 }}
                    >
                        <Border
                            variant="2"
                            name="bg_stories"
                            tags={[ 'ICON_BORDER' ]}
                            params={2064}
                            tintColor="#57544d"
                            layout={{ position: 'absolute', left: 3, width: 70, top: 5, height: 75 }}
                        >
                            <ThemeImage
                                name="icons_toolbar_stories"
                                tags={[ 'ICON_BMP' ]}
                                params={208}
                                src={layoutImage('icons_toolbar_stories_normal.png')}
                                layout={{ position: 'absolute', left: 5, width: 60, top: 0, height: 60 }}
                            />
                        </Border>
                        <Region
                            name="text"
                            params={263184}
                            layout={{ position: 'absolute', left: 0, width: 76, top: 62, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('toolbar.icon.label.stories')}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="ACHIEVEMENTS"
                        tags={[ 'TOGGLE', 'FIT:toolbarAchievements' ]}
                        params={17}
                        layout={{ width: 76, height: 80, flexShrink: 0 }}
                    >
                        <Border
                            variant="2"
                            name="bg_achievements"
                            tags={[ 'ICON_BORDER' ]}
                            params={2064}
                            tintColor="#57544d"
                            layout={{ position: 'absolute', left: 3, width: 70, top: 5, height: 75 }}
                        >
                            <ThemeImage
                                name="icons_toolbar_achievements"
                                tags={[ 'ICON_BMP' ]}
                                params={208}
                                src={layoutImage('icons_toolbar_achievements_normal.png')}
                                layout={{ position: 'absolute', left: 5, width: 60, top: 0, height: 60 }}
                            />
                        </Border>
                        <Region
                            name="text"
                            params={263184}
                            layout={{ position: 'absolute', left: 0, width: 76, top: 62, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('toolbar.icon.label.achievements')}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="CATALOGUE"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'FIT:toolbarCatalogue' ]}
                        params={17}
                        layout={{ width: 76, height: 80, flexShrink: 0 }}
                    >
                        <Border
                            variant="2"
                            name="bg_catalogue"
                            tags={[ 'ICON_BORDER' ]}
                            params={2064}
                            tintColor="#57544d"
                            layout={{ position: 'absolute', left: 3, width: 70, top: 5, height: 75 }}
                        >
                            <ThemeImage
                                name="icons_toolbar_catalogue"
                                tags={[ 'ICON_BMP' ]}
                                params={208}
                                src={layoutImage('icons_toolbar_catalogue_normal.png')}
                                layout={{ position: 'absolute', left: 5, width: 60, top: 0, height: 60 }}
                            />
                        </Border>
                        <Region
                            name="text"
                            params={263184}
                            layout={{ position: 'absolute', left: 0, width: 76, top: 62, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('toolbar.icon.label.catalogue')}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="BUILDER"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'FIT:toolbarCatalogue' ]}
                        params={17}
                        layout={{ width: 76, height: 80, flexShrink: 0 }}
                    >
                        <Border
                            variant="2"
                            name="bg_builder"
                            tags={[ 'ICON_BORDER' ]}
                            params={2064}
                            tintColor="#57544d"
                            layout={{ position: 'absolute', left: 3, width: 70, top: 5, height: 75 }}
                        >
                            <ThemeImage
                                name="icons_toolbar_builder"
                                tags={[ 'ICON_BMP' ]}
                                params={208}
                                src={layoutImage('icons_toolbar_builder_normal.png')}
                                layout={{ position: 'absolute', left: 5, width: 60, top: 0, height: 60 }}
                            />
                        </Border>
                        <Region
                            name="text"
                            params={263184}
                            layout={{ position: 'absolute', left: 0, width: 76, top: 62, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('toolbar.icon.label.builder')}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="INVENTORY"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'FIT:toolbarInventory' ]}
                        params={17}
                        layout={{ width: 76, height: 80, flexShrink: 0 }}
                    >
                        <Border
                            variant="2"
                            name="bg_inventory"
                            tags={[ 'ICON_BORDER' ]}
                            params={2064}
                            tintColor="#57544d"
                            layout={{ position: 'absolute', left: 3, width: 70, top: 5, height: 75 }}
                        >
                            <ThemeImage
                                name="icons_toolbar_inventory"
                                tags={[ 'ICON_BMP' ]}
                                params={208}
                                src={layoutImage('icons_toolbar_inventory_normal.png')}
                                layout={{ position: 'absolute', left: 5, width: 60, top: 0, height: 60 }}
                            />
                        </Border>
                        <Region
                            name="text"
                            params={263184}
                            layout={{ position: 'absolute', left: 0, width: 76, top: 62, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('toolbar.icon.label.inventory')}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="MEMENU"
                        tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'FIT:toolbarMeMenu' ]}
                        params={17}
                        layout={{ width: 76, height: 80, flexShrink: 0 }}
                    >
                        <Border
                            variant="2"
                            name="bg_memenu"
                            tags={[ 'ICON_BORDER' ]}
                            params={2064}
                            tintColor="#57544d"
                            layout={{ position: 'absolute', left: 3, width: 70, top: 5, height: 75 }}
                        >
                            <ThemeImage
                                name="icon_me_menu"
                                tags={[ 'ICON_BMP' ]}
                                params={208}
                                src={undefined}
                                layout={{ position: 'absolute', left: 5, width: 60, top: 0, height: 60 }}
                            />
                        </Border>
                        <Region
                            name="text"
                            params={263184}
                            layout={{ position: 'absolute', left: 0, width: 76, top: 62, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={t('toolbar.icon.label.memenu')}
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                            />
                        </Region>
                        <Region
                            visible={false}
                            layout={{ position: 'absolute', left: 60, width: 13, top: 38, height: 26 }}
                        >
                            <ThemeImage
                                name="guide_icon"
                                params={16}
                                src={layoutImage('help_guide_icon.png')}
                                layout={{ position: 'absolute', left: 60, width: 13, top: 38, height: 26 }}
                            />
                        </Region>
                    </Region>
                    <ThemeImage
                        name="bottom_padding"
                        params={16}
                        src={undefined}
                        layout={{ width: 76, height: 10, flexShrink: 0 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
