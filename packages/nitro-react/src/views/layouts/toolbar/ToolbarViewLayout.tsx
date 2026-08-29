import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1242_toolbar_view_xml` (layout "toolbar_view_squeezed", 87x875) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ToolbarViewLayoutProps {
    layout?: BoxLayout;
    toolbarItems?: ToolbarViewLayoutToolbarItemsProps;
}

export const ToolbarViewLayout = ({ layout, toolbarItems }: ToolbarViewLayoutProps) => {
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
                    tintColor="#79756e"
                    layout={{ width: '100%', height: '100%' }}
                >
                    <ToolbarViewLayoutToolbarItems {...toolbarItems} />
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
    tags?: string[];
}

export const ToolbarViewLayoutRECEPTIONItem = ({ layout, onRECEPTION, srcIconsToolbarReception, tags }: ToolbarViewLayoutRECEPTIONItemProps) => {
    return (
        <Region
            name="RECEPTION"
            tags={tags}
            onPointerTap={onRECEPTION}
            cursor="pointer"
            layout={{ width: 76, height: 70, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_reception"
                tags={[ 'ICON_BORDER' ]}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 8, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_reception"
                    tags={[ 'ICON_BMP' ]}
                    src={srcIconsToolbarReception ?? layoutImage('icons_toolbar_reception_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <ThemeImage
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
    tags?: string[];
}

export const ToolbarViewLayoutHOMEItem = ({ layout, onHOME, srcIconsToolbarHome, tags }: ToolbarViewLayoutHOMEItemProps) => {
    return (
        <Region
            name="HOME"
            tags={tags}
            onPointerTap={onHOME}
            cursor="pointer"
            layout={{ width: 76, height: 70, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_home"
                tags={[ 'ICON_BORDER' ]}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 8, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_home"
                    tags={[ 'ICON_BMP' ]}
                    src={srcIconsToolbarHome ?? layoutImage('icons_toolbar_home_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: -2, height: 60 }}
                />
            </Border>
            <ThemeImage
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
    tags?: string[];
}

export const ToolbarViewLayoutNAVIGATORItem = ({ captionText, layout, onNAVIGATOR, srcIconsToolbarNavigator, tags }: ToolbarViewLayoutNAVIGATORItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="NAVIGATOR"
            tags={tags}
            onPointerTap={onNAVIGATOR}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_navigator"
                tags={[ 'ICON_BORDER' ]}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_navigator"
                    tags={[ 'ICON_BMP' ]}
                    src={srcIconsToolbarNavigator ?? layoutImage('icons_toolbar_navigator_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: -2, height: 60 }}
                />
            </Border>
            <Region
                name="text"
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
    tags?: string[];
}

export const ToolbarViewLayoutQUESTSItem = ({ captionText, layout, onQUESTS, srcIconsToolbarQuests, tags }: ToolbarViewLayoutQUESTSItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="QUESTS"
            tags={tags}
            onPointerTap={onQUESTS}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_quests"
                tags={[ 'ICON_BORDER' ]}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_quests"
                    tags={[ 'ICON_BMP' ]}
                    src={srcIconsToolbarQuests ?? layoutImage('icons_toolbar_quests_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
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
    tags?: string[];
}

export const ToolbarViewLayoutGAMESItem = ({ captionText, layout, onGAMES, srcIconsToolbarGames, tags }: ToolbarViewLayoutGAMESItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="GAMES"
            tags={tags}
            onPointerTap={onGAMES}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_games"
                tags={[ 'ICON_BORDER' ]}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_games"
                    tags={[ 'ICON_BMP' ]}
                    src={srcIconsToolbarGames ?? layoutImage('icons_toolbar_games_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
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
    tags?: string[];
}

export const ToolbarViewLayoutSTORIESItem = ({ captionText, layout, onSTORIES, srcIconsToolbarStories, tags }: ToolbarViewLayoutSTORIESItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="STORIES"
            tags={tags}
            onPointerTap={onSTORIES}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_stories"
                tags={[ 'ICON_BORDER' ]}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_stories"
                    tags={[ 'ICON_BMP' ]}
                    src={srcIconsToolbarStories ?? layoutImage('icons_toolbar_stories_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
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
    tags?: string[];
}

export const ToolbarViewLayoutACHIEVEMENTSItem = ({ captionText, layout, onACHIEVEMENTS, srcIconsToolbarAchievements, tags }: ToolbarViewLayoutACHIEVEMENTSItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ACHIEVEMENTS"
            tags={tags}
            onPointerTap={onACHIEVEMENTS}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_achievements"
                tags={[ 'ICON_BORDER' ]}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_achievements"
                    tags={[ 'ICON_BMP' ]}
                    src={srcIconsToolbarAchievements ?? layoutImage('icons_toolbar_achievements_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
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
    tags?: string[];
}

export const ToolbarViewLayoutCATALOGUEItem = ({ captionText, layout, onCATALOGUE, srcIconsToolbarCatalogue, tags }: ToolbarViewLayoutCATALOGUEItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="CATALOGUE"
            tags={tags}
            onPointerTap={onCATALOGUE}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_catalogue"
                tags={[ 'ICON_BORDER' ]}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_catalogue"
                    tags={[ 'ICON_BMP' ]}
                    src={srcIconsToolbarCatalogue ?? layoutImage('icons_toolbar_catalogue_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
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
    tags?: string[];
}

export const ToolbarViewLayoutBUILDERItem = ({ captionText, layout, onBUILDER, srcIconsToolbarBuilder, tags }: ToolbarViewLayoutBUILDERItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="BUILDER"
            tags={tags}
            onPointerTap={onBUILDER}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_builder"
                tags={[ 'ICON_BORDER' ]}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_builder"
                    tags={[ 'ICON_BMP' ]}
                    src={srcIconsToolbarBuilder ?? layoutImage('icons_toolbar_builder_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
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
    tags?: string[];
}

export const ToolbarViewLayoutINVENTORYItem = ({ captionText, layout, onINVENTORY, srcIconsToolbarInventory, tags }: ToolbarViewLayoutINVENTORYItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="INVENTORY"
            tags={tags}
            onPointerTap={onINVENTORY}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_inventory"
                tags={[ 'ICON_BORDER' ]}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_inventory"
                    tags={[ 'ICON_BMP' ]}
                    src={srcIconsToolbarInventory ?? layoutImage('icons_toolbar_inventory_normal.png')}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
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
    tags?: string[];
}

export const ToolbarViewLayoutMEMENUItem = ({ captionText, layout, onMEMENU, srcGuideIcon, srcIconMeMenu, tags }: ToolbarViewLayoutMEMENUItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="MEMENU"
            tags={tags}
            onPointerTap={onMEMENU}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_memenu"
                tags={[ 'ICON_BORDER' ]}
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icon_me_menu"
                    tags={[ 'ICON_BMP' ]}
                    src={srcIconMeMenu}
                    layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                />
            </Border>
            <Region
                name="text"
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
    tags?: string[];
}

export const ToolbarViewLayoutBottomPaddingItem = ({ layout, srcBottomPadding, tags }: ToolbarViewLayoutBottomPaddingItemProps) => {
    return (
        <ThemeImage
            name="bottom_padding"
            tags={tags}
            src={srcBottomPadding}
            layout={{ width: 76, height: 10, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `toolbar_items` of ToolbarViewLayout - configured through the parent's `toolbarItems` prop. */
export interface ToolbarViewLayoutToolbarItemsProps {
    itemsToolbarItems?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const ToolbarViewLayoutToolbarItems = ({ itemsToolbarItems, layout, tags }: ToolbarViewLayoutToolbarItemsProps) => {
    return (
        <Region
            name="toolbar_items"
            tags={tags}
            layout={{ position: 'absolute', left: 0, top: 5, flexDirection: 'column', ...layout }}
        >
            {itemsToolbarItems ?? (
                <>
                    <ToolbarViewLayoutRECEPTIONItem tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_GAME_CENTER', 'FIT:toolbarReception', 'RECEPTION' ]} />
                    <ToolbarViewLayoutHOMEItem tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'FIT:toolbarHome', 'HOME' ]} />
                    <ToolbarViewLayoutNAVIGATORItem tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'VISIBLE_ROOM', 'VISIBLE_GAME_CENTER', 'FIT:toolbarNavigator' ]} />
                    <ToolbarViewLayoutQUESTSItem tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'FIT:toolbarQuests' ]} />
                    <ToolbarViewLayoutGAMESItem tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'FIT:toolbarGames' ]} />
                    <ToolbarViewLayoutSTORIESItem tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'FIT:toolbarStories' ]} />
                    <ToolbarViewLayoutACHIEVEMENTSItem tags={[ 'TOGGLE', 'FIT:toolbarAchievements' ]} />
                    <ToolbarViewLayoutCATALOGUEItem tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'FIT:toolbarCatalogue' ]} />
                    <ToolbarViewLayoutBUILDERItem tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'FIT:toolbarCatalogue' ]} />
                    <ToolbarViewLayoutINVENTORYItem tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'FIT:toolbarInventory' ]} />
                    <ToolbarViewLayoutMEMENUItem tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'FIT:toolbarMeMenu' ]} />
                    <ToolbarViewLayoutBottomPaddingItem />
                </>
            )}
        </Region>
    );
};
