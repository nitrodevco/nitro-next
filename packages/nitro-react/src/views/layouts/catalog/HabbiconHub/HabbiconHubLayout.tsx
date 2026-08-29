import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, TabButton, TabContext } from '#base/theme';

import { HabbiconHubLayoutAlbumHeader, HabbiconHubLayoutAlbumHeaderProps } from './HabbiconHubLayoutAlbumHeader';
import { HabbiconHubLayoutAllSetsContainer, HabbiconHubLayoutAllSetsContainerProps } from './HabbiconHubLayoutAllSetsContainer';
import { HabbiconHubLayoutHabbiconPopupLayer, HabbiconHubLayoutHabbiconPopupLayerProps } from './HabbiconHubLayoutHabbiconPopupLayer';
import { HabbiconHubLayoutTrayContainer, HabbiconHubLayoutTrayContainerProps } from './HabbiconHubLayoutTrayContainer';

/** Generated from `1558_habbicon_hub_xml` (layout "habbicon_view", 560x570) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabbiconHubLayoutProps {
    albumHeader?: HabbiconHubLayoutAlbumHeaderProps;
    allSetsContainer?: HabbiconHubLayoutAllSetsContainerProps;
    habbiconPopupLayer?: HabbiconHubLayoutHabbiconPopupLayerProps;
    layout?: BoxLayout;
    onClose?: () => void;
    onTabAllSets?: () => void;
    onTabFavourited?: () => void;
    onTabOwned?: () => void;
    selectedTabContext?: string;
    tabsBg?: ReactNode;
    trayContainer?: HabbiconHubLayoutTrayContainerProps;
    visibleTrayContainer?: boolean;
}

export const HabbiconHubLayout = ({ albumHeader, allSetsContainer, habbiconPopupLayer, layout, onClose, onTabAllSets, onTabFavourited, onTabOwned, selectedTabContext, tabsBg, trayContainer, visibleTrayContainer }: HabbiconHubLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="HabbiconHub"
            name="HabbiconHub"
            caption={t('habbicon_book.title')}
            tintColor="#418db0"
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 560, height: 570, minWidth: 560, maxWidth: 560, minHeight: 570, ...layout }}
        >
            <Border
                variant="3"
                name="album_background"
                tintColor="#d7d1be"
                layout={{ position: 'absolute', left: 0, right: -6, top: 0, bottom: -1 }}
            />
            <HabbiconHubLayoutAlbumHeader {...albumHeader} />
            <Region
                name="tabs_bg"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 7, width: 540, top: 144, height: 1 }}
            >
                {tabsBg}
            </Region>
            <TabContext
                variant="3"
                name="tab_context"
                tintColor="#0fffff"
                layout={{ position: 'absolute', left: 7, width: 540, top: 113, height: 33 }}
            >
                <TabButton
                    variant="3"
                    name="tab_all_sets"
                    selected={selectedTabContext === 'tab_all_sets'}
                    onPointerTap={onTabAllSets}
                    layout={{ position: 'absolute', left: 0, width: 64, top: 0, height: 32 }}
                >
                    {t('habbicon_book.tab.all_sets')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="tab_owned"
                    selected={selectedTabContext === 'tab_owned'}
                    onPointerTap={onTabOwned}
                    layout={{ position: 'absolute', left: 64, width: 64, top: 0, height: 32 }}
                >
                    {t('habbicon_book.tab.owned')}
                </TabButton>
                <TabButton
                    variant="3"
                    name="tab_favourited"
                    selected={selectedTabContext === 'tab_favourited'}
                    onPointerTap={onTabFavourited}
                    layout={{ position: 'absolute', left: 128, width: 82, top: 0, height: 32 }}
                >
                    {t('habbicon_book.tab.favourited')}
                </TabButton>
            </TabContext>
            <HabbiconHubLayoutAllSetsContainer {...allSetsContainer} />
            {(visibleTrayContainer ?? false) && (
                <HabbiconHubLayoutTrayContainer {...trayContainer} />
            )}
            <HabbiconHubLayoutHabbiconPopupLayer {...habbiconPopupLayer} />
        </Frame>
    );
};
