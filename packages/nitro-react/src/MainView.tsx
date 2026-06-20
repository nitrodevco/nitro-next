import { InfoRetrieveComposer } from "@nitrodevco/nitro-shared";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { useWebSocketContext } from "./context";
import { RoomView } from "./RoomView";
import { HotelView } from "./views/hotel-view/HotelView";

export const MainView = () => {
    const [isReady, setIsReady] = useState(false);
    const [roomId, setRoomId] = useState(1);
    const [landingViewVisible, setLandingViewVisible] = useState(true);
    const { setReady, send } = useWebSocketContext();

    useEffect(() => {
        if (!isReady) return;

        send(new InfoRetrieveComposer({}));
    }, [isReady]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsReady(true);
        setReady();
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
            {roomId > 0 && <RoomView roomId={roomId} />}
        </>
    );
}