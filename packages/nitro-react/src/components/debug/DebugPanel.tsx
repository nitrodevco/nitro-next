import type { ReactNode } from "react";
import { useState } from "react";

type DebugButtonProps = {
    onClick: () => void;
    children: ReactNode;
}

export const DebugButton = ({ onClick, children }: DebugButtonProps) => (
    <button
        type="button"
        className="cursor-pointer rounded-xs border border-white/25 bg-white/10 px-1.5 py-0.5 text-left font-ubuntu text-[10px] leading-4 text-white hover:bg-white/20"
        onClick={ onClick }>
        { children }
    </button>
);

type DebugSectionProps = {
    title: string;
    children: ReactNode;
}

export const DebugSection = ({ title, children }: DebugSectionProps) => (
    <div className="flex flex-col gap-1">
        <div className="font-ubuntu-bold text-[10px] uppercase tracking-wide text-white/50">{ title }</div>
        <div className="flex flex-wrap gap-1">{ children }</div>
    </div>
);

type DebugPanelProps = {
    title: string;
    label: string;
    className: string;
    status?: ReactNode;
    children: ReactNode;
}

export const DebugPanel = ({ title, label, className, status, children }: DebugPanelProps) => {
    const [collapsed, setCollapsed] = useState(true);

    if (collapsed) {
        return (
            <div className={ `fixed top-2 z-5000 pointer-events-auto ${ className }` }>
                <DebugButton onClick={ () => setCollapsed(false) }>{ label }</DebugButton>
            </div>
        );
    }

    return (
        <div className={ `fixed top-2 z-5000 flex w-72 flex-col gap-2 rounded-sm border border-white/20 bg-black/85 p-2 pointer-events-auto ${ className }` }>
            <div className="flex items-center justify-between">
                <div className="font-ubuntu-bold text-[11px] text-white">{ title }</div>
                <DebugButton onClick={ () => setCollapsed(true) }>hide</DebugButton>
            </div>
            { !!status && <div className="font-ubuntu text-[10px] leading-4 text-white/60">{ status }</div> }
            { children }
        </div>
    );
}
