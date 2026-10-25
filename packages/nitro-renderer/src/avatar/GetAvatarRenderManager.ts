import { IAvatarRenderManager } from '@nitrodevco/nitro-api';

import { AvatarRenderManager } from './AvatarRenderManager';

const avatarRenderManager = new AvatarRenderManager() as IAvatarRenderManager;

/** The one `AvatarRenderManager` the client, the room engine and the imager share. */
export const GetAvatarRenderManager = () => avatarRenderManager;
