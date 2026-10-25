import { TemplateWindows } from '#base/theme';

/** `BUTTONS_MAX_WIDTH` / `BUTTON_HEIGHT` / `BUTTON_MARGIN` of `InfoStandRentableBotView` and `InfoStandPetView`. */
const BUTTONS_MAX_WIDTH = 250;
const BUTTON_HEIGHT = 25;
const BUTTON_MARGIN = 5;

/**
 * The infostand's `button_list` - `createWindow` / `onButtonResized` make each region as wide as
 * its button, and `arrangeButtons` lays the shown regions right to left from `BUTTONS_MAX_WIDTH`,
 * starting a new row when one does not fit; the list ends `BUTTONS_MAX_WIDTH` wide and as tall as
 * its rows. `regions` is the order they are laid in, `buttonOf` names a region's button window.
 */
export const arrangeInfostandButtons = (buttons: NonNullable<ReturnType<TemplateWindows['find']>>, find: TemplateWindows['find'], regions: readonly string[], buttonOf: (region: string) => string) => {
    for (const name of regions) {
        const region = find(`button_list/${name}`);
        const button = find(buttonOf(name));

        if (region && button) region.setWidth(button.width);
    }

    buttons.setWidth(BUTTONS_MAX_WIDTH);

    let right = BUTTONS_MAX_WIDTH;
    let top = 0;

    for (const name of regions) {
        const region = find(`button_list/${name}`);

        if (!region?.visible) continue;

        if ((right - region.width) < 0) {
            right = BUTTONS_MAX_WIDTH;
            top += BUTTON_HEIGHT + BUTTON_MARGIN;
        }

        region.setRectangle(right - region.width, top, region.width, region.height);
        right = region.x - BUTTON_MARGIN;
    }

    buttons.setHeight(top + BUTTON_HEIGHT);
};
