
import { useIsWindowVisible } from "#base/context";
import { MessengerViewPixi } from "#base/views-pixi/messenger/MessengerViewPixi";

export const MessengerComponent = () => {
    const isVisible = useIsWindowVisible('messenger');

    if (!isVisible) return null;

    return <MessengerViewPixi />;
}