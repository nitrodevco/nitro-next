import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1566_recyclerPrizesWidgetLevelItem_xml` (layout "recyclerPrizesWidgetLevelItem", 348x78) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RecyclerPrizesWidgetLevelItemLayoutProps {
    layout?: BoxLayout;
}

export const RecyclerPrizesWidgetLevelItemLayout = ({ layout }: RecyclerPrizesWidgetLevelItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 348, height: 78, ...layout }}>
            <Region
                name="bg"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 348, top: 0, height: 78 }}
            >
                <Border
                    variant="0"
                    name="border"
                    params={8390800}
                    layout={{ position: 'absolute', left: 0, width: 348, top: 0, height: 78 }}
                >
                    <Region
                        name="content"
                        params={8388752}
                        layout={{ position: 'absolute', left: 5, width: 338, top: 5, height: 68, flexDirection: 'column' }}
                    >
                        <Region
                            name="header_bar"
                            params={16}
                            layout={{ width: 106, height: 23, flexShrink: 0, minHeight: 23, maxHeight: 23, flexDirection: 'row' }}
                        >
                            <ThemeImage
                                name="star_icon"
                                params={16}
                                src={layoutImage('star_small_gold.png')}
                                layout={{ width: 18, height: 17, flexShrink: 0 }}
                            />
                            <Region
                                name="level_title"
                                params={48}
                                layout={{ width: 28, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="Title" />
                            </Region>
                            <Region
                                name="level_splitter"
                                params={16}
                                layout={{ width: 10, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text=" -" />
                            </Region>
                            <Region
                                name="level_chances"
                                params={16}
                                layout={{ width: 50, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text="Chances" />
                            </Region>
                        </Region>
                        <Region
                            params={144}
                            backgroundColor="#000000"
                            layout={{ width: 338, height: 1, flexShrink: 0 }}
                        />
                        <Region
                            params={8388752}
                            backgroundColor="#eaeaea"
                            layout={{ width: 338, height: 44, flexShrink: 0 }}
                        >
                            <Region
                                name="itemGrid"
                                params={8388752}
                                backgroundColor="#eaeaea"
                                layout={{ position: 'absolute', left: 5, width: 328, top: 5, height: 36, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
                            />
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
