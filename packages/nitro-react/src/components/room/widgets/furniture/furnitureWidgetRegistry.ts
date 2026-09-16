import { RoomObjectWidgetRequestEvent, RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { ComponentType } from 'react';

import { FurnitureAchievementFailedWidget } from './FurnitureAchievementFailedWidget';
import { FurnitureAreaHideWidget } from './FurnitureAreaHideWidget';
import { FurnitureBackgroundColorWidget } from './FurnitureBackgroundColorWidget';
import { FurnitureBadgeEngravingWidget } from './FurnitureBadgeEngravingWidget';
import { FurnitureClothingChangeWidget } from './FurnitureClothingChangeWidget';
import { FurnitureCraftingWidget } from './FurnitureCraftingWidget';
import { FurnitureCreditWidget } from './FurnitureCreditWidget';
import { FurnitureDimmerWidget } from './FurnitureDimmerWidget';
import { FurnitureEcotronBoxWidget } from './FurnitureEcotronBoxWidget';
import { FurnitureEffectBoxWidget } from './FurnitureEffectBoxWidget';
import { FurnitureEngravingWidget } from './FurnitureEngravingWidget';
import { FurnitureExternalImageWidget } from './FurnitureExternalImageWidget';
import { FurnitureGuildMenuWidget } from './FurnitureGuildMenuWidget';
import { FurnitureHighScoreWidget } from './FurnitureHighScoreWidget';
import { FurnitureLockConfirmWidget } from './FurnitureLockConfirmWidget';
import { FurnitureMannequinWidget } from './FurnitureMannequinWidget';
import { FurnitureMonsterplantSeedWidget } from './FurnitureMonsterplantSeedWidget';
import { FurnitureMysteryBoxWidget } from './FurnitureMysteryBoxWidget';
import { FurnitureMysteryTrophyWidget } from './FurnitureMysteryTrophyWidget';
import { FurniturePetPackageWidget } from './FurniturePetPackageWidget';
import { FurniturePetProductWidget } from './FurniturePetProductWidget';
import { FurniturePlaceholderWidget } from './FurniturePlaceholderWidget';
import { FurniturePlaylistEditorWidget } from './FurniturePlaylistEditorWidget';
import { FurniturePresentWidget } from './FurniturePresentWidget';
import { FurniturePurchasableClothingWidget } from './FurniturePurchasableClothingWidget';
import { FurnitureRentableSpaceWidget } from './FurnitureRentableSpaceWidget';
import { FurnitureRoomLinkWidget } from './FurnitureRoomLinkWidget';
import { FurnitureStackHeightWidget } from './FurnitureStackHeightWidget';
import { FurnitureStickieWidget } from './FurnitureStickieWidget';
import { FurnitureTrophyWidget } from './FurnitureTrophyWidget';
import { PET_PACKAGE_WIDGET } from './furnitureWidgetData';
import { FurnitureYoutubeWidget } from './FurnitureYoutubeWidget';

/**
 * Which dialog answers which request. A widget reads its own request once mounted, so this only
 * decides what is worth mounting - and adding a dialog to the room means adding a line here.
 *
 * Most of these are the `RoomObjectWidgetRequestEvent` a furniture logic dispatches. Two arrive
 * by another road: `RoomWidgetEnum` values name the widget a logic asks for through OPEN_WIDGET,
 * and the pet package is raised by the server rather than by any furni at all.
 */
export const FURNITURE_WIDGETS: Record<string, ComponentType> = {
    [RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_ENGRAVING]: FurnitureBadgeEngravingWidget,
    [RoomObjectWidgetRequestEvent.ACHIEVEMENT_RESOLUTION_FAILED]: FurnitureAchievementFailedWidget,
    [RoomObjectWidgetRequestEvent.AREA_HIDE]: FurnitureAreaHideWidget,
    [RoomObjectWidgetRequestEvent.BACKGROUND_COLOR]: FurnitureBackgroundColorWidget,
    [RoomObjectWidgetRequestEvent.BADGE_DISPLAY_ENGRAVING]: FurnitureBadgeEngravingWidget,
    [RoomObjectWidgetRequestEvent.CLOTHING_CHANGE]: FurnitureClothingChangeWidget,
    [RoomObjectWidgetRequestEvent.CREDITFURNI]: FurnitureCreditWidget,
    [RoomObjectWidgetRequestEvent.DIMMER]: FurnitureDimmerWidget,
    [RoomObjectWidgetRequestEvent.ECOTRONBOX]: FurnitureEcotronBoxWidget,
    [RoomObjectWidgetRequestEvent.EFFECTBOX_OPEN_DIALOG]: FurnitureEffectBoxWidget,
    [RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE]: FurnitureExternalImageWidget,
    [RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_CONFIRM]: FurnitureLockConfirmWidget,
    [RoomObjectWidgetRequestEvent.FRIEND_FURNITURE_ENGRAVING]: FurnitureEngravingWidget,
    [RoomObjectWidgetRequestEvent.GUILD_FURNI_CONTEXT_MENU]: FurnitureGuildMenuWidget,
    [RoomObjectWidgetRequestEvent.HIGH_SCORE_DISPLAY]: FurnitureHighScoreWidget,
    [RoomObjectWidgetRequestEvent.JUKEBOX_PLAYLIST_EDITOR]: FurniturePlaylistEditorWidget,
    [RoomObjectWidgetRequestEvent.MANNEQUIN]: FurnitureMannequinWidget,
    [RoomObjectWidgetRequestEvent.MONSTERPLANT_SEED_PLANT_CONFIRMATION_DIALOG]: FurnitureMonsterplantSeedWidget,
    [RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG]: FurnitureMysteryBoxWidget,
    [RoomObjectWidgetRequestEvent.MYSTERYTROPHY_OPEN_DIALOG]: FurnitureMysteryTrophyWidget,
    [RoomObjectWidgetRequestEvent.PET_PRODUCT_MENU]: FurniturePetProductWidget,
    [RoomObjectWidgetRequestEvent.PLACEHOLDER]: FurniturePlaceholderWidget,
    [RoomObjectWidgetRequestEvent.PRESENT]: FurniturePresentWidget,
    [RoomObjectWidgetRequestEvent.PURCHASABLE_CLOTHING_CONFIRMATION_DIALOG]: FurniturePurchasableClothingWidget,
    [RoomObjectWidgetRequestEvent.ROOM_LINK]: FurnitureRoomLinkWidget,
    [RoomObjectWidgetRequestEvent.STACK_HEIGHT]: FurnitureStackHeightWidget,
    [RoomObjectWidgetRequestEvent.STICKIE]: FurnitureStickieWidget,
    [RoomObjectWidgetRequestEvent.TROPHY]: FurnitureTrophyWidget,
    [RoomObjectWidgetRequestEvent.YOUTUBE]: FurnitureYoutubeWidget,
    [RoomWidgetEnum.CRAFTING]: FurnitureCraftingWidget,
    [RoomWidgetEnum.RENTABLESPACE]: FurnitureRentableSpaceWidget,
    [PET_PACKAGE_WIDGET]: FurniturePetPackageWidget,
};
