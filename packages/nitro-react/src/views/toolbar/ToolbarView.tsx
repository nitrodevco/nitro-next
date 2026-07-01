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
            <div className="absolute bottom-0 left-0 h-13.75 flex items-center justify-center w-full gap-2 bg-[#2e2d2cc2] border-t border-[#0000004d] shadow-[inset_0px_5px_0px_-3px_#53524Ec2,inset_0px_-4px_0px_-3px_#494845c2] pointer-events-auto">
                <div className="flex gap-2 items-center pl-[10px] pr-[15px] border-r border-[#454442]">
                    left
                </div>
                <div className="flex gap-2 items-center pl-[15px] pr-[10px] border-r border-[#454442]">
                    right
                </div>
            </div>
        </>
    )
}