import { Border, BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1508_relationship_chooser_xml` (layout "relationship_chooser", 30x68) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RelationshipChooserLayoutProps {
    layout?: BoxLayout;
}

export const RelationshipChooserLayout = ({ layout }: RelationshipChooserLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 68, ...layout }}>
            <Border
                variant="100"
                params={131072}
                tintColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 68 }}
            >
                <Region
                    name="items"
                    params={16}
                    layout={{ position: 'absolute', left: 2, width: 25, top: 2, height: 63, flexDirection: 'column', gap: 1 }}
                >
                    <Region
                        name="item_none"
                        params={17}
                        backgroundColor="#ececec"
                        layout={{ width: 25, height: 15, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="image"
                            params={16}
                            src={layoutImage('relationship_status_none.png')}
                            layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 14 }}
                        />
                    </Region>
                    <Region
                        name="item_heart"
                        params={17}
                        backgroundColor="#ffffff"
                        layout={{ width: 25, height: 15, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="image"
                            params={16}
                            src={layoutImage('relationship_status_heart.png')}
                            layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 14 }}
                        />
                    </Region>
                    <Region
                        name="item_smile"
                        params={17}
                        backgroundColor="#ececec"
                        layout={{ width: 25, height: 15, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="image"
                            params={16}
                            src={layoutImage('relationship_status_smile.png')}
                            layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 14 }}
                        />
                    </Region>
                    <Region
                        name="item_bobba"
                        params={17}
                        backgroundColor="#ffffff"
                        layout={{ width: 25, height: 15, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="image"
                            params={16}
                            src={layoutImage('relationship_status_bobba.png')}
                            layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 14 }}
                        />
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
