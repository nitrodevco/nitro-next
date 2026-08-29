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
            <BottomBarLeftLayoutMainToolbar
                tags={[ 'FIT:toolbar' ]}
                {...mainToolbar}
            />
        </Region>
    );
};

/** Named region `collapse_left` of BottomBarLeftLayout - configured through the parent's `collapseLeft` prop. */
export interface BottomBarLeftLayoutCollapseLeftProps {
    layout?: BoxLayout;
    onCollapseLeft?: () => void;
    srcIconsToolbarCollapseLeft?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutCollapseLeft = ({ layout, onCollapseLeft, srcIconsToolbarCollapseLeft, tags }: BottomBarLeftLayoutCollapseLeftProps) => {
    return (
        <Region
            name="collapse_left"
            tags={tags}
            onPointerTap={onCollapseLeft}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 15, top: -2, height: 45, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_collapse_left"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconsToolbarCollapseLeft ?? layoutImage('roomtools_minimizebutton.png')}
                layout={{ position: 'absolute', width: 13, top: 0, height: 45 }}
            />
        </Region>
    );
};

/** Named region `arrow_container_left` of BottomBarLeftLayout - configured through the parent's `arrowContainerLeft` prop. */
export interface BottomBarLeftLayoutArrowContainerLeftProps {
    collapseLeft?: BottomBarLeftLayoutCollapseLeftProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const BottomBarLeftLayoutArrowContainerLeft = ({ collapseLeft, layout, tags }: BottomBarLeftLayoutArrowContainerLeftProps) => {
    return (
        <Region
            name="arrow_container_left"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 15, top: 1, height: 46, ...layout }}
        >
            <BottomBarLeftLayoutCollapseLeft {...collapseLeft} />
        </Region>
    );
};

/** Named region `collapse_right` of BottomBarLeftLayout - configured through the parent's `collapseRight` prop. */
export interface BottomBarLeftLayoutCollapseRightProps {
    layout?: BoxLayout;
    onCollapseRight?: () => void;
    srcIconsToolbarCollapseRight?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutCollapseRight = ({ layout, onCollapseRight, srcIconsToolbarCollapseRight, tags }: BottomBarLeftLayoutCollapseRightProps) => {
    return (
        <Region
            name="collapse_right"
            tags={tags}
            onPointerTap={onCollapseRight}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 15, top: -2, height: 46, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_collapse_right"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconsToolbarCollapseRight ?? layoutImage('roomtools_minimizebutton.png')}
                layout={{ position: 'absolute', width: 13, top: 0, height: 45 }}
            />
        </Region>
    );
};

/** Named region `arrow_container_right` of BottomBarLeftLayout - configured through the parent's `arrowContainerRight` prop. */
export interface BottomBarLeftLayoutArrowContainerRightProps {
    collapseRight?: BottomBarLeftLayoutCollapseRightProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const BottomBarLeftLayoutArrowContainerRight = ({ collapseRight, layout, tags }: BottomBarLeftLayoutArrowContainerRightProps) => {
    return (
        <Region
            name="arrow_container_right"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 15, top: 1, height: 46, ...layout }}
        >
            <BottomBarLeftLayoutCollapseRight {...collapseRight} />
        </Region>
    );
};

/** Named region `RECEPTION` of BottomBarLeftLayout - configured through the parent's `rECEPTION` prop. */
export interface BottomBarLeftLayoutRECEPTIONProps {
    layout?: BoxLayout;
    onRECEPTION?: () => void;
    srcIconsToolbarReception?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutRECEPTION = ({ layout, onRECEPTION, srcIconsToolbarReception, tags }: BottomBarLeftLayoutRECEPTIONProps) => {
    return (
        <Region
            name="RECEPTION"
            tags={tags}
            tooltip="${toolbar.icon.tooltip.exitroom.hotelview)"
            dynamicStyle="lifted_hover"
            onPointerTap={onRECEPTION}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_reception"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconsToolbarReception ?? layoutImage('bottom_bar_logo.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 28, top: 5, height: 28 }}
            />
        </Region>
    );
};

/** Named region `HOME` of BottomBarLeftLayout - configured through the parent's `hOME` prop. */
export interface BottomBarLeftLayoutHOMEProps {
    layout?: BoxLayout;
    onHOME?: () => void;
    srcIconsToolbarHome?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutHOME = ({ layout, onHOME, srcIconsToolbarHome, tags }: BottomBarLeftLayoutHOMEProps) => {
    const t = useTranslation();

    return (
        <Region
            name="HOME"
            tags={tags}
            tooltip={t('toolbar.icon.tooltip.exitroom.home')}
            dynamicStyle="lifted_hover"
            onPointerTap={onHOME}
            cursor="pointer"
            layout={{ position: 'absolute', left: 53, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_home"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconsToolbarHome ?? layoutImage('bottom_bar_home.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 32, top: 5, height: 30 }}
            />
        </Region>
    );
};

/** Named region `NAVIGATOR` of BottomBarLeftLayout - configured through the parent's `nAVIGATOR` prop. */
export interface BottomBarLeftLayoutNAVIGATORProps {
    layout?: BoxLayout;
    onNAVIGATOR?: () => void;
    srcIconsToolbarNavigator?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutNAVIGATOR = ({ layout, onNAVIGATOR, srcIconsToolbarNavigator, tags }: BottomBarLeftLayoutNAVIGATORProps) => {
    const t = useTranslation();

    return (
        <Region
            name="NAVIGATOR"
            tags={tags}
            tooltip={t('toolbar.icon.label.navigator')}
            dynamicStyle="lifted_hover"
            onPointerTap={onNAVIGATOR}
            cursor="pointer"
            layout={{ position: 'absolute', left: 106, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_navigator"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconsToolbarNavigator ?? layoutImage('bottom_bar_navigator.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 44, top: 5, height: 30 }}
            />
        </Region>
    );
};

/** Named region `PROGRESSION` of BottomBarLeftLayout - configured through the parent's `pROGRESSION` prop. */
export interface BottomBarLeftLayoutPROGRESSIONProps {
    layout?: BoxLayout;
    onPROGRESSION?: () => void;
    srcIconsToolbarProgression?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutPROGRESSION = ({ layout, onPROGRESSION, srcIconsToolbarProgression, tags }: BottomBarLeftLayoutPROGRESSIONProps) => {
    const t = useTranslation();

    return (
        <Region
            name="PROGRESSION"
            tags={tags}
            tooltip={t('toolbar.icon.label.progression')}
            dynamicStyle="lifted_hover"
            onPointerTap={onPROGRESSION}
            cursor="pointer"
            layout={{ position: 'absolute', left: 159, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_progression"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconsToolbarProgression ?? layoutImage('bottom_bar_progression.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 44, top: 0, height: 37 }}
            />
        </Region>
    );
};

/** Named region `GAMES` of BottomBarLeftLayout - configured through the parent's `gAMES` prop. */
export interface BottomBarLeftLayoutGAMESProps {
    layout?: BoxLayout;
    onGAMES?: () => void;
    srcIconsToolbarGames?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutGAMES = ({ layout, onGAMES, srcIconsToolbarGames, tags }: BottomBarLeftLayoutGAMESProps) => {
    const t = useTranslation();

    return (
        <Region
            name="GAMES"
            tags={tags}
            tooltip={t('toolbar.icon.label.games')}
            dynamicStyle="lifted_hover"
            onPointerTap={onGAMES}
            cursor="pointer"
            layout={{ position: 'absolute', left: 212, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_games"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconsToolbarGames ?? layoutImage('bottom_bar_games.png')}
                layout={{ position: 'absolute', width: 33, top: 0, height: 43 }}
            />
        </Region>
    );
};

/** Named region `STORIES` of BottomBarLeftLayout - configured through the parent's `sTORIES` prop. */
export interface BottomBarLeftLayoutSTORIESProps {
    layout?: BoxLayout;
    onSTORIES?: () => void;
    srcIconsToolbarStories?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutSTORIES = ({ layout, onSTORIES, srcIconsToolbarStories, tags }: BottomBarLeftLayoutSTORIESProps) => {
    const t = useTranslation();

    return (
        <Region
            name="STORIES"
            tags={tags}
            tooltip={t('toolbar.icon.label.stories')}
            dynamicStyle="lifted_hover"
            onPointerTap={onSTORIES}
            cursor="pointer"
            layout={{ position: 'absolute', left: 265, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_stories"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconsToolbarStories ?? layoutImage('bottom_bar_stories.png')}
                layout={{ position: 'absolute', width: 35, top: 1, height: 37 }}
            />
        </Region>
    );
};

/** Named region `CATALOGUE` of BottomBarLeftLayout - configured through the parent's `cATALOGUE` prop. */
export interface BottomBarLeftLayoutCATALOGUEProps {
    layout?: BoxLayout;
    onCATALOGUE?: () => void;
    srcIconsToolbarCatalogue?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutCATALOGUE = ({ layout, onCATALOGUE, srcIconsToolbarCatalogue, tags }: BottomBarLeftLayoutCATALOGUEProps) => {
    const t = useTranslation();

    return (
        <Region
            name="CATALOGUE"
            tags={tags}
            tooltip={t('toolbar.icon.label.catalogue')}
            dynamicStyle="lifted_hover"
            onPointerTap={onCATALOGUE}
            cursor="pointer"
            layout={{ position: 'absolute', left: 318, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_catalogue"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconsToolbarCatalogue ?? layoutImage('bottom_bar_shop.png')}
                layout={{ position: 'absolute', width: 37, top: 1, height: 37 }}
            />
        </Region>
    );
};

/** Named region `BUILDER` of BottomBarLeftLayout - configured through the parent's `bUILDER` prop. */
export interface BottomBarLeftLayoutBUILDERProps {
    layout?: BoxLayout;
    onBUILDER?: () => void;
    srcIconsToolbarBuilder?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutBUILDER = ({ layout, onBUILDER, srcIconsToolbarBuilder, tags }: BottomBarLeftLayoutBUILDERProps) => {
    const t = useTranslation();

    return (
        <Region
            name="BUILDER"
            tags={tags}
            tooltip={t('toolbar.icon.label.builder')}
            dynamicStyle="lifted_hover"
            onPointerTap={onBUILDER}
            cursor="pointer"
            layout={{ position: 'absolute', left: 371, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_builder"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconsToolbarBuilder ?? layoutImage('bottom_bar_buildersclub.png')}
                layout={{ position: 'absolute', width: 35, top: 1, height: 37 }}
            />
        </Region>
    );
};

/** Named region `INVENTORY` of BottomBarLeftLayout - configured through the parent's `iNVENTORY` prop. */
export interface BottomBarLeftLayoutINVENTORYProps {
    layout?: BoxLayout;
    onINVENTORY?: () => void;
    srcIconsToolbarInventory?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutINVENTORY = ({ layout, onINVENTORY, srcIconsToolbarInventory, tags }: BottomBarLeftLayoutINVENTORYProps) => {
    const t = useTranslation();

    return (
        <Region
            name="INVENTORY"
            tags={tags}
            tooltip={t('toolbar.icon.label.inventory')}
            dynamicStyle="lifted_hover"
            onPointerTap={onINVENTORY}
            cursor="pointer"
            layout={{ position: 'absolute', left: 424, width: 45, top: 1, height: 43, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_inventory"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconsToolbarInventory ?? layoutImage('bottom_bar_inventory.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 44, top: 0, height: 41 }}
            />
        </Region>
    );
};

/** Named region `MEMENU` of BottomBarLeftLayout - configured through the parent's `mEMENU` prop. */
export interface BottomBarLeftLayoutMEMENUProps {
    layout?: BoxLayout;
    onMEMENU?: () => void;
    srcIconMeMenu?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutMEMENU = ({ layout, onMEMENU, srcIconMeMenu, tags }: BottomBarLeftLayoutMEMENUProps) => {
    const t = useTranslation();

    return (
        <Region
            name="MEMENU"
            tags={tags}
            tooltip={t('toolbar.icon.label.memenu')}
            dynamicStyle="lifted_hover"
            onPointerTap={onMEMENU}
            cursor="pointer"
            layout={{ position: 'absolute', left: 477, width: 45, top: 1, height: 45, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                src={layoutImage('bottom_bar_memenu_bg.png')}
                layout={{ position: 'absolute', left: 0, width: 45, top: -1, height: 45 }}
            />
            <ThemeImage
                name="icon_me_menu"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconMeMenu}
                layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 44, top: -1, height: 41 }}
            />
            <ThemeImage
                src={layoutImage('bottom_bar_memenu_circle.png')}
                layout={{ position: 'absolute', left: 0, width: 45, top: -1, height: 45 }}
            />
        </Region>
    );
};

/** Named region `WIRED_MENU` of BottomBarLeftLayout - configured through the parent's `wIREDMENU` prop. */
export interface BottomBarLeftLayoutWIREDMENUProps {
    layout?: BoxLayout;
    onWIREDMENU?: () => void;
    srcIconsToolbarWiredMenu?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutWIREDMENU = ({ layout, onWIREDMENU, srcIconsToolbarWiredMenu, tags }: BottomBarLeftLayoutWIREDMENUProps) => {
    const t = useTranslation();

    return (
        <Region
            name="WIRED_MENU"
            tags={tags}
            tooltip={t('toolbar.icon.label.wired_menu')}
            dynamicStyle="lifted_hover"
            onPointerTap={onWIREDMENU}
            cursor="pointer"
            layout={{ position: 'absolute', left: 530, width: 45, top: 1, height: 45, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_wired_menu"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconsToolbarWiredMenu ?? layoutImage('bottom_bar_wired_menu.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 38, top: 0, height: 45 }}
            />
        </Region>
    );
};

/** Named region `CAMERA` of BottomBarLeftLayout - configured through the parent's `cAMERA` prop. */
export interface BottomBarLeftLayoutCAMERAProps {
    layout?: BoxLayout;
    onCAMERA?: () => void;
    srcIconsToolbarCamera?: string;
    tags?: string[];
}

export const BottomBarLeftLayoutCAMERA = ({ layout, onCAMERA, srcIconsToolbarCamera, tags }: BottomBarLeftLayoutCAMERAProps) => {
    const t = useTranslation();

    return (
        <Region
            name="CAMERA"
            tags={tags}
            tooltip={t('camera.interface.title')}
            dynamicStyle="lifted_hover"
            onPointerTap={onCAMERA}
            cursor="pointer"
            layout={{ position: 'absolute', left: 583, width: 45, top: 1, height: 45, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_camera"
                tags={[ 'ICON_BMP', '#icon' ]}
                src={srcIconsToolbarCamera ?? layoutImage('bottom_bar_camera.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 38, top: 0, height: 45 }}
            />
        </Region>
    );
};

/** Named region `toolbar_items` of BottomBarLeftLayout - configured through the parent's `toolbarItems` prop. */
export interface BottomBarLeftLayoutToolbarItemsProps {
    bUILDER?: BottomBarLeftLayoutBUILDERProps;
    cAMERA?: BottomBarLeftLayoutCAMERAProps;
    cATALOGUE?: BottomBarLeftLayoutCATALOGUEProps;
    gAMES?: BottomBarLeftLayoutGAMESProps;
    hOME?: BottomBarLeftLayoutHOMEProps;
    iNVENTORY?: BottomBarLeftLayoutINVENTORYProps;
    layout?: BoxLayout;
    mEMENU?: BottomBarLeftLayoutMEMENUProps;
    nAVIGATOR?: BottomBarLeftLayoutNAVIGATORProps;
    pROGRESSION?: BottomBarLeftLayoutPROGRESSIONProps;
    rECEPTION?: BottomBarLeftLayoutRECEPTIONProps;
    srcLine?: string;
    sTORIES?: BottomBarLeftLayoutSTORIESProps;
    tags?: string[];
    wIREDMENU?: BottomBarLeftLayoutWIREDMENUProps;
}

export const BottomBarLeftLayoutToolbarItems = ({ bUILDER, cAMERA, cATALOGUE, gAMES, hOME, iNVENTORY, layout, mEMENU, nAVIGATOR, pROGRESSION, rECEPTION, srcLine, sTORIES, tags, wIREDMENU }: BottomBarLeftLayoutToolbarItemsProps) => {
    return (
        <Region
            name="toolbar_items"
            tags={tags}
            layout={{ position: 'absolute', left: 19, width: 607, top: 0, height: 46, ...layout }}
        >
            <BottomBarLeftLayoutRECEPTION
                tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_GAME_CENTER', 'FIT:toolbarReception', 'RECEPTION' ]}
                {...rECEPTION}
            />
            <BottomBarLeftLayoutHOME
                tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'FIT:toolbarHome', 'HOME', 'VISIBLE_NOOB' ]}
                {...hOME}
            />
            <BottomBarLeftLayoutNAVIGATOR
                tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'VISIBLE_ROOM', 'VISIBLE_GAME_CENTER', 'FIT:toolbarNavigator', 'VISIBLE_NOOB' ]}
                {...nAVIGATOR}
            />
            <BottomBarLeftLayoutPROGRESSION
                tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'FIT', 'toolbarProgression' ]}
                {...pROGRESSION}
            />
            <BottomBarLeftLayoutGAMES
                tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'FIT:toolbarGames' ]}
                {...gAMES}
            />
            <BottomBarLeftLayoutSTORIES
                tags={[ 'TOGGLE', 'VISIBLE_HOTEL', 'FIT:toolbarStories' ]}
                {...sTORIES}
            />
            <BottomBarLeftLayoutCATALOGUE
                tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'VISIBLE_COLLAPSED', 'FIT:toolbarCatalogue', 'VISIBLE_NOOB' ]}
                {...cATALOGUE}
            />
            <BottomBarLeftLayoutBUILDER
                tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_COLLAPSED', 'FIT:toolbarCatalogue', 'VISIBLE_NOOB' ]}
                {...bUILDER}
            />
            <BottomBarLeftLayoutINVENTORY
                tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_COLLAPSED', 'FIT:toolbarInventory', 'VISIBLE_NOOB' ]}
                {...iNVENTORY}
            />
            <BottomBarLeftLayoutMEMENU
                tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'VISIBLE_COLLAPSED', 'FIT:toolbarMeMenu', 'VISIBLE_NOOB' ]}
                {...mEMENU}
            />
            <BottomBarLeftLayoutWIREDMENU
                tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_COLLAPSED', 'VISIBLE_NOOB' ]}
                {...wIREDMENU}
            />
            <BottomBarLeftLayoutCAMERA
                tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_COLLAPSED', 'VISIBLE_NOOB' ]}
                {...cAMERA}
            />
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
    arrowContainerLeft?: BottomBarLeftLayoutArrowContainerLeftProps;
    arrowContainerRight?: BottomBarLeftLayoutArrowContainerRightProps;
    layout?: BoxLayout;
    tags?: string[];
    toolbarItems?: BottomBarLeftLayoutToolbarItemsProps;
}

export const BottomBarLeftLayoutMainToolbar = ({ arrowContainerLeft, arrowContainerRight, layout, tags, toolbarItems }: BottomBarLeftLayoutMainToolbarProps) => {
    return (
        <Region
            name="main_toolbar"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 623, top: 0, height: 46, ...layout }}
        >
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 60, width: 35, top: 25, height: 16 }}
            >
                <ThemeImage
                    src={layoutImage('common_beta_sign.png')}
                    layout={{ position: 'absolute', left: 60, width: 35, top: 25, height: 16 }}
                />
            </Region>
            <BottomBarLeftLayoutArrowContainerLeft
                tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'FIT:toolbarCollapseLeft' ]}
                {...arrowContainerLeft}
            />
            <BottomBarLeftLayoutArrowContainerRight
                tags={[ 'TOGGLE', 'VISIBLE_ROOM', 'VISIBLE_HOTEL', 'VISIBLE_GAME_CENTER', 'VISIBLE_COLLAPSED', 'FIT:toolbarCollapseRight' ]}
                {...arrowContainerRight}
            />
            <BottomBarLeftLayoutToolbarItems {...toolbarItems} />
            <Border
                variant="2"
                tintColor="#3b3933"
                layout={{ position: 'absolute', left: -6, width: 20, top: 0, height: 43 }}
            />
        </Region>
    );
};
