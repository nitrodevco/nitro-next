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
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onRECEPTION?: () => void;
    srcIconsToolbarReception?: string;
}

export const ToolbarViewLayoutRECEPTIONItem = ({ context, layout, onRECEPTION, srcIconsToolbarReception }: ToolbarViewLayoutRECEPTIONItemProps) => {
    return (
        (context === undefined || [ 'room', 'gameCenter' ].includes(context)) && (
            <Region
                name="RECEPTION"
                onPointerTap={onRECEPTION}
                cursor="pointer"
                layout={{ width: 76, height: 70, flexShrink: 0, ...layout }}
            >
                <Border
                    variant="2"
                    name="bg_reception"
                    tintColor="#57544d"
                    layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 8, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_reception"
                        src={srcIconsToolbarReception ?? layoutImage('icons_toolbar_reception_normal.png')}
                        layout={{ position: 'absolute', width: 60, top: 0, height: 60 }}
                    />
                </Border>
                <ThemeImage
                    src={layoutImage('icons_toolbar_divider.png')}
                    layout={{ position: 'absolute', left: 0, width: 76, top: 64, height: 2 }}
                />
            </Region>
        )
    );
};

/** Row template `HOME` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutHOMEItemProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onHOME?: () => void;
    srcIconsToolbarHome?: string;
}

export const ToolbarViewLayoutHOMEItem = ({ context, layout, onHOME, srcIconsToolbarHome }: ToolbarViewLayoutHOMEItemProps) => {
    return (
        (context === undefined || [ 'hotel' ].includes(context)) && (
            <Region
                name="HOME"
                onPointerTap={onHOME}
                cursor="pointer"
                layout={{ width: 76, height: 70, flexShrink: 0, ...layout }}
            >
                <Border
                    variant="2"
                    name="bg_home"
                    tintColor="#57544d"
                    layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 8, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_home"
                        src={srcIconsToolbarHome ?? layoutImage('icons_toolbar_home_normal.png')}
                        layout={{ position: 'absolute', width: 60, top: -2, height: 60 }}
                    />
                </Border>
                <ThemeImage
                    src={layoutImage('icons_toolbar_divider.png')}
                    layout={{ position: 'absolute', left: 0, width: 76, top: 64, height: 2 }}
                />
            </Region>
        )
    );
};

/** Row template `NAVIGATOR` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutNAVIGATORItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onNAVIGATOR?: () => void;
    srcIconsToolbarNavigator?: string;
}

export const ToolbarViewLayoutNAVIGATORItem = ({ captionText, context, layout, onNAVIGATOR, srcIconsToolbarNavigator }: ToolbarViewLayoutNAVIGATORItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'hotel', 'room', 'gameCenter' ].includes(context)) && (
            <Region
                name="NAVIGATOR"
                onPointerTap={onNAVIGATOR}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                <Border
                    variant="2"
                    name="bg_navigator"
                    tintColor="#57544d"
                    layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_navigator"
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
        )
    );
};

/** Row template `QUESTS` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutQUESTSItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onQUESTS?: () => void;
    srcIconsToolbarQuests?: string;
}

export const ToolbarViewLayoutQUESTSItem = ({ captionText, context, layout, onQUESTS, srcIconsToolbarQuests }: ToolbarViewLayoutQUESTSItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'room' ].includes(context)) && (
            <Region
                name="QUESTS"
                onPointerTap={onQUESTS}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                <Border
                    variant="2"
                    name="bg_quests"
                    tintColor="#57544d"
                    layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_quests"
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
        )
    );
};

/** Row template `GAMES` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutGAMESItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onGAMES?: () => void;
    srcIconsToolbarGames?: string;
}

export const ToolbarViewLayoutGAMESItem = ({ captionText, context, layout, onGAMES, srcIconsToolbarGames }: ToolbarViewLayoutGAMESItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'room', 'hotel' ].includes(context)) && (
            <Region
                name="GAMES"
                onPointerTap={onGAMES}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                <Border
                    variant="2"
                    name="bg_games"
                    tintColor="#57544d"
                    layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_games"
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
        )
    );
};

/** Row template `STORIES` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutSTORIESItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onSTORIES?: () => void;
    srcIconsToolbarStories?: string;
}

export const ToolbarViewLayoutSTORIESItem = ({ captionText, context, layout, onSTORIES, srcIconsToolbarStories }: ToolbarViewLayoutSTORIESItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'hotel' ].includes(context)) && (
            <Region
                name="STORIES"
                onPointerTap={onSTORIES}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                <Border
                    variant="2"
                    name="bg_stories"
                    tintColor="#57544d"
                    layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_stories"
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
        )
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
            onPointerTap={onACHIEVEMENTS}
            cursor="pointer"
            layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="bg_achievements"
                tintColor="#57544d"
                layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="icons_toolbar_achievements"
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
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onCATALOGUE?: () => void;
    srcIconsToolbarCatalogue?: string;
}

export const ToolbarViewLayoutCATALOGUEItem = ({ captionText, context, layout, onCATALOGUE, srcIconsToolbarCatalogue }: ToolbarViewLayoutCATALOGUEItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'room', 'hotel', 'gameCenter' ].includes(context)) && (
            <Region
                name="CATALOGUE"
                onPointerTap={onCATALOGUE}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                <Border
                    variant="2"
                    name="bg_catalogue"
                    tintColor="#57544d"
                    layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_catalogue"
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
        )
    );
};

/** Row template `BUILDER` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutBUILDERItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onBUILDER?: () => void;
    srcIconsToolbarBuilder?: string;
}

export const ToolbarViewLayoutBUILDERItem = ({ captionText, context, layout, onBUILDER, srcIconsToolbarBuilder }: ToolbarViewLayoutBUILDERItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'room', 'hotel' ].includes(context)) && (
            <Region
                name="BUILDER"
                onPointerTap={onBUILDER}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                <Border
                    variant="2"
                    name="bg_builder"
                    tintColor="#57544d"
                    layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_builder"
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
        )
    );
};

/** Row template `INVENTORY` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutINVENTORYItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onINVENTORY?: () => void;
    srcIconsToolbarInventory?: string;
}

export const ToolbarViewLayoutINVENTORYItem = ({ captionText, context, layout, onINVENTORY, srcIconsToolbarInventory }: ToolbarViewLayoutINVENTORYItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'room' ].includes(context)) && (
            <Region
                name="INVENTORY"
                onPointerTap={onINVENTORY}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                <Border
                    variant="2"
                    name="bg_inventory"
                    tintColor="#57544d"
                    layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icons_toolbar_inventory"
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
        )
    );
};

/** Row template `MEMENU` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutMEMENUItemProps {
    captionText?: string;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onMEMENU?: () => void;
    srcGuideIcon?: string;
    srcIconMeMenu?: string;
    visibleGuideIcon?: boolean;
}

export const ToolbarViewLayoutMEMENUItem = ({ captionText, context, layout, onMEMENU, srcGuideIcon, srcIconMeMenu, visibleGuideIcon }: ToolbarViewLayoutMEMENUItemProps) => {
    const t = useTranslation();

    return (
        (context === undefined || [ 'room', 'hotel', 'gameCenter' ].includes(context)) && (
            <Region
                name="MEMENU"
                onPointerTap={onMEMENU}
                cursor="pointer"
                layout={{ width: 76, height: 80, flexShrink: 0, ...layout }}
            >
                <Border
                    variant="2"
                    name="bg_memenu"
                    tintColor="#57544d"
                    layout={{ position: 'absolute', left: 3, width: 70, top: 5, bottom: 0, justifyContent: 'center' }}
                >
                    <ThemeImage
                        name="icon_me_menu"
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
                {(visibleGuideIcon ?? false) && (
                    <ThemeImage
                        name="guide_icon"
                        src={srcGuideIcon ?? layoutImage('help_guide_icon.png')}
                        layout={{ position: 'absolute', left: 60, width: 13, top: 38, height: 26 }}
                    />
                )}
            </Region>
        )
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
            src={srcBottomPadding}
            layout={{ width: 76, height: 10, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `toolbar_items` of ToolbarViewLayout - configured through the parent's `toolbarItems` prop. */
export interface ToolbarViewLayoutToolbarItemsProps {
    itemsToolbarItems?: ReactNode;
    layout?: BoxLayout;
}

export const ToolbarViewLayoutToolbarItems = ({ itemsToolbarItems, layout }: ToolbarViewLayoutToolbarItemsProps) => {
    return (
        <Region
            name="toolbar_items"
            layout={{ position: 'absolute', left: 0, top: 5, flexDirection: 'column', ...layout }}
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
    );
};
