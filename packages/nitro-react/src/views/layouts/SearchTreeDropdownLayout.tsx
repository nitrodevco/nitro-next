import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ScrollArea, TextInput, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1152_search_tree_dropdown_xml` (layout "search_tree_dropdown", 197x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SearchTreeDropdownLayoutProps {
    layout?: BoxLayout;
}

export const SearchTreeDropdownLayout = ({ layout }: SearchTreeDropdownLayoutProps) => {
    const t = useTranslation();
    const [ inputFieldValue, setInputFieldValue ] = useState('');

    return (
        <Region layout={{ position: 'relative', width: 197, height: 22, ...layout }}>
            <Region
                name="search_tree_dropdown"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 197, top: 0, height: 22 }}
            >
                <Border
                    variant="12"
                    name="collapsed_view"
                    params={12585104}
                    layout={{ position: 'absolute', left: 0, width: 197, top: 0, height: 22 }}
                >
                    <Icon
                        variant="7"
                        name="down_icon"
                        params={12848208}
                        tintColor="#777777"
                        layout={{ position: 'absolute', left: 179, width: 10, top: 9, height: 5 }}
                    />
                </Border>
                <Region
                    name="expanded_view_wrapper"
                    layout={{ position: 'absolute', left: 0, width: 1000, top: 0, height: 1000 }}
                >
                    <Border
                        variant="12"
                        name="expanded_view"
                        params={149521}
                        layout={{ position: 'absolute', left: 0, width: 198, top: 0, height: 96 }}
                    >
                        <Region
                            name="main_cont"
                            params={4327568}
                            layout={{ position: 'absolute', left: 0, width: 198, top: 0, height: 96, flexDirection: 'column' }}
                        >
                            <Region
                                name="button_list"
                                params={4194448}
                                layout={{ width: 196, height: 20, flexShrink: 0, flexDirection: 'row' }}
                            >
                                <Region
                                    name="button_template"
                                    params={17}
                                    layout={{ width: 30, height: 20, flexShrink: 0 }}
                                >
                                    <Border
                                        variant="3"
                                        name="button_border"
                                        params={12585104}
                                        tintColor="#fafafa"
                                        layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 20 }}
                                    >
                                        <ThemeImage
                                            name="button_img"
                                            params={12585104}
                                            src={undefined}
                                            layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 18 }}
                                        />
                                    </Border>
                                    <Region
                                        name="button_shadow"
                                        params={12584080}
                                        backgroundColor="#dddddd"
                                        layout={{ position: 'absolute', left: 0, width: 30, top: 18, height: 2 }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                params={4194448}
                                layout={{ width: 196, height: 20, flexShrink: 0 }}
                            >
                                <Region
                                    name="search_wrapper_expanded"
                                    params={4194448}
                                    layout={{ position: 'absolute', left: 0, width: 196, top: 0, height: 20 }}
                                />
                                <Region
                                    name="cancel_search"
                                    params={4194369}
                                    layout={{ position: 'absolute', left: 181, width: 9, top: 5, height: 9 }}
                                >
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('var_picker_cancel_search.png')}
                                        layout={{ position: 'absolute', left: 0, width: 9, top: 0, height: 9 }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="spacer"
                                params={4194448}
                                layout={{ width: 195, height: 2, flexShrink: 0 }}
                            >
                                <Region
                                    name="splitter"
                                    params={4194448}
                                    backgroundColor="#dddddd"
                                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 1 }}
                                />
                            </Region>
                            <Region
                                name="content_box"
                                params={4194448}
                                layout={{ width: 195, height: 52, flexShrink: 0 }}
                            >
                                <Region
                                    name="empty_container"
                                    params={4194448}
                                    visible={false}
                                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 52 }}
                                >
                                    <Region
                                        params={4194448}
                                        layout={{ position: 'absolute', left: 0, width: 195, top: 19, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                    >
                                        <ThemeText
                                            text={t('wiredfurni.variable_picker.empty')}
                                            textStyle="text-style-regular"
                                            textOptions={{ fill: '#333333', align: 'center' }}
                                        />
                                    </Region>
                                </Region>
                                <Border
                                    variant="3"
                                    name="variable_overview_template"
                                    params={147457}
                                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 36 }}
                                >
                                    <Region
                                        params={4341904}
                                        layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 36, flexDirection: 'column' }}
                                    >
                                        <Region
                                            name="spacing"
                                            params={4194448}
                                            layout={{ width: 195, height: 3, flexShrink: 0 }}
                                        />
                                        <ScrollArea
                                            orientation="vertical"
                                            layout={{ width: 195, height: 30, flexShrink: 0 }}
                                        >
                                            <Region
                                                name="nodes_list"
                                                params={4194448}
                                                layout={{ flexDirection: 'column', width: '100%' }}
                                            />
                                        </ScrollArea>
                                        <Region
                                            name="spacing"
                                            params={4194448}
                                            layout={{ width: 195, height: 3, flexShrink: 0 }}
                                        />
                                    </Region>
                                </Border>
                                <Region
                                    name="node_template"
                                    params={17}
                                    backgroundColor="#ffffff"
                                    layout={{ position: 'absolute', left: 0, width: 195, top: 0, height: 20 }}
                                >
                                    <Icon
                                        variant="5"
                                        name="right_triangle_icon"
                                        params={12848208}
                                        tintColor="#777777"
                                        layout={{ position: 'absolute', left: 179, width: 10, top: 5, height: 10 }}
                                    />
                                    <Region
                                        name="node_name"
                                        params={16}
                                        layout={{ position: 'absolute', left: 7, width: 29, top: 3, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text="name"
                                            textStyle="text-style-regular"
                                            textOptions={{ fill: '#555555' }}
                                        />
                                    </Region>
                                </Region>
                            </Region>
                            <Region
                                name="spacing"
                                params={16}
                                layout={{ width: 0, height: 2, flexShrink: 0 }}
                            />
                        </Region>
                    </Border>
                </Region>
                <Region
                    name="search_wrapper_collapsed"
                    params={4194448}
                    layout={{ position: 'absolute', left: 0, width: 197, top: 1, height: 20 }}
                >
                    <Region
                        name="input_field_region"
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 197, top: 0, height: 20 }}
                    >
                        <Region
                            name="input_placeholder_text"
                            tags={[ 'DO_NOT_DISABLE' ]}
                            params={12585104}
                            layout={{ position: 'absolute', left: 0, width: 197, top: 0, height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('wiredfurni.variable_picker.search')}
                                textStyle="text-style-regular"
                                textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 197 }}
                            />
                        </Region>
                        <TextInput
                            value={inputFieldValue}
                            onChange={setInputFieldValue}
                            maxLength={60}
                            layout={{ position: 'absolute', left: 7, width: 190, top: 3, height: 17 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
