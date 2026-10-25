/**
 * Mounts the sandbox self donation tool (`SelfDonationTool`) while its window is up - opened by a
 * `selfdonation/open` link on a sandbox hotel (`openWiredSelfDonation`).
 */
import { useIsWindowVisible, useWindowActions } from '#base/context/system';
import { WiredSelfDonationView } from '#base/views/wired-trading/self-donation/WiredSelfDonationView';

export const WiredSelfDonationComponent = () => {
    const isVisible = useIsWindowVisible('wired_self_donation');
    const { hideWindow } = useWindowActions();

    if (!isVisible) return null;

    return <WiredSelfDonationView onClose={() => hideWindow('wired_self_donation')} />;
};
