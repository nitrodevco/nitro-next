/**
 * The wired menu's monitor tab - `WiredMenuMonitorTab` on `monitor_container`: the room's wired
 * statistics (each line coloured green, orange or red by how close it is to its limit), Frank,
 * who panics when anything is not green or there are errors, the error log table
 * (`ErrorDataTableObject`), and the buttons to clear the log and to open the room's wired log.
 *
 * The statistics are Flash `htmlText` built from localizations with `%color%`, `%amount%` and
 * `%limit%` (`getLocalizationWithParams(key, "", ...)` - an unknown key shows nothing).
 */
import type { IWiredErrorLogsError, IWiredRoomStatsData } from '@nitrodevco/nitro-packets';
import { FederatedPointerEvent } from 'pixi.js';

import { clearWiredErrorLogs, openWiredRoomLogs, progressWiredMonitorTreasureHunt, showWiredErrorInfo } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useWiredHasReadPermission, useWiredHasWritePermission, useWiredStore } from '#base/context/wired';
import { useSecondsClock } from '#base/hooks';
import { Border, Box, Button, HABBO_TEXT_STYLES, LayoutImage, normalizeFlashTextFormat, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

import { WiredTableCell, WiredTableColumn, WiredTableView } from '../wired-common/WiredTableView';
import { WiredFlashLabel } from '../wired-setup/kit/WiredFlashLabel';

const COLOR_RED = 'ff5733';
const COLOR_ORANGE = 'BD7800';
const COLOR_GREEN = '008000';

/** `THRESHOLD_*` - the share of a limit at which a statistic turns orange, then red. */
const THRESHOLD_USAGE = [ 0.3, 0.7 ];
const THRESHOLD_FURNI = [ 0.6, 0.85 ];
const THRESHOLD_VARS = [ 0.5, 0.8 ];

/** The statistics' `html` fields: `u_regular` at `font_size` 11. */
const STAT_FORMAT = normalizeFlashTextFormat({ ...HABBO_TEXT_STYLES.u_regular, fontSize: 11 });

/** `colorize`. */
const colorize = (amount: number, limit: number, [ first, second ]: number[]): string => {
    const share = amount / limit;

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

    const statLines = stats
        ? [
                statText('wiredmenu.monitor.statistics.usage', colorize(stats.executionCost, stats.executionCostCap, THRESHOLD_USAGE), Math.round(stats.executionCost), Math.round(stats.executionCostCap)),
                t('wiredmenu.monitor.statistics.is_heavy', '', { color: stats.isHeavy ? COLOR_ORANGE : COLOR_GREEN, bool: t(stats.isHeavy ? 'wiredmenu.bool.yes' : 'wiredmenu.bool.no', stats.isHeavy ? 'wiredmenu.bool.yes' : 'wiredmenu.bool.no') }),
                statText('wiredmenu.monitor.statistics.floorfurni', colorize(stats.floorItemCount, stats.floorItemCap, THRESHOLD_FURNI), stats.floorItemCount, stats.floorItemCap),
                statText('wiredmenu.monitor.statistics.wallfurni', colorize(stats.wallItemCount, stats.wallItemCap, THRESHOLD_FURNI), stats.wallItemCount, stats.wallItemCap),
                statText('wiredmenu.monitor.statistics.perm_furni_vars', colorize(stats.permanentFurniVariables, stats.maxPermanentFurniVariables, THRESHOLD_VARS), stats.permanentFurniVariables, stats.maxPermanentFurniVariables),
                statText('wiredmenu.monitor.statistics.perm_user_vars', colorize(stats.permanentUserVariables, stats.maxPermanentUserVariables, THRESHOLD_VARS), stats.permanentUserVariables, stats.maxPermanentUserVariables),
                statText('wiredmenu.monitor.statistics.perm_global_vars', colorize(stats.permanentGlobalVariables, stats.maxPermanentGlobalVariables, THRESHOLD_VARS), stats.permanentGlobalVariables, stats.maxPermanentGlobalVariables),
            ]
        : [];

    const panicking = !!stats && !!errors && isFrankPanicking(stats, errors);

    const columns: WiredTableColumn[] = [
        { id: 'type', title: loc('wiredmenu.monitor.column.type'), widthFactor: 0.33 },
        { id: 'category', title: loc('wiredmenu.monitor.column.category'), widthFactor: 0.22 },
        { id: 'quantity', title: loc('wiredmenu.monitor.column.occurrences'), widthFactor: 0.15 },
        { id: 'latest', title: loc('wiredmenu.monitor.column.latest'), widthFactor: 0.3 },
    ];

    // `ErrorDataTableObject.getTableCell`.
    const getCell = (error: IWiredErrorLogsError, columnId: string): WiredTableCell => {
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

    return (
        <>
            <Box layout={{ position: 'absolute', left: 14, top: 18, width: 215, height: 123 }}>
                <ThemeText
                    text={t('wiredmenu.monitor.statistics', 'wiredmenu.monitor.statistics')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#000000' }}
                    flashFormat={{ bold: true }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 0, height: 19 }}
                />
                <Border
                    variant="3"
                    tintColor="#dadada"
                    layout={{ position: 'absolute', left: 0, top: 20, width: 204, height: 99 }}
                >
                    <ScrollArea
                        layout={{ position: 'absolute', left: 5, top: 5, width: 197, height: 89 }}
                        contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 2 }}
                    >
                        {statLines.map((line, index) => (
                            <WiredFlashLabel
                                key={index}
                                text={line}
                                format={STAT_FORMAT}
                                html
                                layout={{ height: 16, flexShrink: 0 }}
                            />
                        ))}
                    </ScrollArea>
                </Border>
            </Box>
            <Box layout={{ position: 'absolute', left: 230, top: 4, width: 256, height: 145 }}>
                {!panicking && (
                    <ThemeImage
                        src={LayoutImage('wired/wired_monitor_element1.png')}
                        layout={{ position: 'absolute', left: 0, top: 0 }}
                    />
                )}
                {panicking && (
                    <Region
                        cursor="default"
                        onPointerTap={onClickMonitor}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 256, height: 145 }}
                    >
                        <ThemeImage
                            src={LayoutImage('wired/wired_monitor_element2.png')}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                    </Region>
                )}
            </Box>
            <Box layout={{ position: 'absolute', left: 14, top: 152, width: 472, height: 218 }}>
                <ThemeText
                    text={t('wiredmenu.monitor.log', 'wiredmenu.monitor.log')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#000000' }}
                    flashFormat={{ bold: true }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 0, height: 19 }}
                />
                <WiredTableView
                    columns={columns}
                    rows={errors ?? []}
                    getRowId={error => String(error.errorId)}
                    getCell={getCell}
                    layout={{ position: 'absolute', left: 0, top: 20, width: 472, height: 156, flex: 0 }}
                />
                <Box
                    alpha={(!hasWritePermission || clearing) ? 0.5 : 1}
                    layout={{ position: 'absolute', left: 0, top: 185, width: 110, height: 30 }}
                >
                    <Button
                        variant="5"
                        tintColor="#e33934"
                        disabled={!hasWritePermission || clearing}
                        onPointerTap={() => clearWiredErrorLogs(send)}
                        layout={{ width: 110, height: 30 }}
                    >
                        {t('wiredmenu.monitor.clear_all', 'wiredmenu.monitor.clear_all')}
                    </Button>
                </Box>
                <Box
                    alpha={hasReadPermission ? 1 : 0.5}
                    layout={{ position: 'absolute', left: 361, top: 185, width: 110, height: 30 }}
                >
                    <Button
                        variant="3"
                        disabled={!hasReadPermission}
                        onPointerTap={() => openWiredRoomLogs(send)}
                        layout={{ width: 110, height: 30 }}
                    >
                        {t('wiredmenu.monitor.log_overview', 'wiredmenu.monitor.log_overview')}
                    </Button>
                </Box>
            </Box>
        </>
    );
};
