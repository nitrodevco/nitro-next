import { BoxLayout, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `17_new_controls_xml` (layout "new_controls", 85x35) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface NewControlsLayoutProps {
    layout?: BoxLayout;
}

export const NewControlsLayout = ({ layout }: NewControlsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 85, height: 35, ...layout }}>
            <Region
                name="controls"
                params={145}
                layout={{ position: 'absolute', left: 0, width: 85, top: 0, height: 35 }}
            >
                <Region
                    name="btn_chat"
                    params={1}
                    dynamicStyle="lifted_hover"
                    layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 25 }}
                >
                    <ThemeImage
                        tags={[ '#icon' ]}
                        params={16}
                        src={layoutImage('friend_bar_friendlist_chat.png')}
                        layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                    />
                </Region>
                <Region
                    name="button_profile"
                    params={1}
                    dynamicStyle="lifted_hover"
                    layout={{ position: 'absolute', left: 58, width: 25, top: 0, height: 25 }}
                >
                    <ThemeImage
                        tags={[ '#icon' ]}
                        params={16}
                        src={layoutImage('friend_bar_friendlist_eye.png')}
                        layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                    />
                </Region>
                <Region
                    name="btn_visit"
                    tags={[ '#icon' ]}
                    params={1}
                    dynamicStyle="lifted_hover"
                    layout={{ position: 'absolute', left: 29, width: 25, top: 0, height: 25 }}
                >
                    <ThemeImage
                        params={16}
                        src={layoutImage('friend_bar_friendlist_go_room.png')}
                        layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 30 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
