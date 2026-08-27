import { BoxLayout, Region } from '#base/theme';

/** Generated from `1498_tab_content_xml` (layout "tab_content", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TabContentLayoutProps {
    layout?: BoxLayout;
}

export const TabContentLayout = ({ layout }: TabContentLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="tab_content"
                params={17}
                backgroundColor="#cccccc"
                layout={{ position: 'absolute', left: 0, width: 223, top: 18, height: 100 }}
            >
                <Region
                    name="list"
                    params={16}
                    layout={{ position: 'absolute', left: 5, width: 218, top: 5, height: 95 }}
                >
                    <Region
                        name="list_content"
                        params={17}
                        backgroundColor="#ffffff"
                        layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 95, flexDirection: 'column' }}
                    />
                    {/* <scrollbar_vertical> for ? - rendered by that list's ScrollArea */}
                </Region>
            </Region>
        </Region>
    );
};
