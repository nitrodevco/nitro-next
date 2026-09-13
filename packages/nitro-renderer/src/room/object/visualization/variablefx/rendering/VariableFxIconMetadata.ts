import { IVariableFxAssetProvider } from '../IVariableFxAssetProvider';
import { VariableFxIconDefinition } from './VariableFxIconDefinition';

const ICON_ASSET_PREFIX = 'variablefx_icon_';

const trim = (value: string | undefined): string => (value ?? '').replace(/^\s+|\s+$/g, '');

/** Resolves an icon name from a config's `icon` extra into its asset name and the per-icon offsets from `variablefx_icon_metadata`. */
export class VariableFxIconMetadata {
    public static METADATA_ASSET_NAME: string = 'variablefx_icon_metadata';

    public static resolve(assetProvider: IVariableFxAssetProvider | undefined, iconName: string): VariableFxIconDefinition {
        const name = trim(iconName);
        const metadata = assetProvider?.getIconMetadata().get(name);

        return new VariableFxIconDefinition(name, ICON_ASSET_PREFIX + name.replace(/\./g, '_'), metadata?.offsetX ?? 0, metadata?.offsetY ?? 0);
    }
}
