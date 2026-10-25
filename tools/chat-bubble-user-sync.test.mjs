/**
 * `ChatBubbleSimulationEntity.syncToUserScreenPosition`: when the speaker's spot moves on screen
 * other than by a pan, the entity is carried along by the same amount and its next visualization
 * sync jumps rather than eases.
 */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

import ts from 'typescript';

class Rectangle {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

const load = () => {
    const source = readFileSync(new URL('../packages/nitro-react/src/chat/simulation/ChatBubbleSimulationEntity.ts', import.meta.url), 'utf8');
    const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } });
    const exports = {};

    runInNewContext(outputText, {
        exports,
        require: (name) => {
            if (name === 'pixi.js') return { Rectangle };
            if (name === '@nitrodevco/nitro-theme/chat') return { CHAT_BUBBLE_HEIGHT_PADDING: 10 };
            if (name === './IChatFlowBubble') return {};
            throw new Error(`Unexpected dependency: ${name}`);
        },
    });

    return exports.ChatBubbleSimulationEntity;
};

const bubble = scrolledUserPositionX => ({
    x: 0,
    y: 0,
    bubbleWidth: 100,
    limitedHeight: 40,
    minHeight: -1,
    overlap: new Rectangle(0, -2, 0, 0),
    scrolledUserPositionX,
    moves: [],
    moveTo(x, y) { this.moves.push([ 'move', x, y ]); },
    setPosition(x, y) { this.moves.push([ 'warp', x, y ]); },
});

await test('an unchanged speaker position leaves the entity and eases the sprite', () => {
    const ChatBubbleSimulationEntity = load();
    const visual = bubble(300);
    const entity = new ChatBubbleSimulationEntity(visual);

    entity.initializePosition(250, 100);
    entity.syncToUserScreenPosition();
    entity.applyToVisualization();

    assert.equal(entity.x, 250);
    assert.deepEqual(visual.moves, [ [ 'move', 250, 100 ] ]);
});

await test('a moved speaker position carries the entity and warps the sprite once', () => {
    const ChatBubbleSimulationEntity = load();
    const visual = bubble(300);
    const entity = new ChatBubbleSimulationEntity(visual);

    entity.initializePosition(250, 100);
    visual.scrolledUserPositionX = 340;
    entity.syncToUserScreenPosition();

    assert.equal(entity.x, 290);
    assert.equal(entity.rect.x, 290);
    assert.equal(entity.centerX, 340);

    entity.applyToVisualization();
    entity.applyToVisualization();

    assert.deepEqual(visual.moves, [ [ 'warp', 290, 100 ], [ 'move', 290, 100 ] ]);
});
