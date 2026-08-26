import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Icon, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1659_catalog_volter_xml` (layout "catalog_volter", 550x516) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface CatalogVolterLayoutProps {
    layout?: BoxLayout;
    onNavigatorMain?: () => void;
}

export const CatalogVolterLayout = ({ layout, onNavigatorMain }: CatalogVolterLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 550, height: 516, ...layout }}>
            <Region
                name="catalog_main_container"
                params={32801}
                layout={{ position: 'absolute', left: 0, width: 550, top: 0, height: 516 }}
            >
                <Frame
                    variant="0"
                    id="navigatorMain"
                    name="navigatorMain"
                    params={257}
                    caption={t('catalog.title')}
                    tintColor="#418db0"
                    onClose={onNavigatorMain}
                    layout={{ position: 'absolute', left: 370, width: 175, top: 24, height: 466 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                        <Border
                            variant="5"
                            name="navigationContainer"
                            params={2192}
                            layout={{ position: 'absolute', left: 0, width: 163, top: 0, height: 434 }}
                        >
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 3, width: 160, top: 0, height: 434 }}
                            >
                                <Region
                                    name="navigationList"
                                    params={16}
                                    layout={{ flexDirection: 'column', width: '100%' }}
                                >
                                    <Region
                                        name="list_template"
                                        params={16}
                                        layout={{ width: 158, height: 21, flexShrink: 0, flexDirection: 'column' }}
                                    />
                                    <Region
                                        name="item_template"
                                        params={131217}
                                        backgroundColor="#000000"
                                        layout={{ width: 158, height: 21, flexShrink: 0 }}
                                    >
                                        <Region
                                            name="background"
                                            tags={[ 'SELECTION_COLOR' ]}
                                            params={16}
                                            backgroundColor="#ffffff"
                                            layout={{ position: 'absolute', left: 0, width: 158, top: 0, height: 20 }}
                                        />
                                        <Region
                                            name="iconBackground"
                                            tags={[ 'ICON_COLOR' ]}
                                            params={16}
                                            backgroundColor="#eeeeee"
                                            layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 20 }}
                                        >
                                            <ThemeImage
                                                params={16}
                                                src={layoutImage('catalogue_color_picker_27x22_color.png')}
                                                layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 20 }}
                                            />
                                        </Region>
                                        <ThemeImage
                                            name="icon"
                                            tags={[ 'ICON_IMAGE' ]}
                                            params={16}
                                            src="${image.library.url}catalogue/icon_1.png"
                                            layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                                        />
                                        <Region
                                            name="item_title"
                                            tags={[ 'ITEM_TITLE' ]}
                                            params={176}
                                            layout={{ position: 'absolute', left: 26, width: 4, top: 4, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        />
                                        <Icon
                                            variant="5"
                                            name="drop_button"
                                            tags={[ 'DOWNBTN' ]}
                                            params={16}
                                            tintColor="#000000"
                                            layout={{ position: 'absolute', left: 122, width: 15, top: 5, height: 15 }}
                                        />
                                    </Region>
                                    <Region
                                        name="subitem_template"
                                        params={131217}
                                        backgroundColor="#000000"
                                        layout={{ width: 158, height: 21, flexShrink: 0 }}
                                    >
                                        <Region
                                            name="background"
                                            tags={[ 'SELECTION_COLOR' ]}
                                            params={16}
                                            backgroundColor="#d2f0f3"
                                            layout={{ position: 'absolute', left: 0, width: 158, top: 0, height: 20 }}
                                        />
                                        <ThemeImage
                                            name="icon"
                                            tags={[ 'ICON_IMAGE' ]}
                                            params={16}
                                            src="${image.library.url}catalogue/icon_2.png"
                                            layout={{ position: 'absolute', left: 5, width: 20, top: 0, height: 20 }}
                                        />
                                        <Region
                                            name="item_title"
                                            tags={[ 'ITEM_TITLE' ]}
                                            params={176}
                                            layout={{ position: 'absolute', left: 32, width: 4, top: 4, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                        />
                                    </Region>
                                </Region>
                            </ScrollArea>
                        </Border>
                    </Region>
                </Frame>
                <ThemeImage
                    name="layoutBackground"
                    params={257}
                    src={layoutImage('catalogue_background.png')}
                    layout={{ position: 'absolute', left: 0, width: 380, top: 0, height: 516 }}
                />
                <Region
                    name="layoutContainer"
                    layout={{ position: 'absolute', left: 6, width: 360, top: 40, height: 460 }}
                />
                <ThemeImage
                    name="catalog.header.image"
                    src="${image.library.url}catalogue/catalog_header_roombuilder.gif"
                    layout={{ position: 'absolute', left: 6, width: 359, top: 35, height: 70 }}
                />
                <Region
                    name="catalog.header.description"
                    layout={{ position: 'absolute', left: 10, width: 355, top: 110, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('lorem.header')}
                        textStyle="text-style-u-italic"
                        textOptions={{ wordWrap: true, wordWrapWidth: 355 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
