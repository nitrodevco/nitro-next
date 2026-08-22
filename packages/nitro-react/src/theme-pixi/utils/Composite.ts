import { BackgroundLayerConfig, CompositePiece } from "./Layer";

export const Composite = (pieces: CompositePiece[]): BackgroundLayerConfig => ({ kind: 'composite', pieces });