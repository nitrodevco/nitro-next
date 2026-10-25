import { useState } from 'react';

import { openClubGiftList } from '#base/commands';
import { useSingularNotificationActions, useSingularNotificationStore } from '#base/context/singular-notifications';
import { Box, TemplateWindow } from '#base/theme';

/** `ClubGiftNotification.LINK_COLOR_NORMAL` / `LINK_COLOR_HIGHLIGHT`. */
const LINK_COLOR_NORMAL = 0xffffff;
const LINK_COLOR_HIGHLIGHT = 0xbae1f9;

/** `ClubGiftNotification.ICON_STYLE_CLUB`: the style the constructor's `setClubIcon` gives `club_icon`. */
const ICON_STYLE_CLUB = '13';

/**
 * Flash's `notifications/singular/ClubGiftNotification` over
 * `habbo-notifications-com/club_gift_notification_xml`: the toolbar extension
 * `SingularNotificationController` docks as `club_gift_notification` with no priority, so it goes to
 * the end of the extension column - mounted there, 2 under whatever is above it (`extension_grid`'s
 * spacing). The constructor gives `club_icon` the club style.
 *
 * `open_catalog_button` opens the catalogue's `club_gifts` page and takes the notification down;
 * `cancel_link_region` ("not now") takes it down for the rest of the session (`isCancelled`). Its
 * `cancel_link` is white, `0xbae1f9` while the pointer is over the region.
 */
export const ClubGiftNotificationView = () => {
    const visible = useSingularNotificationStore(x => x.clubGiftNotificationVisible);

    if (!visible) return null;

    return <ClubGiftNotificationContent />;
};

const ClubGiftNotificationContent = () => {
    const { closeClubGiftNotification } = useSingularNotificationActions();
    const [ linkHover, setLinkHover ] = useState(false);

    return (
        <Box layout={{ marginTop: 2, flexShrink: 0 }}>
            <TemplateWindow
                id="habbo-notifications-com/club_gift_notification_xml"
                bindings={{
                    club_icon: { style: ICON_STYLE_CLUB },
                    open_catalog_button: { onPointerTap: openClubGiftList },
                    cancel_link_region: {
                        onPointerTap: () => closeClubGiftNotification(true),
                        onPointerOver: () => setLinkHover(true),
                        onPointerOut: () => setLinkHover(false),
                    },
                    cancel_link: { color: linkHover ? LINK_COLOR_HIGHLIGHT : LINK_COLOR_NORMAL },
                }}
            />
        </Box>
    );
};
