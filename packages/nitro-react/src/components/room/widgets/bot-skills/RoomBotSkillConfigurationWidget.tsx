import { CommandBotComposer, GetBotCommandConfigurationDataComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { BOT_SKILL_CHANGE_NAME, BOT_SKILL_SETUP_CHAT, useRoomBotsActions, useRoomStore } from '#base/context/room';
import { useConfigValue, useTranslation } from '#base/context/system';
import { Border, Box, Button, CheckBox, Frame, TextInput, ThemeText } from '#base/theme';

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

/**
 * The two windows a rentable bot's owner configures it through - `BotChangeNameConfiguration`
 * (`name_configuration`) and `BotChatterMarkovConfiguration` (`chatter_configuration`). Opening
 * one asks the server for the bot's current setting; saving sends it back as the skill's command.
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
            <Frame
                variant="0"
                id="bot-skill-name"
                caption={t('bot.skill.name.configuration.title')}
                onClose={close}
                defaultPosition={{ x: 420, y: 200 }}
                rememberPosition={false}
                layout={{ position: 'absolute', width: 209, height: 120 }}
            >
                <Box layout={{ flexDirection: 'column', gap: 4, padding: 6 }}>
                    <ThemeText
                        text={t('bot.skill.name.configuration.new.name')}
                        textStyle="regular"
                        textOptions={{ fill: '#000000' }}
                    />
                    <TextInput
                        value={name}
                        onChange={setName}
                        onEnter={() => save(name)}
                        layout={{ height: 22 }}
                    />
                    <Box layout={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                        <Button
                            onPointerTap={close}
                            layout={{ height: 22, minWidth: 60 }}
                        >
                            {t('cancel')}
                        </Button>
                        <Button
                            onPointerTap={() => save(name)}
                            layout={{ height: 22, minWidth: 60 }}
                        >
                            {t('save')}
                        </Button>
                    </Box>
                </Box>
            </Frame>
        );
    }

    // `sanitizeBotChatString`: the separator cannot appear inside the text itself.
    const chatterCommand = [ chatter.text.split(CHATTER_SEPARATOR).join(' '), chatter.autoChat, parseInt(chatter.delay, 10) || 0, chatter.markov ].join(CHATTER_SEPARATOR);

    return (
        <Frame
            variant="0"
            id="bot-skill-chatter"
            caption={t('bot.skill.chatter.configuration.title')}
            onClose={close}
            defaultPosition={{ x: 400, y: 140 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 278, height: 370 }}
        >
            <Box layout={{ flexDirection: 'column', gap: 6, padding: 6 }}>
                <ThemeText
                    text={t('bot.skill.chatter.configuration.chat.text')}
                    textStyle="regular"
                    textOptions={{ fill: '#000000' }}
                />
                <Border layout={{ height: 178 }}>
                    <TextInput
                        value={chatter.text}
                        onChange={text => setChatter({ ...chatter, text })}
                        multiline
                        layout={{ flex: 1 }}
                    />
                </Border>
                <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <CheckBox
                        variant="0"
                        selected={chatter.autoChat}
                        onPointerTap={() => setChatter({ ...chatter, autoChat: !chatter.autoChat })}
                        layout={{ width: 17, height: 16 }}
                    />
                    <ThemeText
                        text={t('bot.skill.chatter.configuration.automatic.chat')}
                        textStyle="regular"
                        textOptions={{ fill: '#000000' }}
                    />
                </Box>
                <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <CheckBox
                        variant="0"
                        selected={chatter.markov}
                        onPointerTap={() => setChatter({ ...chatter, markov: !chatter.markov })}
                        layout={{ width: 17, height: 16 }}
                    />
                    <ThemeText
                        text={t('bot.skill.chatter.configuration.markov')}
                        textStyle="regular"
                        textOptions={{ fill: '#000000' }}
                    />
                </Box>
                <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <ThemeText
                        text={t('bot.skill.chatter.configuration.chat.delay')}
                        textStyle="regular"
                        textOptions={{ fill: '#000000' }}
                    />
                    <TextInput
                        value={chatter.delay}
                        onChange={delay => setChatter({ ...chatter, delay: delay.replace(/[^0-9]/g, '') })}
                        maxLength={4}
                        layout={{ width: 60, height: 22 }}
                    />
                </Box>
                {!!helpLink.length && (
                    <Box
                        cursor="pointer"
                        onPointerTap={() => window.open(helpLink, '_blank', 'noopener')}
                    >
                        <ThemeText
                            text={t('bot.skill.chatter.configuration.help.link')}
                            textStyle="u_regular"
                            textOptions={{ fill: '#0000ff' }}
                        />
                    </Box>
                )}
                <Box layout={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 }}>
                    <Button
                        onPointerTap={close}
                        layout={{ height: 22, minWidth: 60 }}
                    >
                        {t('cancel')}
                    </Button>
                    <Button
                        onPointerTap={() => save(chatterCommand)}
                        layout={{ height: 22, minWidth: 60 }}
                    >
                        {t('save')}
                    </Button>
                </Box>
            </Box>
        </Frame>
    );
};
