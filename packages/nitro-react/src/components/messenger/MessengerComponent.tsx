import { useIsWindowVisible } from '#base/context';
import { MessengerView } from '#base/views-pixi/messenger/MessengerView';

export const MessengerComponent = () => {
    const isVisible = useIsWindowVisible('messenger');

    if (!isVisible) return null;

    return <MessengerView />;
};
