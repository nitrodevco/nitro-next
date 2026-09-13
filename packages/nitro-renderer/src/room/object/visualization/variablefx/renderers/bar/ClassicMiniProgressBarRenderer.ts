import { ClassicBarAssetNames, ClassicProgressBarRenderer } from './ClassicProgressBarRenderer';

export class ClassicMiniProgressBarRenderer extends ClassicProgressBarRenderer {
    private static CLASSIC_MINI_PROGRESS_BAR_ASSETS: ClassicBarAssetNames = {
        background: 'variablefx_classic_mini_bar_background',
        bar: 'variablefx_classic_mini_bar_fill',
        darkening: 'variablefx_classic_mini_bar_darkening',
        lighting: 'variablefx_classic_mini_bar_lighting',
        metallic: 'variablefx_classic_mini_bar_metallic',
    };

    protected override get assetNames(): ClassicBarAssetNames {
        return ClassicMiniProgressBarRenderer.CLASSIC_MINI_PROGRESS_BAR_ASSETS;
    }

    protected override get layerDescription(): string {
        return 'classic mini progress bar';
    }
}
