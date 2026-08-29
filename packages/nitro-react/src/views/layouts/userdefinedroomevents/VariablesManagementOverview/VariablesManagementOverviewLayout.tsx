import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

import { VariablesManagementOverviewLayoutFooter, VariablesManagementOverviewLayoutFooterProps } from './VariablesManagementOverviewLayoutFooter';
import { VariablesManagementOverviewLayoutHeader, VariablesManagementOverviewLayoutHeaderProps } from './VariablesManagementOverviewLayoutHeader';

/** Generated from `1160_variables_management_overview_xml` (layout "transaction_overview", 700x508) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VariablesManagementOverviewLayoutProps {
    footer?: VariablesManagementOverviewLayoutFooterProps;
    header?: VariablesManagementOverviewLayoutHeaderProps;
    layout?: BoxLayout;
    onClose?: () => void;
    tableView?: ReactNode;
}

export const VariablesManagementOverviewLayout = ({ footer, header, layout, onClose, tableView }: VariablesManagementOverviewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('wiredmenu.variable_management.title')}
            tintColor="#418db0"
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 700, height: 508, minWidth: 700, maxWidth: 700, minHeight: 380, maxHeight: 700, ...layout }}
        >
            <VariablesManagementOverviewLayoutHeader {...header} />
            <Region
                name="middle"
                layout={{ position: 'absolute', left: 1, right: -11, top: 117, bottom: 54 }}
            >
                <Region
                    name="table_view"
                    layout={{ position: 'absolute', left: 13, right: 13, top: 0, bottom: 0 }}
                >
                    {tableView}
                </Region>
            </Region>
            <VariablesManagementOverviewLayoutFooter {...footer} />
        </Frame>
    );
};
