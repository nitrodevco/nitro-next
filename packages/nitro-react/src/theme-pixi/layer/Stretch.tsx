import { BackgroundLayerConfig } from './BackgroundLayerConfig';

export const Stretch = (textureKey: string): BackgroundLayerConfig => ({ kind: 'sprite', textureKey });
