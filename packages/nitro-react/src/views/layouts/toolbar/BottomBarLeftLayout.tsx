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

/** Named region `collapse_left` of BottomBarLeftLayout - configured through the parent's `collapseLeft` prop. */
export interface BottomBarLeftLayoutCollapseLeftProps {
    layout?: BoxLayout;
    onCollapseLeft?: () => void;
    srcIconsToolbarCollapseLeft?: string;
}

export const BottomBarLeftLayoutCollapseLeft = ({ layout, onCollapseLeft, srcIconsToolbarCollapseLeft }: BottomBarLeftLayoutCollapseLeftProps) => {
    return (
        <Region
            name="collapse_left"
            onPointerTap={onCollapseLeft}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 15, top: -2, height: 45, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_collapse_left"
                src={srcIconsToolbarCollapseLeft ?? layoutImage('roomtools_minimizebutton.png')}
                layout={{ position: 'absolute', width: 13, top: 0, height: 45 }}
            />
        </Region>
    );
};

/** Named region `arrow_container_left` of BottomBarLeftLayout - configured through the parent's `arrowContainerLeft` prop. */
export interface BottomBarLeftLayoutArrowContainerLeftProps {
    collapseLeft?: BottomBarLeftLayoutCollapseLeftProps;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
}

export const BottomBarLeftLayoutArrowContainerLeft = ({ collapseLeft, context, layout }: BottomBarLeftLayoutArrowContainerLeftProps) => {
    return (
        <Region
            name="arrow_container_left"
            visible={context === undefined || [ 'room', 'hotel', 'gameCenter' ].includes(context)}
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
}

export const BottomBarLeftLayoutCollapseRight = ({ layout, onCollapseRight, srcIconsToolbarCollapseRight }: BottomBarLeftLayoutCollapseRightProps) => {
    return (
        <Region
            name="collapse_right"
            onPointerTap={onCollapseRight}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 15, top: -2, height: 46, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_collapse_right"
                src={srcIconsToolbarCollapseRight ?? layoutImage('roomtools_minimizebutton.png')}
                layout={{ position: 'absolute', width: 13, top: 0, height: 45 }}
            />
        </Region>
    );
};

/** Named region `arrow_container_right` of BottomBarLeftLayout - configured through the parent's `arrowContainerRight` prop. */
export interface BottomBarLeftLayoutArrowContainerRightProps {
    collapseRight?: BottomBarLeftLayoutCollapseRightProps;
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
}

export const BottomBarLeftLayoutArrowContainerRight = ({ collapseRight, context, layout }: BottomBarLeftLayoutArrowContainerRightProps) => {
    return (
        <Region
            name="arrow_container_right"
            visible={context === undefined || [ 'room', 'hotel', 'gameCenter', 'collapsed' ].includes(context)}
            layout={{ position: 'absolute', left: 0, width: 15, top: 1, height: 46, ...layout }}
        >
            <BottomBarLeftLayoutCollapseRight {...collapseRight} />
        </Region>
    );
};

/** Named region `RECEPTION` of BottomBarLeftLayout - configured through the parent's `rECEPTION` prop. */
export interface BottomBarLeftLayoutRECEPTIONProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onRECEPTION?: () => void;
    srcIconsToolbarReception?: string;
}

export const BottomBarLeftLayoutRECEPTION = ({ context, layout, onRECEPTION, srcIconsToolbarReception }: BottomBarLeftLayoutRECEPTIONProps) => {
    return (
        <Region
            name="RECEPTION"
            tooltip="${toolbar.icon.tooltip.exitroom.hotelview)"
            dynamicStyle="lifted_hover"
            visible={context === undefined || [ 'room', 'gameCenter' ].includes(context)}
            onPointerTap={onRECEPTION}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_reception"
                src={srcIconsToolbarReception ?? layoutImage('bottom_bar_logo.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 28, top: 5, height: 28 }}
            />
        </Region>
    );
};

/** Named region `HOME` of BottomBarLeftLayout - configured through the parent's `hOME` prop. */
export interface BottomBarLeftLayoutHOMEProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onHOME?: () => void;
    srcIconsToolbarHome?: string;
}

export const BottomBarLeftLayoutHOME = ({ context, layout, onHOME, srcIconsToolbarHome }: BottomBarLeftLayoutHOMEProps) => {
    const t = useTranslation();

    return (
        <Region
            name="HOME"
            tooltip={t('toolbar.icon.tooltip.exitroom.home')}
            dynamicStyle="lifted_hover"
            visible={context === undefined || [ 'hotel', 'noob' ].includes(context)}
            onPointerTap={onHOME}
            cursor="pointer"
            layout={{ position: 'absolute', left: 53, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_home"
                src={srcIconsToolbarHome ?? layoutImage('bottom_bar_home.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 32, top: 5, height: 30 }}
            />
        </Region>
    );
};

/** Named region `NAVIGATOR` of BottomBarLeftLayout - configured through the parent's `nAVIGATOR` prop. */
export interface BottomBarLeftLayoutNAVIGATORProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onNAVIGATOR?: () => void;
    srcIconsToolbarNavigator?: string;
}

export const BottomBarLeftLayoutNAVIGATOR = ({ context, layout, onNAVIGATOR, srcIconsToolbarNavigator }: BottomBarLeftLayoutNAVIGATORProps) => {
    const t = useTranslation();

    return (
        <Region
            name="NAVIGATOR"
            tooltip={t('toolbar.icon.label.navigator')}
            dynamicStyle="lifted_hover"
            visible={context === undefined || [ 'hotel', 'room', 'gameCenter', 'noob' ].includes(context)}
            onPointerTap={onNAVIGATOR}
            cursor="pointer"
            layout={{ position: 'absolute', left: 106, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_navigator"
                src={srcIconsToolbarNavigator ?? layoutImage('bottom_bar_navigator.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 44, top: 5, height: 30 }}
            />
        </Region>
    );
};

/** Named region `PROGRESSION` of BottomBarLeftLayout - configured through the parent's `pROGRESSION` prop. */
export interface BottomBarLeftLayoutPROGRESSIONProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onPROGRESSION?: () => void;
    srcIconsToolbarProgression?: string;
}

export const BottomBarLeftLayoutPROGRESSION = ({ context, layout, onPROGRESSION, srcIconsToolbarProgression }: BottomBarLeftLayoutPROGRESSIONProps) => {
    const t = useTranslation();

    return (
        <Region
            name="PROGRESSION"
            tooltip={t('toolbar.icon.label.progression')}
            dynamicStyle="lifted_hover"
            visible={context === undefined || [ 'room' ].includes(context)}
            onPointerTap={onPROGRESSION}
            cursor="pointer"
            layout={{ position: 'absolute', left: 159, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_progression"
                src={srcIconsToolbarProgression ?? layoutImage('bottom_bar_progression.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 44, top: 0, height: 37 }}
            />
        </Region>
    );
};

/** Named region `GAMES` of BottomBarLeftLayout - configured through the parent's `gAMES` prop. */
export interface BottomBarLeftLayoutGAMESProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onGAMES?: () => void;
    srcIconsToolbarGames?: string;
}

export const BottomBarLeftLayoutGAMES = ({ context, layout, onGAMES, srcIconsToolbarGames }: BottomBarLeftLayoutGAMESProps) => {
    const t = useTranslation();

    return (
        <Region
            name="GAMES"
            tooltip={t('toolbar.icon.label.games')}
            dynamicStyle="lifted_hover"
            visible={context === undefined || [ 'room', 'hotel' ].includes(context)}
            onPointerTap={onGAMES}
            cursor="pointer"
            layout={{ position: 'absolute', left: 212, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_games"
                src={srcIconsToolbarGames ?? layoutImage('bottom_bar_games.png')}
                layout={{ position: 'absolute', width: 33, top: 0, height: 43 }}
            />
        </Region>
    );
};

/** Named region `STORIES` of BottomBarLeftLayout - configured through the parent's `sTORIES` prop. */
export interface BottomBarLeftLayoutSTORIESProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onSTORIES?: () => void;
    srcIconsToolbarStories?: string;
}

export const BottomBarLeftLayoutSTORIES = ({ context, layout, onSTORIES, srcIconsToolbarStories }: BottomBarLeftLayoutSTORIESProps) => {
    const t = useTranslation();

    return (
        <Region
            name="STORIES"
            tooltip={t('toolbar.icon.label.stories')}
            dynamicStyle="lifted_hover"
            visible={context === undefined || [ 'hotel' ].includes(context)}
            onPointerTap={onSTORIES}
            cursor="pointer"
            layout={{ position: 'absolute', left: 265, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_stories"
                src={srcIconsToolbarStories ?? layoutImage('bottom_bar_stories.png')}
                layout={{ position: 'absolute', width: 35, top: 1, height: 37 }}
            />
        </Region>
    );
};

/** Named region `CATALOGUE` of BottomBarLeftLayout - configured through the parent's `cATALOGUE` prop. */
export interface BottomBarLeftLayoutCATALOGUEProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onCATALOGUE?: () => void;
    srcIconsToolbarCatalogue?: string;
}

export const BottomBarLeftLayoutCATALOGUE = ({ context, layout, onCATALOGUE, srcIconsToolbarCatalogue }: BottomBarLeftLayoutCATALOGUEProps) => {
    const t = useTranslation();

    return (
        <Region
            name="CATALOGUE"
            tooltip={t('toolbar.icon.label.catalogue')}
            dynamicStyle="lifted_hover"
            visible={context === undefined || [ 'room', 'hotel', 'gameCenter', 'collapsed', 'noob' ].includes(context)}
            onPointerTap={onCATALOGUE}
            cursor="pointer"
            layout={{ position: 'absolute', left: 318, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_catalogue"
                src={srcIconsToolbarCatalogue ?? layoutImage('bottom_bar_shop.png')}
                layout={{ position: 'absolute', width: 37, top: 1, height: 37 }}
            />
        </Region>
    );
};

/** Named region `BUILDER` of BottomBarLeftLayout - configured through the parent's `bUILDER` prop. */
export interface BottomBarLeftLayoutBUILDERProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onBUILDER?: () => void;
    srcIconsToolbarBuilder?: string;
}

export const BottomBarLeftLayoutBUILDER = ({ context, layout, onBUILDER, srcIconsToolbarBuilder }: BottomBarLeftLayoutBUILDERProps) => {
    const t = useTranslation();

    return (
        <Region
            name="BUILDER"
            tooltip={t('toolbar.icon.label.builder')}
            dynamicStyle="lifted_hover"
            visible={context === undefined || [ 'room', 'hotel', 'collapsed', 'noob' ].includes(context)}
            onPointerTap={onBUILDER}
            cursor="pointer"
            layout={{ position: 'absolute', left: 371, width: 45, top: 1, height: 41, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_builder"
                src={srcIconsToolbarBuilder ?? layoutImage('bottom_bar_buildersclub.png')}
                layout={{ position: 'absolute', width: 35, top: 1, height: 37 }}
            />
        </Region>
    );
};

/** Named region `INVENTORY` of BottomBarLeftLayout - configured through the parent's `iNVENTORY` prop. */
export interface BottomBarLeftLayoutINVENTORYProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onINVENTORY?: () => void;
    srcIconsToolbarInventory?: string;
}

export const BottomBarLeftLayoutINVENTORY = ({ context, layout, onINVENTORY, srcIconsToolbarInventory }: BottomBarLeftLayoutINVENTORYProps) => {
    const t = useTranslation();

    return (
        <Region
            name="INVENTORY"
            tooltip={t('toolbar.icon.label.inventory')}
            dynamicStyle="lifted_hover"
            visible={context === undefined || [ 'room', 'collapsed', 'noob' ].includes(context)}
            onPointerTap={onINVENTORY}
            cursor="pointer"
            layout={{ position: 'absolute', left: 424, width: 45, top: 1, height: 43, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_inventory"
                src={srcIconsToolbarInventory ?? layoutImage('bottom_bar_inventory.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 44, top: 0, height: 41 }}
            />
        </Region>
    );
};

/** Named region `MEMENU` of BottomBarLeftLayout - configured through the parent's `mEMENU` prop. */
export interface BottomBarLeftLayoutMEMENUProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onMEMENU?: () => void;
    srcIconMeMenu?: string;
}

export const BottomBarLeftLayoutMEMENU = ({ context, layout, onMEMENU, srcIconMeMenu }: BottomBarLeftLayoutMEMENUProps) => {
    const t = useTranslation();

    return (
        <Region
            name="MEMENU"
            tooltip={t('toolbar.icon.label.memenu')}
            dynamicStyle="lifted_hover"
            visible={context === undefined || [ 'room', 'hotel', 'gameCenter', 'collapsed', 'noob' ].includes(context)}
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
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onWIREDMENU?: () => void;
    srcIconsToolbarWiredMenu?: string;
}

export const BottomBarLeftLayoutWIREDMENU = ({ context, layout, onWIREDMENU, srcIconsToolbarWiredMenu }: BottomBarLeftLayoutWIREDMENUProps) => {
    const t = useTranslation();

    return (
        <Region
            name="WIRED_MENU"
            tooltip={t('toolbar.icon.label.wired_menu')}
            dynamicStyle="lifted_hover"
            visible={context === undefined || [ 'room', 'collapsed', 'noob' ].includes(context)}
            onPointerTap={onWIREDMENU}
            cursor="pointer"
            layout={{ position: 'absolute', left: 530, width: 45, top: 1, height: 45, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_wired_menu"
                src={srcIconsToolbarWiredMenu ?? layoutImage('bottom_bar_wired_menu.png')}
                layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 38, top: 0, height: 45 }}
            />
        </Region>
    );
};

/** Named region `CAMERA` of BottomBarLeftLayout - configured through the parent's `cAMERA` prop. */
export interface BottomBarLeftLayoutCAMERAProps {
    context?: 'hotel' | 'room' | 'gameCenter' | 'noob' | 'collapsed';
    layout?: BoxLayout;
    onCAMERA?: () => void;
    srcIconsToolbarCamera?: string;
}

export const BottomBarLeftLayoutCAMERA = ({ context, layout, onCAMERA, srcIconsToolbarCamera }: BottomBarLeftLayoutCAMERAProps) => {
    const t = useTranslation();

    return (
        <Region
            name="CAMERA"
            tooltip={t('camera.interface.title')}
            dynamicStyle="lifted_hover"
            visible={context === undefined || [ 'room', 'collapsed', 'noob' ].includes(context)}
            onPointerTap={onCAMERA}
            cursor="pointer"
            layout={{ position: 'absolute', left: 583, width: 45, top: 1, height: 45, justifyContent: 'center', ...layout }}
        >
            <ThemeImage
                name="icons_toolbar_camera"
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
    wIREDMENU?: BottomBarLeftLayoutWIREDMENUProps;
}

export const BottomBarLeftLayoutToolbarItems = ({ bUILDER, cAMERA, cATALOGUE, gAMES, hOME, iNVENTORY, layout, mEMENU, nAVIGATOR, pROGRESSION, rECEPTION, srcLine, sTORIES, wIREDMENU }: BottomBarLeftLayoutToolbarItemsProps) => {
    return (
        <Region
            name="toolbar_items"
            layout={{ position: 'absolute', left: 19, width: 607, top: 0, height: 46, ...layout }}
        >
            <BottomBarLeftLayoutRECEPTION {...rECEPTION} />
            <BottomBarLeftLayoutHOME {...hOME} />
            <BottomBarLeftLayoutNAVIGATOR {...nAVIGATOR} />
            <BottomBarLeftLayoutPROGRESSION {...pROGRESSION} />
            <BottomBarLeftLayoutGAMES {...gAMES} />
            <BottomBarLeftLayoutSTORIES {...sTORIES} />
            <BottomBarLeftLayoutCATALOGUE {...cATALOGUE} />
            <BottomBarLeftLayoutBUILDER {...bUILDER} />
            <BottomBarLeftLayoutINVENTORY {...iNVENTORY} />
            <BottomBarLeftLayoutMEMENU {...mEMENU} />
            <BottomBarLeftLayoutWIREDMENU {...wIREDMENU} />
            <BottomBarLeftLayoutCAMERA {...cAMERA} />
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
    toolbarItems?: BottomBarLeftLayoutToolbarItemsProps;
}

export const BottomBarLeftLayoutMainToolbar = ({ arrowContainerLeft, arrowContainerRight, layout, toolbarItems }: BottomBarLeftLayoutMainToolbarProps) => {
    return (
        <Region
            name="main_toolbar"
            layout={{ position: 'absolute', left: 0, width: 623, top: 0, height: 46, ...layout }}
        >
            <ThemeImage
                src={layoutImage('common_beta_sign.png')}
                layout={{ position: 'absolute', left: 60, width: 35, top: 25, height: 16 }}
                visible={false}
            />
            <BottomBarLeftLayoutArrowContainerLeft {...arrowContainerLeft} />
            <BottomBarLeftLayoutArrowContainerRight {...arrowContainerRight} />
            <BottomBarLeftLayoutToolbarItems {...toolbarItems} />
            <Border
                variant="2"
                tintColor="#3b3933"
                layout={{ position: 'absolute', left: -6, width: 20, top: 0, height: 43 }}
            />
        </Region>
    );
};
