import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `button_share` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonShareItemProps {
    captionTextShare?: string;
    layout?: BoxLayout;
    onButtonShare?: () => void;
    visibleTextShare?: boolean;
}

export const RoomToolsToolbarLayoutButtonShareItem = ({ captionTextShare, layout, onButtonShare, visibleTextShare }: RoomToolsToolbarLayoutButtonShareItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_share"
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonShare}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 28, top: 5, height: 2 }} />
            <ThemeImage
                src={layoutImage('navigation_icon_weblink.png')}
                layout={{ position: 'absolute', left: 2, width: 27, top: 0, height: 25 }}
            />
            {(visibleTextShare ?? true) && (
                <ThemeText
                    text={captionTextShare ?? t('navigator.embed.caption')}
                    textStyle="text-style-u-button-tab"
                    textOptions={{ fill: '#bbbbbb' }}
                    name="text_share"
                    layout={{ position: 'absolute', left: 36, width: 90, top: 3, height: 14, maxWidth: 90 }}
                />
            )}
        </Region>
    );
};
