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
 * - `:fps <n>`, `:cam` / `:camera` (the `CAMERA` perk), `:fs` / `:fullscreen`, `:donate`.
 *
 * A command's second word `x` is the selected avatar's name (`withSelectedAvatarName`).
 *
 * Without the rights each asks for, the command does nothing and is not said either - unless
 * Flash breaks out of its switch for it, when it is said as chat.
 *
 * Not carried: `:shake` (no room shaking effect), `:ping` (no latency measure), `:showstats` (no
 * fps counter), `:news` / `:mail` (web embeds), `:csmm`, `:lang`, `:uc` / `:anew` (the
 * classification composer carries no type), `:screenshot`, `:iddqd` / `:flip`, `:hidemouse`,
 * `:demonictriggers`.
 */
import { AvatarExpressionEnum, ClubLevelEnum, RoomControllerLevelEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { AvatarExpressionComposer, ChatComposer, SignComposer, VisitUserComposer, WiredUpdateRoomComposer } from '@nitrodevco/nitro-packets';
import { GetTicker } from '@nitrodevco/nitro-renderer';

import { WebSocketConnection } from '#base/context/communication';
import { getRoom, roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { ClientGates, hasClientGate, PerkCodes, userStore } from '#base/context/user';

import { startTakingPhoto } from './cameraCommands';
import { openClientLink } from './clientLinkCommands';
import { goToRoom } from './navigatorCommands';
import { openFurniChooser, openUserChooser } from './roomChooserCommands';
import { ambassadorAlert, dropCarryItem, ignoreUser, kickUser, muteUser, unignoreUser } from './roomUserCommands';

type Send = WebSocketConnection['send'];

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
        case ':d':
        case ';d':
            if (hasVip()) expression(send, AvatarExpressionEnum.Laugh);
            return false;
        case ':kiss':
            if (!hasVip()) return false;
            expression(send, AvatarExpressionEnum.Blow);
            return true;
        case ':67':
            if ((systemStore.getState().config['avatar.expression.67.enabled'] !== true) || !hasVip()) return false;
            expression(send, AvatarExpressionEnum.Expression67);
            return true;
        case ':jump':
            if (!hasVip()) return false;
            expression(send, AvatarExpressionEnum.Jump);
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
            return true;
        case '_b':
            expression(send, AvatarExpressionEnum.Respect);
            return true;
        case ':fps':
            GetTicker().maxFPS = Math.min(10000, Math.max(5, Math.trunc(Number(argument)) || 0));
            return true;
        case ':sign':
            send(new SignComposer({ signType: Math.trunc(Number(argument)) || 0 }));
            return true;
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
            if (((room.getRoomValue<number>(RoomObjectVariableEnum.ChooserDisabled) ?? 0) !== 1) || (controllerLevel >= Number(RoomControllerLevelEnum.Guest))) openUserChooser();
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
