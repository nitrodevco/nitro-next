import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Generated from `1498_tab_content_xml` (layout "tab_content", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabContentLayoutProps {
    itemsListContent?: ReactNode;
    layout?: BoxLayout;
    onTabContent?: () => void;
}

export const TabContentLayout = ({ itemsListContent, layout, onTabContent }: TabContentLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="tab_content"
                backgroundColor="#cccccc"
                onPointerTap={onTabContent}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 223, top: 18, height: 100 }}
            >
                <Region
                    name="list"
                    layout={{ position: 'absolute', left: 5, right: 0, top: 5, bottom: 0 }}
                >
                    <Region
                        name="list_content"
                        backgroundColor="#ffffff"
                        layout={{ position: 'absolute', left: 0, width: 195, top: 0, bottom: 0, flexDirection: 'column' }}
                    >
                        {itemsListContent}
                    </Region>
                    {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
                </Region>
            </Region>
        </Region>
    );
};
