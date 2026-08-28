import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1242_toolbar_view_xml` (layout "toolbar_view_squeezed", 87x875) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ToolbarViewLayoutProps {
    itemsToolbarItems?: ReactNode;
    layout?: BoxLayout;
}

export const ToolbarViewLayout = ({ itemsToolbarItems, layout }: ToolbarViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 87, height: 875, ...layout }}>
            <Region
                dropShadow={{ distance: 3, alpha: 0.6 }}
                layout={{ position: 'absolute', left: 0, width: 87, top: 0, height: 875 }}
            >
                <Border
                    variant="6"
                    name="main_toolbar"
                    tags={[ 'FIT:toolbar' ]}
                    params={147456}
                    tintColor="#79756e"
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="toolbar_items"
                        params={8536080}
                        layout={{ position: 'absolute', left: 0, top: 5, flexDirection: 'column' }}
                    >
                        {itemsToolbarItems ?? (
                            <>
                                <ToolbarViewLayoutRECEPTIONItem />
                                <ToolbarViewLayoutHOMEItem />
                                <ToolbarViewLayoutNAVIGATORItem />
                                <ToolbarViewLayoutQUESTSItem />
                                <ToolbarViewLayoutGAMESItem />
                                <ToolbarViewLayoutSTORIESItem />
                                <ToolbarViewLayoutACHIEVEMENTSItem />
                                <ToolbarViewLayoutCATALOGUEItem />
                                <ToolbarViewLayoutBUILDERItem />
                                <ToolbarViewLayoutINVENTORYItem />
                                <ToolbarViewLayoutMEMENUItem />
                                <ToolbarViewLayoutBottomPaddingItem />
                            </>
                        )}
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};

/** Row template `RECEPTION` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutRECEPTIONItemProps {
    layout?: BoxLayout;
    onRECEPTION?: () => void;
    srcIconsToolbarReception?: string;
}

export const ToolbarViewLayoutRECEPTIONItem = ({ layout, onRECEPTION, srcIconsToolbarReception }: ToolbarViewLayoutRECEPTIONItemProps) => {
    return (
        <Region
            name="RECEPTION"
            tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_GAME_CENTER', 'FIT:toolbarReception', 'RECEPTION' ]}
            params={17}
            onPointerTap={onRECEPTION}
            cursor="pointer"
            layout={{ width: 76, height: 70, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_reception"
                tags={[ 'ICON_BORDER' ]}
                params={2064}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 8, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_reception"
                    tags={[ 'ICON_BMP' ]}
                    params={208}
                    src={srcIconsToolbarReception ?? layoutImage('icons_toolbar_reception_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <ThemeImage
                params={16}
                src={layoutImage('icons_toolbar_divider.png')}
                layout={{ position: 'absolute', left: 0, width: 76, top: 64, height: 2 }}
            />
        </Region>
    );
};

/** Row template `HOME` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutHOMEItemProps {
    layout?: BoxLayout;
    onHOME?: () => void;
    srcIconsToolbarHome?: string;
}

export const ToolbarViewLayoutHOMEItem = ({ layout, onHOME, srcIconsToolbarHome }: ToolbarViewLayoutHOMEItemProps) => {
    return (
        <Region
            name="HOME"
            tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'FIT:toolbarHome', 'HOME' ]}
            params={17}
            onPointerTap={onHOME}
            cursor="pointer"
            layout={{ width: 76, height: 70, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_home"
                tags={[ 'ICON_BORDER' ]}
                params={2064}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 8, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_home"
                    tags={[ 'ICON_BMP' ]}
                    params={208}
                    src={srcIconsToolbarHome ?? layoutImage('icons_toolbar_home_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: -2, height: 60 }}
                />
            </Border>
            <ThemeImage
                params={16}
                src={layoutImage('icons_toolbar_divider.png')}
                layout={{ position: 'absolute', left: 0, width: 76, top: 64, height: 2 }}
            />
        </Region>
    );
};

/** Row template `NAVIGATOR` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutNAVIGATORItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onNAVIGATOR?: () => void;
    srcIconsToolbarNavigator?: string;
}

export const ToolbarViewLayoutNAVIGATORItem = ({ captionText, layout, onNAVIGATOR, srcIconsToolbarNavigator }: ToolbarViewLayoutNAVIGATORItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="NAVIGATOR"
            tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'VISIBLE_ROOM', 'VISIBLE_GAME_CENTER', 'FIT:toolbarNavigator' ]}
            params={17}
            onPointerTap={onNAVIGATOR}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_navigator"
                tags={[ 'ICON_BORDER' ]}
                params={2064}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_navigator"
                    tags={[ 'ICON_BMP' ]}
                    params={208}
                    src={srcIconsToolbarNavigator ?? layoutImage('icons_toolbar_navigator_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: -2, height: 60 }}
                />
            </Border>
            <Region
                name="text"
                params={263184}
                layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionText ?? t('toolbar.icon.label.navigator')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `QUESTS` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutQUESTSItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onQUESTS?: () => void;
    srcIconsToolbarQuests?: string;
}

export const ToolbarViewLayoutQUESTSItem = ({ captionText, layout, onQUESTS, srcIconsToolbarQuests }: ToolbarViewLayoutQUESTSItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="QUESTS"
            tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'FIT:toolbarQuests' ]}
            params={17}
            onPointerTap={onQUESTS}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_quests"
                tags={[ 'ICON_BORDER' ]}
                params={2064}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_quests"
                    tags={[ 'ICON_BMP' ]}
                    params={208}
                    src={srcIconsToolbarQuests ?? layoutImage('icons_toolbar_quests_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
                params={263184}
                layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionText ?? t('toolbar.icon.label.quests')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `GAMES` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutGAMESItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onGAMES?: () => void;
    srcIconsToolbarGames?: string;
}

export const ToolbarViewLayoutGAMESItem = ({ captionText, layout, onGAMES, srcIconsToolbarGames }: ToolbarViewLayoutGAMESItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="GAMES"
            tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'FIT:toolbarGames' ]}
            params={17}
            onPointerTap={onGAMES}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_games"
                tags={[ 'ICON_BORDER' ]}
                params={2064}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_games"
                    tags={[ 'ICON_BMP' ]}
                    params={208}
                    src={srcIconsToolbarGames ?? layoutImage('icons_toolbar_games_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
                params={263184}
                layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionText ?? t('toolbar.icon.label.games')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `STORIES` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutSTORIESItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onSTORIES?: () => void;
    srcIconsToolbarStories?: string;
}

export const ToolbarViewLayoutSTORIESItem = ({ captionText, layout, onSTORIES, srcIconsToolbarStories }: ToolbarViewLayoutSTORIESItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="STORIES"
            tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'FIT:toolbarStories' ]}
            params={17}
            onPointerTap={onSTORIES}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_stories"
                tags={[ 'ICON_BORDER' ]}
                params={2064}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_stories"
                    tags={[ 'ICON_BMP' ]}
                    params={208}
                    src={srcIconsToolbarStories ?? layoutImage('icons_toolbar_stories_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
                params={263184}
                layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionText ?? t('toolbar.icon.label.stories')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `ACHIEVEMENTS` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutACHIEVEMENTSItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onACHIEVEMENTS?: () => void;
    srcIconsToolbarAchievements?: string;
}

export const ToolbarViewLayoutACHIEVEMENTSItem = ({ captionText, layout, onACHIEVEMENTS, srcIconsToolbarAchievements }: ToolbarViewLayoutACHIEVEMENTSItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ACHIEVEMENTS"
            tags={[ 'TOGGLE', 'FIT:toolbarAchievements' ]}
            params={17}
            onPointerTap={onACHIEVEMENTS}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_achievements"
                tags={[ 'ICON_BORDER' ]}
                params={2064}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_achievements"
                    tags={[ 'ICON_BMP' ]}
                    params={208}
                    src={srcIconsToolbarAchievements ?? layoutImage('icons_toolbar_achievements_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
                params={263184}
                layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionText ?? t('toolbar.icon.label.achievements')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `CATALOGUE` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutCATALOGUEItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onCATALOGUE?: () => void;
    srcIconsToolbarCatalogue?: string;
}

export const ToolbarViewLayoutCATALOGUEItem = ({ captionText, layout, onCATALOGUE, srcIconsToolbarCatalogue }: ToolbarViewLayoutCATALOGUEItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="CATALOGUE"
            tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'FIT:toolbarCatalogue' ]}
            params={17}
            onPointerTap={onCATALOGUE}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_catalogue"
                tags={[ 'ICON_BORDER' ]}
                params={2064}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_catalogue"
                    tags={[ 'ICON_BMP' ]}
                    params={208}
                    src={srcIconsToolbarCatalogue ?? layoutImage('icons_toolbar_catalogue_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
                params={263184}
                layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionText ?? t('toolbar.icon.label.catalogue')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `BUILDER` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutBUILDERItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onBUILDER?: () => void;
    srcIconsToolbarBuilder?: string;
}

export const ToolbarViewLayoutBUILDERItem = ({ captionText, layout, onBUILDER, srcIconsToolbarBuilder }: ToolbarViewLayoutBUILDERItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="BUILDER"
            tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'FIT:toolbarCatalogue' ]}
            params={17}
            onPointerTap={onBUILDER}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_builder"
                tags={[ 'ICON_BORDER' ]}
                params={2064}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_builder"
                    tags={[ 'ICON_BMP' ]}
                    params={208}
                    src={srcIconsToolbarBuilder ?? layoutImage('icons_toolbar_builder_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
                params={263184}
                layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionText ?? t('toolbar.icon.label.builder')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `INVENTORY` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutINVENTORYItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onINVENTORY?: () => void;
    srcIconsToolbarInventory?: string;
}

export const ToolbarViewLayoutINVENTORYItem = ({ captionText, layout, onINVENTORY, srcIconsToolbarInventory }: ToolbarViewLayoutINVENTORYItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="INVENTORY"
            tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'FIT:toolbarInventory' ]}
            params={17}
            onPointerTap={onINVENTORY}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_inventory"
                tags={[ 'ICON_BORDER' ]}
                params={2064}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_inventory"
                    tags={[ 'ICON_BMP' ]}
                    params={208}
                    src={srcIconsToolbarInventory ?? layoutImage('icons_toolbar_inventory_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
                params={263184}
                layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionText ?? t('toolbar.icon.label.inventory')}
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                />
            </Region>
        </Region>
    );
};

/** Row template `MEMENU` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutMEMENUItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onMEMENU?: () => void;
    srcGuideIcon?: string;
    srcIconMeMenu?: string;
}

export const ToolbarViewLayoutMEMENUItem = ({ captionText, layout, onMEMENU, srcGuideIcon, srcIconMeMenu }: ToolbarViewLayoutMEMENUItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="MEMENU"
            tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'FIT:toolbarMeMenu' ]}
            params={17}
            onPointerTap={onMEMENU}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_memenu"
                tags={[ 'ICON_BORDER' ]}
                params={2064}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icon_me_menu"
                    tags={[ 'ICON_BMP' ]}
                    params={208}
                    src={srcIconMeMenu}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
                params={263184}
                layout={{ position: 'absolute', right: 0, width: 76, bottom: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionText ?? t('toolbar.icon.label.memenu')}
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
                    src={srcGuideIcon ?? layoutImage('help_guide_icon.png')}
                    layout={{ position: 'absolute', left: 60, width: 13, top: 38, height: 26 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `bottom_padding` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutBottomPaddingItemProps {
    layout?: BoxLayout;
    srcBottomPadding?: string;
}

export const ToolbarViewLayoutBottomPaddingItem = ({ layout, srcBottomPadding }: ToolbarViewLayoutBottomPaddingItemProps) => {
    return (
        <ThemeImage
            name="bottom_padding"
            params={16}
            src={srcBottomPadding}
            layout={{ width: 76, height: 10, flexShrink: 0, ...layout }}
        />
    );
};
