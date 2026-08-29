import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

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
