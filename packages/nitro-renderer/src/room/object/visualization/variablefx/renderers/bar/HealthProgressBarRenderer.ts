import { VariableFxWidth } from '../../VariableFxTables';
import { ClassicBarAssetNames, ClassicBarOverlaySlice, ClassicProgressBarRenderer } from './ClassicProgressBarRenderer';

export class HealthProgressBarRenderer extends ClassicProgressBarRenderer {
    private static HEALTH_PROGRESS_BAR_ASSETS: ClassicBarAssetNames = {
        background: 'variablefx_health_bar_background',
        bar: 'variablefx_health_bar_fill',
        darkening: 'variablefx_health_bar_darkening',
        lighting: 'variablefx_health_bar_lighting',
        metallic: undefined,
    };

    private static HEALTH_OVERLAY_SLICE: ClassicBarOverlaySlice = {
        leftWidth: 1,
        rightWidth: 1,
    };

    protected override get assetNames(): ClassicBarAssetNames {
        return HealthProgressBarRenderer.HEALTH_PROGRESS_BAR_ASSETS;
    }

    protected override get layerDescription(): string {
        return 'health progress bar';
    }

    protected override get overlaySlice(): ClassicBarOverlaySlice {
        return HealthProgressBarRenderer.HEALTH_OVERLAY_SLICE;
    }

    protected override get barEndWidthPx(): number {
        return 1;
    }

    protected override get barEndMinimumFillWidthPx(): number {
        return 1;
    }

    protected override get barBodyIncludesEndWidth(): boolean {
        return false;
    }

    protected override get barEndSourceRightPaddingPx(): number {
        return 0;
    }

    protected override get barEndBaseSourceRightPaddingPx(): number {
        return 1;
    }

    protected override get usesSeparateBarEndOverlaySource(): boolean {
        return true;
    }

    protected override resolveFrameWidth(width: string): number {
        switch (width) {
            case VariableFxWidth.SMALL:
                return 32;
            case VariableFxWidth.MEDIUM:
                return 48;
            case VariableFxWidth.LARGE:
                return 64;
            default:
                return 48;
        }
    }
}
