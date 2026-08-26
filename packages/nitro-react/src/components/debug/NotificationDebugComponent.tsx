import { INewFeatureConfig, NotificationExtensionEnum, NotificationStyleEnum, NotificationUtilities } from "@nitrodevco/nitro-api";

import { useConfigValue } from "#base/context";
import { useNotificationActions, useNotificationContext, useNotificationExtensionActions, useNotificationExtensions, useShowNotification } from "#base/context/notification";

import { DebugButton, DebugPanel, DebugSection } from "./DebugPanel";

const DEBUG_IMAGE_URL = '/assets/flash/notifications/frank.gif';
const DEBUG_TYPE = 'debug.sample';

export const NotificationDebugComponent = () => {
    const { addNotification, setNotificationsDisabled } = useNotificationActions();
    const { attachExtension, detachExtension } = useNotificationExtensionActions();
    const extensions = useNotificationExtensions();
    const showNotification = useShowNotification();

    const rawFeatures = useConfigValue<Record<string, unknown>[]>('notification.new_feature');

    const queueLength = useNotificationContext(x => x.queue.length);
    const visibleCount = useNotificationContext(x => x.notifications.length);
    const disabled = useNotificationContext(x => x.notificationsDisabled);
    const containerHeight = useNotificationContext(x => x.notificationContainerHeight);

    const featureConfigs = (Array.isArray(rawFeatures) ? rawFeatures : [])
        .map(raw => NotificationUtilities.parseNewFeatureConfig(raw))
        .filter((config): config is INewFeatureConfig => config !== null);

    const toast = (styleName: NotificationStyleEnum, content: string, withIcon: boolean = true) =>
        addNotification(content, styleName, withIcon ? { iconAssetUri: DEBUG_IMAGE_URL } : {});

    const detachAll = () => extensions.forEach(extension => detachExtension(extension.id));

    return (
        <DebugPanel
            title="Notifications debug"
            label="Debug Notifications"
            className="left-2"
            status={ `visible ${ visibleCount } · queue ${ queueLength } · space ${ containerHeight }px · ${ disabled ? 'DISABLED' : 'enabled' }` }>
            <DebugSection title="Channel A - toasts">
                <DebugButton onClick={ () => toast(NotificationStyleEnum.Info, 'Plain info toast without an icon.', false) }>info</DebugButton>
                <DebugButton onClick={ () => toast(NotificationStyleEnum.Info, 'Info toast with an icon.') }>info + icon</DebugButton>
                <DebugButton onClick={ () => addNotification('Achievement unlocked.', NotificationStyleEnum.Achievement, { iconAssetUri: DEBUG_IMAGE_URL, badgeId: 'ACH_Debug1', internalLink: 'questengine/achievements/debug' }) }>achievement</DebugButton>
                <DebugButton onClick={ () => toast(NotificationStyleEnum.FriendOnline, 'A friend came online.') }>friendonline 8s</DebugButton>
                <DebugButton onClick={ () => toast(NotificationStyleEnum.NftOpening, 'NFT opening, 110px tall.') }>nft_opening</DebugButton>
                <DebugButton onClick={ () => toast(NotificationStyleEnum.TreasureHunt, 'You completed 5/5 stages of the 15th Anniversary hunt!', false) }>treasure_hunt</DebugButton>
                <DebugButton onClick={ () => toast(NotificationStyleEnum.TreasureHunt, 'Treasure hunt with an explicit icon instead of the key.') }>treasure + icon</DebugButton>
                <DebugButton onClick={ () => toast(NotificationStyleEnum.Wired, 'Wired feedback message.', false) }>wired</DebugButton>
                <DebugButton onClick={ () => toast(NotificationStyleEnum.Info, 'A deliberately long notification so the box grows past its nominal height and you can watch the text wrap inside the 116px column.') }>long text</DebugButton>
            </DebugSection>
            <DebugSection title="Channel A - pipeline">
                <DebugButton onClick={ () => { toast(NotificationStyleEnum.Respect, 'You have received a respect.', false); toast(NotificationStyleEnum.Respect, 'Total respects: 42.', false); } }>respect x2</DebugButton>
                <DebugButton onClick={ () => { for (let index = 1; index <= 12; index++) toast(NotificationStyleEnum.Info, `Burst notification ${ index }.`); } }>burst x12</DebugButton>
                <DebugButton onClick={ () => console.log('[debug] unknown style returned', addNotification('Should be dropped.', 'not_a_style')) }>unknown style</DebugButton>
                <DebugButton onClick={ () => setNotificationsDisabled(!disabled) }>{ disabled ? 'enable' : 'kill-switch' }</DebugButton>
            </DebugSection>
            <DebugSection title="Channel B - showNotification">
                <DebugButton onClick={ () => showNotification(DEBUG_TYPE, { display: NotificationUtilities.DISPLAY_BUBBLE, message: 'Server driven bubble.' }) }>bubble</DebugButton>
                <DebugButton onClick={ () => showNotification(DEBUG_TYPE, { title: 'Hotel announcement', message: 'Server driven popup.' }) }>popup</DebugButton>
                <DebugButton onClick={ () => showNotification(DEBUG_TYPE, { title: 'Read more', message: 'An http link opens the page and keeps the popup open.', linkTitle: 'Open habbo.com', linkUrl: 'https://www.habbo.com' }) }>popup + http</DebugButton>
                <DebugButton onClick={ () => showNotification(DEBUG_TYPE, { title: 'Internal link', message: 'An event link closes the popup.', linkTitle: 'Go', linkUrl: 'event:navigator/goto/1' }) }>popup + event</DebugButton>
            </DebugSection>
            <DebugSection title="Channel D - extensions">
                <DebugButton onClick={ () => attachExtension({ id: NotificationUtilities.getExtensionId(NotificationExtensionEnum.ClubGift), kind: NotificationExtensionEnum.ClubGift, numGifts: 3 }) }>club gift</DebugButton>
                <DebugButton onClick={ () => attachExtension({ id: NotificationUtilities.getExtensionId(NotificationExtensionEnum.SafetyLocked), kind: NotificationExtensionEnum.SafetyLocked, statusId: 1 }) }>safety locked</DebugButton>
                { featureConfigs.map(config => (
                    <DebugButton
                        key={ config.name }
                        onClick={ () => attachExtension({ id: NotificationUtilities.getExtensionId(NotificationExtensionEnum.NewFeature, config.name), kind: NotificationExtensionEnum.NewFeature, config, countdownSeconds: 93784, linkRevealed: false }) }>
                        { config.name } ({ config.type })
                    </DebugButton>
                )) }
                <DebugButton onClick={ detachAll }>detach all</DebugButton>
            </DebugSection>
        </DebugPanel>
    );
}
