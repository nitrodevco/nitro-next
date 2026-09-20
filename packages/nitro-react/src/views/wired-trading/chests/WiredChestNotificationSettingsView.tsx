/**
 * The chest notification settings - Flash `chests/settings/ChestNotificationSettingsUI`, an ubuntu
 * wired window 350 wide whose sections scroll between 320 and a 2.4th of the screen:
 *
 * - the usage info (collapsed);
 * - which notifications (`BorderSection`): the generic pair (chest full, donation) and the
 *   wired trio (someone withdraws, chest empty, wired transaction), the latter disabled until the
 *   chest has the wired upgrade;
 * - when to notify (`notify_mode`, 0 or 1).
 *
 * `onEdit` fills the form from the chest furni's data; "ready" sends
 * `SetChestNotificationPreferences` and the window closes on the matching
 * `ChestPreferencesUpdateSuccess`.
 */
import { useState } from 'react';

import { saveWiredChestNotificationPreferences } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import {
    WIRED_CHEST_KEY_IS_WIRED_ENABLED, WIRED_CHEST_KEY_NOTIFICATION_CHEST_EMPTY, WIRED_CHEST_KEY_NOTIFICATION_CHEST_FULL, WIRED_CHEST_KEY_NOTIFICATION_DONATION, WIRED_CHEST_KEY_NOTIFICATION_WIRED_TRANSACTION,
    WIRED_CHEST_KEY_NOTIFICATION_WITHDRAWS, WIRED_CHEST_KEY_NOTIFY_MODE, WIRED_CHEST_TYPE_FURNI, WiredChestNotificationSettingsRequest,
} from '#base/context/wired-trading';
import { useViewportSize } from '#base/hooks';
import { WiredCheckboxGroup } from '#base/views/wired-setup/kit/WiredCheckboxGroup';
import { WiredDropdown } from '#base/views/wired-setup/kit/WiredDropdown';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';
import { WiredSimpleList } from '#base/views/wired-setup/kit/WiredSimpleList';
import { WiredUsageInfoSection } from '#base/views/wired-setup/kit/WiredUsageInfoSection';
import { WiredTradingFooter } from '#base/views/wired-trading/common/WiredTradingFooter';
import { WiredTradingFrame } from '#base/views/wired-trading/common/WiredTradingFrame';
import { UBUNTU_WIRED_STYLE } from '#base/wired';

const SCROLL_MIN_HEIGHT = 320;
const SCROLL_SCREEN_SHARE = 2.4;
const FRAME_WIDTH = 350;

const NOTIFY_MODE_OPTIONS = [ 0, 1 ].map(id => ({ id, label: `\${wiredchests.notification_settings.notification_mode.when.${id}}` }));

interface NotificationSettingsForm {
    chestFull: boolean;
    donation: boolean;
    withdraws: boolean;
    chestEmpty: boolean;
    wiredTransaction: boolean;
    notifyMode: number;
}

const readForm = (data: Record<string, string>): NotificationSettingsForm => ({
    chestFull: data[WIRED_CHEST_KEY_NOTIFICATION_CHEST_FULL] === '1',
    donation: data[WIRED_CHEST_KEY_NOTIFICATION_DONATION] === '1',
    withdraws: data[WIRED_CHEST_KEY_NOTIFICATION_WITHDRAWS] === '1',
    chestEmpty: data[WIRED_CHEST_KEY_NOTIFICATION_CHEST_EMPTY] === '1',
    wiredTransaction: data[WIRED_CHEST_KEY_NOTIFICATION_WIRED_TRANSACTION] === '1',
    notifyMode: parseInt(data[WIRED_CHEST_KEY_NOTIFY_MODE] ?? '0', 10) || 0,
});

export interface WiredChestNotificationSettingsViewProps {
    request: WiredChestNotificationSettingsRequest;
    /** The chest furni's data when the window opened. */
    data: Record<string, string>;
    onClose: () => void;
}

export const WiredChestNotificationSettingsView = ({ request, data, onClose }: WiredChestNotificationSettingsViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const viewport = useViewportSize();
    const [ form, setForm ] = useState<NotificationSettingsForm>(() => readForm(data));
    const isWiredEnabled = (data[WIRED_CHEST_KEY_IS_WIRED_ENABLED] === '1');
    const chestTypeName = t((request.chestType === WIRED_CHEST_TYPE_FURNI) ? 'wiredchests.furni_chest' : 'wiredchests.coin_chest');

    const onSave = () => saveWiredChestNotificationPreferences(send, {
        chestId: request.chestId,
        notifyMode: form.notifyMode,
        notifyOnChestFull: form.chestFull,
        notifyOnDonation: form.donation,
        notifyOnWithdraw: form.withdraws,
        notifyOnChestEmpty: form.chestEmpty,
        notifyOnWiredTransaction: form.wiredTransaction,
    });

    return (
        <WiredTradingFrame
            id="wired-chest-notification-settings"
            title={t('wiredchests.notification_settings.title', '', { chest_type: chestTypeName })}
            width={FRAME_WIDTH}
            scroll={{ minHeight: SCROLL_MIN_HEIGHT, maxHeight: Math.floor(viewport.height / SCROLL_SCREEN_SHARE) }}
            onClose={onClose}
            parts={[
                <WiredUsageInfoSection
                    key="info"
                    text="${wiredchests.notification_settings.notification_info.desc}"
                    collapsed
                    title="${wiredchests.notification_settings.notification_info}"
                />,
                <WiredSection
                    key="enable"
                    title="${wiredchests.notification_settings.enable_notifications}"
                    bordered
                >
                    <WiredSimpleList spacing={UBUNTU_WIRED_STYLE.sectionSpacing}>
                        <WiredSection
                            title="${wiredchests.notification_settings.enable_notifications.generic}"
                            splitterVisible={false}
                        >
                            <WiredCheckboxGroup
                                options={[
                                    { id: 0, label: '${wiredchests.notification_settings.enable_notifications.generic.0}', selected: form.chestFull },
                                    { id: 1, label: '${wiredchests.notification_settings.enable_notifications.generic.1}', selected: form.donation },
                                ]}
                                onToggle={(id, selected) => setForm((id === 0) ? { ...form, chestFull: selected } : { ...form, donation: selected })}
                            />
                        </WiredSection>
                        <WiredSection
                            title="${wiredchests.notification_settings.enable_notifications.wired}"
                            disabled={!isWiredEnabled}
                        >
                            <WiredCheckboxGroup
                                options={[
                                    { id: 0, label: '${wiredchests.notification_settings.enable_notifications.wired.0}', selected: form.withdraws },
                                    { id: 1, label: '${wiredchests.notification_settings.enable_notifications.wired.1}', selected: form.chestEmpty },
                                    { id: 2, label: '${wiredchests.notification_settings.enable_notifications.wired.2}', selected: form.wiredTransaction },
                                ]}
                                onToggle={(id, selected) => {
                                    if (id === 0) setForm({ ...form, withdraws: selected });
                                    else if (id === 1) setForm({ ...form, chestEmpty: selected });
                                    else setForm({ ...form, wiredTransaction: selected });
                                }}
                            />
                        </WiredSection>
                    </WiredSimpleList>
                </WiredSection>,
                <WiredSection
                    key="mode"
                    title="${wiredchests.notification_settings.notification_mode}"
                    bordered
                >
                    <WiredSection
                        title="${wiredchests.notification_settings.notification_mode.when}"
                        splitterVisible={false}
                    >
                        <WiredDropdown
                            options={NOTIFY_MODE_OPTIONS}
                            selected={form.notifyMode}
                            onSelect={notifyMode => setForm({ ...form, notifyMode })}
                            caption="${wiredchests.notification_settings.notification_mode.when}"
                        />
                    </WiredSection>
                </WiredSection>,
                <WiredTradingFooter
                    key="footer"
                    onSave={onSave}
                    onCancel={onClose}
                />,
            ]}
        />
    );
};
