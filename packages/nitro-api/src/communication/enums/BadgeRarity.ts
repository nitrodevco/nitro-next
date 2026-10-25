/**
 * A badge's rarity tier, as `BadgesMessage` sends it - mirrors Flash's
 * `com.sulake.habbo.communication.enum.BadgeRarity`, whose two obfuscated members are the
 * uncommon and unique tiers its localization keys name.
 *
 * The uncommon tier only stands on its own where the hotel has it switched on
 * (`BadgesModel.isUncommonBadgeRarityEnabled`); otherwise it is shown as common, which is what
 * `getBadgeRarityLabelKey` decides.
 */
export enum BadgeRarity {
    Common = 0,
    Uncommon = 1,
    Rare = 2,
    VeryRare = 3,
    Mythical = 4,
    Legendary = 5,
    Unique = 6,
}

/** `BadgeRarity.isRareOrHigher`. */
export const isBadgeRarityRareOrHigher = (rarity: number): boolean => rarity >= Number(BadgeRarity.Rare);

/** `BadgeRarity.isStandaloneTier`: a tier that gets its own tag rather than being folded into common. */
export const isBadgeRarityStandaloneTier = (rarity: number, uncommonEnabled: boolean = false): boolean => isBadgeRarityRareOrHigher(rarity) || (uncommonEnabled && (Number(rarity) === Number(BadgeRarity.Uncommon)));

/** `BadgeRarity.getLocalizationKey`: empty for a tier with no text of its own. */
export const getBadgeRarityLocalizationKey = (rarity: number, uncommonEnabled: boolean = false): string => {
    switch (rarity) {
        case Number(BadgeRarity.Uncommon):
            return uncommonEnabled ? 'badge.rarity.uncommon' : '';
        case Number(BadgeRarity.Rare):
            return 'badge.rarity.rare';
        case Number(BadgeRarity.VeryRare):
            return 'badge.rarity.epic';
        case Number(BadgeRarity.Mythical):
            return 'badge.rarity.mythical';
        case Number(BadgeRarity.Legendary):
            return 'badge.rarity.legendary';
        case Number(BadgeRarity.Unique):
            return 'badge.rarity.unique';
        default:
            return '';
    }
};

/** `BadgeRarity.getLabelLocalizationKey`: every tier gets a text, the folded ones being common. */
export const getBadgeRarityLabelKey = (rarity: number, uncommonEnabled: boolean = false): string => (isBadgeRarityStandaloneTier(rarity, uncommonEnabled) ? getBadgeRarityLocalizationKey(rarity, uncommonEnabled) : 'badge.rarity.common');

/** `BadgeRarity.getDisplayColor`: the tier's colour, 0 for one that has none. */
export const getBadgeRarityDisplayColor = (rarity: number, uncommonEnabled: boolean = false): number => {
    switch (rarity) {
        case Number(BadgeRarity.Uncommon):
            return uncommonEnabled ? 0xffb74d : 0;
        case Number(BadgeRarity.Rare):
            return 0x85f97f;
        case Number(BadgeRarity.VeryRare):
            return 0x66baff;
        case Number(BadgeRarity.Mythical):
            return 0xc376d6;
        case Number(BadgeRarity.Legendary):
            return 0xd62f24;
        case Number(BadgeRarity.Unique):
            return 0xcc9200;
        default:
            return 0;
    }
};

/** `BadgeRarity.getGlowColor`: the uncommon tier glows its own colour, every other one its display colour. */
export const getBadgeRarityGlowColor = (rarity: number, uncommonEnabled: boolean = false): number => ((uncommonEnabled && (Number(rarity) === Number(BadgeRarity.Uncommon))) ? 0xb36e07 : getBadgeRarityDisplayColor(rarity, uncommonEnabled));

/** `darkenColor`: each channel scaled towards black. */
const darkenColor = (color: number, amount: number): number => {
    const scale = 1 - amount;
    const red = Math.trunc(((color >> 16) & 0xFF) * scale);
    const green = Math.trunc(((color >> 8) & 0xFF) * scale);
    const blue = Math.trunc((color & 0xFF) * scale);

    return (red << 16) | (green << 8) | blue;
};

/** `BadgeRarity.getWhiteBackgroundTagColor`: the tag's colour where it is drawn on white, darkened to stay readable. */
export const getBadgeRarityWhiteBackgroundTagColor = (rarity: number, uncommonEnabled: boolean = false): number => {
    switch (rarity) {
        case Number(BadgeRarity.Common):
            return 0x777777;
        case Number(BadgeRarity.Uncommon):
            return uncommonEnabled ? getBadgeRarityDisplayColor(rarity, uncommonEnabled) : 0x777777;
        case Number(BadgeRarity.Rare):
            return darkenColor(getBadgeRarityDisplayColor(rarity, uncommonEnabled), 0.35);
        case Number(BadgeRarity.VeryRare):
            return darkenColor(getBadgeRarityDisplayColor(rarity, uncommonEnabled), 0.2);
        case Number(BadgeRarity.Mythical):
            return darkenColor(getBadgeRarityDisplayColor(rarity, uncommonEnabled), 0.15);
        case Number(BadgeRarity.Legendary):
            return darkenColor(getBadgeRarityDisplayColor(rarity, uncommonEnabled), 0.1);
        default:
            return getBadgeRarityDisplayColor(rarity, uncommonEnabled);
    }
};
