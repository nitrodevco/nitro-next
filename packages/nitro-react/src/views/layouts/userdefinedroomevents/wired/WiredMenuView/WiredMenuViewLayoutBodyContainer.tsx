import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredMenuViewLayoutChestsContainer, WiredMenuViewLayoutChestsContainerProps } from './WiredMenuViewLayoutChestsContainer';
import { WiredMenuViewLayoutInspectionContainer, WiredMenuViewLayoutInspectionContainerProps } from './WiredMenuViewLayoutInspectionContainer';
import { WiredMenuViewLayoutMonitorContainer, WiredMenuViewLayoutMonitorContainerProps } from './WiredMenuViewLayoutMonitorContainer';
import { WiredMenuViewLayoutSettingsContainer, WiredMenuViewLayoutSettingsContainerProps } from './WiredMenuViewLayoutSettingsContainer';
import { WiredMenuViewLayoutVariableOverviewContainer, WiredMenuViewLayoutVariableOverviewContainerProps } from './WiredMenuViewLayoutVariableOverviewContainer';

/** Named region `body_container` of WiredMenuViewLayout - configured through the parent's `bodyContainer` prop. */
export interface WiredMenuViewLayoutBodyContainerProps {
    chestsContainer?: WiredMenuViewLayoutChestsContainerProps;
    infoContainer?: ReactNode;
    inspectionContainer?: WiredMenuViewLayoutInspectionContainerProps;
    layout?: BoxLayout;
    loadingView?: ReactNode;
    monitorContainer?: WiredMenuViewLayoutMonitorContainerProps;
    onLoadingView?: () => void;
    settingsContainer?: WiredMenuViewLayoutSettingsContainerProps;
    variableOverviewContainer?: WiredMenuViewLayoutVariableOverviewContainerProps;
    visibleChestsContainer?: boolean;
    visibleInfoContainer?: boolean;
    visibleInspectionContainer?: boolean;
    visibleLoadingView?: boolean;
    visibleSettingsContainer?: boolean;
    visibleVariableOverviewContainer?: boolean;
}

export const WiredMenuViewLayoutBodyContainer = ({ chestsContainer, infoContainer, inspectionContainer, layout, loadingView, monitorContainer, onLoadingView, settingsContainer, variableOverviewContainer, visibleChestsContainer, visibleInfoContainer, visibleInspectionContainer, visibleLoadingView, visibleSettingsContainer, visibleVariableOverviewContainer }: WiredMenuViewLayoutBodyContainerProps) => {
    return (
        <Region
            name="body_container"
            layout={{ position: 'absolute', left: 0, width: 500, top: 82, height: 382, ...layout }}
        >
            <WiredMenuViewLayoutMonitorContainer {...monitorContainer} />
            {(visibleVariableOverviewContainer ?? false) && (
                <WiredMenuViewLayoutVariableOverviewContainer {...variableOverviewContainer} />
            )}
            {(visibleInspectionContainer ?? false) && (
                <WiredMenuViewLayoutInspectionContainer {...inspectionContainer} />
            )}
            {(visibleChestsContainer ?? false) && (
                <WiredMenuViewLayoutChestsContainer {...chestsContainer} />
            )}
            {(visibleSettingsContainer ?? false) && (
                <WiredMenuViewLayoutSettingsContainer {...settingsContainer} />
            )}
            {(visibleInfoContainer ?? false) && (
                <Region
                    name="info_container"
                    layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382 }}
                >
                    {infoContainer}
                </Region>
            )}
            {(visibleLoadingView ?? false) && (
                <Region
                    name="loading_view"
                    backgroundColor="#e9e9e1"
                    onPointerTap={onLoadingView}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382 }}
                >
                    {loadingView}
                </Region>
            )}
        </Region>
    );
};
