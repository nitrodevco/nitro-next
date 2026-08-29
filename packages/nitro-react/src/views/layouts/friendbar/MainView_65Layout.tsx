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
    itemsShortcuts?: ReactNode;
    layout?: BoxLayout;
    onBackButton?: () => void;
    onClose?: () => void;
    onPostButton?: () => void;
    onShowFirst?: () => void;
    onShowLast?: () => void;
    onShowNext?: () => void;
    onShowPrevious?: () => void;
    topPart?: MainView_65LayoutTopPartProps;
}

export const MainView_65Layout = ({ captionBackButtonLabel, captionListHeader, captionPageInfo, captionPostButtonLabel, captionStatus, itemsShortcuts, layout, onBackButton, onClose, onPostButton, onShowFirst, onShowLast, onShowNext, onShowPrevious, topPart }: MainView_65LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('groupforum.view.window_title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 552, height: 565, ...layout }}
        >
            <MainView_65LayoutTopPart {...topPart} />
            <Region
                name="shortcuts"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: -5, right: 7, top: 88, height: 25, flexDirection: 'row', gap: 5 }}
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
            <Region
                name="list_header"
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
                layout={{ position: 'absolute', left: 0, right: 12, top: 140, bottom: 105 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 3 }}
                >
                    <Region
                        name="scrollable_message_list"
                        layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
                    />
                </ScrollArea>
            </Border>
            <ContainerButton
                variant="3"
                name="back_button"
                tintColor="#dddddd"
                onPointerTap={onBackButton}
                layout={{ position: 'absolute', left: 10, width: 95, bottom: 62, height: 30, minWidth: 95, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionBackButtonLabel ?? t('groupforum.view.back')}
                    textStyle="text-style-u-bold"
                />
            </ContainerButton>
            <ContainerButton
                variant="3"
                name="post_button"
                tintColor="#0a9bc5"
                onPointerTap={onPostButton}
                layout={{ position: 'absolute', right: 190, width: 95, bottom: 62, height: 30, minWidth: 95, justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionPostButtonLabel ?? 'Post'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                />
            </ContainerButton>
            <Region layout={{ position: 'absolute', right: 15, width: 165, bottom: 62, height: 30 }}>
                <ContainerButton
                    variant="3"
                    name="show_first"
                    onPointerTap={onShowFirst}
                    layout={{ position: 'absolute', right: 140, width: 25, top: 0, height: 30, justifyContent: 'center' }}
                >
                    <ThemeText
                        text="<<"
                        textStyle="text-style-u-bold"
                    />
                </ContainerButton>
                <ContainerButton
                    variant="3"
                    name="show_previous"
                    onPointerTap={onShowPrevious}
                    layout={{ position: 'absolute', right: 110, width: 25, top: 0, height: 30, justifyContent: 'center' }}
                >
                    <ThemeText
                        text="<"
                        textStyle="text-style-u-bold"
                    />
                </ContainerButton>
                <Region
                    name="page_info"
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
                    onPointerTap={onShowNext}
                    layout={{ position: 'absolute', right: 30, width: 25, top: 0, height: 30, justifyContent: 'center' }}
                >
                    <ThemeText
                        text=">"
                        textStyle="text-style-u-bold"
                    />
                </ContainerButton>
                <ContainerButton
                    variant="3"
                    name="show_last"
                    onPointerTap={onShowLast}
                    layout={{ position: 'absolute', right: 0, width: 25, top: 0, height: 30, justifyContent: 'center' }}
                >
                    <ThemeText
                        text=">>"
                        textStyle="text-style-u-bold"
                    />
                </ContainerButton>
            </Region>
            <Region layout={{ position: 'absolute', right: 72, width: 300, bottom: 30, height: 20 }}>
                <Region
                    name="status"
                    layout={{ position: 'absolute', left: 3, right: -3, bottom: 1, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionStatus ?? 'Status text'}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
            </Region>
        </Frame>
    );
};

/** Named region `top_part` of MainView_65Layout - configured through the parent's `topPart` prop. */
export interface MainView_65LayoutTopPartProps {
    captionTopHeaderText?: string;
    captionTopText?: string;
    layout?: BoxLayout;
    onTopClickArea?: () => void;
    onTopPart?: () => void;
    srcHeaderIcon?: string;
}

export const MainView_65LayoutTopPart = ({ captionTopHeaderText, captionTopText, layout, onTopClickArea, onTopPart, srcHeaderIcon }: MainView_65LayoutTopPartProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_part"
            backgroundColor="#0e3f52"
            onPointerTap={onTopPart}
            cursor="pointer"
            layout={{ position: 'absolute', left: -5, right: 7, top: 8, height: 80, ...layout }}
        >
            <Region
                name="top_click_area"
                onPointerTap={onTopClickArea}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80 }}
            />
            <Region
                name="icon_background"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 80 }}
            >
                <WidgetSlot
                    widgetType="badge_image"
                    name="group_icon"
                    layout={{ position: 'absolute', left: 20, width: 40, top: 20, height: 40 }}
                />
                <ThemeImage
                    name="header_icon"
                    src={srcHeaderIcon}
                    layout={{ position: 'absolute', left: 18, width: 44, top: 18, height: 43 }}
                />
            </Region>
            <Region
                name="top_header_text"
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
                tintColor="#000000"
                layout={{ position: 'absolute', right: 1, width: 65, top: 60, height: 18, minHeight: 18 }}
            >
                <ThemeImage
                    src={layoutImage('pursearea_settings_icon.png')}
                    layout={{ position: 'absolute', left: 3, width: 15, top: 2, height: 15 }}
                />
                <Region layout={{ position: 'absolute', left: 17, width: 48, alignSelf: 'center', height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
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
            layout={{ width: 191, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionHeader ?? t('groupforum.view.shortcuts.header')}
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
            layout={{ width: 183, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPopular ?? t('groupforum.view.shortcuts.popular')}
                textOptions={{ fill: '#1b79ab' }}
            />
        </Region>
    );
};
