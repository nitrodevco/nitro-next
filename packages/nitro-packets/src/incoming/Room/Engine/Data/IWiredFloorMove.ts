export interface IWiredFloorMove {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
    sourceZ: number;
    targetZ: number;
    objectId: number;
    animationTime: number;
    rotation: number;
    /** How far past the target the furni swings before settling; `NaN` when the server sends none. */
    overshootingDistance: number;
    /** How strongly the path bends; `NaN` when the server sends none. */
    curveStrength: number;
}
