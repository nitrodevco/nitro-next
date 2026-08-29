import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Dropmenu, Region, TabButton, TabContext, TextInput } from '#base/theme';

import { GrsMainWindowNewLayoutTabContent, GrsMainWindowNewLayoutTabContentProps } from './GrsMainWindowNewLayoutTabContent';

/** Named region `tabbedview` of GrsMainWindowNewLayout - configured through the parent's `tabbedview` prop. */
export interface GrsMainWindowNewLayoutTabbedviewProps {
    layout?: BoxLayout;
    onNavigatorTab1?: () => void;
    onNavigatorTab2?: () => void;
    onNavigatorTab3?: () => void;
    onNavigatorTab4?: () => void;
    onNavigatorTab5?: () => void;
    onNavigatorTab6?: () => void;
    onSearchBut?: () => void;
    onSearchType?: () => void;
    onTabbedview?: () => void;
    selectedTabContext?: string;
    tabContent?: GrsMainWindowNewLayoutTabContentProps;
}

export const GrsMainWindowNewLayoutTabbedview = ({ layout, onNavigatorTab1, onNavigatorTab2, onNavigatorTab3, onNavigatorTab4, onNavigatorTab5, onNavigatorTab6, onSearchBut, onSearchType, onTabbedview, selectedTabContext, tabContent }: GrsMainWindowNewLayoutTabbedviewProps) => {
    const t = useTranslation();
    const [ searchStrValue, setSearchStrValue ] = useState('');

    return (
        <Region
            name="tabbedview"
            onPointerTap={onTabbedview}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 388, top: 0, bottom: 32, ...layout }}
        >
            <TabContext
                variant="0"
                name="tab_context"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <TabButton
                    variant="0"
                    name="navigator_tab_4"
                    selected={selectedTabContext === 'navigator_tab_4'}
                    onPointerTap={onNavigatorTab4}
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.special')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_6"
                    selected={selectedTabContext === 'navigator_tab_6'}
                    onPointerTap={onNavigatorTab6}
                    layout={{ position: 'absolute', left: 123, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.categories')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_2"
                    selected={selectedTabContext === 'navigator_tab_2'}
                    onPointerTap={onNavigatorTab2}
                    layout={{ position: 'absolute', left: 266, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.rooms')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_1"
                    selected={selectedTabContext === 'navigator_tab_1'}
                    onPointerTap={onNavigatorTab1}
                    layout={{ position: 'absolute', left: 387, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.events')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_3"
                    selected={selectedTabContext === 'navigator_tab_3'}
                    onPointerTap={onNavigatorTab3}
                    layout={{ position: 'absolute', left: 512, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.me')}
                </TabButton>
                <TabButton
                    variant="0"
                    name="navigator_tab_5"
                    selected={selectedTabContext === 'navigator_tab_5'}
                    onPointerTap={onNavigatorTab5}
                    layout={{ position: 'absolute', left: 616, width: 20, top: 0, height: 22 }}
                >
                    {t('navigator.tab.search')}
                </TabButton>
            </TabContext>
            <Border
                variant="0"
                name="search_header"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 9, width: 369, top: 26, height: 30 }}
            >
                <TextInput
                    value={searchStrValue}
                    onChange={setSearchStrValue}
                    backgroundColor="#ffffff"
                    layout={{ position: 'absolute', left: 90, width: 201, top: 5, height: 17 }}
                />
                <Button
                    variant="0"
                    name="search_but"
                    onPointerTap={onSearchBut}
                    layout={{ position: 'absolute', left: 300, width: 65, top: 3, height: 21, minWidth: 65, maxWidth: 65 }}
                >
                    {t('generic.search')}
                </Button>
                <Dropmenu
                    variant="2"
                    name="search_type"
                    onPointerTap={onSearchType}
                    layout={{ position: 'absolute', left: 5, width: 80, top: 4, height: 20 }}
                />
            </Border>
            <GrsMainWindowNewLayoutTabContent {...tabContent} />
        </Region>
    );
};
