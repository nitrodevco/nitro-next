/**
 * The pet palettes the catalogue has been told a pet product sells in - Flash's
 * `HabboCatalog._sellablePetPalettes`, keyed by the product code (the pet offer's localization id).
 *
 * `getSellablePetPalettes` (`commands/catalogPetCommands`) answers from here and only asks the
 * server (`GetSellablePetPalettesComposer`) for a code it has no answer for; `onSellablePalettes`
 * replaces a code's row with what `SellablePetPalettesMessage` brought. Flash keeps the map for the
 * life of the catalogue - `HabboCatalog.reset` after a republish leaves it alone - so
 * `resetCatalog` does too.
 */
import { StateCreator } from 'zustand';

import { CatalogSellablePetPalette } from '../page/CatalogWidgetEvents';

type State = {
    sellablePetPalettes: Readonly<Record<string, readonly CatalogSellablePetPalette[]>>;
};

type Actions = {
    setSellablePetPalettes: (productCode: string, palettes: readonly CatalogSellablePetPalette[]) => void;
};

export const CatalogPetSliceInitialState: State = {
    sellablePetPalettes: {},
};

export type CatalogPetSlice = State & Actions;

export const createCatalogPetSlice: StateCreator<CatalogPetSlice, [], [], CatalogPetSlice> = set => ({
    ...CatalogPetSliceInitialState,
    setSellablePetPalettes: (productCode, palettes) => set(x => ({ sellablePetPalettes: { ...x.sellablePetPalettes, [productCode]: palettes } })),
});
