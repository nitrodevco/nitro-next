/**
 * Mounts the wired chest's windows - Flash `WiredChestController`'s `WiredChestWrapperView` and
 * the windows it opens over the chest (`ChestSettingsUI`, `ChestNotificationSettingsUI`,
 * `WiredChestUpgradeConfirmationView`). Each shows while the store says it is up; the chest's own
 * window also needs the chest furni's data, which the handler reads when it opens.
 */
import { closeWiredChest } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useWiredChestActions, useWiredTradingStore } from '#base/context/wired-trading';
import { WiredChestNotificationSettingsView } from '#base/views/wired-trading/chests/WiredChestNotificationSettingsView';
import { WiredChestSettingsView } from '#base/views/wired-trading/chests/WiredChestSettingsView';
import { WiredChestUpgradeView } from '#base/views/wired-trading/chests/WiredChestUpgradeView';
import { WiredChestView } from '#base/views/wired-trading/chests/WiredChestView';

export const WiredChestComponent = () => {
    const { send } = useWebSocketContext();
    const chestView = useWiredTradingStore(x => x.chestView);
    const chestFurni = useWiredTradingStore(x => x.chestFurni);
    const chestSettings = useWiredTradingStore(x => x.chestSettings);
    const chestNotificationSettings = useWiredTradingStore(x => x.chestNotificationSettings);
    const chestUpgrade = useWiredTradingStore(x => x.chestUpgrade);
    const { setChestSettings, setChestNotificationSettings, setChestUpgrade } = useWiredChestActions();

    return (
        <>
            {chestView && chestFurni && (
                <WiredChestView
                    view={chestView}
                    furni={chestFurni}
                    onClose={() => closeWiredChest(send)}
                />
            )}
            {chestSettings && chestFurni && (
                <WiredChestSettingsView
                    key={chestSettings.chestId}
                    request={chestSettings}
                    data={chestFurni.data}
                    onClose={() => setChestSettings(undefined)}
                />
            )}
            {chestNotificationSettings && chestFurni && (
                <WiredChestNotificationSettingsView
                    key={chestNotificationSettings.chestId}
                    request={chestNotificationSettings}
                    data={chestFurni.data}
                    onClose={() => setChestNotificationSettings(undefined)}
                />
            )}
            {chestUpgrade && (
                <WiredChestUpgradeView
                    key={chestUpgrade.chestId}
                    request={chestUpgrade}
                    onClose={() => setChestUpgrade(undefined)}
                />
            )}
        </>
    );
};
