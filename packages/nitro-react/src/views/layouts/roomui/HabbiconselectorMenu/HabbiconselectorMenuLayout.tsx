import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, ThemeText } from '#base/theme';

import { HabbiconselectorMenuLayoutHabbiconOpenHubButtonItem } from './HabbiconselectorMenuLayoutHabbiconOpenHubButtonItem';
import { HabbiconselectorMenuLayoutHabbiconSearchBorderItem } from './HabbiconselectorMenuLayoutHabbiconSearchBorderItem';
import { HabbiconselectorMenuLayoutHabbiconSectionTemplateItem } from './HabbiconselectorMenuLayoutHabbiconSectionTemplateItem';

/** Generated from `964_habbiconselector_menu_xml` (layout "habbiconselector_menu", 245x138) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabbiconselectorMenuLayoutProps {
    captionEmptyText?: string;
    itemsHabbiconSectionList?: ReactNode;
    itemsTopControls?: ReactNode;
    layout?: BoxLayout;
}

export const HabbiconselectorMenuLayout = ({ captionEmptyText, itemsHabbiconSectionList, itemsTopControls, layout }: HabbiconselectorMenuLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 245, height: 138, ...layout }}>
            <Border
                variant="2"
                name="habbicon_selector_window"
                tintColor="#24231e"
                blend={0.8}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="top_controls"
                    layout={{ position: 'absolute', left: 6, width: 232, top: 8, height: 28, flexDirection: 'row', gap: 9 }}
                >
                    {itemsTopControls ?? (
                        <>
                            <HabbiconselectorMenuLayoutHabbiconSearchBorderItem />
                            <HabbiconselectorMenuLayoutHabbiconOpenHubButtonItem />
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
                            <HabbiconselectorMenuLayoutHabbiconSectionTemplateItem />
                        )}
                    </Region>
                </ScrollArea>
                <Region
                    name="empty_view"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 40, bottom: 2, justifyContent: 'center' }}
                >
                    <Region
                        name="empty_text"
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 200, alignSelf: 'center', height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionEmptyText ?? t('habbicons.no_habbicons')}
                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 200, align: 'center' }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
