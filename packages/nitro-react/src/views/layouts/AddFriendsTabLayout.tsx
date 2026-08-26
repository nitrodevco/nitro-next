import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `66_add_friends_tab_xml` (layout "entity", 127x164) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AddFriendsTabLayoutProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AddFriendsTabLayout = ({ layout, onButton }: AddFriendsTabLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 127, height: 164, ...layout }}>
            <Border
                variant="6"
                name="frame"
                params={1}
                tintColor="#74dbfa"
                layout={{ position: 'absolute', left: 0, width: 127, top: 0, height: 164 }}
            >
                <Region
                    name="tab_content"
                    params={8388752}
                    layout={{ position: 'absolute', left: 7, width: 116, top: 3, height: 140, minHeight: 40, flexDirection: 'column' }}
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
                            layout={{ position: 'absolute', left: -2, width: 31, top: -5, height: 34 }}
                        />
                        <Region
                            name="title"
                            tags={[ 'label' ]}
                            params={3148816}
                            layout={{ position: 'absolute', left: 29, width: 77, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('friend.bar.find.title')}
                                textStyle="text-style-headline-medium"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 77 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="text"
                        params={16}
                        layout={{ width: 112, height: 62, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        backgroundColor="#ffffff"
                    >
                        <ThemeText
                            text={t('friend.bar.find.text')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 112 }}
                        />
                    </Region>
                    <Region
                        name="spacer"
                        params={16}
                        layout={{ width: 1, height: 6, flexShrink: 0 }}
                    />
                    <ButtonThick
                        variant="3"
                        name="button"
                        params={131089}
                        onPointerTap={onButton}
                        layout={{ width: 111, height: 32, flexShrink: 0, minWidth: 111, maxWidth: 111 }}
                    >
                        {t('friend.bar.find.button')}
                    </ButtonThick>
                </Region>
            </Border>
        </Region>
    );
};
