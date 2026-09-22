/**
 * The inventory's pets page - the `pets` region of `inventory_xml` (Flash `pets/PetsView`), drawn
 * only as far as it has no data: the port neither requests nor stores the pet inventory, so there
 * is no grid (`grid`, 0,27 274x231) and no `preview_container` (name, image, description,
 * `place_button`) to fill. What is drawn is the page's own chrome - the `options_container` row
 * and the `filter.rarity` dropmenu (style 0, 274,2 119x21) - with nothing to choose from; Flash
 * shows the loading or empty container instead until the list arrives
 * (`PetsView.updateContainerVisibility`).
 */
import { Dropmenu, Region } from '#base/theme';

import { InventoryOptionsContainer } from './InventoryOptionsContainer';

export const InventoryPetsView = () => (
    <Region layout={{ position: 'absolute', left: 0, top: 0, width: 468, bottom: 0, overflow: 'hidden' }}>
        <InventoryOptionsContainer />
        <Dropmenu
            variant="0"
            layout={{ position: 'absolute', left: 274, top: 2, width: 119, height: 21 }}
        />
    </Region>
);
