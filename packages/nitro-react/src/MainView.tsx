import { InfoRetrieveComposer } from "@nitrodevco/nitro-shared";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { RoomContainer } from "./components";
import { useWebSocketContext } from "./context";
import { useNavigatorHandler, useUserInfoHandler } from "./handlers";
import { HotelView } from "./views/hotel-view/HotelView";

export const MainView = () => {
    const [isReady, setIsReady] = useState(false);
    const [landingViewVisible, setLandingViewVisible] = useState(true);
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

    return (
        <>
            <AnimatePresence>
                {landingViewVisible && (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <HotelView />
                    </motion.div>
                )}
            </AnimatePresence>
            {isReady && <RoomContainer />}
        </>
    );
}