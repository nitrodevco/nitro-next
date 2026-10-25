/**
 * A crafting table - Flash `ui/handler/CraftingWidgetHandler` with `ui/widget/crafting/CraftingWidget`
 * and its controllers (`CraftingInventoryListController`, `CraftingRecipeListController`,
 * `CraftingMixerController`, `CraftingInfoController`). What the window shows is the widget's data
 * (`CraftingData`), which each of these writes; the view draws it.
 *
 * - Opening (`initializeData`): the craftable products are asked for once the furni inventory is
 *   current (`checkCategoryInitilization('furni')`, else on its list arriving).
 * - The recipes (`itemgrid_products`): a press shows the recipe (`showCraftableProduct` ->
 *   `GetCraftingRecipe`), whose ingredients fill the mixer from the inventory, greyed where one is
 *   missing (`showRecipe`); the button crafts it (`Craft`).
 * - The inventory (`itemgrid_inventory`): the furni the table takes, each with the ids of the
 *   non-rented items held. A press moves one into the mixer (secret recipe mode), which asks the
 *   table what the mix makes (`GetCraftingRecipesAvailable`); a press on a mixer item puts it back.
 *   The button crafts the mix (`CraftSecret`).
 * - A craft first runs the progress bar; a successful one waits for the inventory's
 *   `FurniListInvalidate` to ask for the list and the table again (`registerForFurniListInvalidate`).
 */
import { IFurnitureData, RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { CraftComposer, CraftSecretComposer, GetCraftableProductsComposer, GetCraftingRecipeComposer, GetCraftingRecipesAvailableComposer, ICraftableProduct, ICraftingIngredient } from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { getNonRentedInventoryIds, inventoryStore } from '#base/context/inventory';
import { roomStore } from '#base/context/room';
import { systemStore, translate as t } from '#base/context/system';
import { getFloorItemDataByName, getWallItemDataByName } from '#base/utils';

import { checkFurniInventoryInitialization, requestFurniInventory } from '../inventory/inventoryCommands';

/** `CraftingWidget.MODE_NONE` / `MODE_SECRET_RECIPE` / `MODE_PUBLIC_RECIPE`. */
export const CRAFTING_MODE_NONE = 0;
export const CRAFTING_MODE_SECRET_RECIPE = 1;
export const CRAFTING_MODE_PUBLIC_RECIPE = 2;

/** `CraftingMixerController.MAX_ITEMS`. */
const MIXER_MAX_ITEMS = 10;

/** `CraftingInfoController.setState`'s states. */
export const CraftingInfoState = {
    START: 0,
    MIXER_EMPTY: 1,
    MIXER_NO_HIT: 2,
    MIXER_HIT: 3,
    MIXER_HIT_PLUS_OTHERS: 4,
    MIXER_OTHERS: 5,
    PRODUCT_EMPTY: 6,
    PRODUCT_INCOMPLETE: 7,
    PRODUCT_COMPLETE: 8,
    NOT_IN_INVENTORY: 9,
    RESULT_OK: 999,
    WORKING: 1000,
} as const;

/** `CraftingFurnitureItem`: a furni of a grid - a recipe's product, or an inventory furni with the ids held. */
export interface CraftingFurnitureItem {
    key: string;
    recipeCode: string;
    productCode: string;
    furnitureData: IFurnitureData;
    /** The ids not in the mixer (`countInInventory` is their number). */
    inventoryIds: number[];
}

/** `CraftingMixerItemRenderer`: its furni, the inventory id it holds (0 for one missing) and the inventory item it came from. */
export interface CraftingMixerItem {
    key: string;
    furnitureData: IFurnitureData;
    inventoryId: number;
    /** The inventory grid item it goes back to; none for a recipe's ingredient. */
    sourceKey?: string;
}

/** `btn_craft` as `enableButton` / `disableButtonWith` / `setButtonVisible` leave it; the owner test is the view's. */
export interface CraftingButton {
    visible: boolean;
    enabled: boolean;
    /** `disableButtonWith`'s caption key, for the owner. */
    caption: string;
}

export interface CraftingData {
    /** The handler's initializing flag: products asked for and not answered yet. */
    initializing: boolean;
    /** `createMainWindow` ran: the window is up. */
    shown: boolean;
    mode: number;
    recipeItems: CraftingFurnitureItem[];
    inventoryItems: CraftingFurnitureItem[];
    mixerItems: CraftingMixerItem[];
    /** `_selectedProduct` (`showCraftableProduct`). */
    selectedRecipe?: CraftingFurnitureItem;
    /** The handler's product data and recipe code (`getCraftingRecipe`), which `doCraftingWithRecipe` needs. */
    selectedProductKnown: boolean;
    selectedRecipeCode: string;
    /** `setInfoText`: `header_mixer`. */
    infoText: string;
    infoText1: string;
    infoText2: string;
    /** `furniture_icon`'s furni, none when `clearIcon` ran. */
    icon?: IFurnitureData;
    button: CraftingButton;
    progressVisible: boolean;
    craftingInProgress: boolean;
    inventoryDirty: boolean;
    /** `registerForFurniListInvalidate`. */
    waitingForInvalidate: boolean;
}

const initialData = (): CraftingData => ({
    initializing: false,
    shown: false,
    mode: CRAFTING_MODE_NONE,
    recipeItems: [],
    inventoryItems: [],
    mixerItems: [],
    selectedRecipe: undefined,
    selectedProductKnown: false,
    selectedRecipeCode: '',
    infoText: '',
    infoText1: '',
    infoText2: '',
    icon: undefined,
    button: { visible: false, enabled: false, caption: '' },
    progressVisible: false,
    craftingInProgress: false,
    inventoryDirty: false,
    waitingForInvalidate: false,
});

let nextKey = 1;

const getRequest = () => roomStore.getState().openWidgets[RoomWidgetEnum.CRAFTING];

/** The open table's data, or none when no table is open. */
export const getCraftingData = (): CraftingData | undefined => {
    const request = getRequest();

    if (!request) return undefined;

    return { ...initialData(), ...(request.data as Partial<CraftingData> | undefined) };
};

const update = (change: (data: CraftingData) => Partial<CraftingData>) => {
    roomStore.getState().mergeRoomWidgetData<CraftingData>(RoomWidgetEnum.CRAFTING, previous => change({ ...initialData(), ...previous }));
};

/** `getFloorItemDataByName`, else `getWallItemDataByName`; which of the two it was. */
const furnitureByName = (className: string): { data: IFurnitureData; isWallItem: boolean } | undefined => {
    const lookup = systemStore.getState();
    const floor = getFloorItemDataByName(lookup, className);

    if (floor) return { data: floor, isWallItem: false };

    const wall = getWallItemDataByName(lookup, className);

    return wall ? { data: wall, isWallItem: true } : undefined;
};

const inventoryIdsOf = (furnitureData: IFurnitureData, isWallItem: boolean) => getNonRentedInventoryIds(inventoryStore.getState().furniGroups, furnitureData.id, isWallItem);

/**
 * `CraftingInfoController.setState`: the info texts, the icon and the button each state leaves -
 * a state that does not name one leaves it as it was.
 */
const infoState = (data: CraftingData, state: number, value?: number | IFurnitureData): Partial<CraftingData> => {
    const furni = (typeof value === 'object') ? value : undefined;
    const count = String((typeof value === 'number') ? value : 0);
    const hidden = { ...data.button, visible: false };
    const enabled: CraftingButton = { visible: true, enabled: true, caption: 'crafting.btn.craft' };
    const disabledWith = (caption: string): CraftingButton => ({ visible: true, enabled: false, caption });

    switch (state) {
        case CraftingInfoState.START:
            return { infoText1: t('crafting.info.start'), infoText2: '', button: hidden };
        case CraftingInfoState.MIXER_EMPTY:
            return { icon: undefined, infoText1: t('crafting.info.mixer.empty'), infoText2: '', button: disabledWith('crafting.status.mixer.notavailable') };
        case CraftingInfoState.PRODUCT_EMPTY:
            return { icon: undefined, infoText1: t('crafting.info.product.empty'), infoText2: '', button: hidden };
        case CraftingInfoState.MIXER_HIT:
            return { icon: undefined, infoText1: t('crafting.info.mixer.hit'), infoText2: '', button: enabled };
        case CraftingInfoState.MIXER_HIT_PLUS_OTHERS:
            return { icon: undefined, infoText1: t('crafting.info.mixer.hit.plus.others', 'crafting.info.mixer.hit.plus.others').replace('%number%', count), infoText2: '', button: enabled };
        case CraftingInfoState.MIXER_OTHERS:
            return { icon: undefined, infoText1: t('crafting.info.mixer.others').replace('%number%', count), infoText2: '', button: disabledWith('crafting.status.mixer.notavailable') };
        case CraftingInfoState.MIXER_NO_HIT:
            return { icon: undefined, infoText1: t('crafting.info.mixer.nohit'), infoText2: '', button: disabledWith('crafting.status.mixer.notavailable') };
        case CraftingInfoState.PRODUCT_COMPLETE:
            if (!furni) return {};

            return { icon: furni, infoText1: t('crafting.info.product.complete', 'crafting.info.product.complete'), infoText2: furni.localizedName, button: enabled };
        case CraftingInfoState.PRODUCT_INCOMPLETE:
            if (!furni) return {};

            return { icon: furni, infoText1: t('crafting.info.product.incomplete', 'crafting.info.product.incomplete'), infoText2: furni.localizedName, button: disabledWith('crafting.status.recipe.incomplete') };
        case CraftingInfoState.NOT_IN_INVENTORY:
            if (!furni) return {};

            // The button is left as it was, and `info_text2` emptied.
            return { icon: furni, infoText1: t('crafting.info.mixer.notininventory', 'crafting.info.mixer.notininventory').replace('%product%', furni.localizedName), infoText2: '' };
        case CraftingInfoState.RESULT_OK:
            if (!furni) return {};

            return { icon: furni, infoText1: t('crafting.info.result.ok', 'crafting.info.result.ok'), infoText2: furni.localizedName, button: hidden };
        case CraftingInfoState.WORKING:
            return { infoText1: t('crafting.info.working'), infoText2: '', button: hidden };
        default:
            return { infoText1: '', infoText2: '' };
    }
};

/**
 * `CraftingMixerController.returnItemsToInventory` (`clearItems`): each mixer item's id back on the
 * inventory item it came from - at the end of its ids, as `CraftingFurnitureItem.returnItemToInventory` pushes it.
 */
const withMixerReturned = (data: CraftingData): Pick<CraftingData, 'mixerItems' | 'inventoryItems'> => {
    let inventoryItems = data.inventoryItems;

    for (const mixed of data.mixerItems) {
        if (!mixed.sourceKey || !mixed.inventoryId) continue;

        inventoryItems = inventoryItems.map(item => ((item.key === mixed.sourceKey) ? { ...item, inventoryIds: [ ...item.inventoryIds, mixed.inventoryId ] } : item));
    }

    return { mixerItems: [], inventoryItems };
};

/** `CraftingWidgetHandler.getCraftableProducts`. */
const getCraftableProducts = (send: Send) => {
    const request = getRequest();

    if (request) send(new GetCraftableProductsComposer({ objectId: request.objectId }));
};

/**
 * `processEvent(RETWE_OPEN_WIDGET)` -> `initializeData`: nothing while the window is up; otherwise
 * the products are asked for now if the furni inventory is current, or once its list arrives.
 */
export const openCraftingTable = (send: Send) => {
    const data = getCraftingData();

    if (!data || data.shown || data.initializing) return;

    update(() => ({ initializing: true }));

    if (inventoryStore.getState().furniCategoryInitialized) getCraftableProducts(send);
    else checkFurniInventoryInitialization(send);
};

/** `onFurniListParsed`: the list arrived while the products wait for it. */
export const onCraftingFurniListParsed = (send: Send) => {
    if (getCraftingData()?.initializing) getCraftableProducts(send);
};

/**
 * `onCraftableProductsMessage`: nothing to make or use closes the table; otherwise the window
 * (`showWidget`, first time only) and both grids filled again (`showCraftingCategories`).
 */
export const onCraftableProducts = (products: ICraftableProduct[], usableInventoryFurniClasses: string[]) => {
    const data = getCraftingData();

    if (!data) return;

    if (!products.length && !usableInventoryFurniClasses.length) {
        closeCraftingTable();

        return;
    }

    const inventoryItems: CraftingFurnitureItem[] = [];

    for (const className of usableInventoryFurniClasses) {
        const furni = furnitureByName(className);

        if (!furni) continue;

        const ids = inventoryIdsOf(furni.data, furni.isWallItem);

        inventoryItems.push({ key: `i${nextKey++}`, recipeCode: '', productCode: '', furnitureData: furni.data, inventoryIds: ids?.length ? ids : [] });
    }

    const recipeItems: CraftingFurnitureItem[] = [];

    for (const product of products) {
        const furni = furnitureByName(product.furnitureClassName);

        if (furni) recipeItems.push({ key: `r${nextKey++}`, recipeCode: product.recipeCode, productCode: product.productCode, furnitureData: furni.data, inventoryIds: [] });
    }

    update((previous) => {
        const shown = previous.shown ? {} : { shown: true, infoText: '', ...infoState(previous, CraftingInfoState.START) };

        return { ...shown, initializing: false, inventoryItems, recipeItems, inventoryDirty: false };
    });
};

/** `CraftingRecipeItemRenderer.onTriggered` -> `showCraftableProduct` -> `getCraftingRecipe`. */
export const selectCraftingRecipe = (send: Send, key: string) => {
    const data = getCraftingData();
    const recipe = data?.recipeItems.find(item => item.key === key);

    if (!data || !recipe || data.craftingInProgress) return;

    update(() => ({
        selectedRecipe: recipe,
        infoText: recipe.furnitureData.localizedName,
        selectedProductKnown: !!systemStore.getState().productData[recipe.productCode],
        selectedRecipeCode: recipe.recipeCode,
    }));

    send(new GetCraftingRecipeComposer({ recipeCode: recipe.recipeCode }));
};

/**
 * `onCraftingRecipeMessage` -> `showCraftingRecipe`: the product view (`showCraftableProductView`),
 * then the recipe's ingredients in the mixer (`CraftingRecipeListController.showRecipe`) - one slot
 * per item, holding an owned id while there is one and greyed (id 0) after. An ingredient with no
 * furni data stops it there.
 */
export const onCraftingRecipe = (ingredients: ICraftingIngredient[]) => {
    update((previous) => {
        // `showCraftableProductView` empties another mode's mixer, `showRecipe` this one's.
        let data: CraftingData = { ...previous, ...withMixerReturned(previous), mode: CRAFTING_MODE_PUBLIC_RECIPE };

        data = { ...data, ...infoState(data, CraftingInfoState.PRODUCT_EMPTY) };

        const mixerItems: CraftingMixerItem[] = [];
        let complete = true;

        for (const ingredient of ingredients) {
            const furni = furnitureByName(ingredient.furnitureClassName);

            if (!furni) return { ...data, mixerItems };

            const ids = inventoryIdsOf(furni.data, furni.isWallItem);

            if (!ids || (ids.length < ingredient.count)) complete = false;

            for (let index = 0; index < ingredient.count; index++) {
                const inventoryId = ids?.length ? ids.shift()! : 0;

                mixerItems.push({ key: `m${nextKey++}`, furnitureData: furni.data, inventoryId });
            }
        }

        data = { ...data, mixerItems };

        if (!data.selectedRecipe) return data;

        return { ...data, ...infoState(data, complete ? CraftingInfoState.PRODUCT_COMPLETE : CraftingInfoState.PRODUCT_INCOMPLETE, data.selectedRecipe.furnitureData) };
    });
};

/** `mixerContentChanged`: a mix asks what it makes; an empty one is the empty mixer. */
const mixerContentChanged = (send: Send, data: CraftingData): Partial<CraftingData> => {
    const ids = data.mixerItems.map(item => item.inventoryId);
    const request = getRequest();

    if (!ids.length) return infoState(data, CraftingInfoState.MIXER_EMPTY);

    if (request) send(new GetCraftingRecipesAvailableComposer({ objectId: request.objectId, itemIds: ids }));

    return infoState(data, CraftingInfoState.WORKING);
};

/**
 * `CraftingInventoryItemRenderer.onTriggered`: one more of the furni into the mixer - not while a
 * craft runs or waits for the inventory, nor past ten - switching to secret recipe mode
 * (`showSecretRecipeView`, which empties a recipe's mixer first).
 */
export const addInventoryItemToMixer = (send: Send, key: string) => {
    const data = getCraftingData();

    if (!data || data.craftingInProgress || data.inventoryDirty || (data.mixerItems.length >= MIXER_MAX_ITEMS)) return;

    const source = data.inventoryItems.find(item => item.key === key);

    if (!source?.inventoryIds.length) return;

    const [ inventoryId, ...rest ] = source.inventoryIds;
    let next: CraftingData = { ...data, inventoryItems: data.inventoryItems.map(item => ((item.key === key) ? { ...item, inventoryIds: rest } : item)) };

    if (next.mode !== CRAFTING_MODE_SECRET_RECIPE) next = { ...next, ...withMixerReturned(next) };

    next = { ...next, mode: CRAFTING_MODE_SECRET_RECIPE, infoText: '' };
    next = { ...next, ...infoState(next, CraftingInfoState.MIXER_EMPTY) };
    next = { ...next, mixerItems: [ ...next.mixerItems, { key: `m${nextKey++}`, furnitureData: source.furnitureData, inventoryId, sourceKey: key } ] };
    next = { ...next, ...mixerContentChanged(send, next) };

    update(() => next);
};

/**
 * `CraftingMixerItemRenderer.onTriggered`: a missing ingredient says so; in secret recipe mode
 * the item goes back to the inventory (`removeListItem`) and the mix is asked about again.
 */
export const removeMixerItem = (send: Send, key: string) => {
    const data = getCraftingData();
    const mixed = data?.mixerItems.find(item => item.key === key);

    if (!data || !mixed || data.craftingInProgress || data.inventoryDirty) return;

    if (!mixed.inventoryId) {
        update(previous => infoState(previous, CraftingInfoState.NOT_IN_INVENTORY, mixed.furnitureData));

        return;
    }

    if (data.mode !== CRAFTING_MODE_SECRET_RECIPE) return;

    let next: CraftingData = {
        ...data,
        mixerItems: data.mixerItems.filter(item => item.key !== key),
        inventoryItems: data.inventoryItems.map(item => ((item.key === mixed.sourceKey) ? { ...item, inventoryIds: [ ...item.inventoryIds, mixed.inventoryId ] } : item)),
    };

    next = { ...next, ...mixerContentChanged(send, next) };

    update(() => next);
};

/** `onCraftingRecipesAvailableMessage` -> `craftingSecretRecipesAvailable`. */
export const onCraftingRecipesAvailable = (count: number, recipeComplete: boolean) => {
    update((data) => {
        if (recipeComplete) return (count === 0) ? infoState(data, CraftingInfoState.MIXER_HIT) : infoState(data, CraftingInfoState.MIXER_HIT_PLUS_OTHERS, count);

        return (count > 0) ? infoState(data, CraftingInfoState.MIXER_OTHERS, count) : infoState(data, CraftingInfoState.MIXER_NO_HIT);
    });
};

/** `onCraftTriggered` -> `showProgressBar`: the button gives way to the progress bar. */
export const startCrafting = () => {
    update(data => ({ craftingInProgress: true, button: { ...data.button, visible: false }, progressVisible: true }));
};

/** `cancelCrafting`: the progress bar pressed (or the window closed). */
export const cancelCrafting = () => {
    update(data => ({ craftingInProgress: false, progressVisible: false, button: { ...data.button, visible: true } }));
};

/**
 * `onProgressBarComplete` -> `doCrafting`: the mix (`doCraftingWithMixer`) or the recipe
 * (`doCraftingWithRecipe`, only with the product's data and a recipe code), each waiting for the
 * inventory to change afterwards.
 */
export const completeCrafting = (send: Send) => {
    const data = getCraftingData();
    const request = getRequest();

    update(() => ({ progressVisible: false }));

    if (!data || !request) return;

    if (data.mode === CRAFTING_MODE_SECRET_RECIPE) {
        update(previous => ({ ...infoState(previous, CraftingInfoState.WORKING), inventoryDirty: true, waitingForInvalidate: true }));
        send(new CraftSecretComposer({ objectId: request.objectId, itemIds: data.mixerItems.map(item => item.inventoryId) }));

        return;
    }

    if (data.mode !== CRAFTING_MODE_PUBLIC_RECIPE || !data.selectedProductKnown || !data.selectedRecipeCode) return;

    update(previous => ({ ...infoState(previous, CraftingInfoState.WORKING), inventoryDirty: true, waitingForInvalidate: true }));
    send(new CraftComposer({ objectId: request.objectId, recipeCode: data.selectedRecipeCode }));
};

/**
 * `onCraftingResultMessage`: the mixer empties either way. A failure stops waiting for the
 * inventory and shows the empty mixer; a success shows the product, if it is a floor item.
 */
export const onCraftingResult = (success: boolean, furnitureClassName: string) => {
    update((data) => {
        let next: CraftingData = { ...data, craftingInProgress: false, ...withMixerReturned(data) };

        if (!success) {
            next = { ...next, inventoryDirty: false, waitingForInvalidate: false };

            return { ...next, ...infoState(next, CraftingInfoState.MIXER_EMPTY) };
        }

        const furni = getFloorItemDataByName(systemStore.getState(), furnitureClassName);

        if (!furni) return next;

        return { ...next, ...infoState(next, CraftingInfoState.RESULT_OK, furni) };
    });
};

/** `onFurniListInvalidate`: after a craft, the inventory and the table asked for again. */
export const onCraftingFurniListInvalidate = (send: Send) => {
    if (!getCraftingData()?.waitingForInvalidate) return;

    requestFurniInventory(send);
    getCraftableProducts(send);
    update(() => ({ waitingForInvalidate: false }));
};

/** `CraftingWidget.hide`: everything cleared, a running craft cancelled, the window gone. */
export const closeCraftingTable = () => {
    roomStore.getState().closeRoomWidget(RoomWidgetEnum.CRAFTING);
};
