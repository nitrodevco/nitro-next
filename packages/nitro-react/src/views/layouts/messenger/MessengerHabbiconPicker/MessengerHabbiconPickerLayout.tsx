import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

import { MessengerHabbiconPickerLayoutHabbiconOpenHubButtonItem } from './MessengerHabbiconPickerLayoutHabbiconOpenHubButtonItem';
import { MessengerHabbiconPickerLayoutHabbiconSearchBorderItem } from './MessengerHabbiconPickerLayoutHabbiconSearchBorderItem';
import { MessengerHabbiconPickerLayoutHabbiconSectionTemplateItem } from './MessengerHabbiconPickerLayoutHabbiconSectionTemplateItem';

/** Generated from `3108_messenger_habbicon_picker_xml` (layout "messenger_habbicon_picker", 256x138) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MessengerHabbiconPickerLayoutProps {
    captionEmptyText?: string;
    itemsHabbiconSectionList?: ReactNode;
    itemsTopControls?: ReactNode;
    layout?: BoxLayout;
}

export const MessengerHabbiconPickerLayout = ({ captionEmptyText, itemsHabbiconSectionList, itemsTopControls, layout }: MessengerHabbiconPickerLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 256, height: 138, ...layout }}>
            <Border
                variant="107"
                name="messenger_habbicon_picker_window"
                layout={{ position: 'absolute', left: 0, width: 256, bottom: 0, height: 138 }}
            >
                <Region
                    name="top_controls"
                    layout={{ position: 'absolute', left: 6, width: 232, top: 8, height: 28, flexDirection: 'row', gap: 9 }}
                >
                    {itemsTopControls ?? (
                        <>
                            <MessengerHabbiconPickerLayoutHabbiconSearchBorderItem />
                            <MessengerHabbiconPickerLayoutHabbiconOpenHubButtonItem />
                        </>
                    )}
                </Region>
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 6, right: 6, top: 43, height: 88 }}
                >
                    <Region
                        name="habbicon_section_list"
                        layout={{ flexDirection: 'column', gap: 4, width: '100%' }}
                    >
                        {itemsHabbiconSectionList ?? (
                            <MessengerHabbiconPickerLayoutHabbiconSectionTemplateItem />
                        )}
                    </Region>
                </ScrollArea>
                <Region
                    name="empty_view"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 40, bottom: 2, justifyContent: 'center' }}
                >
                    <Region
                        name="empty_text"
                        layout={{ position: 'absolute', width: 200, alignSelf: 'center', height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionEmptyText ?? t('habbicons.no_habbicons')}
                            textStyle="text-style-il-regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 200, align: 'center' }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
