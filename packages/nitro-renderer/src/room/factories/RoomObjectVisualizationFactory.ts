import {
    IAssetData,
    IObjectVisualizationData,
    IRoomObjectGraphicVisualization,
    IRoomObjectVisualizationFactory,
    RoomObjectVisualizationType } from '@nitrodevco/nitro-api';

import { AnimatedFurnitureVisualization,
    AnimatedFurnitureVisualizationData,
    AnimatedPetVisualization,
    AnimatedPetVisualizationData,
    AvatarFurnitureVisualizationData,
    AvatarVisualization,
    AvatarVisualizationData,
    FurnitureBadgeDisplayVisualization,
    FurnitureBottleVisualization,
    FurnitureBuilderPlaceholderVisualization,
    FurnitureChestVisualization,
    FurnitureCounterClockVisualization,
    FurnitureCuboidVisualization,
    FurnitureExternalImageVisualization,
    FurnitureFireworksVisualization,
    FurnitureFurniChestVisualization,
    FurnitureGiftWrappedFireworksVisualization,
    FurnitureGiftWrappedVisualization,
    FurnitureGuildCustomizedVisualization,
    FurnitureGuildIsometricBadgeVisualization,
    FurnitureHabboWheelVisualization,
    FurnitureIsometricBBVisualization,
    FurnitureMannequinVisualization,
    FurniturePartyBeamerVisualization,
    FurniturePlanetSystemVisualization,
    FurniturePosterVisualization,
    FurnitureQueueTileVisualization,
    FurnitureRecolorableVisualization,
    FurnitureResettingAnimatedVisualization,
    FurnitureRoomBackgroundVisualization,
    FurnitureRoomBillboardVisualization,
    FurnitureScoreBoardVisualization,
    FurnitureSoundBlockVisualization,
    FurnitureStickieVisualization,
    FurnitureValRandomizerVisualization,
    FurnitureVisualization,
    FurnitureVisualizationData,
    FurnitureVoteCounterVisualization,
    FurnitureVoteMajorityVisualization,
    FurnitureWaterAreaVisualization,
    FurnitureYoutubeVisualization,
    RoomObjectSpriteVisualization,
    RoomVisualization,
    RoomVisualizationData,
    TileCursorVisualization,
} from '../object';

/** Port of Flash `RoomObjectVisualizationFactory`. */
export class RoomObjectVisualizationFactory implements IRoomObjectVisualizationFactory {
    private static CACHING_ENABLED: boolean = true;

    private _visualizationDatas: Map<string, IObjectVisualizationData> = new Map();

    public getVisualization(type: string | undefined): IRoomObjectGraphicVisualization | undefined {
        const visualization = this.getVisualizationType(type);

        if (!visualization) return undefined;

        return new visualization();
    }

    public getVisualizationType(type: string | undefined): typeof RoomObjectSpriteVisualization | undefined {
        let visualization: typeof RoomObjectSpriteVisualization;

        switch (type) {
            case RoomObjectVisualizationType.ROOM:
                visualization = RoomVisualization;
                break;
            case RoomObjectVisualizationType.TILE_CURSOR:
                visualization = TileCursorVisualization;
                break;
            case RoomObjectVisualizationType.USER:
            case RoomObjectVisualizationType.BOT:
            case RoomObjectVisualizationType.RENTABLE_BOT:
                visualization = AvatarVisualization;
                break;
            case RoomObjectVisualizationType.PET_ANIMATED:
                visualization = AnimatedPetVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_STATIC:
            case RoomObjectVisualizationType.FURNITURE_LABEL:
            case RoomObjectVisualizationType.FURNITURE_REGION:
                visualization = FurnitureVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_ANIMATED:
                visualization = AnimatedFurnitureVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_RESETTING_ANIMATED:
                visualization = FurnitureResettingAnimatedVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_BADGE_DISPLAY:
                visualization = FurnitureBadgeDisplayVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_BG:
                visualization = FurnitureRoomBackgroundVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_BB:
                visualization = FurnitureRoomBillboardVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_ISOMETRIC_BB:
                visualization = FurnitureIsometricBBVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_FURNI_CHEST:
                visualization = FurnitureFurniChestVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_COINS_CHEST:
                visualization = FurnitureChestVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_BOTTLE:
                visualization = FurnitureBottleVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_BUILDER_PLACEHOLDER:
                visualization = FurnitureBuilderPlaceholderVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_COUNTER_CLOCK:
                visualization = FurnitureCounterClockVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_CUBOID:
                visualization = FurnitureCuboidVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_EXTERNAL_IMAGE:
                visualization = FurnitureExternalImageVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_FIREWORKS:
                visualization = FurnitureFireworksVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_GIFT_WRAPPED_FIREWORKS:
                visualization = FurnitureGiftWrappedFireworksVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_GIFT_WRAPPED:
                visualization = FurnitureGiftWrappedVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_GUILD_CUSTOMIZED:
                visualization = FurnitureGuildCustomizedVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_GUILD_ISOMETRIC_BADGE:
                visualization = FurnitureGuildIsometricBadgeVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_HABBOWHEEL:
                visualization = FurnitureHabboWheelVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_MANNEQUIN:
                visualization = FurnitureMannequinVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_RECOLORABLE:
                visualization = FurnitureRecolorableVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_PARTY_BEAMER:
                visualization = FurniturePartyBeamerVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_PLANET_SYSTEM:
                visualization = FurniturePlanetSystemVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_POSTER:
                visualization = FurniturePosterVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_QUEUE_TILE:
                visualization = FurnitureQueueTileVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_SCORE_BOARD:
                visualization = FurnitureScoreBoardVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_SOUNDBLOCK:
                visualization = FurnitureSoundBlockVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_STICKIE:
                visualization = FurnitureStickieVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_VAL_RANDOMIZER:
                visualization = FurnitureValRandomizerVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_VOTE_COUNTER:
                visualization = FurnitureVoteCounterVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_VOTE_MAJORITY:
                visualization = FurnitureVoteMajorityVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_WATER_AREA:
                visualization = FurnitureWaterAreaVisualization;
                break;
            case RoomObjectVisualizationType.FURNITURE_YOUTUBE:
                visualization = FurnitureYoutubeVisualization;
                break;
            // Flash builds two more types that deliberately land here on the static furniture
            // visualization: the snowwar `game_snowball` / `game_snowsplash`, which need the game
            // engine. Run `scripts/drift/factories.py` after a revision bump to see whether that list grew.
            default:
                visualization = FurnitureVisualization;
                break;
        }

        return visualization;
    }

    /**
     * Forgets the data kept for `type`: the next object of it builds its data from the asset it is
     * given. Not disposed - objects made before still draw with it. Nitro's own: Flash replaces an
     * asset only by reloading the client, and the asset manager's preview swaps a furniture's build
     * in a running engine, where the kept data (its layers, its visualization type) would be the old one's.
     */
    public removeVisualizationData(type: string): void {
        this._visualizationDatas.delete(type);
    }

    public getVisualizationData(
        type: string,
        visualization: string | undefined,
        asset: IAssetData | undefined,
    ): IObjectVisualizationData | undefined {
        let visualizationData = this._visualizationDatas.get(type);

        if (visualizationData) return visualizationData;

        switch (visualization) {
            case RoomObjectVisualizationType.FURNITURE_STATIC:
            case RoomObjectVisualizationType.FURNITURE_LABEL:
            case RoomObjectVisualizationType.FURNITURE_REGION:
            case RoomObjectVisualizationType.FURNITURE_GIFT_WRAPPED:
            case RoomObjectVisualizationType.FURNITURE_BB:
            case RoomObjectVisualizationType.FURNITURE_ISOMETRIC_BB:
            case RoomObjectVisualizationType.FURNITURE_BG:
            case RoomObjectVisualizationType.FURNITURE_STICKIE:
            case RoomObjectVisualizationType.FURNITURE_BUILDER_PLACEHOLDER:
                visualizationData = new FurnitureVisualizationData();
                break;
            case RoomObjectVisualizationType.FURNITURE_ANIMATED:
            case RoomObjectVisualizationType.FURNITURE_FURNI_CHEST:
            case RoomObjectVisualizationType.FURNITURE_COINS_CHEST:
            case RoomObjectVisualizationType.FURNITURE_RESETTING_ANIMATED:
            case RoomObjectVisualizationType.FURNITURE_POSTER:
            case RoomObjectVisualizationType.FURNITURE_HABBOWHEEL:
            case RoomObjectVisualizationType.FURNITURE_VAL_RANDOMIZER:
            case RoomObjectVisualizationType.FURNITURE_BOTTLE:
            case RoomObjectVisualizationType.FURNITURE_PLANET_SYSTEM:
            case RoomObjectVisualizationType.FURNITURE_QUEUE_TILE:
            case RoomObjectVisualizationType.FURNITURE_PARTY_BEAMER:
            case RoomObjectVisualizationType.FURNITURE_COUNTER_CLOCK:
            case RoomObjectVisualizationType.FURNITURE_WATER_AREA:
            case RoomObjectVisualizationType.FURNITURE_SCORE_BOARD:
            case RoomObjectVisualizationType.FURNITURE_FIREWORKS:
            case RoomObjectVisualizationType.FURNITURE_GIFT_WRAPPED_FIREWORKS:
            case RoomObjectVisualizationType.FURNITURE_GUILD_CUSTOMIZED:
            case RoomObjectVisualizationType.FURNITURE_GUILD_ISOMETRIC_BADGE:
            case RoomObjectVisualizationType.FURNITURE_RECOLORABLE:
            case RoomObjectVisualizationType.FURNITURE_VOTE_COUNTER:
            case RoomObjectVisualizationType.FURNITURE_VOTE_MAJORITY:
            case RoomObjectVisualizationType.FURNITURE_SOUNDBLOCK:
            case RoomObjectVisualizationType.FURNITURE_BADGE_DISPLAY:
            case RoomObjectVisualizationType.FURNITURE_EXTERNAL_IMAGE:
            case RoomObjectVisualizationType.FURNITURE_YOUTUBE:
            case RoomObjectVisualizationType.TILE_CURSOR:
                visualizationData = new AnimatedFurnitureVisualizationData();
                break;
            case RoomObjectVisualizationType.FURNITURE_MANNEQUIN:
                visualizationData = new AvatarFurnitureVisualizationData();
                break;
            case RoomObjectVisualizationType.ROOM:
                visualizationData = new RoomVisualizationData();
                break;
            case RoomObjectVisualizationType.USER:
            case RoomObjectVisualizationType.BOT:
            case RoomObjectVisualizationType.RENTABLE_BOT:
                visualizationData = new AvatarVisualizationData();
                break;
            case RoomObjectVisualizationType.PET_ANIMATED:
                visualizationData = new AnimatedPetVisualizationData();
                break;
            default:
                visualizationData = new FurnitureVisualizationData();
                break;
        }

        if (!visualizationData.initialize(asset)) {
            visualizationData.dispose();

            return undefined;
        }

        if (RoomObjectVisualizationFactory.CACHING_ENABLED) this._visualizationDatas.set(type, visualizationData);

        return visualizationData;
    }
}
