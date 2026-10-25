/**
 * `MysteryBoxToolbarExtension.KEY_COLORS`: the tint of each mystery box and key colour the server
 * names (`MysteryBoxKeysMessage`), keyed in lower case. The toolbar extension and the open dialog
 * (`MysteryBoxOpenDialogView.showWaitWindow`) both colour their `*_base` bitmaps from it.
 */
export const MYSTERY_BOX_KEY_COLORS: Readonly<Record<string, number>> = {
    purple: 0x903B62,
    blue: 0x3B6290,
    green: 0x62903B,
    yellow: 0xA2A129,
    lilac: 0x693F8C,
    orange: 0xA56C25,
    turquoise: 0x289AA2,
    red: 0x9A3031,
};

/** `uint(KEY_COLORS[colour.toLowerCase()])`: a colour the table lacks is 0, black. */
export const getMysteryBoxKeyColor = (colour: string) => {
    const key = colour.toLowerCase();

    return Object.hasOwn(MYSTERY_BOX_KEY_COLORS, key) ? MYSTERY_BOX_KEY_COLORS[key] : 0;
};
