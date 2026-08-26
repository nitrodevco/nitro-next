import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `2636_table_view_xml` (layout "wired_menu_table_view", 472x177) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TableViewLayoutProps {
    layout?: BoxLayout;
}

export const TableViewLayout = ({ layout }: TableViewLayoutProps) => {
    const t = useTranslation();
    const [ elementInputValue, setElementInputValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 472, height: 177, ...layout }}>
            <Region
                name="table_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 472, top: 0, height: 177 }}
            >
                <Border
                    variant="0"
                    name="table_border"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 472, top: 0, height: 177 }}
                >
                    <Region
                        name="table_contents"
                        params={2192}
                        layout={{ position: 'absolute', left: 5, width: 462, top: 5, height: 167, flexDirection: 'column' }}
                    >
                        <Region
                            name="table_titlerow"
                            params={16}
                            layout={{ width: 440, height: 23, flexShrink: 0, minHeight: 23, maxHeight: 23, flexDirection: 'row' }}
                        >
                            <Region
                                name="column_name"
                                params={16}
                                layout={{ width: 100, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="col1" />
                            </Region>
                        </Region>
                        <Region
                            name="splitter"
                            params={16}
                            backgroundColor="#000000"
                            layout={{ width: 440, height: 1, flexShrink: 0 }}
                        />
                        <ScrollArea
                            orientation="vertical"
                            layout={{ width: 462, height: 143, flexShrink: 0 }}
                        >
                            <Region
                                name="table_items"
                                params={144}
                                layout={{ flexDirection: 'column', width: '100%' }}
                            >
                                <Region
                                    name="top_spacer"
                                    params={16}
                                    layout={{ width: 0, height: 0, flexShrink: 0 }}
                                />
                                <Region
                                    name="table_row"
                                    params={2065}
                                    backgroundColor="#eaeaea"
                                    layout={{ width: 440, height: 20, flexShrink: 0, minHeight: 20, maxHeight: 20, flexDirection: 'row' }}
                                >
                                    <Region
                                        name="table_element"
                                        params={17}
                                        layout={{ width: 101, height: 20, flexShrink: 0, minHeight: 20, maxHeight: 20 }}
                                    >
                                        <Region
                                            visible={false}
                                            layout={{ position: 'absolute', left: 2, width: 97, top: 1, height: 17, minHeight: 17 }}
                                        >
                                            <Border
                                                variant="2"
                                                name="highlight_border"
                                                params={144}
                                                tintColor="#4fbce3"
                                                blend={0.4}
                                                layout={{ width: '100%', height: '100%' }}
                                            />
                                        </Region>
                                        <Region
                                            name="element_text"
                                            params={144}
                                            layout={{ position: 'absolute', left: 0, width: 101, top: 1, height: 17, minHeight: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        >
                                            <ThemeText text="elem1" />
                                        </Region>
                                        <TextInput
                                            value={elementInputValue}
                                            onChange={setElementInputValue}
                                            layout={{ position: 'absolute', left: 5, width: 91, top: 1, height: 18, minHeight: 18 }}
                                        />
                                        <Region
                                            name="link_container"
                                            params={934129}
                                            visible={false}
                                            layout={{ position: 'absolute', left: 48, width: 4, top: 1, height: 17, minHeight: 17, maxHeight: 17 }}
                                        >
                                            <Region
                                                name="element_link"
                                                params={144}
                                                layout={{ position: 'absolute', left: 0, width: 4, top: 0, height: 17, minHeight: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                            />
                                        </Region>
                                        <Region
                                            name="extra_button"
                                            params={81}
                                            layout={{ position: 'absolute', left: 78, width: 20, top: 0, height: 20 }}
                                        >
                                            <ThemeImage
                                                name="extra_button_bitmap"
                                                params={16}
                                                src={layoutImage('icons_info_grey.png')}
                                                layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                            />
                                        </Region>
                                    </Region>
                                </Region>
                                <Region
                                    name="bottom_spacer"
                                    params={16}
                                    layout={{ width: 0, height: 0, flexShrink: 0 }}
                                />
                            </Region>
                        </ScrollArea>
                    </Region>
                    <Region
                        name="empty_container"
                        params={2192}
                        layout={{ position: 'absolute', left: 0, width: 472, top: 29, height: 148 }}
                    >
                        <Region
                            name="nothing_to_display_text"
                            params={3280}
                            layout={{ position: 'absolute', left: 183, width: 107, top: 65, height: 17, minHeight: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('wiredmenu.table.empty')}
                                textOptions={{ fill: '#333333' }}
                            />
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
