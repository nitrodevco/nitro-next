/** AS3 achievement wire, cumulative presentation and session lifecycle regressions. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';
import { createStore } from 'zustand';

const load = (path, dependencies = {}, globals = {}) => {
    const source = readFileSync(new URL(`../packages/${path}.ts`, import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    runInNewContext(outputText, { ...globals, exports, require: (name) => {
        assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);

        return dependencies[name];
    } });

    return exports;
};
const model = load('nitro-react/src/context/achievements/store/achievementModel');
const { createAchievementsStore } = load('nitro-react/src/context/achievements/store/AchievementsStore', { zustand: { createStore }, './achievementModel': model });
const parser = load('nitro-packets/src/incoming/Data/AchievementParser');
const { AchievementsEventMessage } = load('nitro-packets/src/incoming/Inventory/Achievements/AchievementsEventMessage', { '../../Data/AchievementParser': parser });
const { AchievementEventMessage } = load('nitro-packets/src/incoming/Inventory/Achievements/AchievementEventMessage', { '../../Data/AchievementParser': parser });
const { AchievementsScoreEventMessage } = load('nitro-packets/src/incoming/Inventory/Achievements/AchievementsScoreEventMessage');
const { AchievementLevelUpDataParser } = load('nitro-packets/src/incoming/Notifications/Data/AchievementLevelUpDataParser');
const plain = value => JSON.parse(JSON.stringify(value));
const achievement = (overrides = {}) => ({ achievementId: 1001, level: 3, badgeId: 'ACH_Login3', scoreAtStartOfLevel: 2, field_V1O: 5, field_EX: 3, finalLevel: false, category: 'identity', subCategory: '', levelRewardPoints: 0, levelRewardPointType: 0, levelCount: 20, displayMethod: 0, state: 1, code: 'Login', ...overrides });
const fixture = JSON.parse(readFileSync(new URL('./fixtures/achievements.json', import.meta.url), 'utf8'));
const record = fixture.achievement;
const wrapper = (fields) => {
    let index = 0;
    const read = (type) => {
        assert.ok(index < fields.length, 'read past fixture');
        const [ expected, value ] = fields[index++];

        assert.equal(type, expected, `field ${index}`);

        return value;
    };

    return { readInt: () => read('Int'), readString: () => read('String'), readBoolean: () => read('Boolean'), readShort: () => read('Short'), complete: () => assert.equal(index, fields.length) };
};

await test('initialization requests the catalog once per session, and the badge limits are left to the inventory', () => {
    const store = createAchievementsStore();
    class GetAchievementsComposer {}
    class GetBadgePointLimitsComposer {}
    const { requestAchievements } = load('nitro-react/src/commands/achievements/achievementCommands', {
        '@nitrodevco/nitro-packets': { GetAchievementsComposer, GetBadgePointLimitsComposer },
        '#base/context/achievements': { achievementsStore: store },
        '#base/context/system': {}, '#base/context/wired': {},
    });
    const sent = [];
    const send = packet => sent.push(packet.constructor.name);

    requestAchievements(send);
    requestAchievements(send);
    // `HabboInventory.initComponent` sends GetBadgePointLimits at start-up; `ensureAchievementsInitialized` only GetAchievements.
    assert.deepEqual(sent, [ 'GetAchievementsComposer' ]);
    store.getState().reset();
    requestAchievements(send);
    assert.deepEqual(sent, [ 'GetAchievementsComposer', 'GetAchievementsComposer' ]);
});

await test('list and update consume complete AS3 records including short state and category tail', () => {
    const list = wrapper([ [ 'Int', 2 ], ...record, ...record, [ 'String', 'identity' ] ]);
    const result = new AchievementsEventMessage().parse(list);

    assert.equal(result.achievements.length, 2);
    assert.equal(result.defaultCategory, 'identity');
    assert.deepEqual(plain(result.achievements[0]), achievement());
    list.complete();
    const update = wrapper(record);

    assert.deepEqual(plain(new AchievementEventMessage().parse(update).achievement), achievement());
    update.complete();
});

await test('score and all fourteen notification fields retain correct types and reward kind', () => {
    const score = wrapper([ [ 'Int', 900 ] ]);

    assert.equal(new AchievementsScoreEventMessage().parse(score).score, 900);
    score.complete();
    const fields = fixture.notification;
    const notification = wrapper(fields);
    const result = AchievementLevelUpDataParser(notification);

    assert.equal(result.levelRewardPointType, 5);
    assert.equal(result.showDialogToUser, false);
    assert.equal(result.badgeRarityId, 8);
    notification.complete();
});

await test('offsets describe in-level progress; final target counts as earned', () => {
    assert.deepEqual(plain(model.achievementProgress(achievement())), { current: 1, limit: 3, earned: 2 });
    assert.equal(model.achievementProgress(achievement({ finalLevel: true })).earned, 3);
    assert.equal(model.achievedBadgeCode(achievement()), 'ACH_Login2');
    assert.equal(model.achievedBadgeCode(achievement({ finalLevel: true })), 'ACH_Login3');
    assert.equal(model.achievedBadgeCode(achievement({ level: 1, badgeId: 'ACH_Login1' })), 'ACH_Login1');
    assert.equal(model.firstLevelAchieved(achievement({ level: 1 })), false);
    assert.equal(model.firstLevelAchieved(achievement({ level: 1, finalLevel: true })), true);
});

await test('a zero first threshold has finite empty progress before authoritative attainment', () => {
    const progress = model.achievementProgress(achievement({ level: 1, badgeId: 'ACH_VipHC1', scoreAtStartOfLevel: 0, field_V1O: 0, field_EX: 0, levelCount: 5 }));

    assert.deepEqual(plain(progress), { current: 0, limit: 1, earned: 0 });
});

await test('raised thresholds keep AS3 raw values; the bar width never goes below zero', () => {
    const revised = achievement({ level: 4, badgeId: 'ACH_PetLevelUp4', scoreAtStartOfLevel: 20, field_V1O: 30, field_EX: 3 });

    assert.deepEqual(plain(model.achievementProgress(revised)), { current: -17, limit: 10, earned: 3 });
    assert.equal(model.achievedBadgeCode(revised), 'ACH_PetLevelUp3');
});

await test('categories follow AS3: misc last, archive and wired_games always, new only with entries', () => {
    const categories = model.buildCategories([
        achievement({ category: 'misc' }), achievement({ category: 'social' }),
        achievement({ category: 'pets', state: 2 }), achievement({ category: 'identity', state: 0 }),
        achievement({ category: 'identity', state: 4 }), achievement({ category: 'wired_games', state: 4 }),
        achievement({ category: '' }),
    ], [ 'Login' ]);

    assert.deepEqual(plain(categories.map(entry => entry.code)), [ 'social', 'identity', 'misc', 'archive', 'wired_games', 'new' ]);
    assert.equal(categories.find(entry => entry.code === 'archive').achievements[0].category, 'pets');
    assert.equal(model.buildCategories([ achievement() ]).some(entry => entry.code === 'new'), false);
    assert.deepEqual(plain(model.buildCategories([]).map(entry => entry.code)), [ 'archive', 'wired_games' ]);
    assert.deepEqual(plain(model.buildCategories([ achievement() ]).filter(model.categoryVisibleInList).map(entry => entry.code)), [ 'identity', 'archive' ]);
});

await test('category and total progress sum earned levels, the total including new and wired_games', () => {
    const categories = model.buildCategories([ achievement({ code: 'Login' }), achievement({ achievementId: 2, level: 2, code: 'Other' }) ], [ 'Login' ]);

    assert.deepEqual(plain(model.categoryProgress(categories[0])), { progress: 3, max: 40 });
    assert.deepEqual(plain(model.totalProgress(categories)), { progress: 5, max: 60 });
});

await test('requests only once per session and cache reset allows another request', () => {
    const store = createAchievementsStore();

    assert.equal(store.getState().request(), true);
    assert.equal(store.getState().request(), false);
    store.getState().setList([ achievement() ], 'identity');
    assert.equal(store.getState().request(), false);
    store.getState().reset();
    assert.equal(store.getState().request(), true);
});

await test('the list is built once; the default category applies only when the window asked for it', () => {
    const store = createAchievementsStore();

    store.getState().setList([ achievement() ], 'identity');
    assert.equal(store.getState().category, '');
    store.getState().setList([ achievement({ achievementId: 7, category: 'pets' }) ], 'pets');
    assert.equal(store.getState().categories.flatMap(entry => entry.achievements).some(entry => entry.achievementId === 7), false);
    const asked = createAchievementsStore();

    asked.getState().show();
    asked.getState().setList([ achievement() ], 'identity');
    assert.equal(asked.getState().category, 'identity');
    assert.equal(asked.getState().selectedId, 1001);
    const unknown = createAchievementsStore();

    unknown.getState().show();
    unknown.getState().setList([ achievement() ], 'missing');
    assert.equal(unknown.getState().category, '');
});

await test('category links wait for the list and win over the default category', () => {
    const store = createAchievementsStore();

    store.getState().show();
    store.getState().selectCategoryLink('pets');
    assert.equal(store.getState().pendingCategory, 'pets');
    store.getState().setList([ achievement(), achievement({ achievementId: 7, category: 'pets', badgeId: 'ACH_Pet1' }) ], 'identity');
    assert.equal(store.getState().category, 'pets');
    assert.equal(store.getState().selectedId, 7);
    assert.equal(store.getState().pendingCategory, undefined);
    store.getState().selectCategoryLink('identity');
    assert.equal(store.getState().category, 'identity');
});

await test('selected crossed level fills its old bar and queues latest progress until transition', () => {
    const store = createAchievementsStore();
    const level = () => store.getState().categories.find(entry => entry.code === 'identity').achievements[0];

    store.getState().setList([ achievement() ], 'identity');
    store.getState().pickCategory('identity');
    assert.equal(store.getState().update(achievement({ level: 4, field_EX: 5 })), true);
    assert.equal(level().field_EX, 5);
    assert.equal(level().level, 3);
    assert.equal(store.getState().update(achievement({ level: 4, field_EX: 6 })), false);
    assert.equal(store.getState().pending.field_EX, 6);
    store.getState().finishTransition();
    assert.equal(level().level, 4);
    assert.equal(level().field_EX, 6);
    assert.equal(store.getState().pending, undefined);
});

await test('an update for an unselected achievement is unseen; a selected one is not, even with the window closed', () => {
    const store = createAchievementsStore();

    store.getState().setList([ achievement() ], 'identity');
    store.getState().update(achievement({ field_EX: 4 }));
    store.getState().update(achievement({ field_EX: 4 }));
    assert.deepEqual(plain(store.getState().unseen.map(entry => entry.achievementId)), [ 1001 ]);
    store.getState().close();
    assert.equal(store.getState().unseen.length, 0);
    store.getState().pickCategory('identity');
    store.getState().update(achievement({ field_EX: 5 }));
    assert.equal(store.getState().unseen.length, 0);
});

await test('back clears only that category unseen entries and returns to the overview', () => {
    const store = createAchievementsStore();

    store.getState().setList([ achievement({ achievementId: 1 }), achievement({ achievementId: 2, category: 'pets' }) ], 'identity');
    store.getState().update(achievement({ achievementId: 1, field_EX: 4 }));
    store.getState().update(achievement({ achievementId: 2, category: 'pets', field_EX: 4 }));
    store.getState().pickCategory('identity');
    store.getState().back();
    assert.equal(store.getState().category, '');
    assert.equal(store.getState().selectedId, undefined);
    assert.deepEqual(plain(store.getState().unseen.map(entry => entry.achievementId)), [ 2 ]);
});

await test('account reset discards pending level transition, cache and unseen entries', () => {
    const store = createAchievementsStore();

    store.getState().setList([ achievement() ], 'identity');
    store.getState().pickCategory('identity');
    store.getState().update(achievement({ level: 4, field_EX: 5 }));
    store.getState().reset();
    store.getState().finishTransition();
    assert.equal(store.getState().pending, undefined);
    assert.equal(store.getState().categories, undefined);
    assert.equal(store.getState().unseen.length, 0);
});

await test('shared final-level fixture retains cumulative boundaries and final target', () => {
    const input = wrapper(fixture.finalAchievement);
    const value = new AchievementEventMessage().parse(input).achievement;

    assert.equal(value.level, 20);
    assert.equal(value.finalLevel, true);
    assert.equal(model.achievementProgress(value).earned, 20);
    input.complete();
});

await test('wired achievements require the room-enabler binding in the wired_games category only', () => {
    const wired = achievement({ category: 'wired_games', code: 'WF_Custom' });

    assert.equal(model.achievementVisibleInCategory('wired_games', wired, []), false);
    assert.equal(model.achievementVisibleInCategory('wired_games', wired, [ 'Custom' ]), true);
    assert.equal(model.achievementVisibleInCategory('wired_games', achievement(), [ 'Custom' ]), false);
    assert.equal(model.achievementVisibleInCategory('new', wired, []), true);
});

await test('handler list never opens a window, transition waits 2000ms, room exit closes and disconnect cancels work', () => {
    const store = createAchievementsStore();
    class EventLogComposer {
        constructor(params) {
            this.params = params;
        }
    }
    const packets = { AchievementEventMessage, AchievementsEventMessage, AchievementsScoreEventMessage, EventLogComposer, HabboAchievementNotificationMessage: class {}, UserObjectMessage: class {} };
    const listeners = new Map();
    const timers = new Map();
    const system = { config: {}, visibleWindows: {}, hideWindow: (name) => {
        delete system.visibleWindows[name];
    }, getLocalizationValue: key => key };
    const room = createStore(() => ({ room: undefined }));
    const badges = [];
    const removed = [];
    const notifications = [];
    const sent = [];
    let nextTimer = 0;
    const { registerAchievementHandlers } = load('nitro-react/src/handlers/achievements/registerAchievementHandlers', {
        '@nitrodevco/nitro-packets': packets,
        '#base/context/achievements': { achievementsStore: store },
        '#base/context/inventory': { inventoryStore: { getState: () => ({ updateBadge: badge => badges.push(badge), removeBadge: code => removed.push(code) }) } },
        '#base/context/notifications': { notificationStore: { getState: () => ({ addNotification: (...args) => notifications.push(args) }) } },
        '#base/context/room': { roomStore: room, onRoomLeft: onLeft => room.subscribe((state, previous) => { if (previous.room && (state.room !== previous.room)) onLeft(); }) },
        '#base/context/system': { systemStore: { getState: () => system }, badgeImageUrl: code => String(system.config['badge.asset.url'] ?? '').replace('%badgename%', code) },
        '#base/utils': { getBadgeName: (_t, code) => code, getBadgeBaseAndLevel: code => ({ base: code.replace(/\d+$/, ''), level: 1 }) },
        '../packetSubscriptions': { on: (packet, handler) => ({ packet, handler }), subscribeAll: (subscribe, subscriptions) => {
            const stops = subscriptions.map(({ packet, handler }) => subscribe(packet, handler));

            return () => stops.forEach(stop => stop());
        } },
    }, {
        setTimeout: (callback, delay) => {
            const id = ++nextTimer;

            timers.set(id, { callback, delay });

            return id;
        },
        clearTimeout: id => timers.delete(id),
    });
    const unsubscribe = registerAchievementHandlers({ send: packet => sent.push(packet), subscribe: (packet, handler) => {
        listeners.set(packet, handler);

        return () => listeners.delete(packet);
    } });
    listeners.get(packets.AchievementsScoreEventMessage)({ score: 120 });
    // The list is never asked for at login: only the window and the first room's camera ask (`ensureAchievementsInitialized`).
    listeners.get(packets.UserObjectMessage)({ userInfo: { userId: 1 } });
    assert.equal(store.getState().requested, false);
    assert.equal(sent.length, 0);
    assert.equal(store.getState().score, 120);
    listeners.get(packets.UserObjectMessage)({ userInfo: { userId: 1 } });
    assert.equal(store.getState().requested, false);
    assert.equal(store.getState().request(), true);
    listeners.get(packets.AchievementsEventMessage)({ achievements: [ achievement() ], defaultCategory: 'identity' });
    assert.equal(system.visibleWindows.achievements, undefined);
    assert.equal(store.getState().category, '');
    store.getState().pickCategory('identity');
    system.visibleWindows.achievements = {};
    listeners.get(packets.AchievementEventMessage)({ achievement: achievement({ level: 4, field_EX: 5 }) });
    assert.equal(timers.size, 1);
    const timer = Array.from(timers.values())[0];

    assert.equal(timer.delay, 2000);
    assert.equal(store.getState().categories[0].achievements[0].level, 3);
    timer.callback();
    assert.equal(store.getState().categories[0].achievements[0].level, 4);
    const award = { achievementID: 1001, level: 4, badgeCode: 'ACH_Login4', removedBadgeCode: 'ACH_Login3', category: 'identity', showDialogToUser: true };

    listeners.get(packets.HabboAchievementNotificationMessage)({ data: award });
    assert.equal(badges.length, 1);
    assert.deepEqual(removed, [ 'ACH_Login3' ]);
    assert.equal(notifications.length, 1);
    assert.deepEqual(plain(sent[0].params), { event: 'Achievements', data: 'ACH_Login', action: 'Leveled', extraString: '', extraInt: 4 });
    system.visibleWindows.achievements = {};
    store.getState().update(achievement({ achievementId: 5, category: 'pets', field_EX: 4 }));
    room.setState({ room: {} });
    assert.equal(system.visibleWindows.achievements !== undefined, true);
    room.setState({ room: undefined });
    assert.equal(system.visibleWindows.achievements, undefined);
    assert.equal(store.getState().unseen.length, 0);
    assert.equal(store.getState().request(), false);
    listeners.get(packets.UserObjectMessage)({ userInfo: { userId: 2 } });
    assert.equal(store.getState().score, 0);
    assert.equal(store.getState().request(), true);
    unsubscribe();
    assert.equal(timers.size, 0);
    assert.equal(listeners.size, 0);
    assert.equal(store.getState().categories, undefined);
    assert.equal(system.visibleWindows.achievements, undefined);
});
