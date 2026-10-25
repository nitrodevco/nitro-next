/**
 * `triggerconfs/§_-p6§.buildInputs` - only the usage info (expanded).
 */
import { WiredElementView } from '#base/wired';

import { WiredUsageInfoSection } from '../../kit/WiredUsageInfoSection';

export const TransactionCompletedView: WiredElementView<Record<string, never>> = () => (
    <WiredUsageInfoSection text="${wiredfurni.params.transaction_complete.usage_info}" />
);
