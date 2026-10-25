import { AssetManager } from './AssetManager';

const assetManager = new AssetManager();

/** The one `AssetManager` the client and the room engine share. */
export const GetAssetManager = () => assetManager;
