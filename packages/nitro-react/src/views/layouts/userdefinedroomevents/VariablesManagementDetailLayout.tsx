import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Bubble, Button, Frame, Icon, Region, TextInput, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1169_variables_management_detail_xml` (layout "variables_management_detail", 339x512) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VariablesManagementDetailLayoutProps {
    captionInfoText?: string;
    captionTitle?: string;
    captionTitle2?: string;
    layout?: BoxLayout;
    onAddVarBtn?: () => void;
    onAvatarPreviewRegion?: () => void;
    onClose?: () => void;
    onCreateVarBtn?: () => void;
    onDeleteVarBtn?: () => void;
    onRefreshBtn?: () => void;
    visibleAvatarPreviewRegion?: boolean;
    visibleCreateVarBubble?: boolean;
    visibleSearchingIcon?: boolean;
}

export const VariablesManagementDetailLayout = ({ captionInfoText, captionTitle, captionTitle2, layout, onAddVarBtn, onAvatarPreviewRegion, onClose, onCreateVarBtn, onDeleteVarBtn, onRefreshBtn, visibleAvatarPreviewRegion, visibleCreateVarBubble, visibleSearchingIcon }: VariablesManagementDetailLayoutProps) => {
    const t = useTranslation();
    const [ infoBoxTextValue, setInfoBoxTextValue ] = useState('');
    const [ valueInputValue, setValueInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            id="variablemanagement_detail"
            name="variablemanagement_detail"
            params={98305}
            caption={t('wiredmenu.variable_management_detail.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 339, height: 512, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="header"
                    params={16}
                    layout={{ position: 'absolute', left: 18, width: 303, top: 7, height: 57 }}
                >
                    <Border
                        variant="4"
                        params={2064}
                        layout={{ position: 'absolute', left: 0, width: 228, top: 0, bottom: 0 }}
                    >
                        <Region
                            name="info_text"
                            params={2185}
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
                        params={393297}
                        onPointerTap={onRefreshBtn}
                        layout={{ position: 'absolute', right: 0, width: 62, top: 13, height: 30 }}
                    >
                        {t('wiredmenu.list_view.refresh')}
                    </Button>
                    <Region
                        visible={visibleSearchingIcon ?? false}
                        layout={{ position: 'absolute', left: 288, width: 15, top: 48, height: 15 }}
                    >
                        <Icon
                            variant="23"
                            name="searching_icon"
                            layout={{ width: '100%', height: '100%' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="info_box"
                    params={16}
                    layout={{ position: 'absolute', left: 18, width: 303, top: 73, height: 114 }}
                >
                    <Region
                        name="title"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionTitle ?? t('wiredmenu.variable_management_detail.holder_info')} />
                    </Region>
                    <Border
                        variant="2"
                        name="preview"
                        params={16}
                        tintColor="#dadada"
                        layout={{ position: 'absolute', left: 0, width: 94, top: 20, height: 94 }}
                    >
                        <Region
                            name="avatar_preview_region"
                            params={17}
                            visible={visibleAvatarPreviewRegion ?? false}
                            onPointerTap={onAvatarPreviewRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 10, width: 74, top: 10, height: 74 }}
                        />
                        <WidgetSlot
                            widgetType="avatar_image"
                            name="avatar_preview"
                            params={3932176}
                            visible={false}
                            options={{ 'avatar_image:only_head': 'true', 'avatar_image:cropped': 'true' }}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -19, width: 33, top: '50%', marginTop: -17, height: 34 }}
                        />
                        <WidgetSlot
                            widgetType="pet_image"
                            name="pet_preview"
                            params={273}
                            visible={false}
                            layout={{ position: 'absolute', left: 0, width: 94, top: 0, height: 94 }}
                        />
                    </Border>
                    <Border
                        variant="10"
                        params={16}
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
                <Region
                    name="variable_values_container"
                    params={2064}
                    layout={{ position: 'absolute', left: 18, width: 303, top: 196, bottom: 51 }}
                >
                    <Region
                        name="title"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionTitle2 ?? t('wiredmenu.variable_management_detail.variables')} />
                    </Region>
                    <Region
                        name="variable_values_table_container"
                        params={2192}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 34 }}
                    />
                    <Region
                        params={1168}
                        layout={{ position: 'absolute', left: 0, right: 0, bottom: -5, height: 30, flexDirection: 'row', gap: 13 }}
                    >
                        <Button
                            variant="3"
                            name="delete_var_btn"
                            params={131089}
                            onPointerTap={onDeleteVarBtn}
                            layout={{ width: 145, height: 25, flexShrink: 0, minWidth: 145, maxWidth: 145 }}
                        >
                            {t('wiredmenu.inspection.delete')}
                        </Button>
                        <Button
                            variant="3"
                            name="add_var_btn"
                            params={131089}
                            onPointerTap={onAddVarBtn}
                            layout={{ width: 145, height: 25, flexShrink: 0, minWidth: 145, maxWidth: 145 }}
                        >
                            {t('wiredmenu.inspection.add')}
                        </Button>
                    </Region>
                    <Region
                        visible={visibleCreateVarBubble ?? false}
                        layout={{ position: 'absolute', left: 122, width: 186, top: 95, height: 145 }}
                    >
                        <Bubble
                            variant="7"
                            name="create_var_bubble"
                            params={1}
                            layout={{ width: '100%', height: '100%' }}
                        >
                            <Region
                                name="variable_setting"
                                params={144}
                                layout={{ position: 'absolute', left: 6, right: 22, top: 6, height: 42 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 55, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('wiredmenu.inspection.select_variable')} />
                                </Region>
                                <Region
                                    name="var_picker_container"
                                    params={144}
                                    layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 22 }}
                                />
                            </Region>
                            <Region
                                name="value_setting"
                                params={144}
                                layout={{ position: 'absolute', left: 6, right: 22, top: 52, height: 42 }}
                            >
                                <Region
                                    params={16}
                                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={t('wiredmenu.inspection.select_value')} />
                                </Region>
                                <Border
                                    variant="4"
                                    name="value_input_border"
                                    params={16}
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
                                params={132241}
                                onPointerTap={onCreateVarBtn}
                                layout={{ position: 'absolute', left: 6, right: 22, bottom: 20, height: 25, minWidth: 158, maxWidth: 158 }}
                            >
                                {t('wiredmenu.inspection.create')}
                            </Button>
                        </Bubble>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
