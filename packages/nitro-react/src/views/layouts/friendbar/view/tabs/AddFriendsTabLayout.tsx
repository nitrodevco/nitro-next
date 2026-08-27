import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `66_add_friends_tab_xml` (layout "entity", 127x164) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface AddFriendsTabLayoutProps {
    itemsTabContent?: ReactNode;
    layout?: BoxLayout;
}

export const AddFriendsTabLayout = ({ itemsTabContent, layout }: AddFriendsTabLayoutProps) => {
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
                    layout={{ position: 'absolute', left: 7, right: 4, top: 3, height: 140, minHeight: 40, flexDirection: 'column' }}
                >
                    {itemsTabContent ?? (
                        <>
                            <AddFriendsTabLayoutHeaderItem />
                            <AddFriendsTabLayoutTextItem />
                            <AddFriendsTabLayoutSpacerItem />
                            <AddFriendsTabLayoutButtonItem />
                        </>
                    )}
                </Region>
            </Border>
        </Region>
    );
};

/** Row template `header` of AddFriendsTabLayout - pass real rows through its `items…` slot. */
export interface AddFriendsTabLayoutHeaderItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    srcIcon?: string;
}

export const AddFriendsTabLayoutHeaderItem = ({ captionTitle, layout, onHeader, srcIcon }: AddFriendsTabLayoutHeaderItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            params={145}
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ width: 112, height: 31, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                name="icon"
                params={1310720}
                src={srcIcon ?? layoutImage('add_friends_icon.png')}
                layout={{ position: 'absolute', right: 83, width: 31, bottom: 2, height: 34 }}
            />
            <Region
                name="title"
                tags={[ 'label' ]}
                params={3148816}
                layout={{ position: 'absolute', left: 29, width: 77, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTitle ?? t('friend.bar.find.title')}
                    textStyle="text-style-headline-medium"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 77 }}
                />
            </Region>
        </Region>
    );
};

/** Row template `text` of AddFriendsTabLayout - pass real rows through its `items…` slot. */
export interface AddFriendsTabLayoutTextItemProps {
    captionText?: string;
    layout?: BoxLayout;
}

export const AddFriendsTabLayoutTextItem = ({ captionText, layout }: AddFriendsTabLayoutTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="text"
            params={16}
            layout={{ width: 112, height: 62, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            backgroundColor="#ffffff"
        >
            <ThemeText
                text={captionText ?? t('friend.bar.find.text')}
                textOptions={{ wordWrap: true, wordWrapWidth: 112 }}
            />
        </Region>
    );
};

/** Row template `spacer` of AddFriendsTabLayout - pass real rows through its `items…` slot. */
export interface AddFriendsTabLayoutSpacerItemProps {
    layout?: BoxLayout;
}

export const AddFriendsTabLayoutSpacerItem = ({ layout }: AddFriendsTabLayoutSpacerItemProps) => {
    return (
        <Region
            name="spacer"
            params={16}
            layout={{ width: 1, height: 6, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `button` of AddFriendsTabLayout - pass real rows through its `items…` slot. */
export interface AddFriendsTabLayoutButtonItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AddFriendsTabLayoutButtonItem = ({ layout, onButton }: AddFriendsTabLayoutButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="button"
            params={131089}
            onPointerTap={onButton}
            layout={{ width: 111, height: 32, flexShrink: 0, minWidth: 111, maxWidth: 111, ...layout }}
        >
            {t('friend.bar.find.button')}
        </ButtonThick>
    );
};
