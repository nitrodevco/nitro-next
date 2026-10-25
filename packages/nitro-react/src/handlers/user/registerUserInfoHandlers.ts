import { AvatarGenderType, ChangeUserNameResultMessageCode, ClubLevelEnum } from '@nitrodevco/nitro-api';
import { AccountPreferencesEventMessage, AccountSafetyLockStatusChangeMessage, AvailabilityStatusMessage, ChangeUserNameResultMessage, DiscordPreferencesMessage, EmailStatusResultEventMessage, FigureUpdateEventMessage, GetDailyTasksComposer, GetDiscordPreferencesComposer, GetSoundSettingsComposer, GetUserNftChatStylesComposer, InClientLinkMessage, MysteryBoxKeysMessage, NoobnessLevelMessage, PerkAllowancesMessage, PetRespectFailedMessage, TurboClientCapabilitiesComposer, TurboPermissionNodesMessage, TurboServerCapabilitiesMessage, UserNameChangedMessage, UserNftChatStylesMessage, UserObjectMessage, UserPurchasableChatStyleChangedMessage, UserPurchasableChatStylesMessage, UserRightsMessage } from '@nitrodevco/nitro-packets';
import { clampChatFontSizeMode } from '@nitrodevco/nitro-theme/chat';

import { onNameChangeChanged, openClientLink, TURBO_LIVE_NOTICES_CAPABILITY } from '#base/commands';
import { setBugReportCaptureEnabled, TURBO_BUG_REPORT_CAPABILITY } from '#base/context/bugreport';
import { TURBO_CLIENT_MESSAGES_CAPABILITY, TURBO_CLIENT_MODULES_CAPABILITY, TURBO_WEB_SESSION_CAPABILITY } from '#base/context/client-modules';
import { setClientErrorReporting, TURBO_CLIENT_ERRORS_CAPABILITY } from '#base/context/clienterrors';
import { WebSocketConnection } from '#base/context/communication';
import { TURBO_STARTER_ROOMS_CAPABILITY } from '#base/context/onboarding';
import { configBoolean, systemStore } from '#base/context/system';
import { SOUND_VOLUME_SCALE, TURBO_CHAT_COMMANDS_CAPABILITY, TURBO_PERMISSION_NODES_CAPABILITY, userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * Who you are - Flash's `SessionDataManager`: the user object at login, figure and name changes,
 * rights, noobness level, email status, the account preferences and the chat styles the account
 * owns (NFT and bought ones, which the chat input's style picker offers), and the links the server
 * asks the client to open (`onInClientLink`: `createLinkEvent`, here `openClientLink`). Also gives a pet respect
 * back when the server refuses one (`onPetRespectFailed`): the respect was spent when it was sent,
 * and follows the account's safety lock (`onAccountSafetyLockStatusChanged`: locked while the status is 0)
 * and the hotel's availability (`onAvailabilityStatus`), which trading checks for a shutdown. It
 * keeps the colours of the mystery box and key the account collects (`onMysteryBoxKeys`), which
 * the mystery box tracker and open dialog draw.
 *
 * Not Flash's: after the user object it asks the server for Turbo's `permission.nodes` and
 * `chat.commands.v2` extensions, unless `turbo.extensions.disabled` is set. A Turbo server answers and sends the nodes the user
 * holds, which every `ClientGate` then asks, and the chat command tree; any other server ignores the unknown packet and the
 * gates keep to `securityLevel`. Nodes are taken only once the server has accepted the extension,
 * so a server that happens to use the same header for something else cannot feed the gates.
 */
export const registerUserInfoHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { setAvailabilityStatus, setRights, setPermissionNodes, setChatCommands, setTurboCapabilities, mergePerks, setNoobnessLevel, increasePetRespects, setChatPreferences, setSoundVolumes, setUiFlags, setRoomCameraFollowDisabled, setRoomInvitesIgnored, setOnlineIndicatorPreference, setDiscordPreferences, setUserInfo, setName, setFigure, setAccountSafetyLocked, setEmailVerified, setNftChatStyles, setPurchasableChatStyles, setPurchasableChatStyleOwned, setMysteryBoxKeys } = userStore.getState();

    return subscribeAll(subscribe, [
        on(DiscordPreferencesMessage, (data) => {
            setDiscordPreferences(data);
        }),

        on(FigureUpdateEventMessage, (data) => {
            setFigure(data.figure, data.gender as AvatarGenderType);
        }),

        on(UserObjectMessage, (data) => {
            setUserInfo(data.userInfo);
            // `SessionDataManager.initSessionData`: the NFT chat styles and the daily tasks (whose
            // answer may announce a bonus task before the window is ever opened).
            send(new GetUserNftChatStylesComposer({}));
            send(new GetDailyTasksComposer({}));
            // `HabboSoundManagerFlash10.initComponent`: asks for the sound settings `AccountPreferences` answers.
            send(new GetSoundSettingsComposer({}));
            // `DiscordSettingsController.initComponent` asks once, in the same burst as the rest.
            send(new GetDiscordPreferencesComposer({}));
            if (!configBoolean('turbo.extensions.disabled')) send(new TurboClientCapabilitiesComposer({ capabilities: [ { name: TURBO_PERMISSION_NODES_CAPABILITY, version: 1 }, { name: TURBO_CHAT_COMMANDS_CAPABILITY, version: 1 }, { name: TURBO_STARTER_ROOMS_CAPABILITY, version: 1 }, { name: TURBO_BUG_REPORT_CAPABILITY, version: 1 }, { name: TURBO_CLIENT_ERRORS_CAPABILITY, version: 1 }, { name: TURBO_LIVE_NOTICES_CAPABILITY, version: 1 }, { name: TURBO_CLIENT_MODULES_CAPABILITY, version: 1 }, { name: TURBO_CLIENT_MESSAGES_CAPABILITY, version: 1 }, { name: TURBO_WEB_SESSION_CAPABILITY, version: 1 } ] }));
        }),

        // A Turbo server that declined `permission.nodes` leaves the gates on the level.
        on(TurboServerCapabilitiesMessage, (data) => {
            const capabilities = new Map(data.capabilities.map(x => [ x.name, x.version ]));

            setTurboCapabilities(capabilities);

            if (!capabilities.has(TURBO_PERMISSION_NODES_CAPABILITY)) setPermissionNodes(null);
            // One that declined `chat.commands.v2` leaves the chat input completing nothing, as Flash's.
            if (!capabilities.has(TURBO_CHAT_COMMANDS_CAPABILITY)) setChatCommands(null);
            // The bug report plugin's capture records only once its server has accepted it.
            setBugReportCaptureEnabled(capabilities.has(TURBO_BUG_REPORT_CAPABILITY));
            // The client errors plugin's reporter listens only once its server has accepted it.
            setClientErrorReporting(capabilities.has(TURBO_CLIENT_ERRORS_CAPABILITY), send);
        }),

        on(TurboPermissionNodesMessage, (data) => {
            if (userStore.getState().turboCapabilities.has(TURBO_PERMISSION_NODES_CAPABILITY)) setPermissionNodes(new Set(data.nodes));
        }),

        // `PerkManager.onPerkAllowances`.
        on(PerkAllowancesMessage, data => mergePerks(data.perks)),

        on(UserNftChatStylesMessage, (data) => {
            setNftChatStyles(data.chatStyleIds);
        }),

        on(UserPurchasableChatStylesMessage, (data) => {
            setPurchasableChatStyles(data.chatStyleIds);
        }),

        on(UserPurchasableChatStyleChangedMessage, (data) => {
            setPurchasableChatStyleOwned(data.styleId, data.added);
        }),

        on(NoobnessLevelMessage, (data) => {
            setNoobnessLevel(data.noobnessLevel);
        }),

        on(MysteryBoxKeysMessage, data => setMysteryBoxKeys(data.boxColor, data.keyColor)),

        on(AvailabilityStatusMessage, data => setAvailabilityStatus(data.isOpen, data.onShutDown, data.isAuthenticHabbo)),

        // `SessionDataManager.onUserRights`: any club at all is kept as VIP (`clubLevel != 0 ? 2 : 0`).
        on(UserRightsMessage, (data) => {
            setRights((data.clubLevel !== ClubLevelEnum.None) ? ClubLevelEnum.Vip : ClubLevelEnum.None, data.securityLevel, data.isAmbassador);
        }),

        // `SessionDataManager.onPetRespectFailed`: the respect `givePetRespect` took is returned.
        on(PetRespectFailedMessage, () => increasePetRespects()),

        on(InClientLinkMessage, data => openClientLink(send, data.link)),

        on(ChangeUserNameResultMessage, (data) => {
            // `NameChangeController.onChangeUserNameResult`: the own avatar menu's window closes, or shows why not.
            onNameChangeChanged(data.resultCode, data.name, data.nameSuggestions);

            if (data.resultCode !== ChangeUserNameResultMessageCode.NameOk) return;

            setName(data.name, false);

            // `NameChangeController.onUserNameChanged`: every name change the server confirms is
            // announced, the new user flow's included.
            const { getLocalizationValue, showAlert } = systemStore.getState();

            showAlert(getLocalizationValue('generic.notice', 'Notice'), getLocalizationValue('help.tutorial.name.changed', 'Your Habbo name is now changed to %name%!', { name: data.name }));
        }),

        on(UserNameChangedMessage, (data) => {
            if (data.webId !== userStore.getState().userId) return;

            setName(data.newName, false);
        }),

        on(AccountSafetyLockStatusChangeMessage, data => setAccountSafetyLocked(data.status === 0)),

        on(EmailStatusResultEventMessage, (data) => {
            setEmailVerified(data.isVerified);
        }),

        on(AccountPreferencesEventMessage, (data) => {
            setUiFlags(data.uiFlags);
            /*
             * `HabboSoundManagerFlash10.onSoundSettingsEvent`: each percentage is scaled back to
             * 0..1, and a `uiVolume` of exactly 1 is read as 100 - an old stored value that would
             * otherwise mute the client's own sounds to a hundredth.
             */
            setSoundVolumes(
                ((data.uiVolume === 1) ? SOUND_VOLUME_SCALE : data.uiVolume) / SOUND_VOLUME_SCALE,
                data.furniVolume / SOUND_VOLUME_SCALE,
                data.traxVolume / SOUND_VOLUME_SCALE,
            );
            setRoomCameraFollowDisabled(data.roomCameraFollowDisabled);
            setRoomInvitesIgnored(data.roomInvitesIgnored);
            setOnlineIndicatorPreference(data.onlineIndicatorPreference);
            setChatPreferences({
                preferredChatStyle: data.preferedChatStyle,
                // `HabboFreeFlowChat.onAccountPreferences`: `clampChatFontSizeMode(chatSizePreference)`.
                chatSizePreference: clampChatFontSizeMode(data.chatSizePreference),
                chatMode: data.chatMode,
                chatBubbleWidth: data.chatBubbleWidth,
                chatScrollSpeed: data.chatScrollSpeed,
            });
        }),
    ]);
};
