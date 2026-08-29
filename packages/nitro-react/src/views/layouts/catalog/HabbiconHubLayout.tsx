import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Icon, Region, ScrollArea, Shape, TabButton, TabContext, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1558_habbicon_hub_xml` (layout "habbicon_view", 560x570) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabbiconHubLayoutProps {
    albumHeader?: HabbiconHubLayoutAlbumHeaderProps;
    allSetsContainer?: HabbiconHubLayoutAllSetsContainerProps;
    habbiconPopupLayer?: HabbiconHubLayoutHabbiconPopupLayerProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onTabAllSets?: () => void;
    onTabFavourited?: () => void;
    onTabOwned?: () => void;
    tabsBg?: HabbiconHubLayoutTabsBgProps;
    trayContainer?: HabbiconHubLayoutTrayContainerProps;
}

export const HabbiconHubLayout = ({ albumHeader, allSetsContainer, habbiconPopupLayer, layout, onClose, onTabAllSets, onTabFavourited, onTabOwned, tabsBg, trayContainer }: HabbiconHubLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="HabbiconHub"
            name="HabbiconHub"
            caption={t('habbicon_book.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 560, height: 570, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="3"
                    name="album_background"
                    tintColor="#d7d1be"
                    layout={{ position: 'absolute', left: 0, right: 6, top: 0, bottom: 40 }}
                />
                <HabbiconHubLayoutAlbumHeader {...albumHeader} />
                <HabbiconHubLayoutTabsBg {...tabsBg} />
                <TabContext
                    variant="3"
                    name="tab_context"
                    tintColor="#0fffff"
                    layout={{ position: 'absolute', left: 7, width: 540, top: 113, height: 33 }}
                >
                    <TabButton
                        variant="3"
                        name="tab_all_sets"
                        onPointerTap={onTabAllSets}
                        layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 32 }}
                    >
                        {t('habbicon_book.tab.all_sets')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="tab_owned"
                        onPointerTap={onTabOwned}
                        layout={{ position: 'absolute', left: 64, width: 64, top: 0, height: 32 }}
                    >
                        {t('habbicon_book.tab.owned')}
                    </TabButton>
                    <TabButton
                        variant="3"
                        name="tab_favourited"
                        onPointerTap={onTabFavourited}
                        layout={{ position: 'absolute', left: 128, width: 82, top: 0, height: 32 }}
                    >
                        {t('habbicon_book.tab.favourited')}
                    </TabButton>
                </TabContext>
                <HabbiconHubLayoutAllSetsContainer {...allSetsContainer} />
                <HabbiconHubLayoutTrayContainer {...trayContainer} />
                <HabbiconHubLayoutHabbiconPopupLayer {...habbiconPopupLayer} />
            </Region>
        </Frame>
    );
};

/** Named region `highlight` of HabbiconHubLayout - configured through the parent's `highlight` prop. */
export interface HabbiconHubLayoutHighlightProps {
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHighlight = ({ layout }: HabbiconHubLayoutHighlightProps) => {
    return (
        <Region
            name="highlight"
            blendMode="add"
            layout={{ position: 'absolute', left: 1, right: -302, top: 1, height: 6, ...layout }}
        />
    );
};

/** Named region `progress` of HabbiconHubLayout - configured through the parent's `progress` prop. */
export interface HabbiconHubLayoutProgressProps {
    highlight?: HabbiconHubLayoutHighlightProps;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutProgress = ({ highlight, layout }: HabbiconHubLayoutProgressProps) => {
    return (
        <Region
            name="progress"
            layout={{ position: 'absolute', left: 0, width: 20, top: 0, bottom: 0, ...layout }}
        >
            <Shape
                name="fill"
                shape="round_rectangle"
                color="#54a8e8"
                strokeThickness={1}
                radius={6}
                layout={{ position: 'absolute', left: 0, right: -303, top: 0, bottom: 0 }}
            />
            <HabbiconHubLayoutHighlight {...highlight} />
        </Region>
    );
};

/** Named region `album_progress_bar` of HabbiconHubLayout - configured through the parent's `albumProgressBar` prop. */
export interface HabbiconHubLayoutAlbumProgressBarProps {
    layout?: BoxLayout;
    progress?: HabbiconHubLayoutProgressProps;
}

export const HabbiconHubLayoutAlbumProgressBar = ({ layout, progress }: HabbiconHubLayoutAlbumProgressBarProps) => {
    return (
        <Region
            name="album_progress_bar"
            layout={{ position: 'absolute', left: 0, width: 304, top: 3, height: 18, ...layout }}
        >
            <Shape
                name="background"
                shape="round_rectangle"
                color="#17394d"
                strokeThickness={1}
                radius={6}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <HabbiconHubLayoutProgress {...progress} />
        </Region>
    );
};

/** Named region `album_progress_container` of HabbiconHubLayout - configured through the parent's `albumProgressContainer` prop. */
export interface HabbiconHubLayoutAlbumProgressContainerProps {
    albumProgressBar?: HabbiconHubLayoutAlbumProgressBarProps;
    captionAlbumProgressText?: string;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutAlbumProgressContainer = ({ albumProgressBar, captionAlbumProgressText, layout }: HabbiconHubLayoutAlbumProgressContainerProps) => {
    return (
        <Region
            name="album_progress_container"
            layout={{ position: 'absolute', left: 102, width: 452, top: 76, height: 24, ...layout }}
        >
            <HabbiconHubLayoutAlbumProgressBar {...albumProgressBar} />
            <Region
                name="album_progress_text"
                layout={{ position: 'absolute', left: 312, width: 28, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAlbumProgressText ?? '0 / 0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `album_header` of HabbiconHubLayout - configured through the parent's `albumHeader` prop. */
export interface HabbiconHubLayoutAlbumHeaderProps {
    albumProgressContainer?: HabbiconHubLayoutAlbumProgressContainerProps;
    captionAlbumSubtitle?: string;
    captionAlbumTitle?: string;
    captionOwnedHabbiconsLabel?: string;
    captionOwnedHabbiconsValue?: string;
    captionSetsCompletedLabel?: string;
    captionSetsCompletedValue?: string;
    layout?: BoxLayout;
    srcAlbumHeaderPattern?: string;
    srcAlbumLogo?: string;
}

export const HabbiconHubLayoutAlbumHeader = ({ albumProgressContainer, captionAlbumSubtitle, captionAlbumTitle, captionOwnedHabbiconsLabel, captionOwnedHabbiconsValue, captionSetsCompletedLabel, captionSetsCompletedValue, layout, srcAlbumHeaderPattern, srcAlbumLogo }: HabbiconHubLayoutAlbumHeaderProps) => {
    const t = useTranslation();

    return (
        <Region
            name="album_header"
            backgroundColor="#2b7aa0"
            layout={{ position: 'absolute', left: -2, right: 4, top: -3, height: 110, ...layout }}
        >
            <Border
                variant="3"
                name="album_header_background"
                tintColor="#1f5d78"
                layout={{ position: 'absolute', left: 2, right: 2, top: 2, height: 106 }}
            >
                <ThemeImage
                    name="album_header_pattern"
                    src={srcAlbumHeaderPattern ?? layoutImage('bg_pattern_001.png')}
                    layout={{ position: 'absolute', left: -1, right: 1, top: 2, height: 110 }}
                />
                <ThemeImage
                    name="album_logo"
                    src={srcAlbumLogo ?? layoutImage('habbicons_habbicons_logo.png')}
                    layout={{ position: 'absolute', left: 18, width: 66, top: 20, height: 70 }}
                />
                <Region
                    name="album_title"
                    layout={{ position: 'absolute', left: 100, width: 95, top: 14, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAlbumTitle ?? t('habbicons.hud.title')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="album_subtitle"
                    layout={{ position: 'absolute', left: 100, width: 220, top: 39, height: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionAlbumSubtitle ?? t('habbicon_book.subtitle')}
                        textOptions={{ fill: '#d7efe5', wordWrap: true, wordWrapWidth: 220 }}
                    />
                </Region>
                <Border
                    variant="7"
                    name="owned_habbicons_stat"
                    tintColor="#41aad3"
                    layout={{ position: 'absolute', left: 331, width: 102, top: 12, height: 42 }}
                >
                    <Region
                        name="owned_habbicons_label"
                        layout={{ position: 'absolute', left: 6, right: 6, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionOwnedHabbiconsLabel ?? t('habbicons.owned.description')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="owned_habbicons_value"
                        layout={{ position: 'absolute', left: 6, right: 6, top: 20, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionOwnedHabbiconsValue ?? '0'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Border>
                <Border
                    variant="7"
                    name="sets_completed_stat"
                    tintColor="#41aad3"
                    layout={{ position: 'absolute', left: 443, width: 102, top: 12, height: 42 }}
                >
                    <Region
                        name="sets_completed_label"
                        layout={{ position: 'absolute', left: 6, right: 6, top: 5, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionSetsCompletedLabel ?? t('habbicon_book.sets_completed')}
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                    <Region
                        name="sets_completed_value"
                        layout={{ position: 'absolute', left: 6, right: 6, top: 20, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionSetsCompletedValue ?? '0'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </Region>
                </Border>
                <HabbiconHubLayoutAlbumProgressContainer {...albumProgressContainer} />
            </Border>
        </Region>
    );
};

/** Named region `tabs_bg` of HabbiconHubLayout - configured through the parent's `tabsBg` prop. */
export interface HabbiconHubLayoutTabsBgProps {
    layout?: BoxLayout;
}

export const HabbiconHubLayoutTabsBg = ({ layout }: HabbiconHubLayoutTabsBgProps) => {
    return (
        <Region
            name="tabs_bg"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 7, width: 540, top: 144, height: 1, ...layout }}
        />
    );
};

/** Named region `highlight` of HabbiconHubLayout - configured through the parent's `highlight` prop. */
export interface HabbiconHubLayoutHighlight2Props {
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHighlight2 = ({ layout }: HabbiconHubLayoutHighlight2Props) => {
    return (
        <Region
            name="highlight"
            blendMode="add"
            layout={{ position: 'absolute', left: 1, right: -67, top: 1, height: 4, ...layout }}
        />
    );
};

/** Named region `progress` of HabbiconHubLayout - configured through the parent's `progress` prop. */
export interface HabbiconHubLayoutProgress2Props {
    highlight?: HabbiconHubLayoutHighlight2Props;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutProgress2 = ({ highlight, layout }: HabbiconHubLayoutProgress2Props) => {
    return (
        <Region
            name="progress"
            layout={{ position: 'absolute', left: 0, width: 1, top: 0, bottom: 0, ...layout }}
        >
            <Shape
                name="fill"
                shape="round_rectangle"
                color="#54a8e8"
                strokeThickness={1}
                radius={4}
                layout={{ position: 'absolute', left: 0, right: -68, top: 0, height: 12 }}
            />
            <HabbiconHubLayoutHighlight2 {...highlight} />
        </Region>
    );
};

/** Named region `set_row_progress_bar` of HabbiconHubLayout - configured through the parent's `setRowProgressBar` prop. */
export interface HabbiconHubLayoutSetRowProgressBarProps {
    layout?: BoxLayout;
    progress?: HabbiconHubLayoutProgress2Props;
}

export const HabbiconHubLayoutSetRowProgressBar = ({ layout, progress }: HabbiconHubLayoutSetRowProgressBarProps) => {
    return (
        <Region
            name="set_row_progress_bar"
            layout={{ position: 'absolute', left: 53, right: 23, top: 28, height: 12, ...layout }}
        >
            <Shape
                name="background"
                shape="round_rectangle"
                color="#4d5d66"
                strokeThickness={1}
                radius={4}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 12 }}
            />
            <HabbiconHubLayoutProgress2 {...progress} />
        </Region>
    );
};

/** Row template `set_row_template` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutSetRowTemplateItemProps {
    captionSetRowProgressText?: string;
    captionSetRowTitle?: string;
    layout?: BoxLayout;
    onSetRowTemplate?: () => void;
    setRowProgressBar?: HabbiconHubLayoutSetRowProgressBarProps;
    srcSetIcon?: string;
}

export const HabbiconHubLayoutSetRowTemplateItem = ({ captionSetRowProgressText, captionSetRowTitle, layout, onSetRowTemplate, setRowProgressBar, srcSetIcon }: HabbiconHubLayoutSetRowTemplateItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="set_row_template"
            onPointerTap={onSetRowTemplate}
            cursor="pointer"
            layout={{ width: 145, height: 50, flexShrink: 0, ...layout }}
        >
            <Border
                variant="10"
                name="set_row_background"
                tintColor="#f8ebd6"
                layout={{ position: 'absolute', left: 1, right: -1, top: 1, bottom: 0 }}
            />
            <ThemeImage
                name="set_icon"
                src={srcSetIcon}
                layout={{ position: 'absolute', left: 7, width: 40, top: 4, height: 40 }}
            />
            <Region
                name="set_row_title"
                layout={{ position: 'absolute', left: 50, width: 115, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSetRowTitle ?? t('habbicon_set_name')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#2b2b2b' }}
                />
            </Region>
            <HabbiconHubLayoutSetRowProgressBar {...setRowProgressBar} />
            <Region
                name="set_row_progress_text"
                visible={false}
                layout={{ position: 'absolute', left: 104, width: 34, top: 27, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionSetRowProgressText ?? '0/0'}
                    textOptions={{ fill: '#2b2b2b', align: 'right' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `set_rail_list` of HabbiconHubLayout - configured through the parent's `setRailList` prop. */
export interface HabbiconHubLayoutSetRailListProps {
    itemsSetRailList?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutSetRailList = ({ itemsSetRailList, layout }: HabbiconHubLayoutSetRailListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 4, width: 145, top: 4, bottom: 4, ...layout }}
        >
            <Region
                name="set_rail_list"
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            >
                {itemsSetRailList ?? (
                    <HabbiconHubLayoutSetRowTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `highlight` of HabbiconHubLayout - configured through the parent's `highlight` prop. */
export interface HabbiconHubLayoutHighlight3Props {
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHighlight3 = ({ layout }: HabbiconHubLayoutHighlight3Props) => {
    return (
        <Region
            name="highlight"
            blendMode="add"
            layout={{ position: 'absolute', left: 1, right: -152, top: 1, height: 5, ...layout }}
        />
    );
};

/** Named region `progress` of HabbiconHubLayout - configured through the parent's `progress` prop. */
export interface HabbiconHubLayoutProgress3Props {
    highlight?: HabbiconHubLayoutHighlight3Props;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutProgress3 = ({ highlight, layout }: HabbiconHubLayoutProgress3Props) => {
    return (
        <Region
            name="progress"
            layout={{ position: 'absolute', left: 0, width: 1, top: 0, bottom: 0, ...layout }}
        >
            <Shape
                name="fill"
                shape="round_rectangle"
                color="#54a8e8"
                strokeThickness={1}
                radius={6}
                layout={{ position: 'absolute', left: 0, right: -153, top: 0, height: 16 }}
            />
            <HabbiconHubLayoutHighlight3 {...highlight} />
        </Region>
    );
};

/** Named region `set_progress_bar` of HabbiconHubLayout - configured through the parent's `setProgressBar` prop. */
export interface HabbiconHubLayoutSetProgressBarProps {
    layout?: BoxLayout;
    progress?: HabbiconHubLayoutProgress3Props;
}

export const HabbiconHubLayoutSetProgressBar = ({ layout, progress }: HabbiconHubLayoutSetProgressBarProps) => {
    return (
        <Region
            name="set_progress_bar"
            layout={{ position: 'absolute', left: 0, width: 154, top: 3, height: 16, ...layout }}
        >
            <Shape
                name="background"
                shape="round_rectangle"
                color="#4d5d66"
                strokeThickness={1}
                radius={6}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 16 }}
            />
            <HabbiconHubLayoutProgress3 {...progress} />
        </Region>
    );
};

/** Named region `set_progress_container` of HabbiconHubLayout - configured through the parent's `setProgressContainer` prop. */
export interface HabbiconHubLayoutSetProgressContainerProps {
    captionSetProgressText?: string;
    layout?: BoxLayout;
    setProgressBar?: HabbiconHubLayoutSetProgressBarProps;
}

export const HabbiconHubLayoutSetProgressContainer = ({ captionSetProgressText, layout, setProgressBar }: HabbiconHubLayoutSetProgressContainerProps) => {
    return (
        <Region
            name="set_progress_container"
            layout={{ position: 'absolute', left: 14, right: 136, top: 62, height: 22, ...layout }}
        >
            <HabbiconHubLayoutSetProgressBar {...setProgressBar} />
            <Region
                name="set_progress_text"
                layout={{ position: 'absolute', left: 164, width: 28, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSetProgressText ?? '0 / 0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#2b2b2b' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `header` of HabbiconHubLayout - configured through the parent's `header` prop. */
export interface HabbiconHubLayoutHeaderProps {
    captionSetDescription?: string;
    captionSetTitle?: string;
    layout?: BoxLayout;
    setProgressContainer?: HabbiconHubLayoutSetProgressContainerProps;
}

export const HabbiconHubLayoutHeader = ({ captionSetDescription, captionSetTitle, layout, setProgressContainer }: HabbiconHubLayoutHeaderProps) => {
    return (
        <Region
            name="header"
            layout={{ position: 'absolute', left: 0, right: 0, top: 2, height: 92, ...layout }}
        >
            <Border
                variant="10"
                name="bg1"
                tintColor="#e0cba6"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 1 }}
            />
            <Region
                name="set_title"
                layout={{ position: 'absolute', left: 12, right: 138, top: 8, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSetTitle ?? 'Habbicon set name'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#2b2b2b' }}
                />
            </Region>
            <Region
                name="set_description"
                layout={{ position: 'absolute', left: 13, right: 8, top: 31, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionSetDescription ?? 'sdfg fdgfd gfsdgdfs ggfdfg fdfgfsdg fsdgfsdgfsd gdfg sdfgfsd gfdsgfsdgfsdgdf dfg d gsfdsf'}
                    textOptions={{ fill: '#3b3b3b', wordWrap: true, wordWrapWidth: 359 }}
                />
            </Region>
            <HabbiconHubLayoutSetProgressContainer {...setProgressContainer} />
        </Region>
    );
};

/** Named region `tile_background` of HabbiconHubLayout - configured through the parent's `tileBackground` prop. */
export interface HabbiconHubLayoutTileBackgroundProps {
    layout?: BoxLayout;
}

export const HabbiconHubLayoutTileBackground = ({ layout }: HabbiconHubLayoutTileBackgroundProps) => {
    return (
        <Region
            name="tile_background"
            backgroundColor="#f8ebd6"
            layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1, ...layout }}
        />
    );
};

/** Named region `locked_overlay` of HabbiconHubLayout - configured through the parent's `lockedOverlay` prop. */
export interface HabbiconHubLayoutLockedOverlayProps {
    layout?: BoxLayout;
    visibleLockedOverlay?: boolean;
}

export const HabbiconHubLayoutLockedOverlay = ({ layout, visibleLockedOverlay }: HabbiconHubLayoutLockedOverlayProps) => {
    return (
        <Region
            name="locked_overlay"
            visible={visibleLockedOverlay ?? false}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Row template `tile_template` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutTileTemplateItemProps {
    layout?: BoxLayout;
    lockedOverlay?: HabbiconHubLayoutLockedOverlayProps;
    onTileTemplate?: () => void;
    srcBitmap?: string;
    srcClaimableIcon?: string;
    srcFavoriteIcon?: string;
    tileBackground?: HabbiconHubLayoutTileBackgroundProps;
}

export const HabbiconHubLayoutTileTemplateItem = ({ layout, lockedOverlay, onTileTemplate, srcBitmap, srcClaimableIcon, srcFavoriteIcon, tileBackground }: HabbiconHubLayoutTileTemplateItemProps) => {
    return (
        <Region
            name="tile_template"
            onPointerTap={onTileTemplate}
            cursor="pointer"
            layout={{ width: 50, height: 50, flexShrink: 0, ...layout }}
        >
            <HabbiconHubLayoutTileBackground {...tileBackground} />
            <Border
                variant="2"
                name="tile_border"
                tintColor="#c8be8d"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <ThemeImage
                name="bitmap"
                src={srcBitmap}
                layout={{ position: 'absolute', left: 5, width: 40, top: 5, height: 40, minWidth: 40, maxWidth: 40 }}
            />
            <HabbiconHubLayoutLockedOverlay {...lockedOverlay} />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 14, top: 2, height: 14 }}
            >
                <ThemeImage
                    name="favorite_icon"
                    src={srcFavoriteIcon ?? layoutImage('icon_habbicon_fav.png')}
                    layout={{ position: 'absolute', left: 2, width: 14, top: 2, height: 14 }}
                />
            </Region>
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 31, width: 18, top: 1, height: 18 }}
            >
                <ThemeImage
                    name="claimable_icon"
                    src={srcClaimableIcon ?? layoutImage('icon_notification_corner_mid.png')}
                    layout={{ position: 'absolute', left: 31, width: 18, top: 1, height: 18 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `empty_tile_template` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutEmptyTileTemplateItemProps {
    layout?: BoxLayout;
    onEmptyTileTemplate?: () => void;
}

export const HabbiconHubLayoutEmptyTileTemplateItem = ({ layout, onEmptyTileTemplate }: HabbiconHubLayoutEmptyTileTemplateItemProps) => {
    return (
        <Region
            name="empty_tile_template"
            onPointerTap={onEmptyTileTemplate}
            cursor="pointer"
            layout={{ width: 50, height: 50, flexShrink: 0, ...layout }}
        >
            <Border
                variant="2"
                name="tile_border"
                tintColor="#c8be8d"
                blend={0.2}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
        </Region>
    );
};

/** Named region `set_grid` of HabbiconHubLayout - configured through the parent's `setGrid` prop. */
export interface HabbiconHubLayoutSetGridProps {
    itemsSetGrid?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutSetGrid = ({ itemsSetGrid, layout }: HabbiconHubLayoutSetGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 8, right: 138, top: 106, bottom: 8, ...layout }}
        >
            <Region
                name="set_grid"
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4, width: '100%' }}
            >
                {itemsSetGrid ?? (
                    <>
                        <HabbiconHubLayoutTileTemplateItem />
                        <HabbiconHubLayoutEmptyTileTemplateItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `set_page_container` of HabbiconHubLayout - configured through the parent's `setPageContainer` prop. */
export interface HabbiconHubLayoutSetPageContainerProps {
    captionRewardBuyDescription?: string;
    captionRewardBuyPrice?: string;
    captionRewardDescription?: string;
    captionRewardTitle?: string;
    header?: HabbiconHubLayoutHeaderProps;
    layout?: BoxLayout;
    onRewardActionButton?: () => void;
    onRewardBuyButton?: () => void;
    setGrid?: HabbiconHubLayoutSetGridProps;
    srcRewardHabbicon?: string;
}

export const HabbiconHubLayoutSetPageContainer = ({ captionRewardBuyDescription, captionRewardBuyPrice, captionRewardDescription, captionRewardTitle, header, layout, onRewardActionButton, onRewardBuyButton, setGrid, srcRewardHabbicon }: HabbiconHubLayoutSetPageContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="set_page_container"
            layout={{ position: 'absolute', left: 160, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="10"
                name="set_page_background"
                tintColor="#f6ebd7"
                layout={{ position: 'absolute', left: 0, right: 0, top: 98, bottom: 0 }}
            />
            <HabbiconHubLayoutHeader {...header} />
            <Region layout={{ position: 'absolute', left: 252, width: 116, top: 106, height: 232, flexDirection: 'column', gap: 9 }}>
                <Border
                    variant="3"
                    name="reward_panel"
                    tintColor="#e7d5b2"
                    layout={{ width: 116, height: 152, flexShrink: 0 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, right: 0, top: 9, height: 135, flexDirection: 'column', gap: 6 }}>
                        <Region
                            name="reward_title"
                            layout={{ width: 100, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionRewardTitle ?? t('habbicon_reward.title')}
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#2b2b2b', align: 'center' }}
                            />
                        </Region>
                        <Border
                            variant="3"
                            name="reward_habbicon_frame"
                            tintColor="#f8ebd6"
                            layout={{ width: 46, height: 46, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="reward_habbicon"
                                src={srcRewardHabbicon}
                                layout={{ position: 'absolute', left: 3, width: 40, top: 3, height: 40 }}
                            />
                        </Border>
                        <Region
                            name="reward_description"
                            layout={{ width: 100, height: 26, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionRewardDescription ?? t('habbicon_reward.description')}
                                textOptions={{ fill: '#3b3b3b', wordWrap: true, wordWrapWidth: 100, align: 'center' }}
                            />
                        </Region>
                        <Button
                            variant="5"
                            name="reward_action_button"
                            tintColor="#01a101"
                            onPointerTap={onRewardActionButton}
                            textStyle="text-style-button-shiny-regular"
                            layout={{ width: 100, height: 28, flexShrink: 0, minWidth: 100, maxWidth: 100 }}
                        >
                            {t('habbicon_reward.claim')}
                        </Button>
                    </Region>
                </Border>
                <Border
                    variant="3"
                    name="reward_buy_container"
                    tintColor="#e7d5b2"
                    layout={{ width: 116, height: 71, flexShrink: 0 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, right: 0, top: 9, height: 53, flexDirection: 'column', gap: 8 }}>
                        <Region
                            name="reward_buy_description"
                            layout={{ width: 100, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionRewardBuyDescription ?? t('habbicon_book.buy_set')}
                                textOptions={{ fill: '#2b2b2b', wordWrap: true, wordWrapWidth: 100, align: 'center' }}
                            />
                        </Region>
                        <Region layout={{ width: 122, height: 28, flexShrink: 0, flexDirection: 'row', gap: 4 }}>
                            <Region
                                name="reward_buy_price"
                                layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionRewardBuyPrice ?? '0'}
                                    textStyle="text-style-u-bold"
                                />
                            </Region>
                            <Icon
                                variant="35"
                                name="reward_buy_currency_icon"
                                layout={{ width: 16, height: 16, flexShrink: 0 }}
                            />
                            <Button
                                variant="5"
                                name="reward_buy_button"
                                tintColor="#01a101"
                                onPointerTap={onRewardBuyButton}
                                textStyle="text-style-button-shiny-regular"
                                layout={{ width: 88, height: 28, flexShrink: 0 }}
                            >
                                {t('generic.buy')}
                            </Button>
                        </Region>
                    </Region>
                </Border>
            </Region>
            <HabbiconHubLayoutSetGrid {...setGrid} />
        </Region>
    );
};

/** Named region `all_sets_container` of HabbiconHubLayout - configured through the parent's `allSetsContainer` prop. */
export interface HabbiconHubLayoutAllSetsContainerProps {
    layout?: BoxLayout;
    setPageContainer?: HabbiconHubLayoutSetPageContainerProps;
    setRailList?: HabbiconHubLayoutSetRailListProps;
}

export const HabbiconHubLayoutAllSetsContainer = ({ layout, setPageContainer, setRailList }: HabbiconHubLayoutAllSetsContainerProps) => {
    return (
        <Region
            name="all_sets_container"
            layout={{ position: 'absolute', left: 7, width: 540, top: 146, bottom: 44, ...layout }}
        >
            <Border
                variant="6"
                name="set_rail_background"
                layout={{ position: 'absolute', left: 0, width: 154, top: 0, bottom: 0 }}
            />
            <HabbiconHubLayoutSetRailList {...setRailList} />
            <HabbiconHubLayoutSetPageContainer {...setPageContainer} />
        </Region>
    );
};

/** Named region `tile_background` of HabbiconHubLayout - configured through the parent's `tileBackground` prop. */
export interface HabbiconHubLayoutTileBackground2Props {
    layout?: BoxLayout;
}

export const HabbiconHubLayoutTileBackground2 = ({ layout }: HabbiconHubLayoutTileBackground2Props) => {
    return (
        <Region
            name="tile_background"
            backgroundColor="#f8ebd6"
            layout={{ position: 'absolute', left: 1, right: 1, top: 1, bottom: 1, ...layout }}
        />
    );
};

/** Named region `locked_overlay` of HabbiconHubLayout - configured through the parent's `lockedOverlay` prop. */
export interface HabbiconHubLayoutLockedOverlay2Props {
    layout?: BoxLayout;
    visibleLockedOverlay?: boolean;
}

export const HabbiconHubLayoutLockedOverlay2 = ({ layout, visibleLockedOverlay }: HabbiconHubLayoutLockedOverlay2Props) => {
    return (
        <Region
            name="locked_overlay"
            visible={visibleLockedOverlay ?? false}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        />
    );
};

/** Row template `tray_tile_template` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutTrayTileTemplateItemProps {
    layout?: BoxLayout;
    lockedOverlay?: HabbiconHubLayoutLockedOverlay2Props;
    onTrayTileTemplate?: () => void;
    srcBitmap?: string;
    srcClaimableIcon?: string;
    srcFavoriteIcon?: string;
    tileBackground?: HabbiconHubLayoutTileBackground2Props;
}

export const HabbiconHubLayoutTrayTileTemplateItem = ({ layout, lockedOverlay, onTrayTileTemplate, srcBitmap, srcClaimableIcon, srcFavoriteIcon, tileBackground }: HabbiconHubLayoutTrayTileTemplateItemProps) => {
    return (
        <Region
            name="tray_tile_template"
            onPointerTap={onTrayTileTemplate}
            cursor="pointer"
            layout={{ width: 50, height: 50, flexShrink: 0, ...layout }}
        >
            <HabbiconHubLayoutTileBackground2 {...tileBackground} />
            <Border
                variant="2"
                name="tile_border"
                tintColor="#c8be8d"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <ThemeImage
                name="bitmap"
                src={srcBitmap}
                layout={{ position: 'absolute', left: 5, width: 40, top: 5, height: 40, minWidth: 40, maxWidth: 40 }}
            />
            <HabbiconHubLayoutLockedOverlay2 {...lockedOverlay} />
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 2, width: 14, top: 2, height: 14 }}
            >
                <ThemeImage
                    name="favorite_icon"
                    src={srcFavoriteIcon ?? layoutImage('icon_habbicon_fav.png')}
                    layout={{ position: 'absolute', left: 2, width: 14, top: 2, height: 14 }}
                />
            </Region>
            <Region
                visible={false}
                layout={{ position: 'absolute', left: 31, width: 18, top: 1, height: 18 }}
            >
                <ThemeImage
                    name="claimable_icon"
                    src={srcClaimableIcon ?? layoutImage('icon_notification_corner_mid.png')}
                    layout={{ position: 'absolute', left: 31, width: 18, top: 1, height: 18 }}
                />
            </Region>
        </Region>
    );
};

/** Named region `tray_group_grid` of HabbiconHubLayout - configured through the parent's `trayGroupGrid` prop. */
export interface HabbiconHubLayoutTrayGroupGridProps {
    itemsTrayGroupGrid?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutTrayGroupGrid = ({ itemsTrayGroupGrid, layout }: HabbiconHubLayoutTrayGroupGridProps) => {
    return (
        <Region
            name="tray_group_grid"
            layout={{ position: 'absolute', left: 10, right: 10, top: 30, height: 50, flexDirection: 'row', flexWrap: 'wrap', gap: 4, ...layout }}
        >
            {itemsTrayGroupGrid ?? (
                <HabbiconHubLayoutTrayTileTemplateItem />
            )}
        </Region>
    );
};

/** Row template `tray_group_template` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutTrayGroupTemplateItemProps {
    captionTrayGroupTitle?: string;
    layout?: BoxLayout;
    trayGroupGrid?: HabbiconHubLayoutTrayGroupGridProps;
}

export const HabbiconHubLayoutTrayGroupTemplateItem = ({ captionTrayGroupTitle, layout, trayGroupGrid }: HabbiconHubLayoutTrayGroupTemplateItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="10"
            name="tray_group_template"
            tintColor="#efe1c4"
            layout={{ width: 506, height: 89, flexShrink: 0, ...layout }}
        >
            <Region
                name="tray_group_title"
                layout={{ position: 'absolute', left: 10, width: 115, top: 7, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrayGroupTitle ?? t('habbicon_set_name')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#2b2b2b' }}
                />
            </Region>
            <HabbiconHubLayoutTrayGroupGrid {...trayGroupGrid} />
        </Border>
    );
};

/** Named region `tray_group_list` of HabbiconHubLayout - configured through the parent's `trayGroupList` prop. */
export interface HabbiconHubLayoutTrayGroupListProps {
    itemsTrayGroupList?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutTrayGroupList = ({ itemsTrayGroupList, layout }: HabbiconHubLayoutTrayGroupListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 10, width: 526, top: 59, bottom: 11, ...layout }}
        >
            <Region
                name="tray_group_list"
                layout={{ flexDirection: 'column', gap: 6, width: '100%' }}
            >
                {itemsTrayGroupList ?? (
                    <HabbiconHubLayoutTrayGroupTemplateItem />
                )}
            </Region>
        </ScrollArea>
    );
};

/** Named region `tray_container` of HabbiconHubLayout - configured through the parent's `trayContainer` prop. */
export interface HabbiconHubLayoutTrayContainerProps {
    captionTraySummary?: string;
    captionTrayTitle?: string;
    layout?: BoxLayout;
    trayGroupList?: HabbiconHubLayoutTrayGroupListProps;
    visibleTrayContainer?: boolean;
}

export const HabbiconHubLayoutTrayContainer = ({ captionTraySummary, captionTrayTitle, layout, trayGroupList, visibleTrayContainer }: HabbiconHubLayoutTrayContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tray_container"
            visible={visibleTrayContainer ?? false}
            layout={{ position: 'absolute', left: 7, width: 540, top: 146, bottom: 44, ...layout }}
        >
            <Border
                variant="3"
                name="tray_background"
                tintColor="#f6ebd7"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Region
                name="tray_title"
                layout={{ position: 'absolute', left: 12, width: 60, top: 10, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTrayTitle ?? t('habbicon_book.tab.owned')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#2b2b2b' }}
                />
            </Region>
            <Region
                name="tray_summary"
                layout={{ position: 'absolute', left: 12, width: 510, top: 34, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTraySummary ?? t('habbicon_book.tray.summary')}
                    textOptions={{ fill: '#3b3b3b', wordWrap: true, wordWrapWidth: 510 }}
                />
            </Region>
            <HabbiconHubLayoutTrayGroupList {...trayGroupList} />
        </Region>
    );
};

/** Row template `habbicon_popup_title` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutHabbiconPopupTitleItemProps {
    captionHabbiconPopupTitle?: string;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHabbiconPopupTitleItem = ({ captionHabbiconPopupTitle, layout }: HabbiconHubLayoutHabbiconPopupTitleItemProps) => {
    return (
        <Region
            name="habbicon_popup_title"
            layout={{ width: 164, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionHabbiconPopupTitle ?? 'Habbicon name'}
                textStyle="text-style-u-bold"
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};

/** Row template `habbicon_popup_description` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutHabbiconPopupDescriptionItemProps {
    captionHabbiconPopupDescription?: string;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHabbiconPopupDescriptionItem = ({ captionHabbiconPopupDescription, layout }: HabbiconHubLayoutHabbiconPopupDescriptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="habbicon_popup_description"
            layout={{ width: 156, height: 20, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHabbiconPopupDescription ?? t('habbicon.popup.desc.not_owned')}
                textOptions={{ wordWrap: true, wordWrapWidth: 156 }}
            />
        </Region>
    );
};

/** Row template `habbicon_popup_action_row` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutHabbiconPopupActionRowItemProps {
    layout?: BoxLayout;
    onHabbiconPopupActionButton?: () => void;
}

export const HabbiconHubLayoutHabbiconPopupActionRowItem = ({ layout, onHabbiconPopupActionButton }: HabbiconHubLayoutHabbiconPopupActionRowItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="habbicon_popup_action_row"
            layout={{ width: 180, height: 28, flexShrink: 0, ...layout }}
        >
            <Button
                variant="5"
                name="habbicon_popup_action_button"
                tintColor="#01a101"
                onPointerTap={onHabbiconPopupActionButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', left: 12, width: 156, top: 0, height: 28, minWidth: 156, maxWidth: 156 }}
            >
                {t('generic.claim')}
            </Button>
        </Region>
    );
};

/** Row template `habbicon_popup_bottom_bar` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutHabbiconPopupBottomBarItemProps {
    captionHabbiconPopupPrice?: string;
    layout?: BoxLayout;
    onHabbiconPopupBuyButton?: () => void;
}

export const HabbiconHubLayoutHabbiconPopupBottomBarItem = ({ captionHabbiconPopupPrice, layout, onHabbiconPopupBuyButton }: HabbiconHubLayoutHabbiconPopupBottomBarItemProps) => {
    const t = useTranslation();

    return (
        <Border
            variant="3"
            name="habbicon_popup_bottom_bar"
            tintColor="#efefef"
            blend={0}
            layout={{ width: 180, height: 28, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', right: 12, width: 91, top: 0, height: 28, flexDirection: 'row', gap: 4 }}>
                <Region
                    name="habbicon_popup_price"
                    layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionHabbiconPopupPrice ?? '0'}
                        textStyle="text-style-u-bold"
                    />
                </Region>
                <Icon
                    variant="35"
                    name="habbicon_popup_currency_icon"
                    layout={{ width: 16, height: 16, flexShrink: 0 }}
                />
                <Button
                    variant="5"
                    name="habbicon_popup_buy_button"
                    tintColor="#01a101"
                    onPointerTap={onHabbiconPopupBuyButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ width: 57, height: 28, flexShrink: 0, minWidth: 57, maxWidth: 57 }}
                >
                    {t('generic.buy')}
                </Button>
            </Region>
        </Border>
    );
};

/** Named region `habbicon_popup_content_list` of HabbiconHubLayout - configured through the parent's `habbiconPopupContentList` prop. */
export interface HabbiconHubLayoutHabbiconPopupContentListProps {
    itemsHabbiconPopupContentList?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHabbiconPopupContentList = ({ itemsHabbiconPopupContentList, layout }: HabbiconHubLayoutHabbiconPopupContentListProps) => {
    return (
        <Region
            name="habbicon_popup_content_list"
            layout={{ position: 'absolute', left: 0, right: 0, top: 6, height: 108, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsHabbiconPopupContentList ?? (
                <>
                    <HabbiconHubLayoutHabbiconPopupTitleItem />
                    <HabbiconHubLayoutHabbiconPopupDescriptionItem />
                    <HabbiconHubLayoutHabbiconPopupActionRowItem />
                    <HabbiconHubLayoutHabbiconPopupBottomBarItem />
                </>
            )}
        </Region>
    );
};

/** Named region `pointer_crossover` of HabbiconHubLayout - configured through the parent's `pointerCrossover` prop. */
export interface HabbiconHubLayoutPointerCrossoverProps {
    layout?: BoxLayout;
}

export const HabbiconHubLayoutPointerCrossover = ({ layout }: HabbiconHubLayoutPointerCrossoverProps) => {
    return (
        <Region
            name="pointer_crossover"
            backgroundColor="#efefef"
            layout={{ position: 'absolute', left: 84, width: 13, bottom: 0, height: 2, ...layout }}
        />
    );
};

/** Row template `habbicon_popup_background` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutHabbiconPopupBackgroundItemProps {
    habbiconPopupContentList?: HabbiconHubLayoutHabbiconPopupContentListProps;
    layout?: BoxLayout;
    pointerCrossover?: HabbiconHubLayoutPointerCrossoverProps;
}

export const HabbiconHubLayoutHabbiconPopupBackgroundItem = ({ habbiconPopupContentList, layout, pointerCrossover }: HabbiconHubLayoutHabbiconPopupBackgroundItemProps) => {
    return (
        <Border
            variant="4"
            name="habbicon_popup_background"
            tintColor="#efefef"
            layout={{ width: 180, height: 121, flexShrink: 0, ...layout }}
        >
            <HabbiconHubLayoutHabbiconPopupContentList {...habbiconPopupContentList} />
            <HabbiconHubLayoutPointerCrossover {...pointerCrossover} />
        </Border>
    );
};

/** Row template `habbicon_popup_pointer` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutHabbiconPopupPointerItemProps {
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHabbiconPopupPointerItem = ({ layout }: HabbiconHubLayoutHabbiconPopupPointerItemProps) => {
    return (
        <Region
            name="habbicon_popup_pointer"
            layout={{ width: 15, height: 15, flexShrink: 0, ...layout }}
        >
            <Shape
                shape="rhombus"
                color="#efefef"
                strokeThickness={1}
                layout={{ position: 'absolute', left: 0, width: 15, top: -8, height: 15 }}
            />
        </Region>
    );
};

/** Named region `habbicon_item_popup` of HabbiconHubLayout - configured through the parent's `habbiconItemPopup` prop. */
export interface HabbiconHubLayoutHabbiconItemPopupProps {
    itemsHabbiconItemPopup?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHabbiconItemPopup = ({ itemsHabbiconItemPopup, layout }: HabbiconHubLayoutHabbiconItemPopupProps) => {
    return (
        <Region
            name="habbicon_item_popup"
            layout={{ position: 'absolute', left: 190, width: 180, top: 210, height: 136, flexDirection: 'column', ...layout }}
        >
            {itemsHabbiconItemPopup ?? (
                <>
                    <HabbiconHubLayoutHabbiconPopupBackgroundItem />
                    <HabbiconHubLayoutHabbiconPopupPointerItem />
                </>
            )}
        </Region>
    );
};

/** Named region `habbicon_popup_layer` of HabbiconHubLayout - configured through the parent's `habbiconPopupLayer` prop. */
export interface HabbiconHubLayoutHabbiconPopupLayerProps {
    habbiconItemPopup?: HabbiconHubLayoutHabbiconItemPopupProps;
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHabbiconPopupLayer = ({ habbiconItemPopup, layout }: HabbiconHubLayoutHabbiconPopupLayerProps) => {
    return (
        <Region
            name="habbicon_popup_layer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 102, bottom: 40, ...layout }}
        >
            <HabbiconHubLayoutHabbiconItemPopup {...habbiconItemPopup} />
        </Region>
    );
};
