/**
 * Reception quest-package regressions: the daily quest, concurrent users and hall of fame packets
 * against their Flash parsers and composers, the numbers `ConcurrentUsersInfoElementHandler`, the
 * meter, `CommunityGoalPrizesWidget` and `CommunityGoalHallOfFameWidget` work out, and what
 * `registerHotelViewHandlers` asks for them.
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

    runInNewContext(outputText, { exports, performance, setInterval, clearInterval, setTimeout, clearTimeout, Date, require: (name) => {
        assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);

        return dependencies[name];
    } });

    return exports;
};

/** A wrapper that hands out `[ type, value ]` pairs in order and fails on a read of the wrong type. */
const wrapper = (fields) => {
    const queue = [ ...fields ];
    const read = type => () => {
        assert.ok(queue.length > 0, `read${type} past the end`);

        const [ expected, value ] = queue.shift();

        assert.equal(type, expected, `read${type} where the packet has a ${expected}`);

        return value;
    };

    return { readBoolean: read('Boolean'), readInt: read('Int'), readString: read('String'), left: () => queue.length };
};

const QuestsMessage = load('nitro-packets/src/incoming/Quest/QuestsMessage');
const { QuestDailyMessage } = load('nitro-packets/src/incoming/Quest/QuestDailyMessage', { './QuestsMessage': QuestsMessage });
const { ConcurrentUsersGoalProgressMessage } = load('nitro-packets/src/incoming/Quest/ConcurrentUsersGoalProgressMessage');
const { CommunityGoalHallOfFameMessage } = load('nitro-packets/src/incoming/Quest/CommunityGoalHallOfFameMessage', { '../Data/HallOfFameEntryDataParser': load('nitro-packets/src/incoming/Data/HallOfFameEntryDataParser') });
const { GetDailyQuestComposer } = load('nitro-packets/src/outgoing/Quest/GetDailyQuestComposer');
const { GetCommunityGoalHallOfFameComposer } = load('nitro-packets/src/outgoing/Quest/GetCommunityGoalHallOfFameComposer');
const { ForwardToACompetitionRoomComposer } = load('nitro-packets/src/outgoing/Competition/ForwardToACompetitionRoomComposer');
const slice = load('nitro-react/src/context/system/store/HotelViewSlice');
const quests = load('nitro-react/src/context/system/store/HotelViewQuestWidgets', { './HotelViewSlice': slice });

/** `QuestMessageData`'s reads, a non-seasonal quest. */
const QUEST_FIELDS = [
    [ 'String', 'daily' ], [ 'Int', 1 ], [ 'Int', 5 ], [ 'Int', 0 ], [ 'Int', 42 ], [ 'Boolean', false ], [ 'String', 'ROOM' ], [ 'String', 'v1' ], [ 'Int', 10 ],
    [ 'String', 'dance' ], [ 'Int', 0 ], [ 'Int', 1 ], [ 'Int', 3 ], [ 'String', '' ], [ 'String', 'chainA' ], [ 'Boolean', true ], [ 'Boolean', false ],
];

await test('QuestDailyMessage reads the flag, then the quest and both counts only when it is set', () => {
    const empty = wrapper([ [ 'Boolean', false ] ]);

    assert.deepEqual({ ...new QuestDailyMessage().parse(empty) }, { quest: null, easyQuestCount: 0, hardQuestCount: 0 });
    assert.equal(empty.left(), 0);

    const offered = wrapper([ [ 'Boolean', true ], ...QUEST_FIELDS, [ 'Int', 3 ], [ 'Int', 2 ] ]);
    const parsed = new QuestDailyMessage().parse(offered);

    assert.equal(offered.left(), 0);
    assert.equal(parsed.quest.id, 42);
    assert.equal(parsed.quest.localizationCode, 'dance');
    assert.equal(parsed.quest.chainCode, 'chainA');
    assert.equal(parsed.quest.easy, true);
    assert.equal(parsed.easyQuestCount, 3);
    assert.equal(parsed.hardQuestCount, 2);
});

await test('ConcurrentUsersGoalProgressMessage reads state, users and goal; the hall of fame its code and five fields a leader', () => {
    const progress = wrapper([ [ 'Int', 2 ], [ 'Int', 900 ], [ 'Int', 1000 ] ]);

    assert.deepEqual({ ...new ConcurrentUsersGoalProgressMessage().parse(progress) }, { state: 2, userCount: 900, userCountGoal: 1000 });
    assert.equal(progress.left(), 0);

    const hof = wrapper([
        [ 'String', 'gardening' ], [ 'Int', 2 ],
        [ 'Int', 7 ], [ 'String', 'Leader' ], [ 'String', 'hd-180-1' ], [ 'Int', 1 ], [ 'Int', 500 ],
        [ 'Int', 8 ], [ 'String', 'Second' ], [ 'String', 'hd-180-2' ], [ 'Int', 2 ], [ 'Int', 400 ],
    ]);
    const { data } = new CommunityGoalHallOfFameMessage().parse(hof);

    assert.equal(hof.left(), 0);
    assert.equal(data.goalCode, 'gardening');
    assert.deepEqual([ ...data.hof ].map(entry => ({ ...entry })), [
        { userId: 7, userName: 'Leader', figure: 'hd-180-1', rank: 1, currentScore: 500 },
        { userId: 8, userName: 'Second', figure: 'hd-180-2', rank: 2, currentScore: 400 },
    ]);
});

await test('composers send what the Flash constructors push, in order', () => {
    assert.deepEqual([ ...new GetDailyQuestComposer({ easy: false, index: 2 }).compose() ], [ false, 2 ]);
    assert.deepEqual([ ...new GetCommunityGoalHallOfFameComposer({ code: 'hof1' }).compose() ], [ 'hof1' ]);
    assert.deepEqual([ ...new ForwardToACompetitionRoomComposer({ goalCode: 'gardening', userId: 7 }).compose() ], [ 'gardening', 7 ]);
});

await test('the meter frame is the int share of the goal, held to 20..100 in tens; the texts go .success past the goal', () => {
    assert.equal(quests.concurrentUsersMeterAsset('L/', 0, 0), 'L/reception/challenge_meter_20.png');
    assert.equal(quests.concurrentUsersMeterAsset('L/', 559, 1000), 'L/reception/challenge_meter_50.png');
    assert.equal(quests.concurrentUsersMeterAsset('L/', 5000, 1000), 'L/reception/challenge_meter_100.png');
    assert.equal(quests.concurrentUsersMeterAsset('L/', -1, -1), 'L/reception/challenge_meter_100.png');
    assert.deepEqual({ ...quests.concurrentUsersTextKeys(1) }, { caption: 'landing.view.concurrentusers.caption', bodytext: 'landing.view.concurrentusers.bodytext' });
    assert.deepEqual({ ...quests.concurrentUsersTextKeys(3) }, { caption: 'landing.view.concurrentusers.caption.success', bodytext: 'landing.view.concurrentusers.bodytext.success' });
    assert.equal(quests.concurrentUsersBadgeAsset('L/', { type: 'concurrentusersinfo', args: [ 'key' ] }), 'L/album1584/ConcurrentUsersReward.png');
    assert.equal(quests.concurrentUsersBadgeAsset('L/', { type: 'concurrentusersinfo', args: [ 'key', 'Own' ] }), 'L/album1584/Own.png');
});

await test('prize ranks run on from the ranks before them; a missing limit reads as 0', () => {
    const limits = [ 1, 9, 40 ];

    assert.deepEqual({ ...quests.competitionPrizeRanks(limits, 1) }, { start: 1, end: 1 });
    assert.deepEqual({ ...quests.competitionPrizeRanks(limits, 2) }, { start: 2, end: 10 });
    assert.deepEqual({ ...quests.competitionPrizeRanks(limits, 3) }, { start: 11, end: 50 });
    assert.deepEqual({ ...quests.competitionPrizeRanks([ 5 ], 2) }, { start: 6, end: 5 });
});

await test('the hall of fame list keeps UserListWidget defaults unless the timing code overrides them', () => {
    const defaults = quests.hallOfFameLayout({}, 'hof1');

    assert.equal(defaults.startOffset, 150);
    assert.deepEqual([ ...defaults.offsetsY ], [ 0, 10, 5, 0, 5, 10, 0, 10, 5, 10 ]);
    assert.deepEqual([ ...defaults.widths ], []);

    const overridden = quests.hallOfFameLayout({
        'landing.view.hof1.avatarlist.startoffset': '20',
        'landing.view.hof1.avatarlist.yoffsets.array': '1,2,3',
        'landing.view.hof1.avatarlist.widths.array': '60,70',
    }, 'hof1');

    assert.equal(overridden.startOffset, 20);
    assert.deepEqual([ ...overridden.offsetsY ], [ 1, 2, 3 ]);
    assert.deepEqual([ ...overridden.widths ], [ 60, 70 ]);
    assert.equal(quests.hallOfFameSchedule({ 'landing.view.dynamic.slot.6.conf': 's6' }), 's6');
});

const INCOMING = [
    'CurrentTimingCodeMessage', 'SecondsUntilMessage', 'BonusRareInfoMessage', 'PromoArticlesMessage', 'CommunityGoalProgressMessage', 'CommunityVoteReceivedMessage', 'CatalogPageWithEarliestExpiryMessage',
    'LimitedOfferAppearingNextMessage', 'IsBadgeRequestFulfilledEventMessage', 'WiredRewardResultMessage', 'IsUserPartOfCompetitionMessage', 'QuestDailyMessage', 'ConcurrentUsersGoalProgressMessage',
    'CommunityGoalHallOfFameMessage',
];
const OUTGOING = [
    'GetCurrentTimingCodeComposer', 'GetSecondsUntilComposer', 'GetBonusRareInfoComposer', 'GetPromoArticlesComposer', 'GetCommunityGoalProgressComposer', 'GetCatalogPageWithEarliestExpiryComposer',
    'GetLimitedOfferAppearingNextComposer', 'GetIsBadgeRequestFulfilledComposer', 'GetIsUserPartOfCompetitionComposer', 'GetDailyQuestComposer', 'GetConcurrentUsersGoalProgressComposer',
    'GetCommunityGoalHallOfFameComposer',
];
const composer = name => class {
    constructor(params) {
        this.params = params;
    }

    compose() {
        return [ name, ...Object.values(this.params) ];
    }
};

await test('daily quest and concurrent users elements ask on refresh; the users poll stops at the goal; the hall of fame asks its code\'s leaders', (t) => {
    t.mock.timers.enable({ apis: [ 'setInterval' ] });

    const widgets = load('nitro-react/src/context/system/store/HotelViewWidgets', { './HotelViewSlice': slice, '#base/utils': load('nitro-theme/src/utils/cssHexColor') });
    const state = {
        config: {
            'landing.view.bgtiming': 'schedule',
            'landing.view.dynamic.slot.1.widget': 'generic',
            'landing.view.dynamic.slot.1.conf': 'caption,c;dailyquest,x,true,1,2;concurrentusersinfo,users.key;concurrentusersmeter,meter.png',
            'landing.view.dynamic.slot.2.widget': 'achievementcompetition_hall_of_fame',
            'landing.view.dynamic.slot.6.conf': 'hof-schedule',
        },
        landingViewVisible: true, hotelViewBackgrounds: {}, hotelViewTimingCodes: {},
        setHotelViewBackgrounds: () => {},
        setHotelViewBackgroundCode: () => {},
        setHotelViewTimingCode: (schedule, code) => {
            state.hotelViewTimingCodes[schedule] = code;
        },
        setHotelViewDailyQuest: (value) => {
            state.hotelViewDailyQuest = value;
        },
        setHotelViewConcurrentUsers: (value) => {
            state.hotelViewConcurrentUsers = value;
        },
        setHotelViewHallOfFame: (value) => {
            state.hotelViewHallOfFame = value;
        },
    };
    const listeners = new Set();
    const systemStore = { getState: () => state, subscribe: (listener) => {
        listeners.add(listener);

        return () => listeners.delete(listener);
    } };
    const { registerHotelViewHandlers } = load('nitro-react/src/handlers/system/registerHotelViewHandlers', {
        '@nitrodevco/nitro-packets': { ...Object.fromEntries(INCOMING.map(name => [ name, { name } ])), ...Object.fromEntries(OUTGOING.map(name => [ name, composer(name) ])) },
        '#base/context/system': { ...slice, ...widgets, ...quests, systemStore },
        '../packetSubscriptions': load('nitro-react/src/handlers/packetSubscriptions'),
    });
    const receivers = new Map();
    const sent = [];
    const dispose = registerHotelViewHandlers({
        send: packet => sent.push(packet.compose()),
        subscribe: (packet, listener) => {
            receivers.set(packet.name, listener);

            return () => receivers.delete(packet.name);
        },
    });
    const receive = (name, data) => receivers.get(name)(data);

    assert.deepEqual(sent, [
        [ 'GetDailyQuestComposer', true, 0 ],
        [ 'GetConcurrentUsersGoalProgressComposer' ],
        [ 'GetCurrentTimingCodeComposer', 'hof-schedule' ],
        [ 'GetCurrentTimingCodeComposer', 'schedule' ],
    ]);
    sent.length = 0;

    // `onUpdateTimer`: every five seconds while the reception shows.
    t.mock.timers.tick(5000);
    assert.deepEqual(sent, [ [ 'GetConcurrentUsersGoalProgressComposer' ] ]);
    state.landingViewVisible = false;
    t.mock.timers.tick(5000);
    assert.equal(sent.length, 1);
    state.landingViewVisible = true;

    receive('ConcurrentUsersGoalProgressMessage', { state: 2, userCount: 1000, userCountGoal: 1000 });
    assert.equal(state.hotelViewConcurrentUsers.state, 2);
    sent.length = 0;
    t.mock.timers.tick(15000);
    assert.deepEqual(sent, []);

    // `CommunityGoalHallOfFameWidget.onTimingCode`: only its own schedule, and not an empty code.
    receive('CurrentTimingCodeMessage', { schedulingStr: 'hof-schedule', code: '' });
    receive('CurrentTimingCodeMessage', { schedulingStr: 'other', code: 'hof1' });
    assert.deepEqual(sent, []);
    receive('CurrentTimingCodeMessage', { schedulingStr: 'hof-schedule', code: 'hof1' });
    assert.deepEqual(sent, [ [ 'GetCommunityGoalHallOfFameComposer', 'hof1' ] ]);
    assert.equal(state.hotelViewTimingCodes['hof-schedule'], 'hof1');

    receive('CommunityGoalHallOfFameMessage', { data: { goalCode: 'gardening', hof: [] } });
    assert.equal(state.hotelViewHallOfFame.goalCode, 'gardening');
    receive('QuestDailyMessage', { quest: null, easyQuestCount: 0, hardQuestCount: 0 });
    assert.equal(state.hotelViewDailyQuest.quest, null);

    dispose();
    assert.equal(receivers.size, 0);
    assert.equal(listeners.size, 0);
});
