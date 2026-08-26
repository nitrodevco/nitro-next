import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `3112_avatar_editor_effect_griditem_xml` (layout "avatar_editor_effect_griditem", 50x50) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AvatarEditorEffectGriditemLayoutProps {
    layout?: BoxLayout;
}

export const AvatarEditorEffectGriditemLayout = ({ layout }: AvatarEditorEffectGriditemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 50, height: 50, ...layout }}>
            <Region
                params={17}
                layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
            >
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                >
                    <ThemeImage
                        tags={[ 'BG_COLOR' ]}
                        params={16}
                        src={layoutImage('avatar_editor_parts_hilite.png')}
                        layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                    />
                </Region>
                <ThemeImage
                    name="bitmap"
                    tags={[ 'BITMAP' ]}
                    params={3935440}
                    src={undefined}
                    layout={{ position: 'absolute', left: 5, width: 40, top: 5, height: 40, maxWidth: 50, maxHeight: 50 }}
                />
                <Region
                    name="effect_amount_bg1"
                    params={16}
                    backgroundColor="#dddddd"
                    layout={{ position: 'absolute', left: 30, width: 18, top: 2, height: 14 }}
                >
                    <Region
                        name="effect_amount_bg2"
                        params={16}
                        backgroundColor="#666666"
                        layout={{ position: 'absolute', left: 1, width: 16, top: 1, height: 12 }}
                    >
                        <Region
                            name="effect_amount"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 18, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text="99"
                                textOptions={{ fill: '#eeeeee' }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Region
                    name="duration_container"
                    params={16}
                    visible={false}
                    backgroundColor="#dddddd"
                    layout={{ position: 'absolute', left: 4, width: 42, top: 41, height: 5 }}
                >
                    <ThemeImage
                        name="progress_bar"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 1, width: 40, top: 1, height: 3 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
