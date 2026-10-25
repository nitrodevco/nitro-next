import { AnimatedFurnitureVisualization } from './AnimatedFurnitureVisualization';

/**
 * Port of Flash's obfuscated `§_-U1k§`, the visualization `RoomObjectVisualizationFactory` builds
 * for `furniture_resetting_animated`.
 */
export class FurnitureResettingAnimatedVisualization extends AnimatedFurnitureVisualization {
    protected override usesAnimationResetting(): boolean {
        return true;
    }
}
