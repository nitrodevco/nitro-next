/**
 * Mounts the help windows while they are up:
 * - `HelpView`, `TopicsFlowHelpController.toggleWindow`, which the purse's help button reaches
 *   through `HabboToolbar.toggleWindowVisibility("HELP")` and `GuideHelpManager.onHabboToolbarEvent`
 *   (`HTIE_ICON_HELP` -> `toggleNewHelpWindow`), or a report (`reportUser`, `reportRoom`,
 *   `reportUserFromIM`) on its own step;
 * - `SanctionInfoView` and `MyReportsView`, opened by the answers to its sanction and reports
 *   status links (`registerHelpHandlers`).
 */
import { useIsWindowVisible, useWindowActions, useWindowParams } from '#base/context/system';
import { HelpView } from '#base/views/help/HelpView';
import { MyReportsView } from '#base/views/help/MyReportsView';
import { SanctionInfoView } from '#base/views/help/SanctionInfoView';

export const HelpComponent = () => {
    const helpVisible = useIsWindowVisible('help');
    const help = useWindowParams('help');
    const sanctionInfoVisible = useIsWindowVisible('help_sanction_info');
    const myReportsVisible = useIsWindowVisible('help_my_reports');
    const sanctionInfo = useWindowParams('help_sanction_info');
    const myReports = useWindowParams('help_my_reports');
    const { hideWindow } = useWindowActions();

    return (
        <>
            {helpVisible && (
                <HelpView
                    key={help.openedAt}
                    entry={help.entry}
                    onClose={() => hideWindow('help')}
                />
            )}
            {sanctionInfoVisible && (
                <SanctionInfoView
                    key={sanctionInfo.openedAt}
                    sanctions={sanctionInfo.sanctions ?? []}
                    onClose={() => hideWindow('help_sanction_info')}
                />
            )}
            {myReportsVisible && (
                <MyReportsView
                    key={myReports.openedAt}
                    reports={myReports.reports ?? []}
                    onClose={() => hideWindow('help_my_reports')}
                />
            )}
        </>
    );
};
