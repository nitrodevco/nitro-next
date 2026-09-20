/**
 * `triggerconfs/§_-aw§.buildInputs` - the usage info (expanded) and, centred under it, the
 * "view in menu" link to the variable holding the failure reason (`viewInMenuCallback`:
 * `createLinkEvent("wiredmenu/open/variable_overview/@event.transaction_failed.reason")`).
 */
import { openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { TRANSACTION_FAILED_REASON_LINK, WiredElementView } from '#base/wired';

import { WiredAlignCenter } from '../../kit/WiredAlignCenter';
import { WiredTextualButton } from '../../kit/WiredTextualButton';
import { WiredUsageInfoSection } from '../../kit/WiredUsageInfoSection';

export const TransactionFailedView: WiredElementView<Record<string, never>> = () => {
    const { send } = useWebSocketContext();

    return (
        <>
            <WiredUsageInfoSection text="${wiredfurni.params.transaction_failed.usage_info}" />
            <WiredAlignCenter>
                <WiredTextualButton
                    text="${wiredfurni.view_in_menu}"
                    onPress={() => openClientLink(send, TRANSACTION_FAILED_REASON_LINK)}
                />
            </WiredAlignCenter>
        </>
    );
};
