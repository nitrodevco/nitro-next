import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, Region, ThemeText } from '#base/theme';

import { ChatterConfigurationLayoutConfigurationItems, ChatterConfigurationLayoutConfigurationItemsProps } from './ChatterConfigurationLayoutConfigurationItems';

/** Generated from `1032_chatter_configuration_xml` (layout "chatter_configuration", 278x369) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatterConfigurationLayoutProps {
    configurationItems?: ChatterConfigurationLayoutConfigurationItemsProps;
    layout?: BoxLayout;
}

export const ChatterConfigurationLayout = ({ configurationItems, layout }: ChatterConfigurationLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 278, height: 369, ...layout }}>
            <Bubble
                variant="100"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 278, top: 0, height: 369 }}
            >
                <Region
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 1, right: 17, top: 1, height: 20, justifyContent: 'center' }}
                >
                    <Region layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 199, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('bot.skill.chatter.configuration.title')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <ChatterConfigurationLayoutConfigurationItems {...configurationItems} />
            </Bubble>
        </Region>
    );
};
