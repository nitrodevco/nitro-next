import { BoxLayout, Region } from '#base/theme';

/** Row template `variable_name_value` of VariablesManagementOverviewLayout - pass real rows through its `items…` slot. */
export interface VariablesManagementOverviewLayoutVariableNameValueItemProps {
    captionVariableNameValue?: string;
    layout?: BoxLayout;
}

export const VariablesManagementOverviewLayoutVariableNameValueItem = ({ captionVariableNameValue, layout }: VariablesManagementOverviewLayoutVariableNameValueItemProps) => {
    return (
        <Region
            name="variable_name_value"
            layout={{ width: 35, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionVariableNameValue ?? 'name'}
        </Region>
    );
};
