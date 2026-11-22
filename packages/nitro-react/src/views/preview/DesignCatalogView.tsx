/**
 * The catalogue in the preview host's design window, drawn by the game's own `CatalogView` with sample
 * content in place of the server's: a tab per sample page and the page of the state's layout open, so
 * the parts its code builds inside the window - the page layout, the badge display page's
 * `badgeGridItem` per badge - are drawn there and a press names them (`DesignPreviewView`). Nothing is
 * sent: the store is fed as `onCatalogIndex` and `onCatalogPage` would fill it. Not a Flash feature.
 */
import { CatalogTypeEnum, ICatalogNode } from '@nitrodevco/nitro-api';
import { useEffect } from 'react';

import { showCatalogPage } from '#base/commands';
import { CatalogContextProvider, getCatalogStore } from '#base/context/catalog';
import { CatalogView } from '#base/views/catalog/CatalogView';

import { useSampleBadges } from './designSamples';
import { CATALOG_WINDOW, DESIGN_STATES } from './designStates';

/** A catalogue node as the index packet brings one. */
const node = (pageId: number, localization: string, depth: number, children: ICatalogNode[] = []): ICatalogNode => ({ depth, parent: undefined, visible: true, icon: 1, pageId, pageName: localization.toLowerCase().replace(/\s+/g, '_'), localization, offerIds: [], children });

/** The index: a tab per state, its page under it (`getNode`'s depths and parents). */
const sampleIndex = () => {
    const tabs = (DESIGN_STATES[CATALOG_WINDOW] ?? []).map((state, index) => node(index + 1, state.name, 1, [ node(100 + index, state.name, 2) ]));
    const root = node(-1, 'root', 0, tabs);

    for (const tab of tabs) {
        tab.parent = root;
        tab.children.forEach(child => (child.parent = tab));
    }

    return root;
};

/** Opens the page of the state's layout, as `onCatalogPage` shows it. */
const showSamplePage = (state: string) => {
    const store = getCatalogStore(CatalogTypeEnum.Normal);
    const states = DESIGN_STATES[CATALOG_WINDOW] ?? [];
    const index = Math.max(0, states.findIndex(each => each.id === state));
    const layout = states[index]?.layout ?? 'default_3x3';
    const root = store.getState().rootNode ?? sampleIndex();
    const tab = root.children[index];
    const page = tab.children[0];

    const { setRootNode, setActiveNodes, setOpenNodes, setActivePageId, setIsBusy } = store.getState();

    setRootNode(root);
    setActiveNodes([ tab, page ]);
    setOpenNodes([ tab ]);
    setActivePageId(page.pageId);
    setIsBusy(false);
    showCatalogPage(store, page.pageId, layout, { imageDatas: [], textDatas: [] }, [], -1, false);
};

export const DesignCatalogView = ({ state }: { state: string }) => {
    // The badge display page lists the user's badges.
    useSampleBadges();

    useEffect(() => {
        showSamplePage(state);
    }, [ state ]);

    return (
        <CatalogContextProvider catalogType={CatalogTypeEnum.Normal}>
            <CatalogView />
        </CatalogContextProvider>
    );
};
