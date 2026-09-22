/**
 * The catalogue's pet calls - the parts of Flash's `HabboCatalog` the pet widgets
 * (`PetsCatalogWidget`, `NewPetsCatalogWidget`) reach through `_catalog`: `approveName` and
 * `getSellablePetPalettes`. The answers come back through `handlers/catalog/registerCatalogPetHandlers`,
 * which forwards them to the open page as widget events.
 */
import { ApproveNameComposer, GetSellablePetPalettesComposer } from '@nitrodevco/nitro-packets';
import { StoreApi } from 'zustand';

import { CatalogSellablePetPalette, CatalogStore } from '#base/context/catalog';
import { WebSocketConnection } from '#base/context/communication';

type Send = WebSocketConnection['send'];

/** `approveName(name, type)`'s type for a pet's name - the only one the catalogue sends. */
export const APPROVE_NAME_TYPE_PET = 1;

/** `HabboCatalog.approveName`: ask the server whether a name is allowed; `ApproveNameMessage` answers. */
export const approveName = (send: Send, name: string, type: number) => send(new ApproveNameComposer({ name, type }));

/**
 * `HabboCatalog.getSellablePetPalettes`: the palettes the catalogue already has for a product
 * code, or - when it has none - `undefined` after asking the server, whose answer the widgets
 * hear as `SELLABLE_PET_PALETTES`.
 */
export const getSellablePetPalettes = (send: Send, store: StoreApi<CatalogStore>, productCode: string): readonly CatalogSellablePetPalette[] | undefined => {
    const palettes = store.getState().sellablePetPalettes[productCode];

    if (palettes) return palettes.slice();

    send(new GetSellablePetPalettesComposer({ productCode }));

    return undefined;
};
