import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, Region, TextInput } from '#base/theme';

/** Named region `variable_values_container` of VariablesManagementDetailLayout - configured through the parent's `variableValuesContainer` prop. */
export interface VariablesManagementDetailLayoutVariableValuesContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onAddVarBtn?: () => void;
    onCreateVarBtn?: () => void;
    onDeleteVarBtn?: () => void;
    variableValuesTableContainer?: ReactNode;
    varPickerContainer?: ReactNode;
    visibleCreateVarBubble?: boolean;
}

export const VariablesManagementDetailLayoutVariableValuesContainer = ({ captionTitle, layout, onAddVarBtn, onCreateVarBtn, onDeleteVarBtn, variableValuesTableContainer, varPickerContainer, visibleCreateVarBubble }: VariablesManagementDetailLayoutVariableValuesContainerProps) => {
    const t = useTranslation();
    const [ valueInputValue, setValueInputValue ] = useState('');

    return (
        <Region
            name="variable_values_container"
            layout={{ position: 'absolute', left: 18, width: 303, top: 196, bottom: 51, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTitle ?? t('wiredmenu.variable_management_detail.variables')}
            </Region>
            <Region
                name="variable_values_table_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 34 }}
            >
                {variableValuesTableContainer}
            </Region>
            <Region layout={{ position: 'absolute', left: 0, right: 0, bottom: -5, height: 30, flexDirection: 'row', gap: 13 }}>
                <Button
                    variant="3"
                    name="delete_var_btn"
                    onPointerTap={onDeleteVarBtn}
                    layout={{ width: 145, height: 25, flexShrink: 0, minWidth: 145, maxWidth: 145 }}
                >
                    {t('wiredmenu.inspection.delete')}
                </Button>
                <Button
                    variant="3"
                    name="add_var_btn"
                    onPointerTap={onAddVarBtn}
                    layout={{ width: 145, height: 25, flexShrink: 0, minWidth: 145, maxWidth: 145 }}
                >
                    {t('wiredmenu.inspection.add')}
                </Button>
            </Region>
            {(visibleCreateVarBubble ?? false) && (
                <Bubble
                    variant="7"
                    name="create_var_bubble"
                    layout={{ position: 'absolute', left: 122, width: 186, top: 95, height: 145 }}
                >
                    <Region
                        name="variable_setting"
                        layout={{ position: 'absolute', left: 6, right: 22, top: 6, height: 42 }}
                    >
                        <Region layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            {t('wiredmenu.inspection.select_variable')}
                        </Region>
                        <Region
                            name="var_picker_container"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 22 }}
                        >
                            {varPickerContainer}
                        </Region>
                    </Region>
                    <Region
                        name="value_setting"
                        layout={{ position: 'absolute', left: 6, right: 22, top: 52, height: 42 }}
                    >
                        <Region layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            {t('wiredmenu.inspection.select_value')}
                        </Region>
                        <Border
                            variant="4"
                            name="value_input_border"
                            layout={{ position: 'absolute', left: 0, width: 80, top: 20, height: 22 }}
                        >
                            <TextInput
                                value={valueInputValue}
                                onChange={setValueInputValue}
                                layout={{ position: 'absolute', left: 5, right: 4, top: 3, bottom: 2 }}
                            />
                        </Border>
                    </Region>
                    <Button
                        variant="3"
                        name="create_var_btn"
                        onPointerTap={onCreateVarBtn}
                        layout={{ position: 'absolute', left: 6, right: 22, bottom: 20, height: 25, minWidth: 158, maxWidth: 158 }}
                    >
                        {t('wiredmenu.inspection.create')}
                    </Button>
                </Bubble>
            )}
        </Region>
    );
};
