import { ClientGates } from '../gates';
import { useClientGate } from './useClientGate';

/** `SessionDataManager.isAnyRoomController`: a controller of every room - `ClientGates.AnyRoomController`. */
export const useOwnIsAnyRoomController = () => useClientGate(ClientGates.AnyRoomController);
