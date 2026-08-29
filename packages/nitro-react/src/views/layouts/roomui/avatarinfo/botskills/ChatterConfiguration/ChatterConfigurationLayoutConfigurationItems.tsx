import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeText } from '#base/theme';

import { ChatterConfigurationLayoutAutoChatContainerItem } from './ChatterConfigurationLayoutAutoChatContainerItem';
import { ChatterConfigurationLayoutChatDelayContainerItem } from './ChatterConfigurationLayoutChatDelayContainerItem';
import { ChatterConfigurationLayoutChatTextItem } from './ChatterConfigurationLayoutChatTextItem';
import { ChatterConfigurationLayoutHelpLinkItem } from './ChatterConfigurationLayoutHelpLinkItem';
import { ChatterConfigurationLayoutMarkovContainerItem } from './ChatterConfigurationLayoutMarkovContainerItem';

/** Named region `configuration_items` of ChatterConfigurationLayout - configured through the parent's `configurationItems` prop. */
export interface ChatterConfigurationLayoutConfigurationItemsProps {
    itemsConfigurationItems?: ReactNode;
    layout?: BoxLayout;
    onCancelButton?: () => void;
    onSaveButton?: () => void;
}

export const ChatterConfigurationLayoutConfigurationItems = ({ itemsConfigurationItems, layout, onCancelButton, onSaveButton }: ChatterConfigurationLayoutConfigurationItemsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="configuration_items"
            layout={{ position: 'absolute', left: 7, width: 247, top: 25, height: 321, flexDirection: 'column', gap: 2, ...layout }}
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
            <Region layout={{ width: 183, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('bot.skill.chatter.configuration.chat.text')}
                    textStyle="text-style-u-small"
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
            <Region layout={{ width: 246, height: 36, flexShrink: 0 }}>
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
    );
};
