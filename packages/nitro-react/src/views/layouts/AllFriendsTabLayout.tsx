import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `44_all_friends_tab_xml` (layout "all_friends_tab", 127x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AllFriendsTabLayoutProps {
    layout?: BoxLayout;
}

export const AllFriendsTabLayout = ({ layout }: AllFriendsTabLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 127, height: 36, ...layout }}>
            <Border
                variant="6"
                name="frame"
                params={1}
                tintColor="#74dbfa"
                layout={{ position: 'absolute', left: 0, width: 127, top: 0, height: 36 }}
            >
                <Region
                    name="tab_content"
                    params={8388752}
                    layout={{ position: 'absolute', left: 7, width: 116, top: 3, height: 31, minHeight: 30, flexDirection: 'column' }}
                >
                    <Region
                        name="header"
                        params={145}
                        layout={{ width: 112, height: 31, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="icon"
                            params={1310720}
                            src={layoutImage('add_friends_icon.png')}
                            layout={{ position: 'absolute', left: -4, width: 35, top: -4, height: 33 }}
                        />
                        <Region
                            name="title"
                            tags={[ 'label' ]}
                            params={3148816}
                            layout={{ position: 'absolute', left: 33, width: 77, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('friend.bar.friends.title')}
                                textStyle="text-style-headline-medium"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 77 }}
                            />
                        </Region>
                    </Region>
                </Region>
            </Border>
        </Region>
    );
};
