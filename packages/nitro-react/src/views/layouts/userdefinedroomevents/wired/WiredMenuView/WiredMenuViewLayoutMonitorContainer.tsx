import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { WiredMenuViewLayoutStatisticsContainer, WiredMenuViewLayoutStatisticsContainerProps } from './WiredMenuViewLayoutStatisticsContainer';

/** Named region `monitor_container` of WiredMenuViewLayout - configured through the parent's `monitorContainer` prop. */
export interface WiredMenuViewLayoutMonitorContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    logTableContainer?: ReactNode;
    onClearLogBtn?: () => void;
    onLogOverviewBtn?: () => void;
    srcMonitorImage1?: string;
    srcMonitorImage2?: string;
    statisticsContainer?: WiredMenuViewLayoutStatisticsContainerProps;
    visibleMonitorImage1?: boolean;
}

export const WiredMenuViewLayoutMonitorContainer = ({ captionTitle, layout, logTableContainer, onClearLogBtn, onLogOverviewBtn, srcMonitorImage1, srcMonitorImage2, statisticsContainer, visibleMonitorImage1 }: WiredMenuViewLayoutMonitorContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="monitor_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <WiredMenuViewLayoutStatisticsContainer {...statisticsContainer} />
            <Region
                name="image_container"
                layout={{ position: 'absolute', left: 230, width: 256, top: 4, height: 145 }}
            >
                {(visibleMonitorImage1 ?? false) && (
                    <ThemeImage
                        name="monitor_image_1"
                        src={srcMonitorImage1 ?? layoutImage('wired_monitor_element1.png')}
                        layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 145 }}
                    />
                )}
                <ThemeImage
                    name="monitor_image_2"
                    src={srcMonitorImage2 ?? layoutImage('wired_monitor_element2.png')}
                    layout={{ position: 'absolute', left: 0, width: 256, top: 0, height: 145 }}
                />
            </Region>
            <Region
                name="log_container"
                layout={{ position: 'absolute', left: 14, width: 472, top: 152, height: 218 }}
            >
                <Region
                    name="title"
                    layout={{ position: 'absolute', left: 0, width: 106, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionTitle ?? t('wiredmenu.monitor.log')}
                </Region>
                <Region
                    name="log_table_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 156 }}
                >
                    {logTableContainer}
                </Region>
                <Button
                    variant="5"
                    name="clear_log_btn"
                    tintColor="#e33934"
                    onPointerTap={onClearLogBtn}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', left: 0, width: 110, top: 185, height: 30, minWidth: 110, maxWidth: 110 }}
                >
                    {t('wiredmenu.monitor.clear_all')}
                </Button>
                <Button
                    variant="3"
                    name="log_overview_btn"
                    onPointerTap={onLogOverviewBtn}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', right: 1, width: 110, top: 185, height: 30, minWidth: 110, maxWidth: 110 }}
                >
                    {t('wiredmenu.monitor.log_overview')}
                </Button>
            </Region>
        </Region>
    );
};
