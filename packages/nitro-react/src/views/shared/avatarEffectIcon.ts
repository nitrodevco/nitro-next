import { LayoutImage } from '#base/theme';

/** An avatar effect's icon - the inventory library's `fx_icon_<type>`, as the effect lists draw it. */
export const avatarEffectIcon = (type: number) => LayoutImage(`habbo-inventory-com/fx_icon_${type}.png`);
