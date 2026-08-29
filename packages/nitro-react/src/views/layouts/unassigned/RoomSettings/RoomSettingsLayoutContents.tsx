import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

import { RoomSettingsLayoutTabContainer1Item } from './RoomSettingsLayoutTabContainer1Item';
import { RoomSettingsLayoutTabContainer2Item } from './RoomSettingsLayoutTabContainer2Item';
import { RoomSettingsLayoutTabContainer3Item } from './RoomSettingsLayoutTabContainer3Item';
import { RoomSettingsLayoutTabContainer4Item } from './RoomSettingsLayoutTabContainer4Item';
import { RoomSettingsLayoutTabContainer5Item } from './RoomSettingsLayoutTabContainer5Item';

/** Named region `contents` of RoomSettingsLayout - configured through the parent's `contents` prop. */
export interface RoomSettingsLayoutContentsProps {
    itemsContents?: ReactNode;
    layout?: BoxLayout;
}

export const RoomSettingsLayoutContents = ({ itemsContents, layout }: RoomSettingsLayoutContentsProps) => {
    const t = useTranslation();

    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 4, right: 5, top: 0, bottom: 35, ...layout }}
        >
            <Region
                name="contents"
                layout={{ flexDirection: 'column', width: '100%' }}
            >
                {itemsContents ?? (
                    <>
                        <RoomSettingsLayoutTabContainer1Item />
                        <RoomSettingsLayoutTabContainer2Item />
                        <RoomSettingsLayoutTabContainer3Item />
                        <RoomSettingsLayoutTabContainer4Item />
                        <RoomSettingsLayoutTabContainer5Item />
                    </>
                )}
                <Region layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('navigator.roomsettings.tab.1')}
                        textStyle="text-style-u-headline-big"
                    />
                </Region>
                <Region layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('navigator.roomsettings.tab.2')}
                        textStyle="text-style-u-headline-big"
                    />
                </Region>
                <Region layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('navigator.roomsettings.tab.3')}
                        textStyle="text-style-u-headline-big"
                    />
                </Region>
                <Region layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('navigator.roomsettings.tab.4')}
                        textStyle="text-style-u-headline-big"
                    />
                </Region>
                <Region layout={{ width: 254, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('navigator.roomsettings.tab.5')}
                        textStyle="text-style-u-headline-big"
                    />
                </Region>
            </Region>
        </ScrollArea>
    );
};
