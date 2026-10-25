/**
 * Mounts the vault (`EarningsView`) while its window is up - opened by `habboUI/open/vault`
 * (`EarningsController.linkReceived` -> `showEarnings`), which the purse's earnings button and the
 * "new earnings" bubble both send. Its close button disposes the view (`header_button_close`).
 */
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { EarningsView } from '#base/views/earnings/EarningsView';

export const EarningsComponent = () => {
    const isVisible = useIsWindowVisible('earnings');
    const { hideWindow } = useWindowActions();

    if (!isVisible) return null;

    return <EarningsView onClose={() => hideWindow('earnings')} />;
};
