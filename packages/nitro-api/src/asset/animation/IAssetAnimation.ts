import type { IAssetAnimationAdd } from './IAssetAnimationAdd';
import type { IAssetAnimationAvatar } from './IAssetAnimationAvatar';
import type { IAssetAnimationDirection } from './IAssetAnimationDirection';
import type { IAssetAnimationFrame } from './IAssetAnimationFrame';
import type { IAssetAnimationOverride } from './IAssetAnimationOverride';
import type { IAssetAnimationRemove } from './IAssetAnimationRemove';
import type { IAssetAnimationShadow } from './IAssetAnimationShadow';
import type { IAssetAnimationSprite } from './IAssetAnimationSprite';

export interface IAssetAnimation {
    name?: string;
    desc?: string;
    resetOnToggle?: boolean;
    directions?: IAssetAnimationDirection[];
    shadows?: IAssetAnimationShadow[];
    adds?: IAssetAnimationAdd[];
    removes?: IAssetAnimationRemove[];
    sprites?: IAssetAnimationSprite[];
    frames?: IAssetAnimationFrame[];
    avatars?: IAssetAnimationAvatar[];
    overrides?: IAssetAnimationOverride[];
}
