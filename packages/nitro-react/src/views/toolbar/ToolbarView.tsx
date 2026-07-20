import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

import { ToolbarMeMenu } from "./ToolbarMeMenu";

export const ToolbarView = () => {
    const [isMeExpanded, setMeExpanded] = useState(false);
    const [leftSideCollapsed, setLeftSideCollapsed] = useState(true);
    const [rightSideCollapsed, setRightSideCollapsed] = useState(true);
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
            <div className="absolute bottom-0 left-0 h-(--spacing-toolbar-h) flex items-center justify-center w-full gap-2 bg-toolbar-bg border-t border-toolbar-border shadow-[inset_0px_5px_0px_-3px_var(--color-toolbar-shadow-highlight),inset_0px_-4px_0px_-3px_var(--color-toolbar-shadow-shade)] pointer-events-auto">
                <div className="flex gap-2 items-center pl-[10px] pr-[15px] border-r border-toolbar-divider">
                    left
                </div>
                <div className="flex gap-2 items-center pl-[15px] pr-[10px] border-r border-toolbar-divider">
                    right
                </div>
            </div>
        </>
    )
}