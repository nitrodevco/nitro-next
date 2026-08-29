import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Icon, Region, ThemeText } from '#base/theme';

import { VariablesManagementDetailLayoutInfoBox, VariablesManagementDetailLayoutInfoBoxProps } from './VariablesManagementDetailLayoutInfoBox';
import { VariablesManagementDetailLayoutVariableValuesContainer, VariablesManagementDetailLayoutVariableValuesContainerProps } from './VariablesManagementDetailLayoutVariableValuesContainer';

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
