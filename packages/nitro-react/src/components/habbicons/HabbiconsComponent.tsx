/**
 * Mounts the habbicon controller's windows (`catalog/habbicons/HabbiconController`): the hub
 * (`HabbiconView`) while the `habbicons` window is up - `openHabbiconHub` shows it, its close
 * button hides it (`onWindowClose`) - and the one purchase confirmation the controller holds
 * (`§_-wU§`), remounted for each new one. Nothing shows with `habbicons.enabled` off.
 */
import { closeHabbiconPurchaseConfirmation } from '#base/commands';
import { useHabbiconsStore } from '#base/context/habbicons';
import { useConfigValue, useIsWindowVisible, useWindowActions } from '#base/context/system';
import { HabbiconPurchaseConfirmationView } from '#base/views/habbicons/HabbiconPurchaseConfirmationView';
import { HabbiconView } from '#base/views/habbicons/HabbiconView';

export const HabbiconsComponent = () => {
    const enabled = useConfigValue<boolean>('habbicons.enabled') === true;
    const hubVisible = useIsWindowVisible('habbicons');
    const purchase = useHabbiconsStore(x => x.purchase);
    const { hideWindow } = useWindowActions();

    if (!enabled) return null;

    return (
        <>
            {hubVisible && <HabbiconView onClose={() => hideWindow('habbicons')} />}
            {purchase && (
                <HabbiconPurchaseConfirmationView
                    key={purchase.id}
                    confirmation={purchase}
                    onClose={closeHabbiconPurchaseConfirmation}
                />
            )}
        </>
    );
};
