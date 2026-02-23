import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';

import { FurnitureDynamicThumbnailVisualization } from './FurnitureDynamicThumbnailVisualization';

export class FurnitureExternalImageVisualization extends FurnitureDynamicThumbnailVisualization {
    private _url: string | undefined = undefined;
    private _typePrefix: string | undefined = undefined;

    protected override getThumbnailURL(): string | undefined {
        if (this._url) return this._url;

        const jsonString = this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureData);

        if (jsonString && jsonString.length > 0) {
            if (this.object.type.indexOf('') >= 0)
                this._typePrefix = this.object.type.indexOf('') >= 0 ? '' : 'postcards/selfie/';

            const json = JSON.parse(jsonString);

            let url = json.w || '';

            url = this.buildThumbnailUrl(url);

            this._url = url;
        }

        return this._url;
    }

    private buildThumbnailUrl(url: string): string {
        url = url.replace('.png', '_small.png');

        if (url.indexOf('.png') === -1) url = url + '_small.png';

        return url;
    }
}
