import { InfoRetrieveComposer, OpenFlatConnectionComposer } from "@nitrodevco/nitro-shared";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { useWebSocketContext } from "./context";
import { useUserInfoHandler } from "./handlers";
import { HotelView } from "./views/hotel-view/HotelView";
import { RoomView } from "./views/room/RoomView";

export const MainView = () => {
    const [isReady, setIsReady] = useState(false);
    const [roomId, setRoomId] = useState(1);
    const [landingViewVisible, setLandingViewVisible] = useState(true);
    const { setReady, send } = useWebSocketContext();

    useUserInfoHandler();

    useEffect(() => {
        if (!isReady) return;
    }, [isReady]);

    useEffect(() => {
        if (!isReady) return;

        send(new InfoRetrieveComposer({}));
        send(new OpenFlatConnectionComposer({
            roomId,
            password: '',
            unknown1: -1
        }));
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