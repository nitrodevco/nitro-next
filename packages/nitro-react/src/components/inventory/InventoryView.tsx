import { useState } from 'react';

import { DraggableWindow } from '#base/components/draggable-window';
import { cn } from '#base/lib/utils';
import { useWindowStore } from '#base/stores/ui/useWindowStore';
import { Badge, ScrollArea, Separator } from '#base/ui';

interface FurniItem {
    id: number;
    name: string;
    category: 'Furni' | 'Clothing' | 'Effects' | 'Pets';
    rarity?: 'rare' | 'limited';
    count: number;
    color?: string;
}

const MOCK_ITEMS: FurniItem[] = [
    { id: 1,  name: 'Sofa',            category: 'Furni',    count: 3, color: '#8B4513' },
    { id: 2,  name: 'Blue Gate',       category: 'Furni',    count: 1, color: '#1E88E5', rarity: 'rare' },
    { id: 3,  name: 'Neon Sign',       category: 'Furni',    count: 2, color: '#FF1744' },
    { id: 4,  name: 'Palm Tree',       category: 'Furni',    count: 5, color: '#43A047' },
    { id: 5,  name: 'Gold Trophy',     category: 'Furni',    count: 1, color: '#FDD835', rarity: 'limited' },
    { id: 6,  name: 'Space Chair',     category: 'Furni',    count: 2, color: '#7E57C2' },
    { id: 7,  name: 'Habbo Hoodie',    category: 'Clothing', count: 1, color: '#26C6DA' },
    { id: 8,  name: 'Pixel Hat',       category: 'Clothing', count: 1, color: '#EC407A' },
    { id: 9,  name: 'Bubble Effect',   category: 'Effects',  count: 3, color: '#80DEEA' },
    { id: 10, name: 'Cat',             category: 'Pets',     count: 1, color: '#FFCA28' },
];

const CATEGORIES = ['All', 'Furni', 'Clothing', 'Effects', 'Pets'] as const;
type Category = typeof CATEGORIES[number];

interface ItemGridCellProps {
    item: FurniItem;
    selected: boolean;
    onSelect: () => void;
}

const ItemGridCell = ({ item, selected, onSelect }: ItemGridCellProps) => (
    <button
        onClick={onSelect}
        title={item.name}
        className={cn(
            'relative flex items-center justify-center rounded-sm transition-all duration-100',
            'border aspect-square w-full',
            selected
                ? 'border-habbo-gold bg-habbo-gold/20 shadow-[0_0_0_1px_var(--color-habbo-gold)]'
                : 'border-habbo-border-light bg-habbo-panel hover:border-habbo-highlight hover:bg-habbo-panel-mid'
        )}
    >
        {/* Placeholder furniture block */}
        <div
            className="w-8 h-8 rounded-sm opacity-80"
            style={{ background: item.color ?? '#888' }}
        />
        {item.count > 1 && (
            <span className="absolute bottom-0.5 right-0.5 text-[9px] font-bold text-habbo-text-muted leading-none">
                ×{item.count}
            </span>
        )}
        {item.rarity && (
            <span className="absolute top-0.5 left-0.5">
                <Badge
                    variant={item.rarity === 'limited' ? 'gold' : 'default'}
                    className="text-[8px] px-0.5 py-0"
                >
                    {item.rarity === 'limited' ? 'LTD' : 'R'}
                </Badge>
            </span>
        )}
    </button>
);

export const InventoryView = () => {
    const close = useWindowStore(s => s.close);
    const isOpen = useWindowStore(s => s.isOpen);
    const [category, setCategory] = useState<Category>('All');
    const [selected, setSelected] = useState<number | null>(null);

    const filtered = MOCK_ITEMS.filter(
        i => category === 'All' || i.category === category
    );

    const selectedItem = MOCK_ITEMS.find(i => i.id === selected);

    return (
        <DraggableWindow
            title="Inventory"
            storageKey="inventory"
            isOpen={isOpen('inventory')}
            onClose={() => close('inventory')}
            defaultPosition={{ x: 640, y: 60 }}
            defaultSize={{ width: 528, height: 340 }}
            minSize={{ width: 300, height: 220 }}
        >
            <div className="flex h-full">
                {/* Main content */}
                <div className="flex flex-col flex-1 min-w-0 p-2 gap-2">
                    {/* Category tabs */}
                    <div className="flex gap-0.5 shrink-0">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={cn(
                                    'px-2 py-0.5 rounded-sm text-xs font-semibold transition-colors duration-100 shrink-0',
                                    category === cat
                                        ? 'bg-habbo-gold text-habbo-bg'
                                        : 'text-habbo-text-muted hover:bg-habbo-panel-mid hover:text-habbo-text'
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                        <div className="flex-1" />
                        <span className="text-xs text-habbo-text-faint self-center pr-1">
                            {filtered.length} items
                        </span>
                    </div>

                    <Separator />

                    {/* Item grid */}
                    <ScrollArea className="flex-1">
                        <div className="grid grid-cols-6 gap-1 pr-1 pb-1">
                            {filtered.map(item => (
                                <ItemGridCell
                                    key={item.id}
                                    item={item}
                                    selected={selected === item.id}
                                    onSelect={() => setSelected(item.id)}
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                {/* Side panel: item details */}
                <div
                    className="w-28 shrink-0 border-l border-habbo-border flex flex-col p-2 gap-2"
                    style={{ background: 'var(--color-habbo-header)' }}
                >
                    {selectedItem ? (
                        <>
                            {/* Preview */}
                            <div className="flex items-center justify-center h-20 rounded-sm bg-habbo-panel border border-habbo-border-light">
                                <div
                                    className="w-12 h-12 rounded-sm"
                                    style={{ background: selectedItem.color ?? '#888' }}
                                />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-habbo-text truncate">
                                    {selectedItem.name}
                                </p>
                                <p className="text-[10px] text-habbo-text-muted">{selectedItem.category}</p>
                                {selectedItem.rarity && (
                                    <Badge
                                        variant={selectedItem.rarity === 'limited' ? 'gold' : 'default'}
                                        className="mt-1 text-[9px]"
                                    >
                                        {selectedItem.rarity}
                                    </Badge>
                                )}
                            </div>
                            <div className="mt-auto flex flex-col gap-1">
                                <button className="w-full py-1 text-xs rounded-sm bg-habbo-panel-mid hover:bg-habbo-gold hover:text-habbo-bg text-habbo-text transition-colors duration-100 font-semibold">
                                    Place
                                </button>
                                <button className="w-full py-1 text-xs rounded-sm bg-habbo-panel hover:bg-habbo-panel-mid text-habbo-text-muted transition-colors duration-100">
                                    Trade
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-center">
                            <p className="text-xs text-habbo-text-faint leading-relaxed">
                                Select an item to see details
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </DraggableWindow>
    );
};
