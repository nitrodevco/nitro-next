import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

import { ToolbarMeMenu } from "./ToolbarMeMenu";

export const ToolbarView = () => {
    const [isMeExpanded, setMeExpanded] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <AnimatePresence>
                {isMeExpanded && (
                    <motion.div
                        ref={elementRef}
                        key="toolbar-me-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <ToolbarMeMenu ref={elementRef} />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 h-13.75 flex items-center justify-center w-full gap-2 bg-toolbar-bg border-t border-toolbar-border shadow-toolbar-inset">
                toolbar
            </div>
        </>
    )
}