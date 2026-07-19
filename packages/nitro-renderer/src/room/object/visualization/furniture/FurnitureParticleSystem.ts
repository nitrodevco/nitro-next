import {
    type IAdvancedMap,
    type IGraphicAsset,
    type IParticleSystem,
    type IRoomObjectSprite,
    RoomGeometryScaleType,
    Vector3d,
} from '@nitrodevco/nitro-api';
import { AdvancedMap } from '@nitrodevco/nitro-shared';
import type { Graphics } from 'pixi.js';
import { AlphaFilter, Matrix, Point, Sprite, Texture } from 'pixi.js';

import { TextureUtils } from '../../../../utils';
import type { FurnitureAnimatedVisualization } from './FurnitureAnimatedVisualization';
import { FurnitureParticleSystemEmitter } from './FurnitureParticleSystemEmitter';

export class FurnitureParticleSystem {
    private _emitters: IAdvancedMap<number, FurnitureParticleSystemEmitter> = new AdvancedMap();
    private _visualization: FurnitureAnimatedVisualization;
    private _size: RoomGeometryScaleType;
    private _canvasId: number = -1;
    private _offsetY: number = 0;
    private _currentEmitter: FurnitureParticleSystemEmitter | undefined = undefined;
    private _canvasTexture: Texture | undefined = undefined;
    private _roomSprite: IRoomObjectSprite | undefined = undefined;
    private _hasIgnited: boolean = false;
    private _centerX: number = 0;
    private _centerY: number = 0;
    private _scaleMultiplier: number = 1;
    private _blackOverlay: Graphics;
    private _blackOverlayAlphaTransform: AlphaFilter = new AlphaFilter({ alpha: 1 });
    private _particleColorTransform: AlphaFilter = new AlphaFilter();
    private _identityMatrix: Matrix = new Matrix();
    private _translationMatrix: Matrix = new Matrix();
    private _blend: number = 1;
    private _bgColor: number = 0xff000000;
    private _emptySprite: Sprite;
    private _particleSprite: Sprite = new Sprite();
    private _isDone: boolean = false;

    constructor(visualization: FurnitureAnimatedVisualization) {
        this._visualization = visualization;
    }

    public dispose(): void {
        for (const emitter of this._emitters.getValues()) emitter.dispose();

        this._emitters.reset();

        if (this._canvasTexture) this._canvasTexture.destroy();

        if (this._blackOverlay) this._blackOverlay.destroy();

        if (this._emptySprite) this._emptySprite.destroy();

        if (this._particleSprite) this._particleSprite.destroy();

        this._canvasTexture = undefined;
    }

    public reset(): void {
        if (this._currentEmitter) this._currentEmitter.reset();

        this._currentEmitter = undefined;
        this._hasIgnited = false;
        this._isDone = false;

        this.updateCanvas();
    }

    public setAnimation(id: number): void {
        if (this._currentEmitter) this._currentEmitter.reset();

        this._currentEmitter = this._emitters.getValue(id);
        this._hasIgnited = false;
        this._isDone = false;

        this.updateCanvas();
    }

    private updateCanvas(): void {
        if (!this._currentEmitter || this._canvasId === -1) return;

        this._roomSprite = this._visualization.getSprite(this._canvasId);

        if (this._roomSprite && this._roomSprite.texture) {
            if (this._roomSprite.width <= 1 || this._roomSprite.height <= 1) return;

            if (
                this._canvasTexture &&
                (this._canvasTexture.width !== this._roomSprite.width ||
                    this._canvasTexture.height !== this._roomSprite.height)
            ) {
                this._canvasTexture.destroy();
                this._canvasTexture = undefined;
            }

            this.clearCanvas();

            this._centerX = -this._roomSprite.offsetX;
            this._centerY = -this._roomSprite.offsetY;

            if (this._canvasTexture) this._roomSprite.texture = this._canvasTexture;
        }
    }

    public getLayerYOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (this._currentEmitter && this._currentEmitter.roomObjectSpriteId === layerId) {
            return this._currentEmitter.y * this._scaleMultiplier;
        }

        return 0;
    }

    public controlsSprite(k: number): boolean {
        if (this._currentEmitter) return this._currentEmitter.roomObjectSpriteId == k;

        return false;
    }

    public updateSprites(): void {
        if (!this._currentEmitter || !this._roomSprite) return;

        if (this._canvasTexture && this._roomSprite.texture !== this._canvasTexture) {
            this._roomSprite.texture = this._canvasTexture;
        }

        if (this._hasIgnited) {
            if (this._currentEmitter.roomObjectSpriteId >= 0) {
                const sprite = this._visualization.getSprite(this._currentEmitter.roomObjectSpriteId);
                if (sprite) sprite.visible = false;
            }
        }
    }

    public updateAnimation(): void {
        if (!this._currentEmitter || !this._roomSprite || this._isDone) return;

        const k = 10;

        if (!this._hasIgnited && this._currentEmitter.hasIgnited) this._hasIgnited = true;

        const offsetY = this._offsetY * this._scaleMultiplier;

        this._currentEmitter.update();

        if (this._hasIgnited) {
            if (this._currentEmitter.roomObjectSpriteId >= 0) {
                const sprite = this._visualization.getSprite(this._currentEmitter.roomObjectSpriteId);
                if (sprite) sprite.visible = false;
            }

            if (!this._canvasTexture) this.updateCanvas();

            this.clearCanvas();

            for (const particle of this._currentEmitter.particles) {
                const tx = this._centerX + (((particle.x - particle.z) * k) / 10) * this._scaleMultiplier;
                const ty =
                    this._centerY -
                    offsetY +
                    (((particle.y + (particle.x + particle.z) / 2) * k) / 10) * this._scaleMultiplier;
                const asset = particle.getAsset();

                this._particleSprite.texture = Texture.EMPTY;
                this._particleSprite.tint = 0xffffff;
                this._particleSprite.width = 1;
                this._particleSprite.height = 1;
                this._particleSprite.x = 0;
                this._particleSprite.y = 0;
                this._particleSprite.filters = [];

                if (asset && asset.texture) {
                    this._particleSprite.texture = asset.texture;
                    this._particleSprite.width = asset.texture.width;
                    this._particleSprite.height = asset.texture.height;

                    if (particle.fade && particle.alphaMultiplier < 1) {
                        this._translationMatrix.identity();
                        this._translationMatrix.translate(tx + asset.offsetX, ty + asset.offsetY);

                        this._particleColorTransform.alpha = particle.alphaMultiplier;

                        this._particleSprite.filters = [this._particleColorTransform];

                        if (this._canvasTexture)
                            TextureUtils.writeToTexture(
                                this._particleSprite,
                                this._canvasTexture,
                                false,
                                this._translationMatrix,
                            );
                    } else {
                        const point = new Point(tx + asset.offsetX, ty + asset.offsetY);

                        this._particleSprite.x = point.x;
                        this._particleSprite.y = point.y;

                        if (this._canvasTexture)
                            TextureUtils.writeToTexture(this._particleSprite, this._canvasTexture, false);
                    }
                } else {
                    this._particleSprite.tint = 0xffffff;
                    this._particleSprite.x = tx - 1;
                    this._particleSprite.y = ty - 1;
                    this._particleSprite.width = 2;
                    this._particleSprite.height = 2;

                    if (this._canvasTexture)
                        TextureUtils.writeToTexture(this._particleSprite, this._canvasTexture, false);
                }
            }

            if (!this._currentEmitter.particles.length) {
                this._isDone = true;

                return;
            }
        }
    }

    public parseData(particleSystem: IParticleSystem): void {
        this._size = particleSystem.size;
        this._canvasId = particleSystem.canvasId !== undefined ? particleSystem.canvasId : -1;
        this._offsetY = particleSystem.offsetY !== undefined ? particleSystem.offsetY : 10;
        this._scaleMultiplier = this._size / 64;
        this._blend = particleSystem.blend !== undefined ? particleSystem.blend : 1;
        this._blend = Math.min(this._blend, 1);

        this._blackOverlayAlphaTransform.alpha = this._blend;

        const bgColor = particleSystem.bgColor !== undefined ? particleSystem.bgColor : '0';

        this._bgColor = parseInt(bgColor, 16) || 0x000000;

        if (!particleSystem.emitters || !particleSystem.emitters.length) return;

        for (const emitter of particleSystem.emitters) {
            const emitterId = emitter.id;

            if (emitterId === undefined) continue;

            const emitterName = emitter.name;
            const emitterSpriteId = emitter.spriteId;
            const particleEmitter = new FurnitureParticleSystemEmitter(emitterName, emitterSpriteId);

            this._emitters.add(emitterId, particleEmitter);

            if (emitter.particles && emitter.particles.length > 0)
                for (const particle of emitter.particles) {
                    const lifeTime = particle.lifeTime ?? 0;
                    const isEmitter = particle.isEmitter ?? false;
                    const fade = particle.fade ?? false;
                    const frames: IGraphicAsset[] = [];

                    if (particle.frames && particle.frames.length > 0)
                        for (const name of particle.frames) {
                            const asset = this._visualization.asset?.getAsset(name);

                            if (asset) frames.push(asset);
                        }

                    particleEmitter.configureParticle(lifeTime, isEmitter, frames, fade);
                }

            particleEmitter.setup(
                emitter.maxNumParticles ?? 0,
                emitter.particlesPerFrame ?? 0,
                emitter.simulation?.force ?? 0,
                new Vector3d(0, emitter.simulation?.direction ?? 0, 0),
                emitter.simulation?.gravity ?? 0,
                emitter.simulation?.airFriction ?? 0,
                emitter.simulation?.shape ?? '',
                emitter.simulation?.energy ?? 0,
                emitter.fuseTime ?? 0,
                emitter.burstPulse ?? 1,
            );
        }
    }

    public copyStateFrom(particleSystem: FurnitureParticleSystem): void {
        let emitterId = 0;

        if (particleSystem._emitters && particleSystem._currentEmitter) {
            const key = particleSystem._emitters.getKey(
                particleSystem._emitters.getValues().indexOf(particleSystem._currentEmitter),
            );

            if (key !== undefined) emitterId = key;
        }

        this.setAnimation(emitterId);

        if (this._currentEmitter && particleSystem._currentEmitter)
            this._currentEmitter.copyStateFrom(particleSystem._currentEmitter, particleSystem._size / this._size);

        if (this._canvasTexture) {
            this._canvasTexture.destroy();
            this._canvasTexture = undefined;
        }
    }

    private clearCanvas(): void {
        if (!this._emptySprite) {
            this._emptySprite = new Sprite(Texture.EMPTY);
            this._emptySprite.alpha = 0;
        }

        if (!this._canvasTexture) {
            if (this._roomSprite)
                this._canvasTexture = TextureUtils.createRenderTexture(this._roomSprite.width, this._roomSprite.height);
        } else {
            TextureUtils.writeToTexture(this._emptySprite, this._canvasTexture, true);
        }
    }
}
