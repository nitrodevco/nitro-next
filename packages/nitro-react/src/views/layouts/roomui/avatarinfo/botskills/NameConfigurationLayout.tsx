import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Bubble, ButtonThick, Region, TextInput, ThemeText } from '#base/theme';

/** Generated from `981_name_configuration_xml` (layout "name_configuration", 209x119) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NameConfigurationLayoutProps {
    configurationItems?: NameConfigurationLayoutConfigurationItemsProps;
    layout?: BoxLayout;
}

export const NameConfigurationLayout = ({ configurationItems, layout }: NameConfigurationLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 209, height: 119, ...layout }}>
            <Bubble
                variant="100"
                params={33025}
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 209, top: 0, height: 119 }}
            >
                <Region
                    params={144}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 1, right: 17, top: 1, height: 20, justifyContent: 'center' }}
                >
                    <Region
                        params={786640}
                        layout={{ position: 'absolute', width: 189, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('bot.skill.name.configuration.title')}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                </Region>
                <NameConfigurationLayoutConfigurationItems {...configurationItems} />
            </Bubble>
        </Region>
    );
};

/** Row template `name_input` of NameConfigurationLayout - pass real rows through its `items…` slot. */
export interface NameConfigurationLayoutNameInputItemProps {
    layout?: BoxLayout;
}

export const NameConfigurationLayoutNameInputItem = ({ layout }: NameConfigurationLayoutNameInputItemProps) => {
    const [ nameInputValue, setNameInputValue ] = useState('');

    return (
        <TextInput
            value={nameInputValue}
            onChange={setNameInputValue}
            textColor="#ffffff"
            layout={{ width: 180, height: 18, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `configuration_items` of NameConfigurationLayout - configured through the parent's `configurationItems` prop. */
export interface NameConfigurationLayoutConfigurationItemsProps {
    itemsConfigurationItems?: ReactNode;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onSaveButton?: () => void;
}

export const NameConfigurationLayoutConfigurationItems = ({ itemsConfigurationItems, layout, onCancelButton, onSaveButton }: NameConfigurationLayoutConfigurationItemsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="configuration_items"
            params={16}
            layout={{ position: 'absolute', left: 7, width: 183, top: 25, height: 81, flexDirection: 'column', gap: 2, ...layout }}
        >
            {itemsConfigurationItems ?? (
                <NameConfigurationLayoutNameInputItem />
            )}
            <Region
                params={16}
                layout={{ width: 181, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={t('bot.skill.name.configuration.new.name')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#eeeeee' }}
                />
            </Region>
            <Region
                params={16}
                layout={{ width: 181, height: 36, flexShrink: 0 }}
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
    );
};
