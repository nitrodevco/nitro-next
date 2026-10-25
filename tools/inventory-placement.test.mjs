/**
 * `FurniModel.requestSelectedFurniPlacement` / `onObjectPlaced` / `attemptPlaceNextFurni`: placing a
 * furni from the inventory goes on with the next one of the stack, and the window only comes back
 * when the stack is used up, the drop placed nothing, or the next one cannot be placed. Also the
 * item `nextItemButton` pages to (`selectedItemIndex`), and `showUseProductSelection`'s widget
 * requests.
 *
 * Runs the real command and group modules with the room, the window layer and the packets stubbed.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const load = (path, dependencies = {}) => {
    const source = readFileSync(new URL(`../packages/${path}.ts`, import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    runInNewContext(outputText, { exports, require: (name) => {
        assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);

        return dependencies[name];
    }, Math, Array, Object, Number, parseInt });

    return exports;
};

class MapDataType {}

const group = load('nitro-react/src/context/inventory/store/InventoryFurniGroup', {
    '@nitrodevco/nitro-api': { MapDataType },
    '@nitrodevco/nitro-packets': { TradeRequirementNodeType: {}, TradeRequirementType: {} },
});

const POST_IT = 5;
const FLOOR = 1;
const WALLPAPER = 2;

const stuff = (legacy = '') => ({ getLegacyString: () => legacy });
const item = (id, extra = {}) => ({ id, ref: id, typeId: 7, category: 0, isWallItem: false, stuffData: stuff(), extra: 0, groupable: true, tradeable: true, recyclable: false, sellable: false, isRented: false, flatId: -1, locked: false, ...extra });

const EXTERNAL_IMAGE_TYPE = 90;
const PET_PRODUCT_TYPE = 40;

/** A room, a window layer and an inventory store, enough for the commands to run against. */
const world = (groups, selectedId, selectedItemIndex = -1) => {
    const log = { started: [], cancelled: 0, shown: 0, hidden: 0, sent: [], widgets: [] };
    const state = {
        furniGroups: groups,
        furniSelectedGroupId: selectedId,
        furniSelectedItemIndex: selectedItemIndex,
        inventoryMoverRequested: false,
        inventoryMoverItemId: -1,
        setInventoryMoverRequested: (value) => { state.inventoryMoverRequested = value; },
        setInventoryMoverItemId: (value) => { state.inventoryMoverItemId = value; },
    };
    const commands = load('nitro-react/src/commands/inventory/inventoryCommands', {
        '@nitrodevco/nitro-api': {
            RoomObjectCategoryEnum: { Floor: 10, Wall: 20 },
            RoomObjectPlacementSource: { INVENTORY: 'inventory' },
            RoomEngineObjectPlacedEvent: class {},
            RoomObjectWidgetRequestEvent: { PET_PRODUCT_MENU: 'pet_product', EXTERNAL_IMAGE: 'external_image' },
        },
        '@nitrodevco/nitro-packets': {
            RequestFurniInventoryComposer: class {},
            RequestFurniInventoryWhenNotInRoomComposer: class {},
            RequestRoomPropertySetComposer: class { constructor(data) { this.data = data; } },
        },
        '#base/context/communication': {},
        '#base/context/inventory': { ...group, inventoryStore: { getState: () => state }, getSelectedFurniGroup: ({ furniGroups, furniSelectedGroupId }) => furniGroups.find(entry => entry.id === furniSelectedGroupId) },
        '#base/context/room': {
            getRoom: () => ({}),
            roomStore: {
                getState: () => ({
                    openRoomWidget: request => log.widgets.push({ ...request }),
                    updateRoomWidgetData: (type, data) => {
                        assert.equal(log.widgets.at(-1).type, type, 'the data goes to the request just opened');
                        log.widgets.at(-1).data = data;
                    },
                }),
            },
        },
        '#base/context/system': {
            systemStore: {
                getState: () => ({
                    floorItems: { [PET_PRODUCT_TYPE]: { isExternalImage: false } },
                    wallItems: { [EXTERNAL_IMAGE_TYPE]: { isExternalImage: true } },
                    hideWindow: (name) => {
                        assert.equal(name, 'inventory');
                        log.hidden++;
                    },
                    showWindow: (name) => {
                        assert.equal(name, 'inventory');
                        log.shown++;
                    },
                }),
            },
        },
        '#base/context/wired-trading': { wiredTradingStore: { getState: () => ({}) } },
        '#base/utils': { getFurnitureData: (lookup, typeId, isWallItem) => (isWallItem ? lookup.wallItems : lookup.floorItems)[typeId] },
        '../catalog/catalogPlacementCommands': {
            initializeRoomObjectInsert: (source, id, category, typeId, instanceData, stuffData) => {
                log.started.push({ source, id, category, instanceData, stuffData });

                return true;
            },
            cancelRoomObjectInsert: () => { log.cancelled++; },
        },
        './inventoryTradingCommands': {},
        '../wired-trading/wiredTradingCommands': {},
    });
    const placed = (objectId, flags = {}) => commands.onInventoryObjectPlaced({ objectId, placedInRoom: true, placedOnFloor: true, placedOnWall: false, ...flags });

    return { commands, state, log, placed, send: message => log.sent.push(message) };
};

const stack = (...items) => ({ id: 1, typeId: 7, category: 0, stuffData: stuff(), extra: 0, items, hasUnseenItems: false });
const startedIds = w => w.log.started.map(x => x.id);

await test('the next furni of a stack is chosen below the one just placed, skipping locked ones', () => {
    const g = stack(item(1), item(2, { locked: true }), item(3));

    assert.equal(group.findNextInventoryFurniToPlace(g, 3)?.id, 1);
    assert.equal(group.findNextInventoryFurniToPlace(g, 1), undefined);
    assert.equal(group.findNextInventoryFurniToPlace(g, 99), undefined);
    assert.equal(group.findNextInventoryFurniToPlace(stack(item(1), item(2)), 2)?.id, 1);
});

await test('a stack is placed one after the other, and the window comes back after the last', () => {
    const w = world([ stack(item(1), item(2), item(3)) ], 1);

    assert.equal(w.commands.requestSelectedFurniPlacement(w.send), true);
    assert.deepEqual(startedIds(w), [ 3 ], 'the last item first, as GroupItem.peek');
    assert.equal(w.log.hidden, 1);

    w.placed(3);
    assert.deepEqual(startedIds(w), [ 3, 2 ], 'the next one is in the mover at once');
    assert.equal(w.log.shown, 0, 'the window stays away between placements');

    // The server removes what was placed; the next drop finds the group shorter.
    w.state.furniGroups = [ stack(item(1), item(2)) ];
    w.placed(2);
    assert.deepEqual(startedIds(w), [ 3, 2, 1 ]);
    assert.equal(w.log.shown, 0);

    w.state.furniGroups = [ stack(item(1)) ];
    w.placed(1);
    assert.deepEqual(startedIds(w), [ 3, 2, 1 ], 'nothing left to place');
    assert.equal(w.log.shown, 1, 'the window comes back once the stack is used up');
    assert.equal(w.log.cancelled, 1);
    assert.equal(w.state.inventoryMoverRequested, false);
    assert.equal(w.state.inventoryMoverItemId, -1);
});

await test('a single furni is placed once and the window comes back', () => {
    const w = world([ stack(item(5)) ], 1);

    w.commands.requestSelectedFurniPlacement(w.send);
    w.placed(5);

    assert.deepEqual(startedIds(w), [ 5 ]);
    assert.equal(w.log.shown, 1);
});

await test('items locked in a trade are not placed, and a stack that is only locked cannot be started', () => {
    const w = world([ stack(item(1), item(2, { locked: true }), item(3)) ], 1);

    w.commands.requestSelectedFurniPlacement(w.send);
    w.placed(3);

    assert.deepEqual(startedIds(w), [ 3, 1 ], 'the locked item is stepped over');

    const locked = world([ stack(item(1, { locked: true })) ], 1);

    assert.equal(locked.commands.requestSelectedFurniPlacement(locked.send), false);
    assert.deepEqual(startedIds(locked), []);
});

await test('a drop that placed nothing brings the window back and cancels the ghost', () => {
    const w = world([ stack(item(1), item(2)) ], 1);

    w.commands.requestSelectedFurniPlacement(w.send);
    w.placed(2, { placedInRoom: false });

    assert.deepEqual(startedIds(w), [ 2 ], 'no next furni is started');
    assert.equal(w.log.shown, 1);
    assert.equal(w.log.cancelled, 1);
    assert.equal(w.state.inventoryMoverRequested, false);
});

await test('a furni placed on a wall continues the stack the same way', () => {
    const w = world([ stack(item(1, { isWallItem: true }), item(2, { isWallItem: true })) ], 1);

    w.commands.requestSelectedFurniPlacement(w.send);
    w.placed(-2, { placedOnFloor: false, placedOnWall: true });

    assert.deepEqual(startedIds(w), [ 2, 1 ]);
    assert.equal(w.log.started[0].category, 20, 'wall items are placed on the wall');
});

await test('something other than the item the page started with is left alone, as in Flash', () => {
    const w = world([ stack(item(1), item(2)) ], 1);

    w.commands.requestSelectedFurniPlacement(w.send);
    w.placed(999);

    assert.deepEqual(startedIds(w), [ 2 ]);
    assert.equal(w.log.shown, 0);
    assert.equal(w.state.inventoryMoverRequested, false, 'the flag is spent either way');
});

await test('a rented furni already standing in a room is not continued into', () => {
    const w = world([ stack(item(1, { isRented: true, flatId: 12 }), item(2)) ], 1);

    w.commands.requestSelectedFurniPlacement(w.send);
    w.placed(2);

    assert.deepEqual(startedIds(w), [ 2 ]);
    assert.equal(w.log.shown, 1);
});

await test('a pet or a bot placement only brings the window back', () => {
    const w = world([], -1);

    w.commands.hideInventoryForPlacement();
    assert.equal(w.state.inventoryMoverItemId, -1);

    w.placed(42);

    assert.deepEqual(startedIds(w), []);
    assert.equal(w.log.shown, 1);
    assert.equal(w.state.inventoryMoverRequested, false);
});

await test('nothing happens when the inventory did not start the placement', () => {
    const w = world([ stack(item(1), item(2)) ], 1);

    w.placed(2);

    assert.deepEqual(startedIds(w), []);
    assert.equal(w.log.shown, 0);
    assert.equal(w.log.cancelled, 0);
});

await test('a post-it group places its first sheet again while more than one is left', () => {
    const sheets = n => ({ ...stack(item(1, { category: POST_IT, stuffData: stuff(String(n)) })), category: POST_IT });
    const w = world([ sheets(3) ], 1);

    w.commands.requestSelectedFurniPlacement(w.send);
    w.placed(1);

    assert.deepEqual(startedIds(w), [ 1, 1 ]);

    const last = world([ sheets(1) ], 1);

    last.commands.requestSelectedFurniPlacement(last.send);
    last.placed(1);

    assert.deepEqual(startedIds(last), [ 1 ]);
    assert.equal(last.log.shown, 1);
});

await test('a room paper is applied, not placed, and a double click does not apply it', () => {
    const paper = stack(item(9, { category: WALLPAPER }));
    const w = world([ paper ], 1);

    assert.equal(w.commands.requestSelectedFurniPlacement(w.send, true), false);
    assert.equal(w.commands.requestSelectedFurniPlacement(w.send, false), true);
    assert.equal(w.log.sent.length, 1);
    assert.deepEqual(startedIds(w), []);
    assert.equal(FLOOR, 1);
});

await test('the item nextItemButton paged to is the one placed, and paging wraps past the last', () => {
    const photos = stack(item(1, { isWallItem: true }), item(2, { isWallItem: true }), item(3, { isWallItem: true }));

    assert.equal(group.getInventoryFurniSelectedItem(photos, -1)?.id, 3, 'nothing paged to: GroupItem.peek');
    assert.equal(group.getInventoryFurniSelectedItem(photos, 0)?.id, 1);
    assert.equal(group.getInventoryFurniSelectedItem(photos, 7)?.id, 3, 'an index past the items reads as the last');
    assert.equal(group.getNextInventoryFurniItemIndex(photos, -1), 0, 'the first press shows the first');
    assert.equal(group.getNextInventoryFurniItemIndex(photos, 1), 2);
    assert.equal(group.getNextInventoryFurniItemIndex(photos, 2), 0, 'past the last goes back to the first');

    const w = world([ photos ], 1, 0);

    w.commands.requestSelectedFurniPlacement(w.send);
    assert.deepEqual(startedIds(w), [ 1 ]);
});

await test('an external image is placed with its picture as the instance data, like a poster', () => {
    const json = '{"w":"photo.png","m":"hello"}';
    const w = world([ stack(item(4, { isWallItem: true, typeId: EXTERNAL_IMAGE_TYPE, stuffData: stuff(json), extra: 0 })) ], 1);

    w.commands.requestSelectedFurniPlacement(w.send);

    assert.equal(w.log.started[0].instanceData, json);
    assert.equal(w.log.started[0].stuffData, undefined);

    const other = world([ stack(item(5, { isWallItem: true, stuffData: stuff('x'), extra: 3 })) ], 1);

    other.commands.requestSelectedFurniPlacement(other.send);

    assert.equal(other.log.started[0].instanceData, '3', 'anything else carries its extra');
});

await test('use and view hand the room widgets the inventory item, each only when it has what it needs', () => {
    const product = stack(item(6, { ref: 66, typeId: PET_PRODUCT_TYPE }));
    const photo = stack(item(7, { ref: 77, isWallItem: true, typeId: EXTERNAL_IMAGE_TYPE }));
    const w = world([ product, photo ], 1);

    w.commands.showInventoryUseProductSelection(66, PET_PRODUCT_TYPE);
    assert.deepEqual(JSON.parse(JSON.stringify(w.log.widgets.map(x => [ x.type, x.data ]))), [ [ 'pet_product', { inventoryStripId: 66, furnitureTypeId: PET_PRODUCT_TYPE } ] ], 'the product is the item ref');

    w.log.widgets.length = 0;
    w.commands.showInventoryUseProductSelection(77, EXTERNAL_IMAGE_TYPE, 7);
    assert.deepEqual(JSON.parse(JSON.stringify(w.log.widgets.map(x => [ x.type, x.data ]))), [ [ 'external_image', { inventoryItemId: 7 } ] ], 'no floor data for the photo type, so no pet menu');

    w.log.widgets.length = 0;
    w.commands.showInventoryUseProductSelection(66, PET_PRODUCT_TYPE, 6);
    assert.deepEqual(w.log.widgets.map(x => x.type), [ 'pet_product' ], 'a floor item is no wall item to show');
});
