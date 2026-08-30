import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `variable_name_value` of VariablesManagementOverviewLayout - pass real rows through its `items…` slot. */
export interface VariablesManagementOverviewLayoutVariableNameValueItemProps {
    captionVariableNameValue?: string;
    layout?: BoxLayout;
}

export const VariablesManagementOverviewLayoutVariableNameValueItem = ({ captionVariableNameValue, layout }: VariablesManagementOverviewLayoutVariableNameValueItemProps) => {
    return (
        <ThemeText
            text={captionVariableNameValue ?? 'name'}
            name="variable_name_value"
            layout={{ width: 35, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
