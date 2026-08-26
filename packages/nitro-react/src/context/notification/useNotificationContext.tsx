import { useContext } from 'react';
import { useStore } from 'zustand';

import { NotificationContext } from './NotificationContext';
import { NotificationContextStore } from './store/NotificationContextStore';

export const useNotificationContext = <T,>(selector: (state: NotificationContextStore) => T) => {
    const store = useContext(NotificationContext);

    if (!store) throw new Error('useNotificationContext must be used within NotificationContextProvider');

    return useStore(store, selector);
}
