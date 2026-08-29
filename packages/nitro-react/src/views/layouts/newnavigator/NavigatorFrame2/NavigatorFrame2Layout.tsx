import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ScrollArea, TabButton, TabContext, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { NavigatorFrame2LayoutLeftPaneHide, NavigatorFrame2LayoutLeftPaneHideProps } from './NavigatorFrame2LayoutLeftPaneHide';
import { NavigatorFrame2LayoutQuickLinkItem } from './NavigatorFrame2LayoutQuickLinkItem';
import { NavigatorFrame2LayoutRightPane, NavigatorFrame2LayoutRightPaneProps } from './NavigatorFrame2LayoutRightPane';

/** Generated from `138_navigator_frame_2_xml` (layout "navigator_frame_2", 578x628) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NavigatorFrame2LayoutProps {
    itemsQuicklinksList?: ReactNode;
    layout?: BoxLayout;
    leftPaneHide?: NavigatorFrame2LayoutLeftPaneHideProps;
    onClose?: () => void;
    onTempBack?: () => void;
    onTopViewSelectTabButton?: () => void;
    rightPane?: NavigatorFrame2LayoutRightPaneProps;
    selectedTopViewSelectTabContext?: string;
    whiteBackground?: ReactNode;
}

export const NavigatorFrame2Layout = ({ itemsQuicklinksList, layout, leftPaneHide, onClose, onTempBack, onTopViewSelectTabButton, rightPane, selectedTopViewSelectTabContext, whiteBackground }: NavigatorFrame2LayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('navigator.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 578, height: 628, ...layout }}
        >
            <Border
                variant="3"
                tintColor="#eceae0"
                layout={{ position: 'absolute', left: -3, right: 4, top: -3, bottom: 53 }}
            />
            <Region
                name="white_background"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: -2, right: 4, top: -5, height: 33 }}
            >
                {whiteBackground}
            </Region>
            <Border
                variant="2"
                name="left_pane"
                layout={{ position: 'absolute', left: 6, width: 141, top: 35, bottom: 55 }}
            >
                <NavigatorFrame2LayoutLeftPaneHide {...leftPaneHide} />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 5, width: 136, top: 25, bottom: 4 }}
                >
                    <Region
                        name="quicklinks_list"
                        layout={{ flexDirection: 'column', gap: 2, width: '100%' }}
                    >
                        {itemsQuicklinksList ?? (
                            <NavigatorFrame2LayoutQuickLinkItem />
                        )}
                    </Region>
                </ScrollArea>
            </Border>
            <NavigatorFrame2LayoutRightPane {...rightPane} />
            <Region
                name="temp_back"
                tooltip={t('navigator.tooltip.left.show.hide')}
                onPointerTap={onTempBack}
                cursor="pointer"
                layout={{ position: 'absolute', left: 4, width: 28, top: 2, height: 25 }}
            >
                <ThemeImage
                    src={layoutImage('newnavigator_button_quicklink_add.png')}
                    layout={{ position: 'absolute', left: 10, width: 18, top: 2, height: 19 }}
                />
            </Region>
            <ThemeImage
                src={layoutImage('talent_task_progress_bg.png')}
                layout={{ position: 'absolute', left: -2, right: -5, top: 28, height: 1 }}
            />
            <TabContext
                variant="3"
                name="top_view_select_tab_context"
                layout={{ position: 'absolute', left: 115, width: 450, top: -1, height: 30 }}
            >
                <TabButton
                    variant="3"
                    name="top_view_select_tab_button"
                    tooltip={t('navigator.tooltip.select.tab')}
                    selected={selectedTopViewSelectTabContext === 'top_view_select_tab_button'}
                    onPointerTap={onTopViewSelectTabButton}
                    layout={{ position: 'absolute', left: 0, width: 88, top: 0, height: 32 }}
                >
                    top view ph
                </TabButton>
            </TabContext>
        </Frame>
    );
};
