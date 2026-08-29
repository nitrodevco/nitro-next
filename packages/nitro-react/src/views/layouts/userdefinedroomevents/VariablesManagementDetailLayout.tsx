import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, Frame, Icon, Region, TextInput, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1169_variables_management_detail_xml` (layout "variables_management_detail", 339x512) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VariablesManagementDetailLayoutProps {
    captionInfoText?: string;
    infoBox?: VariablesManagementDetailLayoutInfoBoxProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onRefreshBtn?: () => void;
    variableValuesContainer?: VariablesManagementDetailLayoutVariableValuesContainerProps;
    visibleSearchingIcon?: boolean;
}

export const VariablesManagementDetailLayout = ({ captionInfoText, infoBox, layout, onClose, onRefreshBtn, variableValuesContainer, visibleSearchingIcon }: VariablesManagementDetailLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="variablemanagement_detail"
            name="variablemanagement_detail"
            caption={t('wiredmenu.variable_management_detail.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 339, height: 512, ...layout }}
        >
            <Region
                name="header"
                layout={{ position: 'absolute', left: 18, width: 303, top: 7, height: 57 }}
            >
                <Border
                    variant="4"
                    layout={{ position: 'absolute', left: 0, width: 228, top: 0, bottom: 0 }}
                >
                    <Region
                        name="info_text"
                        layout={{ position: 'absolute', left: 5, right: 5, top: 5, bottom: 6, minWidth: 218, maxWidth: 218, minHeight: 46, maxHeight: 46, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionInfoText ?? 'Do not use this tool for users who are currently in the room/using the changed variable in another room.'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 218, align: 'center' }}
                        />
                    </Region>
                </Border>
                <Button
                    variant="3"
                    name="refresh_btn"
                    onPointerTap={onRefreshBtn}
                    layout={{ position: 'absolute', right: 0, width: 62, top: 13, height: 30 }}
                >
                    {t('wiredmenu.list_view.refresh')}
                </Button>
                {(visibleSearchingIcon ?? false) && (
                    <Icon
                        variant="23"
                        name="searching_icon"
                        layout={{ position: 'absolute', left: 288, width: 15, top: 48, height: 15 }}
                    />
                )}
            </Region>
            <VariablesManagementDetailLayoutInfoBox {...infoBox} />
            <VariablesManagementDetailLayoutVariableValuesContainer {...variableValuesContainer} />
        </Frame>
    );
};

/** Named region `info_box` of VariablesManagementDetailLayout - configured through the parent's `infoBox` prop. */
export interface VariablesManagementDetailLayoutInfoBoxProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onAvatarPreviewRegion?: () => void;
    visibleAvatarPreview?: boolean;
    visibleAvatarPreviewRegion?: boolean;
    visiblePetPreview?: boolean;
}

export const VariablesManagementDetailLayoutInfoBox = ({ captionTitle, layout, onAvatarPreviewRegion, visibleAvatarPreview, visibleAvatarPreviewRegion, visiblePetPreview }: VariablesManagementDetailLayoutInfoBoxProps) => {
    const t = useTranslation();
    const [ infoBoxTextValue, setInfoBoxTextValue ] = useState('');

    return (
        <Region
            name="info_box"
            layout={{ position: 'absolute', left: 18, width: 303, top: 73, height: 114, ...layout }}
        >
            <Region
                name="title"
                layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTitle ?? t('wiredmenu.variable_management_detail.holder_info')}
            </Region>
            <Border
                variant="2"
                name="preview"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, width: 94, top: 20, height: 94, justifyContent: 'center' }}
            >
                {(visibleAvatarPreviewRegion ?? false) && (
                    <Region
                        name="avatar_preview_region"
                        onPointerTap={onAvatarPreviewRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 10, width: 74, top: 10, height: 74 }}
                    />
                )}
                {(visibleAvatarPreview ?? false) && (
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="avatar_preview"
                        options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                        layout={{ position: 'absolute', marginLeft: -2.5, marginRight: 2.5, width: 33, alignSelf: 'center', height: 34 }}
                    />
                )}
                {(visiblePetPreview ?? false) && (
                    <WidgetSlot
                        widgetType="pet_image"
                        name="pet_preview"
                        layout={{ position: 'absolute', left: 0, width: 94, top: 0, height: 94 }}
                    />
                )}
            </Border>
            <Border
                variant="10"
                layout={{ position: 'absolute', left: 109, width: 194, top: 20, height: 94 }}
            >
                <TextInput
                    value={infoBoxTextValue}
                    onChange={setInfoBoxTextValue}
                    multiline
                    layout={{ position: 'absolute', left: 6, width: 182, top: 6, bottom: 8 }}
                />
            </Border>
        </Region>
    );
};

/** Named region `variable_values_container` of VariablesManagementDetailLayout - configured through the parent's `variableValuesContainer` prop. */
export interface VariablesManagementDetailLayoutVariableValuesContainerProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onAddVarBtn?: () => void;
    onCreateVarBtn?: () => void;
    onDeleteVarBtn?: () => void;
    visibleCreateVarBubble?: boolean;
}

export const VariablesManagementDetailLayoutVariableValuesContainer = ({ captionTitle, layout, onAddVarBtn, onCreateVarBtn, onDeleteVarBtn, visibleCreateVarBubble }: VariablesManagementDetailLayoutVariableValuesContainerProps) => {
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
            />
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
                        />
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
