import { ISimpleRoomObjectData, RoomControllerLevelEnum } from '@nitrodevco/nitro-api';

import { commandBot, openClientLink, pickUpBot } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { BOT_SKILL_CHANGE_NAME, BOT_SKILL_SETUP_CHAT, useIsRoomOwner, useOwnControllerLevel, useRoomBotsActions, useRoomStore, useRoomUserByObjectId } from '#base/context/room';
import { useWiredShowInspectButton } from '#base/context/wired';
import { TemplateBindings, TemplateWindow } from '#base/theme';

import { useButtonMenu, useMinimizedMenu } from './useButtonMenu';

/**
 * The menu over a rentable bot - `RentableBotMenuView`, drawn from the
 * `habbo-room-ui-com/avatar_menu_widget` template it shares with `AvatarMenuView`. What it offers
 * is what the bot can do: each of its skills adds a button, some only for its owner, and a few
 * skills carry a label and a target in their command data that become buttons of their own - clones
 * of the layout's `link_template` and `nux_proceed_1`, which the layout keeps hidden.
 *
 * The list's items are the shown rows in the layout's child order (`LAYOUT_ORDER`), each a clone of
 * its layout row: hiding the rest and adding the clones, as `updateButtons` does, comes to that.
 * The captions are the layout's: `nux_take_tour` is `${avatar.widget.nux.take.tour}` and
 * `nux_proceed_1` `${avatar.widget.nux.proceed}`. Neither text file defines them today; they are
 * Flash's keys all the same, so they stay.
 */
export interface InfoBubbleRentableBotViewProps {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
}

/** `BotSkillEnum` ids the menu offers buttons for. */
const SKILL_DRESS_UP = 1;
const SKILL_RANDOM_WALK = 3;
const SKILL_DANCE = 4;
const SKILL_NUX_TAKE_TOUR = 10;
const SKILL_NO_PICK_UP = 12;
const SKILL_DONATE_TO_USER = 24;
const SKILL_DONATE_TO_ALL = 25;
/** Skills whose command data makes a button of its own: a label and a target, comma separated. */
const SKILL_LINK = 7;
const SKILL_NUX_PROCEED = 8;
const SKILL_NAVIGATOR_SEARCH = 14;

type MenuButton = {
    /** Unique in the menu. */
    key: string;
    /** The layout's row it is, or is a clone of: `link_template` for a link, `nux_proceed_1` for a later step. */
    row: string;
    /** Over the row's own caption. */
    caption?: string;
    onPress: () => void;
};

/**
 * Where each button falls in `avatar_menu_widget`'s child order. The `nux_proceed_<n>` clones go in
 * after `nux_proceed_1` (`addListItemAt`), and the link and search clones of `link_template` at
 * the end of the list (`addListItem`).
 */
const LAYOUT_ORDER = [ 'change_bot_name', 'dress_up', 'setup_chat', 'random_walk', 'dance', 'pick', 'nux_proceed_1', 'nux_take_tour', 'donate_to_all', 'donate_to_user', 'wired_inspect', 'link_template' ];

export const InfoBubbleRentableBotView = ({ objectData, onClose }: InfoBubbleRentableBotViewProps) => {
    const userData = useRoomUserByObjectId(objectData.objectId);
    const skillsWithCommands = useRoomStore(x => (userData ? x.botSkillsById[userData.webID] : undefined));
    const isRoomOwner = useIsRoomOwner();
    const controllerLevel = useOwnControllerLevel();
    const { send } = useWebSocketContext();
    const { openBotSkillConfiguration } = useRoomBotsActions();
    const showWiredInspect = useWiredShowInspectButton();
    const { button } = useButtonMenu();
    const { minimizedView, bindings: minimizeBindings } = useMinimizedMenu();

    if (!userData) return null;
    if (minimizedView) return minimizedView;

    const botId = userData.webID;
    const skills = userData.botSkills ?? [];
    const has = (skill: number) => skills.includes(skill);
    const canManage = isRoomOwner || (controllerLevel >= RoomControllerLevelEnum.Guest);
    const command = (skill: number, data = '') => () => commandBot(send, botId, skill, data);
    const configure = (skill: number) => () => openBotSkillConfiguration(botId, skill);

    const buttons: MenuButton[] = [];
    const add = (visible: boolean, key: string, onPress: () => void, row = key, caption?: string) => {
        if (visible) buttons.push({ key, row, caption, onPress });
    };

    add(canManage && !has(SKILL_NO_PICK_UP), 'pick', () => pickUpBot(send, botId));
    add(has(SKILL_DONATE_TO_ALL), 'donate_to_all', command(SKILL_DONATE_TO_ALL));
    add(has(SKILL_DONATE_TO_USER), 'donate_to_user', command(SKILL_DONATE_TO_USER));
    add(isRoomOwner && has(BOT_SKILL_CHANGE_NAME), 'change_bot_name', configure(BOT_SKILL_CHANGE_NAME));
    add(isRoomOwner && has(SKILL_DRESS_UP), 'dress_up', command(SKILL_DRESS_UP));
    add(isRoomOwner && has(SKILL_RANDOM_WALK), 'random_walk', command(SKILL_RANDOM_WALK));
    add(isRoomOwner && has(BOT_SKILL_SETUP_CHAT), 'setup_chat', configure(BOT_SKILL_SETUP_CHAT));
    add(isRoomOwner && has(SKILL_DANCE), 'dance', command(SKILL_DANCE));
    add(has(SKILL_NUX_TAKE_TOUR), 'nux_take_tour', command(SKILL_NUX_TAKE_TOUR));

    for (const skill of skillsWithCommands ?? []) {
        const [ label, target ] = skill.data.split(',');

        switch (skill.id) {
            case SKILL_LINK:
                if (target !== undefined) add(true, `link_${label}`, () => openClientLink(send, target), 'link_template', label);
                break;
            case SKILL_NAVIGATOR_SEARCH:
                if (target !== undefined) add(true, `search_${label}`, () => openClientLink(send, `navigator/search/${target}`), 'link_template', label);
                break;
            case SKILL_NUX_PROCEED:
                // An empty step is the first one, under the layout's own caption.
                if (!skill.data.length) add(true, 'nux_proceed_1', command(SKILL_NUX_PROCEED, '1'));
                else if (target !== undefined) add(true, `nux_proceed_${target}`, command(SKILL_NUX_PROCEED, target), 'nux_proceed_1', label);
                break;
        }
    }

    // `RWUAM_WIRED_INSPECT_BOT`: the wired menu's inspection of this bot.
    add(showWiredInspect, 'wired_inspect', () => openClientLink(send, `wiredmenu/open/inspection/1/${objectData.objectId}`));

    // A stable sort: buttons of one rank keep the order they were added in.
    const ordered = [ ...buttons ].sort((a, b) => LAYOUT_ORDER.indexOf(a.row) - LAYOUT_ORDER.indexOf(b.row));

    const bindings: TemplateBindings = {
        ...minimizeBindings,
        name: { caption: userData.name, setCaptionAfterBuild: true },
        relationship_status: { visible: false },
        buttons: {
            items: ordered.map(({ key, row, caption, onPress }) => ({
                key,
                from: row,
                bindings: {
                    // `link_template` and `nux_proceed_1` are hidden in the layout; a clone is shown.
                    '': { visible: true },
                    button: button(`${key}/button`, () => {
                        onPress();
                        onClose();
                    }),
                    'button/label': { caption },
                },
            })),
        },
    };

    return (
        <TemplateWindow
            id="habbo-room-ui-com/avatar_menu_widget"
            bindings={bindings}
        />
    );
};
