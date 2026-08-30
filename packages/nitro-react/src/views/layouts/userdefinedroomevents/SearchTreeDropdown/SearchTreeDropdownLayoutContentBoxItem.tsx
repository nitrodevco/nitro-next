import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Icon, Region, ScrollArea, ThemeText } from '#base/theme';

/** Row template `content_box` of SearchTreeDropdownLayout - pass real rows through its `items…` slot. */
export interface SearchTreeDropdownLayoutContentBoxItemProps {
    captionNodeName?: string;
    itemsNodesList?: ReactNode;
    layout?: BoxLayout;
    onNodeTemplate?: () => void;
    spacing?: ReactNode;
    spacing2?: ReactNode;
    visibleEmptyContainer?: boolean;
    visibleNodeName?: boolean;
    visibleNodesList?: boolean;
    visibleNodeTemplate?: boolean;
    visibleRightTriangleIcon?: boolean;
    visibleSpacing?: boolean;
    visibleSpacing2?: boolean;
    visibleVariableOverviewTemplate?: boolean;
}

export const SearchTreeDropdownLayoutContentBoxItem = ({ captionNodeName, itemsNodesList, layout, onNodeTemplate, spacing, spacing2, visibleEmptyContainer, visibleNodeName, visibleNodesList, visibleNodeTemplate, visibleRightTriangleIcon, visibleSpacing, visibleSpacing2, visibleVariableOverviewTemplate }: SearchTreeDropdownLayoutContentBoxItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content_box"
            layout={{ width: 195, height: 52, flexShrink: 0, ...layout }}
        >
            {(visibleEmptyContainer ?? false) && (
                <Region
                    name="empty_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, top: 19, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <ThemeText
                            text={t('wiredfurni.variable_picker.empty')}
                            textStyle="text-style-regular"
                            textOptions={{ fill: '#333333', align: 'center' }}
                        />
                    </Region>
                </Region>
            )}
            {(visibleVariableOverviewTemplate ?? true) && (
                <Border
                    variant="3"
                    name="variable_overview_template"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 36 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column' }}>
                        {(visibleSpacing ?? true) && (
                            <Region
                                name="spacing"
                                layout={{ width: 195, height: 3, flexShrink: 0 }}
                            >
                                {spacing}
                            </Region>
                        )}
                        {(visibleNodesList ?? true) && (
                            <ScrollArea
                                orientation="vertical"
                                layout={{ width: 195, height: 30, flexShrink: 0 }}
                            >
                                <Region
                                    name="nodes_list"
                                    layout={{ flexDirection: 'column', width: '100%' }}
                                >
                                    {itemsNodesList}
                                </Region>
                            </ScrollArea>
                        )}
                        {(visibleSpacing2 ?? true) && (
                            <Region
                                name="spacing"
                                layout={{ width: 195, height: 3, flexShrink: 0 }}
                            >
                                {spacing2}
                            </Region>
                        )}
                    </Region>
                </Border>
            )}
            {(visibleNodeTemplate ?? true) && (
                <Region
                    name="node_template"
                    backgroundColor="#ffffff"
                    onPointerTap={onNodeTemplate}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 20 }}
                >
                    {(visibleRightTriangleIcon ?? true) && (
                        <Icon
                            variant="5"
                            name="right_triangle_icon"
                            tintColor="#777777"
                            layout={{ position: 'absolute', right: 6, width: 10, alignSelf: 'center', height: 10 }}
                        />
                    )}
                    {(visibleNodeName ?? true) && (
                        <ThemeText
                            text={captionNodeName ?? 'name'}
                            textStyle="text-style-regular"
                            textOptions={{ fill: '#555555' }}
                            name="node_name"
                            layout={{ position: 'absolute', left: 7, width: 29, top: 3, height: 13 }}
                        />
                    )}
                </Region>
            )}
        </Region>
    );
};
