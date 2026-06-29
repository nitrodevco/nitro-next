import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { DraggableWindow } from '#base/components/draggable-window';
import { cn } from '#base/lib/utils';
import { useWindowStore } from '#base/stores/ui/useWindowStore';
import { Badge, Button, Input, ScrollArea, Separator } from '#base/ui';

interface RoomEntry {
    id: number;
    name: string;
    owner: string;
    users: number;
    maxUsers: number;
    description?: string;
    category: string;
    isOwner?: boolean;
}

const MOCK_ROOMS: RoomEntry[] = [
    { id: 1, name: 'Habbo Way',          owner: 'Sulake',   users: 24, maxUsers: 50, category: 'Popular',   description: 'The classic meeting spot' },
    { id: 2, name: 'Cafe Habbo',         owner: 'CafeHost', users: 12, maxUsers: 25, category: 'Popular'  },
    { id: 3, name: 'My Room',            owner: 'You',      users: 1,  maxUsers: 10, category: 'My Rooms', isOwner: true },
    { id: 4, name: 'Trading Post',       owner: 'Trader44', users: 8,  maxUsers: 20, category: 'Trading'  },
    { id: 5, name: 'Pixel Art Gallery',  owner: 'ArtFan',   users: 5,  maxUsers: 15, category: 'Events'   },
    { id: 6, name: 'Disco Floor',        owner: 'DJ_Blue',  users: 18, maxUsers: 30, category: 'Popular'  },
];

const CATEGORIES = ['All', 'Popular', 'My Rooms', 'Trading', 'Events'];

interface RoomRowProps {
    room: RoomEntry;
    selected: boolean;
    onSelect: () => void;
}

const RoomRow = ({ room, selected, onSelect }: RoomRowProps) => (
    <button
        onClick={onSelect}
        className={cn(
            'w-full text-left px-2 py-1.5 flex items-center gap-2 rounded-sm transition-colors duration-100',
            selected
                ? 'bg-habbo-gold/20 text-habbo-gold'
                : 'text-habbo-text hover:bg-habbo-panel-mid'
        )}
    >
        <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate">{room.name}</div>
            <div className="text-[10px] text-habbo-text-muted truncate">by {room.owner}</div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
            <span className={cn(
                'text-[10px] font-semibold',
                room.users >= room.maxUsers ? 'text-habbo-danger' : 'text-habbo-text-muted'
            )}>
                {room.users}/{room.maxUsers}
            </span>
            {room.isOwner && <Badge variant="gold" className="text-[9px]">own</Badge>}
        </div>
    </button>
);

export const NavigatorView = () => {
    const close = useWindowStore(s => s.close);
    const isOpen = useWindowStore(s => s.isOpen);
    const [category, setCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<number | null>(null);

    const filtered = MOCK_ROOMS.filter(r =>
        (category === 'All' || r.category === category) &&
        r.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <DraggableWindow
            title="Navigator"
            storageKey="navigator"
            isOpen={isOpen('navigator')}
            onClose={() => close('navigator')}
            defaultPosition={{ x: 200, y: 60 }}
            defaultSize={{ width: 420, height: 440 }}
            minSize={{ width: 280, height: 200 }}
        >
            <div className="flex flex-col h-full p-2 gap-2">
                {/* Search bar */}
                <div className="relative">
                    <FiSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-habbo-text-faint" size={12} />
                    <Input
                        placeholder="Search rooms..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-6"
                    />
                </div>

                {/* Category tabs */}
                <div className="flex gap-0.5 overflow-x-auto shrink-0">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={cn(
                                'px-2 py-0.5 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors duration-100 shrink-0',
                                category === cat
                                    ? 'bg-habbo-gold text-habbo-bg'
                                    : 'text-habbo-text-muted hover:bg-habbo-panel-mid hover:text-habbo-text'
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <Separator />

                {/* Room list */}
                <ScrollArea className="flex-1">
                    <div className="flex flex-col gap-0.5 pr-1">
                        {filtered.length === 0 ? (
                            <div className="text-habbo-text-faint text-xs text-center py-4">
                                No rooms found
                            </div>
                        ) : filtered.map(room => (
                            <RoomRow
                                key={room.id}
                                room={room}
                                selected={selected === room.id}
                                onSelect={() => setSelected(room.id)}
                            />
                        ))}
                    </div>
                </ScrollArea>

                <Separator />

                {/* Footer actions */}
                <div className="flex items-center justify-between gap-2 shrink-0">
                    <Button variant="secondary" size="sm" className="flex-1">
                        Create room
                    </Button>
                    <Button
                        variant="primary"
                        size="sm"
                        className="flex-1"
                        disabled={selected == null}
                    >
                        Enter room
                    </Button>
                </div>
            </div>
        </DraggableWindow>
    );
};
