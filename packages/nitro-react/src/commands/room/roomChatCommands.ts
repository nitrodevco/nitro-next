/**
 * The room chat commands of `ChatInputWidgetHandler` (`RWCM_MESSAGE_CHAT`) that open a chooser or
 * manage the room's furni: a message whose first word is one of these is a command, and is not said.
 *
 * - `:chooser` - the user chooser, unless the room disabled it (`activeRoomHasChooserDisabled`)
 *   for someone without rights;
 * - `:furni` - the furni chooser, for rights, security 2 or an ambassador;
 * - `:pickall`, `:pickallbc`, `:resetscores`, `:ejectall` - `SessionDataManager.pickAllFurniture`,
 *   `pickAllBuilderFurniture`, `resetScores` and `ejectAllFurniture`: for the owner, a controller of
 *   any room or rights, a confirmation and then the command sent as chat
 *   (`sendSpecialCommandMessage`) - `:ejectall` as typed;
 * - `:ejectpets` - `ejectPets`, sent straight away for the owner or a controller of any room.
 *
 * - `o/`, `_o/`, `_b`, `:idle` - the wave, respect and idle expressions; `:kiss`, `:jump` (and
 *   `:67` under `avatar.expression.67.enabled`) the VIP ones, said as chat without VIP; `:d` / `;d`
 *   laugh for VIP and are said as well;
 * - `:sign <n>`, `:drop` / `:dropitem` - a sign, the hand item dropped;
 * - `:kick`, `:mute` / `:shutup <name>` - for rights (a 2 minute mute); staff (security 4) have
 *   them said, for the server's own commands;
 * - `:ignore`, `:unignore <name>`; `:visit <name>`, `:roomid <id>`;
 * - `:aalert <name>`, `:avisit [group]` - for an ambassador or security 4;
 * - `:reload`, `:rollback` - the room's wired, after a confirmation, for the owner or security 5;
 * - `:floor` / `:bcfloor` - the floor plan editor for a group admin or the owner;
 * - `:moonwalk`, `:habnam`, `:yyxxabxa`, `:mutepets`, `:mpgame` - `sendSpecialCommandMessage`;
 * - `:fps <n>`, `:cam` / `:camera` (the `CAMERA` perk), `:fs` / `:fullscreen`, `:donate`;
 * - `:shake`, `:iddqd` / `:flip` - the room shaking or turned over (the special room effects');
 * - `:ping` - the latency as a chat bubble; `:showstats` - the canvas's fps counter;
 * - `:screenshot`, `:hidemouse`, `:demonictriggers` - the room saved as a PNG, the mouse and tile
 *   cursor hidden or shown, the wired triggers inverted or not (`roomDebugCommands`);
 * - `:lang <name>` - the texts of another `localization.<n>` definition;
 * - `:uc <type>`, `:uc hotel <type>` - the room's or the hotel's users of a classification, for
 *   security 4; `:anew` the room's new users, for an ambassador or security 4;
 * - `:news` - the community news page under `client.news.embed.enabled`; `:mail` under
 *   `client.minimail.embed.enabled` - with no page around the client, neither opens an embed.
 *
 * A command's second word `x` is the selected avatar's name (`withSelectedAvatarName`).
 *
 * Without the rights each asks for, the command does nothing and is not said either - unless
 * Flash breaks out of its switch for it, when it is said as chat.
 *
 * What is said instead - chat, a shout, a whisper - and the typing state go out through
 * `RoomSession`'s `sendChatMessage`, `sendShoutMessage`, `sendWhisperMessage` and
 * `sendChatTypingMessage` (`sayChat`, `shoutChat`, `whisperChat`, `sendChatTyping`).
 *
 * Not carried: `:csmm` (`GameManager.generateChecksumMismatch`, for the game centre, which is not
 * ported).
 */
import { AvatarExpressionEnum, ClubLevelEnum, RoomControllerLevelEnum, RoomZoomEvent } from '@nitrodevco/nitro-api';
import { AvatarExpressionComposer, CancelTypingComposer, ChatComposer, PeerUsersClassificationComposer, RoomUsersClassificationComposer, ShoutComposer, SignComposer, StartTypingComposer, VisitUserComposer, WhisperComposer, WiredUpdateRoomComposer } from '@nitrodevco/nitro-packets';
import { GetTicker, RoomShakingEffect } from '@nitrodevco/nitro-renderer';

import { Send } from '#base/context/communication';
import { getRoom, roomStore } from '#base/context/room';
import { configBoolean, configString, systemStore } from '#base/context/system';
import { ClientGates, hasClientGate, PerkCodes, userStore } from '#base/context/user';
import { openHabboMainPage } from '#base/utils';

import { goToRoom } from '../navigator/navigatorCommands';
import { openClientLink } from '../system/clientLinkCommands';
import { showOwnPingChat } from '../system/latencyCommands';
import { activateLocalizationDefinition } from '../system/localizationCommands';
import { nextChatTrackingId, trackEventLog } from '../system/trackingCommands';
import { startTakingPhoto } from './cameraCommands';
import { openFurniChooser, openUserChooser } from './roomChooserCommands';
import { createRoomScreenshot, enableRoomFpsCounter, toggleDemonicTriggers, toggleRoomMouseHidden } from './roomDebugCommands';
import { ambassadorAlert, dropCarryItem, ignoreUser, kickUser, muteUser, unignoreUser } from './roomUserCommands';

/** `sendSpecialCommandMessage`: the command goes to the server as a chat message. */
const sendSpecialCommand = (send: Send, text: string) => send(new ChatComposer({ text, styleId: 0 }));

/** `isRoomOwner || isAnyRoomController || roomControllerLevel >= 1`. */
const mayManageFurni = () => {
    const { isRoomOwner, controllerLevel } = roomStore.getState();

    return isRoomOwner || hasClientGate(ClientGates.AnyRoomController) || (Number(controllerLevel) >= Number(RoomControllerLevelEnum.Guest));
};

/** `windowManager.confirm("${generic.alert.title}", message)`, sending the command on OK. */
const confirmSpecialCommand = (send: Send, messageKey: string, text: string) => {
    const { interpolate, showConfirm } = systemStore.getState();

    showConfirm(interpolate('${generic.alert.title}'), interpolate(`\${${messageKey}}`), () => sendSpecialCommand(send, text));
};

/** `getUserDataByName`. */
const roomUserByName = (name: string) => Object.values(roomStore.getState().usersByRoomObjectId).find(user => user.name === name);

const hasVip = () => Number(userStore.getState().clubLevel) >= Number(ClubLevelEnum.Vip);

/** `isAmbassador || hasSecurity(4)`. */
const isAmbassadorOrStaff = () => userStore.getState().isAmbassador || hasClientGate(ClientGates.ChatStaffCommands);

const expression = (send: Send, type: AvatarExpressionEnum) => send(new AvatarExpressionComposer({ expressionType: type }));

/** `onReloadConfirmed` / `onRollbackConfirmed`: `WiredUpdateRoomComposer(rollback)` after the confirmation. */
const confirmWiredRoomState = (send: Send, rollback: boolean) => {
    const { interpolate, showConfirm } = systemStore.getState();
    const key = rollback ? 'wiredmenu.settings.room_state.roll_back' : 'wiredmenu.settings.room_state.reload';

    showConfirm(interpolate(`\${${key}}`), interpolate(`\${${key}.warning}`), () => send(new WiredUpdateRoomComposer({ rollback })));
};

/**
 * `HabboWebTools.openNews` without a page around the client: `openWebHabblet('news')`, the
 * community news under `url.prefix` in the hotel's main window.
 */
const openNews = () => {
    openHabboMainPage(`${configString('url.prefix')}/community/category/all/1/`);
};

/** `windowManager.toggleFullScreen`. */
const toggleFullScreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined);
    else void document.documentElement.requestFullscreen().catch(() => undefined);
};

/**
 * `ChatInputWidgetHandler`: a command's second word `x` is the selected avatar's name - `:kick x`
 * kicks whoever is selected. The line as it is to be run, and said.
 */
export const withSelectedAvatarName = (text: string): string => {
    const words = text.split(' ');

    if ((words[0].charAt(0) !== ':') || (words[1] !== 'x')) return text;

    const { selectedAvatarId, usersByRoomObjectId } = roomStore.getState();
    const user = (selectedAvatarId > -1) ? usersByRoomObjectId[selectedAvatarId] : undefined;

    return user ? text.replace(' x', ` ${user.name}`) : text;
};

/** Runs `text` when it is one of these room commands; `true` when it was one. */
export const runRoomChatCommand = (send: Send, text: string): boolean => {
    const room = getRoom();

    if (!room) return false;

    const controllerLevel = Number(roomStore.getState().controllerLevel);
    const words = text.split(' ');
    const command = words[0].toLowerCase();
    const argument = words[1] ?? '';

    switch (command) {
        case ':shake':
            RoomShakingEffect.init(250, 5000);
            RoomShakingEffect.turnVisualizationOn();
            return true;
        case ':ping':
            // A ping chat of the user's own with `HabboTracking.latencyPingMs`.
            showOwnPingChat();
            return true;
        case ':showstats':
            enableRoomFpsCounter();
            return true;
        case ':screenshot':
            createRoomScreenshot();
            return true;
        case ':hidemouse':
            toggleRoomMouseHidden();
            return true;
        case ':demonictriggers':
            toggleDemonicTriggers();
            return true;
        case ':news':
            if (!configBoolean('client.news.embed.enabled')) return false;
            openNews();
            return true;
        case ':mail':
            // `HabboWebTools.openMinimail`: with no page around the client, `openWebHabblet('minimail')`
            // knows no such habblet and opens nothing.
            return configBoolean('client.minimail.embed.enabled');
        case ':iddqd':
        case ':flip':
            // `RoomEngineZoomEvent(activeRoomId, -1, true)`: the room turned upside down.
            room.eventDispatcher.dispatchEvent(new RoomZoomEvent(room.roomId, -1, true));
            return true;
        case ':lang':
            // `activateLocalizationDefinition`: the texts of the hotel definition `localization.<n>` names.
            activateLocalizationDefinition(argument);
            return true;
        case ':uc':
            if (hasClientGate(ClientGates.ChatStaffCommands)) {
                if (argument === 'hotel') send(new PeerUsersClassificationComposer({ classification: words[2] ?? '' }));
                else send(new RoomUsersClassificationComposer({ classification: argument }));
            }
            return true;
        case ':anew':
            if (isAmbassadorOrStaff()) send(new RoomUsersClassificationComposer({ classification: 'new' }));
            return true;
        case ':d':
        case ';d':
            if (hasVip()) {
                expression(send, AvatarExpressionEnum.Laugh);
                trackEventLog(send, 'OwnAvatarMenu', 'chat', 'laugh');
            }
            return false;
        case ':kiss':
            if (!hasVip()) return false;
            expression(send, AvatarExpressionEnum.Blow);
            trackEventLog(send, 'OwnAvatarMenu', 'chat', 'blow');
            return true;
        case ':67':
            if ((!configBoolean('avatar.expression.67.enabled')) || !hasVip()) return false;
            expression(send, AvatarExpressionEnum.Expression67);
            trackEventLog(send, 'OwnAvatarMenu', 'chat', '67');
            return true;
        case ':jump':
            if (!hasVip()) return false;
            expression(send, AvatarExpressionEnum.Jump);
            trackEventLog(send, 'OwnAvatarMenu', 'chat', 'jump');
            return true;
        case ':kick':
        case ':shutup':
        case ':mute': {
            if (hasClientGate(ClientGates.ChatStaffCommands)) return false;

            const user = (controllerLevel >= Number(RoomControllerLevelEnum.Guest)) ? roomUserByName(argument) : undefined;

            if (user && (command === ':kick')) kickUser(send, user.webID);
            else if (user) muteUser(send, user.webID, 2);
            return true;
        }
        case 'o/':
        case '_o/':
            expression(send, AvatarExpressionEnum.Wave);
            return true;
        case ':idle':
            expression(send, AvatarExpressionEnum.Idle);
            trackEventLog(send, 'OwnAvatarMenu', 'chat', 'idle');
            return true;
        case '_b':
            expression(send, AvatarExpressionEnum.Respect);
            trackEventLog(send, 'OwnAvatarMenu', 'chat', 'respect');
            return true;
        case ':fps':
            GetTicker().maxFPS = Math.min(10000, Math.max(5, Math.trunc(Number(argument)) || 0));
            return true;
        case ':sign': {
            const signType = Math.trunc(Number(argument)) || 0;

            send(new SignComposer({ signType }));
            trackEventLog(send, 'OwnAvatarMenu', 'chat', 'sign', '', signType);
            return true;
        }
        case ':drop':
        case ':dropitem':
            dropCarryItem(send);
            return true;
        case ':reload':
        case ':rollback':
            if ((controllerLevel >= Number(RoomControllerLevelEnum.RoomOwner)) || hasClientGate(ClientGates.RoomStateAnyRoom)) confirmWiredRoomState(send, command === ':rollback');
            return true;
        case ':moonwalk':
        case ':habnam':
        case ':yyxxabxa':
        case ':mutepets':
            sendSpecialCommand(send, command);
            return true;
        case ':mpgame':
            sendSpecialCommand(send, text);
            return true;
        case ':ignore':
        case ':unignore': {
            const user = argument ? roomUserByName(argument) : undefined;

            if (user && (command === ':ignore')) ignoreUser(send, user.webID);
            else if (user) unignoreUser(send, user.webID);
            return true;
        }
        case ':floor':
        case ':bcfloor':
            if (controllerLevel >= Number(RoomControllerLevelEnum.GuildAdmin)) systemStore.getState().showWindow('floor_plan_editor');
            return true;
        case ':avisit':
            if (isAmbassadorOrStaff()) openClientLink(send, (argument === 'group') ? 'navigator/goto/predefined_group_lobby' : 'navigator/goto/predefined_noob_lobby');
            return true;
        case ':aalert': {
            const user = isAmbassadorOrStaff() ? roomUserByName(argument) : undefined;

            if (user) ambassadorAlert(send, user.webID);
            return true;
        }
        case ':visit':
            send(new VisitUserComposer({ playerName: argument }));
            return true;
        case ':roomid':
            goToRoom(send, parseInt(argument, 10));
            return true;
        case ':cam':
        case ':camera':
            if (userStore.getState().perks.get(PerkCodes.Camera)?.isAllowed === true) startTakingPhoto();
            return true;
        case ':fs':
        case ':fullscreen':
            toggleFullScreen();
            return true;
        case ':donate':
            openClientLink(send, 'selfdonation/open');
            return true;
        case ':chooser':
            openUserChooser();
            return true;
        case ':furni':
            if ((controllerLevel >= Number(RoomControllerLevelEnum.Guest)) || hasClientGate(ClientGates.FurniChooserAnyRoom) || userStore.getState().isAmbassador) openFurniChooser();
            return true;
        case ':pickall':
            if (mayManageFurni()) confirmSpecialCommand(send, 'room.confirm.pick_all', ':pickall');
            return true;
        case ':pickallbc':
            if (mayManageFurni()) confirmSpecialCommand(send, 'room.confirm.pick_all_bc', ':pickallbc');
            return true;
        case ':resetscores':
            if (mayManageFurni()) confirmSpecialCommand(send, 'room.confirm.resetscores', ':resetscores');
            return true;
        case ':ejectall':
            if (mayManageFurni()) confirmSpecialCommand(send, 'room.confirm.eject_all', text);
            return true;
        case ':ejectpets':
            if (roomStore.getState().isRoomOwner || hasClientGate(ClientGates.AnyRoomController)) sendSpecialCommand(send, ':ejectpets');
            return true;
    }

    return false;
};

/** `RoomSession.sendChatMessage`: a line said in the chat style, with the tracking id its echo is timed by (`chatLagDetected`). */
export const sayChat = (send: Send, text: string, styleId: number) => send(new ChatComposer({ text, styleId, trackingId: nextChatTrackingId() }));

/** `RoomSession.sendShoutMessage`. */
export const shoutChat = (send: Send, text: string, styleId: number) => send(new ShoutComposer({ text, styleId }));

/** `RoomSession.sendWhisperMessage`: to the named user only. */
export const whisperChat = (send: Send, recipientName: string, text: string, styleId: number) => send(new WhisperComposer({ recipientName, text, styleId }));

/** `RoomSession.sendChatTypingMessage`: the typing bubble shown or taken away. */
export const sendChatTyping = (send: Send, typing: boolean) => send(typing ? new StartTypingComposer({}) : new CancelTypingComposer({}));
