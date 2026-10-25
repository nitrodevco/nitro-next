/** The room's mount in `MainView`: renders `RoomContainer`, which shows the room once it is initialized. */
import { RoomContainer } from './RoomContainer';

// Which room to open on launch is decided by the first NavigatorSettings (see registerNavigatorHandlers): `forward.type` / `forward.id`.
export const RoomWrapper = () => <RoomContainer />;
