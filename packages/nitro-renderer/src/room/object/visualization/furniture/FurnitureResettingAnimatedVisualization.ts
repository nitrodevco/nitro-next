import { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';

export class FurnitureResettingAnimatedVisualization extends FurnitureAnimatedVisualization {
    protected override usesAnimationResetting(): boolean {
        return true;
    }
}
