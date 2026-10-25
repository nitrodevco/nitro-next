import { NitroLogger } from '@nitrodevco/nitro-api';

import { IVariableFxAssetProvider, VariableFxRendererMapping } from './IVariableFxAssetProvider';
import { IVariableFxRenderer } from './IVariableFxRenderer';
import { ArrowProgressBarRenderer } from './renderers/bar/ArrowProgressBarRenderer';
import { BlockProgressBarRenderer } from './renderers/bar/BlockProgressBarRenderer';
import { BossHealthBarRenderer } from './renderers/bar/BossHealthBarRenderer';
import { ClassicMiniProgressBarRenderer } from './renderers/bar/ClassicMiniProgressBarRenderer';
import { ClassicProgressBarRenderer } from './renderers/bar/ClassicProgressBarRenderer';
import { HealthProgressBarRenderer } from './renderers/bar/HealthProgressBarRenderer';
import { MaskedHeartFillRenderer } from './renderers/bar/MaskedHeartFillRenderer';
import { StripedProgressBarRenderer } from './renderers/bar/StripedProgressBarRenderer';
import { ThermometerHealthPointsRenderer } from './renderers/bar/ThermometerHealthPointsRenderer';
import { StackedHealthPointsRenderer } from './renderers/healthpoints/StackedHealthPointsRenderer';
import { LevelDetailsRenderer } from './renderers/level/LevelDetailsRenderer';
import { LevelWithProgressRenderer } from './renderers/level/LevelWithProgressRenderer';
import { BakedColorNumberDisplayRenderer } from './renderers/number/BakedColorNumberDisplayRenderer';
import { RecolorableNumberDisplayRenderer } from './renderers/number/RecolorableNumberDisplayRenderer';
import { VariableFxRendererContext } from './VariableFxRendererContext';
import { VariableFxCategory, VariableFxRendererName } from './VariableFxTables';

export type VariableFxRendererFactory = (context: VariableFxRendererContext) => IVariableFxRenderer;

interface VariableFxRendererRegistration {
    category: string;
    style: string | undefined;
    create: VariableFxRendererFactory;
}

/**
 * Which renderer class draws a config: by server renderer id (from the `variablefx_renderer_mapping`
 * table) first, falling back to the (category, renderer name) pairs registered here.
 */
export class VariableFxRendererRegistry {
    private _registrations: VariableFxRendererRegistration[] = [];
    private _rendererFactories: Map<string, VariableFxRendererFactory> = new Map();
    private _serverRendererFactories: Map<number, VariableFxRendererFactory> = new Map();

    public static createDefault(assetProvider: IVariableFxAssetProvider, mappings?: VariableFxRendererMapping[]): VariableFxRendererRegistry {
        const registry = new VariableFxRendererRegistry();

        registry.registerRendererFactory('ArrowProgressBarRenderer', context => new ArrowProgressBarRenderer(context));
        registry.registerRendererFactory('BakedColorNumberDisplayRenderer', context => new BakedColorNumberDisplayRenderer(context));
        registry.registerRendererFactory('BlockProgressBarRenderer', context => new BlockProgressBarRenderer(context));
        registry.registerRendererFactory('BossHealthBarRenderer', context => new BossHealthBarRenderer(context));
        registry.registerRendererFactory('ClassicMiniProgressBarRenderer', context => new ClassicMiniProgressBarRenderer(context));
        registry.registerRendererFactory('ClassicProgressBarRenderer', context => new ClassicProgressBarRenderer(context));
        registry.registerRendererFactory('HealthProgressBarRenderer', context => new HealthProgressBarRenderer(context));
        registry.registerRendererFactory('LevelDetailsRenderer', context => new LevelDetailsRenderer(context));
        registry.registerRendererFactory('LevelWithProgressRenderer', context => new LevelWithProgressRenderer(context));
        registry.registerRendererFactory('MaskedHeartFillRenderer', context => new MaskedHeartFillRenderer(context));
        registry.registerRendererFactory('RecolorableNumberDisplayRenderer', context => new RecolorableNumberDisplayRenderer(context));
        registry.registerRendererFactory('StackedHealthPointsRenderer', context => new StackedHealthPointsRenderer(context));
        registry.registerRendererFactory('StripedProgressBarRenderer', context => new StripedProgressBarRenderer(context));
        registry.registerRendererFactory('ThermometerHealthPointsRenderer', context => new ThermometerHealthPointsRenderer(context));

        registry.registerByClass(VariableFxCategory.PROGRESS_BAR, VariableFxRendererName.CLASSIC_PROGRESS, 'ClassicProgressBarRenderer');
        registry.registerByClass(VariableFxCategory.PROGRESS_BAR, VariableFxRendererName.CLASSIC_MINI_PROGRESS, 'ClassicMiniProgressBarRenderer');
        registry.registerByClass(VariableFxCategory.PROGRESS_BAR, VariableFxRendererName.BLOCK_PROGRESS, 'BlockProgressBarRenderer');
        registry.registerByClass(VariableFxCategory.PROGRESS_BAR, VariableFxRendererName.STRIPED_PROGRESS, 'StripedProgressBarRenderer');
        registry.registerByClass(VariableFxCategory.PROGRESS_BAR, VariableFxRendererName.ARROW_PROGRESS, 'ArrowProgressBarRenderer');
        registry.registerByClass(VariableFxCategory.STATUS_BAR, VariableFxRendererName.BLOCK_PROGRESS, 'BlockProgressBarRenderer');
        registry.registerByClass(VariableFxCategory.STATUS_BAR, VariableFxRendererName.STRIPED_PROGRESS, 'StripedProgressBarRenderer');
        registry.registerByClass(VariableFxCategory.STATUS_BAR, VariableFxRendererName.ARROW_PROGRESS, 'ArrowProgressBarRenderer');
        registry.registerByClass(VariableFxCategory.HEALTH_POINTS, VariableFxRendererName.HEALTH_PROGRESS, 'HealthProgressBarRenderer');
        registry.registerByClass(VariableFxCategory.HEALTH_POINTS, VariableFxRendererName.MASKED_HEART_FILL, 'MaskedHeartFillRenderer');
        registry.registerByClass(VariableFxCategory.HEALTH_POINTS, VariableFxRendererName.STACKED_HEALTH_POINTS, 'StackedHealthPointsRenderer');
        registry.registerByClass(VariableFxCategory.HEALTH_POINTS, VariableFxRendererName.THERMOMETER_HEALTH_POINTS, 'ThermometerHealthPointsRenderer');
        registry.registerByClass(VariableFxCategory.LEVELLING_PROGRESS, VariableFxRendererName.LEVEL_WITH_PROGRESS, 'LevelWithProgressRenderer');
        registry.registerByClass(VariableFxCategory.LEVELLING_PROGRESS, VariableFxRendererName.LEVEL_WITH_BAR_AND_NUMERICAL_PROGRESS, 'LevelDetailsRenderer');
        registry.registerByClass(VariableFxCategory.BOSS_BAR, VariableFxRendererName.BOSS_HEALTH_BAR, 'BossHealthBarRenderer');
        registry.registerByClass(VariableFxCategory.NUMBER_DISPLAY, VariableFxRendererName.NUMBER_RECOLORABLE, 'RecolorableNumberDisplayRenderer');
        registry.registerByClass(VariableFxCategory.NUMBER_DISPLAY, VariableFxRendererName.NUMBER_BAKED_COLORS, 'BakedColorNumberDisplayRenderer');

        registry.registerRendererMappings(mappings ?? assetProvider.getRendererMappings());

        return registry;
    }

    public register(category: string, style: string | undefined, create: VariableFxRendererFactory): void {
        this._registrations.push({ category, style, create });
    }

    public registerRendererFactory(rendererClass: string, create: VariableFxRendererFactory): void {
        this._rendererFactories.set(rendererClass, create);
    }

    public registerRendererMappings(mappings: VariableFxRendererMapping[]): void {
        for (const mapping of mappings) {
            const factory = this._rendererFactories.get(mapping.rendererClass);

            if (!factory) {
                NitroLogger.warn(`No Variable FX renderer factory registered for class '${mapping.rendererClass}'.`);

                continue;
            }

            this._serverRendererFactories.set(mapping.rendererId, factory);
        }
    }

    public resolve(category: string, style?: string): VariableFxRendererFactory | undefined {
        if (style !== undefined) {
            for (const registration of this._registrations) {
                if (registration.category === category && registration.style === style) return registration.create;
            }
        }

        for (const registration of this._registrations) {
            if (registration.category === category && registration.style === undefined) return registration.create;
        }

        return undefined;
    }

    public resolveByServerRenderer(rendererId: number): VariableFxRendererFactory | undefined {
        return this._serverRendererFactories.get(rendererId);
    }

    private registerByClass(category: string, style: string, rendererClass: string): void {
        const factory = this._rendererFactories.get(rendererClass);

        if (factory) this.register(category, style, factory);
    }
}
