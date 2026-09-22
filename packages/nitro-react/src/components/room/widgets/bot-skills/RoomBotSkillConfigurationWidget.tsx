import { CommandBotComposer, GetBotCommandConfigurationDataComposer } from '@nitrodevco/nitro-packets';
import { ReactNode, useEffect, useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { BOT_SKILL_CHANGE_NAME, BOT_SKILL_SETUP_CHAT, useRoomBotsActions, useRoomStore } from '#base/context/room';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Bubble, ButtonThick, CheckBox, Region, TextInput, ThemeText } from '#base/theme';

/** Older servers separate the chatter fields with `;`, newer ones with `;#;`. */
const CHATTER_SEPARATOR = ';#;';

interface ChatterConfiguration {
    text: string;
    autoChat: boolean;
    delay: string;
    markov: boolean;
}

/** `BotChatterMarkovConfiguration.parseConfiguration`. */
const parseChatter = (data: string): ChatterConfiguration => {
    const parts = data.includes(CHATTER_SEPARATOR) ? data.split(CHATTER_SEPARATOR) : data.split(';');
    const truthy = (value: string | undefined) => (value?.toLowerCase() === 'true') || (value === '1');

    return {
        text: parts[0] ?? '',
        autoChat: truthy(parts[1]),
        delay: String(parseInt(parts[2] ?? '0', 10) || 0),
        markov: (parts.length >= 4) && truthy(parts[3]),
    };
};

interface BotSkillBubbleProps {
    /** Where the window opens; Flash puts it under the bot menu that opened it (see the docblock). */
    position: { x: number; y: number };
    width: number;
    height: number;
    caption: string;
    /** The black title bar's width, and the title label's box in it (`on_resize_align_center`). */
    headerWidth: number;
    titleLeft: number;
    titleWidth: number;
    /** `configuration_items`: the item list at (7, 25), 2px apart, clipped at its rect. */
    itemsWidth: number;
    itemsHeight: number;
    children?: ReactNode;
}

/**
 * The shared shell of `name_configuration` and `chatter_configuration`: a `bubble` of style 100 -
 * which Flash draws as style 0, the only other bubble row - tinted `0x6e6b67` with its pointer
 * down, `draggable_with_mouse`, the black 20px title bar at (1, 1) with the `u_bold` white title
 * centred in it, and the item list.
 */
const BotSkillBubble = ({ position, width, height, caption, headerWidth, titleLeft, titleWidth, itemsWidth, itemsHeight, children }: BotSkillBubbleProps) => (
    <Region
        dragTarget
        dragTrigger
        layout={{ position: 'absolute', left: position.x, top: position.y, width, height }}
    >
        <Bubble
            variant="100"
            tintColor="#6e6b67"
            margins={[ 8, 8, 8, 8 ]}
            layout={{ position: 'absolute', left: 0, top: 0, width, height }}
        >
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 1, top: 1, width: headerWidth, height: 20 }}
            >
                <Region layout={{ position: 'absolute', left: titleLeft, top: 2, width: titleWidth, flexDirection: 'row', justifyContent: 'center' }}>
                    <ThemeText
                        text={caption}
                        textStyle="u_bold"
                        textOptions={{ fill: '#ffffff' }}
                        verticalAlign="top"
                        layout={{ flexShrink: 0 }}
                    />
                </Region>
            </Region>
            <Region layout={{ position: 'absolute', left: 7, top: 25, width: itemsWidth, height: itemsHeight, overflow: 'hidden', flexDirection: 'column', gap: 2 }}>
                {children}
            </Region>
        </Bubble>
    </Region>
);

interface BotSkillButtonsProps {
    /** The row's container: 36 high, the buttons' `itemlist_horizontal` kept 1px past its right edge (`on_resize_align_right`). */
    width: number;
    onCancel: () => void;
    onSave: () => void;
}

/** The `cancel_button` (style 3) and green `save_button` (style 5, `0x3f9f3f`), 4px apart, each 60 to 120 wide. */
const BotSkillButtons = ({ width, onCancel, onSave }: BotSkillButtonsProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ width, height: 36, flexShrink: 0, overflow: 'hidden' }}>
            <Region layout={{ position: 'absolute', right: -1, top: 7, height: 35, flexDirection: 'row', alignItems: 'flex-start', gap: 4 }}>
                <ButtonThick
                    variant="3"
                    onPointerTap={onCancel}
                    layout={{ minWidth: 60, maxWidth: 120, height: 28, flexShrink: 0 }}
                >
                    {t('cancel')}
                </ButtonThick>
                <ButtonThick
                    variant="5"
                    tintColor="#3f9f3f"
                    onPointerTap={onSave}
                    layout={{ minWidth: 60, maxWidth: 120, height: 28, flexShrink: 0 }}
                >
                    {t('save')}
                </ButtonThick>
            </Region>
        </Region>
    );
};

/** A `u_small` white label beside its control, 4px down its 248x22 container. */
const BotSkillRowLabel = ({ text }: { text: string }) => (
    <ThemeText
        text={text}
        textStyle="u_small"
        textOptions={{ fill: '#ffffff' }}
        verticalAlign="top"
        layout={{ position: 'absolute', left: 0, top: 4 }}
    />
);

/**
 * The two windows a rentable bot's owner configures it through - `BotChangeNameConfiguration`
 * (`name_configuration`, 209x119) and `BotChatterMarkovConfiguration` (`chatter_configuration`,
 * 278x369). Opening one asks the server for the bot's current setting; saving sends it back as
 * the skill's command.
 *
 * `BotSkillConfigurationViewBase.open` places the window with its bottom centre on the bottom
 * centre of the bot menu that opened it, then `fitToScreen`s it. The store records only which bot
 * and skill, not where the menu was, so the windows open at a fixed spot instead.
 */
export const RoomBotSkillConfigurationWidget = () => {
    const configuration = useRoomStore(x => x.botSkillConfiguration);
    const { closeBotSkillConfiguration } = useRoomBotsActions();
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const helpLink = useConfigValue<string>('link.format.bots.help') ?? '';

    const [ loadedFor, setLoadedFor ] = useState<string | undefined>(undefined);
    const [ name, setName ] = useState('');
    const [ chatter, setChatter ] = useState<ChatterConfiguration>({ text: '', autoChat: false, delay: '0', markov: false });

    const botId = configuration?.botId ?? -1;
    const skillType = configuration?.skillType ?? -1;

    useEffect(() => {
        if (botId < 0) return;

        send(new GetBotCommandConfigurationDataComposer({ botId, skillType }));
    }, [ botId, skillType, send ]);

    // The fields take the server's answer once, when it lands; after that they are the user's.
    const loadKey = (configuration?.data !== undefined) ? `${botId}:${skillType}` : undefined;

    if (loadKey && (loadKey !== loadedFor)) {
        setLoadedFor(loadKey);

        if (skillType === BOT_SKILL_CHANGE_NAME) setName(configuration?.data ?? '');
        else setChatter(parseChatter(configuration?.data ?? ''));
    }

    if (!configuration || ((skillType !== BOT_SKILL_CHANGE_NAME) && (skillType !== BOT_SKILL_SETUP_CHAT))) return null;

    const close = () => {
        setLoadedFor(undefined);
        closeBotSkillConfiguration();
    };

    const save = (command: string) => {
        send(new CommandBotComposer({ botId, skillType, command }));
        close();
    };

    if (skillType === BOT_SKILL_CHANGE_NAME) {
        return (
            <BotSkillBubble
                position={{ x: 420, y: 200 }}
                width={209}
                height={119}
                caption={t('bot.skill.name.configuration.title')}
                headerWidth={191}
                titleLeft={1}
                titleWidth={189}
                itemsWidth={183}
                itemsHeight={81}
            >
                <ThemeText
                    text={t('bot.skill.name.configuration.new.name')}
                    textStyle="u_small"
                    textOptions={{ fill: '#eeeeee' }}
                    verticalAlign="top"
                    layout={{ flexShrink: 0 }}
                />
                <TextInput
                    value={name}
                    onChange={setName}
                    onEnter={() => save(name)}
                    textStyle="il_regular"
                    textColor="#ffffff"
                    flashPlacement
                    border="#ffffff"
                    backgroundColor={null}
                    focusedBackgroundColor={null}
                    layout={{ width: 180, height: 18, flexShrink: 0 }}
                />
                <BotSkillButtons
                    width={181}
                    onCancel={close}
                    onSave={() => save(name)}
                />
            </BotSkillBubble>
        );
    }

    // `sanitizeBotChatString`: the separator cannot appear inside the text itself.
    const chatterCommand = [ chatter.text.split(CHATTER_SEPARATOR).join(' '), chatter.autoChat, parseInt(chatter.delay, 10) || 0, chatter.markov ].join(CHATTER_SEPARATOR);

    return (
        <BotSkillBubble
            position={{ x: 400, y: 140 }}
            width={278}
            height={369}
            caption={t('bot.skill.chatter.configuration.title')}
            headerWidth={260}
            titleLeft={31}
            titleWidth={199}
            itemsWidth={247}
            itemsHeight={321}
        >
            <ThemeText
                text={t('bot.skill.chatter.configuration.chat.text')}
                textStyle="u_small"
                textOptions={{ fill: '#ffffff' }}
                verticalAlign="top"
                layout={{ flexShrink: 0 }}
            />
            <TextInput
                value={chatter.text}
                onChange={text => setChatter({ ...chatter, text })}
                multiline
                maxLength={1000}
                textStyle="u_regular"
                fontSize={10}
                textColor="#ffffff"
                flashPlacement
                border="#ffffff"
                backgroundColor={null}
                focusedBackgroundColor={null}
                layout={{ width: 246, height: 178, flexShrink: 0 }}
            />
            <Region layout={{ width: 248, height: 22, flexShrink: 0 }}>
                <BotSkillRowLabel text={t('bot.skill.chatter.configuration.automatic.chat')} />
                <CheckBox
                    variant="100"
                    selected={chatter.autoChat}
                    onPointerTap={() => setChatter({ ...chatter, autoChat: !chatter.autoChat })}
                    layout={{ position: 'absolute', left: 209, top: 1, width: 39, height: 21 }}
                />
            </Region>
            <Region layout={{ width: 248, height: 22, flexShrink: 0 }}>
                <BotSkillRowLabel text={t('bot.skill.chatter.configuration.markov')} />
                <CheckBox
                    variant="100"
                    selected={chatter.markov}
                    onPointerTap={() => setChatter({ ...chatter, markov: !chatter.markov })}
                    layout={{ position: 'absolute', left: 209, top: 1, width: 39, height: 21 }}
                />
            </Region>
            <Region layout={{ width: 248, height: 22, flexShrink: 0 }}>
                <BotSkillRowLabel text={t('bot.skill.chatter.configuration.chat.delay')} />
                <TextInput
                    value={chatter.delay}
                    onChange={delay => setChatter({ ...chatter, delay: delay.replace(/[^0-9]/g, '') })}
                    maxLength={4}
                    textStyle="u_small"
                    textColor="#ffffff"
                    flashPlacement
                    border="#ffffff"
                    backgroundColor={null}
                    focusedBackgroundColor={null}
                    layout={{ position: 'absolute', left: 215, top: 3, width: 31, height: 15 }}
                />
            </Region>
            <Region
                cursor="pointer"
                onPointerTap={() => {
                    if (helpLink.length) window.open(helpLink, '_blank', 'noopener');
                }}
                layout={{ width: 250, height: 16, flexShrink: 0, overflow: 'hidden' }}
            >
                <ThemeText
                    text={t('bot.skill.chatter.configuration.help.link')}
                    textStyle="u_bold"
                    textOptions={{ fill: '#bfbfff' }}
                    flashFormat={{ underline: true }}
                    verticalAlign="top"
                />
            </Region>
            <BotSkillButtons
                width={246}
                onCancel={close}
                onSave={() => save(chatterCommand)}
            />
        </BotSkillBubble>
    );
};
