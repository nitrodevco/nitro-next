import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

import { MainView_65LayoutActiveItem } from './MainView_65LayoutActiveItem';
import { MainView_65LayoutHeaderItem } from './MainView_65LayoutHeaderItem';
import { MainView_65LayoutMyItem } from './MainView_65LayoutMyItem';
import { MainView_65LayoutPopularItem } from './MainView_65LayoutPopularItem';
import { MainView_65LayoutTopPart, MainView_65LayoutTopPartProps } from './MainView_65LayoutTopPart';

/** Generated from `65_main_view_xml` (layout "wall_message_main", 552x565) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MainView_65LayoutProps {
    captionBackButtonLabel?: string;
    captionListHeader?: string;
    captionPageInfo?: string;
    captionPostButtonLabel?: string;
    captionStatus?: string;
    itemsScrollableMessageList?: ReactNode;
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

export const MainView_65Layout = ({ captionBackButtonLabel, captionListHeader, captionPageInfo, captionPostButtonLabel, captionStatus, itemsScrollableMessageList, itemsShortcuts, layout, onBackButton, onClose, onPostButton, onShowFirst, onShowLast, onShowNext, onShowPrevious, topPart }: MainView_65LayoutProps) => {
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
                    >
                        {itemsScrollableMessageList}
                    </Region>
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
