import { RoomObjectVisualizationFactory } from './RoomObjectVisualizationFactory';

const roomObjectVisualizationFactory = new RoomObjectVisualizationFactory();

/**
 * The one `RoomObjectVisualizationFactory` the room engine builds its objects' visualizations
 * with.
 */
export const GetRoomObjectVisualizationFactory = () => roomObjectVisualizationFactory;
