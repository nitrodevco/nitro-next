import { CompositePiece } from './CompositePiece';

export type BackgroundLayerConfig
    = | { kind: 'nineSlice'; textureKey: string; leftWidth: number; topHeight: number; rightWidth: number; bottomHeight: number }
        | { kind: 'stretch'; textureKey: string }
        | { kind: 'tile'; textureKey: string }
        | { kind: 'composite'; pieces: CompositePiece[] }
        | { kind: 'sprite'; textureKey: string };
