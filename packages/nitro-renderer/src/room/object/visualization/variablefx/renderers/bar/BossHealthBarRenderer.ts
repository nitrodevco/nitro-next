import { VariableFxBitmapComposer } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxConfiguredIcon } from '../../rendering/VariableFxConfiguredIcon';
import { VariableFxIconOverlayLayout } from '../../rendering/VariableFxIconOverlayLayout';
import { VariableFxWidth } from '../../VariableFxTables';
import { ClassicBarAssetNames, ClassicBarLayoutMetrics, ClassicBarOverlaySlice, ClassicProgressBarRenderer } from './ClassicProgressBarRenderer';
import { VariableFxBarLayout } from './VariableFxBarLayout';

export class BossHealthBarRenderer extends ClassicProgressBarRenderer {
    private static BOSS_HEALTH_BAR_ASSETS: ClassicBarAssetNames = {
        background: 'variablefx_boss_health_bar_background',
        bar: 'variablefx_boss_health_bar_fill',
        darkening: 'variablefx_boss_health_bar_darkening',
        lighting: 'variablefx_boss_health_bar_lighting',
        metallic: 'variablefx_boss_health_bar_metallic',
    };

    private static BOSS_LAYOUT_METRICS: ClassicBarLayoutMetrics = {
        fillX: 4,
        fillY: 4,
        sliceLeftWidth: 2,
        sliceRightWidth: 2,
    };

    private static BOSS_OVERLAY_SLICE: ClassicBarOverlaySlice = {
        leftWidth: 2,
        rightWidth: 2,
    };

    protected override get assetNames(): ClassicBarAssetNames {
        return BossHealthBarRenderer.BOSS_HEALTH_BAR_ASSETS;
    }

    protected override get baseLayoutMetrics(): ClassicBarLayoutMetrics {
        return BossHealthBarRenderer.BOSS_LAYOUT_METRICS;
    }

    protected override get layerDescription(): string {
        return 'boss health bar';
    }

    protected override get overlaySlice(): ClassicBarOverlaySlice {
        return BossHealthBarRenderer.BOSS_OVERLAY_SLICE;
    }

    protected override resolveFrameWidth(width: string): number {
        switch (width) {
            case VariableFxWidth.LARGE:
                return 100;
            case VariableFxWidth.EXTRA_LARGE:
                return 150;
            case VariableFxWidth.BIG_MAHOOSIVE_CHONKY:
                return 200;
            default:
                return 150;
        }
    }

    protected override resolveIconOverlayLayout(layout: VariableFxBarLayout, icon: VariableFxConfiguredIcon | undefined): VariableFxIconOverlayLayout {
        const alignment = VariableFxConfiguredIcon.resolveAlignment(this.context);

        if (alignment === 'left') return super.resolveIconOverlayLayout(layout, icon);

        return VariableFxConfiguredIcon.resolveBarIconOverlayLayout(Math.trunc(layout.width), Math.trunc(layout.height), icon, alignment, 0);
    }

    protected override drawIconOverlay(composer: VariableFxBitmapComposer, _layout: VariableFxBarLayout, iconLayout: VariableFxIconOverlayLayout, icon: VariableFxConfiguredIcon | undefined): void {
        if (!icon) return;

        for (const placement of iconLayout.placements) composer.drawLayer(icon.bitmap, placement.x, placement.y, 'normal', 255);
    }
}
