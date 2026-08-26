import type { ReactNode } from 'react';
import { useState } from 'react';

import { NotificationContext } from './NotificationContext';
import { createNotificationContextStore } from './store';

type ProviderProps = {
    children: ReactNode;
}

export const NotificationContextProvider = ({ children }: ProviderProps) => {
    const [ctx] = useState(() => createNotificationContextStore());

    return (
        <NotificationContext value={ctx}>
            {children}
        </NotificationContext>
    );
};
