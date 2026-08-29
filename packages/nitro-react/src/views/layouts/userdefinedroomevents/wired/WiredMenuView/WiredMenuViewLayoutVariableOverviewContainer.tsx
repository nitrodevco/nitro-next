import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

import { WiredMenuViewLayoutHighlightHoldersButtonItem } from './WiredMenuViewLayoutHighlightHoldersButtonItem';
import { WiredMenuViewLayoutManageButtonItem } from './WiredMenuViewLayoutManageButtonItem';
import { WiredMenuViewLayoutTypePickerContainer, WiredMenuViewLayoutTypePickerContainerProps } from './WiredMenuViewLayoutTypePickerContainer';

/** Named region `variable_overview_container` of WiredMenuViewLayout - configured through the parent's `variableOverviewContainer` prop. */
export interface WiredMenuViewLayoutVariableOverviewContainerProps {
    captionTitle?: string;
    captionVariablePropertiesContainerTitle?: string;
    captionVariableTextsContainerTitle?: string;
    itemsButtonRow?: ReactNode;
    layout?: BoxLayout;
    typePickerContainer?: WiredMenuViewLayoutTypePickerContainerProps;
    variableListContainer?: ReactNode;
    variablePropertiesTableContainer?: ReactNode;
    variableTextsTableContainer?: ReactNode;
    visibleVariableOverviewContainer?: boolean;
}

export const WiredMenuViewLayoutVariableOverviewContainer = ({ captionTitle, captionVariablePropertiesContainerTitle, captionVariableTextsContainerTitle, itemsButtonRow, layout, typePickerContainer, variableListContainer, variablePropertiesTableContainer, variableTextsTableContainer, visibleVariableOverviewContainer }: WiredMenuViewLayoutVariableOverviewContainerProps) => {
    const t = useTranslation();

    return (
        (visibleVariableOverviewContainer ?? false) && (
            <Region
                name="variable_overview_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
            >
                <WiredMenuViewLayoutTypePickerContainer {...typePickerContainer} />
                <Region
                    name="variable_picker_container"
                    layout={{ position: 'absolute', left: 14, right: 298, top: 94, height: 239 }}
                >
                    <Region
                        name="title"
                        layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionTitle ?? t('wiredmenu.variable_overview.picker')}
                    </Region>
                    <Region
                        name="variable_list_container"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0 }}
                    >
                        {variableListContainer}
                    </Region>
                </Region>
                <Region
                    name="button_row"
                    layout={{ position: 'absolute', left: 14, width: 188, top: 342, height: 25, minWidth: 188, maxWidth: 188, flexDirection: 'row', gap: 10 }}
                >
                    {itemsButtonRow ?? (
                        <>
                            <WiredMenuViewLayoutHighlightHoldersButtonItem />
                            <WiredMenuViewLayoutManageButtonItem />
                        </>
                    )}
                </Region>
                <Region
                    name="variable_properties_container"
                    layout={{ position: 'absolute', left: 230, width: 256, top: 17, height: 208 }}
                >
                    <Region
                        name="title"
                        layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionVariablePropertiesContainerTitle ?? t('wiredmenu.variable_overview.properties')}
                    </Region>
                    <Region
                        name="variable_properties_table_container"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0 }}
                    >
                        {variablePropertiesTableContainer}
                    </Region>
                </Region>
                <Region
                    name="variable_texts_container"
                    layout={{ position: 'absolute', left: 230, width: 256, top: 233, height: 135 }}
                >
                    <Region
                        name="title"
                        layout={{ position: 'absolute', left: 0, width: 188, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {captionVariableTextsContainerTitle ?? t('wiredmenu.variable_overview.text_values')}
                    </Region>
                    <Region
                        name="variable_texts_table_container"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 20, bottom: 0 }}
                    >
                        {variableTextsTableContainer}
                    </Region>
                </Region>
            </Region>
        )
    );
};
