/**
 * The warning that the person you are trading with has taken a name that only looks like someone
 * else's - Flash `inventory/trading/namescam/TradingNameScamWarningView` over
 * `inventory_trading_name_scam_warning_xml` (a style 3 frame, 356x333, margins 3/36/3/3, tinted
 * `#d43d59`).
 *
 * Its `content_list` (10,8, 8px apart) stacks: the warning line; the `trader_section` (330x58) with
 * the other user's avatar, their name and an `open_profile_button`; then, only where there is
 * anything to list, the `room_matches_section` and `friend_matches_section` - the names in the room
 * and among your friends that theirs could be mistaken for; and last the `button_container`.
 *
 * The dialog cannot be dismissed for its first `CLOSE_LOCK_SECONDS`: the close button is dead and
 * `close_countdown_text` counts the seconds down, so the warning is read rather than clicked away.
 * `onCloseLockTimer` disables the frame's own close button for the same stretch.
 */
import { openProfile } from '#base/commands';
import { AvatarImage } from '#base/components';
import { useWebSocketContext } from '#base/context/communication';
import { InventoryTradingNameScamWarning, useInventoryStore, useInventoryTradingActions } from '#base/context/inventory';
import { useTranslation } from '#base/context/system';
import { useSecondsClock } from '#base/hooks';
import { Box, Button, Frame, Region, ThemeText } from '#base/theme';

/** `TradingNameScamWarningView.CLOSE_LOCK_SECONDS`. */
const CLOSE_LOCK_SECONDS = 6;

/** One of the two "these names look like it" sections (330x58). */
const MatchesSection = ({ header, names }: { header: string; names: readonly string[] }) => (
    <Box layout={{ width: 330, height: 58, flexShrink: 0 }}>
        <ThemeText
            text={header}
            textStyle="u_regular"
            verticalAlign="top"
            layout={{ position: 'absolute', left: 0, top: 0 }}
        />
        <ThemeText
            text={names.join(', ')}
            textStyle="u_regular"
            textOptions={{ wordWrap: true, wordWrapWidth: 326 }}
            clip
            verticalAlign="top"
            layout={{ position: 'absolute', left: 0, right: 0, top: 20, height: 38 }}
        />
    </Box>
);

const NameScamWarningDialog = ({ warning }: { warning: InventoryTradingNameScamWarning }) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const { setTradingNameScamWarning } = useInventoryTradingActions();
    // The clock ticks once a second; the lock started when the handler raised the warning.
    const clock = useSecondsClock();
    const secondsLeft = Math.max(0, Math.ceil(((warning.raisedAt + (CLOSE_LOCK_SECONDS * 1000)) - clock) / 1000));
    const locked = secondsLeft > 0;
    const close = () => setTradingNameScamWarning(undefined);

    return (
        <Frame
            id="inventory_trading_name_scam_warning"
            variant="3"
            caption={t('inventory.trading.namescam.title')}
            tintColor="#d43d59"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            onClose={locked ? undefined : close}
            layout={{ position: 'absolute', width: 356, height: 333, minWidth: 356, maxWidth: 356 }}
            margins={[ 3, 36, 3, 3 ]}
        >
            <Region layout={{ position: 'absolute', left: 10, right: 10, top: 8, flexDirection: 'column', gap: 8 }}>
                <ThemeText
                    text={t('inventory.trading.namescam.warning')}
                    textStyle="u_regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 326 }}
                    verticalAlign="top"
                    layout={{ width: 330, flexShrink: 0 }}
                />
                <Box layout={{ width: 330, height: 58, flexShrink: 0, overflow: 'hidden' }}>
                    <Box layout={{ position: 'absolute', left: -10, top: -24, width: 90, height: 130, overflow: 'hidden' }}>
                        <AvatarImage
                            figure={warning.tradedUserFigure}
                            gender={warning.tradedUserGender}
                            direction={2}
                        />
                    </Box>
                    <ThemeText
                        text={t('inventory.trading.namescam.trader')}
                        textStyle="u_regular"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 63, top: 11 }}
                    />
                    <ThemeText
                        text={warning.tradedUserName}
                        textStyle="u_regular"
                        flashFormat={{ bold: true }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 63, top: 29 }}
                    />
                    <Button
                        variant="3"
                        name="open_profile_button"
                        textStyle="button_shiny_regular"
                        onPointerTap={() => openProfile(send, warning.tradedUserId)}
                        layout={{ position: 'absolute', right: 16, top: 16, width: 90, height: 26 }}
                    >
                        {t('inventory.trading.namescam.open_profile')}
                    </Button>
                </Box>
                {(warning.similarInRoom.length > 0) && (
                    <MatchesSection
                        header={t('inventory.trading.namescam.similar_in_room')}
                        names={warning.similarInRoom}
                    />
                )}
                {(warning.similarInFriends.length > 0) && (
                    <MatchesSection
                        header={t('inventory.trading.namescam.similar_in_friends')}
                        names={warning.similarInFriends}
                    />
                )}
                <Box layout={{ height: 30, marginLeft: 129, flexShrink: 0, flexDirection: 'row', gap: 7, alignItems: 'center' }}>
                    <Button
                        variant="3"
                        name="close_button"
                        textStyle="button_shiny_regular"
                        disabled={locked}
                        onPointerTap={close}
                        layout={{ width: 50, height: 26, flexShrink: 0 }}
                    >
                        {t('inventory.trading.namescam.close')}
                    </Button>
                    {locked && (
                        <ThemeText
                            text={t('inventory.trading.namescam.close_countdown', '', { seconds: String(secondsLeft) })}
                            textStyle="u_regular"
                            verticalAlign="top"
                            layout={{ flexShrink: 0 }}
                        />
                    )}
                </Box>
            </Region>
        </Frame>
    );
};

/** Mounts the warning while one is pending; `TradingNameScamWarningController.hide` takes it down. */
export const InventoryTradingNameScamWarningView = () => {
    const warning = useInventoryStore(x => x.tradingNameScamWarning);

    if (!warning) return null;

    return <NameScamWarningDialog warning={warning} />;
};
