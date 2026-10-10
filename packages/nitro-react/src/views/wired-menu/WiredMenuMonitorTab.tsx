/**
 * The wired menu's monitor tab - `WiredMenuMonitorTab` on `monitor_container` of
 * `wired_menu_view_xml`: the room's wired statistics (each line coloured green, orange or red by how
 * close it is to its limit), Frank, who panics when anything is not green or there are errors, the
 * error log table (`ErrorDataTableObject`) in `log_table_container`, and the buttons to clear the
 * log and to open the room's wired log.
 *
 * `updateRoomStatsUI`: each `statistics_*_html` caption is Flash `htmlText` built from
 * localizations with `%color%`, `%amount%` and `%limit%` (`getLocalizationWithParams(key, "", ...)` -
 * an unknown key shows nothing). Until the data is in, the layout's own captions stand under the
 * menu's loading view.
 */
import type { IWiredErrorLogsError, IWiredRoomStatsData } from '@nitrodevco/nitro-packets';
import { FederatedPointerEvent } from 'pixi.js';

import { clearWiredErrorLogs, openWiredRoomLogs, progressWiredMonitorTreasureHunt, showWiredErrorInfo } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useWiredHasReadPermission, useWiredHasWritePermission, useWiredStore } from '#base/context/wired';
import { useSecondsClock } from '#base/hooks';
import { TemplateBindings, TemplateWindow } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';
import { TableCell, TableColumn, TableView } from '#base/views/shared/table/TableView';

const COLOR_RED = 'ff5733';
const COLOR_ORANGE = 'BD7800';
const COLOR_GREEN = '008000';

/** `THRESHOLD_*` - the share of a limit at which a statistic turns orange, then red. */
const THRESHOLD_USAGE = [ 0.3, 0.7 ];
const THRESHOLD_FURNI = [ 0.6, 0.85 ];
const THRESHOLD_VARS = [ 0.5, 0.8 ];

/** `colorize`: its amount and limit are `int`s, so a fractional execution cost is truncated first. */
const colorize = (amount: number, limit: number, [ first, second ]: number[]): string => {
    const share = Math.trunc(amount) / Math.trunc(limit);

    if (share < first) return COLOR_GREEN;
    if (share < second) return COLOR_ORANGE;

    return COLOR_RED;
};

/** `isFrankPanicking`. */
const isFrankPanicking = (stats: IWiredRoomStatsData, errors: IWiredErrorLogsError[]): boolean => {
    if (stats.isHeavy) return true;

    if ((colorize(stats.executionCost, stats.executionCostCap, THRESHOLD_USAGE) !== COLOR_GREEN)
        || (colorize(stats.floorItemCount, stats.floorItemCap, THRESHOLD_FURNI) !== COLOR_GREEN)
        || (colorize(stats.wallItemCount, stats.wallItemCap, THRESHOLD_FURNI) !== COLOR_GREEN)) return true;

    return errors.some(error => error.throwCount > 0);
};

const addLeadingZero = (value: number) => ((value < 10) ? `0${value}` : String(value));

/** `ErrorDataTableObject.convertTimestamp`. */
const convertTimestamp = (time: number): string => {
    const date = new Date(time);

    return `${date.getFullYear()}-${addLeadingZero(date.getMonth() + 1)}-${addLeadingZero(date.getDate())} ${addLeadingZero(date.getHours())}:${addLeadingZero(date.getMinutes())}:${addLeadingZero(date.getSeconds())}`;
};

export const WiredMenuMonitorTab = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const stats = useWiredStore(x => x.monitorStats);
    const errors = useWiredStore(x => x.monitorErrors);
    const clearing = useWiredStore(x => x.monitorClearing);
    const hasReadPermission = useWiredHasReadPermission();
    const hasWritePermission = useWiredHasWritePermission();
    // Wall-clock time for the "latest" tooltips, read through the shared clock rather than during render.
    const now = performance.timeOrigin + useSecondsClock();

    const loc = (key: string) => t(key, '');
    const statText = (key: string, color: string, amount: number, limit: number) => t(key, '', { color, amount: String(amount), limit: String(limit) });

    // `updateRoomStatsUI`.
    const statBindings = (): TemplateBindings => {
        if (!stats) return {};

        const bool = stats.isHeavy ? 'wiredmenu.bool.yes' : 'wiredmenu.bool.no';

        return {
            statistics_usage_html: { htmlText: statText('wiredmenu.monitor.statistics.usage', colorize(stats.executionCost, stats.executionCostCap, THRESHOLD_USAGE), Math.round(stats.executionCost), Math.round(stats.executionCostCap)) },
            statistics_heavy_html: { htmlText: t('wiredmenu.monitor.statistics.is_heavy', '', { color: stats.isHeavy ? COLOR_ORANGE : COLOR_GREEN, bool: t(bool, bool) }) },
            statistics_floorfurni_html: { htmlText: statText('wiredmenu.monitor.statistics.floorfurni', colorize(stats.floorItemCount, stats.floorItemCap, THRESHOLD_FURNI), stats.floorItemCount, stats.floorItemCap) },
            statistics_wallfurni_html: { htmlText: statText('wiredmenu.monitor.statistics.wallfurni', colorize(stats.wallItemCount, stats.wallItemCap, THRESHOLD_FURNI), stats.wallItemCount, stats.wallItemCap) },
            statistics_perm_vars_furni_html: { htmlText: statText('wiredmenu.monitor.statistics.perm_furni_vars', colorize(stats.permanentFurniVariables, stats.maxPermanentFurniVariables, THRESHOLD_VARS), stats.permanentFurniVariables, stats.maxPermanentFurniVariables) },
            statistics_perm_vars_user_html: { htmlText: statText('wiredmenu.monitor.statistics.perm_user_vars', colorize(stats.permanentUserVariables, stats.maxPermanentUserVariables, THRESHOLD_VARS), stats.permanentUserVariables, stats.maxPermanentUserVariables) },
            statistics_perm_vars_global_html: { htmlText: statText('wiredmenu.monitor.statistics.perm_global_vars', colorize(stats.permanentGlobalVariables, stats.maxPermanentGlobalVariables, THRESHOLD_VARS), stats.permanentGlobalVariables, stats.maxPermanentGlobalVariables) },
        };
    };

    // `createLogTable`.
    const columns: TableColumn[] = [
        { id: 'type', title: loc('wiredmenu.monitor.column.type'), widthFactor: 0.33 },
        { id: 'category', title: loc('wiredmenu.monitor.column.category'), widthFactor: 0.22 },
        { id: 'quantity', title: loc('wiredmenu.monitor.column.occurrences'), widthFactor: 0.15 },
        { id: 'latest', title: loc('wiredmenu.monitor.column.latest'), widthFactor: 0.3 },
    ];

    // `ErrorDataTableObject.getTableCell`.
    const getCell = (error: IWiredErrorLogsError, columnId: string): TableCell => {
        switch (columnId) {
            case 'type': return { type: 'link', text: error.errorName, onLinkClick: () => showWiredErrorInfo(error) };
            case 'category': return { text: error.category };
            case 'quantity': return { text: String(error.throwCount) };
            default: {
                if (error.msSinceLastOccurrence < 0) return { text: '/' };

                const time = now - error.msSinceLastOccurrence;

                return { text: GetFriendlyTime(t, error.msSinceLastOccurrence / 1000, '.ago', 3), tooltip: convertTimestamp(time - (time % 1000)) };
            }
        }
    };

    // `onClickMonitor`: only Frank's face is the easter egg.
    const onClickMonitor = (event: FederatedPointerEvent) => {
        const local = event.getLocalPosition(event.currentTarget);

        if ((local.x < 14) || (local.x > 61) || (local.y < 45) || (local.y > 107)) return;

        progressWiredMonitorTreasureHunt(send);
    };

    // `updateImageUI`, once the stats are in; until then the layout's own (`monitor_image_2`) shows.
    const panicking = stats ? isFrankPanicking(stats, errors ?? []) : undefined;

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/wired_menu_view_xml"
            part="monitor_container"
            bindings={{
                '': { visible: true },
                ...statBindings(),
                monitor_image_1: { visible: (panicking === undefined) ? undefined : !panicking },
                monitor_image_2: { visible: panicking, onPointerTap: onClickMonitor },
                // `updateErrorLogsUI`.
                log_table_container: {
                    children: (
                        <TableView
                            columns={columns}
                            rows={errors ?? []}
                            getRowId={error => String(error.errorId)}
                            getCell={getCell}
                            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                        />
                    ),
                },
                // `updateButtonsUI`.
                clear_log_btn: { disableSection: !hasWritePermission || clearing, onPointerTap: () => clearWiredErrorLogs(send) },
                log_overview_btn: { disableSection: !hasReadPermission, onPointerTap: () => openWiredRoomLogs(send) },
            }}
        />
    );
};
