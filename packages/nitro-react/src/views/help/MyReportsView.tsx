/**
 * The reports status window - `MyReportStatus` over `habbo-help-com/my_reports_xml`
 * (`getXmlWindow("my_reports")`, `center()`ed), opened by `HabboHelp.onMyCfhReportStatusMessageEvent`
 * with the answer to the help window's "My reports status".
 *
 * `createTable` puts a `TableView` in `reports_table_cont`: report date (0.26 of the row), reported
 * account (0.18), reason (0.38) and status (0.18), all left aligned, with a header row and no
 * selection. `setTableObjects` lists the reports newest first (`ReportStatusTableObject`): the date
 * as `dd/MM/yyyy`, the account (`report.status.deleted` in `0xd20000` when the name is empty), the
 * reason as `help.cfh.topic.<category>`, and the status - appealed, decided (closed) or waiting -
 * with an info button unless the account is deleted.
 *
 * The info button toggles the focus mode (`clickInfoButton`): `status_info_bubble` shows for that
 * report, and while the mode is on, hovering another row moves the bubble to it (`onRowHover`). The
 * bubble (`refreshBubbleUI`) tells when the report (or its appeal) was made and decided, what was
 * done (`getActionExplanation`), the support link when the user was sanctioned, and enables the
 * appeal button for a decided, unsanctioned report not yet appealed; the button sends
 * `AppealCfhComposer` with the report's id and disables itself. The bubble is taken out of the
 * window onto the desktop (`_window.desktop.addChild`) and placed by `relocateBubbleAndFocus`: its
 * left 2px inside the row's right edge, its middle on the row's.
 */
import { AppealCfhComposer, CFH_APPEAL_STATUS_ACTION, CFH_APPEAL_STATUS_APPEALED, CFH_APPEAL_STATUS_NO_ACTION, CFH_APPEAL_STATUS_NONE, IMyCfhReportStatus } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Box, GlobalRect, LayoutImage, TemplateBindings, TemplateWindow, useTemplateFrame } from '#base/theme';
import { WiredTableCell, WiredTableColumn, WiredTableView } from '#base/views/wired-common/WiredTableView';

const TEMPLATE = 'habbo-help-com/my_reports_xml';

/** `ReportStatusTableObject.getReportedUserDeleted`'s colour for a deleted account. */
const DELETED_ACCOUNT_COLOR = '#d20000';

/** `status_info_bubble`'s height in the layout. */
const BUBBLE_HEIGHT = 189;

type Translate = ReturnType<typeof useTranslation>;

/** `DateTimeFormatter.setDateTimePattern("dd/MM/yyyy")`. */
const formatDate = (time: number): string => {
    const date = new Date(time);
    const pad = (value: number) => String(value).padStart(2, '0');

    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
};

/** `getActionExplanation`. */
const actionExplanation = (report: IMyCfhReportStatus): string => {
    if (report.appealStatus === CFH_APPEAL_STATUS_ACTION) return 'report.status.info.appeal.action';
    if (report.appealStatus === CFH_APPEAL_STATUS_NO_ACTION) return 'report.status.info.appeal.no_action';

    if (report.sanctionGivenByAutoModeration) return report.sanctioned ? 'report.status.info.auto_moderated.action' : 'report.status.info.auto_moderated.no_action';

    return report.sanctioned ? 'report.status.info.manually_moderated.action' : 'report.status.info.manually_moderated.no_action';
};

/** `ReportStatusTableObject.statusText`. */
const statusText = (t: Translate, report: IMyCfhReportStatus): string => {
    if (report.appealStatus === CFH_APPEAL_STATUS_APPEALED) return t('report.status.state.appealed');
    if (report.closeTime !== -1) return t('report.status.state.decided');

    return t('report.status.state.pending');
};

export interface MyReportsViewProps {
    reports: readonly IMyCfhReportStatus[];
    onClose: () => void;
}

export const MyReportsView = ({ reports, onClose }: MyReportsViewProps) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const zendeskUrl = useConfigValue<string>('zendesk.url') ?? '';
    const frame = useTemplateFrame({ id: 'help_my_reports', centered: true, rememberPosition: false, resizeDirection: 'none', onClose });
    /** `_-w1q`: the bubble follows the hovered row while this is on. */
    const [ focusMode, setFocusMode ] = useState(false);
    /** `_shownObject`, with its row's box on screen (`getGlobalRowRectangle`). */
    const [ shownRow, setShownRow ] = useState<{ id: number; rect: GlobalRect } | null>(null);
    /** The row under the pointer: the info button is pressed on a hovered row. */
    const [ hovered, setHovered ] = useState<{ id: number; rect: GlobalRect } | null>(null);
    /** Reports appealed from this window: the button stays disabled (`appealButton.disable()`). */
    const [ appealed, setAppealed ] = useState<number[]>([]);

    // `setTableObjects`: newest first.
    const rows = [ ...reports ].sort((a, b) => b.creationTime - a.creationTime);
    const shown = shownRow ? rows.find(row => row.id === shownRow.id) : undefined;
    const shownRect = shownRow?.rect;

    const columns: WiredTableColumn[] = [
        { id: 'report_date', title: t('report.status.col.report_date'), widthFactor: 0.26, alignment: 'left' },
        { id: 'account', title: t('report.status.col.reported_account'), widthFactor: 0.18, alignment: 'left' },
        { id: 'reason', title: t('report.status.col.reason'), widthFactor: 0.38, alignment: 'left' },
        { id: 'appeal_status', title: t('report.status.col.appeal_status'), widthFactor: 0.18, alignment: 'left' },
    ];

    /** `clickInfoButton`. */
    const clickInfoButton = (report: IMyCfhReportStatus) => {
        const mode = !focusMode;

        setFocusMode(mode);
        setShownRow((mode && hovered && (hovered.id === report.id)) ? hovered : null);
    };

    /** `ReportStatusTableObject.getTableCell`. */
    const getCell = (report: IMyCfhReportStatus, columnId: string): WiredTableCell => {
        const deleted = !report.reportedAccountName;

        switch (columnId) {
            case 'report_date':
                return { text: formatDate(report.creationTime) };
            case 'account':
                return deleted ? { text: t('report.status.deleted', 'Deleted'), textColor: DELETED_ACCOUNT_COLOR } : { text: report.reportedAccountName };
            case 'reason':
                return { text: t(`help.cfh.topic.${report.userCategory}`) };
            default:
                return {
                    text: statusText(t, report),
                    extraButton: deleted ? undefined : { src: LayoutImage('habbo-window-manager-com/icons_info_grey.png'), onClick: () => clickInfoButton(report) },
                };
        }
    };

    /** `onClickAppeal`. */
    const appeal = (report: IMyCfhReportStatus) => {
        send(new AppealCfhComposer({ reportId: report.id }));
        setAppealed(ids => [ ...ids, report.id ]);
    };

    const bubbleBindings = (): TemplateBindings => {
        if (!shown) return {};

        // `refreshBubbleUI`.
        const isAppeal = shown.appealStatus !== CFH_APPEAL_STATUS_NONE;
        const decided = isAppeal ? (shown.appealResolutionTime !== -1) : (shown.closeTime !== -1);
        const decisionDate = decided ? formatDate(isAppeal ? shown.appealResolutionTime : shown.closeTime) : '-';
        const canAppeal = (shown.appealStatus === CFH_APPEAL_STATUS_NONE) && decided && !shown.sanctioned && !appealed.includes(shown.id);

        return {
            created_key_txt: { caption: t(isAppeal ? 'report.status.info.appealed' : 'report.status.info.reported') },
            reported_date_txt: { caption: formatDate(isAppeal ? shown.appealCreationTime : shown.creationTime) },
            decision_date_txt: { caption: decisionDate },
            action_txt: { caption: t(decided ? (shown.sanctioned ? 'report.status.info.action' : 'report.status.info.no_action') : 'report.status.info.sanction_pending') },
            action_desc_txt: { caption: decided ? t(actionExplanation(shown)) : '' },
            sanction_info_txt: { htmlText: shown.sanctioned ? t('report.status.info.sanction_help', '', { url: zendeskUrl }) : '' },
            appeal_button: { disabled: !canAppeal, onPointerTap: canAppeal ? () => appeal(shown) : undefined },
        };
    };

    const bindings: TemplateBindings = {
        reports_table_cont: {
            children: (
                <WiredTableView
                    columns={columns}
                    rows={rows}
                    getRowId={row => String(row.id)}
                    getCell={getCell}
                    showHeader
                    canSelect={false}
                    onRowHovered={(row, rect) => {
                        const entry = (row && rect) ? { id: row.id, rect } : null;

                        setHovered(entry);

                        // `onRowHover`.
                        if (entry && focusMode && (entry.id !== shownRow?.id)) setShownRow(entry);
                    }}
                />
            ),
        },
        // Moved onto the desktop when the window is built: never drawn inside it.
        status_info_bubble: { visible: false },
    };

    return (
        <>
            <TemplateWindow
                id={TEMPLATE}
                frame={frame}
                bindings={bindings}
            />
            {shown && shownRect && (
                // `relocateBubbleAndFocus`.
                <Box
                    zIndex={100000}
                    layout={{ position: 'absolute', left: Math.round(shownRect.x + shownRect.width - 2), top: Math.round(shownRect.y + (shownRect.height / 2) - (BUBBLE_HEIGHT / 2)) }}
                >
                    <TemplateWindow
                        id={TEMPLATE}
                        part="status_info_bubble"
                        bindings={bubbleBindings()}
                    />
                </Box>
            )}
        </>
    );
};
