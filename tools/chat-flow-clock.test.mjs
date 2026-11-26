/**
 * `ChatFlowClock` - the FreeFlow chat advanced by the real time that passed. The case that needed it:
 * the tab was hidden, so no frame ran, and on the way back the bubbles had not moved - the flow was
 * given Pixi's `deltaMS`, which stops at 100 ms, and one update takes at most one scroll-up cycle.
 * The flow is compared with the same flow run a frame at a time, as if the page had stayed in view.
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { Point, Rectangle } from 'pixi.js';

import { createLoader } from './load-source.mjs';

const load = createLoader();
const api = {
    RoomChatBubbleWidthType: { Wide: 0, Normal: 1, Thin: 2 },
    RoomChatModeType: { FreeFlow: 0, Old: 1 },
    RoomChatScrollSpeedType: { Fast: 0, Normal: 1, Slow: 2 },
};
const chat = load(new URL('../packages/nitro-theme/src/chat/ChatConstants.ts', import.meta.url), { '@nitrodevco/nitro-api': api });
const external = { '@nitrodevco/nitro-api': api, '@nitrodevco/nitro-theme/chat': chat, 'pixi.js': { Point, Rectangle } };
const simulation = new URL('../packages/nitro-react/src/chat/simulation/', import.meta.url);
const { ChatFlowClock } = load(new URL('ChatFlowClock.ts', simulation), external, { performance });
const { ChatFlowStage } = load(new URL('ChatFlowStage.ts', simulation), external, { performance });

const CHAT_AREA_Y = 500;
const SCROLL_STEP = chat.CHAT_FLOW_SCROLL_UP_STEP;
const FRAME_MS = 1000 / 60;
const HOUR_MS = 60 * 60 * 1000;

const host = {
    chatSettings: { mode: api.RoomChatModeType.FreeFlow, bubbleWidth: api.RoomChatBubbleWidthType.Normal, scrollSpeed: api.RoomChatScrollSpeedType.Normal },
    isLineByLineMode: false,
    chatAreaHeight: CHAT_AREA_Y,
    stageWidth: 1600,
    stageHeight: 2000,
    getCanvasOffset: () => ({ x: 0, y: 0 }),
    getUserScreenLocation: () => new Point(400, 0),
    getUnitLocation: () => undefined,
    onBubbleRemoved: () => undefined,
};

/** A bubble 300 wide (the plain collision rect) with a 20 px rect, said by someone at x 400; it jumps where the flow puts it. */
const bubble = (id, timestamp) => ({
    id,
    roomId: 1,
    timestamp,
    bubbleWidth: 300,
    limitedHeight: 30,
    minHeight: -1,
    overlap: new Rectangle(0, 0, 0, 0),
    x: 0,
    y: 0,
    hasHitDesktopMargin: false,
    userScreenLocation: new Point(400, 0),
    scrolledUserPositionX: 400,
    readyToRecycle: false,
    moveTo(x, y) {
        this.x = x;
        this.y = y;
    },
    setPosition(x, y) {
        this.x = x;
        this.y = y;
    },
});

/** The stage and its clock as `ChatFlowProvider` holds them. */
const flow = () => {
    const stage = new ChatFlowStage(host);
    let steps = 0;
    const clock = new ChatFlowClock(0, (elapsedMs) => {
        steps++;
        stage.update(elapsedMs);
    }, () => stage.hasBubbles);

    /** `ChatFlowProvider.addBubble`. */
    const say = (said) => {
        clock.catchUpTo(said.timestamp);

        const position = stage.addBubble(said);

        said.setPosition(position.x, position.y);
    };

    return { stage, clock, say, steps: () => steps };
};

/** The page in view: the same flow a frame at a time, each bubble joining between the frames it was said between. */
const inView = (end, said) => {
    const { clock, say } = flow();
    const pending = [ ...said ];

    for (let frame = 1; (frame * FRAME_MS) <= end; frame++) {
        while (pending.length && (pending[0].timestamp <= (frame * FRAME_MS))) say(pending.shift());

        clock.advanceTo(frame * FRAME_MS);
    }

    return said.map(entry => entry.y);
};

await test('a bubble that sat through 30 s of a hidden page has scrolled every cycle, as if the page had stayed in view', () => {
    const { clock, say } = flow();
    const said = bubble(1, 0);

    say(said);
    clock.advanceTo(30_000);

    // Normal speed scrolls every 6 s: four cycles by 30 s, where one update for the whole gap scrolled once.
    assert.equal(said.y, CHAT_AREA_Y - (4 * SCROLL_STEP));
    assert.deepEqual([ said.y ], inView(30_000, [ bubble(1, 0) ]));
});

await test('a bubble said while the page is hidden joins the flow where it would have, not on top of the bubbles from before', () => {
    const { clock, say } = flow();
    const before = bubble(1, 0);
    const during = bubble(2, 20_000);

    say(before);
    say(during);
    clock.advanceTo(30_000);

    // Three cycles had lifted the first clear of the chat line by 20 s; the second has had one cycle since.
    assert.equal(before.y, CHAT_AREA_Y - (4 * SCROLL_STEP));
    assert.equal(during.y, CHAT_AREA_Y - SCROLL_STEP);
    assert.deepEqual([ before.y, during.y ], inView(30_000, [ bubble(1, 0), bubble(2, 20_000) ]));
});

await test('an hour away is stepped only while bubbles are left, and the last is recycled once it scrolls off the top', () => {
    const { stage, clock, say, steps } = flow();
    const said = bubble(1, 0);

    say(said);
    clock.advanceTo(HOUR_MS);

    assert.equal(said.readyToRecycle, true);
    assert.equal(stage.hasBubbles, false);
    // Some 28 cycles of 6.1 s carry it off: about 1,700 steps, not the hour's 36,000.
    assert.ok(steps() < 2_000, `${steps()} steps`);
    assert.equal(clock.time, HOUR_MS);
});

await test('between frames a bubble joins the flow as the last frame left it, and an older time does not wind the flow back', () => {
    let stepped = 0;
    const clock = new ChatFlowClock(1_000, () => stepped++, () => true);

    clock.catchUpTo(1_000 + ChatFlowClock.MAX_STEP_MS);
    clock.advanceTo(900);

    assert.equal(stepped, 0);
    assert.equal(clock.time, 1_000);

    clock.catchUpTo(1_000 + ChatFlowClock.MAX_STEP_MS + 1);

    assert.equal(stepped, 2);
    assert.equal(clock.time, 1_000 + ChatFlowClock.MAX_STEP_MS + 1);
});
