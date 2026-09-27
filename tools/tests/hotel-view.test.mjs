/** Reception schedule regressions against `WidgetContainerLayout` and its wire parser. */
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

const load = (path, dependencies = {}) => {
    const source = readFileSync(new URL(`../../packages/${path}.ts`, import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    runInNewContext(outputText, { exports, performance, require: (name) => {
        assert.ok(Object.hasOwn(dependencies, name), `Unexpected dependency: ${name}`);

        return dependencies[name];
    } });

    return exports;
};
const backgrounds = load('nitro-react/src/context/system/store/HotelViewSlice');
const { CurrentTimingCodeMessage } = load('nitro-packets/src/incoming/Competition/CurrentTimingCodeMessage');
const { GetCurrentTimingCodeComposer } = load('nitro-packets/src/outgoing/Competition/GetCurrentTimingCodeComposer');
const { SecondsUntilMessage } = load('nitro-packets/src/incoming/Competition/SecondsUntilMessage');
const { GetSecondsUntilComposer } = load('nitro-packets/src/outgoing/Competition/GetSecondsUntilComposer');
const widgets = load('nitro-react/src/context/system/store/HotelViewWidgets', { './HotelViewSlice': backgrounds });
const config = {
    'image.library.url': 'https://images.example/',
    'landing.view.bgtiming': 'schedule',
    'landing.view.background_left.uri': '${image.library.url}default.png',
    'landing.view.night.background_left.uri': '${image.library.url}night.png',
    'landing.view.hidden.background_left.visible': false,
    'landing.view.hidden.background_left.uri': 'must-not-load.png',
};

const layoutPath = new URL('../../packages/nitro-react/scripts/hotel-reference/landing_view_default_dynamic_layout.xml', import.meta.url);

await test('background table matches the pinned SWF layout', { skip: !existsSync(layoutPath) && 'Local SWF extraction unavailable' }, () => {
    const xml = readFileSync(layoutPath);
    const manifest = JSON.parse(readFileSync(new URL('../references/hotel-view.json', import.meta.url), 'utf8'));
    const source = manifest.sources.find(item => item.path === 'landing_view_default_dynamic_layout.xml');

    assert.equal(createHash('sha256').update(xml).digest('hex'), source.sha256, 'Reference changed: review before repinning');
    const initial = backgrounds.initialHotelViewBackgrounds(config);
    const elements = [ ...xml.toString().matchAll(/<static_bitmap\b[^>]*name="(background_[^"]+)"[^>]*>([\s\S]*?)<\/static_bitmap>/g) ];

    assert.deepEqual(Object.keys(initial).sort(), elements.map(match => match[1]).sort());
    for (const [ , name, body ] of elements) {
        const uri = body.match(/key="asset_uri" value="([^"]*)"/)[1].replace('${image.library.url}', config['image.library.url']);

        assert.equal(initial[name].uri, uri);
        assert.equal(initial[name].visible, true);
    }
});

await test('timing changes preserve missing images, skip hidden replacement and restore visibility', () => {
    let state = backgrounds.initialHotelViewBackgrounds(config);

    state = backgrounds.applyHotelViewTiming(state, config, '');
    assert.equal(state.background_left.uri, 'https://images.example/default.png');
    state = backgrounds.applyHotelViewTiming(state, config, 'night');
    assert.equal(state.background_left.uri, 'https://images.example/night.png');
    state = backgrounds.applyHotelViewTiming(state, config, 'hidden');
    assert.equal(state.background_left.visible, false);
    assert.equal(state.background_left.uri, 'https://images.example/night.png');
    state = backgrounds.applyHotelViewTiming(state, config, 'missing');
    assert.equal(state.background_left.visible, true);
    assert.equal(state.background_left.uri, 'https://images.example/night.png');
});

await test('timing parser consumes exactly two strings; composer preserves schedule', () => {
    const fields = [ 'schedule', 'night' ];
    const parsed = new CurrentTimingCodeMessage().parse({ readString: () => fields.shift() });

    assert.equal(parsed.schedulingStr, 'schedule');
    assert.equal(parsed.code, 'night');
    assert.equal(fields.length, 0);
    assert.equal(new GetCurrentTimingCodeComposer({ slotConfig: 'schedule' }).compose().join(), 'schedule');
});

await test('SecondsUntil parser reads a string then an int; composer sends the time string', () => {
    const reads = [];
    const parsed = new SecondsUntilMessage().parse({
        readString: () => (reads.push('string'), '2026-09-17 15:00'),
        readInt: () => (reads.push('int'), 90),
    });

    assert.deepEqual(reads, [ 'string', 'int' ]);
    assert.deepEqual({ ...parsed }, { timeStr: '2026-09-17 15:00', secondsUntil: 90 });
    assert.deepEqual([ ...new GetSecondsUntilComposer({ timeStr: '2026-09-17 15:00' }).compose() ], [ '2026-09-17 15:00' ]);
});

await test('generic widget conf, layout and common settings follow GenericWidget / CommonWidgetSettings', () => {
    assert.deepEqual([ ...widgets.parseHotelViewGenericConf('caption,a.header;customtimer,false,0,0,a.button,a.expired,2026-09-17 15:00') ].map(e => [ e.type, ...e.args ]), [
        [ 'caption', 'a.header' ],
        [ 'customtimer', 'false', '0', '0', 'a.button', 'a.expired', '2026-09-17 15:00' ],
    ]);
    assert.equal(widgets.hotelViewTimerTimeStr(widgets.parseHotelViewGenericConf('customtimer,false,0,0,a,b,2026-09-17 15:00')[0]), '2026-09-17 15:00');
    assert.equal(widgets.parseHotelViewGenericConf('').length, 0);

    const layout = widgets.parseHotelViewGenericLayout('bitmap.uri,https://x/p.png;bitmap.x,50;bitmap.y,0;container.height,250');

    assert.equal(layout.bitmapUri, 'https://x/p.png');
    assert.equal(layout.bitmapX, 50);
    assert.equal(layout.bitmapY, 0);
    assert.equal(layout.containerHeight, 250);
    assert.equal(widgets.parseHotelViewGenericLayout('').containerHeight, 30);
    assert.equal(widgets.parseHotelViewGenericLayout('container.height,10').containerHeight, 30);

    assert.equal(widgets.isWideHotelViewSlot(3), false);
    assert.equal(widgets.isWideHotelViewSlot(5), false);
    assert.equal(widgets.isWideHotelViewSlot(2), true);

    assert.deepEqual({ ...widgets.hotelViewCommonSettings({ 'landing.view.common.textcolor': 'ffffff', 'landing.view.common.etchingcolor': '000000', 'landing.view.common.etchingposition': 'top' }) }, { textColor: 0xFFFFFF, etchingColor: 0, etchingPosition: 'top' });
    assert.deepEqual({ ...widgets.hotelViewCommonSettings({}) }, { textColor: null, etchingColor: null, etchingPosition: null });
    assert.deepEqual({ ...widgets.hotelViewPaneWidths({}) }, { left: 500, right: 250 });
});

await test('activation refreshes every slot widget; container slots follow their own schedule', () => {
    const schedule2 = '2026-09-14 11:00,promoA;2026-09-15 11:00,promoB';
    const slotConfig = {
        ...config,
        'landing.view.dynamic.slot.1.widget': 'bonusrare',
        'landing.view.dynamic.slot.2.widget': 'widgetcontainer',
        'landing.view.dynamic.slot.2.conf': schedule2,
        'landing.view.promoB.widget': 'generic',
        'landing.view.promoB.conf': 'caption,b.header;customtimer,false,0,0,b.button,b.expired,2026-09-17 15:00',
        'landing.view.dynamic.slot.3.widget': 'dailyquest',
    };
    const listeners = new Set();
    const state = {
        config: slotConfig, landingViewVisible: true, hotelViewBackgrounds: {}, hotelViewTimingCodes: {}, hotelViewSecondsUntil: {},
        setHotelViewBackgrounds: (value) => {
            state.hotelViewBackgrounds = value;
        },
        setHotelViewTimingCode: (schedule, code) => {
            state.hotelViewTimingCodes[schedule] = code;
        },
        setHotelViewSecondsUntil: (timeStr, value) => {
            state.hotelViewSecondsUntil[timeStr] = value;
        },
        setHotelViewBonusRare: () => {},
        setHotelViewCommunityGoal: () => {},
        setHotelViewPromoArticles: () => {},
    };
    const systemStore = { getState: () => state, subscribe: (listener) => {
        listeners.add(listener);

        return () => listeners.delete(listener);
    } };
    const composer = name => class {
        constructor(params) {
            this.params = params;
        }

        compose() {
            return [ name, ...Object.values(this.params) ];
        }
    };
    const incoming = Object.fromEntries([ 'CurrentTimingCodeMessage', 'SecondsUntilMessage', 'BonusRareInfoMessage', 'PromoArticlesMessage', 'CommunityGoalProgressMessage' ].map(name => [ name, { name } ]));
    const outgoing = Object.fromEntries([ 'GetCurrentTimingCodeComposer', 'GetSecondsUntilComposer', 'GetBonusRareInfoComposer', 'GetPromoArticlesComposer', 'GetCommunityGoalProgressComposer' ].map(name => [ name, composer(name) ]));
    const { registerHotelViewHandlers } = load('nitro-react/src/handlers/system/registerHotelViewHandlers', {
        '@nitrodevco/nitro-packets': { ...incoming, ...outgoing },
        '#base/context/system': { ...backgrounds, ...widgets, systemStore },
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
    const visibility = (visible) => {
        const previous = { ...state };

        state.landingViewVisible = visible;
        for (const listener of listeners) listener(state, previous);
    };

    // BonusRarePromoWidget asks in initialize and again in refresh; an unported widget asks nothing.
    assert.deepEqual(sent, [
        [ 'GetBonusRareInfoComposer' ],
        [ 'GetBonusRareInfoComposer' ],
        [ 'GetCurrentTimingCodeComposer', schedule2 ],
        [ 'GetCurrentTimingCodeComposer', 'schedule' ],
    ]);
    sent.length = 0;

    receive('CurrentTimingCodeMessage', { schedulingStr: 'unrelated', code: 'promoB' });
    assert.deepEqual(state.hotelViewTimingCodes, {});
    receive('CurrentTimingCodeMessage', { schedulingStr: schedule2, code: 'promoB' });
    assert.equal(state.hotelViewTimingCodes[schedule2], 'promoB');
    assert.equal(state.hotelViewBackgrounds.background_left.uri, '');
    assert.deepEqual(sent, [ [ 'GetSecondsUntilComposer', '2026-09-17 15:00' ] ]);
    receive('SecondsUntilMessage', { timeStr: '2026-09-17 15:00', secondsUntil: 60 });
    assert.equal(state.hotelViewSecondsUntil['2026-09-17 15:00'].seconds, 60);

    receive('CurrentTimingCodeMessage', { schedulingStr: 'schedule', code: 'night' });
    assert.equal(state.hotelViewBackgrounds.background_left.uri, 'https://images.example/night.png');

    sent.length = 0;
    visibility(false);
    visibility(true);
    assert.deepEqual(sent.map(packet => packet[0]), [ 'GetBonusRareInfoComposer', 'GetCurrentTimingCodeComposer', 'GetCurrentTimingCodeComposer' ]);

    dispose();
    assert.equal(listeners.size, 0);
    assert.equal(receivers.size, 0);
    assert.equal(Object.keys(state.hotelViewBackgrounds).length, 0);
});
