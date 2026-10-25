/**
 * The effects wardrobe against the AS3 it ports: `IncomingMessages.onAvatarEffects` (which
 * entries are running, what the count is) and `EffectsModel.addEffect` / `setEffectActivated` /
 * `setEffectExpired` / `useEffect` (`nitro-react/src/context/user/store/avatarEffectsModel.ts`).
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';

const { effectsAfterActivated, effectsAfterAdded, effectsAfterExpired, effectsAfterSelected, effectsFromList, lastWornAfterChoice, NO_LAST_WORN, secondsLeftOf, wearAgain } = await import('../packages/nitro-react/src/context/user/store/avatarEffectsModel.ts');

const entry = (type, over = {}) => ({ type, subType: 0, duration: 600, inactiveEffectsInInventory: 1, secondsLeftIfActive: -1, isPermanent: false, ...over });
const find = (effects, type) => effects.find(effect => effect.type === type);

await test('a list entry with minus one left is not running; zero or more is', () => {
    const [ waiting, justStarted, lastSecond ] = effectsFromList([ entry(1), entry(2, { secondsLeftIfActive: 0 }), entry(3, { secondsLeftIfActive: 1 }) ]);

    assert.equal(waiting.isActive, false);
    assert.equal(justStarted.isActive, true);
    assert.equal(lastSecond.isActive, true);
});

await test('a running effect counts its running copy in the amount; a waiting one does not', () => {
    const [ waiting, running ] = effectsFromList([ entry(1, { inactiveEffectsInInventory: 2 }), entry(2, { inactiveEffectsInInventory: 2, secondsLeftIfActive: 300 }) ]);

    assert.equal(waiting.amountInInventory, 2);
    assert.equal(running.amountInInventory, 3);
});

await test('a permanent effect is running and counts as one', () => {
    const [ effect ] = effectsFromList([ entry(1, { inactiveEffectsInInventory: 0, secondsLeftIfActive: 600, isPermanent: true }) ]);

    assert.equal(effect.isActive, true);
    assert.equal(effect.amountInInventory, 1);
});

await test('an added copy of an effect that is held makes the stack one bigger', () => {
    const next = effectsAfterAdded(effectsFromList([ entry(1, { inactiveEffectsInInventory: 2 }) ]), entry(1));

    assert.equal(next.length, 1);
    assert.equal(next[0].amountInInventory, 3);
    assert.equal(next[0].inactiveEffectsInInventory, 3);
});

await test('an added copy goes on the stack of a running effect too, and the effect keeps running', () => {
    const running = effectsFromList([ entry(1, { inactiveEffectsInInventory: 0, secondsLeftIfActive: 300 }) ]);
    const next = effectsAfterAdded(running, entry(1));

    assert.equal(next[0].amountInInventory, 2);
    assert.equal(next[0].isActive, true);
});

await test('a new effect arrives waiting, as one copy', () => {
    const next = effectsAfterAdded([], entry(7, { secondsLeftIfActive: 0 }));

    assert.equal(next[0].isActive, false);
    assert.equal(next[0].amountInInventory, 1);
    assert.equal(next[0].secondsLeftIfActive, -1);
});

await test('a new permanent effect arrives running with no copies waiting', () => {
    const next = effectsAfterAdded([], entry(7, { isPermanent: true }));

    assert.equal(next[0].isActive, true);
    assert.equal(next[0].inactiveEffectsInInventory, 0);
    assert.equal(next[0].amountInInventory, 1);
});

await test('activating starts a copy: one fewer waiting, the total unchanged, and it is worn', () => {
    const next = effectsAfterActivated(effectsFromList([ entry(1, { inactiveEffectsInInventory: 3 }) ]), 1, 600, false);
    const [ effect ] = next;

    assert.equal(effect.isActive, true);
    assert.equal(effect.isInUse, true);
    assert.equal(effect.inactiveEffectsInInventory, 2);
    assert.equal(effect.amountInInventory, 3);
    assert.equal(effect.secondsLeftIfActive, 600);
});

await test('activating one effect stops the others being worn', () => {
    const worn = effectsAfterSelected(effectsFromList([ entry(1, { secondsLeftIfActive: 100 }), entry(2) ]), 1);

    assert.equal(find(worn, 1).isInUse, true);

    const next = effectsAfterActivated(worn, 2, 600, false);

    assert.equal(find(next, 1).isInUse, false);
    assert.equal(find(next, 2).isInUse, true);
});

await test('activating an effect that already runs uses no further copy', () => {
    const running = effectsFromList([ entry(1, { inactiveEffectsInInventory: 1, secondsLeftIfActive: 250 }) ]);
    const [ effect ] = effectsAfterActivated(running, 1, 600, false);

    assert.equal(effect.inactiveEffectsInInventory, 1);
    assert.equal(effect.secondsLeftIfActive, 250);
});

await test('activating a permanent effect uses no copy', () => {
    const permanent = effectsFromList([ entry(1, { inactiveEffectsInInventory: 0, secondsLeftIfActive: 600, isPermanent: true }) ]);
    const [ effect ] = effectsAfterActivated(permanent, 1, 600, true);

    assert.equal(effect.inactiveEffectsInInventory, 0);
    assert.equal(effect.isInUse, true);
});

await test('the last copy running out removes the effect', () => {
    const running = effectsFromList([ entry(1, { inactiveEffectsInInventory: 0, secondsLeftIfActive: 5 }), entry(2) ]);
    const next = effectsAfterExpired(running, 1);

    assert.deepEqual(next.map(effect => effect.type), [ 2 ]);
});

await test('with more copies, running out returns the effect to waiting and keeps the rest', () => {
    const running = effectsAfterSelected(effectsFromList([ entry(1, { inactiveEffectsInInventory: 2, secondsLeftIfActive: 5 }) ]), 1);
    const [ effect ] = effectsAfterExpired(running, 1);

    assert.equal(effect.isActive, false);
    assert.equal(effect.isInUse, false);
    assert.equal(effect.amountInInventory, 2);
    assert.equal(effect.inactiveEffectsInInventory, 2);
    assert.equal(effect.secondsLeftIfActive, -1);
});

await test('an effect that expires is the only one that stops being worn', () => {
    const worn = effectsAfterSelected(effectsFromList([ entry(1, { inactiveEffectsInInventory: 1, secondsLeftIfActive: 5 }), entry(2, { secondsLeftIfActive: 90 }) ]), 2);
    const next = effectsAfterExpired(worn, 1);

    assert.equal(find(next, 2).isInUse, true);
});

await test('an expiry for an effect that is not held changes nothing', () => {
    const effects = effectsFromList([ entry(1) ]);

    assert.equal(effectsAfterExpired(effects, 99), effects);
});

await test('selecting zero or less takes every effect off', () => {
    const worn = effectsAfterSelected(effectsFromList([ entry(1, { secondsLeftIfActive: 100 }) ]), 1);

    assert.equal(effectsAfterSelected(worn, 0)[0].isInUse, false);
    assert.equal(effectsAfterSelected(worn, -1)[0].isInUse, false);
});

await test('wearing again activates first when the effect is not running, and does nothing for one that is gone', () => {
    const effects = effectsFromList([ entry(1), entry(2, { secondsLeftIfActive: 100 }) ]);

    assert.deepEqual(wearAgain(effects, 1), { activate: true });
    assert.deepEqual(wearAgain(effects, 2), { activate: false });
    assert.equal(wearAgain(effects, 3), undefined);
    assert.equal(wearAgain(effects, -1), undefined);
    assert.equal(wearAgain(effects, 0), undefined);
});

await test('the effect to wear next is the one chosen; choosing none, or an unwear, remembers nothing', () => {
    assert.equal(lastWornAfterChoice(5), 5);
    assert.equal(lastWornAfterChoice(0), NO_LAST_WORN);
    assert.equal(lastWornAfterChoice(-1), NO_LAST_WORN);
    assert.equal(NO_LAST_WORN, -1);
});

await test('leaving a room deselects every effect (select none); what to wear next is a separate thing', () => {
    const worn = effectsAfterSelected(effectsFromList([ entry(5, { secondsLeftIfActive: 100 }), entry(6) ]), 5);

    assert.equal(find(worn, 5).isInUse, true);

    // RSE_ENDED: deselectAllEffects() selects none. It changes who is worn and nothing else.
    const left = effectsAfterSelected(worn, 0);

    assert.equal(left.some(effect => effect.isInUse), false);
    assert.equal(find(left, 5).isActive, true, 'the effect keeps running; only the wearing stops');
    assert.equal(find(left, 5).secondsLeftIfActive, 100);
    assert.equal(wearAgain(left, 5).activate, false, 'and can be worn again in the next room without a second copy');
});

await test('a running copy counts down from when its time left was known, never below zero', () => {
    const [ effect ] = effectsFromList([ entry(1, { secondsLeftIfActive: 100 }) ], 1_000_000);

    assert.equal(secondsLeftOf(effect, 1_000_000), 100);
    assert.equal(secondsLeftOf(effect, 1_000_000 + 30_000), 70);
    assert.equal(secondsLeftOf(effect, 1_000_000 + 30_999), 69, 'whole seconds, rounded down, as Effect.secondsLeft');
    assert.equal(secondsLeftOf(effect, 1_000_000 + 100_000), 0);
    assert.equal(secondsLeftOf(effect, 1_000_000 + 900_000), 0, 'it waits at zero for the server to expire it');
});

await test('a copy that is not running, or is permanent, shows what it was sent', () => {
    const [ waiting, permanent ] = effectsFromList([ entry(1), entry(2, { inactiveEffectsInInventory: 0, secondsLeftIfActive: 600, isPermanent: true }) ], 1_000_000);

    assert.equal(secondsLeftOf(waiting, 9_000_000), -1);
    assert.equal(secondsLeftOf(permanent, 9_000_000), 600);
});

await test('switching a copy on starts its clock then, and a copy already running keeps its own', () => {
    const waiting = effectsFromList([ entry(1, { inactiveEffectsInInventory: 2 }) ], 1_000_000);
    const [ started ] = effectsAfterActivated(waiting, 1, 600, false, 5_000_000);

    assert.equal(secondsLeftOf(started, 5_000_000 + 60_000), 540);

    // The same message again (or the room-entry repeat) must not restart the clock.
    const [ again ] = effectsAfterActivated([ started ], 1, 600, false, 9_000_000);

    assert.equal(again.activatedAt, 5_000_000);
});

await test('a new effect that arrives running (permanent) is not counted down', () => {
    const [ added ] = effectsAfterAdded([], entry(7, { isPermanent: true }), 1_000_000);

    assert.equal(secondsLeftOf(added, 8_000_000), added.secondsLeftIfActive);
});

await test('a clock read before the copy started spends no time, so a stale window shows the full time', () => {
    const [ effect ] = effectsFromList([ entry(1, { secondsLeftIfActive: 100 }) ], 5_000_000);

    assert.equal(secondsLeftOf(effect, 1_000_000), 100);
});
