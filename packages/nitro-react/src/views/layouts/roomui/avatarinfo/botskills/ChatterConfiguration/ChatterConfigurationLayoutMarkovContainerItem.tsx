import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

/** Row template `markov_container` of ChatterConfigurationLayout - pass real rows through its `items…` slot. */
export interface ChatterConfigurationLayoutMarkovContainerItemProps {
    layout?: BoxLayout;
    onMarkovCheckbox?: () => void;
    visibleMarkovCheckbox?: boolean;
}

export const ChatterConfigurationLayoutMarkovContainerItem = ({ layout, onMarkovCheckbox, visibleMarkovCheckbox }: ChatterConfigurationLayoutMarkovContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="markov_container"
            layout={{ width: 248, height: 22, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 175, top: 4, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('bot.skill.chatter.configuration.markov')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            {(visibleMarkovCheckbox ?? true) && (
                <CheckBox
                    variant="100"
                    name="markov_checkbox"
                    onPointerTap={onMarkovCheckbox}
                    layout={{ position: 'absolute', left: 209, width: 39, top: 1, height: 21, minHeight: 21, maxHeight: 21 }}
                />
            )}
        </Region>
    );
};
