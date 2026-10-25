import { Container } from 'pixi.js';

const stage = new Container();

/** The Pixi container the room canvases are added to. */
export const GetRoomStage = () => stage;
