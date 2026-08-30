import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Row template `auto_chat_container` of ChatterConfigurationLayout - pass real rows through its `items…` slot. */
export interface ChatterConfigurationLayoutAutoChatContainerItemProps {
    layout?: BoxLayout;
    onAutoChatCheckbox?: () => void;
    visibleAutoChatCheckbox?: boolean;
}

export const ChatterConfigurationLayoutAutoChatContainerItem = ({ layout, onAutoChatCheckbox, visibleAutoChatCheckbox }: ChatterConfigurationLayoutAutoChatContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="auto_chat_container"
            layout={{ width: 248, height: 22, flexShrink: 0, ...layout }}
        >
            <ThemeText
                text={t('bot.skill.chatter.configuration.automatic.chat')}
                textStyle="text-style-u-small"
                textOptions={{ fill: '#ffffff' }}
                layout={{ position: 'absolute', left: 0, width: 207, top: 4, height: 15 }}
            />
            {(visibleAutoChatCheckbox ?? true) && (
                <CheckBox
                    variant="100"
                    name="auto_chat_checkbox"
                    onPointerTap={onAutoChatCheckbox}
                    layout={{ position: 'absolute', left: 209, width: 39, top: 1, height: 21, minHeight: 21, maxHeight: 21 }}
                />
            )}
        </Region>
    );
};
