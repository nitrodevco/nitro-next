import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ButtonThick, CheckBox, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `1032_chatter_configuration_xml` (layout "chatter_configuration", 278x369) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatterConfigurationLayoutProps {
    itemsConfigurationItems?: ReactNode;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onSaveButton?: () => void;
}

export const ChatterConfigurationLayout = ({ itemsConfigurationItems, layout, onCancelButton, onSaveButton }: ChatterConfigurationLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 278, height: 369, ...layout }}>
            <Bubble
                variant="100"
                params={33025}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 278, top: 0, height: 369 }}
            >
                <Region
                    params={144}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 1, right: 17, top: 1, height: 20, justifyContent: 'center' }}
                >
                    <Region
                        params={786640}
                        layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 199, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('bot.skill.chatter.configuration.title')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <Region
                    name="configuration_items"
                    params={16}
                    layout={{ position: 'absolute', left: 7, width: 247, top: 25, height: 321, flexDirection: 'column', gap: 2 }}
                >
                    {itemsConfigurationItems ?? (
                        <>
                            <ChatterConfigurationLayoutChatTextItem />
                            <ChatterConfigurationLayoutAutoChatContainerItem />
                            <ChatterConfigurationLayoutMarkovContainerItem />
                            <ChatterConfigurationLayoutChatDelayContainerItem />
                            <ChatterConfigurationLayoutHelpLinkItem />
                        </>
                    )}
                    <Region
                        params={16}
                        layout={{ width: 183, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('bot.skill.chatter.configuration.chat.text')}
                            textStyle="text-style-u-small"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ width: 246, height: 36, flexShrink: 0 }}
                    >
                        <Region
                            params={262224}
                            layout={{ position: 'absolute', right: -1, width: 124, top: 7, height: 35, flexDirection: 'row', gap: 4 }}
                        >
                            <ButtonThick
                                variant="3"
                                name="cancel_button"
                                params={131089}
                                onPointerTap={onCancelButton}
                                layout={{ width: 60, height: 28, flexShrink: 0, maxWidth: 120 }}
                            >
                                {t('cancel')}
                            </ButtonThick>
                            <ButtonThick
                                variant="5"
                                name="save_button"
                                params={393233}
                                tintColor="#3f9f3f"
                                onPointerTap={onSaveButton}
                                layout={{ width: 60, height: 28, flexShrink: 0, minWidth: 60, maxWidth: 120 }}
                            >
                                {t('save')}
                            </ButtonThick>
                        </Region>
                    </Region>
                </Region>
            </Bubble>
        </Region>
    );
};

/** Row template `chat_text` of ChatterConfigurationLayout - pass real rows through its `items…` slot. */
export interface ChatterConfigurationLayoutChatTextItemProps {
    layout?: BoxLayout;
}

export const ChatterConfigurationLayoutChatTextItem = ({ layout }: ChatterConfigurationLayoutChatTextItemProps) => {
    const [ chatTextValue, setChatTextValue ] = useState('');

    return (
        <TextInput
            value={chatTextValue}
            onChange={setChatTextValue}
            maxLength={1000}
            multiline
            textColor="#ffffff"
            layout={{ width: 246, height: 178, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `auto_chat_container` of ChatterConfigurationLayout - pass real rows through its `items…` slot. */
export interface ChatterConfigurationLayoutAutoChatContainerItemProps {
    layout?: BoxLayout;
    onAutoChatCheckbox?: () => void;
}

export const ChatterConfigurationLayoutAutoChatContainerItem = ({ layout, onAutoChatCheckbox }: ChatterConfigurationLayoutAutoChatContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="auto_chat_container"
            params={16}
            layout={{ width: 248, height: 22, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 207, top: 4, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('bot.skill.chatter.configuration.automatic.chat')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <CheckBox
                variant="100"
                name="auto_chat_checkbox"
                params={17}
                onPointerTap={onAutoChatCheckbox}
                layout={{ position: 'absolute', left: 209, width: 39, top: 1, height: 21, minHeight: 21, maxHeight: 21 }}
            />
        </Region>
    );
};

/** Row template `markov_container` of ChatterConfigurationLayout - pass real rows through its `items…` slot. */
export interface ChatterConfigurationLayoutMarkovContainerItemProps {
    layout?: BoxLayout;
    onMarkovCheckbox?: () => void;
}

export const ChatterConfigurationLayoutMarkovContainerItem = ({ layout, onMarkovCheckbox }: ChatterConfigurationLayoutMarkovContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="markov_container"
            params={16}
            layout={{ width: 248, height: 22, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 175, top: 4, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('bot.skill.chatter.configuration.markov')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <CheckBox
                variant="100"
                name="markov_checkbox"
                params={17}
                onPointerTap={onMarkovCheckbox}
                layout={{ position: 'absolute', left: 209, width: 39, top: 1, height: 21, minHeight: 21, maxHeight: 21 }}
            />
        </Region>
    );
};

/** Row template `chat_delay_container` of ChatterConfigurationLayout - pass real rows through its `items…` slot. */
export interface ChatterConfigurationLayoutChatDelayContainerItemProps {
    layout?: BoxLayout;
}

export const ChatterConfigurationLayoutChatDelayContainerItem = ({ layout }: ChatterConfigurationLayoutChatDelayContainerItemProps) => {
    const t = useTranslation();
    const [ chatDelayTextValue, setChatDelayTextValue ] = useState('');

    return (
        <Region
            name="chat_delay_container"
            params={16}
            layout={{ width: 248, height: 22, flexShrink: 0, ...layout }}
        >
            <Region
                params={16}
                layout={{ position: 'absolute', left: 0, width: 188, top: 4, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('bot.skill.chatter.configuration.chat.delay')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <TextInput
                value={chatDelayTextValue}
                onChange={setChatDelayTextValue}
                textColor="#ffffff"
                layout={{ position: 'absolute', left: 215, width: 31, top: 3, height: 15, maxHeight: 21 }}
            />
        </Region>
    );
};

/** Row template `help_link` of ChatterConfigurationLayout - pass real rows through its `items…` slot. */
export interface ChatterConfigurationLayoutHelpLinkItemProps {
    captionHelpLink?: string;
    layout?: BoxLayout;
    onHelpLink?: () => void;
}

export const ChatterConfigurationLayoutHelpLinkItem = ({ captionHelpLink, layout, onHelpLink }: ChatterConfigurationLayoutHelpLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="help_link"
            params={1}
            layout={{ width: 250, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onHelpLink}
            cursor="pointer"
        >
            <ThemeText
                text={captionHelpLink ?? t('bot.skill.chatter.configuration.help.link')}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#bfbfff' }}
            />
        </Region>
    );
};
