import { useSystemActions, useTranslation, useWindowParams, type WindowParams } from '#base/context';
import { Frame, TabButton, TabContent, TabContext } from '#base/theme-pixi';

import { InventoryBadgesViewPixi } from './InventoryBadgesViewPixi';
import { InventoryBotsViewPixi } from './InventoryBotsViewPixi';
import { InventoryFurniViewPixi } from './InventoryFurniViewPixi';
import { InventoryPetsViewPixi } from './InventoryPetsViewPixi';

export type InventoryViewWindowParams = { tab?: 'furni' | 'pets' | 'bots' | 'badges' };

/** Pixi port of theme/InventoryView.tsx. */
export const InventoryViewPixi = () => {
    const { tab: activeTab = 'furni' } = useWindowParams('inventory');
    const t = useTranslation();
    const { toggleWindow, updateWindowParams } = useSystemActions();

    const setActiveTab = (tab: WindowParams<'inventory'>['tab']) => {
        updateWindowParams('inventory', { tab });
    };

    return (
        <Frame id="inventory" variant="3" resizeDirection="y" layout={{ position: 'absolute', top: 20, left: 20, width: 490, height: 342 }} caption={t('inventory.title')} onClose={() => toggleWindow('inventory')}>
            <TabContext>
                <TabButton onPress={() => setActiveTab('furni')} selected={activeTab === 'furni'}>
                    {t('inventory.furni')}
                </TabButton>
                <TabButton onPress={() => setActiveTab('pets')} selected={activeTab === 'pets'}>
                    {t('inventory.furni.tab.pets')}
                </TabButton>
                <TabButton onPress={() => setActiveTab('bots')} selected={activeTab === 'bots'}>
                    {t('inventory.bots')}
                </TabButton>
                <TabButton onPress={() => setActiveTab('badges')} selected={activeTab === 'badges'}>
                    {t('inventory.badges')}
                </TabButton>
            </TabContext>
            <TabContent>
                {activeTab === 'furni' && <InventoryFurniViewPixi scrollVariant="0" />}
                {activeTab === 'pets' && <InventoryPetsViewPixi />}
                {activeTab === 'bots' && <InventoryBotsViewPixi />}
                {activeTab === 'badges' && <InventoryBadgesViewPixi />}
            </TabContent>
        </Frame>
    );
};
