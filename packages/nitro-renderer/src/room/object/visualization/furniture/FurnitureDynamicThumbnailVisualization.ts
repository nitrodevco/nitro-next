import type { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { Texture } from 'pixi.js';

import { IsometricImageFurniVisualization } from './IsometricImageFurniVisualization';

export class FurnitureDynamicThumbnailVisualization extends IsometricImageFurniVisualization {
    private _cachedUrl: string | undefined = undefined;

    constructor() {
        super();

        this._hasOutline = true;
    }

    protected override updateModel(scale: RoomGeometryScaleType): boolean {
        const thumbnailUrl = this.getThumbnailURL();

        if (this._cachedUrl !== thumbnailUrl) {
            this._cachedUrl = thumbnailUrl;

            if (this._cachedUrl && this._cachedUrl.length > 0) {
                const image = new Image();

                image.src = this._cachedUrl;
                image.crossOrigin = '*';

                image.onload = () => {
                    const texture = Texture.from(image);

                    texture.source.scaleMode = 'linear';

                    this.setThumbnailImages(texture);
                };
            } else {
                this.setThumbnailImages(undefined);
            }
        }

        return super.updateModel(scale);
    }

    protected getThumbnailURL(): string | undefined {
        throw new Error('This method must be overridden!');
    }
}
