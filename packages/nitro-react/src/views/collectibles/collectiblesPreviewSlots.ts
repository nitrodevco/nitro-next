/**
 * The collectibles windows' previewer windows (`CollectibleProductPreviewer`'s set, at their
 * `collectible_view.xml` rects), the temporary rooms their effect previewers draw in, and the
 * turning star's speed.
 */
import { LayoutImage } from '#base/theme';

import type { CollectiblesPreviewSlots } from './CollectiblesProductPreview';

/** `CollectionsTab.BG_STAR_ROTATE_SPEED`. */
export const COLLECTIBLES_BG_STAR_ROTATE_SPEED = 20;

/** The effect previewers' temporary rooms: one per previewer that can be up at once. */
export const COLLECTIBLES_HUB_PREVIEW_ROOM_ID = 1001;

/** The windows of the tab's previewer - `CollectibleProductPreviewer` with all seven. */
export const COLLECTIBLES_HUB_PREVIEW_SLOTS: CollectiblesPreviewSlots = {
    productPreview: { left: -5, top: -20, width: 300, height: 300 },
    placeholder: { left: 91, top: 64, width: 108, height: 132, src: LayoutImage('shared/collectables_collection_default.png'), centered: false },
    unknown: { left: 121, top: 106, width: 48, height: 48, src: LayoutImage('shared/collectables_icon_curator_stamp_large.png'), stretched: false },
    badge: { left: 105, top: 90, width: 80, height: 80, zoom: 2 },
    pet: { left: 53, top: 60, width: 180, height: 140, zoom: 2, shrinkOnOverflow: true },
    avatar: { left: 100, top: 53, width: 90, height: 130 },
    effect: { left: 93, top: 0, width: 100, height: 260, roomId: COLLECTIBLES_HUB_PREVIEW_ROOM_ID },
};
