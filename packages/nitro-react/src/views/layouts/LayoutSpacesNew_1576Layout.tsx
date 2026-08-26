import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, Region, ScrollArea, ThemeImage } from '#base/theme';

/** Generated from `1576_layout_spaces_new_xml` (layout "ctlg_spaces_new", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutSpacesNew_1576LayoutProps {
    layout?: BoxLayout;
    onGroupFloors?: () => void;
    onGroupViews?: () => void;
    onGroupWalls?: () => void;
}

export const LayoutSpacesNew_1576Layout = ({ layout, onGroupFloors, onGroupViews, onGroupWalls }: LayoutSpacesNew_1576LayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_spaces_new"
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="productViewWidget"
                    tags={[ 'NO_ROOM_CANVAS' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                />
                <Region
                    name="roomPreviewWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                >
                    <ThemeImage
                        name="catalog_floor_preview_example"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 240 }}
                    />
                    <ThemeImage
                        name="catalog_wall_preview_b_right"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 29, width: 288, top: 21, height: 147 }}
                    />
                    <ThemeImage
                        name="catalog_space_preview_window"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 123, width: 120, top: 51, height: 118 }}
                    />
                </Region>
                <Region
                    name="activityPointDisplayWidget"
                    layout={{ position: 'absolute', left: 180, width: 175, top: 205, height: 28 }}
                />
                <Region
                    name="spacesNewWidget"
                    tags={[ 'EMBEDDED', 'FIXED' ]}
                    params={2064}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 245, height: 180 }}
                >
                    <Region
                        name="groups"
                        params={17}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 22 }}
                    >
                        <ButtonGroupLeft
                            variant="100"
                            name="group.walls"
                            params={131089}
                            onPointerTap={onGroupWalls}
                            layout={{ position: 'absolute', left: 0, width: 147, top: 0, height: 21, minWidth: 50 }}
                        >
                            {t('catalog.spaces.tab.walls')}
                        </ButtonGroupLeft>
                        <ButtonGroupCenter
                            variant="100"
                            name="group.floors"
                            params={131089}
                            onPointerTap={onGroupFloors}
                            layout={{ position: 'absolute', left: 50, width: 152, top: 0, height: 21, minWidth: 50 }}
                        >
                            {t('catalog.spaces.tab.floors')}
                        </ButtonGroupCenter>
                        <ButtonGroupRight
                            variant="100"
                            name="group.views"
                            params={131089}
                            onPointerTap={onGroupViews}
                            layout={{ position: 'absolute', left: 100, width: 150, top: 0, height: 21, minWidth: 50 }}
                        >
                            {t('catalog.spaces.tab.views')}
                        </ButtonGroupRight>
                    </Region>
                    <Border
                        variant="6"
                        params={2064}
                        blend={0.5}
                        layout={{ position: 'absolute', left: 0, width: 360, top: 25, height: 155 }}
                    />
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 2, width: 356, top: 27, height: 151 }}
                    >
                        <Region
                            name="itemGrid"
                            params={2064}
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                        />
                    </ScrollArea>
                </Region>
                <Region
                    name="purchaseWidget"
                    params={1040}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 430, height: 30 }}
                />
            </Region>
        </Region>
    );
};
