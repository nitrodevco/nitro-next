import { RoomChatModeType, RoomChatScrollSpeedType } from '@nitrodevco/nitro-api';
import { Point } from 'pixi.js';

import { CHAT_FLOW_SCROLL_UP_STEP } from '../ChatConstants';
import { ChatBubbleCollisionEvent } from './ChatBubbleCollisionEvent';
import { ChatBubbleSimulationEntity } from './ChatBubbleSimulationEntity';
import { ChatBubbleSimulationWithLimitedWideRect } from './ChatBubbleSimulationWithLimitedWideRect';
import { ChatFlowGravity } from './ChatFlowGravity';
import { ChatFlowSpacer } from './ChatFlowSpacer';
import { IChatFlowBubble, IChatFlowHost } from './IChatFlowBubble';

/**
 * The Flash `ChatFlowStage` - the FreeFlow simulation itself. New bubbles are born at the chat
 * area line above their speaker, pulled sideways by the gravity of the bubbles already there
 * (but never more than 15px away from the speaker), and every scroll-up cycle the whole flow
 * drifts 19px upward. Twenty relaxation iterations a frame push overlapping bubbles apart:
 * sideways when they only just touch, otherwise the upper one is lifted clear. In line-by-line
 * mode gravity is off, every bubble collides with every other on its row, and an invisible
 * spacer is inserted on each cycle so the rows stay evenly spaced. Bubbles that scroll off the
 * top are recycled on a five-second sweep.
 */
export class ChatFlowStage {
    public static readonly SCROLL_UP_STEP = CHAT_FLOW_SCROLL_UP_STEP;
    /** `_Str_18607` */
    private static readonly CLEAN_UP_INTERVAL = 5000;
    /** `_Str_14840` */
    private static readonly RELAXATION_ITERATIONS = 20;
    /** `_Str_18713` - overlaps up to this many px are solved sideways, deeper ones vertically. */
    private static readonly MAX_HORIZONTAL_PUSH = 15;
    /** `_Str_16866` - max px a bubble may be lifted per relaxation iteration. */
    private static readonly MAX_LIFT_PER_ITERATION = 8;
    /** `_Str_25857` - bubbles narrower than this get the 240px collision footprint. */
    private static readonly LIMITED_WIDE_RECT_THRESHOLD = 240;

    private _context: IChatFlowHost | undefined;
    private _simulationTime: number = 0;
    private _lastCycleAt: number = 0;
    private _lastCleanUpAt: number = 0;
    private readonly _gravity: ChatFlowGravity = new ChatFlowGravity();
    private _bubbles: ChatBubbleSimulationEntity[] = [];
    private _toRemove: ChatBubbleSimulationEntity[] = [];
    /** Reused across iterations and frames - the relaxation pass allocates nothing once warmed up. */
    private readonly _collisions: ChatBubbleCollisionEvent[] = [];
    private readonly _collisionPool: ChatBubbleCollisionEvent[] = [];
    private _lineByLineMode: boolean = false;
    private _scrollUpTimerDelay: number = 10000;
    private _gravityEnabled: boolean = true;
    private _oldChatAreaHeight: number = 0;

    constructor(context: IChatFlowHost) {
        this._context = context;

        this.updateSettings();
    }

    /** Re-reads the room's chat settings (mode + scroll speed) - `_Str_18127`. */
    public updateSettings(): void {
        const settings = this._context?.chatSettings;

        if (!settings) return;

        this._lineByLineMode = (settings.mode === RoomChatModeType.Old);
        this._gravityEnabled = !this._lineByLineMode;

        switch (settings.scrollSpeed) {
            case RoomChatScrollSpeedType.Fast:
                this._scrollUpTimerDelay = 3000;
                return;
            case RoomChatScrollSpeedType.Normal:
                this._scrollUpTimerDelay = 6000;
                return;
            case RoomChatScrollSpeedType.Slow:
                this._scrollUpTimerDelay = 12000;
                return;
        }
    }

    public dispose(): void {
        for (const entity of this._bubbles) entity.dispose();

        this._bubbles = [];
        this._toRemove = [];
        this._context = undefined;
    }

    public get disposed(): boolean {
        return !this._context;
    }

    /** Places a freshly built bubble and returns where the viewer should show it - `_Str_12872`. */
    public addBubble(bubble: IChatFlowBubble): Point {
        const context = this._context;

        if (!context) return new Point(0, 0);

        if (this._oldChatAreaHeight === 0) this._oldChatAreaHeight = context.chatAreaHeight;

        let entity: ChatBubbleSimulationEntity;

        if (!this._lineByLineMode && (bubble.bubbleWidth < ChatFlowStage.LIMITED_WIDE_RECT_THRESHOLD)) {
            entity = new ChatBubbleSimulationWithLimitedWideRect(bubble);
        } else {
            entity = new ChatBubbleSimulationEntity(bubble, this._lineByLineMode);
        }

        const userLocation = bubble.userScreenLocation;
        const position = new Point(userLocation.x - (entity.rect.width / 2), context.chatAreaHeight);
        const canvasOffset = context.getCanvasOffset(bubble.roomId);

        if (canvasOffset) position.x -= canvasOffset.x;

        position.y -= bubble.overlap.y;
        position.x -= bubble.overlap.x;

        entity.initializePosition(position.x, position.y);

        if (this._gravityEnabled && !this._lineByLineMode) {
            for (let i = 0; i < (ChatFlowStage.RELAXATION_ITERATIONS / 2); i++) {
                let pull = 0;

                for (const other of this._bubbles) pull += this._gravity.getPull(entity, other, ChatFlowGravity.INSERT_STRENGTH, ChatFlowGravity.INSERT_MAX_PULL);

                entity.x = entity.x + pull;
            }

            let targetX = entity.x;
            const speakerX = userLocation.x - (canvasOffset ? canvasOffset.x : 0);

            if (entity.x > (speakerX - ChatFlowGravity.MAX_DISTANCE_FROM_SPEAKER)) {
                targetX = speakerX - ChatFlowGravity.MAX_DISTANCE_FROM_SPEAKER;

                if (entity instanceof ChatBubbleSimulationWithLimitedWideRect) {
                    entity.wideRectOffset += (entity.x - targetX);
                    entity.wideRectOffset = Math.min(0, entity.wideRectOffset);
                }
            } else if ((entity.x + entity.rect.width) < (speakerX + ChatFlowGravity.MAX_DISTANCE_FROM_SPEAKER)) {
                targetX = (speakerX - entity.rect.width) + ChatFlowGravity.MAX_DISTANCE_FROM_SPEAKER;

                if (entity instanceof ChatBubbleSimulationWithLimitedWideRect) {
                    entity.wideRectOffset += (entity.x - targetX);
                    entity.wideRectOffset = Math.max(-(entity.wideRect.width - entity.rect.width), entity.wideRectOffset);
                }
            }

            entity.x = targetX;
            position.x = targetX;
        }

        this._bubbles.push(entity);

        position.x -= bubble.overlap.x;

        if (this._lineByLineMode) this._lastCycleAt = this._simulationTime;

        return position;
    }

    public update(elapsedMs: number): void {
        this._simulationTime += elapsedMs;

        this.resolveCollisions();

        if ((this._lastCycleAt + this._scrollUpTimerDelay) < this._simulationTime) {
            this.scrollUp();

            this._lastCycleAt = this._simulationTime;
        }

        for (let i = 0; i < this._bubbles.length; i++) {
            const entity = this._bubbles[i];

            entity.applyToVisualization();

            if (!entity.isSpacer) {
                entity.fullHeightCollision = false;

                if ((i > 0) && entity.hasHitDesktopMargin) {
                    entity.fullHeightCollision = true;
                    this._bubbles[i - 1].fullHeightCollision = true;
                }
            }
        }

        if ((this._lastCleanUpAt + ChatFlowStage.CLEAN_UP_INTERVAL) < this._simulationTime) {
            this.cleanUp();

            this._lastCleanUpAt = this._simulationTime;
        }
    }

    /** A rendered bubble unmounted on its own (room change, store cleared) - forget its entity without recycling it again. */
    public removeBubble(bubble: IChatFlowBubble): void {
        const index = this._bubbles.findIndex(entity => entity.bubble === bubble);

        if (index === -1) return;

        const [ entity ] = this._bubbles.splice(index, 1);

        entity.dispose();
    }

    /** Marks every bubble for recycling and flushes them straight away. */
    public clear(): void {
        for (const entity of this._bubbles) entity.readyToRecycle = true;

        this.cleanUp();
    }

    /** `_Str_19305` - the relaxation loop. */
    private resolveCollisions(): void {
        const bubbles = this._bubbles;
        const collisions = this._collisions;

        for (let iteration = 0; iteration < ChatFlowStage.RELAXATION_ITERATIONS; iteration++) {
            collisions.length = 0;

            for (const entity of bubbles) entity.resetPending();

            // Each unordered pair once, earlier bubble first - the Flash loop visited both orders
            // and let `hasCollidedWith` discard the mirror, so only the first encounter ever acted.
            // `intersects` is symmetric, so the mirror check was pure waste.
            for (let i = 0; i < bubbles.length; i++) {
                const entity = bubbles[i];

                for (let j = i + 1; j < bubbles.length; j++) {
                    const other = bubbles[j];

                    if (!entity.intersects(other)) continue;

                    const event = this._collisionPool.pop();

                    collisions.push(event ? event.set(entity, other) : new ChatBubbleCollisionEvent(entity, other));
                }
            }

            if (!collisions.length) return;

            if (this._lineByLineMode) {
                for (const collision of collisions) {
                    if (!collision.first.hasCollidedWith(collision.second) && !collision.second.hasCollidedWith(collision.first)) {
                        if (collision.isSameRow) {
                            collision.older.addPendingY(-collision.older.wideRect.height);
                        } else {
                            const bottom = collision.first.intersectsRect(collision.second) ? collision.top.rect.bottom : collision.top.wideRect.bottom;

                            collision.top.addPendingY(-((bottom - collision.bottom.y) + 1));
                        }
                    }

                    collision.first.markCollidedWith(collision.second);
                    collision.second.markCollidedWith(collision.first);
                }
            } else {
                for (const collision of collisions) {
                    if (!collision.first.hasCollidedWith(collision.second) && !collision.second.hasCollidedWith(collision.first)) {
                        const left = collision.left;
                        const right = collision.right;
                        const leftX = (left instanceof ChatBubbleSimulationWithLimitedWideRect) ? (left.wideRectOffset + left.x) : left.x;
                        const rightX = (right instanceof ChatBubbleSimulationWithLimitedWideRect) ? (right.wideRectOffset + right.x) : right.x;
                        const leftWidth = (left instanceof ChatBubbleSimulationWithLimitedWideRect) ? left.wideRect.width : left.rect.width;
                        const halfOverlap = Math.abs((leftX + leftWidth) - rightX) / 2;

                        if (halfOverlap <= ChatFlowStage.MAX_HORIZONTAL_PUSH) {
                            left.addPendingX(-halfOverlap);
                            right.addPendingX(halfOverlap + 1);
                        } else if (collision.isSameRow) {
                            collision.older.addPendingY(-collision.older.rect.height);
                        } else {
                            collision.top.addPendingY(-((collision.top.rect.bottom - collision.bottom.y) + 1));
                        }

                        collision.first.markCollidedWith(collision.second);
                        collision.second.markCollidedWith(collision.first);
                    }
                }
            }

            for (const entity of bubbles) entity.applyPending(ChatFlowStage.MAX_LIFT_PER_ITERATION);

            for (const collision of collisions) this._collisionPool.push(collision);
        }
    }

    /** `_Str_25140` - one scroll-up cycle. */
    private scrollUp(): void {
        const context = this._context;

        if (!context) return;

        for (const entity of this._bubbles) {
            if (this._gravityEnabled) {
                for (const other of this._bubbles) {
                    if (entity !== other) entity.x = entity.x + this._gravity.getPull(entity, other);
                }
            }

            entity.y = entity.y - ChatFlowStage.SCROLL_UP_STEP;
        }

        if (this._lineByLineMode) {
            this.addBubble(new ChatFlowSpacer(ChatFlowStage.SCROLL_UP_STEP));

            const spacer = this._bubbles[this._bubbles.length - 1];

            spacer.fullHeightCollision = true;
            spacer.isSpacer = true;
        }

        this.resolveCollisions();
    }

    /** `_Str_22963` - drops bubbles that scrolled off the top or were flagged for recycling. */
    private cleanUp(): void {
        for (const entity of this._bubbles) {
            if ((entity.rect.bottom < -10) || entity.readyToRecycle) {
                entity.readyToRecycle = true;

                if (this._toRemove.indexOf(entity) === -1) this._toRemove.push(entity);
            }
        }

        if (this._toRemove.length > 0) {
            for (const entity of this._toRemove) {
                const index = this._bubbles.indexOf(entity);
                const bubble = entity.bubble;

                entity.dispose();

                if (index !== -1) this._bubbles.splice(index, 1);

                if (bubble && !(bubble instanceof ChatFlowSpacer)) this._context?.onBubbleRemoved(bubble);
            }

            this._toRemove = [];
        }
    }

    /** Keeps the flow at the same distance from the top when the chat area line moves (screen resize). */
    public resize(): void {
        const context = this._context;

        if (!context) return;

        const chatAreaHeight = context.chatAreaHeight;

        if (this._oldChatAreaHeight !== chatAreaHeight) {
            const delta = chatAreaHeight - this._oldChatAreaHeight;

            for (const entity of this._bubbles) {
                entity.y = entity.y + delta;
                entity.applyToVisualization(true);
            }
        }

        this._oldChatAreaHeight = chatAreaHeight;
    }
}
