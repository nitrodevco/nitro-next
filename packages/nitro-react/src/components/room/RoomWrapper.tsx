import { RoomContainer } from './RoomContainer';

// Which room to open on launch is decided by the first NavigatorSettings (see registerNavigatorHandlers): `forward.type` / `forward.id`.
export const RoomWrapper = () => <RoomContainer />;
