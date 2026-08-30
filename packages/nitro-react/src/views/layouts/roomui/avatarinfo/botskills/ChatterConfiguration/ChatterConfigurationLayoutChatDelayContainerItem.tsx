import { useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, TextInput, ThemeText } from '#base/theme';

/** Row template `chat_delay_container` of ChatterConfigurationLayout - pass real rows through its `items…` slot. */
export interface ChatterConfigurationLayoutChatDelayContainerItemProps {
    layout?: BoxLayout;
    visibleChatDelayText?: boolean;
}

export const ChatterConfigurationLayoutChatDelayContainerItem = ({ layout, visibleChatDelayText }: ChatterConfigurationLayoutChatDelayContainerItemProps) => {
    const t = useTranslation();
    const [ chatDelayTextValue, setChatDelayTextValue ] = useState('');

    return (
        <Region
            name="chat_delay_container"
            layout={{ width: 248, height: 22, flexShrink: 0, ...layout }}
        >
            <ThemeText
                text={t('bot.skill.chatter.configuration.chat.delay')}
                textStyle="text-style-u-small"
                textOptions={{ fill: '#ffffff' }}
                layout={{ position: 'absolute', left: 0, width: 188, top: 4, height: 15 }}
            />
            {(visibleChatDelayText ?? true) && (
                <TextInput
                    value={chatDelayTextValue}
                    onChange={setChatDelayTextValue}
                    textColor="#ffffff"
                    layout={{ position: 'absolute', left: 215, width: 31, top: 3, height: 15, maxHeight: 21 }}
                />
            )}
        </Region>
    );
};
