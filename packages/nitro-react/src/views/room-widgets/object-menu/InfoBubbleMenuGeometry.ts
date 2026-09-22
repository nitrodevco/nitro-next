/**
 * The numbers of each room object menu layout that `InfoBubbleMenuFrame` draws - where
 * `avatar_menu_widget`, `own_avatar_menu`, `pet_menu`, `own_pet_menu`, `own_avatar_decorating`
 * and `breed_pet_menu` put the `border`, the rule, the `buttons` list and the `minimize` region,
 * and how the border and the bubble grow with the list (see `InfoBubbleMenuFrame`).
 */
/** `buttons`' `spacing`. */
export const LIST_SPACING = 1;

/** One layout's numbers. */
export interface InfoBubbleMenuGeometry {
    /** `border`'s width; the bubble is 8 wider. */
    width: number;
    /** The bubble's `margin_top`: 4, or 8 in the pet menus. */
    marginTop: number;
    /** `border` height minus `buttons` height in the layout. */
    borderExtra: number;
    /** Bubble height minus `border` height in the layout. */
    bubbleExtra: number;
    /** The black `background` rule's `x, y, width`. */
    rule: { left: number; top: number; width: number };
    /** `buttons`' `x, y, width`. */
    list: { left: number; top: number; width: number };
    /** The `minimize` region: `x`, its top's distance up from the border's bottom, size, and the icon's `x, y` (`undefined` x: centred). */
    minimize?: { left: number; fromBottom: number; width: number; height: number; iconLeft?: number; iconTop: number };
}

/** `avatar_menu_widget`, also `RentableBotMenuView`'s layout. */
export const AVATAR_MENU_GEOMETRY: InfoBubbleMenuGeometry = {
    width: 143, marginTop: 4, borderExtra: 56, bubbleExtra: 4,
    rule: { left: 2, top: 27, width: 139 },
    list: { left: 2, top: 28, width: 139 },
    minimize: { left: 3, fromBottom: 29, width: 136, height: 18, iconTop: 7 },
};

/** `own_avatar_menu`. */
export const OWN_AVATAR_MENU_GEOMETRY: InfoBubbleMenuGeometry = {
    width: 107, marginTop: 4, borderExtra: 50, bubbleExtra: 10,
    rule: { left: 2, top: 27, width: 103 },
    list: { left: 1, top: 28, width: 105 },
    minimize: { left: 4, fromBottom: 22, width: 100, height: 18, iconLeft: 45, iconTop: 7 },
};

/** `pet_menu`. */
export const PET_MENU_GEOMETRY: InfoBubbleMenuGeometry = {
    width: 107, marginTop: 8, borderExtra: 50, bubbleExtra: 10,
    rule: { left: 2, top: 27, width: 103 },
    list: { left: 2, top: 28, width: 103 },
    minimize: { left: 4, fromBottom: 24, width: 100, height: 18, iconLeft: 45, iconTop: 7 },
};

/** `own_pet_menu`. */
export const OWN_PET_MENU_GEOMETRY: InfoBubbleMenuGeometry = {
    width: 107, marginTop: 8, borderExtra: 50, bubbleExtra: 10,
    rule: { left: 2, top: 27, width: 103 },
    list: { left: 2, top: 28, width: 103 },
    minimize: { left: 4, fromBottom: 23, width: 100, height: 19, iconLeft: 45, iconTop: 7 },
};

/** `breed_pet_menu` (`BreedPetView`). */
export const BREED_PET_MENU_GEOMETRY: InfoBubbleMenuGeometry = {
    width: 107, marginTop: 4, borderExtra: 50, bubbleExtra: 10,
    rule: { left: 2, top: 27, width: 103 },
    list: { left: 2, top: 28, width: 103 },
    minimize: { left: 4, fromBottom: 22, width: 100, height: 18, iconLeft: 45, iconTop: 7 },
};

/** `own_avatar_decorating`: no header and no `minimize`. */
export const OWN_AVATAR_DECORATING_GEOMETRY: InfoBubbleMenuGeometry = {
    width: 107, marginTop: 4, borderExtra: 50, bubbleExtra: -27,
    rule: { left: 2, top: 7, width: 103 },
    list: { left: 2, top: 7, width: 103 },
};

/** The height `buttons` accommodates: its visible rows and the spacing between them. */
export const menuListHeight = (rowHeights: number[]) => rowHeights.reduce((total, height) => total + height, 0) + (LIST_SPACING * Math.max(0, rowHeights.length - 1));
