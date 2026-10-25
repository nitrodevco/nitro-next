import { useState } from 'react';

import { openSafetyLockUnlockPage } from '#base/commands';
import { useSingularNotificationStore } from '#base/context/singular-notifications';
import { Box, TemplateWindow } from '#base/theme';

/** `SafetyLockedNotification.LINK_COLOR_NORMAL` / `LINK_COLOR_HIGHLIGHT`. */
const LINK_COLOR_NORMAL = 0xffffff;
const LINK_COLOR_HIGHLIGHT = 0xbae1f9;

/**
 * Flash's `notifications/singular/SafetyLockedNotification` over
 * `habbo-notifications-com/safety_locked_notification_xml`: the toolbar extension
 * `SingularNotificationController` docks as `safety_locked_notification` with no priority, so it
 * goes to the end of the extension column - mounted there, 2 under whatever is above it
 * (`extension_grid`'s spacing). Up while the account is safety locked and not yet unlocked
 * (`registerSingularNotificationHandlers`).
 *
 * A click on `unlock_link_region` opens the unlock page (`openSafetyLockUnlockPage`); the
 * notification stays. Its `unlock_link` is white, `0xbae1f9` while the pointer is over the region.
 */
export const SafetyLockedNotificationView = () => {
    const visible = useSingularNotificationStore(x => x.safetyLockedNotificationVisible);

    if (!visible) return null;

    return <SafetyLockedNotificationContent />;
};

const SafetyLockedNotificationContent = () => {
    const [ linkHover, setLinkHover ] = useState(false);

    return (
        <Box layout={{ marginTop: 2, flexShrink: 0 }}>
            <TemplateWindow
                id="habbo-notifications-com/safety_locked_notification_xml"
                bindings={{
                    unlock_link_region: {
                        onPointerTap: openSafetyLockUnlockPage,
                        onPointerOver: () => setLinkHover(true),
                        onPointerOut: () => setLinkHover(false),
                    },
                    unlock_link: { color: linkHover ? LINK_COLOR_HIGHLIGHT : LINK_COLOR_NORMAL },
                }}
            />
        </Box>
    );
};
