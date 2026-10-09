import {
    type IAdvancedMap,
    type IGraphicAsset,
    type IParticleSystem,
    type IRoomObjectSprite,
    RoomGeometryScaleType,
    Vector3d,
} from '@nitrodevco/nitro-api';
import { AdvancedMap } from '@nitrodevco/nitro-api';
import { AlphaFilter, Container, Graphics, Matrix, Sprite, Texture } from 'pixi.js';

import { TextureUtils } from '../../../../utils';
import { AnimatedFurnitureVisualization } from './AnimatedFurnitureVisualization';
import { FurnitureParticleSystemEmitter } from './FurnitureParticleSystemEmitter';

export class FurnitureParticleSystem {
    private _emitters: IAdvancedMap<number, FurnitureParticleSystemEmitter> = new AdvancedMap();
    private _visualization: AnimatedFurnitureVisualization;
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
    private _identityMatrix: Matrix = new Matrix();
    private _blend: number = 1;
    private _bgColor: number = 0xff000000;
    private _emptySprite: Sprite;
    /**
     * One pooled sprite per live particle, drawn into the canvas in a single render pass a frame.
     * Drawing each particle with its own render (and a fade filter on top) cost a gift's 150-particle
     * burst ~150 render passes a frame.
     */
    private _particleLayer: Container = new Container();
    private _particleSprites: Sprite[] = [];
    private _isDone: boolean = false;

    constructor(visualization: AnimatedFurnitureVisualization) {
        this._visualization = visualization;
    }

    public dispose(): void {
        for (const emitter of this._emitters.getValues()) emitter.dispose();

        this._emitters.reset();

        this.destroyCanvas();

        if (this._blackOverlay) this._blackOverlay.destroy();

        if (this._emptySprite) this._emptySprite.destroy();

        this._particleLayer.destroy({ children: true });
        this._particleSprites = [];

        this._blackOverlayAlphaTransform.destroy();
    }

    /**
     * Frees the canvas, source and all: a plain `destroy()` kept the source - a room-sized render
     * target - alive on every resize, zoom and removal. The room sprite lets go of it first, as a
     * texture whose source is gone cannot be drawn.
     */
    private destroyCanvas(): void {
        if (!this._canvasTexture) return;

        if (this._roomSprite && (this._roomSprite.texture === this._canvasTexture)) this._roomSprite.texture = Texture.EMPTY;

        TextureUtils.destroyTexture(this._canvasTexture);

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
                this._canvasTexture
                && (this._canvasTexture.width !== this._roomSprite.width
                    || this._canvasTexture.height !== this._roomSprite.height)
            ) {
                this.destroyCanvas();
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

    private getParticleSprite(index: number): Sprite {
        let sprite = this._particleSprites[index];

        if (!sprite) {
            sprite = new Sprite(Texture.EMPTY);

            this._particleSprites.push(sprite);
            this._particleLayer.addChild(sprite);
        }

        return sprite;
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

            const particles = this._currentEmitter.particles;

            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];
                const tx = this._centerX + (((particle.x - particle.z) * k) / 10) * this._scaleMultiplier;
                const ty
                    = this._centerY
                        - offsetY
                        + (((particle.y + (particle.x + particle.z) / 2) * k) / 10) * this._scaleMultiplier;
                const asset = particle.getAsset();
                const sprite = this.getParticleSprite(i);

                sprite.visible = true;

                if (asset && asset.texture) {
                    sprite.texture = asset.texture;
                    sprite.x = tx + asset.offsetX;
                    sprite.y = ty + asset.offsetY;
                    // The fade is Flash's alpha-only colour transform: on one sprite that is its alpha.
                    sprite.alpha = (particle.fade && particle.alphaMultiplier < 1) ? particle.alphaMultiplier : 1;
                } else {
                    // A frame with no asset draws nothing, as before (an empty texture).
                    sprite.texture = Texture.EMPTY;
                    sprite.x = tx - 1;
                    sprite.y = ty - 1;
                    sprite.alpha = 1;
                }
            }

            for (let i = particles.length; i < this._particleSprites.length; i++) this._particleSprites[i].visible = false;

            // Clears the canvas and draws every particle in the one pass.
            if (this._canvasTexture) TextureUtils.writeToTexture(this._particleLayer, this._canvasTexture, true);

            if (!particles.length) {
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

        this.destroyCanvas();
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
