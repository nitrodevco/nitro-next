import { AvatarGenderType, AvatarSetType, IAvatarImage, IAvatarImageListener, IGraphicAssetCollection, IObjectVisualizationData, RoomGeometryScaleType, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { Sprite, Texture } from 'pixi.js';

import { GetTicker, TextureUtils } from '../../../../utils';
import { FurnitureMannequinVisualizationData } from './FurnitureMannequinVisualizationData';
import { FurnitureVisualization } from './FurnitureVisualization';

/**
 * Flash `FurnitureMannequinVisualization`: the layer tagged `avatar_image` draws the outfit the
 * mannequin's stuff data carries, worn by the bare mannequin body (`hd-99999-99998`). The avatar is
 * rendered once per scale, figure and direction, copied into the furniture's own asset collection
 * under a name of its own (`getAvatarAssetName` plus a build number) and the avatar image thrown away - `addAvatarAsset`,
 * which is Flash's `getImage("full", true)` (a clone) then `addAsset`. The sprite stands on that
 * asset's bottom centre (`getSpriteXOffset` / `getSpriteYOffset`), not on the layer's offsets.
 *
 * While the outfit's libraries download, the layer shows the mannequin body alone - one image per
 * scale shared by every mannequin (`getCustomPlaceholder`) - rather than the grey avatar placeholder;
 * `resetFigure` (Flash `avatarImageReady`) draws the outfit once they land.
 *
 * An asset that is replaced (the placeholder when the outfit lands, the last direction's on a turn) is
 * not destroyed at once: `resetFigure` arrives from a download between updates, and the room canvas
 * renders every frame while this visualization updates only every `UPDATE_TIME_INCREASER` ms, so the
 * canvas's sprite would still draw the destroyed texture - Pixi throws on it and the ticker stops.
 * Each build gets a name of its own, and the one it replaces is disposed `RETIRED_ASSET_UPDATES`
 * updates later, once the sprites have been given the new one.
 *
 * Two differences from Flash, both about when the asset is rebuilt. Flash rebuilds on a change of
 * scale or model only, so a turned mannequin keeps the bundle's own `avatar_image` art until the
 * server's data update for the turn arrives; here a direction with no asset yet builds one in
 * `updateObject`. And Flash's `avatarImageReady` compares the figure it is told with its own, which
 * misses when `validateAvatarFigure` has added a mandatory part to the string the download manager
 * keys on; the listener here is this visualization's own, so any call is for its figure.
 *
 * Flash's `getSpriteList` (the camera's server render data) is not ported: the port's camera
 * renders on the client.
 */
export class FurnitureMannequinVisualization extends FurnitureVisualization implements IAvatarImageListener {
    private static AVATAR_IMAGE_SPRITE_TAG: string = 'avatar_image';
    private static MANNEQUIN_BODY: string = 'hd-99999-99998';
    /** Flash passes no listener for the shared placeholder: the body is in the mandatory `hh_human_body`. */
    private static NO_LISTENER: IAvatarImageListener = { resetFigure: () => undefined };
    /** Updates a replaced asset outlives its replacement: the first gives the sprites the new one. */
    private static RETIRED_ASSET_UPDATES: number = 2;

    private static _customPlaceholders: Map<number, IAvatarImage> | undefined = undefined;
    private static _instanceCount: number = 0;

    private _figure: string | undefined = undefined;
    private _gender: AvatarGenderType | undefined = undefined;
    private _mannequinScale: RoomGeometryScaleType = RoomGeometryScaleType.None;
    private _needsUpdate: boolean = false;
    /** `getAvatarAssetName` of what the current asset draws; the asset itself is `_dynamicAssetName`. */
    private _dynamicAssetKey: string | undefined = undefined;
    private _dynamicAssetName: string | undefined = undefined;
    private _dynamicAssetVersion: number = 0;
    private _retiredAssets: { name: string; updates: number }[] = [];
    private _disposed: boolean = false;

    constructor() {
        super();

        FurnitureMannequinVisualization._instanceCount++;
    }

    public override initialize(data: IObjectVisualizationData): boolean {
        if (!(data instanceof FurnitureMannequinVisualizationData)) return false;

        return super.initialize(data);
    }

    public override dispose(): void {
        if (this._disposed) return;

        this._disposed = true;

        if (this.asset) {
            const names = [ ...this._retiredAssets.map(retired => retired.name), ...(this._dynamicAssetName ? [ this._dynamicAssetName ] : []) ];

            this.clearSpritesDrawing(names);
            FurnitureMannequinVisualization.disposeAfterFrames(this.asset, names);
        }

        this._retiredAssets = [];
        this._dynamicAssetKey = undefined;
        this._dynamicAssetName = undefined;

        super.dispose();

        FurnitureMannequinVisualization._instanceCount--;

        if (FurnitureMannequinVisualization._instanceCount === 0 && FurnitureMannequinVisualization._customPlaceholders) {
            for (const placeholder of FurnitureMannequinVisualization._customPlaceholders.values()) placeholder.dispose();

            FurnitureMannequinVisualization._customPlaceholders = undefined;
        }
    }

    protected override updateObject(scale: RoomGeometryScaleType, direction: number): boolean {
        this.disposeRetiredAssets();

        if (!super.updateObject(scale, direction)) return false;

        if (this._mannequinScale !== scale) {
            this._mannequinScale = scale;

            this.addAvatarAsset();
        } else if (!this.isAvatarAssetReady()) this.addAvatarAsset();

        return true;
    }

    protected override updateModel(scale: RoomGeometryScaleType): boolean {
        let updateModel = super.updateModel(scale);

        if (updateModel) {
            const figure = this.object.model.getValue<string>(RoomObjectVariableEnum.FurnitureMannequinFigure);

            if (figure) {
                this._gender = this.object.model.getValue<AvatarGenderType>(RoomObjectVariableEnum.FurnitureMannequinGender) || undefined;
                this._figure = `${figure}.${FurnitureMannequinVisualization.MANNEQUIN_BODY}`;

                this.addAvatarAsset();
            }
        }

        if (!updateModel) updateModel = this._needsUpdate;

        this._needsUpdate = false;

        return updateModel;
    }

    private addAvatarAsset(force: boolean = false): void {
        if (!this._figure || !this.asset || (this.isAvatarAssetReady() && !force)) return;

        const assetKey = this.getAvatarAssetName();

        if (!assetKey) return;

        const avatarImage = this.data.createAvatarImage(this._figure, this._mannequinScale, this._gender, this);

        if (!avatarImage) return;

        let image: IAvatarImage | undefined = avatarImage;

        if (avatarImage.isPlaceholder()) {
            avatarImage.dispose();

            image = this.getCustomPlaceholder(this._mannequinScale);
        }

        if (!image) return;

        image.setDirection(AvatarSetType.Full, this.direction);

        const texture = FurnitureMannequinVisualization.copyImage(image.getImage(AvatarSetType.Full, false));

        if (image === avatarImage) avatarImage.dispose();

        if (!texture) return;

        // Flash leaves the placeholder's asset out of `_dynamicAssetName`; it is tracked here too, and
        // retired rather than disposed while a sprite may still draw it
        if (this._dynamicAssetName) this._retiredAssets.push({ name: this._dynamicAssetName, updates: 0 });

        const assetName = `${assetKey}_${++this._dynamicAssetVersion}`;

        this.asset.addAsset(assetName, texture, 0, 0, false, false, false, true);

        this._dynamicAssetKey = assetKey;
        this._dynamicAssetName = assetName;
        this._needsUpdate = true;
    }

    /**
     * Flash's `getImage("full", true)`: a copy the collection owns, since `disposeAsset` destroys an
     * asset's texture and the avatar image's own goes back to the texture pool when it is disposed.
     */
    private static copyImage(image: Texture | undefined): Texture | undefined {
        if (!image || !image.width || !image.height) return undefined;

        return TextureUtils.createAndWriteRenderTexture(image.width, image.height, new Sprite(image));
    }

    /** A sprite still drawing an asset about to be disposed would draw a destroyed texture. */
    private clearSpritesDrawing(names: string[]): void {
        for (let i = 0; i < this.totalSprites; i++) {
            const sprite = this.getSprite(i);

            if (sprite && names.includes(sprite.name)) sprite.texture = Texture.EMPTY;
        }
    }

    /**
     * Disposes a removed mannequin's outfit assets a few frames on: the room canvas may draw the
     * removed object's sprites once more before it drops them (a preview rebuilding the object when
     * its data is taken away did), and a destroyed texture drawn makes Pixi throw and the ticker stop.
     * The collection is the furniture type's, which outlives the object.
     */
    private static disposeAfterFrames(asset: IGraphicAssetCollection, names: string[]): void {
        if (!names.length) return;

        let frames = 0;
        const tick = () => {
            if (++frames < FurnitureMannequinVisualization.RETIRED_ASSET_UPDATES + 1) return;

            GetTicker().remove(tick);

            for (const name of names) asset.disposeAsset(name);
        };

        GetTicker().add(tick);
    }

    /** Disposes the replaced assets whose sprites have had `RETIRED_ASSET_UPDATES` updates to move on. */
    private disposeRetiredAssets(): void {
        if (!this._retiredAssets.length) return;

        const expired: string[] = [];

        this._retiredAssets = this._retiredAssets.filter((retired) => {
            retired.updates++;

            if (retired.updates < FurnitureMannequinVisualization.RETIRED_ASSET_UPDATES) return true;

            expired.push(retired.name);

            return false;
        });

        if (!expired.length || !this.asset) return;

        this.clearSpritesDrawing(expired);

        for (const name of expired) this.asset.disposeAsset(name);
    }

    private getCustomPlaceholder(scale: RoomGeometryScaleType): IAvatarImage | undefined {
        if (!FurnitureMannequinVisualization._customPlaceholders) FurnitureMannequinVisualization._customPlaceholders = new Map();

        let placeholder = FurnitureMannequinVisualization._customPlaceholders.get(scale);

        if (!placeholder) {
            placeholder = this.data.createAvatarImage(FurnitureMannequinVisualization.MANNEQUIN_BODY, scale, undefined, FurnitureMannequinVisualization.NO_LISTENER);

            if (placeholder) FurnitureMannequinVisualization._customPlaceholders.set(scale, placeholder);
        }

        return placeholder;
    }

    private isAvatarAssetReady(): boolean {
        return !!(this._figure && this._dynamicAssetName && this._dynamicAssetKey === this.getAvatarAssetName() && this.getAsset(this._dynamicAssetName));
    }

    protected override getSpriteAssetName(scale: RoomGeometryScaleType, layerId: number): string {
        if (this._figure && this.getLayerTag(scale, this.direction, layerId) === FurnitureMannequinVisualization.AVATAR_IMAGE_SPRITE_TAG && this.isAvatarAssetReady()) return this._dynamicAssetName!;

        return super.getSpriteAssetName(scale, layerId);
    }

    private getAvatarAssetName(): string | undefined {
        if (!this.object) return undefined;

        return `mannequin_${this._figure}_${this._mannequinScale}_${this.direction}_${this.object.id}`;
    }

    /** Flash `avatarImageReady`. */
    public resetFigure(_figure: string): void {
        this.addAvatarAsset(true);
    }

    protected override getLayerXOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (this.getLayerTag(scale, direction, layerId) === FurnitureMannequinVisualization.AVATAR_IMAGE_SPRITE_TAG && this.isAvatarAssetReady()) return -(this.getAsset(this._dynamicAssetName!)?.width ?? 0) / 2;

        return super.getLayerXOffset(scale, direction, layerId);
    }

    protected override getLayerYOffset(scale: RoomGeometryScaleType, direction: number, layerId: number): number {
        if (this.getLayerTag(scale, direction, layerId) === FurnitureMannequinVisualization.AVATAR_IMAGE_SPRITE_TAG && this.isAvatarAssetReady()) return -(this.getAsset(this._dynamicAssetName!)?.height ?? 0);

        return super.getLayerYOffset(scale, direction, layerId);
    }

    protected override get data(): FurnitureMannequinVisualizationData {
        return this._data as FurnitureMannequinVisualizationData;
    }
}
