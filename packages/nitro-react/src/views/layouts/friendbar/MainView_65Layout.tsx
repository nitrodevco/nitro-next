import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `65_main_view_xml` (layout "wall_message_main", 552x565) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MainView_65LayoutProps {
    captionBackButtonLabel?: string;
    captionListHeader?: string;
    captionPageInfo?: string;
    captionPostButtonLabel?: string;
    captionStatus?: string;
    layout?: BoxLayout;
    onBackButton?: () => void;
    onClose?: () => void;
    onPostButton?: () => void;
    onShowFirst?: () => void;
    onShowLast?: () => void;
    onShowNext?: () => void;
    onShowPrevious?: () => void;
    scrollableMessageList?: MainView_65LayoutScrollableMessageListProps;
    shortcuts?: MainView_65LayoutShortcutsProps;
    topPart?: MainView_65LayoutTopPartProps;
}

export const MainView_65Layout = ({ captionBackButtonLabel, captionListHeader, captionPageInfo, captionPostButtonLabel, captionStatus, layout, onBackButton, onClose, onPostButton, onShowFirst, onShowLast, onShowNext, onShowPrevious, scrollableMessageList, shortcuts, topPart }: MainView_65LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={98337}
            caption={t('groupforum.view.window_title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 552, height: 565, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <MainView_65LayoutTopPart {...topPart} />
                <MainView_65LayoutShortcuts {...shortcuts} />
                <Region
                    name="list_header"
                    params={144}
                    layout={{ position: 'absolute', left: 0, right: 11, top: 115, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionListHeader ?? 'Topic'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#a6a6a2' }}
                    />
                </Region>
                <Border
                    variant="7"
                    name="list_border"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, right: 12, top: 140, bottom: 105 }}
                >
                    <MainView_65LayoutScrollableMessageList {...scrollableMessageList} />
                </Border>
                <ContainerButton
                    variant="3"
                    name="back_button"
                    params={1041}
                    tintColor="#dddddd"
                    onPointerTap={onBackButton}
                    layout={{ position: 'absolute', left: 10, width: 95, bottom: 62, height: 30, minWidth: 95, justifyContent: 'center' }}
                >
                    <Region
                        name="back_button_label"
                        params={3935440}
                        layout={{ position: 'absolute', marginLeft: 17.5, marginRight: -17.5, width: 130, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBackButtonLabel ?? t('groupforum.view.back')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                </ContainerButton>
                <ContainerButton
                    variant="3"
                    name="post_button"
                    params={394321}
                    tintColor="#0a9bc5"
                    onPointerTap={onPostButton}
                    layout={{ position: 'absolute', right: 190, width: 95, bottom: 62, height: 30, minWidth: 95, justifyContent: 'center' }}
                >
                    <Region
                        name="post_button_label"
                        params={1838288}
                        layout={{ position: 'absolute', width: 29, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPostButtonLabel ?? 'Post'}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </ContainerButton>
                <Region
                    params={1104}
                    layout={{ position: 'absolute', right: 15, width: 165, bottom: 62, height: 30 }}
                >
                    <ContainerButton
                        variant="3"
                        name="show_first"
                        params={393233}
                        onPointerTap={onShowFirst}
                        layout={{ position: 'absolute', right: 140, width: 25, top: 0, height: 30, justifyContent: 'center' }}
                    >
                        {'<<'}
                        <Region
                            params={3280}
                            layout={{ position: 'absolute', width: 17, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="<<"
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    </ContainerButton>
                    <ContainerButton
                        variant="3"
                        name="show_previous"
                        params={393233}
                        onPointerTap={onShowPrevious}
                        layout={{ position: 'absolute', right: 110, width: 25, top: 0, height: 30, justifyContent: 'center' }}
                    >
                        {'<'}
                        <Region
                            params={3280}
                            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 10, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="<"
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    </ContainerButton>
                    <Region
                        name="page_info"
                        params={16}
                        layout={{ position: 'absolute', left: 58, width: 50, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionPageInfo ?? '30/200'}
                            textOptions={{ fill: '#949491', align: 'center' }}
                        />
                    </Region>
                    <ContainerButton
                        variant="3"
                        name="show_next"
                        params={393233}
                        onPointerTap={onShowNext}
                        layout={{ position: 'absolute', right: 30, width: 25, top: 0, height: 30, justifyContent: 'center' }}
                    >
                        {'>'}
                        <Region
                            params={3280}
                            layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 10, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text=">"
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    </ContainerButton>
                    <ContainerButton
                        variant="3"
                        name="show_last"
                        params={393233}
                        onPointerTap={onShowLast}
                        layout={{ position: 'absolute', right: 0, width: 25, top: 0, height: 30, justifyContent: 'center' }}
                    >
                        {'>>'}
                        <Region
                            params={3280}
                            layout={{ position: 'absolute', width: 17, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text=">>"
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                    </ContainerButton>
                </Region>
                <Region
                    params={1104}
                    layout={{ position: 'absolute', right: 72, width: 300, bottom: 30, height: 20 }}
                >
                    <Region
                        name="status"
                        params={787585}
                        layout={{ position: 'absolute', left: 3, right: -3, bottom: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionStatus ?? 'Status text'}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `top_click_area` of MainView_65Layout - configured through the parent's `topClickArea` prop. */
export interface MainView_65LayoutTopClickAreaProps {
    layout?: BoxLayout;
    onTopClickArea?: () => void;
}

export const MainView_65LayoutTopClickArea = ({ layout, onTopClickArea }: MainView_65LayoutTopClickAreaProps) => {
    return (
        <Region
            name="top_click_area"
            params={145}
            onPointerTap={onTopClickArea}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80, ...layout }}
        />
    );
};

/** Named region `icon_background` of MainView_65Layout - configured through the parent's `iconBackground` prop. */
export interface MainView_65LayoutIconBackgroundProps {
    layout?: BoxLayout;
    srcHeaderIcon?: string;
}

export const MainView_65LayoutIconBackground = ({ layout, srcHeaderIcon }: MainView_65LayoutIconBackgroundProps) => {
    return (
        <Region
            name="icon_background"
            params={16}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 80, ...layout }}
        >
            <WidgetSlot
                widgetType="badge_image"
                name="group_icon"
                params={16}
                layout={{ position: 'absolute', left: 20, width: 40, top: 20, height: 40 }}
            />
            <ThemeImage
                name="header_icon"
                params={16}
                src={srcHeaderIcon}
                layout={{ position: 'absolute', left: 18, width: 44, top: 18, height: 43 }}
            />
        </Region>
    );
};

/** Named region `top_part` of MainView_65Layout - configured through the parent's `topPart` prop. */
export interface MainView_65LayoutTopPartProps {
    captionTopHeaderText?: string;
    captionTopText?: string;
    iconBackground?: MainView_65LayoutIconBackgroundProps;
    layout?: BoxLayout;
    onTopPart?: () => void;
    topClickArea?: MainView_65LayoutTopClickAreaProps;
}

export const MainView_65LayoutTopPart = ({ captionTopHeaderText, captionTopText, iconBackground, layout, onTopPart, topClickArea }: MainView_65LayoutTopPartProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_part"
            params={129}
            backgroundColor="#0e3f52"
            onPointerTap={onTopPart}
            cursor="pointer"
            layout={{ position: 'absolute', left: -5, right: 7, top: 8, height: 80, ...layout }}
        >
            <MainView_65LayoutTopClickArea {...topClickArea} />
            <MainView_65LayoutIconBackground {...iconBackground} />
            <Region
                name="top_header_text"
                params={16}
                layout={{ position: 'absolute', left: 90, width: 678, top: 10, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTopHeaderText ?? 'Super-duper long group title'}
                    textStyle="text-style-u-headline-big"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region
                name="top_text"
                params={144}
                layout={{ position: 'absolute', left: 90, right: 4, top: 40, height: 40, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTopText ?? 'Super-duper long goup description, maybe even multiline, but takes a few lines anyway'}
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 456 }}
                />
            </Region>
            <Border
                variant="1"
                name="settings_button"
                params={409681}
                tintColor="#000000"
                layout={{ position: 'absolute', right: 1, width: 65, top: 60, height: 18, minHeight: 18 }}
            >
                <ThemeImage
                    params={16}
                    src={layoutImage('pursearea_settings_icon.png')}
                    layout={{ position: 'absolute', left: 3, width: 15, top: 2, height: 15 }}
                />
                <Region
                    params={1051664}
                    layout={{ position: 'absolute', left: 17, width: 48, alignSelf: 'center', height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('groupforum.view.settings.header')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `header` of MainView_65Layout - pass real rows through its `items…` slot. */
export interface MainView_65LayoutHeaderItemProps {
    captionHeader?: string;
    layout?: BoxLayout;
}

export const MainView_65LayoutHeaderItem = ({ captionHeader, layout }: MainView_65LayoutHeaderItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            params={16}
            layout={{ width: 191, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionHeader ?? t('groupforum.view.shortcuts.header')} />
        </Region>
    );
};

/** Row template `my` of MainView_65Layout - pass real rows through its `items…` slot. */
export interface MainView_65LayoutMyItemProps {
    captionMy?: string;
    layout?: BoxLayout;
}

export const MainView_65LayoutMyItem = ({ captionMy, layout }: MainView_65LayoutMyItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="my"
            params={1}
            layout={{ width: 159, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionMy ?? t('groupforum.view.shortcuts.my')}
                textOptions={{ fill: '#1b79ab' }}
            />
        </Region>
    );
};

/** Row template `active` of MainView_65Layout - pass real rows through its `items…` slot. */
export interface MainView_65LayoutActiveItemProps {
    captionActive?: string;
    layout?: BoxLayout;
}

export const MainView_65LayoutActiveItem = ({ captionActive, layout }: MainView_65LayoutActiveItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="active"
            params={1}
            layout={{ width: 174, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionActive ?? t('groupforum.view.shortcuts.active')}
                textOptions={{ fill: '#1b79ab' }}
            />
        </Region>
    );
};

/** Row template `popular` of MainView_65Layout - pass real rows through its `items…` slot. */
export interface MainView_65LayoutPopularItemProps {
    captionPopular?: string;
    layout?: BoxLayout;
}

export const MainView_65LayoutPopularItem = ({ captionPopular, layout }: MainView_65LayoutPopularItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="popular"
            params={1}
            layout={{ width: 183, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPopular ?? t('groupforum.view.shortcuts.popular')}
                textOptions={{ fill: '#1b79ab' }}
            />
        </Region>
    );
};

/** Named region `shortcuts` of MainView_65Layout - configured through the parent's `shortcuts` prop. */
export interface MainView_65LayoutShortcutsProps {
    itemsShortcuts?: ReactNode;
    layout?: BoxLayout;
}

export const MainView_65LayoutShortcuts = ({ itemsShortcuts, layout }: MainView_65LayoutShortcutsProps) => {
    return (
        <Region
            name="shortcuts"
            params={128}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: -5, right: 7, top: 88, height: 25, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsShortcuts ?? (
                <>
                    <MainView_65LayoutHeaderItem />
                    <MainView_65LayoutMyItem />
                    <MainView_65LayoutActiveItem />
                    <MainView_65LayoutPopularItem />
                </>
            )}
        </Region>
    );
};

/** Named region `scrollable_message_list` of MainView_65Layout - configured through the parent's `scrollableMessageList` prop. */
export interface MainView_65LayoutScrollableMessageListProps {
    layout?: BoxLayout;
}

export const MainView_65LayoutScrollableMessageList = ({ layout }: MainView_65LayoutScrollableMessageListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 3, ...layout }}
        >
            <Region
                name="scrollable_message_list"
                params={2192}
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            />
        </ScrollArea>
    );
};
