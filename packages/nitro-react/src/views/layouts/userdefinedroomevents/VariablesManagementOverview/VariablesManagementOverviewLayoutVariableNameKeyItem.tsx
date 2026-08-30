import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `variable_name_key` of VariablesManagementOverviewLayout - pass real rows through its `items…` slot. */
export interface VariablesManagementOverviewLayoutVariableNameKeyItemProps {
    captionVariableNameKey?: string;
    layout?: BoxLayout;
}

export const VariablesManagementOverviewLayoutVariableNameKeyItem = ({ captionVariableNameKey, layout }: VariablesManagementOverviewLayoutVariableNameKeyItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionVariableNameKey ?? t('wiredmenu.variable_management.variable_name')}
            name="variable_name_key"
            layout={{ width: 88, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
