import { useSystemActions, useTranslation, useWindowParams, WindowParams } from '#base/context';
import { Frame, TabButton, TabContent, TabContext } from '#base/theme';

import { InventoryLayout } from '../layouts/inventory/InventoryLayout';
import { InventoryBadgesView } from './InventoryBadgesView';
import { InventoryBotsView } from './InventoryBotsView';
import { InventoryFurniView } from './InventoryFurniView';
import { InventoryPetsView } from './InventoryPetsView';

export type InventoryViewWindowParams = { tab?: 'furni' | 'pets' | 'bots' | 'badges' };

/** Pixi port of theme/InventoryView.tsx. */
export const InventoryView = () => {
    const { tab: activeTab = 'furni' } = useWindowParams('inventory');
    const t = useTranslation();
    const { toggleWindow, updateWindowParams } = useSystemActions();

    const setActiveTab = (tab: WindowParams<'inventory'>['tab']) => {
        updateWindowParams('inventory', { tab });
    };

    return <InventoryLayout />;

    return (
        <Frame
            id="inventory"
            variant="3"
            resizeDirection="y"
            layout={{ position: 'absolute', top: 20, left: 20, width: 490, height: 342 }}
            caption={t('inventory.title')}
            onClose={() => toggleWindow('inventory')}
        >
            <TabContext>
                <TabButton
                    onPointerTap={() => setActiveTab('furni')}
                    selected={activeTab === 'furni'}
                >
                    {t('inventory.furni')}
                </TabButton>
                <TabButton
                    onPointerTap={() => setActiveTab('pets')}
                    selected={activeTab === 'pets'}
                >
                    {t('inventory.furni.tab.pets')}
                </TabButton>
                <TabButton
                    onPointerTap={() => setActiveTab('bots')}
                    selected={activeTab === 'bots'}
                >
                    {t('inventory.bots')}
                </TabButton>
                <TabButton
                    onPointerTap={() => setActiveTab('badges')}
                    selected={activeTab === 'badges'}
                >
                    {t('inventory.badges')}
                </TabButton>
            </TabContext>
            <TabContent>
                {activeTab === 'furni' && <InventoryFurniView scrollVariant="0" />}
                {activeTab === 'pets' && <InventoryPetsView />}
                {activeTab === 'bots' && <InventoryBotsView />}
                {activeTab === 'badges' && <InventoryBadgesView />}
            </TabContent>
        </Frame>
    );
};
