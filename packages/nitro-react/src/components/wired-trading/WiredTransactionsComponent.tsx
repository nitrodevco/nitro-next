/**
 * Mounts the two transaction windows - Flash `WiredTransactionLogsController`'s log and
 * `WiredTransactionDetailsController`'s details. Each shows once its packet has arrived and until
 * it is closed (or the room goes).
 */
import { useWiredTradingStore, useWiredTransactionsActions } from '#base/context/wired-trading';
import { WiredTransactionDetailsView } from '#base/views/wired-trading/transactions/WiredTransactionDetailsView';
import { WiredTransactionLogsView } from '#base/views/wired-trading/transactions/WiredTransactionLogsView';

export const WiredTransactionsComponent = () => {
    const logs = useWiredTradingStore(x => x.transactionLogs);
    const logsVisible = useWiredTradingStore(x => x.transactionLogsVisible);
    const details = useWiredTradingStore(x => x.transactionDetails);
    const detailsVisible = useWiredTradingStore(x => x.transactionDetailsVisible);
    const { hideTransactionLogs, hideTransactionDetails } = useWiredTransactionsActions();

    return (
        <>
            {logsVisible && logs && (
                <WiredTransactionLogsView
                    logs={logs}
                    onClose={hideTransactionLogs}
                />
            )}
            {detailsVisible && details && (
                <WiredTransactionDetailsView
                    details={details}
                    onClose={hideTransactionDetails}
                />
            )}
        </>
    );
};
