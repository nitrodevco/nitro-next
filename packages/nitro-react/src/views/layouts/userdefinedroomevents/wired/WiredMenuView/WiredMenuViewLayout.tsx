import { useTranslation } from '#base/context';
import { BoxLayout, Frame, TabButton, TabContext } from '#base/theme';

import { WiredMenuViewLayoutBodyContainer, WiredMenuViewLayoutBodyContainerProps } from './WiredMenuViewLayoutBodyContainer';
import { WiredMenuViewLayoutHeaderContainer, WiredMenuViewLayoutHeaderContainerProps } from './WiredMenuViewLayoutHeaderContainer';

/** Generated from `1138_wired_menu_view_xml` (layout "wired_menu_view", 500x500) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface WiredMenuViewLayoutProps {
    bodyContainer?: WiredMenuViewLayoutBodyContainerProps;
    headerContainer?: WiredMenuViewLayoutHeaderContainerProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onTopViewChestsButton?: () => void;
    onTopViewInfoButton?: () => void;
    onTopViewInspectionButton?: () => void;
    onTopViewMonitorButton?: () => void;
    onTopViewSettingsButton?: () => void;
    onTopViewVariableOverviewButton?: () => void;
    selectedTabContext?: string;
}

export const WiredMenuViewLayout = ({ bodyContainer, headerContainer, layout, onClose, onTopViewChestsButton, onTopViewInfoButton, onTopViewInspectionButton, onTopViewMonitorButton, onTopViewSettingsButton, onTopViewVariableOverviewButton, selectedTabContext }: WiredMenuViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="wiredmenu_frame"
            name="wiredmenu_frame"
            caption={t('wiredmenu.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 500, height: 500, minWidth: 500, minHeight: 500, ...layout }}
        >
            <TabContext
                variant="3"
                name="tab_context"
                layout={{ position: 'absolute', left: 0, width: 500, top: 2, height: 30 }}
            >
                <TabButton
                    variant="3"
                    name="top_view_monitor_button"
                    selected={selectedTabContext === 'top_view_monitor_button'}
                    onPointerTap={onTopViewMonitorButton}
                    layout={{ position: 'absolute', left: 0, width: 70, top: 0, height: 32 }}
                >
                    {t('wiredmenu.monitor.tab')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="top_view_variable_overview_button"
                    selected={selectedTabContext === 'top_view_variable_overview_button'}
                    onPointerTap={onTopViewVariableOverviewButton}
                    layout={{ position: 'absolute', left: 70, width: 74, top: 0, height: 32 }}
                >
                    {t('wiredmenu.variable_overview.tab')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="top_view_inspection_button"
                    selected={selectedTabContext === 'top_view_inspection_button'}
                    onPointerTap={onTopViewInspectionButton}
                    layout={{ position: 'absolute', left: 144, width: 82, top: 0, height: 32 }}
                >
                    {t('wiredmenu.inspection.tab')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="top_view_chests_button"
                    selected={selectedTabContext === 'top_view_chests_button'}
                    onPointerTap={onTopViewChestsButton}
                    layout={{ position: 'absolute', left: 226, width: 109, top: 0, height: 32 }}
                >
                    {t('wiredmenu.chests.tab')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="top_view_settings_button"
                    selected={selectedTabContext === 'top_view_settings_button'}
                    onPointerTap={onTopViewSettingsButton}
                    layout={{ position: 'absolute', left: 335, width: 70, top: 0, height: 32 }}
                >
                    {t('wiredmenu.settings.tab')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="top_view_info_button"
                    selected={selectedTabContext === 'top_view_info_button'}
                    onPointerTap={onTopViewInfoButton}
                    layout={{ position: 'absolute', left: 405, width: 46, top: 0, height: 32 }}
                >
                    {t('wiredmenu.info.tab')}
                </TabButton>
            </TabContext>
            <WiredMenuViewLayoutHeaderContainer {...headerContainer} />
            <WiredMenuViewLayoutBodyContainer {...bodyContainer} />
        </Frame>
    );
};
