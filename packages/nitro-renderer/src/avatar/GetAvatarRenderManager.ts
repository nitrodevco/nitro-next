import type { IAvatarRenderManager } from '@nitrodevco/nitro-api';

import { AvatarRenderManager } from './AvatarRenderManager';

const avatarRenderManager = new AvatarRenderManager() as IAvatarRenderManager;

export const GetAvatarRenderManager = () => avatarRenderManager;
