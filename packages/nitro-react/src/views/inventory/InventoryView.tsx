import { useState } from "react";

import { useInventoryContext } from "#base/components";
import { useLocalizationStore } from "#base/stores";
import { Frame, TabButton, TabContent, TabContext } from "#base/theme";

import { InventoryBadgesView } from "./InventoryBadgesView";
import { InventoryBotsView } from "./InventoryBotsView";
import { InventoryFurniView } from "./InventoryFurniView";
import { InventoryPetsView } from "./InventoryPetsView";

export const InventoryView = () => {
    const [activeTab, setActiveTab] = useState<string>('furni');
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const { close } = useInventoryContext();

    return (
        <Frame id="inventory" variant="3" className="absolute left-5 top-5 w-122.5 h-85.5" caption={getLocalizationValue('inventory.title')} onClose={close}>
            <TabContext data-name="tabs">
                <TabButton onClick={() => setActiveTab('furni')} aria-selected={activeTab === 'furni'}>
                    {getLocalizationValue('inventory.furni')}
                </TabButton>
                <TabButton onClick={() => setActiveTab('pets')} aria-selected={activeTab === 'pets'}>
                    {getLocalizationValue('inventory.furni.tab.pets')}
                </TabButton>
                <TabButton onClick={() => setActiveTab('bots')} aria-selected={activeTab === 'bots'}>
                    {getLocalizationValue('inventory.bots')}
                </TabButton>
                <TabButton onClick={() => setActiveTab('badges')} aria-selected={activeTab === 'badges'}>
                    {getLocalizationValue('inventory.badges')}
                </TabButton>
            </TabContext>
            <TabContent>
                {activeTab === 'furni' && <InventoryFurniView scrollVariant="0" />}
                {activeTab === 'pets' && <InventoryPetsView />}
                {activeTab === 'bots' && <InventoryBotsView />}
                {activeTab === 'badges' && <InventoryBadgesView />}
            </TabContent>
        </Frame>
    )
}