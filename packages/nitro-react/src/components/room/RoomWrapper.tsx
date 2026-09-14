import { RoomContextProvider } from '#base/context';

import { RoomContainer } from './RoomContainer';

// Which room to open on launch is decided by the first NavigatorSettings (see useNavigatorHandler): `forward.type` / `forward.id`.
export const RoomWrapper = () => {
    return (
        <RoomContextProvider>
            <RoomContainer />
        </RoomContextProvider>
    );
};
