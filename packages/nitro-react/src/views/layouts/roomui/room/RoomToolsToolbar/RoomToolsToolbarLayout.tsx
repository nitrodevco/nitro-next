import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { RoomToolsToolbarLayoutItemlistButtons, RoomToolsToolbarLayoutItemlistButtonsProps } from './RoomToolsToolbarLayoutItemlistButtons';

/** Generated from `832_room_tools_toolbar_xml` (layout "room_tools_toolbar", 165x229) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RoomToolsToolbarLayoutProps {
    itemlistButtons?: RoomToolsToolbarLayoutItemlistButtonsProps;
    layout?: BoxLayout;
    onButtonCollapse?: () => void;
    onButtonExpand?: () => void;
    srcArrowCollapse?: string;
    srcArrowExpand?: string;
}

export const RoomToolsToolbarLayout = ({ itemlistButtons, layout, onButtonCollapse, onButtonExpand, srcArrowCollapse, srcArrowExpand }: RoomToolsToolbarLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 165, height: 229, ...layout }}>
            <Region layout={{ position: 'absolute', left: -2, width: 165, top: 0, bottom: 0 }}>
                <Border
                    variant="2"
                    name="window_bg"
                    tintColor="#24231e"
                    blend={0.8}
                    layout={{ position: 'absolute', left: 1, width: 164, top: 0, bottom: 0 }}
                >
                    <RoomToolsToolbarLayoutItemlistButtons {...itemlistButtons} />
                </Border>
                <Border
                    variant="2"
                    name="side_bar_collapse"
                    tintColor="#3b3933"
                    layout={{ position: 'absolute', left: 0, width: 19, top: 0, height: 172 }}
                >
                    <Region
                        name="button_collapse"
                        onPointerTap={onButtonCollapse}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <ThemeImage
                            name="arrow_collapse"
                            src={srcArrowCollapse ?? layoutImage('roomtools_minimizebutton.png')}
                            layout={{ position: 'absolute', left: 9, width: 6, alignSelf: 'center', marginTop: 17, marginBottom: -17, height: 8 }}
                        />
                    </Region>
                </Border>
                <Border
                    variant="2"
                    name="side_bar_expand"
                    tintColor="#3b3933"
                    layout={{ position: 'absolute', left: 0, width: 19, bottom: 57, height: 108 }}
                >
                    <Region
                        name="button_expand"
                        onPointerTap={onButtonExpand}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        <ThemeImage
                            name="arrow_expand"
                            src={srcArrowExpand ?? layoutImage('roomtools_minimizebutton.png')}
                            layout={{ position: 'absolute', left: 11, width: 6, alignSelf: 'center', height: 8 }}
                        />
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
