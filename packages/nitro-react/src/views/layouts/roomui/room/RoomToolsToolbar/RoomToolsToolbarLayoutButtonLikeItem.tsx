import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `button_like` of RoomToolsToolbarLayout - pass real rows through its `items…` slot. */
export interface RoomToolsToolbarLayoutButtonLikeItemProps {
    captionTextLike?: string;
    layout?: BoxLayout;
    onButtonLike?: () => void;
    visibleTextLike?: boolean;
}

export const RoomToolsToolbarLayoutButtonLikeItem = ({ captionTextLike, layout, onButtonLike, visibleTextLike }: RoomToolsToolbarLayoutButtonLikeItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="button_like"
            tooltip={t('room.like.button.tooltip')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onButtonLike}
            cursor="pointer"
            layout={{ width: 130, height: 25, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 28, top: 0, bottom: 0 }} />
            <ThemeImage
                src={layoutImage('roomtools_like.png')}
                layout={{ position: 'absolute', left: 2, width: 27, top: 0, height: 25 }}
            />
            {(visibleTextLike ?? true) && (
                <ThemeText
                    text={captionTextLike ?? t('room.like.button.text')}
                    textStyle="text-style-u-button-tab"
                    textOptions={{ fill: '#bbbbbb' }}
                    name="text_like"
                    layout={{ position: 'absolute', left: 36, width: 90, top: 3, height: 14, maxWidth: 90 }}
                />
            )}
        </Region>
    );
};
