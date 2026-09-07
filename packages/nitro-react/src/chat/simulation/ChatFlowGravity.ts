import { ChatBubbleSimulationEntity } from './ChatBubbleSimulationEntity';

/**
 * The Flash `ChatFlowGravity`: bubbles attract each other horizontally so a conversation drifts
 * into a column above whoever is talking. The pull between two bubbles falls off with distance
 * (`strength / distance`), is capped, and stops altogether beyond `MAX_DISTANCE`.
 */
export class ChatFlowGravity {
    /** `_Str_16724` - the stronger pull used while a new bubble is being placed. */
    public static readonly INSERT_STRENGTH = 60;
    /** `_Str_8857` - how far a bubble may drift from its speaker before being dragged back. */
    public static readonly MAX_DISTANCE_FROM_SPEAKER = 15;
    /** `_Str_16944` - the per-step cap used while a new bubble is being placed. */
    public static readonly INSERT_MAX_PULL = 40;

    /** `_Str_24843` - bubbles further apart than this ignore each other. */
    private static readonly MAX_DISTANCE = 380;

    public getPull(entity: ChatBubbleSimulationEntity, other: ChatBubbleSimulationEntity, strength: number = 1, maxPull: number = 100): number {
        const distance = Math.abs(other.centerX - entity.centerX);

        if (distance > ChatFlowGravity.MAX_DISTANCE) return 0;

        if (distance < 1) return 0;

        const direction = (entity.centerX <= other.centerX) ? 1 : -1;

        return direction * Math.min(Math.min(distance, strength / distance), maxPull);
    }
}
