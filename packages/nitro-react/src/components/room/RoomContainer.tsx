import { RoomEngineEvent } from "@nitrodevco/nitro-shared";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

import { useRoomIsLandingViewVisible } from "#base/context";
import { useRoomEventDispatcher } from "#base/hooks";
import { HotelView } from "#base/views/hotel-view/HotelView";

import { RoomCanvas } from "./RoomCanvas";
import { RoomEventHandler } from "./RoomEventHandler";

export const RoomContainer = () => {
    const [isReady, setIsReady] = useState<boolean>(false);
    const landingViewVisible = useRoomIsLandingViewVisible();
    const elementRef = useRef<HTMLDivElement>(null);

    useRoomEventDispatcher(RoomEngineEvent.INITIALIZED, event => {
        setIsReady(true);
    });

    useRoomEventDispatcher(RoomEngineEvent.DISPOSED, event => {
        setIsReady(false);
    });

    return (
        <>
            <AnimatePresence mode="wait">
                {(landingViewVisible && !isReady) && (
                    <motion.div
                        key="hotel-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="size-full"
                    >
                        <HotelView />
                    </motion.div>
                )}
                {isReady && (
                    <>
                        <RoomEventHandler />
                        <motion.div
                            ref={elementRef}
                            key="room-canvas"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="size-full"
                        >
                            <RoomCanvas ref={elementRef} />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}