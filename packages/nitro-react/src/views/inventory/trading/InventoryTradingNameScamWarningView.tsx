/**
 * The warning that the person you are trading with has taken a name that only looks like someone
 * else's - Flash `inventory/trading/namescam/TradingNameScamWarningView` over
 * `inventory_trading_name_scam_warning_xml`, a window of its own on the desktop, centred each time
 * it is shown.
 *
 * - `show`: `warning_text` names the trader (`trader_name`) and is its text's height plus 6;
 *   `trader_name_text` and the `trader_avatar` head are the trader's, and `open_profile_button`
 *   opens their profile.
 * - `updateMatchesSection`: `room_matches_section` and `friend_matches_section` list the names in
 *   the room and among your friends that the trader's could be mistaken for, one per line, the text
 *   its height plus 6 and the section 6 under it; a section with nothing to list is hidden and
 *   0 high, so `content_list` closes up over it.
 * - `updateCloseLockUI`: for its first `CLOSE_LOCK_SECONDS` neither `close_button` nor the frame's
 *   close button closes it and `close_countdown_text` counts the seconds down, so the warning is
 *   read rather than clicked away. Flash greys the frame's close button too; here it is only dead.
 */
import { openProfile } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { InventoryTradingNameScamWarning, useInventoryStore, useInventoryTradingActions } from '#base/context/inventory';
import { useTranslation } from '#base/context/system';
import { useSecondsClock } from '#base/hooks';
import { TemplateWindow, TemplateWindows, useAvatarImageTexture } from '#base/theme';

/** `TradingNameScamWarningView.CLOSE_LOCK_SECONDS`. */
const CLOSE_LOCK_SECONDS = 6;

/** `show` / `updateMatchesSection`: a text is its lines plus this, and a section ends this far under its text. */
const SECTION_PADDING = 6;

/** `trader_avatar`'s `avatar_image` widget: the head (`only_head`) facing its default `southeast`. */
const TRADER_AVATAR_DIRECTION = 2;

const NameScamWarningDialog = ({ warning }: { warning: InventoryTradingNameScamWarning }) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const { setTradingNameScamWarning } = useInventoryTradingActions();
    const head = useAvatarImageTexture(warning.tradedUserFigure, warning.tradedUserGender, { headOnly: true, direction: TRADER_AVATAR_DIRECTION });
    // The clock ticks once a second; the lock started when the handler raised the warning.
    const clock = useSecondsClock();
    const secondsLeft = Math.max(0, Math.ceil(((warning.raisedAt + (CLOSE_LOCK_SECONDS * 1000)) - clock) / 1000));
    const locked = secondsLeft > 0;
    const hasRoomMatches = warning.similarInRoom.length > 0;
    const hasFriendMatches = warning.similarInFriends.length > 0;

    /** `onWindowClose`: nothing while the lock runs, else `hide`. */
    const close = () => {
        if (!locked) setTradingNameScamWarning(undefined);
    };

    /** `show`'s and `updateMatchesSection`'s heights. */
    const arrange = ({ find }: TemplateWindows) => {
        const warningText = find('warning_text');

        if (warningText) warningText.setHeight(warningText.textHeight + SECTION_PADDING);

        const fitSection = (sectionName: string, textName: string, shown: boolean) => {
            const section = find(sectionName);
            const text = find(`${sectionName}/${textName}`);

            if (!section || !text) return;

            if (!shown) {
                section.setHeight(0);

                return;
            }

            text.setHeight(text.textHeight + SECTION_PADDING);
            section.setHeight(text.y + text.height + SECTION_PADDING);
        };

        fitSection('room_matches_section', 'room_matches_text', hasRoomMatches);
        fitSection('friend_matches_section', 'friend_matches_text', hasFriendMatches);
    };

    return (
        <TemplateWindow
            id="habbo-inventory-com/inventory_trading_name_scam_warning_xml"
            frame={{ id: 'inventory_trading_name_scam_warning', centered: true, rememberPosition: false, onClose: close }}
            bindings={{
                '': { caption: t('inventory.trading.namescam.title') },
                warning_text: { caption: t('inventory.trading.namescam.warning', '', { trader_name: warning.tradedUserName }) },
                trader_label: { caption: t('inventory.trading.namescam.trader') },
                trader_name_text: { caption: warning.tradedUserName },
                trader_avatar: {
                    children: head.texture && (
                        <pixiSprite
                            texture={head.texture}
                            eventMode="none"
                            layout={{ position: 'absolute', left: 0, top: 0, width: head.width, height: head.height }}
                        />
                    ),
                },
                open_profile_button: { onPointerTap: () => openProfile(send, warning.tradedUserId) },
                room_matches_section: { visible: hasRoomMatches },
                room_matches_header: { caption: t('inventory.trading.namescam.similar_in_room') },
                room_matches_text: { caption: warning.similarInRoom.join('\n') },
                friend_matches_section: { visible: hasFriendMatches },
                friend_matches_header: { caption: t('inventory.trading.namescam.similar_in_friends') },
                friend_matches_text: { caption: warning.similarInFriends.join('\n') },
                // `updateCloseLockUI`.
                close_button: { disabled: locked, onPointerTap: close },
                close_countdown_text: { visible: locked, caption: locked ? t('inventory.trading.namescam.close_countdown', '', { seconds: String(secondsLeft) }) : '' },
            }}
            arrange={arrange}
        />
    );
};

/** Mounts the warning while one is pending; `TradingNameScamWarningController.hide` takes it down. */
export const InventoryTradingNameScamWarningView = () => {
    const warning = useInventoryStore(x => x.tradingNameScamWarning);

    if (!warning) return null;

    return <NameScamWarningDialog warning={warning} />;
};
