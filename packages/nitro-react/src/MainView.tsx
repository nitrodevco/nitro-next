import { InfoRetrieveComposer } from "@nitrodevco/nitro-shared";
import { useEffect, useState } from "react";

import { RoomWrapper } from "./components";
import { useWebSocketContext } from "./context";
import { useNavigatorHandler, useUserInfoHandler } from "./handlers";

export const MainView = () => {
    const [isReady, setIsReady] = useState(false);
    const { setReady, send } = useWebSocketContext();

    useUserInfoHandler();
    useNavigatorHandler();

    useEffect(() => {
        if (!isReady) return;

        send(new InfoRetrieveComposer({}));
    }, [isReady]);

    useEffect(() => {
        if (!isReady) return;

        setReady();
    }, [isReady]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsReady(true);
    }, []);

    if (!isReady) return null;

    return <RoomWrapper />;
}