import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

import { LogsOverviewLayoutFooter, LogsOverviewLayoutFooterProps } from './LogsOverviewLayoutFooter';
import { LogsOverviewLayoutHeader, LogsOverviewLayoutHeaderProps } from './LogsOverviewLayoutHeader';

/** Generated from `1179_logs_overview_xml` (layout "logs_overview", 700x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LogsOverviewLayoutProps {
    footer?: LogsOverviewLayoutFooterProps;
    header?: LogsOverviewLayoutHeaderProps;
    layout?: BoxLayout;
    onClose?: () => void;
    tableView?: ReactNode;
}

export const LogsOverviewLayout = ({ footer, header, layout, onClose, tableView }: LogsOverviewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('wiredmenu.logs_overview.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 700, height: 508, ...layout }}
        >
            <LogsOverviewLayoutHeader {...header} />
            <Region
                name="middle"
                layout={{ position: 'absolute', left: 1, right: 1, top: 97, bottom: 95 }}
            >
                <Region
                    name="table_view"
                    layout={{ position: 'absolute', left: 13, right: 13, top: 0, bottom: 0 }}
                >
                    {tableView}
                </Region>
            </Region>
            <LogsOverviewLayoutFooter {...footer} />
        </Frame>
    );
};
