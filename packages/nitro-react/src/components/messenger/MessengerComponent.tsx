import { useIsWindowVisible } from '#base/context/system';
import { MessengerView } from '#base/views/messenger/MessengerView';

export const MessengerComponent = () => {
    const isVisible = useIsWindowVisible('messenger');

    if (!isVisible) return null;

    return <MessengerView />;
};
