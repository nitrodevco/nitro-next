import { motion } from 'motion/react';
import { FiCompass, FiPackage, FiUsers } from 'react-icons/fi';
import { MdOutlineDesignServices } from 'react-icons/md';
import { RiChatSmile2Line } from 'react-icons/ri';

import { cn } from '#base/lib/utils';
import { useWindowStore } from '#base/stores/ui/useWindowStore';
import { Badge } from '#base/ui';

interface ToolbarButtonProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    badge?: string | number;
    onClick?: () => void;
}

const ToolbarButton = ({ icon, label, active, badge, onClick }: ToolbarButtonProps) => (
    <button
        title={label}
        onClick={onClick}
        className={cn(
            'relative flex flex-col items-center justify-center w-11 h-11 rounded-sm',
            'text-habbo-text-muted transition-all duration-150 cursor-pointer',
            active
                ? 'bg-habbo-toolbar-active text-habbo-gold shadow-[inset_0_0_0_1px_rgba(245,197,24,0.3)]'
                : 'hover:bg-habbo-toolbar-btn hover:text-habbo-text'
        )}
    >
        <span className="text-xl leading-none">{icon}</span>
        <span className="text-[10px] mt-0.5 leading-none font-semibold">{label}</span>
        {badge != null && (
            <span className="absolute -top-0.5 -right-0.5">
                <Badge variant="gold" className="h-3.5 min-w-[14px] px-1 text-[9px]">
                    {badge}
                </Badge>
            </span>
        )}
    </button>
);

interface FriendChipProps {
    name: string;
    isOnline: boolean;
}

const FriendChip = ({ name, isOnline }: FriendChipProps) => (
    <div className="flex items-center gap-1 px-2 py-1 rounded-sm bg-habbo-toolbar-btn hover:bg-habbo-panel-mid transition-colors cursor-pointer">
        <div className={cn(
            'w-2 h-2 rounded-full shrink-0',
            isOnline ? 'bg-habbo-online' : 'bg-habbo-text-faint'
        )} />
        <span className="text-xs text-habbo-text truncate max-w-[80px]">{name}</span>
    </div>
);

export const ToolbarView = () => {
    const toggle = useWindowStore(s => s.toggle);
    const isOpen = useWindowStore(s => s.isOpen);

    return (
        <motion.div
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute bottom-0 left-0 right-0 z-50 flex items-center px-3 gap-1"
            style={{
                height: 'var(--spacing-toolbar-h)',
                background: 'linear-gradient(180deg, rgba(12,21,37,0.92) 0%, rgba(8,13,24,0.98) 100%)',
                borderTop: '2px solid var(--color-habbo-border)',
                boxShadow: 'inset 0 1px 0 var(--color-habbo-highlight)',
                backdropFilter: 'blur(4px)',
            }}
        >
            {/* Left: nav icons */}
            <div className="flex items-center gap-0.5">
                <ToolbarButton
                    icon={<FiCompass />}
                    label="Nav"
                    active={isOpen('navigator')}
                    onClick={() => toggle('navigator')}
                />
                <ToolbarButton
                    icon={<FiPackage />}
                    label="Inv"
                    active={isOpen('inventory')}
                    onClick={() => toggle('inventory')}
                />
                <ToolbarButton
                    icon={<MdOutlineDesignServices />}
                    label="Furn"
                />
                <ToolbarButton
                    icon={<RiChatSmile2Line />}
                    label="Chat"
                />
            </div>

            {/* Divider */}
            <div className="w-px h-8 bg-habbo-border-light/40 mx-1 shrink-0" />

            {/* Center: flex spacer */}
            <div className="flex-1" />

            {/* Right: online friends */}
            <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5 text-habbo-text-muted">
                    <FiUsers size={13} />
                    <span className="text-xs font-semibold text-habbo-online">3</span>
                </div>

                <div className="flex items-center gap-1 overflow-hidden max-w-xs">
                    <FriendChip name="Sulake" isOnline />
                    <FriendChip name="BlueTurtle" isOnline />
                    <FriendChip name="Habbo42" isOnline={false} />
                </div>
            </div>
        </motion.div>
    );
};
