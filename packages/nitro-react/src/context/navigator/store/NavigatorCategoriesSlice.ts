import { IEventCategory, IFlatCategory, ILiftedRoomData } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** The lists the server sends once for the navigator's dialogs: room and event categories, and lifted rooms. */
type State = {
    flatCategories: IFlatCategory[];
    eventCategories: IEventCategory[];
    /*
     * NavigatorLiftedRoomsMessage - HabboNewNavigator.onLiftedRooms keeps them in its
     * LiftDataContainer. Nothing shows them: the build never creates its LiftView
     * (NavigatorView.as:191 is an empty if), and Habbo sends an empty list.
     */
    liftedRooms: ILiftedRoomData[];
};

type Actions = {
    setFlatCategories: (flatCategories: IFlatCategory[]) => void;
    setEventCategories: (eventCategories: IEventCategory[]) => void;
    setLiftedRooms: (liftedRooms: ILiftedRoomData[]) => void;
};

export const NavigatorCategoriesSliceInitialState: State = {
    flatCategories: [],
    eventCategories: [],
    liftedRooms: [],
};

export type NavigatorCategoriesSlice = State & Actions;

export const createNavigatorCategoriesSlice: StateCreator<NavigatorCategoriesSlice, [], [], NavigatorCategoriesSlice> = set => ({
    ...NavigatorCategoriesSliceInitialState,
    setFlatCategories: flatCategories => set({ flatCategories }),
    setEventCategories: eventCategories => set({ eventCategories }),
    setLiftedRooms: liftedRooms => set({ liftedRooms }),
});
