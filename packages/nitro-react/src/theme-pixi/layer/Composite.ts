import { BackgroundLayerConfig } from "./BackgroundLayerConfig";
import { CompositePiece } from "./CompositePiece";

export const Composite = (pieces: CompositePiece[]): BackgroundLayerConfig => ({ kind: 'composite', pieces });