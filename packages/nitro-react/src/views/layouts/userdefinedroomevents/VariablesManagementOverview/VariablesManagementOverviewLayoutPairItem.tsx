import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { VariablesManagementOverviewLayoutVariableNameKeyItem } from './VariablesManagementOverviewLayoutVariableNameKeyItem';
import { VariablesManagementOverviewLayoutVariableNameValueItem } from './VariablesManagementOverviewLayoutVariableNameValueItem';

/** Row template `pair` of VariablesManagementOverviewLayout - pass real rows through its `items…` slot. */
export interface VariablesManagementOverviewLayoutPairItemProps {
    itemsPair?: ReactNode;
    layout?: BoxLayout;
}

export const VariablesManagementOverviewLayoutPairItem = ({ itemsPair, layout }: VariablesManagementOverviewLayoutPairItemProps) => {
    return (
        <Region
            name="pair"
            layout={{ width: 125, height: 20, flexShrink: 0, flexDirection: 'row', gap: 2, ...layout }}
        >
            {itemsPair ?? (
                <>
                    <VariablesManagementOverviewLayoutVariableNameKeyItem />
                    <VariablesManagementOverviewLayoutVariableNameValueItem />
                </>
            )}
        </Region>
    );
};
