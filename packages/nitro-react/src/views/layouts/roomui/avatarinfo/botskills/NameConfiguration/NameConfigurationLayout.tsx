import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ButtonThick, Region, ThemeText } from '#base/theme';

import { NameConfigurationLayoutNameInputItem } from './NameConfigurationLayoutNameInputItem';

/** Generated from `981_name_configuration_xml` (layout "name_configuration", 209x119) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NameConfigurationLayoutProps {
    itemsConfigurationItems?: ReactNode;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onSaveButton?: () => void;
}

export const NameConfigurationLayout = ({ itemsConfigurationItems, layout, onCancelButton, onSaveButton }: NameConfigurationLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 209, height: 119, ...layout }}>
            <Bubble
                variant="100"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 1, right: 17, top: 1, height: 20, justifyContent: 'center' }}
                >
                    <ThemeText
                        text={t('bot.skill.name.configuration.title')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                        layout={{ position: 'absolute', width: 189, top: 2, height: 17 }}
                    />
                </Region>
                <Region
                    name="configuration_items"
                    layout={{ position: 'absolute', left: 7, width: 183, top: 25, height: 81, flexDirection: 'column', gap: 2 }}
                >
                    {itemsConfigurationItems ?? (
                        <NameConfigurationLayoutNameInputItem />
                    )}
                    <ThemeText
                        text={t('bot.skill.name.configuration.new.name')}
                        textStyle="text-style-u-small"
                        textOptions={{ fill: '#eeeeee' }}
                        layout={{ width: 181, height: 15, flexShrink: 0 }}
                    />
                    <Region layout={{ width: 181, height: 36, flexShrink: 0 }}>
                        <Region layout={{ position: 'absolute', right: -1, width: 124, top: 7, height: 35, flexDirection: 'row', gap: 4 }}>
                            <ButtonThick
                                variant="3"
                                name="cancel_button"
                                onPointerTap={onCancelButton}
                                layout={{ width: 60, height: 28, flexShrink: 0, maxWidth: 120 }}
                            >
                                {t('cancel')}
                            </ButtonThick>
                            <ButtonThick
                                variant="5"
                                name="save_button"
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
