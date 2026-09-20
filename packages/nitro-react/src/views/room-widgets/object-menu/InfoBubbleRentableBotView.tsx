import { ISimpleRoomObjectData, RoomControllerLevelEnum } from '@nitrodevco/nitro-api';
import { CommandBotComposer, RemoveBotFromFlatComposer } from '@nitrodevco/nitro-packets';

import { openClientLink } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { BOT_SKILL_CHANGE_NAME, BOT_SKILL_SETUP_CHAT, useOwnControllerLevel, useRoomBotsActions, useRoomStore } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { useWiredShowInspectButton } from '#base/context/wired';
import { Box, Bubble, ThemeText } from '#base/theme';

import { InfoBubbleMenuButton } from './InfoBubbleMenuButton';
import { InfoBubbleMinimize } from './InfoBubbleMinimize';

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

type MenuButton = { key: string; caption: string; onPress: () => void };

/**
 * The menu over a rentable bot - `RentableBotMenuView`. What it offers is what the bot can do:
 * each of its skills adds a button, some only for its owner, and a few skills carry a label and
 * a target in their command data that become buttons of their own.
 *
 * The captions are the `avatar_menu_widget` layout's: `nux_take_tour` is
 * `${avatar.widget.nux.take.tour}` and `nux_proceed_1` `${avatar.widget.nux.proceed}`. Neither
 * text file defines them today; they are Flash's keys all the same, so they stay.
 */
export const InfoBubbleRentableBotView = ({ objectData, onClose }: InfoBubbleRentableBotViewProps) => {
    const userData = useRoomStore(x => x.usersByRoomObjectId[objectData.objectId]);
    const skillsWithCommands = useRoomStore(x => (userData ? x.botSkillsById[userData.webID] : undefined));
    const isRoomOwner = useRoomStore(x => x.isRoomOwner);
    const controllerLevel = useOwnControllerLevel();
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const { openBotSkillConfiguration } = useRoomBotsActions();
    const showWiredInspect = useWiredShowInspectButton();

    if (!userData) return null;

    const botId = userData.webID;
    const skills = userData.botSkills ?? [];
    const has = (skill: number) => skills.includes(skill);
    const canManage = isRoomOwner || (controllerLevel >= RoomControllerLevelEnum.Guest);
    const command = (skill: number, data = '') => () => send(new CommandBotComposer({ botId, skillType: skill, command: data }));
    const configure = (skill: number) => () => openBotSkillConfiguration(botId, skill);

    const buttons: MenuButton[] = [];
    const add = (visible: boolean, key: string, caption: string, onPress: () => void) => {
        if (visible) buttons.push({ key, caption, onPress });
    };

    add(canManage && !has(SKILL_NO_PICK_UP), 'pick', t('avatar.widget.pick_up'), () => send(new RemoveBotFromFlatComposer({ botId })));
    add(has(SKILL_DONATE_TO_ALL), 'donate_to_all', t('avatar.widget.dta'), command(SKILL_DONATE_TO_ALL));
    add(has(SKILL_DONATE_TO_USER), 'donate_to_user', t('avatar.widget.dtu'), command(SKILL_DONATE_TO_USER));
    add(isRoomOwner && has(BOT_SKILL_CHANGE_NAME), 'change_bot_name', t('avatar.widget.change_bot_name'), configure(BOT_SKILL_CHANGE_NAME));
    add(isRoomOwner && has(SKILL_DRESS_UP), 'dress_up', t('avatar.widget.dress_up'), command(SKILL_DRESS_UP));
    add(isRoomOwner && has(SKILL_RANDOM_WALK), 'random_walk', t('avatar.widget.random_walk'), command(SKILL_RANDOM_WALK));
    add(isRoomOwner && has(BOT_SKILL_SETUP_CHAT), 'setup_chat', t('avatar.widget.setup_chat'), configure(BOT_SKILL_SETUP_CHAT));
    add(isRoomOwner && has(SKILL_DANCE), 'dance', t('avatar.widget.dance'), command(SKILL_DANCE));
    add(has(SKILL_NUX_TAKE_TOUR), 'nux_take_tour', t('avatar.widget.nux.take.tour'), command(SKILL_NUX_TAKE_TOUR));

    for (const skill of skillsWithCommands ?? []) {
        const [ label, target ] = skill.data.split(',');

        switch (skill.id) {
            case SKILL_LINK:
                if (target !== undefined) add(true, `link_${label}`, label, () => openClientLink(send, target));
                break;
            case SKILL_NAVIGATOR_SEARCH:
                if (target !== undefined) add(true, `search_${label}`, label, () => openClientLink(send, `navigator/search/${target}`));
                break;
            case SKILL_NUX_PROCEED:
                // An empty step is the first one, under the layout's own caption.
                if (!skill.data.length) add(true, 'nux_proceed_1', t('avatar.widget.nux.proceed'), command(SKILL_NUX_PROCEED, '1'));
                else if (target !== undefined) add(true, `nux_proceed_${target}`, label, command(SKILL_NUX_PROCEED, target));
                break;
        }
    }

    // `RWUAM_WIRED_INSPECT_BOT`: the wired menu's inspection of this bot.
    add(showWiredInspect, 'wired_inspect', t('infostand.button.wired_inspect'), () => openClientLink(send, `wiredmenu/open/inspection/1/${objectData.objectId}`));

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            layout={{ flexDirection: 'column' }}
        >
            <Box layout={{ minWidth: 137, maxWidth: 137, flexDirection: 'column', marginLeft: 1, marginRight: 1 }}>
                <Box layout={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', minHeight: 24, maxHeight: 24 }}>
                    <ThemeText
                        text={userData.name}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Box>
                <Box layout={{ flexDirection: 'column', width: '100%', gap: 1 }}>
                    {buttons.map(button => (
                        <InfoBubbleMenuButton
                            key={button.key}
                            caption={button.caption}
                            onPress={() => {
                                button.onPress();
                                onClose();
                            }}
                        />
                    ))}
                </Box>
            </Box>
            <InfoBubbleMinimize collapsed={false} />
        </Bubble>
    );
};
